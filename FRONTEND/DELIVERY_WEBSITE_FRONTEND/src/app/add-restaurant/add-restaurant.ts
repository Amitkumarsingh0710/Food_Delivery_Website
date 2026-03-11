import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-restaurant',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-restaurant.html',
  styleUrl: './add-restaurant.css',
})
export class AddRestaurant {
  showSuccess = false;

  // List of Indian States
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  restaurant = {
    restaurantName: '',
    address: {
      landmark: '',
      district: '',
      state: '' // This will bind to the dropdown
    },
    contactNumber: '',
    openingHours: { open: '', close: '' },
    isOperating: true
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Restaurant Registered:', this.restaurant);
      this.showSuccess = true;
      form.resetForm({ isOperating: true });
      setTimeout(() => { this.showSuccess = false; }, 3000);
    }
  }
}