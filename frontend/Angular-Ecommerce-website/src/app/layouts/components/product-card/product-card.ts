import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product: any;
  @Output() add = new EventEmitter<any>();

  onAddToCart() {
    this.add.emit(this.product);
  }
}
