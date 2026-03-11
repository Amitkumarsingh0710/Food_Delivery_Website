import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Utility: Get cookie by name
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getCookie('token');
    return !!token;
  }

}
