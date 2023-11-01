import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './shopping-cart.service';
import { product } from '../products/product.model';
import { cart } from './cart.model';
import { orders } from './orders.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: product[];
  cart: cart[] = [];
  orders: cart[] = [];
  total:number;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
    this.cartService.$cartChange.subscribe(
      (cart: cart[]) => {
        this.cart = cart;
      }
    )
    this.orders = this.cartService.getOrderItems();
    this.cartService.$orderChange.subscribe(
      (order: orders[]) => {
        this.orders = order;
      }
    )
    this.orderTotal();
  }


  removeCart(index: number) {
    this.cartService.removeFromShoppingCart(index);
  }

  add(index: number) {
    this.cart[index].quantity++;
  }

  remove(index: number) {
    this.cart[index].quantity--;
  }

  resetCart() {
    this.cartService.resetCart();
  }

  pushToOrder() {
    this.cartService.ordersChanged(this.orders, this.cart);
    this.orderTotal();
  }

  orderTotal(){
    let total = 0;
    this.orders.forEach((value) => {
      total += value.price * value.quantity
    })
    this.total = total;
  }

}
