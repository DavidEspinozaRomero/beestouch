import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { CartService } from '../../services';
import { Cart } from '../../models';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [SlicePipe, CurrencyPipe],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss',
})
export class CartDetailComponent implements OnInit {
  cartService = inject(CartService);
  envio = 9;
  cartDetail!: Cart;

  ngOnInit(): void {
    console.log(this.cartService.cartInfo);
    this.cartDetail = this.cartService.cartInfo;
  }
  calSubTotal() {
    let subtotal = 0;
    this.cartDetail.products.forEach((product) => {
      subtotal += product.price * product.quantity!;
    });
    return subtotal;
  }
  total() {}
}
