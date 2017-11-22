import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import {ConfigRestApiService} from './config-rest-api.service';
import * as URL from '../constants/monconfig-url-constant';


@Injectable()
export class CavmonConfigService {

  constructor(private http: Http,private _restApi: ConfigRestApiService)
  { 

  }

  getTreeTableData() 
  {
    return this.http.get('../../assets/filesystem.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
      
      //  return  this.http.get('../utility/filesystem.json')
      //           .subscribe(res => this.data = res.json());
  }

  /** getting tier List ***/
  getTierList(topoName)
  {
    let url = `${URL.GET_TIER_LIST}`+"?topoName="+`${topoName}`;
    console.log(url)
    return this._restApi.getDataByPostReq(url);

  }



}
