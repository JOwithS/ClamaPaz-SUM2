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

  // Método para inicializar el almacenamiento
  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadToken();
  }

  // Método para cargar el token desde el almacenamiento
  private async loadToken() {
    this.authToken = await this._storage?.get('auth_token') || null;
  }

  // Método para verificar si el usuario tiene acceso (autenticado)
  async haveaccess(): Promise<boolean> {
    await this.loadToken();
    return this.authToken !== null;
  }

  // Método para iniciar sesión y almacenar el token
  async login(token: string) {
    await this._storage?.set('auth_token', token);
    this.authToken = token;
  }

  // Método para cerrar sesión y limpiar el token
  async logout() {
    await this._storage?.remove('auth_token');
    this.authToken = null; 
  }

  // Si el token está almacenado en la variable local, el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    if (this.authToken) {
      return true;  
    }
    // Almacenar temporalmente el token en la variable local dentro del storage
    const token = await this._storage?.get('auth_token');
    const isLoggedIn = !!token;
    if (isLoggedIn) {
      this.authToken = token;  
    }
    console.log(`Usuario autenticado: ${isLoggedIn}`);
    return isLoggedIn;
  }

  // Función para guardar la fecha seleccionada en Ionic Storage
  async saveSelectedDate(selectedDate: Date) {
    const formattedDate = selectedDate.toISOString(); 
    await this._storage?.set('selectedDate', formattedDate);
  }

  // Obtener la fecha seleccionada
  async getSelectedDate(): Promise<string | null> {
    return await this._storage?.get('selectedDate');
  }

  // Función para eliminar la fecha seleccionada
  async deleteSelectedDate() {
    await this._storage?.remove('selectedDate');
  }

  // Funciones para manejo de usuario en sesión
  async setCurrentUser(username: string) {
    await this._storage?.set('currentUser', username);
  }

  async getCurrentUser(): Promise<string | null> {
    return await this._storage?.get('currentUser');
  }

  async clearCurrentUser() {
    await this._storage?.remove('currentUser');
  }

  // Método para registrar el usuario y almacenar las credenciales
  async registerUser(username: string, password: string) {
    await this._storage?.set('username', username);
    await this._storage?.set('password', password);
  }

  // Método para validar las credenciales del usuario
  async validateUser(username: string, password: string): Promise<boolean> {
    const storedUsername = await this._storage?.get('username');
    const storedPassword = await this._storage?.get('password');
    return storedUsername === username && storedPassword === password;
  }




  // Método para guardar la ubicación seleccionada
  async saveSelectedLocation(location: string) {
    await this._storage?.set('selectedLocation', location);
  }

  // Método para obtener la ubicación seleccionada
  async getSelectedLocation(): Promise<string | null> {
    return await this._storage?.get('selectedLocation');
  }

  // Método para eliminar la ubicación seleccionada
  async deleteSelectedLocation() {
    await this._storage?.remove('selectedLocation');
  }

  
  private async presentToast(message: string){
    const toast = await this.toastController.create({
      message : message,
      duration: 2000
    

    });
    toast.present();
  }
}

