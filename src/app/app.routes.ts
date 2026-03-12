import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./clients/pages/clients-dashboard-page/clients-dashboard-page.component')
  },
  {
    path: 'client/:id',
    loadComponent: () => import('./clients/pages/client-details-page/client-details-page.component')
  }
];
