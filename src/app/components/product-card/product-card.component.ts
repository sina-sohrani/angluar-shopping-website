import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);

  readonly product = input.required<Product>();
  readonly added = output<void>();

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.product().inStock) return;
    this.cartService.addToCart(this.product());
    this.added.emit();
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => (i < Math.floor(rating) ? 1 : 0));
  }
}
