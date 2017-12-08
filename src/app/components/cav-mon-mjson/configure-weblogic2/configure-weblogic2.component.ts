import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {ConfigUiUtility} from '../../../utility/monconfig-utility';
import { MonitorsData } from '../../../containers/monitors-data';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import {ConfigUtilityService} from '../../../services/config-utility.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { WeblogicConfigureData } from '../../../containers/weblogic-typesdata';
import { ImmutableArray } from '../../../utility/immutable-array';

@Component({
  selector: 'app-configure-weblogic2',
  templateUrl: './configure-weblogic2.component.html',
  styleUrls: ['./configure-weblogic2.component.css']
})

export class ConfigureWeblogic2Component implements OnInit {

  subscription: Subscription;

  /**These are those monitors which are used in current screen. */
  monitorList: string[] = ['JDBCStats', 'JVMStats', 'ThreadPoolStats', 'SessionStats', 'JMSQueueStats', 'MinThreadConstraintStats', 'TransactionStats'];

  weblogic:any;

  serverList:SelectItem[];

  tierfield:string;

  monName:string;

  weblogicStats:SelectItem[];

  typeItems:SelectItem[];

/**for header of table */
  cols: any[];

/**for form ***/
  weblogicData:WeblogicConfigureData;

/**stores table data */
  weblogicStatsTableData:WeblogicConfigureData[]=[];


  constructor(private cavMonDataService :CavmonMonitorsdataService,
              private store: Store<MonitorsData>,
              private monConfigUtilityService:ConfigUtilityService,
              private router:Router,
              private route: ActivatedRoute
              
               ) {
    
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
     this.weblogicData = new WeblogicConfigureData();
     this.route.params.subscribe((params: Params) => {
      this.tierfield = params['tierfield'];
      this.monName = params['monName']
    });
    let arrLabel = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    let arrValue = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    this.typeItems = ConfigUiUtility.createListWithKeyValue(arrLabel, arrValue);

    /*creating weblogicStats dropdown serverList*/
    let weblogicStatsLabel = ['JDBC Stats','JVM Stats','JMS Queue Stats','Session Stats','Min Thread Constraint Stats','Transaction Stats','Thread Pool Stats',];
    let weblogicStatsValue= ['JDBCStats','JVMStats',,'JMSQueueStats','SessionStats','MinThreadConstraintStats','TransactionStats','ThreadPoolStats'];
    this.weblogicStats =  ConfigUiUtility.createListWithKeyValue(weblogicStatsLabel, weblogicStatsValue);

    /*creating server list */
    let data = ['All Server' ,'Server1','Server2'];
    this.serverList = ConfigUiUtility.createDropdown(data);

    this.cols = [
            {field:'server',header:'Server'},
            {field:'weblogicStats',header:'Weblogic Stats'},
            {field:'userName',header:'User Name'},
            {field:'pwd',header:'Password'},
            {field:'hostName',header:'Host Name'},
            {field:'port',header:'Port'},
            {field:'instanceName',header:'Instance Name'},
            {field:'mBeanType',header:'MBean Type'},
            {field:'enable',header:'Enable'},

        ];
  }
  

  saveWeblogicConfiguration()
  {
    console.log("this.weblogicData",this.weblogicData)
     //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
     this.weblogicStatsTableData=ImmutableArray.push(this.weblogicStatsTableData, this.weblogicData);
     this.weblogicData = new WeblogicConfigureData();
  }



}
