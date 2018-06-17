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

const dbUrl = "http://localhost:3000/api/assets/"; //Database API Request URL
const bcUrl = "http://53b85304.ngrok.io/api/"; //Blockchain API REquest URL

@Injectable()
export class AssetService {

  assets: Asset[] = [];
  selectedAsset : Asset = new Asset();

  constructor(private http: HttpClient, private _auth:AuthService) { }

  //HTTP GET request - Retrieve assets information from datasource
  getAssets():Observable<Asset[]> {
    var ownerID = JSON.parse(localStorage.getItem('userID'));
    let url = dbUrl + "?filter[where][ownerID]=" + ownerID;
    return this.http.get<Asset[]>(url, httpOptions);
  }

  //HTTP POST request - Insert assets information
  insertAsset(asset : Asset) {
    var body = JSON.stringify(asset);
    console.log(body);
    return this.http.post(dbUrl, body, httpOptions); //return observable 
  }

  //HTTP POST request - Insert assets information in blockchain
  insertBCAsset(asset) {
    return this.http.post(bcUrl + "BEEMSAsset", asset, httpOptions); //return observable 
  }

  //HTTP PUT request - Update asset information
  updateAsset(id : number, asset){
    return this.http.put(dbUrl + id, asset, httpOptions);
  }

  //HTTP PUT request - Update asset information in blockchain
  updateBCAasset(){

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
    let url = dbUrl + "?filter[fields][id]=true&filter[fields][content_hash]=true&filter[where][ownerID]=" + ownerID;
    return this.http.get<any>(url, httpOptions);
  }

   //HTTP GET request - Retrieve assets field for content_hash from blockchain
  getAssetBCHash(id : number){
    let url = bcUrl + "BEEMSAsset/?filter[fields][assetContentHash]=true&filter[where][id]=" + id;
    return this.http.get<any>(url, httpOptions);
  }

  //HTTP GET request - Retrieve assets instances count
  getAssetCount() {
      let url = "http://localhost:3000/api/assets/count";
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