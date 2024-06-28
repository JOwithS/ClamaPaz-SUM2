import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPersonaPageRoutingModule } from './datos-persona-routing.module';

import { DatosPersonaPage } from './datos-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPersonaPageRoutingModule
  ],
  declarations: [DatosPersonaPage]
})
export class DatosPersonaPageModule {}
