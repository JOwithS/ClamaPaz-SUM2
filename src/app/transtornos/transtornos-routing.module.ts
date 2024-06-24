import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranstornosPage } from './transtornos.page';

const routes: Routes = [
  {
    path: '',
    component: TranstornosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranstornosPageRoutingModule {}
