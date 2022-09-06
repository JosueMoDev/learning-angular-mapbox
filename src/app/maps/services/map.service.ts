import { Injectable } from '@angular/core';
import { LngLat, LngLatLike, Map } from 'mapbox-gl';
Map
@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map?: Map;

  public get isMapReady():boolean {
    return !!this._map;
  }

  setMap(map :Map) {
    this._map = map;
  }
  flyTo( coords : LngLatLike) {
    if (!this.isMapReady) throw Error(' this map it is not ready');

    this._map?.flyTo({
      zoom: 14,
      center:coords
    });

  }


  constructor() { }
}
