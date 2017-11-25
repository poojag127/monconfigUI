import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
        data.forEach((function(val){
         that.cols.push({field:val ,header :val})
        }
    ))
   })

   this.cavMonConfigService.getTreeTableData().then(data => this.compData = data)
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



}
