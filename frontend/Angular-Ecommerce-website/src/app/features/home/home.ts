import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../layouts/components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400',
    },
    {
      id: 'home-decor',
      name: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=400',
    },
  ];

  products = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 299,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400',
      rating: { rate: 4.8 },
      badge: 'Hot',
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 199,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400',
      rating: { rate: 4.5 },
      badge: 'Sale',
    },
    {
      id: 3,
      title: 'Premium Backpack',
      price: 89,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400',
      rating: { rate: 4.7 },
    },
    {
      id: 4,
      title: 'Mechanical Keyboard',
      price: 150,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400',
      rating: { rate: 4.9 },
    },
  ];

  addToCart(product: any) {
    console.log('Cart:', product);
    alert(`${product.title} added to cart!`);
  }

  addToWishlist(product: any) {
    console.log('Wishlist:', product);
    alert(`${product.title} added to wishlist! ❤️`);
  }
}
