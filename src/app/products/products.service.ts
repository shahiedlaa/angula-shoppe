import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  productSelected = new EventEmitter<product>();
  sendProductId = new EventEmitter<number>();
  $productChanged = new EventEmitter<product[]>();
  $emitIndex = new EventEmitter<number>();
  $emitProduct = new BehaviorSubject(null);
  $editMode = new EventEmitter<boolean>();

  private products: product[] = [
    new product(
      'hans-sofa',
      'comfortable sofa',
      450,
      'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/1/_/1_133_252.jpg',
      3),
    new product(
      'chair',
      'comfortable chair',
      150,
      'https://i.pinimg.com/originals/50/45/eb/5045eb12d876bbf5bfa933bdd26dd0a0.jpg',
      4
    ),
  ];

  constructor() { }

  getProducts() {
    return this.products.slice();
  }

  getProductbyId(index: number) {
    return this.products.slice()[index];
  }

  addProduct(product: product) {
    this.products.push(product);
    this.$productChanged.emit(this.products.slice());
  }

  updateProduct(product: product, index: number) {
    this.products[index] = product;
    this.$productChanged.emit(this.products.slice())
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.$productChanged.emit(this.products.slice());
  }

}
