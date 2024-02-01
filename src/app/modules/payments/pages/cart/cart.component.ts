import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ImageComponent } from '../../../shared/components/image/image.component';
import { CartDetailComponent } from '../../components';
import { Cart, Product } from '../../models';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
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
    ImageComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  cartService = inject(CartService);
  cart: Cart = this.cartService.cartInfo;
  cartForm = this.fb.group({ products: this.fb.array([]) });
  constoEnvio = 9;
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

  getSubTotal() {
    const cart = this.cartForm.value as Cart;
    let subtotal = 0;
    for (const product of cart.products) {
      const { price, quantity } = product;
      subtotal += Math.abs(price * quantity!);
    }
    return subtotal;
  }
  getTotal() {
    let total = this.getSubTotal();
    const discount = this.cart.discount;
    if (discount) {
      total -= discount;
    }
    total += this.constoEnvio;
    return total;
  }

  onSubmit() {
    this.cartForm.markAllAsTouched();
    if (!this.cartForm.valid) {
      this.cartService.openSnackBar('Error en las cantidades (1-100)', 'OK');
      console.log('Form is not valid');
      return;
    }
    let clonedCart = structuredClone(this.cartForm.value) as Cart;
    clonedCart.discount = 0;
    clonedCart.shipping = this.constoEnvio;
    // clonedCart.id = Math.random().toString(36).slice(2,15);

    if (!clonedCart.products) {
      this.cartService.openSnackBar('No hay productos', 'OK');
      console.log('No products');
      return;
    }

    // this.cartService.createOrder(clonedCart);
    this.cartService.getAmount(clonedCart);

    for (const product of clonedCart.products) {
      this.cartService.updateProduct(product, product.quantity!);
    }

    this.router.navigate(['/checkout']);
  }
}
