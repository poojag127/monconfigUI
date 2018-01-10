import { Component, OnInit ,Input} from '@angular/core';
import { ImmutableArray } from '../../../utility/immutable-array';
import {ConfigUtilityService} from '../../../services/config-utility.service';

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

  /**holds the header data of the table */
  cols: any[]=[];

  /**Flag for ADD/EDIT options of the dynamic dataTable */ 
  isNewRow:boolean;

  /** Flag for ADD/EDIT dialog box */
  addEditDialog:boolean;

  /** Used to store dataTable data */
  tableData:any[]=[];

   /** Used to hold selected row data of the dataTable **/
   selectedJson:any[] = [];

   /**Counter for ADD/EDIT  */
   count: number = 0;

  constructor(private monConfigUtilityService:ConfigUtilityService) { }

  ngOnInit() {
    console.log("columnData--",this.columnData)
    let that = this;
    this.columnData.map(function(each)
    {
      console.log("each--",each)
      that.cols.push({"field":each.label,"header":each.label})
    })
  }

 
  /** For ADD Functionality- 
   * This method is used to show ADD Dialog for adding new entries in the dataTable
   */
   openAddDialog(){
    console.log("this.select===",this.selectedJson)
     console.log("openAddDialog() method called")
     this.isNewRow = true;
     this.addEditDialog = true;
     let that = this;
     console.log("this.columnDta--",this.columnData)
     this.cols.map(function(eachField){
       if(that.selectedJson.hasOwnProperty("eachField"))
       {
        that.selectedJson[eachField]="";
       }
     })
     console.log("this.select=aftr creating new obj==",this.selectedJson)
   }


 /** For EDIT Functionality-
  * This method is used to show EDIT Dialog for editing existing entries in the dataTable 
  */
  openEditDialog(){
    console.log("openEditDialog method called");
    if (!this.selectedJson || this.selectedJson.length < 1) 
    {
      this.monConfigUtilityService.errorMessage("No row is selected to edit");
      return;
    }
    else if (this.selectedJson.length > 1)
    {
      this.monConfigUtilityService.errorMessage("Select a single row to edit");
      return;
    }
    this.isNewRow = false;
    this.addEditDialog = true;
  }

//   /** For DELETE Functionality-
//   * This method is used to delete entries of the dataTable 
//   */
//   deleteData(){
//   console.log("deleteData() method is called")
//   if (this.selectedJson.length == 0) 
//   {
//     this.monConfigUtilityService.errorMessage("No record is present to delete");
//     return;
//   }

//   for (let i = 0; i < this.tableData.length; i++)
//   {
//     let index = this.tableData.indexOf(this.selectedJson[i]); //getting index of checked row

//     if (index != -1) 
//     {
//       this.tableData = ImmutableArray.splice(this.tableData, index, 1);
//       this.selectedJson = ImmutableArray.splice(this.selectedJson, i, 1);
//       i = i - 1;
//     }
//   }
// }


/** For SAVE Functionality-
  * This is common method used to submit and save data when ADD/EDIT is performed
  */
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
     if (this.isNewRow)
     {
       console.log("this.isNewRow---",this.isNewRow)
       data["id"]=this.count;
       this.tableData=ImmutableArray.push(this.tableData, data);
       this.count = this.count + 1;
       console.log("Count Value is ---",this.count)
     }
     else
     {
       console.log("this.isNewRow---",this.isNewRow)
       console.log("Dataa ------ ^^^", data)
       this.tableData=ImmutableArray.replace(this.tableData, data , this.getSelectedRowIndex())
     }
} 


/**This method returns selected row on the basis of Id */
getSelectedRowIndex(): number {
  for (var i = 0; i < this.selectedJson.length; i++)
  {
    let index = this.tableData.indexOf(this.selectedJson[i]);
    return index;
  }
 }


 deleteData()
 {
   console.log("deleteData() method called")
   console.log("this.selectedJson",this.selectedJson)

   if (this.selectedJson.length == 0) 
    {
     this.monConfigUtilityService.errorMessage("No record is present to delete");
     return;
    }

    let arrId = [];
    console.log("this.selctedJsiojn--",this.selectedJson)
    arrId.push(this.selectedJson["id"]);
    console.log("this.tableData---",this.tableData,this.selectedJson['id'])
    this.tableData = this.tableData.filter(function(val){
      console.log("Value of Val=== ", arrId.indexOf(val.id) == -1);
        return arrId.indexOf(val.id) == -1;  //value to be deleted should return false
        
    })
    console.log("TableData ----- ", this.tableData)

 }

}
