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
