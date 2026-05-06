import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private productSer: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required] 
     
    });
  }


  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      // 1. إنشاء كائن FormData لجمع البيانات والملف معاً
      const formData = new FormData();
      

      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      
      // 3. إضافة الصورة المختارة بالاسم اللي الـ Backend مستنيه (imageCover)
      formData.append('imageCover', this.selectedFile);

      // 4. إرسال الـ FormData للـ Service
      this.productSer.addProduct(formData).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'تمت الإضافة!',
            text: 'تم رفع الصورة وإضافة المنتج بنجاح',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          
          this.productForm.reset();
          this.selectedFile = null;
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          Swal.fire({
            title: 'خطأ!',
            text: 'تأكدي من اتصال الـ Backend بـ Cloudinary وحجم الصورة',
            icon: 'error'
          });
          console.error(err);
        }
      });
    } else {
      Swal.fire('تنبيه', 'يرجى ملء كافة البيانات واختيار صورة المنتج', 'warning');
    }
  }
}