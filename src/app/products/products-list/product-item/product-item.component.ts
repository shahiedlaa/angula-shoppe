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
  productDescList: string[];

  constructor(private prodService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productDescList = this.product.description.split('.');
  }

  emitProduct(product: product) {
    this.prodService.$emitProduct.next(product);
    this.router.navigate([this.product.name])
  }

  formOpen(product: product, index: number) {
    this.prodService.$emitProduct.next(product);
    this.prodService.$emitIndex.next(index);
  }

  deleteProd(index:number){
    this.prodService.deleteProduct(index);
  }

}
