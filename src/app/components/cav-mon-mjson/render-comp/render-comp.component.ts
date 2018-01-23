import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-render-comp',
  templateUrl: './render-comp.component.html',
  styleUrls: ['./render-comp.component.css']
})
export class RenderCompComponent implements OnInit {

  @Input()
  item:Object;

  @Input()
  disabled:boolean;

  @Output()
  updateTableVal = new EventEmitter();


  constructor() { }

  ngOnInit() 
  {
    console.log("Class RenderCompComponent called ")
    if(this.item["type"] == 'Checkbox') 
       this.item["value"] = this.item["value"] == "true"
  }

  /**
   * This method used to send data to parent componnet monitors.component
   * @param data 
   */

  updateTableValue(data)
  {
   console.log("renderCompData Method Called tableData--",data)
   this.updateTableVal.emit(data)
  }

}
