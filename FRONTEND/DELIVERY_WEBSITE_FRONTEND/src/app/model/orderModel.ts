import { DeliveryAgent } from "./deliveryAgent";
export interface Order { 
    userId:number;
    orderId: string;
    itemsName: string[];
    status: string; 
    totalPrice: number;
    eta?: string;
    assignedAgent?: DeliveryAgent | null;
    displayTimer?: string;
}