import { Component, OnInit } from '@angular/core';

import { AssetService } from '../assets/shared/asset.service';
import * as Chartist from 'chartist';

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

    getTotalAssetCount() {
      this.assetService.getAssetCount().subscribe(res =>{
        console.log(res);
        this.totalAsset = res['count'];   
      }, err => {
        console.log(err);
      })
    }

    checkAsset() {
      this.assetService.getAssetHash().subscribe(res =>{
    
      var length = Object.keys(res).length; //length of object

      for(var i =0; i < length; i++){
          //Asset content hash from db & blockchain
      }
      
      }, err => {
        console.log(err);
      })
    }
}
