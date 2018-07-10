import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AgmInfoWindow, MapsAPILoader} from '@agm/core';

import { AssetService } from '../shared/asset.service';

var latlngBounds: any;

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss']
})
export class AssetMapComponent implements OnInit {

  constructor(private assetService: AssetService, private _location: Location, private mapsAPILoader: MapsAPILoader) { 
  	this.mapsAPILoader.load().then(() => {
                latlngBounds = new window['google'].maps.LatLngBounds();
				latlngBounds.extend(new window['google'].maps.LatLng(this.assetService.lat, this.assetService.long));  
            }
        )
  }

  ngOnInit() {
  }

  goBack() {
  	 this._location.back();
  }
}
