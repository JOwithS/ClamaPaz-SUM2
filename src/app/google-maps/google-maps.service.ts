import { Injectable, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  apiKey = ''; 
  mapsLoaded = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  init(renderer: Renderer2, document: Document): Promise<any> {
    return new Promise((resolve) => {
      if (this.mapsLoaded) {
        console.log('google is previously loaded');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      (window as any).mapInit = () => {
        this.mapsLoaded = true;

        if (google) {
          console.log('google ya cargo');
        } else {
          console.log('google no esta definido');
        }
        resolve(true);
        return;
      };

      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      renderer.appendChild(document.body, script);
    });
  }
}
