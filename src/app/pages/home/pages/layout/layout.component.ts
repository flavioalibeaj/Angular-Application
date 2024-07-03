import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ISideNavigation } from '../../model/i-side-navigation';

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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  readonly sideNavigation: ISideNavigation[] = [
    { path: '', title: 'Home' },
    { path: 'not-found', title: 'Not Found' },
    { path: 'auth', title: 'Auth' },
  ];
}
