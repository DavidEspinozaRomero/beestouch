import { Component } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss',
})
export class CartDetailComponent {}
