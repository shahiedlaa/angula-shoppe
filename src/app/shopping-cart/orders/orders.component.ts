import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../shopping-cart.service';
import { orders } from '../orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  public isLoading:boolean = true;
  public orderedItems: orders[];
  public total:number;

  constructor(private shoppingCartService: ShoppingCartService){};

  ngOnInit(){
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

    this.orderedItems = this.shoppingCartService.getOrderItems();

    this.orderTotal();
  }

  ngOnDestroy(){
    this.shoppingCartService.resetOrder();
  }

  orderTotal(){
    let total = 0;
    this.orderedItems.forEach((value) => {
      total += value.price * value.quantity
    })
    this.total = total;
  }

}
