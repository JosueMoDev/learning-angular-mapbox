import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { GeolocalizationService } from '../../services';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('myMap') myMapElement!: ElementRef
  constructor(
    private geolocationService: GeolocalizationService,
    private myMapService: MapService
  ) { }
  ngAfterViewInit(): void {
    if (!this.geolocationService.userLocation) throw Error('We couldnt find a location avible');
    const map = new mapboxgl.Map({
      container: this.myMapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.geolocationService.userLocation,
      zoom: 14,
    });

    const popup = new Popup()
      .setHTML(`

      <h6>I'm here</h6>
      `);
    new Marker({ color: '#fd7e14' })
      .setLngLat(this.geolocationService.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.myMapService.setMap(map);



  }

}
