import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-tableview',
  templateUrl: './dynamic-tableview.component.html',
  styleUrls: ['./dynamic-tableview.component.css']
})

export class DynamicTableviewComponent implements OnInit {

  @Input()
  columnData: any[];

  /****holds the header data of the table */
  cols: any[]=[];

  addEditMJsonDialog:boolean = false;

  constructor() { }

  ngOnInit() {
    console.log("columnData--",this.columnData)
    let that = this;
    this.columnData.map(function(each)
    {
      console.log("each--",each)
      that.cols.push({"field":each.label,"header":each.label})
    })
  }

 
   openAddDialog(){

   }


  openEditDialog(){

  }

}
