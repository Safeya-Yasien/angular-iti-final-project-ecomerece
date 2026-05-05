import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = signal<Product | null>(null);
  activeImage = signal<string | null>(null); // New signal for gallery toggle

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        // Set initial main image
        if (data.imageCover) {
          this.activeImage.set(data.imageCover);
        }
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  addToCart(product: Product) {
    if (product.quantity > 0) {
      console.log('Cart:', product);
      alert(`${product.title} added to cart!`);
    }
  }

  addToWishlist(product: Product) {
    console.log('Wishlist:', product);
    alert(`${product.title} added to wishlist! ❤️`);
  }
}
