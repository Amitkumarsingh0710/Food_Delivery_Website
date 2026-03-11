import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  standalone: true, // Assuming Angular 14+ based on your imports
  imports: [CommonModule, FormsModule],
  templateUrl: './add-restaurant.html',
  styleUrl: './add-restaurant.css',
})
export class AddRestaurant {
  showSuccess = false;
  selectedFile: File | null = null;

  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  constructor(
    private restaurantService: RestaurantService, 
    private cdr: ChangeDetectorRef, 
    private router: Router
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const val = form.value; // Shortcut to the form data
      console.log("FOrm value ....");
      console.log(val);
      // 1. Logic check for time
      if (val.openTime >= val.closeTime) {
        alert('Closing time must be later than opening time');
        return;
      }

      const formData = new FormData();

      // 2. Append data from form.value
      formData.append('restaurantName', val.restaurantName);
      formData.append('landmark', val.landmark);
      formData.append('district', val.district);
      formData.append('state', val.state);
      formData.append('contactNumber', val.contactNumber);
      formData.append('openTime', val.openTime);
      formData.append('closeTime', val.closeTime);
      formData.append('isOperating', 'true');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile); 
      }

      // Debugging: Verify FormData contents
      formData.forEach((value, key) => console.log(key, value));

      this.restaurantService.addRestaurant(formData).subscribe({
        next: (response) => {
          console.log("Restaurant Added", response);
          this.showSuccess = true;
          form.resetForm();
          this.selectedFile = null;
          
          setTimeout(() => { 
            this.showSuccess = false;
            this.router.navigate(['/']); 
          }, 2000);
        },
        error: (err) => {
          console.error("Error occurred", err);
        }
      });
    }
  }
}