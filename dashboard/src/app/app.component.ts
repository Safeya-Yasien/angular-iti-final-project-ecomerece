import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// 1. استدعي الكومبوننت بتاعك
import { ProductListComponent } from './components/admin/product-list/product-list.component'; 
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './components/admin/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. ضيفيه هنا في الـ imports
  imports: [RouterOutlet, RouterLink], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'iti-ecommerce-frontend';
}