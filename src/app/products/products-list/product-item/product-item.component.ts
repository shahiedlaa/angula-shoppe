import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { product } from '../../product.model';
import { ProductService } from '../../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {

  @Input() product: product;
  @Input() productId: number;

  constructor(private prodService:ProductService, private router: Router) {}

  emitProduct(product:product){
    this.prodService.$emitProduct.next(product);
    this.router.navigate([this.product.name])
  }

}
