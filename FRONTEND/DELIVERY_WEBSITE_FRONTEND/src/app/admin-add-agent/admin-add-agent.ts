import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-agent',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-agent.html',
  styleUrl: './admin-add-agent.css',
})
export class AdminAddAgent {showSuccess = false;

  agent = {
    agentName: '',
    phoneNumber: '',
    availability: true
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Agent Data Saved:', this.agent);
      
      this.showSuccess = true;
      form.resetForm({ availability: true });

      // Hide message after 3 seconds
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }
}