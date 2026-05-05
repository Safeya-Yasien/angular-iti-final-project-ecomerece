import { Component, OnInit } from '@angular/core'; // ضيفنا OnInit هنا
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common'; // مهم جداً لعرض البيانات
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true, // تأكدي إنها Standalone
  imports: [CommonModule,RouterLink], // لازم تضيفي CommonModule عشان تستخدمي الـ Loops
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit { // ضيفنا implements هنا

  products: Product[] = [];

  constructor(private readonly productservices: ProductService) {}

ngOnInit(): void {
    this.productservices.getAllProducts().subscribe({
      next: (res: any) => { // تغيير النوع لـ any
        this.products = res.data; 
        console.log('البيانات وصلت بنجاح:', this.products);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

    
  }
deleteProduct(id: string) {
  if (confirm('هل أنتِ متأكدة من حذف هذا المنتج؟')) {
    this.productservices.deleteProduct(id).subscribe({
      next: () => {
        // تحديث المصفوفة في الصفحة عشان الصف يختفي فوراً
        this.products = this.products.filter(p => p._id !== id);
        alert('تم الحذف بنجاح');
      },
      error: (err) => {
        console.error('فشل الحذف:', err);
        alert('حدث خطأ أثناء الحذف.. تأكدي من صلاحيات الأدمن');
      }
    });
  }
}
}