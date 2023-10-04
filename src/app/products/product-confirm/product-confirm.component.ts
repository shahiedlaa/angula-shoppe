import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { cart } from 'src/app/shopping-cart/cart.model';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-confirm',
  templateUrl: './product-confirm.component.html',
  styleUrls: ['./product-confirm.component.css']
})
export class ProductConfirmComponent {
  productId: number;
  product: product;
  addMode: boolean = false;

  constructor(private productService: ProductService, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.productService.$emitIndex.subscribe((index) => {
      this.productId = index
    })
    this.productService.$emitProduct.subscribe((product) => {
      if (product) {
        this.addMode = true;
        this.product = product;
      }
    })
    this.productService.$formState.pipe(delay(1000)).subscribe((state) => {
      if (state) {
        this.addMode = false;
      }
    })
  }

  addProdtoCart() {
    const cartItem = new cart(this.product.name, this.product.price, 1);
    console.log(cartItem)
    this.cartService.addToShoppingCart(cartItem)
    this.productService.$formState.next(true)
  }

  deleteProd() {
    this.productService.deleteProduct(this.productId);
    this.productService.$formState.next(true)
  }

  closeForm() {
    this.productService.$formState.next(true)
  }

}
