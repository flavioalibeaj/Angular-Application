import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ISideNavigation } from '../../model/i-side-navigation';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialogComponent } from '../../../../shared/components/information-dialog/information-dialog.component';
import { IInformationDialogData } from '../../../../shared/model/i-information-dialog-data';
import { EMPTY, switchMap } from 'rxjs';
import { IDialogResponse } from '../../../../shared/model/i-dialog-response';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    RouterLink,
    MatBadgeModule,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  notifications = []; // TODO websocket notifications
  readonly sideNavigation: ISideNavigation[] = [
    { path: '', title: 'Home' },
    { path: 'not-found', title: 'Not Found' },
    { path: 'auth', title: 'Auth' },
  ];

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _authService: AuthService
  ) {}

  logout() {
    const data: IInformationDialogData = {
      cardText: 'Are you sure you want to log out?',
      cardTitle: 'Log out',
      cardTitleIcon: 'logout',
      saveButtonText: 'Log out',
    };

    this._matDialog
      .open(InformationDialogComponent, {
        width: '400px',
        data,
      })
      .afterClosed()
      .pipe(
        switchMap((dialogData: IDialogResponse) =>
          dialogData.submitted ? this._authService.logout() : EMPTY
        )
      )
      .subscribe();
  }
}
