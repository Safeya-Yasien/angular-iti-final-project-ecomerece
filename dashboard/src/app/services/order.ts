import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // تأكدي من الـ URL (لو شغالين محلياً غالباً بيكون كدة)
  private apiUrl = 'http://localhost:3000/api/orders'; 

  constructor(private http: HttpClient) { }

  // فنكشن تجيب الـ Token من الـ Storage
  private getHeaders() {
    const token = localStorage.getItem('token'); // اسألي زمايلك مخزنين الـ token في الـ localStorage باسم إيه
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}`, { status }, { headers: this.getHeaders() });
  }
  getUserOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`, { headers: this.getHeaders() });
  }
}