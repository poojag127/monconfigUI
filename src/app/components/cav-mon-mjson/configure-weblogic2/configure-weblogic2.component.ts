import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
import { ROUTING_PATH } from '../../../constants/monconfig-url-constant';
import { CavmonConfigService } from '../../../services/cavmon-config.service';

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

  /**This is to send data to parent component(Configuration home Screen Component) for creating final keyword data */
  @Output()
  monitorsData = new EventEmitter();


  constructor(private cavMonDataService :CavmonMonitorsdataService,
              private store: Store<MonitorsData>,
              private monConfigUtilityService:ConfigUtilityService,
              private router:Router,
              private route: ActivatedRoute,
              private cavMonConfigService:CavmonConfigService
              
               ) {

    this.route.params.subscribe((params: Params) => {
      this.tierfield = params['tierfield'];
      this.monName = params['monName']
    });

   console.log("monName--",this.monName)
   console.log("tierfield--",this.tierfield)
    
   let that = this;
  //  this.subscription = this.store.select("monitorData")
  //           .subscribe(data => {
  //     console.log("data--",data)
  //     let weblogicData = data["data"];
  //     if(weblogicData.hasOwnProperty(that.tierfield))
  //     {
  //       weblogicData[that.tierfield].map(function(each)
  //       {
  //        if(each["monName"] == that.monName)
  //         {
  //         that.weblogicStatsTableData.push(each)
  //         }
  //       })
  //      }
  //     })
      console.log("weblogic--",this.weblogic)
   }

  ngOnInit() {
    this.weblogicData = new WeblogicConfigureData();
    this.route.params.subscribe((params: Params) => {
      this.tierfield = params['tierfield'];
      this.monName = params['monName']
    });

    // let data2 = this.cavMonConfigService.monitorsDataAsObservable$
   this.cavMonConfigService.monitorsDataAsObservable$.subscribe((data) =>{
     console.log("data---in weblogic configuration  ------",data)
    })

    // let abc = this.cavMonConfigService.monitorsData$.getValue();
    // console.log("abc---",abc)


  

   



    // console.log("in weblofic--",data)

    this.getTableData();

    let arrLabel = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    let arrValue = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    this.typeItems = ConfigUiUtility.createListWithKeyValue(arrLabel, arrValue);

    /*creating weblogicStats dropdown serverList*/
    let weblogicStatsLabel = ['JDBC Stats','JVM Stats','JMS Queue Stats','Session Stats','Min Thread Constraint Stats','Transaction Stats','Thread Pool Stats','Thread Pool Stats V2'];
    let weblogicStatsValue= ['WeblogicJdbcStats','WeblogicJvmStats','WeblogicJMSQueueStats','WeblogicSessionStats','WeblogicMinThreadConstraintStats','WeblogicTransactionsStats','WeblogicThreadPoolStats','WeblogicThreadPoolStatsV2'];
    this.weblogicStats =  ConfigUiUtility.createListWithKeyValue(weblogicStatsLabel, weblogicStatsValue);

    /*creating server list */
    let data = ['All Server' ,'Server1','Server2'];
    this.serverList = ConfigUiUtility.createDropdown(data);

    this.cols = [
            {field:'server',header:'Server'},
            {field:'monName',header:'Weblogic Stats'},
            {field:'userName',header:'User Name'},
            {field:'pwd',header:'Password'},
            {field:'hostName',header:'Host Name'},
            {field:'port',header:'Port'},
            {field:'instanceName',header:'Instance Name'},
            {field:'mBeanType',header:'MBean Type'},
            {field:'enable',header:'Enable'},
        ];
  }
  
  getTableData() {
    console.log("this.tierfield--",this.tierfield)
    console.log("this.monitor--",this.monName)
    let that = this;
    
    



    // this.subscription = this.store.select("monitorData")
    //   .subscribe(data => {
    //     console.log("data--",data)
    //     let weblogicData = data["data"];
    //     if(weblogicData.hasOwnProperty(that.tierfield))
    //     {
    //       weblogicData[that.tierfield].map(function(each)
    //       {
    //        if(each["monName"] == that.monName)
    //        {
    //         that.weblogicStatsTableData.push(each)
    //        }
    //       })
    //     }
    //   })
  }

  saveWeblogicConfiguration()
  {
    console.log("this.weblogicData",this.weblogicData)
    if(this.tierfield == 'All_Tier')
       this.weblogicData.server = 'All Tier'
    
    this.weblogicData.tierName = this.tierfield;
  
     //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
     this.weblogicStatsTableData=ImmutableArray.push(this.weblogicStatsTableData, this.weblogicData);
     this.weblogicData = new WeblogicConfigureData();
  }

  ngOnDestroy(){
    console.log("ngOnDestroy method called--",this.weblogicStatsTableData)
    let data = {};
    data[this.tierfield] = this.weblogicStatsTableData;
    this.monitorsData.emit(data);
    this.store.dispatch({type: "updateWeblogic", payload:data });
  }
}
