import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import * as hash from 'json-hash'; //Hash Json Object

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})

export class AssetComponent implements OnInit {


  constructor(private assetService : AssetService, private toastr : ToastrService) { }


  ngOnInit() {
  	 this.resetForm();
  	}

  resetForm(form? : NgForm) {
  	
  	if(form != null) 
  		form.reset(); //reset form

  	//Empty the object value
  	this.assetService.selectedAsset = {
  		id : null,
  		name : '',
  		type : '',
  		description : '',
  		remark: ''
  	}
  }

  onSubmit(form : NgForm) {
    if(form.value.id == null) {
      this.assetService.insertAsset(this.assetService.selectedAsset).subscribe(
      res => {
        this.resetForm(form);
        this.assetService.getAssets().subscribe(res =>{

          this.assetService.assets = res;
          console.log(res);
           //Hash asset
            //Send to blockchain
          }, err => {

          console.log(err);
        });

        this.toastr.success('New Record Succesfully Added!','Asset Register');
      },
      err => {
        this.toastr.error('There is an error occured!','Asset Register');
      });
    }
    else {
      this.assetService.updateAsset(this.assetService.selectedAsset.id, this.assetService.selectedAsset).subscribe(
      res => {
        this.resetForm(form);
        this.assetService.getAssets().subscribe(res =>{
          this.assetService.assets = res;
          console.log(res);
          }, err => {
          console.log(err);
        });
        this.toastr.info('Record Succesfully Updated!','Asset Register');
      },
      err => {
        this.toastr.error('There is an error occured!','Asset Register');
      });
    }
  }

}
