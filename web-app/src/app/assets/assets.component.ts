import { Component, OnInit } from '@angular/core';

import { AssetService } from './shared/asset.service';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers: [AssetService]
})
export class AssetsComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit() {
  }

}
