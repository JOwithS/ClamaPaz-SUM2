import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit {
  nombre: string = '';
  mostrarContenido: boolean = false;
  mostrarFormularioContenido: boolean = false;
  mostrarBoton: boolean = true;
  mostrarForm: boolean = false;
  mostrarMensajeFeliz: boolean = false;
  mostrarMensajeBueno: boolean = false;
  mostrarMensajeAlgo: boolean = false;
  mostrarMensajeMal: boolean = false;
  mostrarMensajeUNO: boolean = false;
  mostrarMensajeDOS: boolean = false;
  mostrarMensaje11: boolean = false;
  mostrarMensaje22: boolean = false;
  mostrarMensaje33: boolean = false;
  mostrarMensajemal1: boolean = false;
  mostrarMensajemal2: boolean = false;
  


  constructor(private route: ActivatedRoute, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.nombre = this.route.snapshot.paramMap.get('nombre') || '';

    setTimeout(() => {
      this.mostrarContenido = true;
      setTimeout(() => {
        this.mostrarBoton = true; 
      }, 3000); 
    }, 3000);
  }
 
  mostrarFormulario() {
    this.mostrarFormularioContenido = true;
    this.mostrarBoton = false;
    this.mostrarContenido = false; 
  }

  mostrarMensaje(tipo: string) {
    this.ocultarMensajes();
    if (tipo === 'feliz') {
      this.mostrarMensajeFeliz = true;
    } else if (tipo === 'bueno') {
      this.mostrarMensajeBueno = true;
    } else if (tipo === 'algo') {
      this.mostrarMensajeAlgo = true;
    } else if (tipo === 'mal') {
      this.mostrarMensajeMal = true;
    } else if (tipo === 'optimista') {
      this.mostrarMensajeUNO = true;
    } else if (tipo === 'intemocional') {
      this.mostrarMensajeDOS = true;
    }  else if (tipo === 'mal1') {
      this.mostrarMensaje11 = true;
    } else if (tipo === 'mal2') {
      this.mostrarMensaje22 = true;
    } else if (tipo === 'mal3') {
      this.mostrarMensaje33 = true;
    } else if (tipo === 'bad1') {
      this.mostrarMensajemal1 = true;
    } else if (tipo === 'bad2') {
      this.mostrarMensajemal2 = true;
    }
     
         
  }

    
  

  ocultarMensajes() {
    this.mostrarMensajeFeliz = false;
    this.mostrarMensajeBueno = false;
    this.mostrarMensajeAlgo = false;
    this.mostrarMensajeMal = false;
    this.mostrarMensajeUNO = false;
    this.mostrarMensajeDOS = false;
    this.mostrarMensaje11  = false;
    this.mostrarMensaje22  = false;
    this.mostrarMensaje33  = false;
    this.mostrarMensajemal1 = false;
    this.mostrarMensajemal2 = false;
    
  }

  irAUrl(url: string) {
    window.location.href = url;
  }

  async logout() {
    await this.storageService.logout();
    this.router.navigate(['/login'],  { replaceUrl: true }); 
    console.log('Usuario deslogueado');
  }
}
