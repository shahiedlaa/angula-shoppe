import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './shopping-cart.service';
import { product } from '../products/product.model';
import { cart } from './cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: product[];
  cart: cart[];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
    this.cartService.$addToCart.subscribe(
      (cart:cart[]) => {
        this.cart = cart;
      }
    )
    console.log(this.cart)
  }

}
