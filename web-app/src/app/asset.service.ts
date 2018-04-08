import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Asset } from './asset';
import { Observable } from 'rxjs/Observable';

//HTTP header
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AssetService {

  constructor(private http: HttpClient) { }

  //HTTP GET request - Retrieve assets information from datasource
  getAssets():Observable<Asset[]> {
  	let url = "http://localhost:3000/api/assets";

  	return this.http.get<Asset[]>(url, httpOptions);
  }

}
