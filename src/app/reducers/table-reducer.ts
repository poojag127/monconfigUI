import { cloneObject } from '../utility/monconfig-utility';
import { ActionReducer, Action } from '@ngrx/store';
import { MonitorsData } from '../containers/monitors-data';
import * as _ from "lodash";


const initialState = {data:[],
                      
                     
                   };

 export function TableReducer(state:{}, action: Action) 
 {
    console.log("TableReducer Reduer called",action)
    switch (action.type)
    {
      case "TABLE_DATA":
       console.log("action.payload--",action.payload)
       var newState = Object.assign({},state)
       newState["tableObj"] = action.payload;
       console.log("newState--",newState)
       return newState;
      

        default:
            // returns {}};

        
    }
}