import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../core/services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public hide = true;
  public readonly formGroup: FormGroup = new FormGroup({
    username: new FormControl<string>('mor_2314', Validators.required),
    password: new FormControl<string>('83r5^_', Validators.required),
  });
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _ngxSpinnerService: NgxSpinnerService =
    inject(NgxSpinnerService);

  onSubmit() {
    this._ngxSpinnerService.show();

    this._authService
      .login(this.formGroup.getRawValue())
      .pipe(
        tap((response) => {
          if (response.token) {
            this._authService.token = response.token;
            this._router.navigate(['home']);
          }
        })
      )
      .subscribe({
        complete: () => this._ngxSpinnerService.hide(),
      });
  }
}
