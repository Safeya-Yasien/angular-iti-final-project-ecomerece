import { Component, computed, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductCard } from '../../layouts/components/product-card/product-card';

@Component({
  selector: 'app-wishlists',
  imports: [ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  public wishlistState = this.wishlistService.Wishlist;

  public wishlistProducts = computed(() => {
    const list = this.wishlistState();
    if (!list) return [];

    return list.wishlistItems.map((item) => item.product as unknown as Product);
  });

  ngOnInit(): void {
    this.wishlistService.loadWishlist().subscribe();
  }

  onRemoveFromWishlist(productId: string): void {
    this.wishlistService.removeItem(productId).subscribe();
  }

  onAddToCart(product: Product): void {
    const id = (product as any)._id;
    this.cartService.addToCart(id).subscribe({
      next: () => {
        this.onRemoveFromWishlist(id);
      },
    });
  }
}
