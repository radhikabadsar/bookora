/**
 * Bookora Bookstore - Books Dataset & Media Helpers
 * Curated collection of modern and classic literature with formats, prices, and sample reviews
 */

const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewCount: 38420,
    badge: "Pulitzer Winner",
    description: "Set in Maycomb, Alabama, Harper Lee's timeless masterpiece explores courage, compassion, and justice through the innocent eyes of Scout Finch during the 1930s Southern United States.",
    formats: {
      "E-book": 9.99,
      "Paperback": 14.99,
      "Hardcover": 18.99
    },
    publishedYear: 1960,
    pages: 336,
    isbn: "9780061120084",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    featured: true,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#14532D",
    reviews: [
      {
        reviewer: "Elena Rostova",
        rating: 5,
        date: "October 14, 2026",
        comment: "An extraordinary hardcover edition with pristine paper weight and elegant typography. A benchmark in American fiction.",
        isDemo: true
      },
      {
        reviewer: "Marcus Vance",
        rating: 5,
        date: "September 28, 2026",
        comment: "One of the most moving novels in the English language. Prompt delivery and plastic-free packaging from Bookora.",
        isDemo: true
      }
    ]
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-fiction",
    price: 21.99,
    originalPrice: 27.00,
    rating: 4.9,
    reviewCount: 54200,
    badge: "Global #1 Bestseller",
    description: "An easy and proven framework for improving every day through the compounded power of tiny, consistent behavioral changes and system design.",
    formats: {
      "E-book": 11.99,
      "Paperback": 16.99,
      "Hardcover": 21.99
    },
    publishedYear: 2018,
    pages: 320,
    isbn: "9780735211292",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    featured: true,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#9A3412",
    reviews: [
      {
        reviewer: "David K. Raman",
        rating: 5,
        date: "October 02, 2026",
        comment: "Transformative advice on system-oriented thinking rather than pure goal setting. The physical hardcover binding is flawless.",
        isDemo: true
      },
      {
        reviewer: "Chloe Bennett",
        rating: 5,
        date: "September 15, 2026",
        comment: "Clear, practical, and highly actionable. Recommended for anyone looking to build sustainable lifelong habits.",
        isDemo: true
      }
    ]
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    price: 16.99,
    originalPrice: 20.00,
    rating: 4.9,
    reviewCount: 45200,
    badge: "Staff Favorite",
    description: "The classic romance between the spirited Elizabeth Bennet and the proud Mr. Darcy amidst the witty social commentary of 19th-century England.",
    formats: {
      "E-book": 7.99,
      "Paperback": 12.99,
      "Hardcover": 16.99
    },
    publishedYear: 1813,
    pages: 432,
    isbn: "9780141439518",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    featured: true,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#4C1D95",
    reviews: [
      {
        reviewer: "Ananya Iyer",
        rating: 5,
        date: "October 08, 2026",
        comment: "Austen's sparkling dialogue and keen social satire shine in this collectible hardcover edition.",
        isDemo: true
      },
      {
        reviewer: "Jonathan Sterling",
        rating: 5,
        date: "August 19, 2026",
        comment: "The definitive romance novel. Beautiful cover embossing and comfortable margin spacing.",
        isDemo: true
      }
    ]
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 14.99,
    originalPrice: 18.00,
    rating: 4.7,
    reviewCount: 31200,
    badge: "American Classic",
    description: "A portrait of the Jazz Age exploring obsession, grandeur, and the tragic disillusionment of the American Dream in 1920s Long Island.",
    formats: {
      "E-book": 6.99,
      "Paperback": 10.99,
      "Hardcover": 14.99
    },
    publishedYear: 1925,
    pages: 180,
    isbn: "9780743273565",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    featured: false,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#0F766E",
    reviews: [
      {
        reviewer: "Nathaniel Cole",
        rating: 5,
        date: "September 12, 2026",
        comment: "Fitzgerald's prose is poetry in motion. The tragic grandeur of Gatsby never gets old.",
        isDemo: true
      },
      {
        reviewer: "Maya Patel",
        rating: 4,
        date: "July 29, 2026",
        comment: "A concise masterpiece capturing excess and hollow ambition. Very crisp printing.",
        isDemo: true
      }
    ]
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 15.00,
    originalPrice: 19.50,
    rating: 4.8,
    reviewCount: 42000,
    badge: "Inspiring Read",
    description: "The enchanting tale of Santiago, an Andalusian shepherd boy who travels across Egypt in search of worldly treasure and spiritual awakening.",
    formats: {
      "E-book": 7.99,
      "Paperback": 11.99,
      "Hardcover": 15.00
    },
    publishedYear: 1988,
    pages: 208,
    isbn: "9780062315007",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    featured: false,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#B45309",
    reviews: [
      {
        reviewer: "Carlos Gomez",
        rating: 5,
        date: "October 05, 2026",
        comment: "A fable that speaks to your heart's true purpose. Re-reading this every few years is a ritual.",
        isDemo: true
      },
      {
        reviewer: "Emily Watson",
        rating: 5,
        date: "August 30, 2026",
        comment: "Simple, lyrical, and philosophical. A beautiful gift book.",
        isDemo: true
      }
    ]
  },
  {
    id: 6,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Non-fiction",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 28900,
    badge: "Thought-Provoking",
    description: "Harari spans seventy thousand years of human history, probing how Homo sapiens conquered Earth through cognitive revolutions, mythmaking, and complex societal structures.",
    formats: {
      "E-book": 13.99,
      "Paperback": 18.99,
      "Hardcover": 24.99
    },
    publishedYear: 2014,
    pages: 443,
    isbn: "9780062316097",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    featured: true,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#1E3A8A",
    reviews: [
      {
        reviewer: "Dr. Vikram Joshi",
        rating: 5,
        date: "October 11, 2026",
        comment: "Broad, provocative, and endlessly stimulating. Harari synthesizes evolutionary biology and macro-history effortlessly.",
        isDemo: true
      },
      {
        reviewer: "Rachel Adams",
        rating: 5,
        date: "September 02, 2026",
        comment: "Challenged so many assumptions about human civilizational progress. A must-read.",
        isDemo: true
      }
    ]
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    category: "Mystery",
    price: 15.50,
    originalPrice: 18.99,
    rating: 4.9,
    reviewCount: 39500,
    badge: "Literary Dystopia",
    description: "Winston Smith rewrites history for the Ministry of Truth until his secret rebellion against Big Brother threatens everything in Orwell's iconic prophecy.",
    formats: {
      "E-book": 6.99,
      "Paperback": 11.99,
      "Hardcover": 15.50
    },
    publishedYear: 1949,
    pages: 328,
    isbn: "9780451524935",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    featured: false,
    isBestseller: true,
    isNewArrival: false,
    accentColor: "#334155",
    reviews: [
      {
        reviewer: "Arthur Pendelton",
        rating: 5,
        date: "October 01, 2026",
        comment: "Frighteningly relevant decades later. Orwell's exploration of doublespeak and power remains unsurpassed.",
        isDemo: true
      },
      {
        reviewer: "Siddharth Nair",
        rating: 5,
        date: "August 12, 2026",
        comment: "A chilling warning that stays etched in memory. High quality hardcover binding.",
        isDemo: true
      }
    ]
  },
  {
    id: 8,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Mystery",
    price: 17.99,
    originalPrice: 22.00,
    rating: 4.8,
    reviewCount: 31200,
    badge: "Psychological Thriller",
    description: "Alicia Berenson's life is seemingly perfect. Then one evening she shoots her husband five times in the face, and never speaks another word.",
    formats: {
      "E-book": 8.99,
      "Paperback": 13.99,
      "Hardcover": 17.99
    },
    publishedYear: 2019,
    pages: 336,
    isbn: "9781250301697",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    featured: false,
    isBestseller: false,
    isNewArrival: true,
    accentColor: "#1E293B",
    reviews: [
      {
        reviewer: "Lisa Monroe",
        rating: 5,
        date: "September 30, 2026",
        comment: "I could not put this book down! The twist at the end completely caught me off guard.",
        isDemo: true
      },
      {
        reviewer: "Devendra Verma",
        rating: 4,
        date: "August 20, 2026",
        comment: "Atmospheric, paced with precision, and psychological depth that delivers.",
        isDemo: true
      }
    ]
  },
  {
    id: 9,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science",
    price: 22.00,
    originalPrice: 26.00,
    rating: 4.9,
    reviewCount: 41000,
    badge: "Sci-Fi Classic",
    description: "Set on the desert planet Arrakis, Dune tells the story of Paul Atreides as he navigates political betrayal, spice melange, and galactic destiny.",
    formats: {
      "E-book": 10.99,
      "Paperback": 16.99,
      "Hardcover": 22.00
    },
    publishedYear: 1965,
    pages: 688,
    isbn: "9780441172719",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    featured: true,
    isBestseller: false,
    isNewArrival: true,
    accentColor: "#78350F",
    reviews: [
      {
        reviewer: "Gabriel Santos",
        rating: 5,
        date: "October 16, 2026",
        comment: "The supreme epic of science fiction. The ecology and political intrigue of Arrakis are breathtaking.",
        isDemo: true
      },
      {
        reviewer: "Kavita Rao",
        rating: 5,
        date: "September 05, 2026",
        comment: "Massive in scale and philosophical weight. The physical book quality is remarkable.",
        isDemo: true
      }
    ]
  },
  {
    id: 10,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    price: 42.50,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 16500,
    badge: "Developer Essential",
    description: "A handbook of agile software craftsmanship packed with timeless principles, patterns, and refactoring practices for professional software engineering.",
    formats: {
      "E-book": 24.99,
      "Paperback": 34.99,
      "Hardcover": 42.50
    },
    publishedYear: 2008,
    pages: 464,
    isbn: "9780132350884",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    featured: false,
    isBestseller: false,
    isNewArrival: true,
    accentColor: "#065F46",
    reviews: [
      {
        reviewer: "Alex Turner",
        rating: 5,
        date: "October 04, 2026",
        comment: "Every software engineer should study this. Meaningful naming and small functions save hundreds of hours.",
        isDemo: true
      },
      {
        reviewer: "Priya Sundaram",
        rating: 5,
        date: "July 18, 2026",
        comment: "Essential reading for our entire engineering team. Excellent layout and typography.",
        isDemo: true
      }
    ]
  },
  {
    id: 11,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Children's Books",
    price: 14.00,
    originalPrice: 17.50,
    rating: 4.9,
    reviewCount: 28000,
    badge: "Universal Fable",
    description: "A poetic tale of a young prince who visits various planets in space, addressing poignant themes of loneliness, friendship, and love.",
    formats: {
      "E-book": 6.99,
      "Paperback": 10.99,
      "Hardcover": 14.00
    },
    publishedYear: 1943,
    pages: 96,
    isbn: "9780156012195",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    featured: false,
    isBestseller: false,
    isNewArrival: true,
    accentColor: "#0284C7",
    reviews: [
      {
        reviewer: "Marie Laurent",
        rating: 5,
        date: "October 09, 2026",
        comment: "It is only with the heart that one can see rightly. A treasure for both children and adults.",
        isDemo: true
      },
      {
        reviewer: "Arjun Sen",
        rating: 5,
        date: "August 22, 2026",
        comment: "Heartwarming and deep. The paper and original illustration reproductions are stellar.",
        isDemo: true
      }
    ]
  },
  {
    id: 12,
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    category: "Fiction",
    price: 18.50,
    originalPrice: 22.00,
    rating: 4.9,
    reviewCount: 36000,
    badge: "Nobel Laureate",
    description: "The multi-generational story of the Buendía family in the fictional Colombian town of Macondo, weaving realism and sublime magic.",
    formats: {
      "E-book": 9.99,
      "Paperback": 14.99,
      "Hardcover": 18.50
    },
    publishedYear: 1967,
    pages: 417,
    isbn: "9780307474728",
    coverUrl: "https://covers.openlibrary.org/b/id/8258649-L.jpg",
    featured: false,
    isBestseller: false,
    isNewArrival: true,
    accentColor: "#B45309",
    reviews: [
      {
        reviewer: "Mateo Silva",
        rating: 5,
        date: "October 12, 2026",
        comment: "García Márquez invented a universe. Magical realism in its purest and most brilliant form.",
        isDemo: true
      },
      {
        reviewer: "Zara Khan",
        rating: 5,
        date: "September 08, 2026",
        comment: "A monumental work of literature. The English translation and hardcover binding are exceptional.",
        isDemo: true
      }
    ]
  }
];

