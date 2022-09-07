import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup, LngLatBounds, AnySourceData } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interfaces';
import { AddressLocationApiClient } from '../api/AddressLocationApiClient';
import { AddressLocationResponse, Route } from '../interfaces/address.interfaces';
import { last } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map?: Map;
  private _markers: Marker[] = [];

  public get isMapReady():boolean {
    return !!this._map;
  }
  constructor(
    private addressesServices : AddressLocationApiClient
  ) { }

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
  createNewMarkerFromPlace(places: Feature[], userLocation: [number, number]) {
    if (!this._map) throw Error('Map is not init');
    this._markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(
          `
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
          `
      );

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this._map);

      newMarkers.push(newMarker);
    }
    this._markers = newMarkers;
    if (places.length === 0) return;
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat())),
      bounds.extend(userLocation);

    this._map.fitBounds(bounds, {
      padding: 200
    });

  }

  getInterceptionPoint( start : [number, number], end: [number, number]) {
    this.addressesServices.get<AddressLocationResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawRouteString(resp.routes[0]));
  }

  private drawRouteString(routeWay: Route) {
    console.log({ kms: routeWay.distance / 100, time: routeWay.duration / 60 });

    if (!this._map) throw Error('Map its not init ');

    const coords = routeWay.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this._map.fitBounds(bounds, {
      padding: 200
    })

    // Polyline || LineString
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates:coords

            }
          }
        ]
      }
    }
    // Clean previus route

    if (this._map.getLayer('RouteString')) {
      this._map.removeLayer('RouteString');
      this._map.removeSource('RouteString');
    }

    this._map.addSource('RouteString', sourceData);
    this._map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join':'round'
      },
      paint: {
        'line-color': '#064e3b',
        'line-width':3
      }
    });
  }

}
