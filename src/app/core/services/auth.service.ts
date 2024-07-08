import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router: Router = inject(Router);

  logout(): Observable<null> {
    this._router.navigate(['auth']);
    localStorage.clear();
    return of(null);
  }
}
