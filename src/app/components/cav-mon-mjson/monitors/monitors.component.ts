import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../../utility/monconfig-utility';
import { TableData } from '../../../containers/table-data';

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

  tableData:TableData[];

  selectedTableData:TableData;

  isNewConfig:boolean=true;

  /***It holds array of object of component Type ****/
  compArgs:any[];

  constructor( private router:Router,
               private route: ActivatedRoute,
               private cavMonConfigService:CavmonConfigService,
               private store: Store<any>,
               private cavMonDataService:CavmonMonitorsdataService
               )
   { }



  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.topoName = params['topoName'];
      this.tierId = params['tierId'];
      this.monName = params['monName'];
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


  saveData() 
  {
    console.log("function calleed",this.compArgs)
  }



}
