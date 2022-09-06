import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { GeolocalizationService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  constructor(
    private geolocationService : GeolocalizationService,
  ) { }

  ngOnInit(): void {
  }
  get isUserLocationReady(): boolean{
    return this.geolocationService.isUserLocationReady;
  }
}
