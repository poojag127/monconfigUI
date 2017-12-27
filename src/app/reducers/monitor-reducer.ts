import { ActionReducer, Action } from '@ngrx/store';
import { cloneObject } from '../utility/monconfig-utility';
import { MonitorsData } from '../containers/monitors-data';

export const MONITOR_DATA = "monitorData";

const initialState = {data:{},
                     openNewAppDialog:false,  //initializing varia
                     appDetailInitializeForm:null,
                     openAppDialogType:null,
                     ndConfPath:null
                   };
  
//Default Keyword data.
const DEFAULT_DATA = { 
 "weblogic":{'JDBCStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'JVMStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'ThreadPoolStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'SessionStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'JMSQueueStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'MinThreadConstraintStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}],
            'TransactionStats':[{'tierName':'All Tier','monName':'WeblogicJdbcStats','enable':false,'hostName':'127.0.0.1','port':'17000','userName':'weblogic','pwd':'weblogic','mBeanType':'JMSDestinationRuntimeMBean','instanceName':''}]
          }
}

 export function MonitorReducer(state:{}, action: Action) {
   console.log("reducer called--",action)
    switch (action.type) {
        case MONITOR_DATA:
            console.log("action.payload", action.payload);
            console.log("DEFAULT_DATA",DEFAULT_DATA)
            var newState = Object.assign({}, state);
            newState= action.payload
            return cloneObject(newState);

        // case "updateWeblogic":
        //  console.log("updateWeblogic reducder--")
        //  var newState = Object.assign({}, state);
        //  console.log("newState--",newState.data)
        //  console.log("action.payload--",action.payload)
        //  var monitorsData = newState.data;
        //  let payloadData = action.payload;
        //  let newData = payloadData[Object.keys(payloadData)[0]];

        //  let tierName = Object.keys(payloadData)[0];
        //  let tierBasedData = [];

        //  /****If that tier is configured any monitor */
        //  if(monitorsData.hasOwnProperty(tierName))
        //  {
        //   tierBasedData = monitorsData[Object.keys(payloadData)[0]];
        //   console.log("newData--",newData.length)
        //   var i,j;

        //   for(i=0;i<newData.length;i++)
        //   {
        //    let num2:number = tierBasedData.length;
        //    for(j=0;j<=num2;j++)
        //    {
        //      if(j == num2)
        //      {
        //       tierBasedData.push(newData[i])
        //      }
        //      else if(newData[i].monName == tierBasedData[j].monName)
        //      {
        //       tierBasedData[j] = newData[i];
        //       break;
        //      }
        //    } 
        //   }
        //  }
        //  else
        //  {
        //    monitorsData[tierName] = newData;
        //  }
        // console.log("monitorsData--",newState)
        // return cloneObject(newState)

        default:
            // returns DEFAULT_DATA;

        
    }
}