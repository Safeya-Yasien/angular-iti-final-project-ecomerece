import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    this.product = {
      id: productId,
      name: 'Premium Headphones',
      price: 299,
      description:
        'Experience studio-quality sound with these high-end noise-canceling headphones. Perfect for long listening sessions.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      rating: 4.8,
      reviews: 124,
      badge: 'Best Seller',
    };
  }
}
