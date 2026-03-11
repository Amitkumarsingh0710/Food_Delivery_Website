import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../app/services/auth-service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedIn = authService.isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    console.log('No token found, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
};

