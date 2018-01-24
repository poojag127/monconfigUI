import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';


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

  @Output()
  updateTableVal = new EventEmitter();

  constructor() { }

  ngOnInit() 
  {
    console.log("Class DependentCompComponent called ")

  }

  updateTableValue(data)
  {
   this.updateTableVal.emit(data);
  }

}
