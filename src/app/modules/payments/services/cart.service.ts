import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //#region Variables
  public cart: Cart = {
    products: [],
    count: 0,
    shipping: '',
    code: '',
    discount: 0,
    total: 0,
  };

  count = signal(0);
  //#endregion Variables
  constructor() {}

  //#region Methods
  public addToCart(product: Product) {
    if (this.findProductById(product))
      {
        this.updateQuantity(product, product.quantity);
        console.log('Product already exists');
        return 
      }
    this.cart.products.push(product);
    this.cart.count++;
    this.count.set(this.cart.count);
  }
  updateQuantity(product: Product, quantity: number) {
    const index = this.findProduct(product);
    if (index == -1) return console.log('Product not found');
    this.cart.products[index].quantity += quantity;
    this.cart.products[index].total = this.cart.products[index].price * this.cart.products[index].quantity;
    console.log('Product:', this.cart.products[index] );
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

interface Cart {
  products: Product[];
  count: number;
  shipping: string;
  code: string;
  discount: number;
  total: number;
}
interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
  description: string;
}
