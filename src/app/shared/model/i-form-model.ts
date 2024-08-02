import { ValidatorFn } from '@angular/forms';

export interface IFormModel {
  fieldName: string; // formControl name
  fieldType: 'text' | 'password' | 'autocomplete' | 'number' | 'checkbox';
  inputClass: string;
  validators?: ValidatorFn[];
  options?: { key: string; value: unknown }[];
  fieldValue?: unknown;
  label?: string;
}
