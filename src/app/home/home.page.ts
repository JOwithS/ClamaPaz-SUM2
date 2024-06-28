import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = "";
  username?: string;
  financialData: any[] = [];
  a: { ubicacion: { lat: number, lng: number } | null } = { ubicacion: null }; // Define ubicacion como un objeto con lat y lng

 


  constructor(private storageService: StorageService, private router: Router, private http: HttpClient,
              private modalController: ModalController, private menuController: MenuController) {}

  async ngOnInit() {
    this.fetchFinancialData();
    try {
      const isActiveSession = await this.storageService.isAuthenticated();
      if (!isActiveSession) {
        this.router.navigate(['/login']);
      } else {
        const currentUser = await this.storageService.getCurrentUser();
        if (currentUser === null) {
          this.router.navigate(['/login']);
        } else {
          this.username = currentUser;
        }
      }
    } catch (error) {
      console.error('Error en la inicialización de HomePage:', error);
    }
  }

  irASaludo() {
    this.router.navigate(['/analisis', { nombre: this.nombre }]);
  }

  submitForm() {
    console.log("Formulario enviado");
    this.router.navigate(['/analisis', { nombre: this.nombre }]);
  }

  async logout() {
    try {
      if (this.username) {
        await this.storageService.logout(); 
      }
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  fetchFinancialData()
  {
    this.http.get('https://mindicador.cl/api').subscribe((response: any) =>{

      console.log(response)

    });
  }
  async addDirection() {
    let positionInput = {
      lat: -2.898116,
      lng: -78.99958149999999
    };

    const modalAdd = await this.modalController.create({
      component: GoogleMapsComponent,
      mode: 'ios',
      componentProps: { position: positionInput }
    });
    
    await modalAdd.present();
    const { data } = await modalAdd.onWillDismiss();
    if (data && data.pos) {
      console.log('data ->', data);
    }
  }  

  async guardarUbicacionSeleccionada(ubicacion: { lat: number, lng: number }) {
    this.a.ubicacion = ubicacion; // Guarda la ubicación en a.ubicacion
    await this.storageService.saveSelectedLocation(JSON.stringify(ubicacion)); // Guarda la ubicación como string en el almacenamiento
  }

  async obtenerUbicacionSeleccionada(): Promise<{ lat: number, lng: number } | null> {
    const ubicacionString = await this.storageService.getSelectedLocation();
    if (ubicacionString) {
      return JSON.parse(ubicacionString);
    }
    return null;
  }

  async eliminarUbicacionSeleccionada() {
    this.a.ubicacion = null; // Borra la ubicación de a.ubicacion
    await this.storageService.deleteSelectedLocation(); // Elimina la ubicación del almacenamiento
  }
}