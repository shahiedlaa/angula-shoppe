import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { product } from '../products/product.model';
import { cart } from './cart.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  $addToCart = new EventEmitter<cart[]>();
  $showToast = new Subject<boolean>();

  products: product[] = [];
  cart:cart[] = [];

  getProducts(){
    return this.products.slice();
  }

  getCartItems(){
    return this.cart.slice();
  }

  addToShoppingCart(cartItem:cart){
    this.cart.push(cartItem);
    this.$addToCart.emit(this.cart.slice());
  }

}
