import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { IWishlist, IWishlistResponse } from '../models/wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private base = `${environment.apiUrl}/wishlist`;

  private _wishlist = signal<IWishlist | null>(null);
  readonly Wishlist = this._wishlist.asReadonly();
  readonly itemsCount = computed(() => this._wishlist()?.wishlistItems.length || 0);

  isInWishlist(productId: string): boolean {
    const current = this._wishlist();
    if (!current) return false;
    return current.wishlistItems.some((item) => item.product._id === productId);
  }

  loadWishlist(): Observable<IWishlist | null> {
    if (!this.tokens.has()) {
      this._wishlist.set(null);
      return of(null);
    }
    return this.http.get<IWishlistResponse>(this.base).pipe(
      tap((res) => this._wishlist.set(res?.data ?? null)),
      catchError(() => {
        this._wishlist.set(null);
        return of(null);
      }),
    ) as unknown as Observable<IWishlist | null>;
  }

  addToWishlist(productId: string): Observable<IWishlistResponse> {
    return this.http
      .post<IWishlistResponse>(this.base, { productId })
      .pipe(tap((res) => this._wishlist.set(res?.data ?? null)));
  }

  removeItem(productId: string): Observable<IWishlistResponse> {
    return this.http
      .delete<IWishlistResponse>(`${this.base}/${productId}`)
      .pipe(tap((res) => this._wishlist.set(res?.data ?? null)));
  }

  clearWishlist(): Observable<IWishlistResponse> {
    return this.http
      .delete<IWishlistResponse>(this.base)
      .pipe(tap((res) => this._wishlist.set(res?.data ?? null)));
  }

  resetLocal(): void {
    this._wishlist.set(null);
  }
}
