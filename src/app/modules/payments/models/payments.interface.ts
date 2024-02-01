export interface Cart {
  id?: string;
  products: Product[];
  count: number;
  shipping: number;
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
