import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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


  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.productService.$emitProduct.subscribe(
      (product: product) => {
        this.product = product;
        this.productName = product.name.replace(/-/g, ' ');
      }
    )
    console.log(this.addWeeks(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addWeeks(weeks, date = new Date()) {
    date.setDate(date.getDate() + weeks * 7);
    this.deliveryDate = date;
  }

}
