import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { AssetService } from '../assets/shared/asset.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  txRec : any[] = [];

  settings = {
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      transactionId: {
        title: 'ID',
        filter: false,
        editable: false
      },
      transactionType: {
        title: 'Type',
        filter: false
      },
      transactionInvoked: {
        title: 'Invoked',
        filter: false
      },
      participantInvoking: {
      	title: 'Participant',
        filter: false
      },
      identityUsed: {
      	title: 'Identity',
      	filter: false
      },
      transactionTimestamp: {
      	title: 'Timestamp',
      	filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };

  source: LocalDataSource; // add a property to the component

  constructor(private assetService : AssetService) { }

  ngOnInit() {
  	this.assetService.getTxHistory().subscribe(
  		res => { 
  		console.log(res) 

      	var length = Object.keys(res).length; //length of object

      	for(var i =0; i < length; i++){
      		this.txRec[i] = res[i];    
      	}

      	 this.source = new LocalDataSource(this.txRec);
  		},
  		err => console.log(err));
  }

   //Search bar
  onSearch(query: string = '') {

    if (query === '') {
            this.source.setFilter([]);
        }
    else {
      this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'ID',
        search: query
      },
      {
        field: 'Type',
        search: query
      },
      {
        field: 'transactionInvoked',
        search: query
      },
      {
        field: 'participantInvoking',
        search: query
      },
      {
        field: 'identityUsed',
        search: query
      },
      {
        field: 'transactionTimestamp',
        search: query
      }  
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
    }
  }


}
