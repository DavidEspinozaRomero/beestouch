import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CartService } from '../../payments';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent {
  product = {
    id: 1,
    title: 'shampoo de miel y gengibre',
    price: 5,
    quantity: 1,
    total: 5,
    image: '../../../../../assets/imgs/logo.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas veritatis deserunt eius in earum quod non eligendi, culpa dignissimos commodi suscipit tempora accusantium perspiciatis labore distinctio aspernatur fugiat voluptatem vitae? Inventore officiis dolorum hic illum placeat, eaque quo consequatur, vel eum repudiandae voluptate doloribus ut officia pariatur ipsa adipisci deserunt ipsum aliquid! At ab nostrum nihil dicta possimus hic voluptatem.',
  };
  cartService = inject(CartService);
  addProductToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
