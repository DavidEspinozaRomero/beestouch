import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { NgxPayPalModule } from 'ngx-paypal';

import { Cart, CartService, Product } from './services/cart.service';
import { CartDetailComponent } from './components';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CurrencyPipe,
    JsonPipe,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    CartDetailComponent,
    CheckoutComponent,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  fb = inject(FormBuilder);
  cartService = inject(CartService);
  settings = {
    isLoading: false,
    isChecking: false,
  };
  isCheckout = true;
  cart: Cart = this.cartService.cartInfo;
  order!: Cart;
  cartForm = this.fb.group({ products: this.fb.array([]) });
  today = new Date();

  get productsQuantity() {
    return this.cartForm.get('products') as FormArray;
  }

  constructor() {
    this.fillForm();
  }

  fillForm() {
    for (const product of this.cart.products) {
      const { id, title, price, quantity, image } = product;
      let products = this.cartForm.get('products') as FormArray;
      const newGroup = this.fb.group({
        id: id,
        image: image,
        title: title,
        price: price,
        quantity: this.fb.control(quantity ?? 1, [
          Validators.required,
          Validators.min(1),
          Validators.max(99),
        ]),
      });
      products.push(newGroup);
    }
  }
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
  removeFromCartDetail(index: number) {
    (this.cartForm.get('products') as FormArray).removeAt(index);
  }

  getTotal() {
    const cart = this.cartForm.value as Cart;
    let total = 0;
    for (const product of cart.products!) {
      const { price, quantity } = product;
      total += Math.abs(product.price * product.quantity!);
    }
    return total;
  }

  onSubmit() {
    this.cartForm.markAllAsTouched();
    if (!this.cartForm.valid) {
      console.log('Form is not valid');
      return;
    }
    const products = this.cartForm.value.products;
    if (!products) {
      console.log('No products');

      return;
    }
    // this.order.products = products;
    // structuredClone() as Product[];
    this.isCheckout = true;
  }
}
