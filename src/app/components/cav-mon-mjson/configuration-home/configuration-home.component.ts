import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { CavmonMonitorsdataService } from '../../../services/cavmon-monitorsdata.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from "lodash";
import { ROUTING_PATH } from '../../../constants/monconfig-url-constant';
// import {ProfileData} from '../../../containers/profile-data';
import {MJsonData} from '../../../containers/mjson-data';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { SELECTED_MON } from '../../../reducers/monitor-comp-reducer';

@Component({
  selector: 'app-configuration-home',
  templateUrl: './configuration-home.component.html',
  styleUrls: ['./configuration-home.component.css']
})

export class ConfigurationHomeComponent implements OnInit 
{

  subscription: Subscription;

  compData:TreeNode[];

  selectedMonitor:TreeNode[];

  cols: any[];

  topoName:String;

  mjsonName :String;

  monName :String; //variable to hold monitor name 

  tierfield:String; //variable to hold tier name for each monitor

  tierList: any[];

  selectedRow: TreeNode;

  dynamicKey:any[]=[];

  ROUTING_PATH = ROUTING_PATH;

  tierId:number;

  tierName:string;

  tempObj:{}={};  //used for contructing data to send to the server

  checkBoxStateArr:any[]=[]; //used for storing state of checkboxes at tier level



  constructor(private cavMonConfigService:CavmonConfigService,
              private router:Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private cavMonDataService:CavmonMonitorsdataService

             )
  {

  }

  ngOnInit()
  {
   this.cols=[];
   this.route.params.subscribe((params: Params) => {
     console.log("params--",params)
      this.topoName = params['topoName'];
      this.mjsonName = params['mjsonName'];
    });
    
  // //  /*** getting data of tierlist,treetable data ****/
  //  this.cavMonConfigService.getTierMonitorsData(this.topoName,this.mjsonName).subscribe(data =>
  //  {
  //   this.createHeadersList(data.tierList);
  //   this.compData = data.treeTableData.data;
  //  })

  
  // this.cavMonConfigService.todos.subscribe(data => {
  //       console.log("data---",data)
  //     if(data.hasOwnProperty("tierList"))
  //     {
  //     this.createHeadersList(data["tierList"]);
  //     this.compData = data["treeTableData"]["data"];
  //     }
  // });

  // this.createHeadersList(data["tierList"]);
  // this.compData = data["treeTableData"]["data"];

  //  this.cavMonConfigService.monitorsDataAsObservable$.subscribe((val)=> {
  //    console.log("val--",val)
  //     this.createHeadersList(val["tierList"]);
  //     this.compData = val["treeTableData"]["data"];
  // })

 
   this.subscription = this.store.select("monitorData")
            .subscribe(data => {
              console.log("again constructing monitorTre  table",data)
        if(data != null)
        {
        console.log("data----",data)
         this.createHeadersList(data["data"]["tierList"]);
         this.compData = data["data"]["treeTableData"]["data"];
        }
        else
        {
          this.cavMonConfigService.getTierMonitorsData(this.topoName,this.mjsonName)
        }
      })


 /*** This piece of code is for running project without server ****/
  /* let data = this.cavMonConfigService.getTierList(this.topoName)
   this.tierList = data;
   let that = this;
   data.forEach((function(val){
      that.cols.push({field:val ,header :val})
    }));
   this.getData();


   this.cols = [
            {field: 'monitor' ,header:'Monitor'},
            {field: 'stresshle-blue-accservice',header:'stresshle-blue-accservice'},
            {field: 'stresshle-kafka-mirrormaker',header:'stresshle-kafka-mirrormaker'},
            {field: 'stresshle-bluecopy-searchrestapi',header:'stresshle-bluecopy-searchrestapi'},
            {field: 'stresshle-blue-snbservice-prod',header:'stresshle-blue-snbservice-prod'},
            {field:'stresshle-blue-batch-slave-vm',header:'stresshle-blue-snbservice-prod'},
            {field:'stresshle-blue-tvsecompublisher',header:'stresshle-blue-snbservice-prod'},
            {field:'stresshle-main-zk',header:'stresshle-blue-snbservice-prod'}
        ];
        */
  }

 

