import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AssetLocation } from '../org.bit.beems';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AssetLocationService {

	
		private NAMESPACE: string = 'AssetLocation';
	



    constructor(private dataService: DataService<AssetLocation>) {
    };

    public getAll(): Observable<AssetLocation[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<AssetLocation> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<AssetLocation> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<AssetLocation> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<AssetLocation> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
