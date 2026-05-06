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
      const formData = new FormData();

      // إضافة البيانات للـ FormData
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('imageCover', this.selectedFile);

      this.productSer.addProduct(formData).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Added Successfully",
            text: "Product and image have been uploaded",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          this.productForm.reset();
          this.selectedFile = null;
          this.router.navigate(["/admin/products"]);
        },
        error: (err) => {
          Swal.fire({
            title: "Failed",
            text: "Something went wrong, please check your connection",
            icon: "error"
          });
          console.error(err);
        }
      });
    } else {
     
      Swal.fire({
        title: "Warning",
        text: "Please fill all fields and choose a product image",
        icon: "warning"
      });
    }
  }
}