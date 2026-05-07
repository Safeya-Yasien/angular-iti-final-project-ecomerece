import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../layouts/components/product-card/product-card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data.slice(0, 4));
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data.slice(0, 4));
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  addToWishlist(product: Product) {
    console.log('Wishlist:', product);
    alert(`${product.title} added to wishlist! ❤️`);
  }
}
