import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // مهم جداً عشان الـ ngFor والـ ngClass يشتغلوا
import { OrderService } from '../../services/order';
@Component({
  selector: 'app-order-management',
  standalone: true, // تأكدي إنها true لو المشروع بيستخدم Standalone Components
  imports: [CommonModule], 
  templateUrl: './order-management.html',
  styleUrls: ['./order-management.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  orderStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Error fetching orders', err)
    });
  }

  // فنكشن لتحديث حالة الأوردر
updateStatus(orderId: string, event: any) {
  const newStatus = event.target.value;
  
  this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
    next: () => {
      // تحديث الحالة محلياً عشان الـ UI يتغير فوراً
      const order = this.orders.find(o => o._id === orderId);
      if (order) order.status = newStatus;
      console.log('Status updated to:', newStatus);
    },
    error: (err) => {
      alert('Failed to update status, check console for details');
      console.error(err);
    }
  });
}
// getUserOrders(): Observable<any[]> {
//   // اللينك ده لازم يتأكد مع بتوع الـ Backend (غالباً هيكون /my-orders)
//   return this.http.get<any[]>(`${this.apiUrl}/my-orders`, { headers: this.getHeaders() });
// }
}