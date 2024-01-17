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
  product1 = {
    id: 1,
    title: 'shampoo',
    price: 5,
    quantity: 1,
    total: 5,
    image: '../../../../../assets/imgs/logo.jpg',
    description: 'shampoo de miel y gengibre',
  };
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    image: string;
    description: string;
  }[] = [];

  constructor() {
    for (let i = 1; i < 8; i++) {
      this.products.push({
        id: i,
        title: 'shampoo',
        price: +(Math.random() * 10 + 1).toFixed(2),
        quantity: 1,
        total: 5,
        image: '../../../../../assets/imgs/logo.jpg',
        description: 'shampoo de miel y gengibre',
      });
    }
  }

  addProductToCart(product: any) {
    console.log(this.products);

    this.cartService.addToCart(product);
  }

  removeProductFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
}
