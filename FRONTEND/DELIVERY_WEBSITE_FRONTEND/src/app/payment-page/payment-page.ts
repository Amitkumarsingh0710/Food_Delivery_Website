import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { cardNumberValidator } from '../directive/creditCardValidator';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { cvvValidator } from '../directive/cvvValidator';
import { ViewCartService } from '../services/view-cart-service';
import { OrderService } from '../services/order-service';
import { cartItem } from '../model/cartItem';
import { Order } from '../model/orderModel';

@Component({
  selector: 'app-payment-page',
  imports: [cardNumberValidator, FormsModule, CommonModule, cvvValidator],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
})
export class PaymentPage {
  constructor(private orderService: OrderService, private viewCartService: ViewCartService, private route: ActivatedRoute, private router: Router) { }
  viewSubscription: any;
  totalAmount: number = 0;
  minDate: string = '';
  displayExpiry: string = '';

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.viewSubscription = this.viewCartService.cart$.subscribe(items => {
      this.cartItems = items;
    });

    this.route.params.subscribe(params => {
      this.totalAmount = params['totalPrice'];
    });
  }

  onDateChange(event: any) {
    const date = new Date(event.target.value);
    if (!isNaN(date.getTime())) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().substring(2);
      this.displayExpiry = `${month}/${year}`;
    }
  }

  cartItems: cartItem[] = [];
  orderdItems: Order[] = [];
  makePayment(formData: NgForm) {
    console.log(formData.value);
    alert(`Payment of ₹${this.totalAmount} successful! 🎉`);
    this.orderdItems = this.orderService.createOrder(this.cartItems);
    this.viewCartService.clearCart();
    this.router.navigate(['/order-page']);
  }
  
   ngOnDestroy(){
     this.viewSubscription.unsubscribe();
   }
}
