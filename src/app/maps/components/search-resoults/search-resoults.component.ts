import { Component} from '@angular/core';
import { GeolocalizationService, MapService } from '../../services';
import { Feature } from '../../interfaces/places.interfaces';

@Component({
  selector: 'app-search-resoults',
  templateUrl: './search-resoults.component.html',
  styleUrls: ['./search-resoults.component.css']
})
export class SearchResoultsComponent {

  public selectedId: string  = '';
  constructor(
    private placeService: GeolocalizationService,
    private mapService: MapService
  ) { }

  get isLoadingPlaces(): boolean {
    return this.placeService.isLoadingPlaces;
  }
  get places(): Feature[] {
    return this.placeService.places;
  }
  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }
  getAddresses(place: Feature) {
    if (!this.placeService.userLocation) throw Error('We cant find user location');

    const start = this.placeService.userLocation;
    const end = place.center as [number, number];

    this.mapService.getInterceptionPoint(start, end);

    this.placeService.cleanPlacesArray();
  }

}
