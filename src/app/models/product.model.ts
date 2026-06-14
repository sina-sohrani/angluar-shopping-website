export type ProductCategory = 'Electronics' | 'Fashion' | 'Home' | 'Sports';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
}
