import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as URL from '../constants/monconfig-url-constant';
import { ConfigRestApiService } from './config-rest-api.service';


@Injectable()
export class CavmonHomeService 
{
   
  constructor(private _restApi: ConfigRestApiService) 
  {

  }

  getTopologyList()
  {
    return this._restApi.getDataByGetReq(URL.GET_TOPO_LIST);
  }

}
