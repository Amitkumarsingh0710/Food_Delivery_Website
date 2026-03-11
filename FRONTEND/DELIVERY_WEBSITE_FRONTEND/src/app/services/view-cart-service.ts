import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItem } from '../model/cartItem';
@Injectable({
  providedIn: 'root',
})

export class ViewCartService {
  private cartItems: cartItem[] = [];
  private cartSubject = new BehaviorSubject<cartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: cartItem) {
    const existingItem = this.cartItems.find(ci => ci.itemId === item.itemId);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(itemId: string) {
    this.cartItems = this.cartItems.filter(ci => ci.itemId !== itemId);
    this.cartSubject.next([...this.cartItems]);
  }

  increaseQuantity(itemId: string) {
    const item = this.cartItems.find(ci => ci.itemId === itemId);
    if (item) {
      item.quantity += 1;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  decreaseQuantity(itemId: string) {
    const item = this.cartItems.find(ci => ci.itemId === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSubject.next([...this.cartItems]);
    }
    else {
      this.removeFromCart(itemId);
    }
  }


  getCartItems(){
    return this.cartItems
  }
  
getTotalAmount(): number {
  return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
  

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
  }
}
