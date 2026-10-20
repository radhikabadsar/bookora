import { createRoot } from 'react-dom/client'
import { BookSpotlight } from './BookSpotlight'
import type { Book } from './types'

/**
 * Sample Book instance strictly complying with Book interface
 */
const sampleBook: Book = {
  id: 1,
  title: 'To Kill a Mockingbird (Special Hardcover Edition)',
  author: 'Harper Lee',
  price: 18.99,
  category: 'Fiction',
  rating: 4.9,
  inStock: true,
}

// Mount the React component into the isolated container on react-demo.html
const container = document.getElementById('react-demo-root')
if (container) {
  const root = createRoot(container)
  root.render(<BookSpotlight initialBook={sampleBook} badgeTitle="Interactive React + TypeScript Showcase" />)
}
