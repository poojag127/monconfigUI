import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ConfigUiUtility } from '../../utility/monconfig-utility';
// import {ProfileData} from '../../containers/profile-data';
import { MJsonData } from '../../containers/mjson-data';

import { Router } from '@angular/router';

import { CavmonHomeService } from '../../services/cavmon-home.service';
import { ConfigUtilityService } from '../../services/config-utility.service';
import { ImmutableArray } from '../../utility/immutable-array';
import { ROUTING_PATH } from '../../constants/monconfig-url-constant';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CavmonMonitorsdataService } from '../../services/cavmon-monitorsdata.service';
import * as URL from '../../constants/monconfig-url-constant';

@Component({
  selector: 'app-cav-mon-right-pane',
  templateUrl: './cav-mon-right-pane.component.html',
  styleUrls: ['./cav-mon-right-pane.component.css']
})

export class CavMonRightPaneComponent implements OnInit {
  topologyList: SelectItem[];

  selectedTopology: string = "default";

  jsonsTableData: MJsonData[] = [];

  selectedJson: MJsonData[];

  /**For add/edit MJson flag */
  isNewMJson: boolean = false;

  /** Flag for add/edit dialog **/
  addEditMJsonDialog: boolean = false;

  mJsonData: MJsonData;

  topoName: String;
  mjsonname: String;

  subscription: Subscription;

  /** Flag to show and hide search filter in the datatable */
  isShowFilter: boolean;

  /**This is used to emit "isShowFilter" value */
  @Output()
  showFilterEvent = new EventEmitter<boolean>();

  constructor(private cavMonHomeService: CavmonHomeService,
    private router: Router,
    private store: Store<any>,
    private monConfigUtilityService: ConfigUtilityService,
    private cavMonDataService: CavmonMonitorsdataService, ) {

  }

  ngOnInit() {


    console.log("CavMonRightPaneComponent", "ngOnInit", "Method called ");
    this.cavMonHomeService.getTopologyList()
      .subscribe(data => {
        this.topologyList = ConfigUiUtility.createDropdown(data);
      });

    this.isShowFilter = false; //setting default value of show filter to false
  }

  topoChange(val) {
    console.log("selectedTopology", val)
  }


  openAddDialog() {
    this.isNewMJson = true;
    this.addEditMJsonDialog = true;
    this.mJsonData = new MJsonData();
  }

  saveEditMJson() {
    console.log("saveEditMJson method called", this.mJsonData)
    this.addEditMJsonDialog = false;
    console.log(this.jsonsTableData)

    //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
    this.jsonsTableData = ImmutableArray.push(this.jsonsTableData, this.mJsonData);
  }

  routeToConfiguration(jsonName, topoName) {
    console.log(jsonName)
    this.router.navigate([ROUTING_PATH + '/mjson/configuration', jsonName, topoName]);
  }

  /**On saving the new profile entry */
  routeOnSave(mjsonname, topoName) {
    console.log("routeOnSave method is called ", mjsonname, topoName)
    this.router.navigate([ROUTING_PATH + '/mjson/configuration', mjsonname, topoName])
  }


  /**Method for the show filter in the datatable */
  showFilter() {
    this.isShowFilter = !this.isShowFilter;
    this.showFilterEvent.emit(this.isShowFilter);
    console.log("CavMonRightPaneComponent", "showFilter", "isShowFilter = ", this.isShowFilter);
  }

  /** Method to load profile data in the table for the selected topology */
  loadProfileData(topoName) {
    this.cavMonHomeService.getProfileList(this.selectedTopology)
      .subscribe(data => {
        this.jsonsTableData = data;
      })
  }

  /**
   * Method to delete profile(s) 
   * This method is called when user clicks on the delete button in the profile list table
   */
  deleteProfile() {
    /**** Check whether user has selected rows to delete or not */
    if (!this.selectedJson || this.selectedJson.length < 1) {
      this.monConfigUtilityService.errorMessage("Select profile(s) to delete");
      return;
    }

    let selectedProf = this.selectedJson; // used to hold selected row data of the table
    let arrProf = []; // this array holds profile name of the selected row in the profile list table
    for (let index in selectedProf) {
      arrProf.push(selectedProf[index].profileName);
    }
    console.log("arrProf contains following profileName for delete --", arrProf)

    /**** here request is send to server to delete profiles  */
    this.cavMonHomeService.deleteProfileData(this.selectedTopology, arrProf)
      .subscribe(data => {
        this.deleteProfileData(); // this is used to delete the profiles from the table from ui side
        this.monConfigUtilityService.infoMessage("Deleted Successfully");
      })

  }

  /**
   * This method is used to delete profile data from ui
   */
  deleteProfileData() {
    let arrId = []; // array to hold id of each selected profile to perform delete operation
    this.selectedJson.map(function (each) {
      arrId.push(each.id)
    })

    this.jsonsTableData = this.jsonsTableData.filter(function (val) {
      return arrId.indexOf(val.id) == -1;  //value to be deleted should return false
    })

    /**** clearing object used for storing data */
    this.selectedJson = [];
  }

  /**
   * This method is used to download/import the json file 
   * for the selected monitor profile.
   */
  importProfile(profile) {
    /***download file directly in server  */
    //let url = window.location.protocol + "//"+ window.location.hostname +":"+window.location.port; 

    /***to download file in local */
    let url = `${URL.HOST_NAME}`;

    this.cavMonDataService.getMprof(this.selectedTopology, profile.profileName).subscribe(data => {
      if (data) {
        let path = url + "/netstorm/temp/";
        path = path + profile.profileName + ".json";
        this.downloadURI(path, profile.profileName + ".json");
      }
    })
  }


  /** This method is used to make the download link to download the selected json file */
  downloadURI(uri, name) {
    var link = document.createElement("a");
    console.log("link--", link)

    link.download = name;
    link.href = uri;

    // Because firefox not executing the .click()
    // Hence, We need to create mouse event initialization.
    var clickEvent = document.createEvent("MouseEvent");
    clickEvent.initEvent("click", true, true);

    link.dispatchEvent(clickEvent);
  }


}
