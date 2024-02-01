import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { IPurchaseUnit } from 'ngx-paypal';

import { Cart, Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //#region Variables
  http = inject(HttpClient);
  #baseURL = '../../../../assets/data/';
  #cart: Cart = {
    id: Math.random().toString(36).slice(2, 15),
    products: [],
    count: 0,
    shipping: 0,
    code: '',
    discount: 0,
  };

  #order: IPurchaseUnit[] | undefined;
  #amountOrder = 0;
  count = signal(0);

  get cartInfo() {
    return structuredClone(this.#cart);
  }
  get cartID() {
    return this.#cart.id;
  }
  get order() {
    return structuredClone(this.#order);
  }
  get amountOrder() {
    return this.#amountOrder;
  }
  //#endregion Variables
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //#region apis
  getProducts() {
    const URL = this.#baseURL + 'products.json';
    return this.http.get<Product[]>(URL).pipe(
      map((res: any) => {
        console.log(res);
        return res.products;
      })
    );
  }

  getProductById(id: number) {
    const URL = this.#baseURL + 'products.json';
    return this.http.get<Product>(URL).pipe(
      map((res: any) => {
        const product = (res.products as Product[]).find(
          (product: Product) => product.id == id
        );
        return product;
      })
    );
  }
  //#endregion apis

  //#region Methods
  public addToCart(product: Product) {
    if (this.findProductById(product)) {
      this.openSnackBar('Producto ya esta en el carrito', 'OK');
      return;
    }
    this.#cart.products.push(product);
    this.#cart.count++;
    this.count.set(this.#cart.count);
    this.openSnackBar('Producto agregado al carrito', 'OK');
  }
  updateQuantity(product: Product, quantity: number) {
    const index = this.findProductIndex(product);
    if (index == -1) return console.log('Product not found:', product);
    this.#cart.products[index].quantity! = quantity;
    console.log('Product:', this.#cart.products[index]);
  }
  updateProduct(product: Product, quantity: number) {
    const prod = this.findProductById(product);
    if (!prod) return console.log('Product not found:', product);
    prod.quantity! = quantity;
    console.log('Product:', prod.quantity);
  }

  public removeFromCart(product: Product) {
    const index = this.findProductIndex(product);
    if (index == -1) return console.log('Product not found');
    this.#cart.products.splice(index, 1);
    this.#cart.count--;
    this.count.set(this.#cart.count);
  }
  emptyCart() {
    this.#cart.products = [];
  }

  findProductIndex(product: Product) {
    const index = this.#cart.products.indexOf(product);
    return index;
  }
  findProductById(product: Product) {
    return this.#cart.products.find((prod) => prod.id == product.id);
  }
  getAmount(copyCart: Cart) {
    const { products, discount, shipping } = copyCart;
    let total = 0;
    for (const product of products) {
      const { price, quantity } = product;
      total += price * quantity!;
    }
    if (discount) {
      total -= discount;
    }
    if (shipping) {
      total -= shipping;
    }
    this.#amountOrder = total;
  }
  createOrder(copyCart: Cart) {
    const purchase_units: IPurchaseUnit[] = [];
    for (const product of copyCart.products) {
      const { id, title, price, quantity } = product;
      purchase_units.push({
        reference_id: `${id}`,
        amount: {
          currency_code: 'USD',
          value: `${price * quantity!}`,
          breakdown: {
            // discount: { currency_code: 'USD', value: `${copyCart.discount}` },
            item_total: {
              currency_code: 'USD',
              value: `${price * quantity!}`,
            },
          },
        },
        items: [
          {
            name: `${title}`,
            quantity: `${quantity}`,
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: `${price}`,
            },
          },
        ],
      });
    }
    this.#order = purchase_units;
    console.log(this.#order);
  }

  //#endregion Methods
}
