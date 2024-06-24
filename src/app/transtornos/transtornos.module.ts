import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranstornosPageRoutingModule } from './transtornos-routing.module';

import { TranstornosPage } from './transtornos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranstornosPageRoutingModule
  ],
  declarations: [TranstornosPage]
})
export class TranstornosPageModule {}
