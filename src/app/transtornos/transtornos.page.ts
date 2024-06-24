import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transtornos',
  templateUrl: './transtornos.page.html',
  styleUrls: ['./transtornos.page.scss'],
})
export class TranstornosPage implements OnInit {
  mostrartranstorno: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarMensaje(tipo: string) {
    this.ocultarMensajes();
    if (tipo === 'ooo') {
      this.mostrartranstorno = true;
    } 
         
  }

  ocultarMensajes() {
    this.mostrartranstorno = false;
    
  }

}
