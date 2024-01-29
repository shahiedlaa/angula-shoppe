import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: product;
  productId: number

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,
    private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = +params['id'];
        this.product = this.productService.getProductbyId(this.productId);
      }
    )
  }

  goEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.productService.$emitIndex.next(this.productId);
  }

  // addToCart(product: product) {
  //   this.cartService.addToShoppingCart(product);
  // }

  goDelete(){
    this.productService.deleteProduct(this.productId,this.product.type);
    this.router.navigate(['/products']);
  }
}
