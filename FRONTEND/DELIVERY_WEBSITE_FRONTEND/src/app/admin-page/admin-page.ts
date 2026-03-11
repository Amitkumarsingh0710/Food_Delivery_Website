import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../services/delivery-service';
import { DeliveryAgent } from '../model/deliveryAgent';
import { CommonModule } from '@angular/common';
import { Order } from '../model/orderModel';
import { OrderService } from '../services/order-service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../model/UserModel';
 
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {
  agents: DeliveryAgent[] = [];
  Orders: Order[] = [];
  selectedStatus: string = 'All';
  selectedAgentsMap: { [key: string]: DeliveryAgent | null } = {};
 
  constructor(
    private deliveryService: DeliveryService,
    private orderService: OrderService
  ) {}
 
  ngOnInit() {
    this.loadData();
  }
 
  loadData() {
    this.agents = this.deliveryService.getAnyAvailableAgent();
    this.Orders = this.orderService.getOrders();
  }
 

  get isAnyAgentAvailable(): boolean {
    return this.deliveryService.anyAgentsAvailable();
  }

  
  handleAccept(orderId: string) {
    const agent = this.selectedAgentsMap[orderId];
    if (agent) {
      this.deliveryService.setAgentAvailability(agent.id, false);
      this.orderService.updateAgent(orderId, agent.name, agent.id, false);
      this.orderService.updateOrderStatus(orderId, 'Accepted');
      alert(`Order ${orderId} accepted and assigned to ${agent.name}.`);
      this.selectedAgentsMap[orderId] = null;
      this.loadData();
    }
  }
 
  changeStatus(orderId: string, status: string) {
    this.orderService.updateOrderStatus(orderId, status);
    alert("Order`s status updated to " + status + ".");
    this.loadData();
  }
 
  filterOrders() {
    this.Orders = this.orderService.filterOrdersByStatus(this.selectedStatus);
  }
}
