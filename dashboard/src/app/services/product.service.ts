import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:3000/api/products';

  // Constructor واحد فقط
  constructor(private http: HttpClient) { }

  // جلب كل المنتجات
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  // إضافة منتج (يرجع المنتج الجديد)
addProduct(productData: Product): Observable<Product> {
  const token = localStorage.getItem('token'); // تأكدي إنه متخزن بالاسم ده
  const headers = { 'Authorization': `Bearer ${token}` };
  
  return this.http.post<Product>(this.API_URL, productData, { headers });
}


deleteProduct(id: string): Observable<any> {
  const token = localStorage.getItem('token'); // تأكدي من الاسم اللي خزنتي بيه
  const headers = { 'Authorization': `Bearer ${token}` };
  
  return this.http.delete(`${this.API_URL}/${id}`, { headers });
}}