  /***Function used to create header list array for treetable component *****/
  createHeadersList(tierList)
  {
    if(tierList != null)
    {
    console.log("tierList--",tierList)
     let that = this;
     tierList.forEach((function(val){
      that.cols.push({field:val.id ,header :val.name})
     }));
    }
  }

 
  getData()
  {
    let that = this;
    this.cavMonConfigService.getTreeTableData().then(data =>
     {
       data.map(function(val)
       {
         val.data["monitorState"] = false;
         that.tierList.map(function(eachTier)
         {
           //adding Tier to parent monitor node
          val.data[eachTier] = false;
          // that.createKeyForCheckBox(val.data.monitor,eachTier)

           if(val.hasOwnProperty('children'))
           {
           //adding Tier to children monitor node
           val.children.map(function(eachChildNode)
           {
            eachChildNode.data["monitorState"] = false;
            eachChildNode.data[eachTier] = false
            // that.createKeyForCheckBox(eachChildNode.data.monitor,eachTier)
           }
          )
          }
         }
        ) 
       })
       this.compData = data;
      })
  }

  onChangeCheckbox()
  {
    console.log("onChangeCheckbox method called")
  }

  createKeyForCheckBox(monitorName,TierName)
  {
    let key = monitorName + TierName;
    let obj = {[key] : false}
    this.dynamicKey.push(obj);
  }

  loadNode(event)
  {
    console.log("event---",event)
    if(event.node) {
      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      if(event.node.children.length == 0)
         this.cavMonConfigService.getChildNodes(event.node.data.monitor,this.mjsonName,this.topoName,event.node.data.id);
    }
  }

 nodeUnselect(event)
 {
   
   let monitorName = event.node.data.monitor;
   let that = this;
   for(let each in event.node.data)
   {
    if(each != "monitor")
     event.node.data[each] = false;
   }
 }

 onCheckBoxChange(value,tierName,monitorName)
 {
   console.log("onCheckBoxChange method called--",value)
   console.log("tierName--",tierName)
   console.log("monName-- ", monitorName)
 
   let key = monitorName + tierName;
   console.log("key---" ,key)

   let isEntryExist:boolean = false;
   let temp = this.checkBoxStateArr;
   for(let i = 0;i < temp.length; i++)
   {
     if(Object.keys(temp[i])[0] == tierName)
     {
       isEntryExist = true;
       temp[i] = value;
       break;
     }
   }

   if(!isEntryExist)
   {
     let obj = {[key]:value}
     this.checkBoxStateArr.push(obj)
   }
   console.log("this.checkBoxStateArr--",this.checkBoxStateArr)
 }

  /*** for advance settings ***/
  advanceSettings(monData,tierId,tierName)
  {
    let monName = monData["monitor"];
    console.log("monData--",monData)
    console.log("monName",monName)
    if(monData["monitor"].startsWith('Weblogic'))
    {
      this.router.navigate(['../../../weblogicSettings',this.mjsonName,this.topoName,monName,tierId,tierName],{ relativeTo: this.route });
    }
    else
    {
      console.log("monData--",monName)
      console.log("advanceSettings mthod called--",monData['compArgJson'])
      let compData = '';
      if(!monData.hasOwnProperty("compArgJson"))
      {
       this.cavMonConfigService.getComponentData(monData).subscribe(data => {
         console.log("data ---",data)
        //  routeToMonitorComp(obj);
        let obj = {'data':data,'id':monData["id"]}
        this.store.dispatch({type:"ADD_COMPONENTS_DATA",payload: obj });
        this.router.navigate(['../../../advanceSettings',this.mjsonName,this.topoName,monName,tierId,tierName],{ relativeTo: this.route });
       })   
      }
      else
      {
       compData = monData['compArgJson'];
       let obj = {'data':compData,'id':monData["id"]}
       this.store.dispatch({type:"ADD_COMPONENTS_DATA",payload: obj });
       this.router.navigate(['../../../advanceSettings',this.mjsonName,this.topoName,monName,tierId,tierName],{ relativeTo: this.route });
      }
      // this.store.dispatch({type:SELECTED_MON ,payload:compData})
    }
  }

