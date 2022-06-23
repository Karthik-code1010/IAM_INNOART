import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { ColumnDialog } from '../column-dialog/column-dialog';
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
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accountOrganization: any = [];
  rowData: any;
  rowBool: boolean= false;
  themeData: any;
  searchname:any = ''
  constructor(private dialog: MatDialog,private commonService:CommonService, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAccountData();
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });
  }
  getSearch(){
    console.log(this.searchname);
    if(this.searchname ==''){
      this.getAccountData();
    }
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Organization&q=legalName=="+this.searchname).subscribe(
      (response: any) => {
        console.log(response["data"]);
        if(response["data"].length > 0){
          this.accountOrganization = response["data"]
        }else{
          this.getAccountData();
        }
      
       
      });


  }
  getAccountData(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Organization").subscribe(
      (response: any) => {
        console.log(response["data"]);
        this.accountOrganization = response["data"]
       
      });

  }
 

  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'groupname', activeFlag: true, displayName: "Type" }, 
    { name: 'status', activeFlag: true, displayName: "Name" },
   
    { name: 'createdat', activeFlag: true, displayName: "Created At" },
     { name: 'updatedat', activeFlag: true, displayName: "Modified At" }, 
     { name: 'createdby', activeFlag: true, displayName: "created by" }, 
     { name: 'action', activeFlag: true, displayName: "action" }
    
    ];


 // displayedColumns: string[] = ['id', 'groupname', 'status', 'createdat','updatedat','createdby','action'];
  dataSource = ELEMENT_DATA;
  account_dialog(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { allColumns: 'sk'};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: "150px", right: '10px' }

    const dialogRef = this.dialog.open(AccountDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result == "object") {
        this.setColumn1(result);
      }
    });
  }
  settingClick1() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { allColumns: this.allColumns };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: "150px", right: '10px' }

    const dialogRef = this.dialog.open(ColumnDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
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


  editAccount(aid:any)
  {
    console.log(aid);
    this.router.navigateByUrl('/create-accounts', { state: { accountEditId:aid  } });


  }
  getRowRecord(row:any){
    this.rowBool = true;
    console.log(row)
    console.log(row.id);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Organization&id="+row.id).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
      this.rowData = response1["data"][0]

      console.log(this.rowData);
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=ThemeSetting&q=refAccountID=="+row.id).subscribe(
        (response2: any) => {
          this.themeData = response2["data"][0];
        }
        );
        
       }
      });

  }

       
  goPage(page: any) {
    this.router.navigateByUrl(page);
  }
  goToLink(url: string){
    window.open(url, "_blank");
}
 
}
