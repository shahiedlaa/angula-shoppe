import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { OrdersComponent } from "./orders/orders.component";
import { ShoppingCartComponent } from "./shopping-cart.component";

@NgModule({
  declarations: [
    ShoppingCartComponent,
    OrdersComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShoppingCartComponent },
      { path: 'orders', component: OrdersComponent }]),
  ],
})
export class ShoppingCartModule { }
