import { Component, OnInit } from '@angular/core';
import { product } from '../products/product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: product[];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cartService.$addToCart.subscribe(
      (products:product[]) => {
        this.products = products;
      }
    )
  }

}
