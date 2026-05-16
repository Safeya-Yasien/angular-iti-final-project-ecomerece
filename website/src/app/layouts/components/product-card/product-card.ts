import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { IWishlist } from '../../../core/models/wishlist.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() isInWishlist: boolean = false;
  @Output() add = new EventEmitter<Product>();
  @Output()
  wishlist = new EventEmitter<string>();

  onAddToWishlist(productId: string) {
    this.wishlist.emit(productId);
  }
  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder-product.jpg';
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.add.emit(this.product);
  }
}
