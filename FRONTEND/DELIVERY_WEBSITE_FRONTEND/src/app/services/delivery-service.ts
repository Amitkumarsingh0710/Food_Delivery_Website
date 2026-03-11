import { Injectable } from '@angular/core';
import { DeliveryAgent } from '../model/deliveryAgent';
import { populateDeliveryList } from '../dataLayer/deliveryAgentList';
 
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
   private dummyAgents: DeliveryAgent[] = populateDeliveryList();
 
  getAgents(): DeliveryAgent[] {
    return this.dummyAgents;
   
  }
 
 
  setAgentAvailability(agentId: number | undefined, isAvailable: boolean): void {
    const agent = this.dummyAgents.find(a => a.id === agentId);
    if (agent) {
      agent.available = isAvailable;
    }
  }

  getAnyAvailableAgent(): DeliveryAgent[] {  
    return this.dummyAgents.filter(agent => agent.available);
  }
 
  
  anyAgentsAvailable(): boolean {
    return this.dummyAgents.some(agent => agent.available);
  }
}
