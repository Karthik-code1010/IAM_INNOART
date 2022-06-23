import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { AddgroupnameDialogComponent } from '../addgroupname-dialog/addgroupname-dialog.component';
import { ColumnDialog } from '../column-dialog/column-dialog';
import { DialogService } from '../dialog.service';


export interface PeriodicElement {
  id: string;
  groupname:string;
  status:string;
  createdat: string;
  updatedat: string;
  createdby: string;



}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 'PE00001', groupname: 'User', status: 'Active', createdat: '11-09-2021 21:09:21',updatedat:'11-19-2021 21:09:21',createdby:'Administrator'},
 
];

@Component({
  selector: 'app-list-of-group',
  templateUrl: './list-of-group.component.html',
  styleUrls: ['./list-of-group.component.scss']
})
export class ListOfGroupComponent implements OnInit {
  listGroupVal: any = [];
  searchGroup: any;
  constructor(private dialog2: MatDialog,public dataService: DataService,private router: Router,) { }

 
  ngOnInit(): void {

    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });

    this.getListGroupData();
  }

  searchGroupName(){
    console.log(this.searchGroup);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserGroup&q=groupname=="+this.searchGroup).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
       
        this.listGroupVal = response1["data"];
       }else{
        this.getListGroupData()
       }
      
      });
  }
 // displayedColumns: string[] = ['id', 'groupname', 'status', 'createdat','updatedat','createdby','action'];
  //dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'groupname', activeFlag: true, displayName: "Name" }, 
 
   
    { name: 'status', activeFlag: true, displayName: "Status" },
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
  
      const dialogRef = this.dialog2.open(ColumnDialog, dialogConfig);
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
  

  addgroupDialogbox() {
    this.dialog2
    .open(AddgroupnameDialogComponent, {
      data:'',
      width: '600px',
      disableClose: true,
    })
    .afterClosed();
  }

  getListGroupData(){
    console.log(this.dataService.NODE_API);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserGroup").subscribe(
    (response: any) => {
      this.listGroupVal = response["data"];
      console.log(response)
      console.log(response["data"]);
      console.log('list of Group',this.listGroupVal)
    });

  }

  editGroupName(gname_id:any){
    console.log(gname_id)
    this.dialog2
      .open(AddgroupnameDialogComponent, {
        data:gname_id,
        width: '600px',
        disableClose: true,
      })
      .afterClosed();

  }
  goPage(page: any) {
    this.router.navigateByUrl(page);
  }


}
