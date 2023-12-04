import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { cart } from 'src/app/shopping-cart/cart.model';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { ToastService } from 'src/app/toasts/toast.service';

import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  product: product;
  productId: number;
  productName: string;
  subscription: Subscription;
  deliveryDate;
  productDescList: string[];
  productCareInfo: string[];
  cartItems: cart[];
  shareLink:string;


  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService, private router: Router, private toastService: ToastService) { }

  @ViewChild('addToCartForm') cartForm: NgForm;

  ngOnInit() {
    this.subscription = this.productService.$emitProduct.subscribe(
      (product: product) => {
        if (product) {
          this.product = product;
          this.productName = product.name.replace(/-/g, ' ');
          this.productDescList = product.description.split('.');
          this.productCareInfo = product.specification.careInfo.split('.');
        }
        else {
          this.product = JSON.parse(localStorage.getItem('product'));
          this.productName = this.product.name.replace(/-/g, ' ');
          this.productDescList = this.product.description.split('.');
          this.productCareInfo = this.product.specification.careInfo.split('.');
        }
      }
    )

    this.addWeeks(1);
    this.cartItems = this.cartService.getCartItems();
    this.cartService.$cartChange.subscribe(
      (cart: cart[]) => {
        this.cartItems = cart;
      }
    )
    this.shareLink = this.router.url;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addWeeks(weeks, date = new Date()) {
    date.setDate(date.getDate() + weeks * 7);
    this.deliveryDate = date;
  }

  onSubmit(form, product) {
    const cartItem = new cart(product.name, product.price, form.value.quantity, product.imagePath[0]);
    let found = false;
    this.cartItems.forEach((value) => {
      if (this.product.name === value.name) {
        found = true;
        value.quantity = cartItem.quantity + value.quantity;
      }
    })
    if (!found) {
      this.cartService.addToShoppingCart(cartItem);
    }
    let productName = this.product.name[0].toUpperCase() + this.product.name.slice(1).toLowerCase();
    this.toastService.show('Notification', productName + ' was added to cart!', null, 'prodAdded');
  }

}
