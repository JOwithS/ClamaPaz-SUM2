import { Component, OnInit, Input, Renderer2, ElementRef, Inject, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsService } from './google-maps.service';
import { Plugins } from '@capacitor/core';
import { DOCUMENT } from '@angular/common';

const { Geolocation } = Plugins;
declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  @Input() position = {
    lat: -2.898116,
    lng: -78.99958149999999
  };

  label = {
    titulo: 'Ubicacion',
    subtitulo: 'Mi ubicación de envío'
  };

  map: any;
  marker: any;
  positionSet: any;
  infowindow: any;

  @ViewChild('map') divMap!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private googleMapsService: GoogleMapsService,
    public modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    console.log('Init Google Maps');
    this.googleMapsService.init(this.renderer, this.document).then(() => {
        console.log('Google Maps API loaded');
        this.initMap();
    }).catch((err) => {
        console.log('Error loading Google Maps API', err);
    });
}

initMap() {
  console.log('Init map');
  const position = this.position;
  let latLng = new google.maps.LatLng(position.lat, position.lng);
  let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
  };

  this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
  this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
  });
  
  this.clickHandleEvent();
  this.infowindow = new google.maps.InfoWindow();
  if (this.label.titulo.length) {
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
  }
} 

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);
    });
  }

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {
    const contentString = '<div id="contentInsideMap">' +
                          '<div>' +
                          '</div>' +
                          '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                          '<div id="bodyContent">' +
                          '<p class="normal m-0">' + subtitulo + '</p>' +
                          '</div>' +
                          '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

  async mylocation() {
    console.log('mylocation() click');

    Geolocation['getCurrentPosition']().then((res: GeolocationPosition) => {
      console.log('mylocation() -> get');

      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      this.addMarker(position);
    });
  }

  aceptar() {
    console.log('click aceptar -> ', this.positionSet);
    this.modalController.dismiss({ pos: this.positionSet });
  }
}
