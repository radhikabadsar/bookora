/**
 * Bookora Bookstore - Account, Authentication & Profile Address Module
 * Implements strict client-side registration, sign-in, profile updates, and order history
 */

const USERS_STORAGE_KEY = "bookora_users";
const CURRENT_USER_KEY = "bookora_current_user";
const ORDERS_STORAGE_KEY = "bookora_orders";

// Helper: Get registered users array
function getRegisteredUsers() {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error loading users:", e);
    return [];
  }
}

// Helper: Save registered users array
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users:", e);
  }
}

// Helper: Get currently signed-in user
function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error loading current user session:", e);
    return null;
  }
}

// Helper: Set currently signed-in user
function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Helper: Get all orders from storage
function getAllOrders() {
  const data = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error loading orders:", e);
    return [];
  }
}

// Validation helpers
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/**
 * Password Requirements Check:
 * - Minimum 8 characters
 * - At least one uppercase letter ([A-Z])
 * - At least one lowercase letter ([a-z])
 * - At least one digit ([0-9])
 * - At least one special character ([^A-Za-z0-9])
 */
function validatePasswordRules(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter (A-Z).";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter (a-z).";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one digit (0-9).";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character (!@#$%^&* etc).";
  }
  return null; // Valid!
}

// PIN code validation: exactly 6 digits, numbers only
function isValidPinCode(pincode) {
  return /^\d{6}$/.test(String(pincode).trim());
}

