import { Injectable } from '@angular/core';
import { PlaceApiClient } from '../api';

import { PlacesResponse, Feature } from '../interfaces/places.interfaces';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApiHttp: PlaceApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
   }

  public  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('we could not get geolocation');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlaceByQuery(query: string) {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) throw Error('We couldnt find the user location');
    this.isLoadingPlaces = true;
    this.placesApiHttp.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity:this.userLocation.join(','),
      }

      })
      .subscribe(
        resp => {
          this.isLoadingPlaces = false;
          this.places = resp.features
          this.mapService.createNewMarkerFromPlace(this.places, this.userLocation!);
        }
      );
  }

  cleanPlacesArray() {
    this.places = [];
  }

}
