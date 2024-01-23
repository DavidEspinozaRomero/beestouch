import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../payments/services/cart.service';
import { ImageComponent } from '../shared/components/image/image.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    ImageComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  cartService = inject(CartService);
  count = this.cartService.count();
  products = this.cartService.getProducts();

  constructor() {
    this.cartService.getProducts();
  }

  addProductToCart(product: any) {
    this.cartService.addToCart(product);
  }

  removeProductFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
}
