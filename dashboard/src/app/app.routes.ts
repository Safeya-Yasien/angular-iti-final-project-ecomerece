import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { AddProductComponent } from './components/admin/product-form/product-form.component';
import { OrderManagementComponent } from './components/order-management/order-management';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // أول ما يفتح يروح للـ login
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'add-product', component:AddProductComponent },
  { path: 'orders', component: OrderManagementComponent }
];