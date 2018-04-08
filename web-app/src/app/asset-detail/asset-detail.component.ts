import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css'],
  providers: [AssetService]
})

export class AssetDetailComponent implements OnInit {

  assets:Asset[] = [];

  constructor(private assetService:AssetService) { }

  ngOnInit() {


  	//do request and get asset's record
  	this.assetService.getAssets().subscribe(res =>{

  		this.assets = res;
  		console.log(res);

  	}, err => {

  		console.log(err);
  	})
  }
}
