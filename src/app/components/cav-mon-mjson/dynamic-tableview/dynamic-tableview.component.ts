import { Component, OnInit ,Input ,Output, EventEmitter} from '@angular/core';
import { ImmutableArray } from '../../../utility/immutable-array';


@Component({
  selector: 'app-dynamic-tableview',
  templateUrl: './dynamic-tableview.component.html',
  styleUrls: ['./dynamic-tableview.component.css']
})

export class DynamicTableviewComponent implements OnInit {

  @Input()
  tableCompData: {};

  @Input()
  disabled:boolean;

  @Output()
  updateTableVal = new EventEmitter();

  columnData:any[]= [];

  /****holds the header data of the table */
  cols: any[]=[];

  isNewRow:boolean;

  addEditDialog:boolean;

  tableData:any[]=[];

  constructor() { }

  ngOnInit() {
    console.log("columnData--", this.tableCompData["columnData"])
    this.columnData = this.tableCompData["columnData"];
    let that = this;
    this.columnData.map(function(each)
    {
      console.log("each--",each)
      that.cols.push({"field":each.arg,"header":each.label})
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
      console.log("each-row---",each)
      data[each.arg] = each.value;
    })
  
    console.log("data--",data)

     //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
     this.tableData=ImmutableArray.push(this.tableData, data);
     console.log(" this.tableData--" ,this.tableData)
     let obj = {"data":this.tableData,"id":this.tableCompData["id"]}
     this.updateTableVal.emit(obj);
  }
}
