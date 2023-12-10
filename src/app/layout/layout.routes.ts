import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/characters/characters.component'),
      },
      {
        path: 'locations',
        loadComponent: () => import('../pages/locations/locations.component'),
      },
    ],
  },
];

export default routes;
