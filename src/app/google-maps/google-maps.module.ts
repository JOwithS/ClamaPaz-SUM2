import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ], exports:[
    GoogleMapsComponent,
  ]
})
export class GoogleMapsModule { }
