import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { AssetService } from '../shared/asset.service';

declare const google: any;

interface assetInfo {
  id: number,
  assetName : string,
  address : string
}

interface assetLocation {
    latitude : number,
    longitude : number
  }

@Component({
  selector: 'app-asset-location',
  templateUrl: './asset-location.component.html',
  styleUrls: ['./asset-location.component.scss']
})

export class AssetLocationComponent implements OnInit {
   settings = {
     pager: {
      display: true,
      perPage: 5
    },
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false
      },
      assetName: {
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
    this.createData();
  }

  assetInfo : assetInfo[] = [];

  //Create data for table
  createData() {
    this.assetService.getLocation().subscribe(
      res => {
        console.log(res);
        var assetLocation : assetLocation = {
           latitude : 3.0315555,
           longitude : 101.4288433
        };

        var length = Object.keys(res).length; //length of object

        for(var i = 0; i < length; i++){

          if(res[i]['currentGPSLocation'])
            assetLocation = JSON.parse(res[i]['currentGPSLocation']);

          this.getGeoLocation(assetLocation.latitude, assetLocation.longitude) //Assign address based on lat, lng
          this.assetInfo[i] = {
            id: res[i]['id'],
            assetName : res[i]['assetName'],
            address : ""
          }
          
        }

        //this.source = new LocalDataSource(this.assetInfo);
      },
      err => {
        console.log(err);
      });
  }

  getGeoLocation(lat : number, long : number) {
  	let latlng = new google.maps.LatLng(lat, long);
  	let request = {
  	latLng: latlng
  	};

   this.codeLatLng(request, function(addr){
      console.log(addr);
    });

  }

  codeLatLng(request, callback){
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          callback(results[0].formatted_address);  //get address
        } else {
          callback("No address available");
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
