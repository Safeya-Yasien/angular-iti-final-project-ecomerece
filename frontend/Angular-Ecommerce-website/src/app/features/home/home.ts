import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../layouts/components/product-card/product-card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
})
export class Home {
  constructor(private productService: ProductService) {}
  products: Product[] = [];
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

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
  addToCart(product: Product) {
    console.log('Cart:', product);
    alert(`${product.title} added to cart!`);
  }

  addToWishlist(product: Product) {
    console.log('Wishlist:', product);
    alert(`${product.title} added to wishlist! ❤️`);
  }
}
