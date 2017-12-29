import { ActionReducer, Action } from '@ngrx/store';
import { cloneObject } from '../utility/monconfig-utility';
import { MonitorsData } from '../containers/monitors-data';
import * as _ from "lodash";

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

     case "ADD_MONITOR_DATA":
       var newState = Object.assign({}, state);
       let treeTableData = newState["treeTableData"]["data"];
       let nodeData = _.find(treeTableData, function(each) { return each['data']['monitor'] == action.payload.categoryName});
       nodeData['children'] = action.payload.data;
       console.log("newState--",newState)
       return cloneObject(newState);

     

        default:
            // returns DEFAULT_DATA;

        
    }
}