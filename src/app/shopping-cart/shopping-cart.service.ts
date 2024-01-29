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
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.$cartChange.emit(this.cart.slice());
  }

  removeFromOrder(index: number) {
    this.orders.splice(index, 1);
    localStorage.setItem('orderItems', JSON.stringify(this.orders));
    this.$orderChange.next(this.orders.slice());
  }

  resetCart() {
    this.cart = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cart))
    this.$cartChange.emit(this.cart.slice());
  }

  resetOrder() {
    this.orders = [];
    localStorage.setItem('orderItems', JSON.stringify(this.orders))
    this.$cartChange.emit(this.orders.slice());
  }

  autoCart(){
    this.cart = JSON.parse(localStorage.getItem('cartItems'));
  }

  autoOrder(){
    this.orders = JSON.parse(localStorage.getItem('orderItems'));
  }

  ordersChanged(orders: orders[], cart: cart[]) {
    let newItems = cart.filter(o1 => !orders.some(o2 => o1.name === o2.name));
    let duplicateItems = cart.filter(o1 => orders.some(o2 => o1.name === o2.name))

    if (duplicateItems) {
      duplicateItems.forEach((dupItem) => {
        orders.forEach((orderItem) => {
          if (dupItem.name == orderItem.name) {
            orderItem.quantity = orderItem.quantity + dupItem.quantity;
          }
        })
      })
    }

    if (newItems) {
      newItems.forEach((newItem) => {
        this.orders.push(newItem);
      })
    }

    this.cart = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cart))
    localStorage.setItem('orderItems', JSON.stringify(this.orders))
    this.$cartChange.emit(this.cart.slice());
    this.$orderChange.next(this.orders.slice());
  }
}