// Indian mobile number validation: exactly 10 digits, numbers only
function isValidMobileNumber(mobile) {
  return /^\d{10}$/.test(String(mobile).trim());
}

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const authSection = document.getElementById("authSection");
  const profileSection = document.getElementById("profileSection");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const accountNotice = document.getElementById("accountNotice");
  const profileNotice = document.getElementById("profileNotice");

  const profileNameInput = document.getElementById("profileName");
  const profileEmailInput = document.getElementById("profileEmail");
  const profileMobileInput = document.getElementById("profileMobile");
  const profileStreetInput = document.getElementById("profileStreet");
  const profileCityInput = document.getElementById("profileCity");
  const profileStateInput = document.getElementById("profileState");
  const profilePincodeInput = document.getElementById("profilePincode");
  const profileForm = document.getElementById("profileForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const orderHistoryContainer = document.getElementById("orderHistoryContainer");

  // Show / Hide Notice Banners
  function showNotice(target, message, type = "success") {
    if (!target) return;
    target.textContent = message;
    target.className = `notice-banner notice-${type}`;
    target.style.display = "block";
  }

  function hideNotice(target) {
    if (!target) return;
    target.style.display = "none";
  }

  function setFieldError(input, errorElement, message) {
    if (input) input.classList.add("invalid");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("visible");
    }
  }

  function clearFieldError(input, errorElement) {
    if (input) input.classList.remove("invalid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
  }

  // Render view depending on whether a user is signed in
  function renderAccountView() {
    const currentUser = getCurrentUser();

    if (currentUser) {
      // User is signed in -> Show Profile & Address & Orders
      if (authSection) authSection.style.display = "none";
      if (profileSection) profileSection.style.display = "block";

      // Populate profile fields
      if (profileNameInput) profileNameInput.value = currentUser.name || "";
      if (profileEmailInput) profileEmailInput.value = currentUser.email || "";
      if (profileMobileInput) profileMobileInput.value = currentUser.mobile || "";

      const addr = currentUser.address || {};
      if (profileStreetInput) profileStreetInput.value = addr.street || "";
      if (profileCityInput) profileCityInput.value = addr.city || "";
      if (profileStateInput) profileStateInput.value = addr.state || "";
      if (profilePincodeInput) profilePincodeInput.value = addr.pincode || "";

      renderOrderHistory(currentUser.email);
    } else {
      // User is NOT signed in -> Show Sign-In / Register
      if (authSection) authSection.style.display = "block";
      if (profileSection) profileSection.style.display = "none";
    }
  }

  // Render previous orders for signed-in user
  function renderOrderHistory(userEmail) {
    if (!orderHistoryContainer) return;
    const allOrders = getAllOrders();
    const userOrders = allOrders.filter(
      (o) => o.userEmail && o.userEmail.toLowerCase() === String(userEmail).toLowerCase()
    );

    if (userOrders.length === 0) {
      orderHistoryContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-canvas); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.25rem;">No Previous Orders</h4>
          <p style="font-size: 0.85rem;">When you complete purchases, your order receipts will be stored here.</p>
        </div>
      `;
      return;
    }

    orderHistoryContainer.innerHTML = userOrders
      .map((order) => {
        const itemsList = (order.items || [])
          .map((item) => {
            const cleanTitle = window.formatHumanReadableTitle ? window.formatHumanReadableTitle(item.title) : (item.title || "Book Edition");
            return `<li>${item.quantity || 1} × <strong>${cleanTitle}</strong> (${item.format || "Hardcover"}) - $${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</li>`;
          })
          .join("");

        const addressLine = order.address
          ? `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
          : "Digital Access (No physical shipping required)";

        return `
          <div style="background: var(--bg-canvas); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
              <div>
                <span style="font-family: monospace; font-weight: 700; color: var(--accent-green); font-size: 0.95rem;">${order.orderId}</span>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Placed on ${order.date}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">$${order.total.toFixed(2)}</span>
                <div style="font-size: 0.75rem; color: #166534; font-weight: 600;">Confirmed</div>
                ${order.discount ? `<div style="font-size: 0.72rem; color: #166534; margin-top: 2px;">Saved $${order.discount.toFixed(2)} with coupon</div>` : ""}
              </div>
            </div>

            <ul style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.85rem; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
              ${itemsList}
            </ul>

            <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div><strong>Payment:</strong> ${order.paymentMethod}</div>
              <div style="margin-top: 3px;"><strong>Delivery Destination:</strong> ${addressLine}</div>
              ${order.userMobile ? `<div style="margin-top: 3px;"><strong>Contact Mobile:</strong> ${order.userMobile}</div>` : ""}
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Tab switching between Sign-In and Register
  if (tabLogin && tabRegister && loginForm && registerForm) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      hideNotice(accountNotice);
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      hideNotice(accountNotice);
    });
  }

  // -------------------------------------------------------------------------
  // 1. Sign In Submission Logic
  // -------------------------------------------------------------------------
  if (loginForm) {
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginEmailError = document.getElementById("loginEmailError");
    const loginPasswordError = document.getElementById("loginPasswordError");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideNotice(accountNotice);
      clearFieldError(loginEmail, loginEmailError);
      clearFieldError(loginPassword, loginPasswordError);

      const emailVal = loginEmail.value.trim().toLowerCase();
      const passVal = loginPassword.value;
      let hasError = false;

      if (!emailVal) {
        setFieldError(loginEmail, loginEmailError, "Email address is required.");
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        setFieldError(loginEmail, loginEmailError, "Please enter a valid email address.");
        hasError = true;
      }

      if (!passVal) {
        setFieldError(loginPassword, loginPasswordError, "Password is required.");
        hasError = true;
      }

      if (hasError) return;

      // Verification against registered accounts
      const users = getRegisteredUsers();
      const existingUser = users.find((u) => u.email.toLowerCase() === emailVal);

      if (!existingUser) {
        // Requirement 1: Signing in with unregistered email displays appropriate error
        setFieldError(
          loginEmail,
          loginEmailError,
          "No account found with this email. Please create an account first."
        );
        showNotice(accountNotice, "No account found with this email. Please register below.", "danger");
        return;
      }

      if (existingUser.password !== passVal) {
        // Requirement 1: Signing in with registered email and incorrect password
        setFieldError(loginPassword, loginPasswordError, "Incorrect password. Please try again.");
        showNotice(accountNotice, "Incorrect password. Please verify and try again.", "danger");
        return;
      }

      // Successful credentials!
      setCurrentUser(existingUser);
      loginForm.reset();
      renderAccountView();
      showNotice(profileNotice, `Welcome back, ${existingUser.name}! You are signed in.`, "success");
    });
  }

  // -------------------------------------------------------------------------
  // 2. Account Registration Submission Logic
  // -------------------------------------------------------------------------
  if (registerForm) {
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regConfirm = document.getElementById("regConfirm");

    const regNameError = document.getElementById("regNameError");
    const regEmailError = document.getElementById("regEmailError");
    const regPasswordError = document.getElementById("regPasswordError");
    const regConfirmError = document.getElementById("regConfirmError");

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideNotice(accountNotice);
      clearFieldError(regName, regNameError);
      clearFieldError(regEmail, regEmailError);
      clearFieldError(regPassword, regPasswordError);
      clearFieldError(regConfirm, regConfirmError);

      const nameVal = regName.value.trim();
      const emailVal = regEmail.value.trim().toLowerCase();
      const passVal = regPassword.value;
      const confirmVal = regConfirm.value;
      let hasError = false;

      if (!nameVal || nameVal.length < 2) {
        setFieldError(regName, regNameError, "Please enter your full name (minimum 2 characters).");
        hasError = true;
      }

      if (!emailVal) {
        setFieldError(regEmail, regEmailError, "Email address is required.");
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        setFieldError(regEmail, regEmailError, "Please enter a valid email address.");
        hasError = true;
      }

      // Password complexity check
      const passwordRuleError = validatePasswordRules(passVal);
      if (passwordRuleError) {
        setFieldError(regPassword, regPasswordError, passwordRuleError);
        hasError = true;
      }

      if (confirmVal !== passVal) {
        setFieldError(regConfirm, regConfirmError, "Passwords do not match.");
        hasError = true;
      }

      if (hasError) return;

      // Check if email already registered
      const users = getRegisteredUsers();
      if (users.some((u) => u.email.toLowerCase() === emailVal)) {
        setFieldError(regEmail, regEmailError, "An account with this email already exists. Please sign in.");
        showNotice(accountNotice, "An account with this email already exists. Please sign in.", "danger");
        return;
      }

      // Create and save new user
      const newUser = {
        id: Date.now(),
        name: nameVal,
        email: emailVal,
        password: passVal,
        address: {
          state: "",
          city: "",
          street: "",
          pincode: ""
        }
      };

      users.push(newUser);
      saveRegisteredUsers(users);

      registerForm.reset();
      showNotice(
        accountNotice,
        `Account created successfully for ${nameVal}! You can now sign in with your email and password.`,
        "success"
      );

      // Switch to login tab and prefill email
      setTimeout(() => {
        if (tabLogin) tabLogin.click();
        const loginEmail = document.getElementById("loginEmail");
        if (loginEmail) loginEmail.value = emailVal;
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 3. Profile & Default Delivery Address Update
  // -------------------------------------------------------------------------
  if (profileForm) {
    const profileNameError = document.getElementById("profileNameError");
    const profileMobileError = document.getElementById("profileMobileError");
    const profileStateError = document.getElementById("profileStateError");
    const profileCityError = document.getElementById("profileCityError");
    const profileStreetError = document.getElementById("profileStreetError");
    const profilePincodeError = document.getElementById("profilePincodeError");

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideNotice(profileNotice);

      const currentUser = getCurrentUser();
      if (!currentUser) return;

      const updatedName = profileNameInput.value.trim();
      const updatedMobile = profileMobileInput ? profileMobileInput.value.trim() : "";
      const updatedStreet = profileStreetInput.value.trim();
      const updatedCity = profileCityInput.value.trim();
      const updatedState = profileStateInput ? profileStateInput.value.trim() : "";
      const updatedPincode = profilePincodeInput.value.trim();

      let hasError = false;

      if (!updatedName || updatedName.length < 2) {
        setFieldError(profileNameInput, profileNameError, "Please enter your name.");
        hasError = true;
      } else {
        clearFieldError(profileNameInput, profileNameError);
      }

      // Requirement 2: Indian mobile numbers as exactly 10 digits, numbers only
      if (!isValidMobileNumber(updatedMobile)) {
        setFieldError(profileMobileInput, profileMobileError, "Mobile number must be exactly 10 digits (numbers only).");
        hasError = true;
      } else {
        clearFieldError(profileMobileInput, profileMobileError);
      }

      if (!updatedStreet) {
        setFieldError(profileStreetInput, profileStreetError, "Street / Flat address is required.");
        hasError = true;
      } else {
        clearFieldError(profileStreetInput, profileStreetError);
      }

      if (!updatedCity) {
        setFieldError(profileCityInput, profileCityError, "City is required.");
        hasError = true;
      } else {
        clearFieldError(profileCityInput, profileCityError);
      }

      if (!updatedState) {
        setFieldError(profileStateInput, profileStateError, "Please select your state or union territory.");
        hasError = true;
      } else {
        clearFieldError(profileStateInput, profileStateError);
      }

      // Requirement 2: PIN code exactly 6 digits, numbers only
      if (!isValidPinCode(updatedPincode)) {
        setFieldError(profilePincodeInput, profilePincodeError, "PIN code must be exactly 6 digits (numbers only).");
        hasError = true;
      } else {
        clearFieldError(profilePincodeInput, profilePincodeError);
      }

      if (hasError) return;

      // Update current user
      currentUser.name = updatedName;
      currentUser.mobile = updatedMobile;
      currentUser.address = {
        street: updatedStreet,
        city: updatedCity,
        state: updatedState,
        pincode: updatedPincode
      };

      setCurrentUser(currentUser);

      // Update in registered users array
      const users = getRegisteredUsers();
      const userIndex = users.findIndex((u) => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (userIndex > -1) {
        users[userIndex].name = currentUser.name;
        users[userIndex].mobile = currentUser.mobile;
        users[userIndex].address = currentUser.address;
        saveRegisteredUsers(users);
      }

      showNotice(profileNotice, "Your profile and default delivery address have been updated successfully!", "success");
    });
  }

  // -------------------------------------------------------------------------
  // 4. Sign Out
  // -------------------------------------------------------------------------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setCurrentUser(null);
      renderAccountView();
      showNotice(accountNotice, "You have been signed out.", "success");
    });
  }

  // Initial view render
  renderAccountView();
});

// Global exports
window.getRegisteredUsers = getRegisteredUsers;
window.saveRegisteredUsers = saveRegisteredUsers;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.getAllOrders = getAllOrders;
window.isValidPinCode = isValidPinCode;
window.isValidMobileNumber = isValidMobileNumber;
window.isValidEmail = isValidEmail;
window.validatePasswordRules = validatePasswordRules;
