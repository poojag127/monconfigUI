import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cav-mon-home-right-pane',
  templateUrl: './cav-mon-home-right-pane.component.html',
  styleUrls: ['./cav-mon-home-right-pane.component.css']
})
export class CavMonHomeRightPaneComponent implements OnInit {

  constructor(private router: Router) 
  { 
    
  }

  ngOnInit()
  {

  }

}
