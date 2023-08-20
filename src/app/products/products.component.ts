import { Component, OnInit } from '@angular/core';

import { ProductService } from './products.service';
import { product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  selectedProduct: product;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.productSelected.subscribe(
      (product:product) => {
        this.selectedProduct = product;
      }
    )
  }
}
