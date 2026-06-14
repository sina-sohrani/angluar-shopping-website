import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.subtotal;
  readonly shipping = this.cartService.shipping;
  readonly total = this.cartService.total;

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
