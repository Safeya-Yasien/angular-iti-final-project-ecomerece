import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// src/app/components/admin/product-form/product-form.component.ts

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html', // 👈 غيري الاسم هنا ليتطابق مع الملف اللي في الفولدر
  styleUrl: './product-form.component.css'      // وتأكدي من اسم ملف الـ CSS كمان بالمرة
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productSer: ProductService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      imageCover: ['', Validators.required],
      category: ['', Validators.required] // لازم ID حقيقي
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productSer.addProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('تم إضافة المنتج بنجاح!');
          this.productForm.reset();
             this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('خطأ في الإضافة:', err);
          alert('فشلت الإضافة.. تأكدي من التوكن وصلاحية الـ ID');
        }
      });
    }
  }
}