import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { animate } from 'popmotion';

import styler, { Styler } from 'stylefire';
import { blub, fadeOut } from 'src/app/animations';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { CommonService } from 'src/app/common.service';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-identity-access',
  templateUrl: './identity-access.component.html',
  styleUrls: ['./identity-access.component.scss'],
  animations: [fadeOut, blub],
})
export class IdentityAccessComponent implements OnInit {
  @ViewChild('title') title!: ElementRef;
  metaDataArray: any = [];
  //orderStatusList: any;
 
 // @ViewChild('subtitle') subtitle!: ElementRef;
 //subtitle
 selected = 'Metadatastore';
 displayedColumns: string[] = ['listoftables', 'tableaccess', 'columnaccess'];
 //dataSource = ELEMENT_DATA;
 clickedRows = new Set<PeriodicElement>();

 displayedColumns2: string[] = ['columnname',  'column-restriction', 'status'];
 data = ELEMENT_DATA2;
 clickedRows2 = new Set<PeriodicElement2>();
  columndata: any = [];
   clist:any = [];
  columnidval: any = '';
  circlecolor: boolean= false;
  dialogtableid: any;
 fieldnamearray:any=[];
  currenttable_name: any;
  enalblecheckbox: any =[];
  colcheck:any =[];

  searchMetaData:any;
  searchColumn:any = '';
  unamedis: any;

