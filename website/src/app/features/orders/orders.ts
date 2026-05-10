import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class Orders implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.myOrders().subscribe({
      next: (response: any) => {
        this.orders = response.data;
      },
      error: (err) => {
        console.error('Error loading your orders', err);
      },
    });
  }
}
