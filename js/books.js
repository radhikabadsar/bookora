/**
 * Bookora Bookstore - Catalog & Public Library Discovery
 * Implements search, category filtering, dynamic cards rendering, and Open Library discovery
 */

document.addEventListener("DOMContentLoaded", () => {
  const booksGrid = document.getElementById("booksGrid");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".category-filter-btn");
  const resultsCount = document.getElementById("resultsCount");

  // State
  let activeCategory = "All";
  let searchKeyword = "";

  /**
   * Filter and render catalogue books using Array.prototype.filter() and Array.prototype.map()
   */
  function renderBooks() {
    if (!booksGrid || !window.initialBooks) return;

    // Filter by active category and search input
    const filtered = window.initialBooks.filter((book) => {
      const matchesCategory =
        activeCategory === "All" || book.category === activeCategory;

      const q = searchKeyword.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    // Update count indicator
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} book${filtered.length === 1 ? "" : "s"}`;
    }

    if (filtered.length === 0) {
      booksGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 0.5rem;">No books match your search</h3>
          <p style="font-size: 0.95rem;">Try adjusting your keyword or selecting a different category shelf.</p>
        </div>
      `;
      return;
    }

    // Map into bookstore card components
    booksGrid.innerHTML = filtered
      .map((book) => {
        const cleanTitle = window.formatHumanReadableTitle ? window.formatHumanReadableTitle(book.title) : (book.title || "Untitled Edition");
        const cleanAuthor = window.formatHumanReadableAuthor ? window.formatHumanReadableAuthor(book.author) : (book.author || "Bookora Press");
        const fallback = window.getFallbackCover(cleanTitle, cleanAuthor, book.accentColor);
        const originalPriceHtml = book.originalPrice
          ? `<span class="original-price">$${book.originalPrice.toFixed(2)}</span>`
          : "";
        const safeTitleAttr = cleanTitle.replace(/"/g, "&quot;");
        const coverSrc = book.coverUrl || fallback;
        const priceVal = (typeof book.price === "number" && !isNaN(book.price)) ? book.price : 14.99;

        return `
          <article class="book-card" data-id="${book.id}">
            <a href="book-details.html?id=${book.id}" class="book-card-cover" title="View ${safeTitleAttr} edition details">
              <img
                src="${coverSrc}"
                alt="${safeTitleAttr}"
                loading="lazy"
                onerror="this.onerror=null; this.src='${fallback}';"
              />
            </a>
            <span class="book-card-badge">${book.badge || book.category || "Staff Pick"}</span>
            <h3 class="book-card-title">
              <a href="book-details.html?id=${book.id}">${cleanTitle}</a>
            </h3>
            <p class="book-card-author">by ${cleanAuthor}</p>
            <div class="book-card-rating">
              <span>★ ${book.rating || 4.8}</span>
              <span class="review-count">(${book.reviewCount ? book.reviewCount.toLocaleString() : "1.2k"})</span>
            </div>
            <div class="book-card-footer">
              <div class="book-card-price">
                $${priceVal.toFixed(2)}${originalPriceHtml}
              </div>
              <div class="book-card-actions">
                <a href="book-details.html?id=${book.id}" class="btn btn-outline btn-sm">
                  Details
                </a>
                <button class="add-cart-btn" onclick="addToCart(${book.id}, 'Hardcover', 1)">
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Search input event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value;
      renderBooks();
    });
  }

  // Category filter button click events
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category || "All";
      renderBooks();
    });
  });

  // Initial catalogue render
  renderBooks();

  // -------------------------------------------------------------------------
  // Open Library Public Domain Discovery Feature
  // -------------------------------------------------------------------------
  const discoveryStatus = document.getElementById("discoveryStatus");
  const discoveryBooksGrid = document.getElementById("discoveryBooksGrid");
  const refreshDiscoveryBtn = document.getElementById("refreshDiscoveryBtn");

  async function fetchOpenLibraryBooks() {
    if (!discoveryStatus || !discoveryBooksGrid) return;

    discoveryStatus.style.display = "block";
    discoveryStatus.innerHTML = `
      <div class="spinner"></div>
      <p>Fetching curated classic recommendations from Open Library...</p>
    `;
    discoveryBooksGrid.innerHTML = "";

    try {
      const response = await fetch("https://openlibrary.org/subjects/classic_literature.json?limit=4");
      if (!response.ok) {
        throw new Error(`Unable to fetch recommendations (HTTP ${response.status})`);
      }

      const data = await response.json();
      const works = data.works || [];

      if (works.length === 0) {
        throw new Error("No classic works returned.");
      }

      discoveryStatus.style.display = "none";

      discoveryBooksGrid.innerHTML = works
        .map((work) => {
          const cleanTitle = window.formatHumanReadableTitle
            ? window.formatHumanReadableTitle(work.title, "Classic Literature Edition")
            : (work.title || "Classic Literature Edition");
          const cleanAuthor = window.formatHumanReadableAuthor
            ? window.formatHumanReadableAuthor(work.authors, "Classic Author")
            : "Classic Author";

          const fallback = window.getFallbackCover(cleanTitle, cleanAuthor, "#1E3A8A");

          let cover = fallback;
          if (work.cover_id) {
            cover = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg?default=false`;
          } else if (work.cover_edition_key) {
            cover = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg?default=false`;
          } else if (Array.isArray(work.covers) && work.covers.length > 0 && work.covers[0] > 0) {
            cover = `https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg?default=false`;
          }

          let safeLink = "https://openlibrary.org";
          if (work.key) {
            const keyStr = String(work.key).trim();
            if (keyStr.startsWith("http://") || keyStr.startsWith("https://")) {
              safeLink = keyStr;
            } else {
              const cleanKey = keyStr.startsWith("/") ? keyStr : `/${keyStr}`;
              safeLink = `https://openlibrary.org${cleanKey}`;
            }
          }

          const safeTitleAttr = cleanTitle.replace(/"/g, "&quot;");

          return `
            <article class="book-card" style="background: var(--bg-canvas);">
              <a href="${safeLink}" target="_blank" rel="noopener" class="book-card-cover" title="View ${safeTitleAttr} on Open Library">
                <img
                  src="${cover}"
                  alt="${safeTitleAttr}"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='${fallback}';"
                />
              </a>
              <span class="book-card-badge" style="background: #e0e7ff; color: #3730a3;">Open Library Classic</span>
              <h3 class="book-card-title">
                <a href="${safeLink}" target="_blank" rel="noopener">${cleanTitle}</a>
              </h3>
              <p class="book-card-author">by ${cleanAuthor}</p>
              <div class="book-card-footer">
                <span style="font-size: 0.82rem; font-weight: 600; color: var(--accent-green);">Public Domain Edition</span>
                <div class="book-card-actions">
                  <a
                    href="${safeLink}"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-outline btn-sm"
                  >
                    View Details ↗
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join("");
    } catch (err) {
      console.warn("Open Library discovery error:", err);
      discoveryStatus.style.display = "block";
      discoveryStatus.innerHTML = `
        <div class="error-notice">
          <div>
            <strong>Notice:</strong> Unable to connect to Open Library archive right now.
            <div style="font-size: 0.82rem; margin-top: 0.2rem; color: #7f1d1d;">Our main bookstore catalogue remains completely operational.</div>
          </div>
          <button id="retryDiscoveryBtn" class="btn btn-forest btn-sm">Try Again</button>
        </div>
      `;

      const retryBtn = document.getElementById("retryDiscoveryBtn");
      if (retryBtn) {
        retryBtn.addEventListener("click", fetchOpenLibraryBooks);
      }
    }
  }

  fetchOpenLibraryBooks();

  if (refreshDiscoveryBtn) {
    refreshDiscoveryBtn.addEventListener("click", fetchOpenLibraryBooks);
  }
});
