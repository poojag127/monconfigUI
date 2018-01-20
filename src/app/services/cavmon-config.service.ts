import { Http } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import {ConfigRestApiService} from './config-rest-api.service';
import * as URL from '../constants/monconfig-url-constant';
// import { MONITOR_DATA } from '../reducers/monitor-reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class CavmonConfigService {

  tierList:any[]=[];

  todos: Observable<Object>;


  dataStore:{};

  private _todos: BehaviorSubject<Object>;
  
  monCompData = new Subject<any>(); // for Monitor Components
  
  _monCompData$ = this.monCompData.asObservable();
  
  public setMonCompData(data)
  {
    console.log("setMonCompData method called")
    this.monCompData.next(data)
  }

  // private _trData: TRData;

  // public monitorsData$: BehaviorSubject<Object> = new BehaviorSubject<Object>([]);
  // public monitorsDataAsObservable$: Observable<Object> = this.monitorsData$.asObservable();

  // public monData: BehaviorSubject<Object> = new BehaviorSubject<Object>([]);

  constructor(private http: Http,private _restApi: ConfigRestApiService,private store: Store<Object>)
  { 
    this._todos = <BehaviorSubject<Object>>new BehaviorSubject([]);

    this.todos = this._todos.asObservable();

    this.dataStore = {};

    this.tierList = [
    "Cavisson",
    "Default",
    "stress-default-snbservice",
    "default-staging-searchrestapi",
    "default-default-searchrestapi",
    "prod-blue-zookeeper-main",
    "stress-kafka-mirrormaker",
    "stress-zookeeper-main",
    "stress-kafka",
    "stress-zookeeper-kafka",
    "prod-blue-zookeeper-kafka",
    "prod-blue-kafka",
    "prod-blue-hystrix",
    "stress-default-redis-tvs",
    "stress-default-ecomapi__",
    "stress-default-redis-snb",
    "prod-blue-redis-snb",
    "stress-default-ecomimport__",
    "prod-blue-redis-tvs",
    "prod-blue-mongodb-stg",
    "prod-blue-mongodb-ops",
    "stress-default-webstoreui__",
    "stress-default-searchrestapi-sl-t6wm",
    "stress-default-ecompublisher",
    "stress-default-ecomimport",
    "stress-default-ecomapi",
    "stress-default-ecomloader",
    "stress-default-zkui-vm",
    "stress-default-webstoreui",
    "-default-searchrestapi",
    "stress-default-batch-slave-vm",
    "stress-default-batch-admin-vm",
    "stress-default-batch-master-vm",
    "prod-zookeeper-main",
    "kos-stress-ecomapi",
    "kos-stress-searchrestapi",
    "profiling-zookeeper-main",
    "prod-zookeeper-kafka",
    "profiling-zookeeper-kafka",
    "prod-kafka",
    "profiling-profiling-redis-snb",
    "profiling-profiling-redis-tvs",
    "stress-default-mongodb-prd",
    "prod-kafka-mirrormaker",
    "ecom-tvs-stress-mysql",
    "-staging-searchrestapi",
    "stress-webstoreui"
  ];
}


 getTierMonitorsData(topoName,mjsonName)
 {
   let url = `${URL.GET_TIER_MONITORS_DATA}`+"?topoName="+`${topoName}`+"&jsonName="+`${mjsonName}`;
   this._restApi.getDataByGetReq(url)
      .subscribe(data => {
        this.store.dispatch({type:"MONITOR_DATA",payload:data });
      });
 }

  


  getTreeTableData() 
  {
    return this.http.get('../../assets/filesystem.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
      
  }
      //  return  this.http.get('../utility/filesystem.json')
      //           .subscribe(res => this.data = res.json());

  /** getting tier List ***/
  /*getTierList(topoName)
  {
    let url = `${URL.GET_TIER_LIST}`+"?topoName="+`${topoName}`;
    console.log(url)
    return this._restApi.getDataByPostReq(url);
  }
  */

/** for running without server **/
  getTierList(topoName)
  {
     return this.tierList;
  }


  /** For Getting all keywordData data */
  getMonitorsData(topoName) {
    
  let data = {
   "weblogic":{
     "All_Tier":[
       { "tierName":"All Tier",
       "monName":"WeblogicJdbcStats",
       "enable":false,
       "hostName":"127.0.0.1",
       "port":"17000",
       "userName":"weblogic",
       "pwd":"weblogic",
       "mBeanType":"JMSDestinationRuntimeMBean",
       "instanceName":""}],
       
       
                "Tier1":[{},{}],
                "Tier2":[{},{}],
                "Tier3":[{},{}],
                "Tier4":[{},{}]
               },
      "tomcat":{
     "All_Tier":[
       { "tierName":"All Tier",
       "monName":"WeblogicJdbcStats",
       "enable":false,
       "hostName":"127.0.0.1",
       "port":"17000",
       "userName":"weblogic",
       "pwd":"weblogic",
       "mBeanType":"JMSDestinationRuntimeMBean",
       "instanceName":""}],
       
       
                "Tier1":[{},{}],
                "Tier2":[{},{}],
                "Tier3":[{},{}],
                "Tier4":[{},{}]
               }
     }

     console.log("getMonitorsData method called")
  }

  /**** This method sends request to server for getting  *****/
  getChildNodes(categoryName,mjsonName,topoName,id)
  {
    console.log("getChildNodes method called--",event)
    let url = `${URL.GET_CHILD_NODES}`+"?categoryName="+`${categoryName}`+"&jsonName="+`${mjsonName}`+"&topoName="+`${topoName}`+"&categoryId="+`${id}`+"&userName=netstorm";
    this._restApi.getDataByGetReq(url)
      .subscribe(data => {
        let obj = {'data':data,'categoryName':categoryName}
        console.log("data--",data)
        this.store.dispatch({type:"ADD_MONITOR_DATA" , payload: obj });
      });
   }


  /*** Request used to get components data of particular Name******/
  getComponentData(monData)
  {
   console.log("getComponentData method called")
   let url = `${URL.GET_COMPONENTS}`+ "?menuDrivenJsonName="+monData['drivenJsonName']+"&userName=netstorm";
   console.log("url----",url)
   return  this._restApi.getDataByGetReq(url);
  }

  /***Send Request to Server  ****/
  sendRequestToServer(data,topoName,jsonName)
  {
    console.log("sendRequestToServer method called--",data)
    let url = `${URL.SAVE_DATA}` + "?topoName="+topoName+"&jsonName="+jsonName+"&userName=netstorm";
    let dataForServer = {"topoName":topoName,"profileName":jsonName,"data":data}
    return this._restApi.getDataByPostReq(url,dataForServer)
  }

   
 
   

}



