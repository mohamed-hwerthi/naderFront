import { CanActivateFn, Router } from '@angular/router';
import { GererTokenService } from '../services/gerer-token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(GererTokenService);
  const router = inject(Router);
  if (userService.isLoggIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
