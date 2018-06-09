import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { Asset } from '../shared/asset';
import { AssetService } from '../shared/asset.service';
import { NotificationService } from '../../notifications/notification.service';

import * as hash from 'json-hash'; //Hash Json Object

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})

export class AssetDetailComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      type: {
        title: 'Type',
        filter: false
      },
      description: {
        title: 'Description',
        filter: false
      },
      remark: {
        title: 'Remarks',
        filter: false
      }
    },
    edit : {
      confirmSave: true
    },
    delete : {
      confirmDelete: true
    }
  };

  source: LocalDataSource; // add a property to the component

  constructor(private assetService : AssetService, private notify : NotificationService) { 
  }

  ngOnInit() {
   this.loadData();
  }

  //Load data 
  loadData() {
    this.assetService.getAssets().subscribe(res =>{
      this.assetService.assets = res;
      this.source = new LocalDataSource(this.assetService.assets);
      console.log(res);
    }, err => {
      console.log(err);
    })
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
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
    }
}

  //Update record
  updateRecord(event) {
    var userID = localStorage.getItem('userID');
    var data = {
      id : event.newData.id,
      name : event.newData.name,
      type : event.newData.type,
      description : event.newData.description,
      remark : event.newData.remark,
      ownerID : userID
    }

    this.assetService.updateAsset(event.newData.id, data).subscribe(
      res => {
        console.log(res);
        event.confirm.resolve(event.newData);
        this.notify.showNotification('bottom','right','info','<b>Asset Update<b>','Successfully update asset!');
        this.notify.notificationPush.push('Asset ID: ' + event.data.id + ' has been updated!');
      },
      err => {
        console.log(err);
        this.notify.showNotification('bottom','right','danger','<b>Asset Register<b>','Error has occured!');
      });
  }

  //Delete record
  deleteRecord(event) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.assetService.deleteAsset(event.data.id).subscribe (
        res => {
          console.log(res);
          this.loadData();
          event.confirm.resolve(event.source.data);
          this.notify.showNotification('bottom','right','danger','<b>Asset Delete<b>','Successfully delete asset!');
          this.notify.notificationPush.push('Asset ID: ' + event.data.id + ' has been deleted!');
        },
        err => {
          console.log(err);
          this.notify.showNotification('bottom','right','danger','<b>Asset Register<b>','Error has occured!');
        });
    }
  }

}