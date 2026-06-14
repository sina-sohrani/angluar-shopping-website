import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly productService = inject(ProductService);

  readonly featuredProducts = this.productService.getFeaturedProducts(4);
  readonly toastVisible = signal(false);

  readonly categories = [
    {
      name: 'Electronics',
      description: 'Latest gadgets & tech',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      name: 'Fashion',
      description: 'Trendy styles for you',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Home',
      description: 'Cozy living essentials',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      gradient: 'from-orange-400 to-yellow-500',
    },
    {
      name: 'Sports',
      description: 'Gear up & get active',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
      gradient: 'from-red-500 to-orange-500',
    },
  ];

  showToast(): void {
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }
}