   old_temp:any = []
  user_id: any;

  
  userTableAD:FormControl = new FormControl({}, []);
  //  clist:any = [{
  //   "type": "Property",
  //   "value": "deviceId",
  //   "createdAt": "2022-05-26T14:01:23.769Z",
  //   "modifiedAt": "2022-05-26T14:01:23.769Z"
  // },{
  //   "type": "Property",
  //   "value": "deviceId",
  //   "createdAt": "2022-05-26T14:01:23.769Z",
  //   "modifiedAt": "2022-05-26T14:01:23.769Z"
  // }];
  constructor(private commonService:CommonService,private dialog: MatDialog,private renderer: Renderer2,private el: ElementRef,private router: Router, private dataService: DataService,) {
   
  }
 
  
  confirmCancelDialog() {
    this.dialog
      .open(DialogboxComponent, {
        data:{table_id:this.dialogtableid,user_id:this.user_id},
        width: '1400px',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed();
   
  }

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
 displayusername:any

  ngOnInit(): void {
    this.getMetaData();
    console.log('history.state',history.state);
    this.displayusername = history.state

    this.user_id = this.displayusername.uname_id
    console.log(' this.user_id ',this.user_id);
    this.getUserNameDb();


    this.getAllowDeny(this.user_id);
  }

  getUserNameDb(){
    console.log(this.displayusername.udname)
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User&id="+this.displayusername.uname_id).subscribe(
      (response2: any) => {
       if(response2["data"].length>0){
       
        this.unamedis = response2["data"][0]["username"]["value"];
       }
      });

  }
  searchMetaDataName(){
    console.log(this.searchMetaData);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&q=tableName=="+this.searchMetaData).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
       
        this.metaDataArray = response1["data"];
       }else{
        this.getMetaData();
       }
      
      });

  }
  
  searchColumnNameVal(){
    console.log(this.searchColumn);
    console.log(this.columndata);
   
   
    console.log(' this.old_temp ', this.old_temp)
    var temparray = [];
    if(this.searchColumn == ''){
      this.columndata = this.old_temp;
    }

    for(var i=0;i<this.columndata.length;i++){
      if(this.columndata[i]["value"]==this.searchColumn){
        temparray.push(this.columndata[i]);
        this.columndata = temparray;
        console.log('search col',this.columndata);
      }else{
        this.columndata = this.old_temp;
      }
    }
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
  getAllowDeny(usr_id:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessTable&q=refUserId=="+usr_id).subscribe(
      (response3: any) => {
      if(response3["data"].length > 0)  {
        console.log('UserData-Access table',response3["data"]);
      }
      });

  }
  changeDennyClick(tableid:any,tname:any){


    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessTable&q=refTableMetaData=="+tableid+";refUserId=="+this.user_id).subscribe(
      (response3: any) => {
      if(response3["data"].length > 0)  {
        console.log(tableid);
        console.log(tname);
        var post_val1 =  {
          "status": {
            "type": "Property",
            "value": "Active"
        }  ,
        "refUserId": {
          "type": "Relationship",
          "value": this.user_id
        
      }, 
               
     }
    
      console.log(post_val1);
      this.dataService.patchData(post_val1, this.dataService.NODE_API + '/api/service/entities/'+response3["data"][0]["id"]+'/UserDataAccessTable').subscribe((response1: any) => {
       
       console.log('denny',response1)
    
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Table Now In Active" })
      
      });
       

      }else{
        var post_val =  {
          "type":"UserDataAccessTable",
          "refAccountID": {
                     "type": "Relationship",
                     "value": ""
                   
                 },
          "refUserId": {
                     "type": "Relationship",
                     "value": this.user_id
                   
                 },
         "refApplicationId": {
                     "type": "Relationship",
                     "value": ""
                   
                 },
          "refTableMetaData": {
                     "type": "Relationship",
                     "value": tableid
                   
                 },
          "refOrganizationID": {
                  "type": "Relationship",
                  "value": ""
                },
          "tableName":{
                   "type": "Property",
                     "value": tname
             },
          "status":{
                   "type": "Property",
                     "value": "Active"
             }
            
               
     }
    
      console.log(post_val);
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
       
       console.log('denny',response1)
    
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Table created and status is inactive" })
      
      });

       

      }
       
      });

      const el:any = document.getElementById(tableid);
      el.style.display = 'none';

   

  }
  allowClick(tableid:any,tname:any){


    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessTable&q=refTableMetaData=="+tableid+";refUserId=="+this.user_id).subscribe(
      (response3: any) => {
      if(response3["data"].length > 0)  {
        console.log(tableid);
        console.log(tname);
        var post_val1 =  {
          "status": {
            "type": "Property",
            "value": "In Active"
        },
        "refUserId": {
          "type": "Relationship",
          "value": this.user_id
        
      }, 
               
     }
    
      console.log(post_val1);
      this.dataService.patchData(post_val1, this.dataService.NODE_API + '/api/service/entities/'+response3["data"][0]["id"]+'/UserDataAccessTable').subscribe((response1: any) => {
       
       console.log('denny',response1)
    
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Table Now Active" })
      
      });
       

      }else{
        var post_val =  {
          "type":"UserDataAccessTable",
          "refAccountID": {
                     "type": "Relationship",
                     "value": ""
                   
                 },
          "refUserId": {
                     "type": "Relationship",
                     "value": this.user_id
                   
                 },
         "refApplicationId": {
                     "type": "Relationship",
                     "value": ""
                   
                 },
          "refTableMetaData": {
                     "type": "Relationship",
                     "value": tableid
                   
                 },
          "refOrganizationID": {
            "type": "Relationship",
            "value": ""
          },
          "tableName":{
                   "type": "Property",
                     "value": tname
             },
          "status":{
                   "type": "Property",
                     "value": "In Active"
             }
            
               
     }
    
      console.log(post_val);
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
       
       console.log('denny',response1)
    
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Table created and  Now Active" })
      
      });

       

      }
       
      });

      const el:any = document.getElementById(tableid);
      el.style.display = 'block';

  }




  columnready(tid:any,tname:any){

    this.dialogtableid = tid;
    this.currenttable_name = tname;
    console.log(tid)
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+tid).subscribe(
      (response: any) => {
        //this.columndata = response["data"];
        if(response["data"].length>0){
          this.clist=[];
          this.columndata = [];
          this.colcheck =[];
          console.log(response)
          console.log(response["data"]);
         this.columnidval = response["data"][0]["id"]
       
          console.log('column',this.columndata)
      
        
          Object.entries(response["data"][0]).forEach(([key, value], index) => {
  
            if (key.indexOf("field", 0) == 0) {
              console.log('key',key);
              console.log('value',value);
              var val:any = value;
              val["checked"]=new FormControl(false);
              console.log('val',val)
            
              this.clist.push(val);
            }
          })
  
          console.log('clist',this.clist)
          this.columndata=this.clist;
          console.log('kkllklk',this.columndata);

          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessColumns&q=refTableMetaData=="+ this.dialogtableid+";status==Active;refUserId=="+this.user_id).subscribe(
            (responseColumn: any) => {
              console.log(this.metaDataArray)
              console.log('this.dialogtableid',this.dialogtableid)
               //var cindex = this.metaDataArray.indexOf(this.dialogtableid)
              var cindex=  this.metaDataArray.findIndex((i:any) => i.id === this.dialogtableid)
              console.log('cindex',cindex);
              // this.metaDataArray[cindex]["columid"] =  responseColumn['data'][0]['id'];
              if(responseColumn['data'].length > 0){
                localStorage.setItem('currentColumnId',  responseColumn['data'][0]['id']);

                this.enalblecheckbox = responseColumn['data'][0];
                console.log('this.enalblecheckbox',this.enalblecheckbox)
                Object.entries(this.enalblecheckbox).forEach(([key, value], index) => {
                  if (key.indexOf("field", 0) == 0) {
                    this.colcheck.push(value);
                  }

                })
                console.log('colcheck',this.colcheck);
             
            for(var i=0;i<this.colcheck.length;i++){
              for(var j=0;j<this.columndata.length;j++){
                if(this.colcheck[i]["value"]==this.columndata[j]["value"]){
                  console.log('j=>',this.columndata[j]["value"])
                  this.columndata[j]["checked"] = new FormControl(true);

                }
              }

            }

              }else{
                localStorage.setItem('currentColumnId','');

              }
             
            
              

             

            });
            this.old_temp = this.columndata

        console.log(' this.columndata', this.columndata)

        }else{
          this.clist=[];
          this.columndata = [];

        }
       
       
       
        
  
   

      });
    

  }
  checkboxchange(e:any,fieldname:any){
  console.log(e);
    console.log(fieldname);
   

      const checked = e.checked; 
      console.log(checked)// stored checked value true or false
      if (checked) {
        if(this.fieldnamearray.indexOf(fieldname) === -1) {
          this.fieldnamearray.push(fieldname);
          console.log(this.fieldnamearray);
          }// push the Id in array if checked
         } 
         else {
        this.fieldnamearray.forEach((value: any,index: any)=>{
          if(value==fieldname) this.fieldnamearray.splice(index,1);
         });// Then remove
       }

       console.log('this.fieldnamearray',this.fieldnamearray);

  }
  checkbool:any;
  clearcheckbox(){
   // this.checkbool=false;
    this.fieldnamearray=[];
    this.router.navigateByUrl('/list-of-user');

  }

  columelementaccess(){
    console.log('save btn function',this.metaDataArray)


    console.log(this.fieldnamearray);
    var colarray = [];
   // if(this.fieldnamearray.length > 0){


    var ls_col_id =   localStorage.getItem('currentColumnId');
    if(ls_col_id != ''){
      var post_val3 =  {
        "status": {
          "type": "Property",
          "value": "In Active"
      }   
             
      }
  
    console.log(post_val3);
    this.dataService.patchData(post_val3, this.dataService.NODE_API + '/api/service/entities/'+ls_col_id+'/UserDataAccessColumns').subscribe((response7: any) => {
     
     console.log('denny',response7)
  
     // this.commonService.triggerToast({ type: 'success', title: "", msg: "Old Column Access Now In-Active" })


      
    var  feildIndex =0;
    var postObj:any = {
   "type": "UserDataAccessColumns",

  "tableName": {
      "type": "Property",
      "value": this.currenttable_name
    
  },
  "status": {
      "type": "Property",
      "value": "Active"
     
  },
  "refAccountID": {
      "type": "Relationship",
      "value": ""
  },
  "refOrganization": {
      "type": "Relationship",
      "value": ""
    
  },
  "refUserId": {
      "type": "Relationship",
      "value":this.user_id
    
  },
  "refApplicationId": {
      "type": "Relationship",
      "value": ""
  
  },
  "refTableMetaData": {
      "type": "Relationship",
      "value": this.dialogtableid
  
  },

    }
    console.log('Colum Checkbox data', this.columndata)

   this.columndata.forEach((element:any) => { 

    if(element.checked.value){
      feildIndex = feildIndex + 1;

      postObj["field" + feildIndex] = {

        "type": "Property",

        "value": element.value}
      }
      })
    
      

      console.log(postObj);
      this.dataService.postData(postObj, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
       
        console.log('colum Acees data',response1)
        var colum_acc_id = response1['data']['id']
        var colum_acc_name = response1['data']['tableName']['value'];
        localStorage.setItem('currentColumnId',response1['data']['id']);
     
    // var cindex = this.metaDataArray.indexOf(this.dialogtableid)
    //    this.metaDataArray[cindex]["columid"] = colum_acc_id;
    

         
      console.log('Table Meta Data',this.metaDataArray)
         this.commonService.triggerToast({ type: 'success', title: "", msg: "New Column access Active" })
       
       });


    
    });

    }

    if(ls_col_id == ''){
      
    var  feildIndex =0;
    var postObj:any = {
   "type": "UserDataAccessColumns",

  "tableName": {
      "type": "Property",
      "value": this.currenttable_name
    
  },
  "status": {
      "type": "Property",
      "value": "Active"
     
  },
  "refAccountID": {
      "type": "Relationship",
      "value": ""
  },
  "refOrganization": {
      "type": "Relationship",
      "value": ""
    
  },
  "refUserId": {
      "type": "Relationship",
      "value": this.user_id
    
  },
  "refApplicationId": {
      "type": "Relationship",
      "value": ""
  
  },
  "refTableMetaData": {
      "type": "Relationship",
      "value": this.dialogtableid
  
  },

    }
    console.log('Colum Checkbox data', this.columndata)

   this.columndata.forEach((element:any) => { 

    if(element.checked.value){
      feildIndex = feildIndex + 1;

      postObj["field" + feildIndex] = {

        "type": "Property",

        "value": element.value}
      }
      })
    
      

      console.log(postObj);
      this.dataService.postData(postObj, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
       
        console.log('colum Acees data',response1)
        var colum_acc_id = response1['data']['id']
        var colum_acc_name = response1['data']['tableName']['value'];
        localStorage.setItem('currentColumnId',response1['data']['id']);
     
    // var cindex = this.metaDataArray.indexOf(this.dialogtableid)
    //    this.metaDataArray[cindex]["columid"] = colum_acc_id;
    

         
      console.log('Table Meta Data',this.metaDataArray)
         this.commonService.triggerToast({ type: 'success', title: "", msg: "New Column access Active" })
       
       });

    }
   



  //  }
  }
  togglechanged(){
    console.log('toggle ', this.columnidval);

    if(this.columnidval!=''){
      this.circlecolor = true;

      var post_val1 =  {
        "status": {
          "type": "Property",
          "value": "In Active"
      }   
             
      }
  
      console.log(post_val1);
      this.dataService.patchData(post_val1, this.dataService.NODE_API + '/api/service/entities/'+this.columnidval+'/UserDataAccessColumns').subscribe((response1: any) => {
       
       console.log('denny',response1)
    
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Old Column Access Now InActive" })
      
      });
  
      

    }

   
  }
  



}
export interface PeriodicElement2 {
  columnname: string;
  datatype: string;
 
}
const ELEMENT_DATA3 = [];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {columnname: 'Employee ID', datatype: 'string'},
  {columnname: 'Employee Name', datatype: 'string'},
  {columnname: 'Employee Date of Birth', datatype: 'string'},
  {columnname: 'Employee PAN', datatype: 'string'},
  {columnname: 'Employee Email Address', datatype: 'string'},
  {columnname: 'Address', datatype: 'string'},
  {columnname: 'UAN Number', datatype: 'integer'},
  {columnname: 'PF Number', datatype: 'string'},
  {columnname: 'Gross Salary', datatype: 'integer'},
  {columnname: 'Bank Account Number', datatype: 'string'},
 
];
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Employee info'},
  { name: 'Table Name1'},
  { name: 'Table Name2'},
  { name: 'Table Name3'},
  { name: 'Table Name4'},
  { name: 'Table Name5'},
  { name: 'Table Name6'},
  { name: 'Table Name7'},
  { name: 'Table Name8'},
  { name: 'Table Name9'},
  { name: 'Table Name10'},
  { name: 'Table Name11'},
 


];
export interface PeriodicElement {
  name: string;
 
}
