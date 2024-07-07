import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  await storageService.initStorage();  // Aseguramos que el almacenamiento esté inicializado
  const isAuthenticated = await storageService.haveaccess();
  console.log(`AuthGuard: isAuthenticated = ${isAuthenticated}`);

  if (!isAuthenticated) {
    console.log('AuthGuard: Acceso denegado, redirigiendo a /login');
    alert('Acceso denegado');
    await router.navigate(['/login']);
    return false;
  }
  return true;
};
