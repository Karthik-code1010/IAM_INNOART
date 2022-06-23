import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ColumnDialog } from '../column-dialog/column-dialog';
export interface PeriodicElement {
  id: string;
  name:string;
  userid:string;
  status:string;
  createdat: string;

  createdby: string;



}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 'PE00001', name: 'Aditya Chander', userid: 'aditya.chander',status:'Active', createdat: '11-09-2021 21:09:21',createdby:'Administrator'},
 
];
@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {

 
 // displayedColumns: string[] = ['id', 'name', 'userid','status', 'createdat','createdby','action'];
 // dataSource = ELEMENT_DATA;
  userdataval: any = [];
  userCount: any = 0;
  userActiveCount: any =0;
  userInActiveCount: any = 0;
  searchname:any;
  constructor(private dialog: MatDialog,public dataService: DataService,private router: Router,) { }

  ngOnInit(): void {
    this.getUserCount();
   
    this.getUserActiveCount();
    this.getUserInactiveCount();
    this.getuserData();
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });

  }
  searchUser(){
   
    console.log(this.searchname);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User&q=username=="+this.searchname).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
       
        this.userdataval = response1["data"];
       }else{
        this.getuserData()
       }
      
      });

  }
  getUserCount(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User&options=count").subscribe(
      (response2: any) => {
          this.userCount = response2["data"];
          console.log(response2)
          console.log(response2["data"]);
          console.log('list of user Count',this.userCount)
      });
      
  }
  getUserActiveCount(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
           if(response1["data"][i]["status"]["value"] == "Active"){
            this.userActiveCount++;
           }
         }

       }
      });

  }

  getUserInactiveCount(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
           if(response1["data"][i]["status"]["value"] == "In Active"){
            this.userInActiveCount++;
           }
         }

       }
      });

  }
  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'name', activeFlag: true, displayName: "Name" }, 
    // { name: 'userid', activeFlag: true, displayName: "User ID" },
    { name: 'status', activeFlag: true, displayName: "Status" },
     { name: 'createdat', activeFlag: true, displayName: "Created At" }, 
   
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
  

    getuserData(){
      console.log(this.dataService.NODE_API);
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User").subscribe(
      (response: any) => {
        this.userdataval = response["data"];
        console.log(response)
        console.log(response["data"]);
        console.log('list of user',this.userdataval)
      });
      
    }
   // dataSource =this.userdataval
   editlistOfUsers(listuserid:any)
   {
      console.log(listuserid)
      this.router.navigateByUrl('/add-user', { state: { id:listuserid  } });
   }

   goPage(page: any) {
    this.router.navigateByUrl(page);
  }
  gostorage(unameid:any){
    this.router.navigateByUrl('/identity-access', { state: { udname:unameid  } });
  }

}