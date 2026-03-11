import { DeliveryAgent } from "../model/deliveryAgent";
export function populateDeliveryList(){
    let  dummyAgents: DeliveryAgent[] = [
          { id: 1, name: 'John Doe', available: true},
          { id: 2, name: 'Jane Smith', available: true },
          // { id: 3, name: 'Mike Ross', available: true },
          // { id: 4, name: 'Harvey Specter', available: true },
          // { id: 5, name: 'Rachel Zane', available: true },
          // { id: 6, name: 'Donna Paulsen', available: true },
          // { id: 7, name: 'Louis Litt', available: true },
          // { id: 8, name: 'Jessica Pearson', available: true },
          // { id: 9, name: 'Robert Kane', available: true },
          // { id: 10, name: 'Alex Williams', available: true },
        ];

        return dummyAgents;
}