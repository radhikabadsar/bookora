# 📚 Bookora — Modern Online Bookstore (WT Lab Project)

> **Web Technology Laboratory Mini Project**  
> Comprehensive implementation mapping to **Practicals 1 through 9** of the Web Technology curriculum.

Bookora is a modern, responsive e-commerce bookstore web application designed with an editorial aesthetic inspired by authentic literary houses. The customer-facing application is built cleanly with **semantic HTML5, shared CSS3, and modern Vanilla JavaScript**, while strictly isolating a typed **React 19 + TypeScript component** to fulfill coursework requirements (Practical 8).

---

## 🎯 Syllabus Mapping Matrix (Practicals 1–9)

| Practical | Syllabus Curriculum Topic | Technical Implementation in Bookora |
| :--- | :--- | :--- |
| **Practical 1** | Semantic HTML5 & Structure | Five interconnected pages (`index.html`, `books.html`, `cart.html`, `account.html`, `about.html`) structured with semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`). |
| **Practical 2** | CSS Styling, Flexbox, Grid & Layouts | Shared external stylesheet (`css/style.css`) using CSS variables, warm editorial canvas (`#FAF7F2`), deep green accents (`#14532D`), Flexbox navigation, responsive CSS Grid book layouts (`repeat(auto-fill, minmax(250px, 1fr))`), and media queries. |
| **Practical 3** | JavaScript Fundamentals & Control Flow | ES6 arrow functions, `const`/`let` lexical scoping, template literals, conditional operators, and formatting helpers across `js/data.js`, `js/cart.js`, and `js/books.js`. |
| **Practical 4** | DOM Manipulation & Element Rendering | Dynamic generation of book cards (`booksGrid.innerHTML`), cart row elements with image thumbnails and controls, and non-blocking toast notifications. |
| **Practical 5** | JavaScript Events & Client-Side Validation | Real-time `input` live search, category `click` event listeners, tab switching, and complete form validation (`submit`, `e.preventDefault()`, email regex, password strength, and field error highlights in `js/account.js`). |
| **Practical 6** | Arrays, Objects, `map()`, `filter()`, `reduce()` | &bull; Books catalog structured as an array of objects in `js/data.js`<br>&bull; `Array.prototype.filter()` used for instant search and category filtering in `js/books.js`<br>&bull; `Array.prototype.map()` used to transform book objects into HTML cards and cart rows<br>&bull; `Array.prototype.reduce()` used in `js/cart.js` to compute total items count, subtotal, sales tax, and grand total. |
| **Practical 7** | Fetch API, Promises & `async/await` | Live public REST API integration with Open Library (`https://openlibrary.org/subjects/classic_literature.json?limit=4`) in `js/books.js`, featuring loading spinners, HTTP status verification, and `try/catch` error messaging with a retry button. |
| **Practical 8** | React Functional Components, TypeScript, Props & `useState` | Isolated React 19 + TypeScript component in `src/react-demo/BookSpotlight.tsx` featuring a typed `Book` interface (`types.ts`), typed props (`BookSpotlightProps`), and reactive state management via `useState` (quantity counter, stock toggle, wishlist). Mounted via `react-demo.html`. |
| **Practical 9** | Git & GitHub Version Control | Initialized local Git repository (`git init`), comprehensive `.gitignore`, clean multi-page build configuration, and commit-ready code organization. |

---

## 📁 Project Directory Structure

```
Bookora/
├── index.html               # Page 1: Home (Hero banner, search shortcut, bestsellers, new releases)
├── books.html               # Page 2: Catalogue (Search input, category pills, dynamic cards, Open Library discovery)
├── cart.html                # Page 3: Cart (Item table with covers, +/- quantity controls, reduce() totals)
├── account.html             # Page 4: My Account (Sign In, Create Account, mobile & address profile, order history)
├── about.html               # Page 5: About (Independent bookstore story, values, and contact form)
├── book-details.html        # Book Details (Format switcher: E-book, Paperback, Hardcover, sample reviews)
├── checkout.html            # Checkout Flow (Address, Payment methods, Review Order, Order Confirmation)
├── react-demo.html          # Practical 8 Isolated Component Demo (Viva examination page)
├── css/
│   └── style.css            # Shared editorial stylesheet (warm paper canvas, deep green accents)
├── js/
│   ├── data.js              # Real book objects dataset with format prices & sample reviews
│   ├── cart.js              # Cart state management (localStorage, format specificity, reduce() totals)
│   ├── main.js              # Global active link indicator & cart counter badge utilities
│   ├── books.js             # Catalogue rendering (filter, map) & Practical 7 Open Library discovery
│   ├── account.js           # Account authentication, Indian mobile & PIN validation, order history
│   └── checkout.js          # Multi-step checkout, physical/digital validation, simulated payments
├── src/
│   └── react-demo/
│       ├── types.ts         # Practical 8 TypeScript 'Book' interface
│       ├── BookSpotlight.tsx# Practical 8 React functional component with typed props & useState
│       └── main.tsx         # React bootstrap mounting into react-demo.html
├── vite.config.ts           # Multi-page application (MPA) build configuration
├── tsconfig.json            # Base TypeScript configuration
├── tsconfig.app.json        # Client application TypeScript rules
├── package.json             # Project dependencies and npm scripts
├── .gitignore               # Ignored files (node_modules, dist, logs)
└── README.md                # Project documentation and practical mappings
```

