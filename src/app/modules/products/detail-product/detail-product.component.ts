import { Component, inject } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CartService } from '../../payments';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent {
  value = '1';
  product = {
    id: 1,
    title: 'shampoo',
    price: 5,
    quantity: 1,
    total: 5,
    image: '',
    description: 'shampoo de miel y gengibre',
  };
  cartService = inject(CartService);
  addProductToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
