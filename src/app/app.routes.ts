import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
