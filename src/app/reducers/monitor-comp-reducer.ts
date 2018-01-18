import { cloneObject } from '../utility/monconfig-utility';
import { ActionReducer, Action } from '@ngrx/store';
import { MonitorsData } from '../containers/monitors-data';

export const SELECTED_MON = "selectedMon";

const initialState = {data:[],
                      configuredData:[]
                     
                   };

 export function MonitorCompReducer(state=initialState, action: Action) {
    console.log("reducer called--method comp reducer--",action)
    switch (action.type) {

        case "ADD_COMPONENTS_DATA":  //same reducer called 
            console.log("action.payload", action.payload);
            var newState = Object.assign({}, state);
            newState.data= action.payload.data;
            console.log("newState--in selecte mon reducer--",newState)
            return cloneObject(newState);

        case "CONFIGURED_MONDATA":
         console.log("CONFIGURED_MONDA{TA switch case")
         var newState = Object.assign({},state);
         console.log("action.payload data--",action.payload)
         return cloneObject(newState);
           
       
       
        default:
            // returns {}};

        
    }
}