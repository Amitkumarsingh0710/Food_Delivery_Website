import { ChangeDetectorRef, Component, signal } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service';
import { UserModel } from './model/UserModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentUser !:UserModel|null ;
  constructor(private userService:UserService,private cdr: ChangeDetectorRef){}
  ngOnInit(){
     // Check if token cookie exists before hitting API
    const token = this.getCookie('token');
    if (!token) {
      console.log('No token found, skipping getUserProfile call');
      this.currentUser = null;
      return;
    }

    // Only call API if token exists
    this.userService.getUserProfile().subscribe({
      next: response => {
        console.log('User profile response in App component:', response.response.data);
        this.currentUser = response.response.data;
      },
      error: error => {
        console.error('Error fetching user profile in App component:', error);
        this.currentUser = null;
      }
    });
  }

    //Utility: Get cookie by name
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }


   
}
