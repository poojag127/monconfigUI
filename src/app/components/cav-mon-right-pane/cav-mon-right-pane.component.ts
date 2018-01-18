import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../utility/monconfig-utility';
// import {ProfileData} from '../../containers/profile-data';
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

  topoName: String;

  /** Flag to show and hide search filter in the datatable */
   isShowFilter:boolean;
   
  /**This is used to emit "isShowFilter" value */
     @Output()
     showFilterEvent = new EventEmitter<boolean>();  

  constructor(private cavMonHomeService :CavmonHomeService,private router: Router) 
  {

  }

  ngOnInit() 
  {
    console.log("CavMonRightPaneComponent", "ngOnInit", "Method called ");
    this.cavMonHomeService.getTopologyList()
      .subscribe(data => {
                 this.topologyList = ConfigUiUtility.createDropdown(data);
                 });
    
    this.isShowFilter = false; //setting default value of show filter to false
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
    this.router.navigate([ROUTING_PATH + '/mjson/configuration',jsonName,topoName]);
  }

   /**On saving the new profile entry */
   routeOnSave(mjsonname,topoName)
   {
     console.log("routeOnSave method is called ",mjsonname,topoName)
     this.router.navigate([ROUTING_PATH + '/mjson/configuration',mjsonname,topoName])
   }


  /**Method for the show filter in the datatable */ 
  showFilter()
  {
    this.isShowFilter = !this.isShowFilter;
    this.showFilterEvent.emit(this.isShowFilter);
    console.log("CavMonRightPaneComponent", "showFilter", "isShowFilter = ", this.isShowFilter);
  }

  /** Method to load profile data in the table for the selected topology */
  loadProfileData(topoName)
  {
     this.cavMonHomeService.getProfileList(this.selectedTopology)
     .subscribe(data => {
        this.jsonsTableData = data;
    })
  }

}
