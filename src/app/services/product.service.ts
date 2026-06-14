import { Injectable, signal } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      description:
        'Premium noise-cancelling headphones with 40-hour battery life and crystal-clear sound.',
      price: 149.99,
      originalPrice: 199.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 324,
      badge: 'Best Seller',
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      description:
        'Track your fitness, receive notifications, and stay connected with style.',
      price: 299.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      rating: 4.6,
      reviewCount: 189,
      inStock: true,
    },
    {
      id: 3,
      name: 'Classic Leather Jacket',
      description:
        'Handcrafted genuine leather jacket with a timeless design for every season.',
      price: 189.99,
      originalPrice: 249.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 156,
      badge: 'Sale',
      inStock: true,
    },
    {
      id: 4,
      name: 'Minimalist Sneakers',
      description: 'Lightweight everyday sneakers with premium comfort and clean aesthetics.',
      price: 89.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      rating: 4.5,
      reviewCount: 412,
      inStock: true,
    },
    {
      id: 5,
      name: 'Ceramic Coffee Set',
      description: 'Elegant 6-piece ceramic coffee set perfect for your morning ritual.',
      price: 54.99,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca6d?w=600&h=600&fit=crop',
      rating: 4.9,
      reviewCount: 98,
      badge: 'New',
      inStock: true,
    },
    {
      id: 6,
      name: 'Scented Candle Collection',
      description: 'Set of 3 hand-poured soy candles with natural essential oils.',
      price: 34.99,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1602874801006-4f2740a4d2a2?w=600&h=600&fit=crop',
      rating: 4.4,
      reviewCount: 67,
      inStock: true,
    },
    {
      id: 7,
      name: 'Yoga Mat Premium',
      description: 'Non-slip eco-friendly yoga mat with carrying strap included.',
      price: 49.99,
      originalPrice: 69.99,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
      rating: 4.6,
      reviewCount: 203,
      inStock: true,
    },
    {
      id: 8,
      name: 'Running Shoes Elite',
      description: 'Engineered for speed and comfort with responsive cushioning technology.',
      price: 129.99,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 278,
      badge: 'Popular',
      inStock: true,
    },
    {
      id: 9,
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof speaker with 360° sound and 12-hour playtime.',
      price: 79.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      rating: 4.3,
      reviewCount: 145,
      inStock: true,
    },
    {
      id: 10,
      name: 'Linen Throw Blanket',
      description: 'Soft, breathable linen blanket that adds warmth and style to any room.',
      price: 64.99,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
    },
    {
      id: 11,
      name: 'Designer Sunglasses',
      description: 'UV400 protection with polarized lenses in a sleek modern frame.',
      price: 119.99,
      originalPrice: 159.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1572635196233-8f0f41b25115?w=600&h=600&fit=crop',
      rating: 4.5,
      reviewCount: 112,
      inStock: true,
    },
    {
      id: 12,
      name: 'Fitness Tracker Band',
      description: 'Monitor heart rate, sleep, and workouts with a sleek wearable design.',
      price: 59.99,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1575311373938-040b8e1fd5b6?w=600&h=600&fit=crop',
      rating: 4.2,
      reviewCount: 334,
      inStock: false,
    },
  ]);

  readonly allProducts = this.products.asReadonly();

  getFeaturedProducts(count = 4): Product[] {
    return this.products()
      .filter((p) => p.inStock)
      .slice(0, count);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  getProductsByCategory(category: ProductCategory | 'All'): Product[] {
    if (category === 'All') return this.products();
    return this.products().filter((p) => p.category === category);
  }

  getCategories(): ProductCategory[] {
    return ['Electronics', 'Fashion', 'Home', 'Sports'];
  }
}
