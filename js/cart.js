/**
 * Bookora Bookstore - Accurate Shopping Cart Module
 * Supports format-specific items, quantity controls, reduce() totals, and delivery calculation
 */

const CART_STORAGE_KEY = "bookora_cart_items";
const COUPON_STORAGE_KEY = "bookora_applied_coupon";

// Retrieve cart items from localStorage
function getCart() {
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading cart from localStorage:", e);
    return [];
  }
}

// Save cart items to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart to localStorage:", e);
  }
  updateCartBadge();
}

// Dictionary of valid demo coupon codes and their corresponding discount rates
const VALID_COUPONS = {
  "WELCOME15": 0.15,
  "WELCOME": 0.15,
  "BOOKORA15": 0.15,
  "SAVE15": 0.15,
  "BOOKORA10": 0.10,
  "BOOK10": 0.10,
  "BOOKORA": 0.10
};

// Check if a coupon code string is valid
function isValidCoupon(code) {
  if (!code || typeof code !== "string") return false;
  const clean = code.trim().toUpperCase();
  return Object.prototype.hasOwnProperty.call(VALID_COUPONS, clean);
}

// Retrieve discount rate for a valid coupon (e.g. 0.15 for 15%)
function getCouponDiscountRate(code) {
  if (!isValidCoupon(code)) return 0;
  const clean = String(code).trim().toUpperCase();
  return VALID_COUPONS[clean] || 0;
}

// Retrieve currently applied coupon code
function getAppliedCoupon() {
  const saved = localStorage.getItem(COUPON_STORAGE_KEY);
  if (!saved || !isValidCoupon(saved)) return null;
  return saved.trim().toUpperCase();
}

// Set coupon code (only stores if valid, otherwise removes)
function setAppliedCoupon(code) {
  if (code && isValidCoupon(code)) {
    localStorage.setItem(COUPON_STORAGE_KEY, code.trim().toUpperCase());
  } else {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
}

/**
 * Add book to cart with format specificity
 * The same title in different formats (e.g. Hardcover vs E-book) are separate cart items!
 */
function addToCart(bookId, format = "Hardcover", quantity = 1, customPrice = null) {
  const cart = getCart();
  const book = window.getBookById ? window.getBookById(bookId) : window.initialBooks?.find((b) => b.id === Number(bookId));

  if (!book) {
    showToast("Book edition not found");
    return;
  }

  // Format-specific unit price
  let unitPrice = book.price;
  if (customPrice !== null && !isNaN(customPrice)) {
    unitPrice = Number(customPrice);
  } else if (book.formats && book.formats[format]) {
    unitPrice = Number(book.formats[format]);
  }

  // Separate item identity per book ID + format
  const cartItemId = `${book.id}-${format}`;
  const existingIndex = cart.findIndex((item) => item.id === cartItemId);
  const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qtyToAdd;
  } else {
    cart.push({
      id: cartItemId,
      bookId: book.id,
      title: book.title,
      author: book.author,
      format: format,
      price: unitPrice,
      quantity: qtyToAdd,
      coverUrl: book.coverUrl,
      accentColor: book.accentColor || "#14532D"
    });
  }

  saveCart(cart);
  showToast(`Added ${qtyToAdd} × "${book.title}" (${format}) to cart`);
}

// Remove item by cartItemId
function removeFromCart(cartItemId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== String(cartItemId));
  saveCart(updatedCart);
  showToast("Item removed from cart");
}

// Update quantity by delta (+1 or -1)
function updateQuantity(cartItemId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === String(cartItemId));
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  saveCart(cart);
}

// Set exact quantity
function setQuantity(cartItemId, newQty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === String(cartItemId));
  if (!item) return;

  const validQty = Math.max(1, parseInt(newQty, 10) || 1);
  item.quantity = validQty;
  saveCart(cart);
}

// Clear the cart
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadge();
}

/**
 * Calculate cart totals using Array.prototype.reduce()
 * Evaluates physical vs digital delivery requirements and coupon discounts
 */
function getCartTotals(couponCode = null) {
  const cart = getCart();
  const activeCoupon = couponCode || getAppliedCoupon();

  // Total quantity using reduce()
  const totalItems = cart.reduce((accum, item) => accum + item.quantity, 0);

  // Subtotal using reduce()
  const subtotal = cart.reduce((accum, item) => accum + item.price * item.quantity, 0);

  // Physical vs Digital Check:
  // If order contains Hardcover or Paperback -> physical shipping address is required
  const hasPhysical = cart.some((item) => item.format === "Hardcover" || item.format === "Paperback");
  const isDigitalOnly = cart.length > 0 && !hasPhysical;

  // Shipping calculation:
  // Digital-only orders: $0 shipping
  // Physical orders over $50: Free shipping
  // Physical orders under $50: $4.99 standard shipping
  let shipping = 0;
  if (cart.length > 0 && hasPhysical) {
    shipping = subtotal >= 50 ? 0 : 4.99;
  }

  // Discount calculation: applied ONCE to subtotal, verified against valid coupons
  const discountRate = activeCoupon ? getCouponDiscountRate(activeCoupon) : 0;
  const rawDiscount = Number((subtotal * discountRate).toFixed(2));

  // Ensure discount cannot exceed subtotal and cannot be negative
  const discount = Math.min(subtotal, Math.max(0, rawDiscount));
  const discountedSubtotal = Math.max(0, Number((subtotal - discount).toFixed(2)));
  const estimatedTax = discountedSubtotal > 0 ? Number((discountedSubtotal * 0.05).toFixed(2)) : 0;
  
  // Grand total cannot be negative
  const grandTotal = Math.max(0, Number((discountedSubtotal + shipping + estimatedTax).toFixed(2)));

  return {
    totalItems,
    subtotal: Number(subtotal.toFixed(2)),
    discount,
    discountRate,
    couponApplied: activeCoupon,
    shipping,
    estimatedTax,
    grandTotal,
    hasPhysical,
    isDigitalOnly
  };
}

// Update header cart counter badge
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const totals = getCartTotals();
  badge.textContent = totals.totalItems;
  badge.style.display = totals.totalItems > 0 ? "inline-flex" : "none";
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="font-size: 1.1rem; color: #4ade80;">✓</span>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// Global exposure
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;
window.clearCart = clearCart;
window.getCartTotals = getCartTotals;
window.getAppliedCoupon = getAppliedCoupon;
window.setAppliedCoupon = setAppliedCoupon;
window.isValidCoupon = isValidCoupon;
window.getCouponDiscountRate = getCouponDiscountRate;
window.VALID_COUPONS = VALID_COUPONS;
window.updateCartBadge = updateCartBadge;
window.showToast = showToast;
