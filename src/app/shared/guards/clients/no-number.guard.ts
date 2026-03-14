import { CLIENT_ROUTES } from '../../routes/clients/routes';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noNumberGuard: CanActivateFn = (route) => {
  // Router
  const router = inject(Router);

  // Params
  const id = route.paramMap.get('idClient');


  if (!id || isNaN(Number(id))) {
    return router.createUrlTree([CLIENT_ROUTES.DASHBOARD]);
  }

  return true;
};
