/**
 * Practical 8: TypeScript Interface
 * Defines the strict type contract for a Book object in Bookora.
 */

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
}
