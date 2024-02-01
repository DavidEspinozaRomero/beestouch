import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../payments';

@Pipe({
  name: 'filterByProductName',
  standalone: true,
})
export class FilterByProductNamePipe implements PipeTransform {
  transform(products: Product[], productName: string) {
    try {
      console.log(products, productName);

      return products.filter((product) =>
        product.title.toLowerCase().includes(productName.toLowerCase())
      );
    } catch (err) {
      console.log(err);

      return products;
    }
  }
}
