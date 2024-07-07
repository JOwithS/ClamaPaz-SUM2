import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private authToken: string | null = null; 
  
  constructor(private storage: Storage, private toastController: ToastController) {
    this.initStorage();
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadToken();
  }

  private async loadToken() {
    if (!this.authToken) {  // Cargar el token solo si no está ya cargado
      this.authToken = await this._storage?.get('auth_token') || null;
    }
  }

  async haveaccess(): Promise<boolean> {
    await this.loadToken();
    return this.authToken !== null;
  }

  // Método para iniciar sesión y almacenar el token
  async login(token: string): Promise<boolean> {
    // Validar la contraseña almacenada
    const storedPassword = await this._storage?.get('password');
    if (storedPassword && !this.isPasswordValid(storedPassword)) {
      await this.presentToast('La contraseña debe tener un máximo de 8 dígitos, debe tener al menos alguna mayúscula/minúscula/números/@$&');
      return false;
    }
    await this._storage?.set('auth_token', token); // Guardar el token de autenticación
    this.authToken = token;
    return true;
  }

  async logout() {
    await this._storage?.remove('auth_token');
    this.authToken = null; 
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.authToken) {
      return true;  
    }
    const token = await this._storage?.get('auth_token');
    const isLoggedIn = !!token;
    if (isLoggedIn) {
      this.authToken = token;  
    }
    console.log(`Usuario autenticado: ${isLoggedIn}`);
    return isLoggedIn;
  }

  async saveSelectedDate(selectedDate: Date) {
    const formattedDate = selectedDate.toISOString(); 
    await this._storage?.set('selectedDate', formattedDate);
  }

  async getSelectedDate(): Promise<string | null> {
    return await this._storage?.get('selectedDate');
  }

  async deleteSelectedDate() {
    await this._storage?.remove('selectedDate');
  }

  async setCurrentUser(username: string) {
    await this._storage?.set('currentUser', username);
  }

  async getCurrentUser(): Promise<string | null> {
    return await this._storage?.get('currentUser');
  }

  async clearCurrentUser() {
    await this._storage?.remove('currentUser');
  }

  async registerUser(username: string, password: string): Promise<boolean> {
    if (!this.isPasswordValid(password)) {
      await this.presentToast('La contraseña debe tener un máximo de 8 dígitos, debe tener al menos alguna mayúscula/minúscula/números/@$&');
      return false;
    }
    await this._storage?.set('username', username);
    await this._storage?.set('password', password);
    return true;
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const storedUsername = await this._storage?.get('username');
    const storedPassword = await this._storage?.get('password');
    return storedUsername === username && storedPassword === password;
  }

  async saveSelectedLocation(location: string) {
    await this._storage?.set('selectedLocation', location);
  }

  async getSelectedLocation(): Promise<string | null> {
    return await this._storage?.get('selectedLocation');
  }

  async deleteSelectedLocation() {
    await this._storage?.remove('selectedLocation');
  }

  public async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public isPasswordValid(password: string): boolean {
    const maxLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length <= maxLength;

    return isValidLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  }

  // Método para verificar si la contraseña almacenada es válida
public async isStoredPasswordValid(): Promise<boolean> {
  const storedPassword = await this._storage?.get('password');
  return storedPassword ? this.isPasswordValid(storedPassword) : false;
}
}
