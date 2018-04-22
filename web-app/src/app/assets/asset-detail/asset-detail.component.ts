import { Component, OnInit } from '@angular/core';
import { Asset } from '../shared/asset';
import { AssetService } from '../shared/asset.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
  providers: [AssetService]
})

export class AssetDetailComponent implements OnInit {

  assets:Asset[] = [];

  constructor(private assetService : AssetService) { }

  ngOnInit() {
  	//do request and get asset's record
  	this.assetService.getAssets().subscribe(res =>{

  		this.assets = res;
  		console.log(res);

  	}, err => {

  		console.log(err);
  	})
  }

  showForEdit(asset: Asset) {
    this.assetService.selectedAsset = Object.assign({},asset);
    console.log(this.assetService.selectedAsset);
  }
}
