import { Component, OnInit } from '@angular/core';
import { ROUTING_PATH } from '../../constants/monconfig-url-constant';

@Component({
  selector: 'app-cav-mon-left-side-bar',
  templateUrl: './cav-mon-left-side-bar.component.html',
  styleUrls: ['./cav-mon-left-side-bar.component.css']
})

export class CavMonLeftSideBarComponent implements OnInit
{

 navMenuArray = [];
 
 ROUTING_PATH = ROUTING_PATH;

 constructor() 
 { 

 }

 ngOnInit() 
 {
     /* Main Menu Array.  */
   this.navMenuArray = [
         { label: "Home", route: `${ROUTING_PATH}/home`, icon: "ndeicon ndegui-home1", tooltip: "Home" },
         { label: "Version Commit", route: `${ROUTING_PATH}/versionCommit`, icon: "ndeicon fa fa-dropbox", tooltip: "Version Commit" },
         { label: "Version logs", route: `${ROUTING_PATH}/versionLogs`, icon: "ndeicon fa fa-history", tooltip: "Version Logs" },
         { label: "Summary", route: `${ROUTING_PATH}/summaryReport`, icon: "ndeicon fa fa-newspaper-o reports", tooltip: "Summary Report" },
         { label: "Download" , route: `${ROUTING_PATH}/downloadJson`, icon: "ndeicon fa fa-download", tooltip: "Download JSON"},
         { label: "Export JSON", route: `${ROUTING_PATH}/expJson`, icon: "ndeicon fa fa-file-excel-o ", tooltip: "Export JSON" },
         { label: "Import JSON", route: `${ROUTING_PATH}/impJson`, icon: "ndeicon fa fa-file ", tooltip: "Import JSON"},
         { label: "Audit Log", route: `${ROUTING_PATH}/audit-log-view`, icon: "ndeicon ndegui-audit-logs", tooltip: "Audit Log" },
    ];
  }

}


