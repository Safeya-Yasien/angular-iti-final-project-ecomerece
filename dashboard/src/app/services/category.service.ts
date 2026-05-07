import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  _id?: string;
  name: string;
  image?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(this.apiUrl);
  }

  getCategories(): Observable<{ data: Category[] }> {
    return this.getAll();
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  update(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  deleteCategory(id: string): Observable<any> {
    return this.delete(id);
  }
}
