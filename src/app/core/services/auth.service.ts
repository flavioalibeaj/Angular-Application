import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router: Router = inject(Router);
  public token: WritableSignal<string> = signal<string>(
    localStorage.getItem('token') ?? ''
  );

  public readonly isAuthenticated: Signal<boolean> = computed(() => {
    console.log('tok', this.token());
    return !!this.token();
  }); //TODO decrypt token and check exp date

  logout() {
    localStorage.clear();
    this._router.navigate(['auth']);
  }
}
