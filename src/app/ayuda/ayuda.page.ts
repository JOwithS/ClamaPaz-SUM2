import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  mostrarMensajeay: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarMensaje(tipo: string) {
    this.ocultarMensajes();
    if (tipo === 'ayuda') {
      this.mostrarMensajeay = true;
    } 
     
     
    


  }

  ocultarMensajes() {
    this.mostrarMensajeay = false;
    
    
  }

}
 