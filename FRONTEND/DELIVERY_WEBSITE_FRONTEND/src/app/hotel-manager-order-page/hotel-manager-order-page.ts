import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service';
import { Order } from '../model/orderModel'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-hotel-manager-order-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './hotel-manager-order-page.html',
  styleUrl: './hotel-manager-order-page.css',
})
export class HotelManagerOrderPage implements OnInit, OnDestroy {
 
  constructor(private orderService: OrderService, private datePipe: DatePipe) { }
 
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'All';
  todayDate: string = '';
  timerInterval: any;
 
  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.refreshOrders();
 
    this.timerInterval = setInterval(() => {
      this.updateLiveTimers();
    }, 1000);
  }
 
 
 
 
  refreshOrders() {
    this.orders = this.orderService.getOrders();
    this.filterOrders();
  }
 
  filterOrders() {
    this.filteredOrders = (this.selectedStatus === 'All')
      ? this.orders
      : this.orders.filter(o => o.status === this.selectedStatus);
  }
 
  updateLiveTimers() {
    const now = new Date().getTime();
 
    this.filteredOrders.forEach((order:Order) => {
      if (order.eta && order.status === 'Delivery in progress') {
        const etaTime = new Date(order.eta).getTime();
        const diff = etaTime - now;
 
        if (diff <= 0) {
         
          this.handleSetDeliveryInProgress(order.orderId, order.eta, 'Delivered');
        } else {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          order.displayTimer = `${mins}m ${secs}s`;
        }
      }
 
      else {
        order.displayTimer = order.eta
          ? this.datePipe.transform(order.eta, 'shortTime') || 'Not set'
          : 'Not set';
      }
    });
  }
 
 
  isFutureTime(selectedEta: string): boolean {
    if (!selectedEta) return false;
    const selected = new Date(selectedEta).getTime();
    const now = new Date().getTime();
    return selected > (now + 60000);
  }
 
  handleSetDeliveryInProgress(orderId: string, eta: string, status: string) {
    if (status === 'Delivery in progress') {
      if (!eta || !this.isFutureTime(eta)) {
        alert("Error: You must select a future minute. Current or past minutes are not allowed.");
        return;
      }
    }
 
    this.orderService.setDeliveryInProgress(orderId, eta, status);
    this.refreshOrders();
  }
 
  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}
 