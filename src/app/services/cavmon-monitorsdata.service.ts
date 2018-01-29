import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ConfigRestApiService} from './config-rest-api.service';
import * as URL from '../constants/monconfig-url-constant';
import { Subject } from 'rxjs/Subject';
import * as _ from "lodash";


@Injectable()
export class CavmonMonitorsdataService {

  data :{};

   //Make subset of keywords as per screen  
  saveMonitorData: {};  

  /***hold arr of components ***/
  compArgData:any[];

  AIOpertation = new Subject<any>(); // for saving configuration data
  
  _AIOpertation$ = this.AIOpertation.asObservable();

 


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

    saveConfiguredData(data)
    {
      console.log("saveConfiguredData--method called",data)
      // this.modifyData(data);
      if(this.saveMonitorData != null  && this.saveMonitorData.hasOwnProperty(data.tier))
      {
        console.log("existing tier case")
        let isMonObjExist:boolean = false;
        let tierObjList = this.saveMonitorData[data.tier];
        let monObjList = _.find(tierObjList,function(each) { return each.hasOwnProperty(data.monName)})
        for(let i = 0; i<tierObjList.length; i++) {
          if(tierObjList[i].hasOwnProperty(data.monName))
          {
            console.log("existing monitor case")
            isMonObjExist = true;
            tierObjList[i][data.monName] = data.data
            break;
          }
        }

        if(!isMonObjExist)
           tierObjList.push({[data.monName]:data.data})   //new entry of monitor Object

      }
      else
      {
        console.log("new tier entry case")
        if( this.saveMonitorData == null)
           this.saveMonitorData = {};
           
        this.saveMonitorData[data.tier] = [];
        this.saveMonitorData[data.tier].push({[data.monName]:data.data})
      }
      console.log("this.saveMonitorData--",this.saveMonitorData)
   }
   

   setCompArgsData(data)
   {
     console.log("data--",data)
     this.compArgData = data["data"];
   }

  
   getMonitorData() {
     return  this.data;
   }

  getServerList(topoName,tierId)
  {
     let url = `${URL.GET_SERVER_LIST}`+"?topoName="+`${topoName}`+"&tierId="+`${tierId}`;
     console.log(url);
     return this._restApi.getDataByGetReq(url);
  }

  /**Method to call service to download(import) selected profile  */
  getMprof(topoName,profileName)
  {
    console.log("topo---", topoName,profileName)
    let url = `${URL.IMPORT_PROFILE}`+"?topoName="+`${topoName}`+"&profileName="+`${profileName}`+"&userName=netstorm";
    console.log("url for download--", url)
    return this._restApi.getDataByGetReq(url);
  }

   

}
