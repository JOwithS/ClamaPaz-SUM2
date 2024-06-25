import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.page.html',
  styleUrls: ['./apirest.page.scss'],
})
export class ApirestPage implements OnInit {
  financialData: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchFinancialData();
  }

  fetchFinancialData() {
    this.http.get('https://mindicador.cl/api').subscribe((response: any) => {
      this.financialData = this.transformData(response);
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

  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
