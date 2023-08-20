import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../products/product.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  $addToCart = new EventEmitter<product[]>();

  products: product[] = [];

  getProducts(){
    return this.products.slice();
  }

  addToShoppingCart(product:product){
    this.products.push(product);
    this.$addToCart.emit(this.products.slice());
  }

}
