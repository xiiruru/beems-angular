import { Component, OnInit } from '@angular/core';

import { AssetService } from '../assets/shared/asset.service';
import * as Chartist from 'chartist';
import * as crypto from 'crypto-js'; //CryptoJS lib 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {

  constructor(private assetService : AssetService) { }

  totalAsset : number = 0;
  safeAsset : number = 0;
  suspAsset : number = 0;
  monthCount : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };


  ngOnInit() {
      this.loadGraph();
      this.getTotalAssetCount();
      this.checkAsset();
    }

    //Load data & draw the graph
    loadGraph() {
      this.assetService.getAssetDate().subscribe(res =>{
    
      var length = Object.keys(res).length; //length of object

      for(var i =0; i < length; i++){

        var d = new Date(res[i]['date_created']); //Get Date type to get month
        this.monthCount[d.getMonth()] += 1; //Add 1 count to the month

        //console.log(this.monthCount);
        this.drawChart(); //Input data into graph
      }
      
      }, err => {
        console.log(err);
      })
    }

    drawChart() {
      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
      const MonthlyUpload: any = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
              this.monthCount
          ]
      };

     const optionsMonthlyUpload: any = {
          seriesBarDistance: 10,
          low: 0,
          high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var monthlyUpload = new Chartist.Bar('#monthlyUpload', MonthlyUpload, optionsMonthlyUpload);

      // start animation for the Completed Tasks Chart - bar Chart
      //this.startAnimationForBarChart(MonthlyUpload);
    }

    //Get total count of the asset from the user
    getTotalAssetCount() {
      this.assetService.getAssetCount().subscribe(res =>{
        console.log(res);
        this.totalAsset = res['count'];   
      }, err => {
        console.log(err);
      })
    }

    pgFormatDate(date) {
    /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
     function zeroPad(d) {
        return ("0" + d).slice(-2);
      }

    var parsed = new Date(date)

    return [[parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('-'), [zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(':')].join(" ");
    }

    //Check whether the asset is safe or suspicious
    checkAsset() {
      this.assetService.getAssetHash().subscribe(res =>{
    
          var length = Object.keys(res).length; //length of object

          for(var i =0; i < length; i++){

          //let dbHash = res[i]['content_hash'];         
          var obj = res[i];
          var id = res[i]['id'];

          //Set variable to follow format to hash
          obj['id'] = `${id}`;
          if(obj['remark'] == null) {
            obj['remark'] = "";
          }
          obj['content_hash'] = "";
          obj['date_created'] = this.pgFormatDate(res[i]['date_created']);
          
          let contentHash = crypto.SHA1(JSON.stringify(obj)).toString(); //get hash of object
          //Asset content hash from db & blockchain
          console.log(JSON.stringify(obj));
          this.assetService.getAssetBCHash(id).subscribe(
            res => {
               let bcHash = res[0]['assetContentHash'];
               console.log(contentHash + " " + bcHash);
               if(contentHash == bcHash) { //If hash same, safe
                 this.safeAsset ++;
               }
               else //else, suspicious
                 this.suspAsset ++;
            }, 
            err => {
               console.log(err);
            });
      }
      
      }, err => {
        console.log(err);
      })
    }
}
