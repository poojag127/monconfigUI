import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ConfigRestApiService} from './config-rest-api.service';
import * as URL from '../constants/monconfig-url-constant';

@Injectable()
export class CavmonMonitorsdataService {

  data :{};

  constructor(private http: Http,private _restApi: ConfigRestApiService) {
    //to do  convert into object 
  this.data = {"weblogic":{'JDBCStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':true,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'JVMStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'ThreadPoolStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'SessionStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'JMSQueueStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'MinThreadConstraintStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
                           'TransactionStats':[{'tierName' :'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}]
                          }
                    }
   
  }

   getMonitorData(){
     return  this.data;
   }

  getServerList(topoName,tierId)
  {
     let url = `${URL.GET_SERVER_LIST}`+"?topoName="+`${topoName}`+"&tierId="+`${tierId}`;
     console.log(url);
     return this._restApi.getDataByGetReq(url);
  }

   

}
