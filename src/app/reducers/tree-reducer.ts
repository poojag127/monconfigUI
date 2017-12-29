import { ActionReducer, Action } from '@ngrx/store';
import { cloneObject } from '../utility/monconfig-utility';
import { MonitorsData } from '../containers/monitors-data';

export const MONITOR_DATA = "monitorData";
export const ADD_CHILD_NODES = "addChildNodes";

const initialState = {data:{},
                     openNewAppDialog:false,  //initializing varia
                     appDetailInitializeForm:null,
                     openAppDialogType:null,
                     ndConfPath:null
                   };
  


 export function MonitorReducer(state:{}, action: Action) {
   console.log("reducer called--",action)
   switch (action.type) {
     case MONITOR_DATA:
        console.log("action.payload", action.payload);
        var newState = Object.assign({}, state);
        newState= action.payload
        return cloneObject(newState);

     case "ADD_MONITOR_DATA":
       console.log("add child nodes reducer")
       var newState = Object.assign({}, state);
       console.log("newState--",newState)
       console.log("payload---",action.payload)
       let treeData = newState["treeTableData"];
 
       
       return cloneObject(newState);

      


        

        default:
            // returns DEFAULT_DATA;

        
    }
}