---

## 🚀 How to Run the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.
Navigate through the five pages:
- **Home:** `http://localhost:5173/index.html` (or `/`)
- **Catalogue:** `http://localhost:5173/books.html`
- **Shopping Cart:** `http://localhost:5173/cart.html`
- **My Account:** `http://localhost:5173/account.html`
- **About Us:** `http://localhost:5173/about.html`
- **Practical 8 React Component Demo:** `http://localhost:5173/react-demo.html`

### 3. Build & Verify TypeScript Compilation
```bash
npm run build
```
Compiles and bundles all six HTML pages, CSS, and the React + TypeScript asset bundle with zero errors.

---

## 🎓 Student Viva Quick Reference

1. **How is the book search and filtering executed? (Practical 6)**
   In `js/books.js`, `renderBooks()` chains `Array.prototype.filter()`:
   ```javascript
   const filtered = window.initialBooks.filter((book) => {
     const matchesCategory = activeCategory === "All" || book.category === activeCategory;
     const q = searchKeyword.toLowerCase().trim();
     const matchesSearch = q === "" || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
     return matchesCategory && matchesSearch;
   });
   ```

2. **How are cart totals computed? (Practical 6)**
   In `js/cart.js`, `getCartTotals()` uses `Array.prototype.reduce()`:
   ```javascript
   const totalItems = cart.reduce((accum, item) => accum + item.quantity, 0);
   const subtotal = cart.reduce((accum, item) => accum + item.price * item.quantity, 0);
   ```

3. **How does the external API work? (Practical 7)**
   In `js/books.js`, `fetchOpenLibraryBooks()` uses `async`/`await` with `fetch()` to call Open Library's public REST API, updating `#discoveryStatus` with a spinner during loading and presenting error notices if network access is offline.

4. **How does Practical 8 satisfy React + TypeScript?**
   In `src/react-demo/`:
   - `types.ts` defines `export interface Book { id: number; title: string; price: number; inStock: boolean; ... }`
   - `BookSpotlight.tsx` is a functional component taking `BookSpotlightProps` and managing state via `useState` (`const [quantity, setQuantity] = useState(1)` and `const [book, setBook] = useState(initialBook)`).

---

## 🔒 Client-Side Storage Architecture & Limitations (Coursework Notice)

For the purpose of academic Web Technology lab coursework and viva examinations, user accounts, profiles, delivery addresses, mobile numbers, shopping carts, newsletter subscriptions, and order histories are persisted exclusively using **browser Web Storage (`localStorage`)**.

### Important Security & Architectural Limitations:
1. **No Backend Authentication Server:** Bookora does not use a server-side authentication service (e.g., Node.js, Express, OAuth, Firebase, or JWT). Registration and sign-in logic are simulated on the client side using pure JavaScript.
2. **Plaintext Local Storage:** Data stored in `localStorage` is stored as unencrypted JSON strings. It is accessible to scripts within the same origin and is susceptible to local machine inspection and XSS (Cross-Site Scripting). Real production applications require HTTPS, salted cryptographic hashing (e.g. bcrypt or Argon2) on a protected backend, and secure HTTP-only cookies.
3. **Browser Isolation:** User accounts and cart items exist solely inside the specific browser profile where they were created. They do not synchronize across devices, browsers, or private browsing (incognito) sessions.
4. **Demonstration Payments:** All checkout payments (Cash on Delivery, UPI, Net Banking) are purely simulated for viva demonstration. Bookora never collects real banking credentials, transmits payment gateway payloads, or debits monetary balances.

