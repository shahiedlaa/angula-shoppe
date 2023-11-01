import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart.component";

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: ShoppingCartComponent
    }])
  ],
})
export class ShoppingCartModule { }
