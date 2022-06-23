import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ColumnDialog } from '../column-dialog/column-dialog';
export interface PeriodicElement {
  id: string;
  fieldname:string;
  compliance:string
  status:string;
  createdat: string;
  updatedat: string;
  createdby: string;



}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 'FL00001', fieldname: 'Email Address',compliance:'GDPR, PII, HIPPA', status: 'Active', createdat: '11-09-2021 21:09:21',updatedat:'11-19-2021 21:09:21',createdby:'Administrator'},
 
];

@Component({
  selector: 'app-list-of-fields',
  templateUrl: './list-of-fields.component.html',
  styleUrls: ['./list-of-fields.component.scss']
})
export class ListOfFieldsComponent implements OnInit {


 // displayedColumns: string[] = ['id', 'fieldname','compliance','status', 'createdat','updatedat','createdby','action'];
  dataSource = ELEMENT_DATA;
  listFieldVal: any = [];
  searchFields:any;
  
 
  constructor(private dialog: MatDialog,private router: Router,public dataService: DataService,) { }

  ngOnInit(): void {
    this.getDataField();
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });
  }
  searchFieldsName(){
     
    console.log(this.searchFields);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=GlobalDataPrivacy&q=field1=="+this.searchFields).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
       
        this.listFieldVal = response1["data"];
       }else{
        this.getDataField()
       }
      
      });

  }
  getDataField(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=GlobalDataPrivacy").subscribe(
      (response: any) => {
        this.listFieldVal = response["data"];
        console.log(response)
        console.log(response["data"]);
        console.log('list of Group',this.listFieldVal)
      });
  }
  editFieldvalue(fieldid:any){
    console.log(fieldid); 

    this.router.navigateByUrl('/global-data', { state: { id:fieldid  } });

  }
  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'fieldname', activeFlag: true, displayName: "Field Name" }, 
    { name: 'compliance', activeFlag: true, displayName: "Comliance" },
   
    // { name: 'status', activeFlag: true, displayName: "Status" },
     { name: 'createdat', activeFlag: true, displayName: "Created At" }, 
     { name: 'updatedat', activeFlag: true, displayName: "Updated At" }, 
     { name: 'createdby', activeFlag: true, displayName: "Created By" },
  
     { name: 'action', activeFlag: true, displayName: "Action" }
    
    ];
   
   
    settingClick1() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { allColumns: this.allColumns };
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = { top: "150px", right: '10px' }
  
      const dialogRef = this.dialog.open(ColumnDialog, dialogConfig);
      dialogRef.afterClosed().subscribe((result:any) => {
        if (typeof result == "object") {
          this.setColumn1(result);
        }
      });
    }
    setColumn1(selColumn:any) {
      this.allColumns = [];
      this.displayedColumns = [];
      selColumn.forEach((element:any) => {
        this.allColumns.push(element);
        if (element.activeFlag) {
          this.displayedColumns.push(element.name);
        }
      });
      console.log(this.displayedColumns)
    }

    
   goPage(page: any) {
    this.router.navigateByUrl(page);
  }

  



}
