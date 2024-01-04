import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../payments/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  cartService = inject(CartService);
  count = this.cartService.count();
  products = Array(8);
  constructor() {}

  addProductToCart(product: any) {
    const product1 = {
      id: 1,
      title: 'shampoo',
      price: 5,
      quantity: 1,
      total: 5,
      image: '',
      description: 'shampoo de miel y gengibre',
    };
    this.cartService.addToCart(product1);
  }

  removeProductFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
}
