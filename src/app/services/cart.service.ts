import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  readonly shipping = computed(() => (this.subtotal() >= 100 ? 0 : 9.99));

  readonly total = computed(() => this.subtotal() + this.shipping());

  addToCart(product: Product, quantity = 1): void {
    this.items.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: number): void {
    this.items.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.items.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  }

  clearCart(): void {
    this.items.set([]);
  }
}
