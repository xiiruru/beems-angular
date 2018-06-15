import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { AssetService } from '../shared/asset.service';

declare const google: any;

@Component({
  selector: 'app-asset-location',
  templateUrl: './asset-location.component.html',
  styleUrls: ['./asset-location.component.scss']
})

export class AssetLocationComponent implements OnInit {
   settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      address: {
        title: 'Address',
        filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };

  source: LocalDataSource; // add a property to the component

  constructor(private assetService : AssetService) { 
  }

  ngOnInit() {
  	this.getGeoLocation();
  }

  lat: number = 39.742043;
  lng: number = -104.991531;
  address : string;

  getGeoLocation() {
  	
	let geocoder = new google.maps.Geocoder();
	let latlng = new google.maps.LatLng(this.lat, this.lng);
	let request = {
	latLng: latlng
	};

	geocoder.geocode(request, (results, status) => {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0] != null) {
				this.address = results[0].formatted_address;  //get address
				console.log(this.address);  
			} else {
				alert("No address available");
			}
		}
	});
  }

 //Search bar
  onSearch(query: string = '') {

    if (query === '') {
            this.source.setFilter([]);
        }
    else {
      this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'address',
        search: query
      } 
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
    }
  }
}
