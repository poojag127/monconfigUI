import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CavmonConfigService } from '../../../services/cavmon-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {

  subscription: Subscription;
  
  tierField:string;

  monName:string;

  /***It holds array of object of component Type ****/
  compArgs:any[];

  constructor( private router:Router,
               private route: ActivatedRoute,
               private cavMonConfigService:CavmonConfigService,
               private store: Store<any>     
               )
   { }


  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.tierField = params['tierfield'];
      this.monName = params['monName'];
     
    });
    let that = this;
    this.subscription = this.store.select("selectedMon")
            .subscribe(data => {
      console.log("data--",data)
      if(data != null)
      {
        this.compArgs = data["data"];
      }
    })
  }


  saveData() {

    console.log("function calleed",this.compArgs)
  }



}
