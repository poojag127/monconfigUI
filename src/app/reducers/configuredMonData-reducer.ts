import { cloneObject } from '../utility/monconfig-utility';
import { ActionReducer, Action } from '@ngrx/store';
import { MonitorsData } from '../containers/monitors-data';
import * as _ from "lodash";

export const SELECTED_MON = "configuredData";

const initialState = {data:[],
                      
                     
                   };

 export function ConfiguredMonDataReducer(state:{}, action: Action) {
    console.log("reducer called--configured mon Data----data reducer--",action)
    switch (action.type) {
        // case "CONFIGURED_MONDATA":
        //  var newState = Object.assign({},state);
        //  console.log("CONFIGURED_MONDA{TA switch case",newState)
        //  let tierObj = [],tierUIObj = [];
        //  let monObj = [];
        //  let tierName = action.payload.tier;
        //  let monName = action.payload.monName;
        //  let data = action.payload.data;
        // //  var newData = _.map(data, function(o) { return _.omit(o, 'arguments'); });

        //  let configureUIData = newState["configuredUIData"];
        //  tierUIObj = _.find(configureUIData,function(each) { return each.hasOwnProperty(tierName)})
        //  if(tierUIObj == null)
        //  {
        //    let obj = {[tierName]:[{[monName]:data}]};
        //    if(configureUIData == null)
        //      configureUIData = [];

        //    configureUIData.push(obj);
        //  }
        //  else{
        //      tierUIObj[tierName] = data;
        //  }
        //  console.log("configureUIData--",configureUIData)

        //  /*******For server side data***********/         
        //  console.log("action.payload data--",action.payload)
        //  let configuredData = newState["configuredData"];
        //  tierObj = _.find(configuredData,function(each) { return each.hasOwnProperty(tierName)})
        // //  console.log("tierObj--",tierObj)
        //  if(tierObj == null )
        //  {
        //    let obj = {[tierName]:[{[monName]:data}]};
        //    if(configuredData == null)
        //       configuredData = [];
              
        //    configuredData.push(obj);
        //  }
        //  else
        //  {
        //    monObj =  _.find(tierObj,function(each) { return each.hasOwnProperty(monName)})
        //    monObj[monName] = data;
        //  }
        //  console.log("configuredData--",configuredData)
        //  console.log("monObj--",monObj)

        //  newState["configuredUIData"]=configureUIData ;
        //  newState["configuredData"] = configuredData;
        //  console.log("newState--",newState)
        //     return cloneObject(newState);

        default:
            // returns {}};

        
    }
}