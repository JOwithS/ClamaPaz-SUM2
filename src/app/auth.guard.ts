import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';

export const authGuard: CanActivateFn =  async  (route, state) => {
    const storageService = inject(StorageService); 
    const router = inject(Router);

    const isAuthenticated = await storageService.haveaccess();
    if (!isAuthenticated) {
      alert('Acceso denegado');
      await router.navigate(['/login']);
      return false;
    }
    return true;
  };