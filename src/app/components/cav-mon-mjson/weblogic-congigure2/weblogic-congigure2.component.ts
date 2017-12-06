import { Component, OnInit } from '@angular/core';
import { Weblogic } from '../../../containers/weblogic';
import { SelectItem } from 'primeng/primeng';
import {ConfigUiUtility} from '../../../utility/monconfig-utility';
import {ConfigUtilityService} from '../../../services/config-utility.service';
import {Messages} from '../../../constants/monconfig-constants';

@Component({
  selector: 'app-weblogic-congigure2',
  templateUrl: './weblogic-congigure2.component.html',
  styleUrls: ['./weblogic-congigure2.component.css']
})
export class WeblogicCongigure2Component implements OnInit {
  
  typeItems: SelectItem[];
  statsName:string = "JDBC";
  constructor(private monConfigUtilityService:ConfigUtilityService ) { }

  ngOnInit() {
    let arrLabel = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    let arrValue = ['JMSDestinationRuntimeMBean', 'JDBCDataSourceRuntimeMBeans', 'WebAppComponentRuntime'];
    this.typeItems = ConfigUiUtility.createListWithKeyValue(arrLabel, arrValue);
  }

  saveWeblogicConfiguration()
  {
     this.monConfigUtilityService.successMessage(Messages);
  }

}
