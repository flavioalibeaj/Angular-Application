import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const appGuard: CanActivateFn = (route) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const { openWhenAuthenticated } = route.data as {
    openWhenAuthenticated: boolean;
  };

  // Route will be opened only when authentication is needed
  if (openWhenAuthenticated) {
    // Allow access
    if (authService.isAuthenticated()) {
      return true;
    }
    // Log out
    authService.logout();
    return false;
  }

  // Route will be opened only when user is not authenticated
  if (authService.isAuthenticated()) {
    // Authenticated users redirect to home
    router.navigate(['home']);
    return false;
  }
  // Allow access
  return true;
};
