import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import * as BREADCRUMB from '../../constants/monconfig-breadcrumb-constant';

@Component({
  selector: 'app-cav-mon-breadcrumb',
  templateUrl: './cav-mon-breadcrumb.component.html',
  styleUrls: ['./cav-mon-breadcrumb.component.css']
})
export class CavMonBreadcrumbComponent implements OnInit {

  items: MenuItem[];
  constructor() { }

  ngOnInit() 
  {
     this.items = [{ routerLink: [BREADCRUMB.URL.HOME], label: BREADCRUMB.LABEL.HOME }];
  }

}
