import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisisPageRoutingModule } from './analisis-routing.module';

import { AnalisisPage } from './analisis.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule

  ],
  declarations: [AnalisisPage]
})
export class AnalisisPageModule {}
