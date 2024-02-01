import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CartService } from '../payments/services/cart.service';
import { FilterByProductNamePipe } from './pipes';
import { ImageComponent } from '../shared/components/image/image.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ImageComponent,
    FilterByProductNamePipe,
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
