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
  selector: 'app-userpermission',
  templateUrl: './userpermission.component.html',
  styleUrls: ['./userpermission.component.scss']
})
export class UserpermissionComponent implements OnInit {
  selected='User'
  userdataval: any = [];
  getUserId: any;
  userget_id: any;
  user_name: any;

  constructor(private router: Router,public dataService: DataService,) { }

  ngOnInit(): void {

    this.getuserData();

    console.log(history.state);
    this.getUserId = history.state.userId;
    this.selected = history.state.userId;
    this.userget_id = history.state.userId;

    this.getUserName(this.userget_id)

  }
  getUserName(ur_id:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User&id="+ur_id).subscribe(
      (response1: any) => {
        this.user_name = response1["data"][0]["username"]["value"]
      
      });
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
  displayedColumns: string[] = ['Analiticalhub', 'col1', 'col2', 'col3','col4'];
  dataSource = ELEMENT_DATA;

  displayedColumns2: string[] = ['col1', 'col2', 'col3', 'col4','col5'];
  data = ELEMENT_DATA2;


  goPage(page: any) {
    this.router.navigateByUrl(page);
  }
}
