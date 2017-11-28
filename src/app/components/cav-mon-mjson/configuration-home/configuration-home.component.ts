import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from "lodash";

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
  //  this.cols = [{field: 'monitor' ,header:'Monitor'}];
  this.cols=[];
   this.route.params.subscribe((params: Params) => {
      this.topoName = params['topoName'];
      this.jsonName = params['jsonName']
    });

   console.log("topoName--",this.topoName)
   let that = this;
   this.cavMonConfigService.getTierList(this.topoName).subscribe(data =>
       {
        this.tierList = data;
        data.forEach((function(val){
         that.cols.push({field:val ,header :val})
        }
    ))
   })

   this.cavMonConfigService.getTreeTableData().then(data =>
     {
      console.log("data---",data)
      data.map(function(val)
      {
        that.tierList.map(function(eachTier)
        {
          //adding Tier to parent monitor node
          val.data[eachTier] = "configure";
          that.createKeyForCheckBox(val.data.monitor,eachTier)
          
       
          

          //adding Tier to children monitor node
          val.children.map(function(eachChildNode)
          {
            eachChildNode.data[eachTier] = "configure";
            that.createKeyForCheckBox(eachChildNode.data.monitor,eachTier)
          }
         )
        }
       ) 
      })
      this.compData = data
     } 
    )
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

  nodeSelect(event)
  {
    console.log("this.dynamickey--",this.dynamicKey)
   console.log("event--",event)
   let monitorName = event.node.data.monitor;
   console.log(monitorName);
   let that = this;
   _.forEach(event.node.data, function(value, key) {
    console.log(key);
    let node = monitorName + key;
    console.log(node)
    that.dynamicKey.map(function(each)
    {
      if(each.hasOwnProperty(node))
      {
        each[node] = true;
      }
    })
  });
  console.log("dynamickey-",this.dynamicKey)
 }

 nodeUnselect(event)
 {
   console.log("unselecting the event--",event)
 }



}
