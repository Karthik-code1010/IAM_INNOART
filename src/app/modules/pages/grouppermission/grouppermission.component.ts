import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
export interface PeriodicElement {
  analyticlist: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {analyticlist: 'Analytic Hub List',},
  {analyticlist: 'Workflow List',},
  {analyticlist: 'Analytic Hub List',},
  {analyticlist: 'Analytic Hub List',},
  {analyticlist: 'Analytic Hub List',},
 
 
];

export interface PeriodicElement2 {
  name: string;

}

const ELEMENT_DATA2: PeriodicElement2[] = [
  { name: 'Incident List', },
  { name: 'Incident Time Line', },
  { name: 'Task List', },
  { name: 'My Task', },
  
 
];

@Component({
  selector: 'app-grouppermission',
  templateUrl: './grouppermission.component.html',
  styleUrls: ['./grouppermission.component.scss']
})
export class GrouppermissionComponent implements OnInit {
  groupPerId: any;
  group_name: any;
  
  constructor(private router: Router,public dataService: DataService,) { }

  ngOnInit(): void {
    console.log(history.state)
    this.groupPerId = history.state.group_Id
    console.log(this.groupPerId)

    this.getGroupName(this.groupPerId);


    
    if(this.groupPerId == undefined){
      this.router.navigateByUrl('/list-of-group');

    }
  }
  getGroupName(gid:any){

    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserGroup&id="+gid).subscribe(
      (response1: any) => {
        if(response1["data"].length > 0){
          this.group_name = response1["data"][0]["groupname"]["value"]

          console.log('group name',this.group_name)

        }
      
      
      });
  }

  displayedColumns: string[] = ['Analiticalhub', 'col1', 'col2', 'col3','col4'];
  dataSource = ELEMENT_DATA;

  displayedColumns2: string[] = ['col1', 'col2', 'col3', 'col4','col5'];
  data = ELEMENT_DATA2;
}
