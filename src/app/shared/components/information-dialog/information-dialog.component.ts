import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { IInformationDialogData } from '../../model/i-information-dialog-data';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-information-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './information-dialog.component.html',
  styleUrl: './information-dialog.component.scss',
})
export class InformationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly dialogData: IInformationDialogData,
    private readonly _matDialogRef: MatDialogRef<InformationDialogComponent>
  ) {}

  save(): void {
    this._matDialogRef.close({
      submitted: true,
    });
  }
}
