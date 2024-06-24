import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = "";
  username?: string;

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
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
        await this.storageService.logout(); // Llamada al método logout del servicio
      }
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
