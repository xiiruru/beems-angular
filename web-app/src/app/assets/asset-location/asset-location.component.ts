import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
     hideSubHeader: true,
     pager: {
      display: true,
      perPage: 5
    },
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      assetName: {
        title: 'Name',
        filter: false
      },
      address: {
        title: 'Address (Latitude & Longitude)',
        filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom : [{ name: 'geocode', title:'Geocode '}, { name: 'map', title:'View Map'}]
    }
  };

  source: LocalDataSource; // add a property to the component

  constructor(private assetService : AssetService, private router: Router) { 
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
           latitude : null,
           longitude : null
        };

        var length = Object.keys(res).length; //length of object

        for(var i = 0; i < length; i++){

          if(res[i]['currentGPSLocation'])
            assetLocation = JSON.parse(res[i]['currentGPSLocation']);
          else{
            assetLocation.latitude = null;
            assetLocation.longitude = null;
          }

          this.assetInfo[i] = {
            id: res[i]['id'],
            assetName : res[i]['assetName'],
            address : `${assetLocation.latitude} , ${assetLocation.longitude}`
          }
           this.assetService.lat = assetLocation.latitude;
           this.assetService.long = assetLocation.longitude;
        }

        this.source = new LocalDataSource(this.assetInfo);
      },
      err => {
        console.log(err);
      });
  }

  //Determine which custom action is call
  onCustom(event){
    console.log(event.action);
    if(event.action == 'geocode') {
      this.geocodeAddr(event);
    }
    else if(event.action == 'map') {
     this.showMap(event);
    }
  }

  //Show asset's location in google map API
  showMap(event) {
    this.assetService.address = event.data.address;
    if (/\./.test(this.assetService.address)) {
     let x = this.assetService.address.split(' , ');
     console.log(x[0]);
     console.log(x[1]);
     this.assetService.lat = +x[0];
     this.assetService.long = +x[1];
    }
    else if(/null/.test(this.assetService.address)) {
      alert("There's no address yet in this asset");
      return;
    }
    else {
      this.geoCoding(event, this.assetService.address); //retrieve lng,long
    }

    this.router.navigate(['/asset-map']); 
  }

  //Geocode the address of the location
  geocodeAddr(event){
    this.assetService.address = event.data.address;
    //console.log(event.data.address);
    if (/\./.test(this.assetService.address)) {
     //console.log(address);
     let x = this.assetService.address.split(' , ');
     console.log(x[0]);
     console.log(x[1]);
     this.assetService.lat = +x[0];
     this.assetService.long = +x[1];
     this.reverseGeoCoding(event,+x[0],+x[1]);
    }
    else if(/null/.test(this.assetService.address)) {
      alert("There's no address yet in this asset");
    }
    else {
      this.geoCoding(event, this.assetService.address); 
    }
  }

  //GOOGLE API - Geocoding (Address to Longitude & Latitude)
  geoCoding(event, address : string) {
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat().toFixed(7);
        var longitude = results[0].geometry.location.lng().toFixed(7);
        this.assetService.lat = latitude;
        this.assetService.long = longitude;

        //Only if geocode action, update data
        if(event.action == 'geocode') {
          event.data.address = `${latitude} , ${longitude}`;
          event.source.update(event.data, event.data);
        }
  
        } 
    }); 
  }  


  //GOOGLE API - Reverse Geocoding (Longitude & Latitude to Address)
  reverseGeoCoding(event, lat : number, long : number) {
  	let latlng = new google.maps.LatLng(lat, long);
  	let request = {
  	latLng: latlng
  	};

   this.codeLatLng(request, function(addr){
      console.log(addr);
      event.data.address = addr;
      event.source.update(event.data, event.data);
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
        field: 'assetName',
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
