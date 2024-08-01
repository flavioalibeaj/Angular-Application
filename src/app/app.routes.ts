import { Routes } from '@angular/router';
import { appGuard } from './core/guards/app.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [appGuard],
    data: {
      openWhenAuthenticated: false,
    },
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.routes),
  },
  {
    // TODO guard with can activate child
    path: 'home',
    canActivate: [appGuard],
    data: {
      openWhenAuthenticated: true,
    },
    loadChildren: () =>
      import('./pages/home/home.routes').then((r) => r.routes),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
