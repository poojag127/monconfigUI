import { Component, OnInit ,Input} from '@angular/core';
import { ImmutableArray } from '../../../utility/immutable-array';


@Component({
  selector: 'app-dynamic-tableview',
  templateUrl: './dynamic-tableview.component.html',
  styleUrls: ['./dynamic-tableview.component.css']
})

export class DynamicTableviewComponent implements OnInit {

  @Input()
  columnData: any[];

  @Input()
  disabled:boolean;

  /****holds the header data of the table */
  cols: any[]=[];

  isNewRow:boolean;

  addEditDialog:boolean;

  tableData:any[]=[];

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
     console.log("openAddDialog method called")
     this.isNewRow = true;
     this.addEditDialog = true;
   }


  openEditDialog(){

  }

  saveData(){
    console.log("saveData method called",this.columnData)
    console.log("this.cols",this.cols)
    this.addEditDialog = false;
    let data={};
    this.columnData.map(function(each)
    {
      data[each.label] = each.value;
    })
    console.log("data--",data)

     //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
     this.tableData=ImmutableArray.push(this.tableData, data);
  }

}
