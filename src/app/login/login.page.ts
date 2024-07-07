
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
      console.log(`LoginPage: checkActiveSession isAuthenticated = ${isAuthenticated}`);
      if (isAuthenticated && this.router.url === '/login') {
        console.log('LoginPage: Usuario autenticado, redirigiendo a /home');
        this.navCtrl.navigateForward('/home');
      }
    } catch (error) {
      console.error('Error al verificar la sesión activa', error);
    }
  }
  

  async login() {
    try {
      console.log('Attempting to log in...');

      // Validar la contraseña antes de intentar iniciar sesión
      if (!this.storageService.isPasswordValid(this.password)) {
        console.error('La contraseña no cumple con los requisitos.');
        await this.storageService.presentToast('La contraseña no cumple con los requisitos.');
        return;
      }

      const isValid = await this.storageService.validateUser(this.username, this.password);
      if (isValid) {
        console.log('User validated. Logging in...');
        const loginSuccess = await this.storageService.login('dummy_token');
        if (loginSuccess) {
          await this.storageService.setCurrentUser(this.username); // Establecer el usuario actual
          console.log('User logged in. Navigating to home...');
          this.router.navigate(['/home']);
        }
      } else {
        console.error('Credenciales inválidas');
        await this.storageService.presentToast('Credenciales inválidas.');
      }
    } catch (error) {
      console.error('Error en el login', error);
    }
  }

  async register() {
    try {
      console.log('Attempting to register...');
      const isRegistered = await this.storageService.registerUser(this.username, this.password);
      if (isRegistered) {
        console.log('User registered. Logging in...');
        await this.storageService.login('dummy_token'); // Guardar un token de autenticación
        await this.storageService.setCurrentUser(this.username); // Establecer el usuario actual
        console.log('User logged in. Navigating to home...');
        this.router.navigate(['/home']);
      }
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
