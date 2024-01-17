import { Injectable, signal } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //#region Variables
  private cart: Cart = {
    products: [],
    count: 0,
    shipping: '',
    code: '',
    discount: 0,
  };

  count = signal(0);

  get cartInfo() {
    return structuredClone(this.cart);
  }
  //#endregion Variables
  constructor(private _snackBar: MatSnackBar) {
    for (let i = 1; i < 3; i++) {
      this.cart.products.push({
        id: i,
        title: 'shampoo' + i,
        price: +(Math.random() * 10 + 1).toFixed(2),
        quantity: +(Math.random() * 5 + 1).toFixed(0),
        image: '../../../../../assets/imgs/logo.jpg',
        description: 'shampoo de miel y gengibre',
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  //#region Methods
  public addToCart(product: Product) {
    if (this.findProductById(product)) {
      this.openSnackBar('Producto ya esta en el carrito', 'OK');
      return;
    }

    this.cart.products.push(product);
    this.cart.count++;
    this.count.set(this.cart.count);
    this.openSnackBar('Producto agregado al carrito', 'OK');
  }
  updateQuantity(product: Product, quantity: number) {
    const index = this.findProduct(product);
    if (index == -1) return console.log('Product not found');
    this.cart.products[index].quantity! = quantity;
    console.log('Product:', this.cart.products[index]);
  }

  public removeFromCart(product: Product) {
    const index = this.findProduct(product);
    if (index == -1) return console.log('Product not found');
    this.cart.products.splice(index, 1);
    this.cart.count--;
    this.count.set(this.cart.count);
  }
  emptyCart() {
    this.cart.products = [];
  }

  findProduct(product: Product) {
    const index = this.cart.products.indexOf(product);
    return index;
  }
  findProductById(product: Product) {
    return this.cart.products.find((prod) => prod.id == product.id);
  }
  //#endregion Methods
}

export interface Cart {
  products: Product[];
  count: number;
  shipping: string;
  code?: string;
  discount?: number;
}
export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
  quantity?: number;
}
