import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../utility/monconfig-utility';
import {ProfileData} from '../../containers/profile-data';
import {MJsonData} from '../../containers/mjson-data';

import { Router } from '@angular/router';

import { CavmonHomeService } from '../../services/cavmon-home.service';
import { ConfigUtilityService } from '../../services/config-utility.service';
import { ImmutableArray } from '../../utility/immutable-array';
import { ROUTING_PATH } from '../../constants/monconfig-url-constant';

@Component({
  selector: 'app-cav-mon-right-pane',
  templateUrl: './cav-mon-right-pane.component.html',
  styleUrls: ['./cav-mon-right-pane.component.css']
})

 export class CavMonRightPaneComponent implements OnInit
 {
  topologyList :SelectItem[];
  
  selectedTopology:string = "default";
  
  jsonsTableData: MJsonData[] = [];
  
  selectedJson:MJsonData;

   /**For add/edit MJson flag */
  isNewMJson: boolean = false;

  /** Flag for add/edit dialog **/
  addEditMJsonDialog:boolean = false;

  mJsonData:MJsonData;

  constructor(private cavMonHomeService :CavmonHomeService,private router: Router) 
  {
    console.log("comp loaded")
    console.log(this.mJsonData)

  }

  ngOnInit() 
  {
    console.log("comp loaded")
    console.log(this.mJsonData)
    this.cavMonHomeService.getTopologyList()
      .subscribe(data => {
                 this.topologyList = ConfigUiUtility.createDropdown(data);
                 })
  }

  topoChange(val)
  {
    console.log("selectedTopology",val)
  }


  openAddDialog()
  {
    this.isNewMJson = true;
    this.addEditMJsonDialog = true;
    this.mJsonData = new MJsonData();
  }

  saveEditMJson()
  {
    console.log("saveEditMJson method called",this.mJsonData)
    this.addEditMJsonDialog = false;
    console.log(this.jsonsTableData)
    
     //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
     this.jsonsTableData=ImmutableArray.push(this.jsonsTableData, this.mJsonData);
  }
  routeToConfiguration(jsonName,topoName)
  {
    console.log(jsonName)
    this.router.navigate([ROUTING_PATH + '/mjson',jsonName,topoName]);
  }

}
