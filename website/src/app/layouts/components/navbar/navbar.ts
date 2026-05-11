import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private cartService = inject(CartService);
  private tokens = inject(TokenService);
  private router = inject(Router);

  readonly isAuthenticated = this.auth.isAuthenticated;
  readonly currentUser = this.auth.currentUser;
  readonly isAdmin = this.auth.isAdmin;
  readonly cartCount = this.cartService.itemsCount;
  readonly userInitial = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name.trim().charAt(0).toUpperCase() || 'U';
  });

  searchQuery = signal('');
  userMenuOpen = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tokenFromUrl = params['auth_token'];

      if (tokenFromUrl) {
        localStorage.setItem('auth_token', tokenFromUrl);

        this.router.navigate([], {
          queryParams: { auth_token: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }

      if (this.tokens.has() || tokenFromUrl) {
        this.auth.fetchMe().subscribe();
        this.cartService.loadCart().subscribe();
      }
    });
  }

  goToDashboard(event: Event): void {
    event.preventDefault();
    const token = this.tokens.token;

    const dashboardUrl = 'https://angular-iti-final-project-ecomerece-three.vercel.app/admin/';

    if (token) {
      window.location.href = `${dashboardUrl}`;
    } else {
      window.location.href = dashboardUrl;
    }
  }
  toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.cartService.resetLocal();
    this.closeUserMenu();
    this.router.navigate(['']);
  }

  search(): void {
    const q = this.searchQuery().trim();
    if (!q) return;
    this.router.navigate(['/shop'], { queryParams: { q } });
  }
}
