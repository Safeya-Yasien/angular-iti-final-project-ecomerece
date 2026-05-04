import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../../layouts/components/product-card/product-card';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

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

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;

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
}
