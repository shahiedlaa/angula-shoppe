import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopperApp';

  constructor(private authService: AuthService, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.authService.autoLogin();
    if (this.cartService.cart.length !== 0 && this.cartService.orders.length !== 0) {
      this.cartService.autoCart();
      this.cartService.autoOrder();
    }
  }
}
