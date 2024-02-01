import { FilterByProductNamePipe } from './filter-by-product-name.pipe';

describe('FilterByProductNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByProductNamePipe();
    expect(pipe).toBeTruthy();
  });
});
