import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  private readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 },
  );

  readonly product = computed(() => {
    const id = this.productId();
    return this.productService.allProducts().find((p) => p.id === id);
  });
  readonly loading = this.productService.loading;
  readonly error = this.productService.error;
  readonly quantity = signal(1);
  readonly added = signal(false);

  incrementQuantity(): void {
    this.quantity.update((q) => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart(): void {
    const product = this.product();
    if (!product?.inStock) return;
    this.cartService.addToCart(product, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2500);
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => (i < Math.floor(rating) ? 1 : 0));
  }
}
