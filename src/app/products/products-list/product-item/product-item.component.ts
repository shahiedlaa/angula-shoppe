import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

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
  isAuth: boolean = false;

  constructor(private prodService: ProductService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.productDescList = this.product.description.split('.');
    this.authService.user.subscribe((user) => {
      if(user){
        this.isAuth = true
      }
    })
  }

  emitProduct(product: product) {
    this.prodService.$emitProduct.next(product);
    this.router.navigate([`products/${product.name}`])
    localStorage.setItem('product', JSON.stringify(product));
  }

  formOpen(product: product, index: number) {
    this.prodService.$emitProduct.next(product);
    this.prodService.$emitIndex.next(index);
  }

  deleteProd(index: number) {
    this.prodService.deleteProduct(index);
  }

}
