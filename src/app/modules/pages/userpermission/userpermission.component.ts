import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['Analiticalhub', 'col1', 'col2', 'col3','col4'];
  dataSource = ELEMENT_DATA;

  displayedColumns2: string[] = ['col1', 'col2', 'col3', 'col4','col5'];
  data = ELEMENT_DATA2;


  goPage(page: any) {
    this.router.navigateByUrl(page);
  }
}
