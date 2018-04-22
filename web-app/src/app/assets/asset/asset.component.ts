import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { AssetService } from '../shared/asset.service';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  providers: [AssetService]
})

export class AssetComponent implements OnInit {


  constructor(private assetService:AssetService, private toastr : ToastrService) { }

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
  	this.assetService.insertAsset(this.assetService.selectedAsset).subscribe(
  		res => {
  			this.resetForm(form);
  			this.toastr.success('New Record Succesfully Added!','Asset Register');
  		},
  		err => {
  			this.toastr.error('There is an error occured!','Asset Register');
  		});
  }

}
