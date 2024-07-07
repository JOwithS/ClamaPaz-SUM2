import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'analisis',
    loadChildren: () => import('./analisis/analisis.module').then(m => m.AnalisisPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'transtornos',
    loadChildren: () => import('./transtornos/transtornos.module').then(m => m.TranstornosPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then(m => m.AyudaPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'salud',
    loadChildren: () => import('./salud/salud.module').then(m => m.SaludPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'apirest',
    loadChildren: () => import('./apirest/apirest.module').then(m => m.ApirestPageModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then(m => m.CamaraPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  },
  {
    path: 'persona',
    loadChildren: () => import('./persona/persona.module').then( m => m.PersonaPageModule)
  },
  {
    path: 'datos-persona',
    loadChildren: () => import('./datos-persona/datos-persona.module').then( m => m.DatosPersonaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
