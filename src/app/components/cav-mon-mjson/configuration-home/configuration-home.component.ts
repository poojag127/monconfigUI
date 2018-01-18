import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
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

  constructor(private cavMonConfigService:CavmonConfigService,
              private router:Router,
              private route: ActivatedRoute,
              private store: Store<any>

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
    
  //  /*** getting data of tierlist,treetable data ****/
  //  this.cavMonConfigService.getTierMonitorsData(this.topoName,this.mjsonName).subscribe(data =>
  //  {
  //   this.createHeadersList(data.tierList);
  //   this.compData = data.treeTableData.data;
  //  })

  this.cavMonConfigService.getTierMonitorsData(this.topoName,this.mjsonName)
  
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
              console.log("again constructing monitorTre  table")
        if(data != null)
        {
         this.createHeadersList(data["data"]["tierList"]);
         this.compData = data["data"]["treeTableData"]["data"];
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

 onCheckBoxChange(event)
 {
   console.log("onCheckBoxChange method called--",event)
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

  saveMonitorsConfigurationData() {
    console.log("saveMonitorsConfigurationData method called",this.compData)
    

  }
  
}
