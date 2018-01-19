import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ROUTING_PATH } from '../../constants/monconfig-url-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  subscription:Subscription;

  constructor( private store: Store<any>,  private router: Router) {}

  ngOnInit() {
      // let obj = "Pooja";
      this.subscription = this.store.select("selectedMon")
        .subscribe(data => {
        console.log("data- monitors component ----",data)
        // let data = val["selectedMon"];
       
        })
   
  }

  openAddDialog(){
     this.router.navigate([ROUTING_PATH + '/home']);
  
  }

  ngOnDestroy()
  {
   let obj = {"tier":"T1","data":"[]","monName":"Mon1"}
   this.store.dispatch({ type:"CONFIGURED_MONDATA" ,payload:obj });    
  }

}
