import { Routes } from '@angular/router';
import { CLIENT_ROUTES } from './shared/routes/clients/routes';

export const routes: Routes = [
  {
    path: CLIENT_ROUTES.DASHBOARD.slice(1),
    loadComponent: () => import('./clients/pages/clients-dashboard-page/clients-dashboard-page.component')
  },
  {
    path: CLIENT_ROUTES.CLIENT_INFO(':idClient').slice(1),
    loadComponent: () => import('./clients/pages/client-details-page/client-details-page.component')
  },
  {
    path: '**',
    redirectTo: CLIENT_ROUTES.DASHBOARD.slice(1)
  }
];
