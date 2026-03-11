import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // Added for responsive logic
import { UserService } from './services/user-service';
import { UserModel } from './model/UserModel';

@Component({
  selector: 'app-root',
  standalone: true, // Assuming standalone based on your imports style
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentUser: UserModel | null = null;
  
  // State variables
  isDropdownOpen = false;
  isMenuOpen = false; 
  isMobile = false; // Track mobile state programmatically
  loginStatus!: boolean;

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver // Injected BreakpointObserver
  ) { }

  ngOnInit(): void {
    // 1. User and Login Status Subscriptions
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user; 
    });

    this.userService.isLoggedIn$.subscribe((st) => {
        this.loginStatus = st;
    });

    // 2. Responsive Breakpoint Handling
    // This observes the 'Handset' breakpoint (mobile) and updates the state
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        
        // UX improvement: If the user expands the window to desktop, 
        // we automatically close the mobile hamburger menu.
        if (!this.isMobile) {
          this.isMenuOpen = false;
        }
      });
  }

  // --- METHODS ---

  Logout() {
    this.userService.logout();
    this.isMenuOpen = false; 
    this.isDropdownOpen = false;
    alert("Logout successful...");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}