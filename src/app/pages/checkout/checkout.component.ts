import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.subtotal;
  readonly shipping = this.cartService.shipping;
  readonly total = this.cartService.total;
  readonly orderPlaced = signal(false);

  readonly checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    expiry: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3)]],
  });

  placeOrder(): void {
    if (this.checkoutForm.invalid || this.cartItems().length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.orderPlaced.set(true);
    this.cartService.clearCart();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
