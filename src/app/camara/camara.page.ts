import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  public photo: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  async takePicture() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }
}
