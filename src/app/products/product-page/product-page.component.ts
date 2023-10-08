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


  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService, private router: Router, private toastService:ToastService) { }

  @ViewChild('addToCartForm') cartForm: NgForm;

  ngOnInit() {
    this.subscription = this.productService.$emitProduct.subscribe(
      (product: product) => {
        this.product = product;
        this.productName = product.name.replace(/-/g, ' ');
        this.productDescList = product.description.split('.');
        this.productCareInfo = product.specification.careInfo.split('.');
      }
    )
    this.addWeeks(1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addWeeks(weeks, date = new Date()) {
    date.setDate(date.getDate() + weeks * 7);
    this.deliveryDate = date;
  }

  onSubmit(form, product) {
    const cartItem = new cart(product.name, product.price, form.value.quantity);
    this.cartService.addToShoppingCart(cartItem);
    let productName = this.product.name[0].toUpperCase() + this.product.name.slice(1).toLowerCase();
    this.toastService.show('Notification', productName + ' was added to cart!', null, 'prodAdded');
  }

}
