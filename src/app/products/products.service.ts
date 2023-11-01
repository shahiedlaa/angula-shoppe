import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  productSelected = new EventEmitter<product>();
  sendProductId = new EventEmitter<number>();
  $productChanged = new EventEmitter<product[]>();
  $emitIndex = new BehaviorSubject(null);
  $emitProduct = new BehaviorSubject(null);
  $editMode = new EventEmitter<boolean>();
  $emitNew = new Subject<boolean>();
  $formState = new BehaviorSubject(null);

  public products: product[] = [];

  constructor() { }

  setProducts(products: product[]){
    this.products = products
    this.$productChanged.next(this.products.slice())
  }

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
