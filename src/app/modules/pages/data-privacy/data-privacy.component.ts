import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { animate } from 'popmotion';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';



export interface PeriodicElement {
  columnnames: string;
  personal: string;
  public: string;
  sensitive: string;
  restricted: string;
  internal: string;
  protected: string;
  masked: string;
  encripted: string;
  consent: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {columnnames: 'Employee ID', personal: 'No', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
  {columnnames: 'Employee Name', personal: 'No', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
  {columnnames: 'Date of Birth', personal: 'No', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
  {columnnames: 'Employee PAN', personal: 'No', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
  {columnnames: 'Email Address', personal: 'yes', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
  {columnnames: 'Address', personal: 'No', public: 'No', sensitive: 'No',restricted:'No',internal:'No',protected:'No',masked:'No',encripted:'No',consent:'No'},
 
];

@Component({
  selector: 'app-data-privacy',
  templateUrl: './data-privacy.component.html',
  styleUrls: ['./data-privacy.component.scss'],
 
})
export class DataPrivacyComponent implements OnInit {
  @ViewChild('title') title!: ElementRef;
  metaDataArray: any = [];
  ngAfterViewInit() {
    animate({
      from: 'translateX(-200px)',
      to: 'translateX(0px)',
      type: 'spring',
      onUpdate: (value) => {
        this.renderer.setStyle(this.title.nativeElement, 'transform', value);
      }
    });
    
  }

  constructor(private commonService:CommonService,private dialog: MatDialog,private renderer: Renderer2,private el: ElementRef,private router: Router, private dataService: DataService,) {
   
  }
 
  ngOnInit(): void {
    this.getMetaData();
  }
  
  getMetaData(){
    console.log(this.dataService.NODE_API);
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData").subscribe(
      (response: any) => {
        this.metaDataArray = response["data"];
        console.log(response)
        console.log(response["data"]);
        console.log('karthik',this.metaDataArray)
      });
     
     
  }

  items:any = [];

  showItems() {
    this.items = ['Employee Info','Table Name1','Table Name2','Table Name3','Table Name4','Table Name5'];
  }

  hideItems() {
    this.items = [];
  }

  toggle() {
    this.items.length ? this.hideItems() : this.showItems();
   }
  displayedColumns: string[] = ['columnnames', 'personal', 'public', 'sensitive','restricted','internal','protected','masked','encripted','consent'];
  dataSource = ELEMENT_DATA;

}
