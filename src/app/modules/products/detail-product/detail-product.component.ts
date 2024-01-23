import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CartService, Product } from '../../payments';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent implements OnInit {
  cartService = inject(CartService);
  activRoute = inject(ActivatedRoute);
  product?: Observable<Product>;
  ngOnInit(): void {
    this.activRoute.params.subscribe((params) => {
      this.product = this.cartService.getProductById(
        params['id']
      ) as Observable<Product>;
    });
  }

  addProductToCart(product: any) {
    product
      .subscribe((prod: Product) => {
        this.cartService.addToCart(prod);
      })
      .add();
  }
}
