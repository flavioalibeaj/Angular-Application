import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormModel } from '../../model/i-form-model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgIf,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent implements OnInit {
  @Input({ required: true }) formModelInput: IFormModel[] = [];
  @Input({ required: true }) submitIconInput: string = '';
  @Input({ required: true }) submitTextInput: string = '';
  @Input({ required: true }) formClassInput: string = '';
  @Input() cardViewInput?: boolean;
  @Input() hideCancelInput?: boolean;
  @Input() hideSubmitInput?: boolean;
  @Output() formSubmit: EventEmitter<{
    submitted: boolean;
    formData: unknown;
  }> = new EventEmitter();
  readonly formGroup: FormGroup = new FormGroup({});
  hide: boolean = true; // Hides password

  ngOnInit(): void {
    this.setUpForm();
  }

  onSubmit() {
    this.formSubmit.emit({
      submitted: true,
      formData: this.formGroup.getRawValue(),
    });
  }

  private setUpForm() {
    this.formModelInput.forEach((input) => {
      this.formGroup.addControl(
        input.fieldName,
        new FormControl(input.fieldValue, input.validators)
      );
    });
  }
}
