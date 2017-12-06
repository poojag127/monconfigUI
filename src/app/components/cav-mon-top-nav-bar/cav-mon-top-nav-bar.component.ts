import { Component, OnInit } from '@angular/core';
import {Message, ConfirmationService} from 'primeng/primeng';
import {ConfigUtilityService} from '../../services/config-utility.service';

@Component({
  selector: 'app-cav-mon-top-nav-bar',
  templateUrl: './cav-mon-top-nav-bar.component.html',
  styleUrls: ['./cav-mon-top-nav-bar.component.css']
})
export class CavMonTopNavBarComponent implements OnInit {

  
  constructor(private monConfigUtilityService: ConfigUtilityService) {}

    message: Message[] = [];

  ngOnInit() 
  {
    this.monConfigUtilityService.messageProvider$.subscribe(data=> this.message = data);
  }


}
