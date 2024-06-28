import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';

@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.page.html',
  styleUrls: ['./apirest.page.scss'],
})
export class ApirestPage implements OnInit {
  financialData: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.fetchFinancialData();
  }

  fetchFinancialData() {
    this.http.get('https://mindicador.cl/api').pipe(
      catchError(error => {
        if (error.status === 404) {
          console.log("API no disponible. Recuperando datos almacenados.");
          this.loadStoredData();
        }
        return throwError(error);
      })
    ).subscribe((response: any) => {
      this.financialData = this.transformData(response);
      this.storeData(this.financialData);
      console.log(this.financialData);
    });
  }

  transformData(data: any): any[] {
    const result = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && typeof data[key] === 'object') {
        result.push(data[key]);
      }
    }
    return result;
  }

  storeData(data: any[]) {
    this.localStorageService.setItem('financialData', data);
  }

  loadStoredData() {
    const storedData = this.localStorageService.getItem('financialData');
    if (storedData) {
      this.financialData = storedData;
    } else {
      console.log("No hay datos almacenados.");
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
