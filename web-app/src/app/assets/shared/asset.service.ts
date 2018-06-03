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
//const bcUrl = "http://localhost:7777/api/BEEMSAsset/"; //Blockchain API REquest URL
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

  //HTTP PUT request - Update asset information
  updateAsset(id : number, asset){
    return this.http.put(dbUrl + id, asset, httpOptions);
  }

  //HTTP DELETE request - Delete asset information
  deleteAsset(id : number) {
       return this.http.delete(dbUrl +  id);
  }

}