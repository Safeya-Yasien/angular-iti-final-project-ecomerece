import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { AddProductComponent } from './components/admin/product-form/product-form.component';

import { OrderManagementComponent } from './components/order-management/order-management';

import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'add-category', component: CategoryFormComponent },
    ],
  },
];
