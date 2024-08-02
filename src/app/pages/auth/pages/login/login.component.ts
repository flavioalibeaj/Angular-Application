import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../core/services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GenericFormComponent } from '../../../../shared/components/generic-form/generic-form.component';
import { IFormModel } from '../../../../shared/model/i-form-model';
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
    GenericFormComponent,
  ],
  template: `
    <app-generic-form
      [formModelInput]="formModel"
      [cardViewInput]="true"
      [hideCancelInput]="true"
      [submitIconInput]="'login'"
      [submitTextInput]="'Log in'"
      [formClassInput]="'w-96 flex flex-col items-center'"
      (formSubmit)="onFormSubmit($event)"
    />
  `,
})
export class LoginComponent {
  readonly formModel: IFormModel[] = [
    {
      fieldType: 'text',
      fieldName: 'username',
      label: 'Username',
      fieldValue: 'mor_2314',
      inputClass: 'w-full',
      validators: [Validators.required],
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      label: 'Password',
      fieldValue: '83r5^_',
      inputClass: 'w-full',
      validators: [Validators.required],
    },
  ];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _ngxSpinnerService: NgxSpinnerService
  ) {}

  onFormSubmit(event: { submitted: boolean; formData: unknown }) {
    this._ngxSpinnerService.show();

    this._authService
      .login(event.formData)
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
