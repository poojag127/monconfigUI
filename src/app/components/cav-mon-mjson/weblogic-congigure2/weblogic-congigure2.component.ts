import { Component, OnInit } from '@angular/core';
import { Weblogic } from '../../../containers/weblogic';
import { SelectItem } from 'primeng/primeng';
import {ConfigUiUtility} from '../../../utility/monconfig-utility';
import { MonitorsData } from '../../../containers/monitors-data';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import * as _ from "lodash";
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {ConfigUtilityService} from '../../../services/config-utility.service';
import {Messages} from '../../../constants/monconfig-constants';

@Component({
  selector: 'app-weblogic-congigure2',
  templateUrl: './weblogic-congigure2.component.html',
  styleUrls: ['./weblogic-congigure2.component.css']
})

export class WeblogicCongigure2Component implements OnInit {
  
  typeItems: SelectItem[];
  statsName:string = "JDBC";
  subscription: Subscription;
  
 /**These are those monitors which are used in current screen. */
  monitorList: string[] = ['JDBCStats', 'JVMStats', 'ThreadPoolStats', 'SessionStats', 'JMSQueueStats', 'MinThreadConstraintStats', 'TransactionStats'];

  weblogic:any;

  constructor(private cavMonDataService :CavmonMonitorsdataService,private store: Store<MonitorsData>,private monConfigUtilityService:ConfigUtilityService ) { 

     this.subscription = this.store.select("monitorData")
      .subscribe(data => {
        console.log("monitorData subscription called")
        var keywordDataVal = {}
        this.monitorList.map(function (key) {
         console.log("kry--",key)
         console.log("data--",data)
         let weblogicData = data["weblogic"];
         weblogicData[key].map(function(eachConfiguration)
         {
           console.log("eachConfiguration--",eachConfiguration)
           console.log("chk --",eachConfiguration["tierName"] == "All Tier")
          if(eachConfiguration["tierName"] == "All Tier")
          {
           console.log("keywordDataVal--1--",keywordDataVal)
           keywordDataVal[key] = eachConfiguration;
            console.log("keywordDataVal--2--",keywordDataVal)
          }
         })
        })
         console.log("keywordDataVal--",keywordDataVal)
         this.weblogic = keywordDataVal;
      })
      console.log("weblogic--",this.weblogic)
  }

  ngOnInit() {

    // let monitorData = this.cavMonDataService.getMonitorData().subscribe()
    // let weblogicData = _.find(monitorData, function(each) { return each.hasOwnProperty('weblogic')}); //TO DO
    // console.log("weblogicDatas",weblogicData)

    // let that = this;
    // this.monitorList.map(function (key) {
    //    var keywordDataVal = {};
    //    console.log("kry--",key)
    //    console.log("map--",weblogicData[key])
    //    this.weblogicData[key].map(function(eachConfiguration)
    //    {
    //      if(eachConfiguration["tierName"] == "All Tier")
    //      {
    //        keywordDataVal[key] = eachConfiguration;
    //      }
    //    })
    //     that.weblogic = keywordDataVal;
    //    })

    console.log("weblogic data--",this.weblogic)
    let arrLabel = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    let arrValue = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    this.typeItems = ConfigUiUtility.createListWithKeyValue(arrLabel, arrValue);
  }

  saveWeblogicConfiguration(){
   console.log("saveWeblogicConfiguration method called",this.weblogic)
    this.monConfigUtilityService.successMessage(Messages);
  }
}
