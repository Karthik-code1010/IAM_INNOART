import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-addgroupname-dialog',
  templateUrl: './addgroupname-dialog.component.html',
  styleUrls: ['./addgroupname-dialog.component.scss']
})
export class AddgroupnameDialogComponent implements OnInit {
  groupname: any = '';
  statusid: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private commonService:CommonService,private dataService: DataService,) {}

  ngOnInit(): void {
    console.log('this.data',this.data);
    this.setGroupNameValue();
  }
  setGroupNameValue(){
    if(this.data != ''){

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserGroup&id="+this.data).subscribe(
        (response2: any) => {

        this.groupname = response2["data"][0]["groupname"]["value"]
      
      
      });

     }
     else{
      this.groupname = '';
     }

  }
  addgroup(){
    console.log('Clicked');
   
   
    if(this.data != '' &&this.groupname!='' ){

      var post_val3 =  {
        "groupname": {
          "type": "Property",
          "value": this.groupname
        
      }, 
             
      }
  
    console.log(post_val3);
    this.dataService.patchData(post_val3, this.dataService.NODE_API + '/api/service/entities/'+this.data+'/UserGroup').subscribe((response7: any) => {
      window.location.reload();
      this.commonService.triggerToast({ type: 'success', title: "", msg: "Group name successfullty updated.." })
    })


    }else{
      if(this.data == ''&& this.groupname!=''){
        console.log('new section');
  
        console.log(this.groupname);
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=CommonDataSetHeader&q=name==Status").subscribe(
          (response: any) => {
          
            console.log(response["data"])
            console.log(response["data"][0]["id"]);
  
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=CommonDataSetDetail&q=refCommonDataSetHeader=="+response["data"][0]["id"]).subscribe(
               (response2: any) => {
          
                 console.log('commondetail',response2["data"])
                 console.log(response2["data"][0]["id"]);
                for(var i=0;i<response2["data"].length;i++){
                  if(response2["data"][i]["name"]["value"]=='Active'){
                    console.log(response2["data"][i]["name"]["value"]);
                    this.statusid = response2["data"][i]["id"];
                    console.log('statusis=> ',this.statusid);
  
                  }
  
                }
                var post_val = {
                  "type":"UserGroup",
                  "groupname": {
                         "type": "Property",
                         "value": this.groupname
                      
                     },
                     "status": {
                         "type": "Relationship",
                         "value": this.statusid
                       
                     },
                     "refAccountID": {
                         "type": "Relationship",
                         "value": ""
                       
                     },
                     "createdBy":{
                          "type": "Property",
                          "value": ""
                     },
                     "modifiedBy":{
                          "type": "Property",
                          "value": ""
                     }
                      }
       
             console.log(post_val);
             this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response3: any) => {
              
               console.log('User addeddd');
               console.log('used added response',response3);
              window.location.reload();
               this.commonService.triggerToast({ type: 'success', title: "", msg: "Group name successfullty added.." })
              // this.router.navigateByUrl("list-of-group");
             
             });
   
            
           
            
               });
  
  
  
  
              
  
  
  
  
           
            
          });
  
  
      }
      else{
        console.log('empty');
        this.commonService.triggerToast({ type: 'error', title: "", msg: "Please type group name" });
      }

    }
   

  
  }
}
