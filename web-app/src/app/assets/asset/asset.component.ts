import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AssetService } from '../shared/asset.service';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../notifications/notification.service';

import * as hash from 'json-hash'; //Hash Json Object
import * as parse from 'postgres-date';

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
      ownerID: null,
      content_hash : '',
      date_created: null
    }
  }

 pgFormatDate(date) {
  /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
   function zeroPad(d) {
      return ("0" + d).slice(-2);
    }

  var parsed = new Date(date)

  return [[parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('-'), [zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(':')].join(" ");
}

  //Submit asset form
  onSubmit() {

      var userID = localStorage.getItem('userID');
      this.assetService.selectedAsset.ownerID = parseInt(userID);

      var d = new Date(); //Get date created
      this.assetService.selectedAsset.date_created = this.pgFormatDate(d);

      this.assetService.insertAsset(this.assetService.selectedAsset).subscribe(
      res => {
        console.log(res);

        //add content hash to db
        var contentHash = hash.digest(res); //get hash of object
        console.log(contentHash);
        this.assetService.selectedAsset.content_hash = contentHash;
        this.assetService.updateAsset(res['id'], this.assetService.selectedAsset).subscribe(
        res => {
          console.log(res);
           //Notification & Reset form
          this.notify.showNotification('bottom','right','success','<b>Asset Register<b>','Successfully added!');
          this.notify.notificationPush.push('New Asset has been added!');
          this.resetForm();
        }, err => {
          console.log(err);
        }); 
      },
      err => {
        console.log(err);
        this.notify.showNotification('bottom','right','danger','<b>Asset Register<b>','Error has occured!');
      }); 
    }

}