import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { product } from '../products/product.model';
import { cart } from './cart.model';
import { orders } from './orders.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  $cartChange = new EventEmitter<cart[]>();
  $showToast = new Subject<boolean>();
  $orderChange = new Subject<orders[]>();

  products: product[] = [];
  cart: cart[] = [new cart('hans', 100, 2, 'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/o/r/orlaith_kidas_chair2_1.jpg')];
  orders: orders[] = [];

  getProducts() {
    return this.products.slice();
  }

  getCartItems() {
    return this.cart.slice();
  }

  getOrderItems() {
    return this.orders.slice();
  }

  addToShoppingCart(cartItem: cart) {
    this.cart.push(cartItem);
    this.$cartChange.emit(this.cart.slice());
  }

  removeFromShoppingCart(index: number) {
    this.cart.splice(index, 1);
    this.$cartChange.emit(this.cart.slice())
  }

  resetCart() {
    this.cart = [];
    this.$cartChange.emit(this.cart.slice());
  }

  ordersChanged(orders: orders[], cart: cart[]) {
    cart.forEach((value) => {
      this.orders.push(value);
    })
    this.cart = [];
    this.$cartChange.emit(this.cart.slice());
    this.$orderChange.next(this.orders.slice());
  }
}
