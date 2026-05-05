import { Component, OnInit, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCard } from '../../../layouts/components/product-card/product-card';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  addingProductId = signal<string | null>(null);
  toastMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filteredProducts = data;

        this.route.queryParams.subscribe((params) => {
          const q = params['q'] || '';
          this.applyFilter(q);
        });

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilter(query: string): void {
    if (!query.trim()) {
      this.filteredProducts = [...this.allProducts];
    } else {
      const search = query.toLowerCase();
      this.filteredProducts = this.allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search),
      );
    }
    this.cdr.detectChanges();
  }

  onAddToCart(product: Product): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }
    const id = (product as any)._id;
    this.addingProductId.set(id);
    this.cart.addToCart(id).subscribe({
      next: () => {
        this.addingProductId.set(null);
        this.showToast(`"${product.title}" added to cart`);
      },
      error: (err) => {
        this.addingProductId.set(null);
        this.showToast(err?.error?.message || 'Could not add item to cart.');
      },
    });
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2500);
  }
}
