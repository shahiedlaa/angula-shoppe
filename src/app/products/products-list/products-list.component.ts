import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  show:boolean = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private cartService: ShoppingCartService) { }

  products: product[];

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.$productChanged.subscribe((products: product[]) => {
      this.products = products;
    })
  }

  goNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  emitNew() {
    this.productService.$emitNew.next(true);
  }

}
