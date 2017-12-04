import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from "lodash";
import { ROUTING_PATH } from '../../../constants/monconfig-url-constant';
import {ProfileData} from '../../../containers/profile-data';
import {MJsonData} from '../../../containers/mjson-data';

@Component({
  selector: 'app-configuration-home',
  templateUrl: './configuration-home.component.html',
  styleUrls: ['./configuration-home.component.css']
})

export class ConfigurationHomeComponent implements OnInit 
{
  compData:TreeNode[];

  selectedMonitor:TreeNode[];

  cols: any[];

  topoName:String;

  jsonName :String;


  monName :String; //variable to hold monitor name 

  tierfield:String; // variable to hold tier name for each monitor

  tierList: any[];

  selectedRow: TreeNode;

  dynamicKey:any[]=[];

  constructor(private cavMonConfigService:CavmonConfigService,
             private router:Router,
             private route: ActivatedRoute)
  {

  }

  ngOnInit()
  {
  this.cols=[];
   this.route.params.subscribe((params: Params) => {
      this.topoName = params['topoName'];
      this.jsonName = params['jsonName']
    });

   console.log("topoName--",this.topoName)
   let that = this;
  //  this.cavMonConfigService.getTierList(this.topoName).subscribe(data =>
  //      {
  //       this.tierList = data;
  //       data.forEach((function(val){
  //        that.cols.push({field:val ,header :val})
  //       }
        
  //   ))
  //   that.getData();
  //  })


  let data = this.cavMonConfigService.getTierList(this.topoName)
  this.tierList = data;
  data.forEach((function(val){
      that.cols.push({field:val ,header :val})
    }));
  this.getData();

    


 /*  this.cols = [
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

  getData()
  {
    let that = this;
    this.cavMonConfigService.getTreeTableData().then(data =>
      {
       console.log("data---",data)
       data.map(function(val)
       {
         val.data["monitorState"] = false;
         that.tierList.map(function(eachTier)
         {
           //adding Tier to parent monitor node
          val.data[eachTier] = false;
          console.log("val--",val.data[eachTier])
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

//   nodeSelect(event)
//   {
//    console.log("event--",event)
//    let monitorName = event.node.data.monitor;
//    console.log(monitorName);
//    let that = this;
//    for(let each in event.node.data)
//    {
//      console.log("each--",each)
//      if(each != "monitor")
//         event.node.data[each] = true;
//    }
//   console.log("dynamickey-",this.dynamicKey)
//  }

 nodeUnselect(event)
 {
   console.log("event--",event)
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



/** for advance settings */
  advanceSettings(monName,tierfield)
  {
     this.router.navigate([ROUTING_PATH + '/advanceSettings',monName,tierfield]);
  }

  onTreeNodeCheckBoxChange(rowData)
  {
    console.log("rowData--",rowData)
    for(let each in rowData.data)
    {
     if(each != 'monitor')
     {
        rowData.data[each] = this.getValueOfTierCheckBox(rowData.data);
        console.log(this.getValueOfTierCheckBox(rowData.data))
     }
    }
    console.log("rowData-- aftr modified",rowData)
  }

/*** returns tier checkbox value true or false**************/
  getValueOfTierCheckBox(data)
  {
   return data["monitorState"];
  }
  
}
