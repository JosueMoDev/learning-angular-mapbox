import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { GeolocalizationService } from '../../services/geolocalization.service';

@Component({
  selector: 'app-button-location',
  templateUrl: './button-location.component.html',
  styleUrls: ['./button-location.component.css']
})
export class ButtonLocationComponent implements OnInit {

  constructor(
    private myMapService: MapService,
    private geolocation: GeolocalizationService
  ) { }

  ngOnInit(): void {
  }
  goToMyLocation() {
    if (!this.geolocation.isUserLocationReady) throw Error('we dont have any location');
    if (!this.myMapService.isMapReady) throw Error('Map its not ready');

    this.myMapService.flyTo(this.geolocation.userLocation!);
  }

}
