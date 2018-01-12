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
  
  tierField:string;

  monName:string;

  topoName:string;

  tierId:number;

  serverList:SelectItem[];

  tableData:TableData[]=[];

  selectedTableData:TableData;

  isNewConfig:boolean=true;

  /***It holds array of object of component Type ****/
  compArgs:any[];

  tierName:string;

  dropDownList:SelectItem[]=[];

  constructor( private router:Router,
               private route: ActivatedRoute,
               private cavMonConfigService:CavmonConfigService,
               private store: Store<any>,
               private cavMonDataService:CavmonMonitorsdataService
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


    /** getting data of monitor selected ****/
    let that = this;
    this.subscription = this.store.select("selectedMon")
        .subscribe(data => {
        console.log("data- monitors component ----",data)
        if(data != null)
        {
         this.compArgs = data["data"];
        }
    })

     /*** To get the server list in the dropdown ****/
     /*** Here unshift is used to insert element at 0 position of array ****/
    this.cavMonDataService.getServerList(this.topoName,this.tierId)
             .subscribe(data => {
                        if(data != null)
                        {
                         data.unshift("ALL Server");
                         this.serverList = ConfigUiUtility.createDropdown(data);
                        }
                      })
    
   }

   getDataForDependentComp(dependentCompArr)
   {
     let val ;
     let that = this;
     dependentCompArr.map(function(eachDepenComp)
     {
       val = that.getDataForComp(eachDepenComp);
      })
      return val;
   }

   getDataForRadioButtons(item)
   {
     let val;
     if(item.hasOwnProperty("dependentComp"))
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
   console.log("class monitors.comp called",data)
   let obj =_.find(this.compArgs,function(each){
      return each.id == data.id
    })
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
      for (let key of Object.keys(each))
      {
        val = val + key + ":" + each[key]+ ",";
      }
    })
    val = val.substring(0, val.length-1);
    return val;
  }

  /**
   * Generic function to get the value of each component
   * @param eachCompData 
   */

   getDataForComp(eachCompData)
   {
    let data = '';
    let argumentData = '';
    
    /*** for radio buttons ***/
    if(eachCompData.hasOwnProperty("items") && eachCompData["items"] != null)
    {
     /**  getting the object of selected radio   ****/
     let selectedObj = _.find(eachCompData["items"],function(each) { return each.args == each.value })

     data = data + " " + eachCompData.value;

     let val = this.getDataForRadioButtons(selectedObj)
     
     data = data + " " + val["options"];
     argumentData = argumentData + selectedObj.label + ":" + val["argumentData"];
    }
    else if(eachCompData.hasOwnProperty("columnData") && eachCompData["columnData"] != null)
    {
      data = data + " " + eachCompData.arg ;
      let val = this.getDataForTable(eachCompData.value);
      data = data + " " + val;
      argumentData = argumentData + eachCompData.label + ":" + val;
      console.log("data for tableData--",data)
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
          data = data + " "+ eachCompData.value 
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
   console.log("compArgs--",this.compArgs)
   console.log("selectedTableDta-",this.selectedTableData)
   let option = '';         // for column to display to the user
   let argumentData = '';  // for hidden column
   let arg = '';

   if(this.tierId == -1)
     this.selectedTableData.serverName = 'All Server'

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
 }
}
