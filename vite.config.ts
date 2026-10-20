import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        books: resolve(import.meta.dirname, 'books.html'),
        cart: resolve(import.meta.dirname, 'cart.html'),
        account: resolve(import.meta.dirname, 'account.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        bookDetails: resolve(import.meta.dirname, 'book-details.html'),
        checkout: resolve(import.meta.dirname, 'checkout.html'),
        reactDemo: resolve(import.meta.dirname, 'react-demo.html'),
      },
    },
  },
})
