import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../products/product.model';
import { cart } from './cart.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  $addToCart = new EventEmitter<cart[]>();

  products: product[] = [];
  cart:cart[] = [];

  getProducts(){
    return this.products.slice();
  }

  getCartItems(){
    return this.cart.slice();
  }

  addToShoppingCart(cartItem:cart){
    // this.products.push(product);
    // this.$addToCart.emit(this.products.slice());
    this.cart.push(cartItem);
    this.$addToCart.emit(this.cart.slice());
  }

}
