import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../../features/home/home').then((c) => c.Home),
    title: 'Home | Store',
  },
  {
    path: 'shop',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Shop - Browse Products',
      },
      {
        path: 'category/:id',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Category',
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('../../features/products/product-details/product-details').then(
            (c) => c.ProductDetails,
          ),
        title: 'Product Details',
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Search Results',
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('../../features/about/about').then((c) => c.About),
    title: 'About Us',
  },
  {
    path: 'contact',
    loadComponent: () => import('../../features/contact/contact').then((c) => c.Contact),
    title: 'Contact Us',
  },
  {
    path: '**',
    loadComponent: () => import('../../features/not-found/not-found').then((c) => c.NotFound),
    title: '404 - Not Found',
  },
];
