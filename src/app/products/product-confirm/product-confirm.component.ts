import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { cart } from 'src/app/shopping-cart/cart.model';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { ToastService } from 'src/app/toasts/toast.service';
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
  cartItems: cart[];
  exists: boolean = false;

  constructor(private productService: ProductService, private cartService: ShoppingCartService, private toastService: ToastService) {
    this.productService.$emitProduct.subscribe((product) => {
      if (product) {
        this.addMode = true;
        this.product = product;
      }
    })
    this.productService.$emitIndex.subscribe((index) => {
      this.productId = index
    })
    this.productService.$formState.pipe(delay(1000)).subscribe((state) => {
      if (state) {
        this.addMode = false;
      }
    })
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.$cartChange.subscribe(
      (cart: cart[]) => {
        this.cartItems = cart;
      }
    )
  }

  addProdtoCart() {
    const cartItem = new cart(this.product.name, this.product.price, 1, this.product.imagePath[0]);
    let found = false;
    this.cartItems.forEach((value) => {
      if(this.product.name === value.name){
        found = true;
        value.quantity++;
        this.cartService.$cartChange.emit(this.cartItems.slice())
      }
    })
    if(!found){
      this.cartService.addToShoppingCart(cartItem);
    }
    this.productService.$formState.next(true);
    let productName = this.product.name[0].toUpperCase() + this.product.name.slice(1).toLowerCase();
    this.toastService.show('Notification', productName + ' was added to cart!', null, 'prodAdded');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  deleteProd() {
    let product = this.productService.getProductbyId(this.productId);
    let productName = product.name[0].toUpperCase() + product.name.slice(1).toLowerCase();
    this.productService.deleteProduct(this.productId);
    this.productService.$formState.next(true);
    this.toastService.show('Notification', productName + ' was deleted from the list!', null, 'prodDeleted');
  }

  closeForm() {
    this.productService.$formState.next(true);
  }

}
