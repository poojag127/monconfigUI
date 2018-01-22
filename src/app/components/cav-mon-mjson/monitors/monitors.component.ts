import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../../utility/monconfig-utility';
import { TableData } from '../../../containers/table-data';
import { ImmutableArray } from '../../../utility/immutable-array';
import * as _ from "lodash";
import {ConfigUtilityService} from '../../../services/config-utility.service';


@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {

   //Here profileId is used for fetching list of xml files
  @Input()
  dependent: number;

  subscription: Subscription;

 subscriptionConfiguredData: Subscription;
  
  tierField:string;

  monName:string;

  topoName:string;

  tierId:number;

  serverList:SelectItem[];

  tableData:TableData[]=[];

  selectedTableData:TableData;

  isNewConfig:boolean=true;

  /***It holds array of object of component Type ****/
  compArgs:any[]=[];

  tierName:string;

  dropDownList:SelectItem[]=[];

  configuredUIData:any[];

  /***Used to store clone data *****/
  tempData:any[];

   /***It holds array of server name and corresponding app name  */
   tempArr = [];
   
  /** This boolean variable is used to hold the state of the accordion which holds the configured data table
   *  i.e. the second accordion of the configuration screen  
   *  When tableAccordionState is true then the configured Data table accordion is in collapsed state
   *  else it is in expanded state 
   */
  tableAccordionState : boolean = true;

  constructor( private router:Router,
               private route: ActivatedRoute,
               private cavMonConfigService:CavmonConfigService,
               private store: Store<any>,
               private cavMonDataService:CavmonMonitorsdataService,
               private monConfigUtilityService:ConfigUtilityService
               )
   { }



  ngOnInit() {

    this.selectedTableData = new TableData();
    this.route.params.subscribe((params: Params) => {
      console.log("params--",params)
      this.topoName = params['topoName'];
      this.tierId = params['tierId'];
      this.monName = params['monName'];
      this.tierName = params['tierName'];
    });


    this.getTableData();
    

    //  this.cavMonDataService._AIOpertation$.subscribe(data =>
    //     {
    //       console.log("configured data called",data)
    //     })


    /** getting data of monitor selected ****/
    let that = this;
    this.subscription = this.store.select("selectedMon")
        .subscribe(data => {
        console.log("data- monitors selected mOnitor component ----",data)
        // let data = val["selectedMon"];
        if(data != null &&  Object.keys(data).length != 0)  /***handling case when data ="{}"****/
        {
         this.compArgs = data["data"];
  
         /******making a deep cloning of  data["data"] ,as initial object is used further ******/
         this.tempData = JSON.parse (JSON.stringify(data["data"])) 

          // let tierUIObj = _.find(configuredUIData,function(each) { return each.hasOwnProperty(that.tierName)})
          // if(tierUIObj != null)
          // {
          //   let monData =  _.find(tierUIObj,function(each) { return each.hasOwnProperty(that.monName)})
          //   if(monData != null)
          //      that.tableData = monData;
          // }
        }
    })

    // this.subscriptionConfiguredData = this.store.select("configuredData")
    //     .subscribe(data => {
    //     console.log("data configured monitors component ----",data)
    //     // let data = val["selectedMon"];
    //     if(data != null &&  Object.keys(data).length != 0)  /***handling case when data ="{}"****/
    //     {
    //      that.configuredUIData = data["configuredUIData"];
    //       // let tierUIObj = _.find(configuredUIData,function(each) { return each.hasOwnProperty(that.tierName)})
    //       // if(tierUIObj != null)
    //       // {
    //       //   let monData =  _.find(tierUIObj,function(each) { return each.hasOwnProperty(that.monName)})
    //       //   if(monData != null)
    //       //      that.tableData = monData;
    //       // }
    //     }
    // })


    

     /*** To get the server list in the dropdown ****/
     /*** Here unshift is used to insert element at 0 position of array ****/
    this.cavMonDataService.getServerList(this.topoName,this.tierId)
             .subscribe(data => {
                        if(data != null)
                        {
                         data.unshift("All Servers");
                         this.serverList = ConfigUiUtility.createDropdown(data);
                        }
                      })

   }


   getTableData()
   {
    let data = this.cavMonDataService.saveMonitorData;
    console.log("data i monitors component------",data)
    if(data != null  && data.hasOwnProperty(this.tierName))
    {
     console.log("existing tier case")
     let tierObjList = data[this.tierName];
     if(tierObjList != null)
     {
      for(let i = 0; i < tierObjList.length; i++) {
          if(tierObjList[i].hasOwnProperty(this.monName))
          {
            console.log("existing monitor case")
            this.tableData = tierObjList[i][this.monName];
            break;
          }
        }
      }
    }
    console.log("this.tableData--",this.tableData)
   }

   getDataForDependentComp(dependentCompArr)
   {
     let val='';
     let that = this;
     dependentCompArr.map(function(eachDepenComp)
     {
       let data = that.getDataForComp(eachDepenComp);
       val = val + data["options"] + ",";
      })
      val = val.substring(0,val.length -1);
      console.log("Method getDataForDependentComp caleed value =",val.trim())
      return val.trim();
   }


   openEditMode()
   {
     console.log("this.selectedTableData--",this.selectedTableData)


   }

   getDataForRadioButtons(item)
   {
     let val;
     if(item.hasOwnProperty("dependentComp") && item["dependentComp"] != null )
        val = this.getDataForDependentComp(item.dependentComp)

     return val;
   }
  
  /**
   * This method updates the compArgsJson object for table type as it is custom component and
   * so ngmodel cant be used  and it is called from child comp.
   * @param data 
   */

  updateTableData(data)
  {
   console.log(" updateTableData method class  monitors.comp called",data)
   let obj =_.find(this.compArgs,function(each) {
     console.log("each---",each)
      return each.id == data.id
    })
    console.log("obj---",obj)
   obj["value"] = data.data;
  }
 
 /**
  * Getting data for table component and modifying it
  * @param tableData 
  */
  getDataForTable(tableData)
   {
    let val='';
    tableData.map(function(each) {
      console.log("each---",each)
      for (let key of Object.keys(each))
      {
        if(key != "id" && !key.startsWith("ui-"))
           val = val + key + ":" + each[key]+ ",";
      }
    })
    val = val.substring(0, val.length-1);
    console.log("Methd getDataForTable called value = ",val.trim())
    return val.trim();
  }

  /**
   * Generic function to get the value of each component
   * @param eachCompData 
   */

   getDataForComp(eachCompData)
   {
    console.log("Method getDataForComp called for Component =  ",eachCompData)
    let data = '';
    let argumentData = '';
    
    /*** for radio buttons ***/
    if(eachCompData.hasOwnProperty("items") && eachCompData["items"] != null)
    {
     /**  getting the object of selected radio   ****/
     let selectedObj = _.find(eachCompData["items"],function(each) { return each.value == eachCompData.value })

    //  data = data + " " + eachCompData.value;

     let val = this.getDataForRadioButtons(selectedObj)
     
     console.log("val--",val)
     
     if(val == null || val == '')
     {
       /****** case when selected radiobutton doesnot have dependent component ****/
       data = data + " " + eachCompData.value;
       argumentData = argumentData + selectedObj.label + ":" + eachCompData.value;
     }  
     else
     {
      data = data + " " + val;
      argumentData = argumentData + selectedObj.label + ":" + val;
     }
    }
    else if(eachCompData.hasOwnProperty("columnData") && eachCompData["columnData"] != null && eachCompData.value != null)
    {
      data = data + " " + eachCompData.arg ;
      let val = this.getDataForTable(eachCompData.value);
      data = data + " " + val;
      argumentData = argumentData + eachCompData.label + ":" + val;
      console.log("data for tableData--",data)
    }
    else if(eachCompData.hasOwnProperty("dependentComp") && eachCompData["dependentComp"] != null)
    {
     let val = this.getDataForDependentComp(eachCompData.dependentComp)
     
     if(eachCompData["arg"] != null && eachCompData["arg"] != "")
     {
       data = data + " " + eachCompData["arg"];  
       argumentData = argumentData + " "+ eachCompData["label"];     
     }
       data = data + " " +val;
       argumentData = argumentData + ":" +val;
    }
    else if(eachCompData.type == 'Checkbox') 
    {
       if(eachCompData.value)
       {
         data = data + " " + eachCompData.arg ;
         argumentData = argumentData + eachCompData.label + ":" + eachCompData.value;
       }
    }
    else 
     {
       if(eachCompData.arg != null && eachCompData.arg != "") 
       {
        data = data + " " + eachCompData.arg + ":";
        argumentData = argumentData + eachCompData.label + ":"
        }
        data = data + " " +eachCompData.value 
        argumentData = argumentData + eachCompData.value ;
    }
    console.log("data---",data)
    console.log("argumentData---",argumentData)
    return {"options":data, "argumentData":argumentData};
  }


/**
 * This method is called when add button is clicked 
 * This method forms the data for the table 
 */
 addData()
 {
   /**Check for whether following combination of server name and app name existing in the table or not */
   if(this.validateAppNameAndServerName())
   {
     console.log("this.validateAppNameAndServerNam()--",(this.validateAppNameAndServerName()))
     this.monConfigUtilityService.errorMessage("Following combination of server name and app name already exists.Please enter different server name or app name")
     return;
   }
   console.log("compArgs--",this.compArgs)
   console.log("selectedTableDta-",this.selectedTableData)
   let option = '';         // for column to display to the user
   let argumentData = '';  // for hidden column
   let arg = '';

    /*** Check for whether selected monitor is configured for all tier or specific tier **/
    if(this.tierId == -1)
    {
      this.selectedTableData.serverName = 'All Server';
      this.monConfigUtilityService.successMessage(this.monName + " has been configured for All Servers");
    }
    else
    {
       if(this.selectedTableData.serverName == "" || this.selectedTableData.serverName == undefined)
       {
          this.monConfigUtilityService.errorMessage("Please select server ");
          return;
       }
       
     this.monConfigUtilityService.successMessage(this.monName + " has been configured for " + this.selectedTableData.serverName)
    }
    
    
   let that = this;
   this.compArgs.map(function(each)
   {
    let values = that.getDataForComp(each);
    option = option + " " + values["options"];
    argumentData = argumentData + "  " + values["argumentData"] + ",";
   })

   this.selectedTableData.arguments = argumentData
   this.selectedTableData.options = option 

    //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
   this.tableData=ImmutableArray.push(this.tableData, this.selectedTableData);

   /** clearing the fields ****/
    this.compArgs =  this.tempData;

   /**This is used to change the state of the Configured Data accordion from collapsed to expanded 
    * to show the configured data table when data is configured for the selected monitor.
    */
    this.tableAccordionState = false;
 }

 /** 
  * Method to validate following combination of server name and app name 
  * do exists in the configuration table or not
  */
  validateAppNameAndServerName() : boolean
  {
     let key = this.selectedTableData.serverName + this.selectedTableData.appName; // variable to hold server name and coresponding app name
     console.log("key ---", key)
 
     if(this.tempArr.includes(key))
       return true;
     else
     {
        this.tempArr.push(key); // add the key in a temporary array 
        return false;
     }
  }


 /**
  * Method to edit the configured data
  */
  editConfiguredData()
  {
    this.tableAccordionState = true;
  }


 ngOnDestroy() 
 {
  console.log("moving out of compoent--",this.tableData)
    // var newData = _.map(this.tableData, function(o) { return _.omit(o, 'arguments'); });
  let obj = {"tier":this.tierName,"data":this.tableData,"monName":this.monName}
  this.store.dispatch({ type:"CONFIGURED_MONDATA" ,payload:obj });
  this.cavMonDataService.saveConfiguredData(obj);

    if (this.subscription)
      this.subscription.unsubscribe();

    if(this.subscriptionConfiguredData)
     this.subscriptionConfiguredData.unsubscribe();
 }


}
