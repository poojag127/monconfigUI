import { cloneObject } from '../utility/monconfig-utility';
import { ActionReducer, Action } from '@ngrx/store';
import { MonitorsData } from '../containers/monitors-data';

export const SELECTED_MON = "selectedMon";

const initialState = {data:[]
                     
                   };

 export function MonitorCompReducer(state=initialState, action: Action) {
    console.log("reducer called--method comp reducer--",action)
    switch (action.type) {
        case SELECTED_MON:
            console.log("action.payload", action.payload);
            var newState = Object.assign({}, state);
            newState.data= action.payload;
            console.log("newState--",newState)
            return cloneObject(newState);

        default:
            // returns {}};

        
    }
}