import { Injectable } from '@angular/core';
import { Order } from '../model/orderModel';
import { cartItem } from '../model/cartItem';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private orders: Order[] = [];

  constructor() {
    const saved = localStorage.getItem('orders');
    this.orders = saved ? JSON.parse(saved) : [];
  }

  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  createOrder(items: cartItem[]) {
    const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);

    if (items && items.length > 0) {
      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      let Id =0 ;
      const itemNames: string[] = [];
      items.forEach(item => {
        itemNames.push(item.name || item.itemName);
        Id = item.userId;
      });

      let newOrder: Order ={
        userId:Id,
        orderId: orderId,
        itemsName: itemNames, 
        totalPrice: totalPrice,
        status: 'Pending'
      };

      this.orders.push(newOrder);
    }

    this.saveOrders();
    return [...this.orders];
  }

  getTotalAmount(Items: cartItem[]): number {
  return Items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}


  getOrders(): Order[] {
    return [...this.orders];
  }

  setDeliveryInProgress(orderId: string, eta: string, newStatus: string = "Delivery in progress") {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    order.status = newStatus;
    order.eta = eta;
    this.saveOrders();
  }


  updateAgent(orderId: string, agentName: string,agentId:number,available:boolean) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;
    order.assignedAgent = { id: agentId, name: agentName, available: available };
    this.saveOrders();
  }
   
  
  updateOrderStatus(orderId: string, status: string) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;
    order.status = status;
    this.saveOrders();
  }

  filterOrdersByStatus(selectedStatus: string){
    if(selectedStatus === 'All'){
      return this.getOrders();
    } else {
      return this.orders.filter(order => order.status === selectedStatus);
    } 
  }


  clearOrders(): void {
    localStorage.removeItem('orders');
  }

  filterOrders(userId:number){
       let orderList:Order[] = this.getOrders();
       let filterOrderList:Order[] = orderList.filter((o)=>o.userId === userId);
       return filterOrderList;
  }
}
