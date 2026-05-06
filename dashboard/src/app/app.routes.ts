import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { AddProductComponent } from './components/admin/product-form/product-form.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'add-product', component:AddProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent }
];