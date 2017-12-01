import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import {ConfigRestApiService} from './config-rest-api.service';
import * as URL from '../constants/monconfig-url-constant';


@Injectable()
export class CavmonConfigService {

  tierList:any[]=[];

  constructor(private http: Http,private _restApi: ConfigRestApiService)
  { 
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
]

  }

  getTreeTableData() 
  {
    return this.http.get('../../assets/filesystem.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
      
      //  return  this.http.get('../utility/filesystem.json')
      //           .subscribe(res => this.data = res.json());
  }

  // /** getting tier List ***/
  // getTierList(topoName)
  // {
  //   let url = `${URL.GET_TIER_LIST}`+"?topoName="+`${topoName}`;
  //   console.log(url)
  //   return this._restApi.getDataByPostReq(url);

  // }

  getTierList(topoName)
  {
     return this.tierList;

  }



}
