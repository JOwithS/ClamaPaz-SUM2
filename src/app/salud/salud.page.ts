import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salud',
  templateUrl: './salud.page.html',
  styleUrls: ['./salud.page.scss'],
})
export class SaludPage implements OnInit {
  mostrarMensajeSalud: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarMensaje(tipo: string) {
    this.ocultarMensajes();
    if (tipo === 'salud') {
      this.mostrarMensajeSalud = true;
    } 
         
  }

  
  ocultarMensajes() {
    this.mostrarMensajeSalud = false;
    
  }

}
