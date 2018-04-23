import { Component, OnInit } from '@angular/core';

import { Asset } from '../shared/asset';
import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})

export class AssetDetailComponent implements OnInit {

  constructor(private assetService : AssetService, private toastr : ToastrService) { }

  ngOnInit() {
  	//do request and get asset's record
  	this.assetService.getAssets().subscribe(res =>{
  		this.assetService.assets = res;
  		console.log(res);
  	}, err => {
  		console.log(err);
  	})
  }

  //Show edit
  showForEdit(asset: Asset) {
    this.assetService.selectedAsset = Object.assign({},asset);
    console.log(this.assetService.selectedAsset);
  }

  //On delete
  onDelete(id : number) {
    if (confirm('Are you sure to delete this record ?') == true) {
    this.assetService.deleteAsset(id).subscribe(res => {
      this.toastr.success('Record Succesfully deleted!','Asset Register');
      console.log(res);

      //Retrieving new data from datasource
      this.assetService.getAssets().subscribe(res=> { 
        this.assetService.assets = res;
        console.log(res);        
      },
        err=> {
          console.log(err);
        });

    }, err => {
      this.toastr.error('There is an error occured!','Asset Register');
      console.log(err);
    });
  }
 };

}
