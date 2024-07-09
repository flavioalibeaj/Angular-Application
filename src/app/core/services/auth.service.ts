import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: WritableSignal<string> = signal<string>(
    localStorage.getItem('token') ?? ''
  );
  private readonly _router: Router = inject(Router);
  private readonly _httpService: HttpService = inject(HttpService);
  public get token(): string {
    return this._token();
  }
  public set token(newToken: string) {
    this._token.set(newToken);
    localStorage.setItem('token', newToken);
  }

  public readonly isAuthenticated: Signal<boolean> = computed(
    () => !!this._token()
  ); //TODO decrypt token and check exp date

  public login<T>(body: T): Observable<{ token: string }> {
    return this._httpService.post<T, { token: string }>('auth/login', body);
  }

  public logout() {
    this._token.set('');
    localStorage.clear();
    this._router.navigate(['auth']);
  }
}
