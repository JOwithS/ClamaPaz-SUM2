
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;
  username: string = "";
  password: string = "";

  constructor(private storageService: StorageService, private navCtrl: NavController, private router: Router) {}

  ngOnInit() {
    this.checkActiveSession();
  }

  ionViewWillEnter() {
    this.resetForm();
  }

  async checkActiveSession() {
    try {
      const isAuthenticated = await this.storageService.isAuthenticated();
      if (isAuthenticated) {
        this.navCtrl.navigateForward('/home');
      }
    } catch (error) {
      console.error('Error al verificar la sesión activa', error);
    }
  }

  async login() {
    try {
      console.log('Attempting to log in...');
      const isValid = await this.storageService.validateUser(this.username, this.password);
      if (isValid) {
        console.log('User validated. Logging in...');
        await this.storageService.login('dummy_token'); // Guardar un token de autenticación
        await this.storageService.setCurrentUser(this.username); // Establecer el usuario actual
        console.log('User logged in. Navigating to home...');
        this.router.navigate(['/home']);
      } else {
        console.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en el login', error);
    }
  }

  async register() {
    try {
      console.log('Attempting to register...');
      await this.storageService.registerUser(this.username, this.password);
      console.log('User registered. Logging in...');
      await this.storageService.login('dummy_token'); // Guardar un token de autenticación
      await this.storageService.setCurrentUser(this.username); // Establecer el usuario actual
      console.log('User logged in. Navigating to home...');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error durante el registro', error);
    }
  }


  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  resetForm() {
    this.username = "";
    this.password = "";
  }

  submitForm() {
    console.log("Formulario enviado");
  }
}
