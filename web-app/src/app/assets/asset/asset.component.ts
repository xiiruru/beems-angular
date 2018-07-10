import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AssetService } from '../shared/asset.service';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../notifications/notification.service';

import * as crypto from 'crypto-js'; //CryptoJS lib 

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
        var tmpObj = {
           id : res['id'],
           name : this.assetService.selectedAsset.name,
           type :this.assetService.selectedAsset.type,
           description : this.assetService.selectedAsset.description,
           remark : this.assetService.selectedAsset.remark,
           ownerID : res['ownerID'],
           content_hash : '',
           date_created : this.assetService.selectedAsset.date_created
        }
        var contentHash = crypto.SHA1(JSON.stringify(tmpObj)).toString(); //get hash of object
        console.log(contentHash);
        console.log(JSON.stringify(tmpObj));
        this.assetService.selectedAsset.content_hash = contentHash;

        //Blockchain Object
         var obj = {
             id: res['id'],
             assetName : this.assetService.selectedAsset.name,
             assetContentHash : contentHash,
             currentGPSLocation : ""
           }

        this.assetService.updateAsset(res['id'], this.assetService.selectedAsset).subscribe(
        res => {
          console.log(res);
           //Notification & Reset form

          //add info into blockchain
          this.assetService.insertBCAsset(obj).subscribe(
            res => console.log(res) , err => console.log(err)
            );

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