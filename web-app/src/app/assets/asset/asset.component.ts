import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AssetService } from '../shared/asset.service';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../notifications/notification.service';

import * as hash from 'json-hash'; //Hash Json Object

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})

export class AssetComponent implements OnInit {


  constructor(private _auth: AuthService ,private assetService : AssetService, private notify : NotificationService) { }

 
  ngOnInit() {
     
    }

  //Reset   
  resetForm() {
    this.assetService.selectedAsset = {
      id : null,
      name : '',
      type : '',
      description : '',
      remark: '',
      ownerID: null
    }
  }

  //Submit asset form
  onSubmit() {
      var userID = localStorage.getItem('userID');
      this.assetService.selectedAsset.ownerID = parseInt(userID); 
      this.assetService.insertAsset(this.assetService.selectedAsset).subscribe(
      res => {
        console.log(res);
        this.resetForm();
        var contentHash = hash.digest(res); //get hash of object
        this.notify.showNotification('bottom','right','success','<b>Asset Register<b>','Successfully added!');
        this.notify.notificationPush.push('New Asset has been added!');
      },
      err => {
        console.log(err);
        this.notify.showNotification('bottom','right','danger','<b>Asset Register<b>','Error has occured!');
      }); 
    }

}