  onTreeNodeCheckBoxChange(rowData)
  {
    for(let each in rowData.data)
    {
     if(each != 'monitor')
     {
      rowData.data[each] = this.getValueOfTierCheckBox(rowData.data);
      console.log(this.getValueOfTierCheckBox(rowData.data))
     }
    }
  }

/*** returns tier checkbox value true or false**************/
  getValueOfTierCheckBox(data) 
  {
   return data["monitorState"];
  }


/**
 * This method used to construct the data send that is used to send to the server
 * Here 
 * configuredData =  {
      "TierName": [
                    {
                      "MQMonitor":[
                             {
                             "serverName": "10.10.50.5",
                              "instanceName": "abc",
                              "enabled": "true",
                              "app": [
                                  {
                                   "appName": "default",
                                   "options": "-m…."
                                 }
                               ]
                            },
                            {

                            }]
  
  * ServerRequiredData as:
                {
   "T1": {"IBMMQStats":
                      {
                      "isEnabled":true,
			                "serverDTOList":[{serverName :"",
			                                  excludeServer :"",
								                        instanceName :"",
								                       isEnable :"true",
								                      appDTOList:[{ appName = "default",options = "",javaHome = "",classPath = ""}]
								                },
								             {
				                     serverName :"",
			                       excludeServer :"",
								             instanceName :"",
								             isEnable :"true",
								            appDTOList:[{ appName = "default",options = "",javaHome = "",classPath = ""}]
								          }								 
								       ]
				      			},						
			 "IBMMQStats2":
			         {
                "isEnabled":true,
			          "serverDTOList":[{
				          serverName :"",
			             excludeServer :"",
								   instanceName :"",
								   isEnable :"true",
								   appDTOList:[{ appName = "default",options = "",javaHome = "",classPath = ""}]
								 },
								 {
				                   serverName :"",
			                       excludeServer :"",
								   instanceName :"",
								   isEnable :"true",
								   appDTOList:[{ appName = "default",options = "",javaHome = "",classPath = ""}]
						          }							 
								]}
		}
							  

}
     


 */
  saveMonitorsConfigurationData()
  {
   console.log("treeTableData---",this.compData)
   console.log(" this.checkBoxStateArr---", this.checkBoxStateArr)
   let configuredData = Object.assign({},this.cavMonDataService.saveMonitorData);
   console.log("configuredData--",configuredData)
   let that = this;
   let newTierData = {};
   for (var key in configuredData)
   {
     console.log("configuredData--",configuredData)
     console.log("")
     console.log("configuredData[key]--",configuredData[key])
     let monList = configuredData[key];
     console.log("monList--",monList)
     monList.map(function(each)
     {
     console.log("each--iterating monlist---",each)
     let monName = Object.keys(each)[0];
     
     let serverConfList = each[monName];

     console.log("serverConfList--",serverConfList.length)

     serverConfList.map(function(eachServerConf)
     {
       console.log("eachServerConf----",eachServerConf)
     
     /****Here key = serverName ,enabled ***/
       let key = eachServerConf["serverName"]+ ","+ true;
     
       if(!that.tempObj.hasOwnProperty(key))
           that.tempObj[key] = [];

        that.tempObj[key].push(eachServerConf);
       })

      let serverMonList = that.createEachConfObject() 
      each[monName] = {"isEnabled":true,"serverDTOList":serverMonList};  //here value for isEnabled is enabling/disabling for tier
      console.log("each- after modifying---",each)
      newTierData[key] = each ;
     })
     console.log("newTierData--",newTierData)
    //  configuredData = newTierData;
   }
   console.log("configuredData------------",newTierData)
   this.sendRequestToServer(newTierData);
  }


  /****/
  sendRequestToServer(configuredData)
  {
   console.log("sendRequestToServer method called")
   this.cavMonConfigService.sendRequestToServer(configuredData,this.topoName,this.mjsonName).subscribe(data =>{

   })
  }
  


  createEachConfObject()
  {
    let serverMonList = [];
    console.log(" this.tempObj--", this.tempObj)
    for(var key in this.tempObj)
    {
     let obj = {};
     let arrValues = key.split(",");
     obj["serverName"] = arrValues[0];
     obj["isEnabled"] = arrValues[1];
     obj["appDTOList"] = [];
     
     let valueData = this.tempObj[key];
     valueData.map(function(each){
       console.log("each-Conf Data-----",each)
       let appObj = {"appName":each["appName"],"options":each["options"]}
       obj["appDTOList"].push(appObj);
     })
     serverMonList.push(obj);
    }
    return serverMonList;
  }
}
