import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../../utility/monconfig-utility';
import { TableData } from '../../../containers/table-data';
import { ImmutableArray } from '../../../utility/immutable-array';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {

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

    let that = this;
    this.subscription = this.store.select("selectedMon")
        .subscribe(data => {
        if(data != null)
        {
         this.compArgs = data["data"];
        }
    })

     /* to get the server list in the dropdown */
    this.cavMonDataService.getServerList(this.topoName,this.tierId)
             .subscribe(data => {
                        this.serverList = ConfigUiUtility.createDropdown(data);
                        })
   }


 addData()
 {
   console.log("compArgs--",this.compArgs)
   console.log("selectedTableDta-",this.selectedTableData)
   let data='';
   let arg='';
   this.compArgs.map(function(each)
   {
     if(arg != each.arg)
     {
      data = data + " " + each.arg + " " + each.value;
     }
     else
     {
       data = data +":"+each.value;
     }
     arg = each.arg;
   })
   this.selectedTableData.arguments = data
    //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
   this.tableData=ImmutableArray.push(this.tableData, this.selectedTableData);
 }
}
