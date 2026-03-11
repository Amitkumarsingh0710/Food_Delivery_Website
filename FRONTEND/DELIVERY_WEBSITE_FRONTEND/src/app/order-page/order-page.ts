import { Component } from '@angular/core';
import { ViewCartService } from '../services/view-cart-service';
import { cartItem } from '../model/cartItem';
import { Order } from '../model/orderModel';
import { OrderService } from '../services/order-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';
import { UserModel } from '../model/UserModel';
@Component({
  selector: 'app-order-page',
  imports: [CommonModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css',
})
export class OrderPage {
  cartItems: cartItem[] = [];
  orderdItems: Order[] = [];
  currentUser !: UserModel;
  constructor(private orderService: OrderService, private userService: UserService) { }
  ngOnInit() {

    this.userService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user
        this.orderdItems = this.orderService.filterOrders(this.currentUser.id);
      }
    });

  }
}

