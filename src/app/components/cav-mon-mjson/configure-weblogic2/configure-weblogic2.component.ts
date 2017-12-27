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
import { ConfirmationService} from 'primeng/primeng';
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

 /** for header of table **/
  cols: any[];

 /** for form ***/
  weblogicData:WeblogicConfigureData;

 /** stores table data ***/
  weblogicStatsTableData:WeblogicConfigureData[]=[];

  /** used to hold selected row data **/
  selectedWeblogicData:WeblogicConfigureData[] = [];

  /**This is to send data to parent component(Configuration home Screen Component) for creating final keyword data */
  @Output()
  monitorsData = new EventEmitter();

/** flag for label */
  isNewConfig :boolean = true;

  countEntry:number=0;

  constructor(private cavMonDataService :CavmonMonitorsdataService,
            private store: Store<MonitorsData>,
            private monConfigUtilityService:ConfigUtilityService,
            private router:Router,
            private route: ActivatedRoute,
            private confirmationService: ConfirmationService,
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
  //  this.cavMonConfigService.monitorsDataAsObservable$.subscribe((data) =>{
  //    console.log("data---in weblogic configuration  ------",data)
  //   })

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
            // {field:'enable',header:'Enable'},

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

  /** UPDATE functionality for weblogic configuration data   */ 
  editConfigData():void {   
    if (!this.selectedWeblogicData || this.selectedWeblogicData.length < 1) 
    {
      this.monConfigUtilityService.errorMessage("No row is selected to edit");
      return;
    }
    else if (this.selectedWeblogicData.length > 1)
    {
      this.monConfigUtilityService.errorMessage("Select a single row to edit");
      return;
    }
      this.weblogicData = Object.assign({}, this.selectedWeblogicData[0]);
      this.isNewConfig = false;
 }

 /** This method is to save data when ADD and UPDATE is performed */
 saveWeblogicConfiguration()
 {
  //  for saving data when new configuration is performed - ADD functionality
   if (this.isNewConfig)
   {
    if (this.weblogicData.monName == "" || this.weblogicData.monName == undefined)
      {
        this.monConfigUtilityService.errorMessage("Please select stats type");
        return;
      }
    if (this.tierfield == 'All_Tier')
      {  
        this.weblogicData["server"] = 'All Tier';
      }
    else
      {
         this.weblogicData["server"] = this.weblogicData.server;
         if(this.weblogicData.server == "" || this.weblogicData.server == undefined)
         {
           this.monConfigUtilityService.errorMessage("Please select server ");
           return;
         }
      }

     this.weblogicData["id"] = this.countEntry;
     this.weblogicStatsTableData=ImmutableArray.push(this.weblogicStatsTableData, this.weblogicData);
     this.countEntry = this.countEntry + 1;
     this.weblogicData = new WeblogicConfigureData();
    }

    //for saving data when existing row is updated -- UPDATE functionality 
    else
    { 
      this.isNewConfig = true;
      let that = this;
      this.weblogicStatsTableData.map(function(val){
        if(val.id == that.weblogicData.id)
        {
          val["userName"] = that.weblogicData.userName;
          val["pwd"] = that.weblogicData.pwd;
          val["port"] = that.weblogicData.port;
          val["hostName"] = that.weblogicData.hostName;
          val["enable"] = that.weblogicData.enable;
          val["instanceName"]= that.weblogicData.instanceName;
          val["mBeanType"] = that.weblogicData.mBeanType;
          val["monName"] = that.weblogicData.monName;
          val["server"] = that.weblogicData.server;
        }
      });

      this.selectedWeblogicData = []; 
      this.monConfigUtilityService.successMessage("Updated successfully");
    }

  }
    

}


  
  
