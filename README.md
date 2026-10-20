# 📚 Bookora — Modern Literary Bookstore Web Application

Bookora is a modern, responsive e-commerce bookstore web application designed with an editorial aesthetic inspired by authentic literary publishing houses. The storefront is built using **semantic HTML5, modern CSS3 (Flexbox & responsive Grid), and modular Vanilla JavaScript**, paired with an isolated **React 19 + TypeScript component showcase** illustrating clean state management and type safety.

---

## ✨ Features

- **Editorial Visual Aesthetics:** Warm paper canvas (`#FAF7F2`), deep evergreen accents (`#14532D`), bespoke typography, subtle micro-interactions, and responsive layout across mobile, tablet, and desktop devices.
- **Dynamic Catalogue & Filtering:**
  - Real-time search across titles and authors.
  - Category filtering (Fiction, Classic Literature, Non-Fiction, Sci-Fi & Dystopian, Self-Help).
  - Format-specific price tracking (Paperback, Hardcover, E-Book).
- **Public REST API Discovery:**
  - Live integration with the [Open Library Subjects API](https://openlibrary.org/developers/api) to dynamically discover classic literature.
  - Interactive loading spinner, resilient error handling, and manual retry controls.
- **Shopping Cart & Checkout Flow:**
  - Multi-item cart management with quantity controls and real-time subtotal, tax, and grand total calculations.
  - Delivery address form with Indian PIN code auto-fill (Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad, Ahmedabad, Pune).
  - Format-aware physical/digital shipping validation.
  - Client-side payment method simulation (Cash on Delivery, UPI, Net Banking) with instant order confirmation.
- **Account & Profile Management:**
  - Client-side authentication (Sign Up / Sign In) with form validation: email format, password complexity rules, and confirm-password verification.
  - Profile customization (contact information, default shipping address) and persistent order history tracking.
- **Interactive React 19 + TypeScript Showcase:**
  - A standalone, strongly typed component (`BookSpotlight`) demonstrating a typed `Book` interface, functional component props, and interactive local state via `useState`.
  - Accessible via [`react-demo.html`](react-demo.html).

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Markup & Semantics** | Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<form>`) |
| **Styling & Layout** | Vanilla CSS3, CSS Custom Properties (Variables), Flexbox, Responsive CSS Grid (`repeat(auto-fill, minmax(250px, 1fr))`), Media Queries |
| **Client-Side Logic** | Vanilla JavaScript (ES6+ Modules, Array methods `filter`/`map`/`reduce`, Fetch API, `localStorage` persistence) |
| **Component Layer** | React 19, TypeScript, Strict Props & Domain Typing |
| **Build & Tooling** | Vite 8 (Multi-Page Application rollup), TypeScript Compiler (`tsc`), Oxlint |

---

## 📁 Directory Structure

```
Bookora/
├── index.html               # Storefront Home (Hero banner, search shortcut, curated collections)
├── books.html               # Catalog (Live search, category pills, dynamic cards, Open Library discovery)
├── book-details.html        # Book Detail Page (Edition selector, synopsis, customer reviews)
├── cart.html                # Shopping Cart (Item table, quantity controls, reduce-driven price summary)
├── checkout.html            # Checkout Flow (Shipping address, payment selection, order confirmation)
├── account.html             # Customer Account (Sign In, Registration, Address Book, Order History)
├── about.html               # About Bookora (Editorial philosophy, values, newsletter, contact form)
├── react-demo.html          # Interactive React 19 + TypeScript Component Showcase
├── css/
│   └── style.css            # Shared design system (warm editorial canvas, typography, components)
├── js/
│   ├── data.js              # Curated books dataset, edition formats, and sample reviews
│   ├── cart.js              # Cart state management (localStorage, item quantities, total calculation)
│   ├── main.js              # Header state, navigation indicator, and cart count badges
│   ├── books.js             # Catalog rendering, live filtering, and Open Library REST API integration
│   ├── account.js           # Client-side authentication, form validation, and profile management
│   └── checkout.js          # Multi-step checkout validation, address lookup, and simulated payment
├── src/
│   └── react-demo/
│       ├── types.ts         # TypeScript domain interface ('Book')
│       ├── BookSpotlight.tsx# React functional component with typed props & useState
│       └── main.tsx         # React bootstrap mounting into react-demo.html
├── vite.config.ts           # Multi-page application (MPA) Vite configuration
├── tsconfig.json            # Base TypeScript configuration
├── package.json             # Project dependencies and npm scripts
├── .gitignore               # Ignored build artifacts, dependencies, and local configs
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- npm or equivalent package manager

### 1. Clone & Install
```bash
git clone https://github.com/radhikabadsar/bookora.git
cd bookora
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to explore the storefront.

Key page entry points:
- **Home:** `http://localhost:5173/index.html` (or `/`)
- **Catalogue:** `http://localhost:5173/books.html`
- **Book Details:** `http://localhost:5173/book-details.html?id=1`
- **Shopping Cart:** `http://localhost:5173/cart.html`
- **Checkout:** `http://localhost:5173/checkout.html`
- **Account:** `http://localhost:5173/account.html`
- **About:** `http://localhost:5173/about.html`
- **React Showcase:** `http://localhost:5173/react-demo.html`

### 3. Build & Verify
```bash
npm run build
```
Executes TypeScript type-checking across all `.ts` and `.tsx` sources and generates the optimized production bundle in `dist/`.

---

## 🔒 Architecture & Demonstration Considerations

Bookora is designed as an interactive, client-side web application demonstration. Please note the following architectural considerations:

1. **Client-Side Persistence:** User accounts, shopping carts, delivery addresses, and simulated orders are stored locally in browser `localStorage`. Data persists across tab refreshes within the same browser session, but does not synchronize across different browsers or private browsing windows.
2. **Simulated Payments:** All payment options (Cash on Delivery, UPI, Net Banking) are simulated demonstrations. No real financial credentials are collected, and no banking transactions occur.
3. **No External Authentication Backend:** Sign-up, sign-in, and session states are managed on the client for demonstration purposes. In a commercial production environment, these features should be backed by a secure authentication API with HTTPS, server-side cryptographic hashing, and HTTP-only session cookies.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
