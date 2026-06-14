import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductCategory } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly products = signal<Product[]>([]);
  private readonly categories = signal<ProductCategory[]>([]);

  readonly allProducts = this.products.asReadonly();
  readonly allCategories = this.categories.asReadonly();
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly featuredProducts = computed(() =>
    this.products()
      .filter((p) => p.inStock)
      .slice(0, 4),
  );

  constructor() {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.http.get<Product[]>(`${this.apiUrl}/products/`).subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  private loadCategories(): void {
    this.http.get<ProductCategory[]>(`${this.apiUrl}/products/categories/`).subscribe({
      next: (categories) => this.categories.set(categories),
      error: () => this.categories.set(['Electronics', 'Fashion', 'Home', 'Sports']),
    });
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  getProductsByCategory(category: ProductCategory | 'All'): Product[] {
    if (category === 'All') return this.products();
    return this.products().filter((p) => p.category === category);
  }

  getCategories(): ProductCategory[] {
    return this.categories();
  }
}
