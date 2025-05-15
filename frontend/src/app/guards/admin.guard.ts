import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  if (_AuthService.isAdmin()) { return true }
  else {
    _Router.navigate(['/home']);
    return false;
  }
};