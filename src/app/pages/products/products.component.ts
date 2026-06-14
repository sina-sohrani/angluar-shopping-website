import { Component, computed, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);

  readonly selectedCategory = signal<ProductCategory | 'All'>('All');
  readonly toastVisible = signal(false);
  readonly loading = this.productService.loading;
  readonly error = this.productService.error;

  readonly categories = computed(
    () => ['All', ...this.productService.getCategories()] as const,
  );

  readonly filteredProducts = computed(() =>
    this.productService.getProductsByCategory(this.selectedCategory()),
  );

  selectCategory(category: ProductCategory | 'All'): void {
    this.selectedCategory.set(category);
  }

  showToast(): void {
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }
}
