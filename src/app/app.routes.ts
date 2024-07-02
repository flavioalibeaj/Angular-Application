import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
    // TODO guard with can activate and can activate child
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
