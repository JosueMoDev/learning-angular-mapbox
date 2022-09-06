import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNjcmlwdHN2IiwiYSI6ImNsN2FsdWE2eTAwZDYzdnI1YmZ6M254MHYifQ.pL6-qhgtF_7r9fJ5Bqd14w';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
