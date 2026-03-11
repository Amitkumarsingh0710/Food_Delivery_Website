import { Component } from '@angular/core';
import { cartItem } from '../model/cartItem';
import { ViewCartService } from '../services/view-cart-service';
import { CommonModule } from '@angular/common';
import { Order } from '../model/orderModel';
import { OrderService } from '../services/order-service';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel';
import { UserService } from '../services/user-service';
@Component({
  selector: 'app-view-cart',
  imports: [CommonModule],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.css',
})

export class ViewCart {
  subscription : any;
  viewSubscription: any;
  currentUser!: UserModel;
  cartItems: cartItem[] = [];
  orderdItems: Order[] = [];
  total: number = 0;
  constructor(private userService: UserService, private viewCartService: ViewCartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
   this. viewSubscription =  this.viewCartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.viewCartService.getTotalAmount();
    });
    
    this.subscription = this.userService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
  }

  handleIncreaseQuantity(itemId: string) {
    this.viewCartService.increaseQuantity(itemId);
  }
  handleDecreaseQuantity(itemId: string) {
    this.viewCartService.decreaseQuantity(itemId);
  }

  handleRemoveItem(itemId: string) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.viewCartService.removeFromCart(itemId);
    }
  }

  placeOrder() {
    let totalAmount = this.viewCartService.getTotalAmount();
    this.router.navigate(['/payment-page', totalAmount]);
  }

   ngOnDestroy(){
     this.subscription.unsubscribe();
     this.viewSubscription.unsubscribe();
   }

}
