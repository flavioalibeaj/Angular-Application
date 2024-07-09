import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar: MatSnackBar = inject(MatSnackBar);
  const authService: AuthService = inject(AuthService);

  let clonedRequest = req;

  if (authService.isAuthenticated()) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: authService.token,
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBar.open(error.message, 'Close', {
        panelClass: 'error-snackbar',
      });
      return throwError(() => error);
    })
  );
};
