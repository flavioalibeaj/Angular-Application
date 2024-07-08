export interface DialogResponse<T = null> {
  submitted?: boolean;
  formData?: T;
}
