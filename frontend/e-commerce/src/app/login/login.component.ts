import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      // تأكدي من رابط الـ API الخاص بالـ Login عندك
      this.http.post<any>('http://localhost:3000/api/auth/login', loginData).subscribe({
        next: (res) => {
          console.log('تم تسجيل الدخول:', res);
          
          // ✨ أهم خطوة: تخزين التوكن في الـ Local Storage
          if (res.token) {
            localStorage.setItem('token', res.token);
            alert('تم تسجيل الدخول بنجاح!');
            this.router.navigate(['/products']); // اذهبي لصفحة المنتجات بعد النجاح
          }
        },
        error: (err) => {
          this.errorMessage = 'بيانات الدخول غير صحيحة أو السيرفر لا يستجيب';
          console.error(err);
        }
      });
    }
  }
}