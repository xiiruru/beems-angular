import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Asset } from './asset';
import { Observable } from 'rxjs/Observable';

//HTTP header
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:3000/api/assets/";

@Injectable()
export class AssetService {

  assets: Asset[] = [];
  selectedAsset : Asset = new Asset();

  constructor(private http: HttpClient) { }

  //HTTP GET request - Retrieve assets information from datasource
  getAssets():Observable<Asset[]> {
  	return this.http.get<Asset[]>(url, httpOptions);
  }

  //HTTP POST request - Insert assets information
  insertAsset(asset : Asset) {
  	var body = JSON.stringify(asset);
  	console.log(body);

  	return this.http.post(url, body, httpOptions); //return observable 
  }

  //HTTP PUT request - Update asset information
  updateAsset(id : number, asset : Asset){
    var body = JSON.stringify(asset);
    console.log(body);

    return this.http.put(url + id, body, httpOptions);
  }

  //HTTP DELETE request - Delete asset information
  deleteAsset(id : number) {
       return this.http.delete(url +  id);
  }

}
