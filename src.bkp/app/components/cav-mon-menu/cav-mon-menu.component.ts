import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-cav-mon-menu',
  templateUrl: './cav-mon-menu.component.html',
  styleUrls: ['./cav-mon-menu.component.css']
})
export class CavMonMenuComponent implements OnInit {

  @Input() navMenu: Object = [];

  constructor() { }

  ngOnInit() 
  {
    
  }

}
