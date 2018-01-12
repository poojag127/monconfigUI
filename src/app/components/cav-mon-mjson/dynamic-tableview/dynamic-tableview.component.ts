import { Component, OnInit ,Input ,Output, EventEmitter} from '@angular/core';
import { ImmutableArray } from '../../../utility/immutable-array';
import {ConfigUtilityService} from '../../../services/config-utility.service';

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

   /**Used to hold temporary id of the selected row ,used in edit functionality */
   tempId:number = 0;

  constructor(private monConfigUtilityService:ConfigUtilityService) { }

  ngOnInit() {
    console.log("columnData--", this.tableCompData["columnData"])
    this.columnData = this.tableCompData["columnData"];
    let that = this;
    this.columnData.map(function(each)
    {
      that.cols.push({"field":each.arg,"header":each.label})
    })
  }

 
  /** For ADD Functionality- 
   * This method is used to show ADD Dialog for adding new entries in the dataTable
   */
   openAddDialog(){
     console.log("openAddDialog() method called")
     this.isNewRow = true;
     this.addEditDialog = true;

     /****** to clear fields value used in add form ******/
     this.columnData.map(function(each){
       each.value = '';
     })
   }


 /** For EDIT Functionality-
  * This method is used to show EDIT Dialog for editing existing entries in the dataTable 
  */
  openEditDialog(){
    console.log("openEditDialog method called",this.selectedJson );
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
    
    this.tempId =  this.selectedJson[0]["id"];  
    console.log("this.tempId--",this.tempId)

    let that = this;
    this.columnData.map(function(each)
    {
      each.value = that.selectedJson[0][each.arg]
    })

    this.isNewRow = false;
    this.addEditDialog = true;
  }


/** For SAVE Functionality-
  * This is common method used to submit and save data when ADD/EDIT is performed
  */
  saveData(){
    console.log("saveData() Method called")
    this.addEditDialog = false;
    let data = {};

    /**** creating row object for table from the fields of form ****/
    this.columnData.map(function(each)
    {
      data[each.arg] = each.value;
    })
    console.log("Data added--", data)

    /***Check for ADD/EDIT operation **/
    if (this.isNewRow)
    {
      data["id"] = this.count;
      //to insert new row in table ImmutableArray.push() is created as primeng 4.0.0 does not support above line 
      this.tableData=ImmutableArray.push(this.tableData, data); //adding new entries in the datatable when ADD is performed
      this.count = this.count + 1;
    }
    else
    {
      data["id"] = this.tempId; //assign temporary id
      this.tableData=ImmutableArray.replace(this.tableData, data , this.getSelectedRowIndex(data))
    }
    this.selectedJson = [];

    /****clearing the form fields after use (safer side code)*/
    this.columnData.map(function(each)
     {
       each.value = '';
     })
  }


  /**This method returns selected row on the basis of Id */
   getSelectedRowIndex(data): number 
   {
    let index = this.tableData.findIndex(each => each["id"] == this.tempId)
    return index;
  }

 
 /** For DELETE Functionality-
  * This method is used to delete entries of the dataTable 
  */
  deleteData()
  {
   console.log("deleteData() method called" , this.selectedJson)
   if (this.selectedJson.length == 0) 
    {
     this.monConfigUtilityService.errorMessage("No record is present to delete");
     return;
    }

    let arrId = [];
    this.selectedJson.map(function(each)
    {
      arrId.push(each.id)
    })

    this.tableData = this.tableData.filter(function(val)
    {
      return arrId.indexOf(val.id) == -1;  //value to be deleted should return false
    })
    /**clearing object used for storing data ****/
    this.selectedJson = [];
  }
}
