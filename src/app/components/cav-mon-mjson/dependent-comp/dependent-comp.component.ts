import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-dependent-comp',
  templateUrl: './dependent-comp.component.html',
  styleUrls: ['./dependent-comp.component.css']
})

export class DependentCompComponent implements OnInit {

  @Input()
  dependentCompData: any[];

  @Input()
  disabled:boolean;

  constructor() { }

  ngOnInit() {
  }

}
