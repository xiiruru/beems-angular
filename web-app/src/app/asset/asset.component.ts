import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'],
  providers: [AssetService]
})

export class AssetComponent implements OnInit {


  constructor(private assetService:AssetService) { }

  ngOnInit() {
  	}

}
