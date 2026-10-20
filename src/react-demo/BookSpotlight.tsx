import React, { useState } from 'react'
import type { Book } from './types'

/**
 * Typed Props Interface for BookSpotlight
 * Defines the strongly typed properties accepted by the functional component.
 */
interface BookSpotlightProps {
  initialBook: Book
  badgeTitle?: string
}

/**
 * BookSpotlight: React Functional Component with Typed Props and useState
 * 
 * Architecture Highlights:
 * 1. Interface: 'Book' and 'BookSpotlightProps' define compile-time type safety.
 * 2. Functional Component: Pure function returning typed JSX.
 * 3. Props: Read-only inputs passed from parent to child.
 * 4. useState: React Hook for dynamic, reactive component state without page reloads.
 */
export const BookSpotlight: React.FC<BookSpotlightProps> = ({
  initialBook,
  badgeTitle = 'Book Spotlight Component',
}) => {
  // useState 1: Book object state (demonstrating state updates)
  const [book, setBook] = useState<Book>(initialBook)

  // useState 2: Wishlist toggle state (boolean)
  const [isWishlist, setIsWishlist] = useState<boolean>(false)

  // useState 3: Quantity selector (number)
  const [quantity, setQuantity] = useState<number>(1)

  // Handler toggling inStock status
  const toggleStock = () => {
    setBook((prev) => ({
      ...prev,
      inStock: !prev.inStock,
    }))
  }

  const incrementQty = () => setQuantity((q) => q + 1)
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E0D3',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '560px',
        margin: '0 auto',
        boxShadow: '0 8px 24px rgba(28, 25, 23, 0.08)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span
          style={{
            backgroundColor: '#DCFCE7',
            color: '#166534',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {badgeTitle}
        </span>
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            color: isWishlist ? '#B45309' : '#78716C',
          }}
          title={isWishlist ? 'Saved to reading wishlist' : 'Add to wishlist'}
        >
          {isWishlist ? '★ In Wishlist' : '☆ Add to Wishlist'}
        </button>
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.45rem',
          color: '#1C1917',
          marginBottom: '0.35rem',
          lineHeight: 1.25,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {book.title}
      </h3>
      <p style={{ color: '#57534E', fontSize: '0.92rem', marginBottom: '1.25rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        by <strong>{book.author}</strong> &bull; Category: <em>{book.category}</em>
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAF7F2',
          border: '1px solid #E7E0D3',
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', color: '#78716C', textTransform: 'uppercase', fontWeight: 600 }}>
            Unit Edition Price
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14532D' }}>
            ${book.price.toFixed(2)}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.78rem', color: '#78716C', textTransform: 'uppercase', fontWeight: 600 }}>
            Availability
          </div>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: book.inStock ? '#DCFCE7' : '#FEE2E2',
              color: book.inStock ? '#166534' : '#991B1B',
            }}
          >
            {book.inStock ? '● In Stock' : '✕ Out of Stock'}
          </span>
        </div>
      </div>

      {/* Interactive Controls demonstrating useState */}
      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E7E0D3', borderRadius: '8px', overflow: 'hidden' }}>
          <button
            onClick={decrementQty}
            style={{ width: '32px', height: '32px', background: '#F4EFE6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            title="Decrease quantity"
          >
            -
          </button>
          <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
            {quantity}
          </span>
          <button
            onClick={incrementQty}
            style={{ width: '32px', height: '32px', background: '#F4EFE6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            title="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={toggleStock}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#F4EFE6',
            color: '#1C1917',
            border: '1px solid #E7E0D3',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          title="Demonstrates mutating local state using setBook"
        >
          Toggle Stock (Test useState)
        </button>

        <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: '1.1rem', color: '#1C1917' }}>
          Total: ${(book.price * quantity).toFixed(2)}
        </span>
      </div>

      <div
        style={{
          marginTop: '1.25rem',
          padding: '0.85rem',
          backgroundColor: '#FAF7F2',
          borderRadius: '8px',
          borderLeft: '3px solid #14532D',
          fontSize: '0.8rem',
          color: '#57534E',
          lineHeight: 1.5,
        }}
      >
        <strong>Component Architecture Note:</strong> This is a standalone React functional component written in TypeScript. It enforces a typed <code>Book</code> interface, receives strongly typed props, and dynamically re-renders reactive UI state using <code>useState</code>.
      </div>
    </div>
  )
}

export default BookSpotlight