/**
 * Helper to escape XML special characters in SVG content
 */
function escapeXml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Normalizes book titles to ensure human-readable text.
 * Prevents URLs, web links, file paths, or HTML markup from ever displaying as titles.
 */
function formatHumanReadableTitle(rawTitle, fallback = "Bookora Curated Edition") {
  if (!rawTitle) return fallback;

  let str = "";
  if (typeof rawTitle === "string") {
    str = rawTitle;
  } else if (typeof rawTitle === "object") {
    str = rawTitle.value || rawTitle.title || rawTitle.name || "";
  }
  str = String(str).trim();
  if (!str) return fallback;

  // 1. Strip any HTML markup (e.g. <a href="...">Title</a>)
  if (/<[a-z][\s\S]*>/i.test(str)) {
    str = str.replace(/<[^>]*>/g, "").trim();
  }

  // 2. If title is or starts with a URL, domain, or path (e.g. https://... or /works/...)
  if (/^(?:https?:\/\/|\/|www\.)/i.test(str)) {
    try {
      let pathname = str;
      if (str.includes("://") || str.startsWith("www.")) {
        const fullUrl = str.startsWith("www.") ? `https://${str}` : str;
        pathname = new URL(fullUrl).pathname;
      }
      pathname = pathname.replace(/\/+$/, "").replace(/\.(?:html?|php|json|epub|pdf)$/i, "");
      const segments = pathname.split("/").filter(Boolean);

      // Search backward for a human-readable slug (skip pure IDs like OL12345W or numeric IDs)
      let candidateSlug = "";
      for (let i = segments.length - 1; i >= 0; i--) {
        const seg = decodeURIComponent(segments[i]);
        if (!/^(?:OL\d+[A-Z]?|\d+|works|books|subjects|authors)$/i.test(seg) && seg.length > 2) {
          candidateSlug = seg;
          break;
        }
      }

      if (candidateSlug) {
        str = candidateSlug
          .replace(/[-_+]+/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        // Capitalize words
        str = str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
      } else {
        str = fallback;
      }
    } catch {
      str = fallback;
    }
  }

  return str || fallback;
}

/**
 * Normalizes author names to ensure human-readable text.
 * Handles arrays, author objects, URL keys (/authors/OL...), and malformed API values.
 */
function formatHumanReadableAuthor(rawAuthor, fallback = "Bookora Press") {
  if (!rawAuthor) return fallback;

  let str = "";
  if (typeof rawAuthor === "string") {
    str = rawAuthor;
  } else if (Array.isArray(rawAuthor)) {
    if (rawAuthor.length === 0) return fallback;
    const first = rawAuthor[0];
    if (typeof first === "string") {
      str = first;
    } else if (first && typeof first === "object") {
      str = first.name || first.value || "";
    }
  } else if (typeof rawAuthor === "object") {
    str = rawAuthor.name || rawAuthor.value || "";
  }

  str = String(str).trim();
  if (!str) return fallback;

  // Strip HTML tags if present
  if (/<[a-z][\s\S]*>/i.test(str)) {
    str = str.replace(/<[^>]*>/g, "").trim();
  }

  // If author string is a URL or author path (e.g., /authors/OL24529A or https://...)
  if (/^(?:https?:\/\/|\/|www\.)/i.test(str)) {
    try {
      let pathname = str;
      if (str.includes("://") || str.startsWith("www.")) {
        const fullUrl = str.startsWith("www.") ? `https://${str}` : str;
        pathname = new URL(fullUrl).pathname;
      }
      pathname = pathname.replace(/\/+$/, "");
      const segments = pathname.split("/").filter(Boolean);
      let candidate = "";
      for (let i = segments.length - 1; i >= 0; i--) {
        const seg = decodeURIComponent(segments[i]);
        if (!/^(?:OL\d+[A-Z]?|\d+|authors|people)$/i.test(seg) && seg.length > 2) {
          candidate = seg;
          break;
        }
      }
      if (candidate) {
        str = candidate.replace(/[-_+]+/g, " ").trim().replace(/\b[a-z]/g, (c) => c.toUpperCase());
      } else {
        str = fallback;
      }
    } catch {
      str = fallback;
    }
  }

  // Filter out bare IDs
  if (/^OL\d+[A-Z]?$/i.test(str)) {
    str = fallback;
  }

  return str || fallback;
}

/**
 * Fallback SVG generator for book covers in case of network issues or missing covers.
 * Returns a fully safe, URL-encoded SVG data URI that will never break HTML attributes or JS strings.
 */
function getFallbackCover(title, author, accentColor = "#14532D") {
  const cleanTitle = formatHumanReadableTitle(title, "Bookora Edition");
  const cleanAuthor = formatHumanReadableAuthor(author, "Bookora Press");

  // Determine elegant title wrapping for the 300x440 cover
  let line1 = cleanTitle;
  let line2 = "";
  if (cleanTitle.length > 20) {
    const words = cleanTitle.split(" ");
    let l1 = "";
    let l2 = "";
    for (const w of words) {
      if ((l1 + " " + w).trim().length <= 20) {
        l1 = (l1 + " " + w).trim();
      } else {
        l2 = (l2 + " " + w).trim();
      }
    }
    line1 = l1 || cleanTitle.substring(0, 18);
    line2 = l2 ? (l2.length > 22 ? l2.substring(0, 20) + "..." : l2) : "";
  }

  const safeLine1 = escapeXml(line1);
  const safeLine2 = escapeXml(line2);
  const safeAuthor = escapeXml(cleanAuthor.length > 28 ? cleanAuthor.substring(0, 26) + "..." : cleanAuthor);
  const safeColor = escapeXml(accentColor || "#14532D");

  const titleSvgText = line2
    ? `<text x="30" y="130" fill="#FAF7F2" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="bold">
        <tspan x="30" dy="0">${safeLine1}</tspan>
        <tspan x="30" dy="24">${safeLine2}</tspan>
      </text>`
    : `<text x="30" y="140" fill="#FAF7F2" font-family="'Playfair Display', Georgia, serif" font-size="19" font-weight="bold">${safeLine1}</text>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="440" viewBox="0 0 300 440">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${safeColor}"/>
        <stop offset="100%" stop-color="#0c0a09"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="12" y="12" width="276" height="416" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="4"/>
    <rect x="20" y="20" width="260" height="400" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" rx="2"/>
    <text x="30" y="60" fill="#d4af37" font-family="'Playfair Display', Georgia, serif" font-size="11" letter-spacing="2">BOOKORA HARDCOVER</text>
    <line x1="30" y1="75" x2="120" y2="75" stroke="#d4af37" stroke-width="1"/>
    ${titleSvgText}
    <text x="30" y="195" fill="rgba(250,247,242,0.85)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13">${safeAuthor}</text>
    <circle cx="150" cy="310" r="32" fill="rgba(255,255,255,0.06)"/>
    <path d="M142 305 L150 295 L158 305 L154 305 L154 320 L146 320 L146 305 Z" fill="#d4af37"/>
    <text x="30" y="395" fill="rgba(255,255,255,0.4)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" letter-spacing="1">CURATED LITERARY HOUSE</text>
  </svg>`;

  // Fully URL-encode and specifically escape single quotes (%27) so inline JS onerror="this.src='...'" never breaks
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg).replace(/'/g, "%27")}`;
}

// Helper to look up a book by its numerical ID
function getBookById(id) {
  const numId = Number(id);
  return initialBooks.find((b) => b.id === numId) || initialBooks[0];
}

// Global exposure
window.initialBooks = initialBooks;
window.formatHumanReadableTitle = formatHumanReadableTitle;
window.formatHumanReadableAuthor = formatHumanReadableAuthor;
window.escapeXml = escapeXml;
window.getFallbackCover = getFallbackCover;
window.getBookById = getBookById;

