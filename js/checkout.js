/**
 * Bookora Bookstore - Checkout & Order Placement Module
 * Implements: Cart -> Checkout -> Address -> Payment Method -> Review Order -> Place Order -> Order Confirmation
 */

let selectedPaymentMethod = "Cash on Delivery";
let isPlacingOrder = false;

document.addEventListener("DOMContentLoaded", () => {
  const checkoutEmptyCart = document.getElementById("checkoutEmptyCart");
  const checkoutActiveFlow = document.getElementById("checkoutActiveFlow");
  const orderConfirmationSection = document.getElementById("orderConfirmationSection");

  const checkoutItemsList = document.getElementById("checkoutItemsList");
  const checkoutTotalItems = document.getElementById("checkoutTotalItems");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutShipping = document.getElementById("checkoutShipping");
  const checkoutDiscountRow = document.getElementById("checkoutDiscountRow");
  const checkoutDiscount = document.getElementById("checkoutDiscount");
  const checkoutTax = document.getElementById("checkoutTax");
  const checkoutGrandTotal = document.getElementById("checkoutGrandTotal");

  const orderTypeBanner = document.getElementById("orderTypeBanner");
  const physicalAddressFields = document.getElementById("physicalAddressFields");
  const digitalOnlyNotice = document.getElementById("digitalOnlyNotice");
  const profilePrefillBadge = document.getElementById("profilePrefillBadge");

  const checkoutName = document.getElementById("checkoutName");
  const checkoutEmail = document.getElementById("checkoutEmail");
  const checkoutMobile = document.getElementById("checkoutMobile");
  const checkoutStreet = document.getElementById("checkoutStreet");
  const checkoutCity = document.getElementById("checkoutCity");
  const checkoutState = document.getElementById("checkoutState");
  const checkoutPincode = document.getElementById("checkoutPincode");

  const checkoutNameError = document.getElementById("checkoutNameError");
  const checkoutEmailError = document.getElementById("checkoutEmailError");
  const checkoutMobileError = document.getElementById("checkoutMobileError");
  const checkoutStreetError = document.getElementById("checkoutStreetError");
  const checkoutCityError = document.getElementById("checkoutCityError");
  const checkoutStateError = document.getElementById("checkoutStateError");
  const checkoutPincodeError = document.getElementById("checkoutPincodeError");

  const reviewPaymentMethod = document.getElementById("reviewPaymentMethod");
  const reviewDestinationText = document.getElementById("reviewDestinationText");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  const checkoutCouponInput = document.getElementById("checkoutCouponInput");
  const checkoutApplyCouponBtn = document.getElementById("checkoutApplyCouponBtn");
  const checkoutCouponNotice = document.getElementById("checkoutCouponNotice");

  // Validation helpers from window or local definitions
  const isValidEmail = window.isValidEmail || ((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim()));
  const isValidPinCode = window.isValidPinCode || ((pin) => /^\d{6}$/.test(String(pin).trim()));
  const isValidMobileNumber = window.isValidMobileNumber || ((mobile) => /^\d{10}$/.test(String(mobile).trim()));

  function clearFieldError(input, errorElement) {
    if (input) input.classList.remove("invalid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
  }

  function setFieldError(input, errorElement, message) {
    if (input) input.classList.add("invalid");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("visible");
    }
  }

  // Render the initial checkout page
  function renderCheckoutPage() {
    const cart = window.getCart ? window.getCart() : [];

    if (!cart || cart.length === 0) {
      if (checkoutEmptyCart) checkoutEmptyCart.style.display = "block";
      if (checkoutActiveFlow) checkoutActiveFlow.style.display = "none";
      if (orderConfirmationSection) orderConfirmationSection.style.display = "none";
      return;
    }

    if (checkoutEmptyCart) checkoutEmptyCart.style.display = "none";
    if (checkoutActiveFlow) checkoutActiveFlow.style.display = "block";
    if (orderConfirmationSection) orderConfirmationSection.style.display = "none";

    const totals = window.getCartTotals ? window.getCartTotals() : { totalItems: 0, subtotal: 0, shipping: 0, discount: 0, estimatedTax: 0, grandTotal: 0, hasPhysical: true };
    const isDigitalOnly = totals.isDigitalOnly;

    // Render Order Type notice & toggle address requirement
    if (orderTypeBanner) {
      if (isDigitalOnly) {
        orderTypeBanner.innerHTML = "📱 <strong>Digital E-Book Order:</strong> Instant download access will be associated with your email. A physical delivery address and mobile number are not required.";
        orderTypeBanner.style.backgroundColor = "#eff6ff";
        orderTypeBanner.style.borderColor = "#bfdbfe";
        orderTypeBanner.style.color = "#1e40af";
        if (physicalAddressFields) physicalAddressFields.style.display = "none";
        if (digitalOnlyNotice) digitalOnlyNotice.style.display = "block";
      } else if (cart.some((item) => item.format === "E-book")) {
        orderTypeBanner.innerHTML = "📦 <strong>Mixed Cart (Physical &amp; Digital Editions):</strong> A valid delivery address and 10-digit mobile number are required for your physical book dispatch.";
        orderTypeBanner.style.backgroundColor = "#fefce8";
        orderTypeBanner.style.borderColor = "#fef08a";
        orderTypeBanner.style.color = "#854d0e";
        if (physicalAddressFields) physicalAddressFields.style.display = "block";
        if (digitalOnlyNotice) digitalOnlyNotice.style.display = "none";
      } else {
        orderTypeBanner.innerHTML = "📦 <strong>Physical Delivery Order:</strong> Handpicked hardcover and paperback editions packaged with recyclable materials. Delivery address and mobile number required.";
        orderTypeBanner.style.backgroundColor = "#f8fafc";
        orderTypeBanner.style.borderColor = "#cbd5e1";
        orderTypeBanner.style.color = "#334155";
        if (physicalAddressFields) physicalAddressFields.style.display = "block";
        if (digitalOnlyNotice) digitalOnlyNotice.style.display = "none";
      }
    }

    // Prefill from current user profile if available
    const currentUser = window.getCurrentUser ? window.getCurrentUser() : null;
    if (currentUser) {
      if (profilePrefillBadge) profilePrefillBadge.style.display = "inline-block";
      if (checkoutName && !checkoutName.value) checkoutName.value = currentUser.name || "";
      if (checkoutEmail && !checkoutEmail.value) checkoutEmail.value = currentUser.email || "";
      if (checkoutMobile && !checkoutMobile.value && currentUser.mobile) checkoutMobile.value = currentUser.mobile;

      const addr = currentUser.address || {};
      if (checkoutStreet && !checkoutStreet.value) checkoutStreet.value = addr.street || "";
      if (checkoutCity && !checkoutCity.value) checkoutCity.value = addr.city || "";
      if (checkoutState && !checkoutState.value) checkoutState.value = addr.state || "";
      if (checkoutPincode && !checkoutPincode.value) checkoutPincode.value = addr.pincode || "";
    }

    // Render items in review list
    if (checkoutItemsList) {
      checkoutItemsList.innerHTML = cart
        .map((item) => {
          const cleanTitle = window.formatHumanReadableTitle ? window.formatHumanReadableTitle(item.title) : (item.title || "Book Edition");
          const cleanAuthor = window.formatHumanReadableAuthor ? window.formatHumanReadableAuthor(item.author) : (item.author || "Bookora Press");
          const fallback = window.getFallbackCover ? window.getFallbackCover(cleanTitle, cleanAuthor, item.accentColor) : "";
          const itemTotal = ((item.price || 0) * (item.quantity || 1)).toFixed(2);
          const safeTitleAttr = cleanTitle.replace(/"/g, "&quot;");
          const coverSrc = item.coverUrl || fallback;
          return `
            <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: space-between; font-size: 0.85rem;">
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <img
                  src="${coverSrc}"
                  alt="${safeTitleAttr}"
                  style="width: 38px; height: 54px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color); flex-shrink: 0;"
                  onerror="this.onerror=null; this.src='${fallback}';"
                />
                <div>
                  <strong style="color: var(--text-primary); font-size: 0.88rem; display: block;">${cleanTitle}</strong>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.quantity} × ${item.format || "Hardcover"} ($${(item.price || 0).toFixed(2)})</span>
                </div>
              </div>
              <div style="font-weight: 700; color: var(--text-primary);">$${itemTotal}</div>
            </div>
          `;
        })
        .join("");
    }

    // Update financial breakdown
    if (checkoutTotalItems) checkoutTotalItems.textContent = totals.totalItems;
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (checkoutShipping) {
      checkoutShipping.textContent = totals.shipping === 0 ? "Free Delivery" : `$${totals.shipping.toFixed(2)}`;
    }
    if (checkoutDiscountRow && checkoutDiscount) {
      if (totals.discount > 0) {
        checkoutDiscountRow.style.display = "flex";
        checkoutDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
        const checkoutDiscountPercent = document.getElementById("checkoutDiscountPercent");
        if (checkoutDiscountPercent) {
          const applied = window.getAppliedCoupon ? window.getAppliedCoupon() : "";
          const rate = window.getCouponDiscountRate ? window.getCouponDiscountRate(applied) : 0.15;
          checkoutDiscountPercent.textContent = `${Math.round(rate * 100)}%`;
        }
      } else {
        checkoutDiscountRow.style.display = "none";
      }
    }
    if (checkoutTax) checkoutTax.textContent = `$${totals.estimatedTax.toFixed(2)}`;
    if (checkoutGrandTotal) checkoutGrandTotal.textContent = `$${totals.grandTotal.toFixed(2)}`;

    updateDestinationPreview();
  }

  // Update live preview of destination
  function updateDestinationPreview() {
    if (!reviewDestinationText) return;
    const totals = window.getCartTotals ? window.getCartTotals() : { isDigitalOnly: false };

    if (totals.isDigitalOnly) {
      const email = checkoutEmail ? checkoutEmail.value.trim() : "";
      reviewDestinationText.innerHTML = `<strong>Delivery:</strong> Digital delivery to ${email || "(email above)"}`;
    } else {
      const street = checkoutStreet ? checkoutStreet.value.trim() : "";
      const city = checkoutCity ? checkoutCity.value.trim() : "";
      const state = checkoutState ? checkoutState.value : "";
      const pin = checkoutPincode ? checkoutPincode.value.trim() : "";
      const mobile = checkoutMobile ? checkoutMobile.value.trim() : "";

      if (city || state || pin) {
        reviewDestinationText.innerHTML = `
          <strong>Delivery:</strong> ${street ? street + ", " : ""}${city ? city + ", " : ""}${state ? state + " " : ""}${pin ? "- " + pin : ""}
          ${mobile ? `<br><strong>Mobile:</strong> ${mobile}` : ""}
        `;
      } else {
        reviewDestinationText.innerHTML = "<strong>Destination:</strong> Enter address on left";
      }
    }
  }

  // Handle payment method change
  window.handlePaymentChange = (method) => {
    selectedPaymentMethod = method;
    if (reviewPaymentMethod) reviewPaymentMethod.textContent = method;

    const cards = document.querySelectorAll(".payment-method-card");
    cards.forEach((card) => {
      const radio = card.querySelector("input[type='radio']");
      if (radio && radio.value === method) {
        card.classList.add("active");
        radio.checked = true;
      } else {
        card.classList.remove("active");
      }
    });
  };

  // Listen to address input changes for live preview
  [checkoutName, checkoutEmail, checkoutMobile, checkoutStreet, checkoutCity, checkoutState, checkoutPincode].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateDestinationPreview);
      input.addEventListener("change", updateDestinationPreview);
    }
  });

  // Coupon application logic in checkout
  if (checkoutApplyCouponBtn && checkoutCouponInput) {
    // If already coupon applied in storage, prefill input
    const applied = window.getAppliedCoupon ? window.getAppliedCoupon() : null;
    if (applied) checkoutCouponInput.value = applied;

    checkoutApplyCouponBtn.addEventListener("click", () => {
      const rawCode = checkoutCouponInput.value.trim().toUpperCase();
      if (!rawCode) {
        if (window.setAppliedCoupon) window.setAppliedCoupon(null);
        if (checkoutCouponNotice) checkoutCouponNotice.style.display = "none";
        renderCheckoutPage();
        return;
      }

      const isValid = window.isValidCoupon ? window.isValidCoupon(rawCode) : (rawCode === "WELCOME15");
      if (isValid) {
        if (window.setAppliedCoupon) window.setAppliedCoupon(rawCode);
        renderCheckoutPage();
        const totals = window.getCartTotals ? window.getCartTotals() : { discount: 0 };
        const rate = window.getCouponDiscountRate ? window.getCouponDiscountRate(rawCode) : 0.15;
        const percent = Math.round(rate * 100);
        if (checkoutCouponNotice) {
          checkoutCouponNotice.textContent = `✓ Coupon ${rawCode} applied! You saved $${totals.discount.toFixed(2)} (${percent}% off).`;
          checkoutCouponNotice.style.color = "var(--accent-green)";
          checkoutCouponNotice.style.display = "block";
        }
      } else {
        // Explicit requirement: Do not show a success message for an invalid coupon
        if (checkoutCouponNotice) {
          checkoutCouponNotice.textContent = "Invalid coupon code. Try WELCOME15";
          checkoutCouponNotice.style.color = "var(--danger)";
          checkoutCouponNotice.style.display = "block";
        }
      }
    });
  }

  // Place Order explicit action with full validation and anti-duplicate click protection
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (isPlacingOrder) return; // Prevent accidental duplicate submissions

      const cart = window.getCart ? window.getCart() : [];
      if (!cart || cart.length === 0) {
        alert("Your cart is empty. Please add books before checking out.");
        return;
      }

      const totals = window.getCartTotals ? window.getCartTotals() : { hasPhysical: true, grandTotal: 0 };
      const hasPhysical = totals.hasPhysical;

      // Clear previous field errors
      clearFieldError(checkoutName, checkoutNameError);
      clearFieldError(checkoutEmail, checkoutEmailError);
      clearFieldError(checkoutMobile, checkoutMobileError);
      clearFieldError(checkoutStreet, checkoutStreetError);
      clearFieldError(checkoutCity, checkoutCityError);
      clearFieldError(checkoutState, checkoutStateError);
      clearFieldError(checkoutPincode, checkoutPincodeError);

      const nameVal = checkoutName ? checkoutName.value.trim() : "";
      const emailVal = checkoutEmail ? checkoutEmail.value.trim().toLowerCase() : "";
      const mobileVal = checkoutMobile ? checkoutMobile.value.trim() : "";
      const streetVal = checkoutStreet ? checkoutStreet.value.trim() : "";
      const cityVal = checkoutCity ? checkoutCity.value.trim() : "";
      const stateVal = checkoutState ? checkoutState.value.trim() : "";
      const pinVal = checkoutPincode ? checkoutPincode.value.trim() : "";

      let hasError = false;

      // Contact Name validation
      if (!nameVal || nameVal.length < 2) {
        setFieldError(checkoutName, checkoutNameError, "Please enter recipient name (minimum 2 characters).");
        hasError = true;
      }

      // Email validation
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(checkoutEmail, checkoutEmailError, "Please enter a valid email address.");
        hasError = true;
      }

      // For physical book orders: require delivery address and mobile number
      if (hasPhysical) {
        // Requirement 2 & 6: Indian mobile numbers as exactly 10 digits, numbers only
        if (!isValidMobileNumber(mobileVal)) {
          setFieldError(checkoutMobile, checkoutMobileError, "Mobile number must be exactly 10 digits (numbers only).");
          hasError = true;
        }

        if (!streetVal) {
          setFieldError(checkoutStreet, checkoutStreetError, "Street / Flat address is required.");
          hasError = true;
        }

        if (!cityVal) {
          setFieldError(checkoutCity, checkoutCityError, "City is required.");
          hasError = true;
        }

        if (!stateVal) {
          setFieldError(checkoutState, checkoutStateError, "Please select your state / UT.");
          hasError = true;
        }

        // Requirement 2: PIN code exactly 6 digits, numbers only
        if (!isValidPinCode(pinVal)) {
          setFieldError(checkoutPincode, checkoutPincodeError, "PIN code must be exactly 6 digits (numbers only).");
          hasError = true;
        }
      }

      if (hasError) {
        // Scroll to the first error
        const firstInvalid = document.querySelector(".field-error-text.visible");
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // Lock button to prevent duplicate clicks
      isPlacingOrder = true;
      placeOrderBtn.disabled = true;
      placeOrderBtn.textContent = "⏳ Finalizing Order...";

      // Simulate network settlement delay
      setTimeout(() => {
        // Generate simple unique order number: BOK-XXXXXX
        const orderId = `BOK-${Math.floor(100000 + Math.random() * 900000)}`;
        const orderDate = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        });

        const newOrder = {
          orderId: orderId,
          date: orderDate,
          userEmail: emailVal,
          userName: nameVal,
          userMobile: hasPhysical ? mobileVal : null,
          paymentMethod: selectedPaymentMethod,
          items: cart.map((item) => ({
            id: item.id,
            bookId: item.bookId,
            title: item.title,
            author: item.author,
            format: item.format,
            price: item.price,
            quantity: item.quantity,
            coverUrl: item.coverUrl
          })),
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          discount: totals.discount,
          tax: totals.estimatedTax,
          total: totals.grandTotal,
          address: hasPhysical
            ? {
                street: streetVal,
                city: cityVal,
                state: stateVal,
                pincode: pinVal
              }
            : null,
          isDigitalOnly: !hasPhysical
        };

        // Save order to browser storage (Requirement 6 & 7)
        try {
          const existingOrders = JSON.parse(localStorage.getItem("bookora_orders") || "[]");
          existingOrders.unshift(newOrder); // newest first
          localStorage.setItem("bookora_orders", JSON.stringify(existingOrders));
        } catch (err) {
          console.error("Error saving order to localStorage:", err);
        }

        // Clear cart ONLY after successful simulated order placement
        if (window.clearCart) window.clearCart();

        // Render Confirmation View
        if (checkoutActiveFlow) checkoutActiveFlow.style.display = "none";
        if (orderConfirmationSection) orderConfirmationSection.style.display = "block";

        const confirmOrderNumber = document.getElementById("confirmOrderNumber");
        const confirmItemsList = document.getElementById("confirmItemsList");
        const confirmRecipientText = document.getElementById("confirmRecipientText");
        const confirmMobileText = document.getElementById("confirmMobileText");
        const confirmAddressText = document.getElementById("confirmAddressText");
        const confirmSubtotal = document.getElementById("confirmSubtotal");
        const confirmDiscountRow = document.getElementById("confirmDiscountRow");
        const confirmDiscount = document.getElementById("confirmDiscount");
        const confirmDiscountPercent = document.getElementById("confirmDiscountPercent");
        const confirmShipping = document.getElementById("confirmShipping");
        const confirmTax = document.getElementById("confirmTax");
        const confirmPaymentMethod = document.getElementById("confirmPaymentMethod");
        const confirmGrandTotal = document.getElementById("confirmGrandTotal");

        if (confirmOrderNumber) confirmOrderNumber.textContent = orderId;
        if (confirmRecipientText) confirmRecipientText.textContent = `${nameVal} (${emailVal})`;
        if (confirmMobileText) {
          confirmMobileText.textContent = hasPhysical ? `Mobile: ${mobileVal}` : "Digital delivery (No mobile required)";
        }
        if (confirmAddressText) {
          confirmAddressText.textContent = hasPhysical
            ? `${streetVal}, ${cityVal}, ${stateVal} - ${pinVal}`
            : "Digital Access (Download links sent via email)";
        }
        if (confirmSubtotal) confirmSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
        if (confirmDiscountRow && confirmDiscount) {
          if (totals.discount > 0) {
            confirmDiscountRow.style.display = "flex";
            confirmDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
            if (confirmDiscountPercent) {
              const applied = window.getAppliedCoupon ? window.getAppliedCoupon() : "";
              const rate = window.getCouponDiscountRate ? window.getCouponDiscountRate(applied) : 0.15;
              confirmDiscountPercent.textContent = `${Math.round(rate * 100)}%`;
            }
          } else {
            confirmDiscountRow.style.display = "none";
          }
        }
        if (confirmShipping) confirmShipping.textContent = totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`;
        if (confirmTax) confirmTax.textContent = `$${totals.estimatedTax.toFixed(2)}`;
        if (confirmPaymentMethod) confirmPaymentMethod.textContent = selectedPaymentMethod;
        if (confirmGrandTotal) confirmGrandTotal.textContent = `$${totals.grandTotal.toFixed(2)}`;

        if (confirmItemsList) {
          confirmItemsList.innerHTML = newOrder.items
            .map(
              (item) =>
                `<li>${item.quantity} × <strong>${item.title}</strong> (${item.format}) — $${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join("");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 700);
    });
  }

  // Initial render
  renderCheckoutPage();
});
