import { Component, OnInit } from '@angular/core';
import { GeolocalizationService } from '../../services/geolocalization.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private getPlaceService: GeolocalizationService
  ) { }
  private debounceTimer?: NodeJS.Timeout;
  ngOnInit(): void {
  }
  onQueryChanged(query: string) {

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(
      () => {
        this.getPlaceService.getPlaceByQuery(query);
      }, 500
    );

  }

}
