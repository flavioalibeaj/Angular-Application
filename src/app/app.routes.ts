import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.routes),
    // TODO guard with can activate and can activate child
  },
  {
    // TODO guard with can activate child
    path: '',
    canActivate: [authGuard],
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
