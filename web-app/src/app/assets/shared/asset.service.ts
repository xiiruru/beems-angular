import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Asset } from './asset';
import { Observable } from 'rxjs/Observable';

//Service
import { AuthService } from '../../auth/auth.service';
//import { CookieService } from 'ngx-cookie-service';

//HTTP header
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const dbUrl = "http://1e51332b.ngrok.io/api/assets/"; //Database API Request URL
const bcUrl = " https://f3ef269d.ngrok.io/api/"; //Blockchain API REquest URL

@Injectable()
export class AssetService {

  assets: Asset[] = [];
  selectedAsset : Asset = new Asset();
  lat : number;
  long : number;
  address : string;

  constructor(private http: HttpClient, private _auth:AuthService) { }

  //HTTP GET request - Retrieve assets information from datasource
  getAssets():Observable<Asset[]> {
    var ownerID = JSON.parse(localStorage.getItem('userID'));
    let url = dbUrl + "?filter[where][ownerID]=" + ownerID;
    return this.http.get<Asset[]>(url, httpOptions);
  }

  //HTTP GET request - Retrieve specific assets info from blockchain
  getBCAsset(id : number){
    return this.http.get(bcUrl + "BEEMSAsset/" + id, httpOptions); 
  } 

  //HTTP POST request - Insert assets information
  insertAsset(asset : Asset) {
    var body = JSON.stringify(asset);
    console.log(body);
    return this.http.post(dbUrl, body, httpOptions); 
  }

  //HTTP POST request - Insert assets information in blockchain
  insertBCAsset(asset) {
    return this.http.post(bcUrl + "BEEMSAsset", asset, httpOptions); 
  }

  //HTTP PUT request - Update asset information
  updateAsset(id : number, asset){

      return this.http.put(dbUrl + id, asset, httpOptions);
  }

  //HTTP PUT request - Update asset information in blockchain
  updateBCAasset(id : number, asset){

     this.getBCAsset(id).subscribe(res=>{
      //Get GPS location from previous info
      asset.currentGPSLocation = res['currentGPSLocation'];
      this.http.put(bcUrl + "BEEMSAsset/" + id, asset, httpOptions).subscribe(res=>{
        console.log(res);
      },err=>{
        console.log(err);
      });

    },
    err=>{
      console.log(err);
    });
    
  }

  //HTTP DELETE request - Delete asset information
  deleteAsset(id : number) {
    return this.http.delete(dbUrl +  id);
  }

  //HTTP GET request - Retrieve assets field for date_created 
  getAssetDate(){
    var ownerID = JSON.parse(localStorage.getItem('userID'));
    let url = dbUrl + "?filter[fields][date_created]=true&filter[where][ownerID]=" + ownerID;
    return this.http.get<any>(url, httpOptions);
  }

   //HTTP GET request - Retrieve assets field for content_hash
  getAssetHash(){
    var ownerID = JSON.parse(localStorage.getItem('userID'));
    let url = dbUrl + "?filter[where][ownerID]=" + ownerID;
    return this.http.get<any>(url, httpOptions);
  }

   //HTTP GET request - Retrieve assets field for content_hash from blockchain
  getAssetBCHash(id : number){
    let url = bcUrl + "BEEMSAsset/?filter[fields][assetContentHash]=true&filter[where][id]=" + id;
    return this.http.get<any>(url, httpOptions);
  }

  //HTTP GET request - Retrieve assets instances count
  getAssetCount() {
      let url = dbUrl + "count";
      return this.http.get(url, httpOptions);
  }

  //HTTP GET request - Get transaction record
  getTxHistory() {
    let url = bcUrl + "system/historian";
    return this.http.get(url, httpOptions);
  }

  //HTTP GET request - Get asset location
  getLocation() {
    let url = bcUrl + "BEEMSAsset";
    return this.http.get(url);
  }
}