import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewChild, ElementRef } from '@angular/core';
import { MapType } from '@angular/compiler';
import { Plugins }  from '@capacitor/core';


const {Geolocation} = Plugins;
declare var google: any;
declare var google: any;

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit {
  private map: L.Map = {} as L.Map;
  @ViewChild('mapContainers', { static: false}) mapContainer: ElementRef | undefined;
  
  foto: SafeResourceUrl | undefined;
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
  


  constructor(private route: ActivatedRoute, private storageService: StorageService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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

/*
  async loadMap(){
    try{
      const{ Geolocation } = Plugins;
      const coordinates = await Geolocation['getCurrentPosition']();

      const mapOptions = {
        center: new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapContainer?.nativeElement, mapOptions);

      //marcador
      const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: this.map,
        title:  'Ubicacion actual'
      });

    }catch (error) {
      console.error('Error al cargar el mapa ', error);
    }

  }
*/
  async tomarFoto() {
    try {
      const fotoCapturada = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      
      this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(fotoCapturada.webPath!);
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }


  


  async logout() {
    await this.storageService.logout();
    this.router.navigate(['/login'],  { replaceUrl: true }); 
    console.log('Usuario deslogueado');
  }




}





