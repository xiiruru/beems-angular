import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AssetService } from '../shared/asset.service';
import { AuthService } from '../../auth/auth.service';

import * as hash from 'json-hash'; //Hash Json Object

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})

export class AssetComponent implements OnInit {


  constructor(private _auth: AuthService ,private assetService : AssetService) { }

 
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
        //this.toastr.success('New Record Succesfully Added!','Asset Register');
      },
      err => {
        console.log(err);
        //this.toastr.error('There is an error occured!','Asset Register');
      }); 
    }

}