import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const appGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    authService.logout();
    return false;
  }
};
