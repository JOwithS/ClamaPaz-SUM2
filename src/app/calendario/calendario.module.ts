import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const str = value.split('/');
      const day = Number(str[0]);
      const month = Number(str[1]) - 1;
      const year = Number(str[2]);
      return new Date(year, month, day);
    }
    return super.parse(value);
  }

  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${this._to2digit(day)}/${this._to2digit(month)}/${year}`;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule



  ],
  declarations: [CalendarioPage],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})

export class CalendarioPageModule {}
