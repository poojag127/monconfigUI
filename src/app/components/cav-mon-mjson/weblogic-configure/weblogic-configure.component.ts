import { Component, OnInit } from '@angular/core';
import { Weblogic } from '../../../containers/weblogic';
import { SelectItem } from 'primeng/primeng';
import {ConfigUiUtility} from '../../../utility/monconfig-utility';


@Component({
  selector: 'app-weblogic-configure',
  templateUrl: './weblogic-configure.component.html',
  styleUrls: ['./weblogic-configure.component.css']
})
export class WeblogicConfigureComponent implements OnInit {

  weblogic:Weblogic;
  typeItems: SelectItem[];
  statsName:string;

  constructor() {

   }

  ngOnInit() {
    this.weblogic = new Weblogic();
    let arrLabel = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    let arrValue = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    this.typeItems = ConfigUiUtility.createListWithKeyValue(arrLabel, arrValue);
  }

  openConfigure(statsType){
    console.log("statsType",statsType)
    this.statsName = statsType
  }

  saveWeblogicConfiguration()
  {

  }
}
