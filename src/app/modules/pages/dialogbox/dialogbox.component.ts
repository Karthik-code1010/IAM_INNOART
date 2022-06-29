import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  productForm!: FormGroup;
  clist: any=[];
 
  columnidval: any;
  columndata: any = [];
  metaData: any= [];
  selectGrossSal: any = '';
  meta_table_id: any;
  usert_id: any;
  fliedlist: any = [];
  //and_or:FormControl = new FormControl({}, []);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private dataService: DataService,private commonService:CommonService,private router: Router,) {
    this.columndatadropdown();
    this.productForm = this.fb.group({
    
      quantities: this.fb.array([]) ,
    });
 
  

    console.log('Dialog Table Id',data);
    this.getRowAccessData(data.table_id,data.user_id)

    this.meta_table_id = data.table_id;
    this.usert_id = data.user_id;
  }
  ngOnInit(): void {
  
  }
  getRowAccessData(metaDataid:any,user_id:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessRows&q=refUserId=="+user_id+";refTableMetaData=="+metaDataid+";status==Active").subscribe(
      (response3: any) => {
        console.log('row data restriction',response3["data"])
        if(response3["data"].length > 0){
        
          // this.productForm.controls['quantities'].setValue([
          //   {
          //     "gross": "",
          //     "price": "==",
          //     "sal": "60000",
          //     "and_or": "AND"
          //   },
          //   {
          //     "gross": "",
          //     "price": "==",
          //     "sal": "90000",
          //     "and_or": "AND"
          //   }
          // ]);
          console.log(this.productForm)
          Object.entries(response3["data"][0]).forEach(([key, value], index) => {
  
            if (key.indexOf("field", 0) == 0) {
              console.log('key',key);
              console.log('value',value);
              var val:any = value;
            
            
              this.fliedlist.push(val);
            }
          })

          console.log(' this.fliedlist=====>', this.fliedlist)
          for(var i=0;i<this.fliedlist.length;i++){
            this.quantities().push(this.newQuantity());
         

          }
          var arr_obj = [];
          for(var i=0;i<this.fliedlist.length;i++){
          var obj = {
              "gross": this.fliedlist[i]["value"],
              "price": this.fliedlist[i]["metadata"]["operator"]["value"],
              "sal": this.fliedlist[i]["metadata"]["whereCondition"]["value"],
              "and_or": this.fliedlist[i]["metadata"]["condition"]["value"],

          }
          arr_obj.push(obj)
         

          }
          this.productForm.controls['quantities'].setValue(arr_obj);
       



        }else{
          this.quantities().push(this.newQuantity());
        }
        var editData = response3["data"];

      //  Object.keys(editData[0]["field"]).length
     //console.log( 'length',Object.keys(editData[0]["field1"]).length);
      });


  }

  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
  onSelectMethod(svalue:any){
    console.log(svalue);
    this.selectGrossSal = svalue;
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      gross:'',
      price: '',
      sal:'',
      and_or:'',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
   
 
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
   
  onSubmit() {  

    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=UserDataAccessRows&q=refUserId=="+this.usert_id+";refTableMetaData=="+this.meta_table_id+";status==Active").subscribe(
      (response3: any) => {
        console.log('row data restriction',response3["data"])
        if(response3["data"].length > 0){
          console.log(this.productForm.value.quantities);
          console.log(this.productForm)
          var rowdata_id = response3["data"][0]["id"]
          console.log('old part with id',rowdata_id)
          console.log('tableid',this.data)

          console.log(this.productForm.value.quantities);
          var rowarray = this.productForm.value.quantities;
      
          var submitdata = this.productForm.value;
          console.log(submitdata.quantities[0]['gross']);
          console.log(submitdata.quantities[0]['price']);
          console.log(submitdata.quantities[0]['sal']);
          console.log(submitdata.quantities[0]['and_or']);
          if(submitdata.quantities[0]['gross']!='' && submitdata.quantities[0]['price']!='' && submitdata.quantities[0]['sal']!='' && submitdata.quantities[0]['and_or']!= ''){
            console.log('true part');
            var patch_obj = {
              "status": {
                "type": "Property",
                "value": "Inactive",
              
              },
            }
            this.dataService.patchData(patch_obj, this.dataService.NODE_API + '/api/service/entities/'+rowdata_id+'/UserDataAccessRows').subscribe((response1: any) => {
              
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+this.data.table_id).subscribe(
                (response: any) => {
                 // this.metaData = response["data"];
                  console.log(response)
                  console.log(response["data"][0]["tableName"]["value"])
                  console.log(response["data"][0]["refOrganization"]["value"])
                  //console.log('meta data',this.metaData)
          
                  var post_val2:any =  {
                   
                    "type": "UserDataAccessRows",
                    "tableName": {
                      "type": "Property",
                      "value": response["data"][0]["tableName"]["value"]
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
                      "value":""
                  },
                  "refUserId": {
                      "type": "Relationship",
                      "value": this.data.user_id
                  },
                  "refApplicationId": {
                      "type": "Relationship",
                      "value": ""
                  },
                  "refTableMetaData": {
                      "type": "Relationship",
                      "value": this.data.table_id
                  },
                
              
                }
          
                var feildIndex =0;
             rowarray.forEach((element:any) => { 
          
              if(element){
                feildIndex = feildIndex + 1;
          
                post_val2["field" + feildIndex] = {
                  "type" : "Property",
                  "value" : element.gross,
                 
                  "metadata" : {
                  "condition": {
                  "type" : "Property",
                  "value" : element.and_or
                  },
                  "operator": {
                  "type" : "Property",
                  "value" : element.price
                  },
                  "whereCondition" : {
                  "type" : "Property",
                  "value" : element.sal
                  }
                  }
                }
            }
                })
                console.log('post_val',post_val2);
          
                this.dataService.postData(post_val2, this.dataService.NODE_API + '/api/service/entities').subscribe((response3: any) => {
              
                  console.log('User addeddd');
                  console.log('used added response',response3);
                  //window.location.reload();
                  this.commonService.triggerToast({ type: 'success', title: "", msg: "Row restriction addedd.." })
                  this.router.navigateByUrl("identity-access");
                
                });
          
                });

            })
            
        
      
          }else{
            console.log('else part')
            this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill Row restriction values.." })
          }
        

        }else{
          console.log('new part');
          var rowarray = this.productForm.value.quantities;
          var submitdata = this.productForm.value;
          console.log(submitdata.quantities[0]['gross']);
          console.log(submitdata.quantities[0]['price']);
          console.log(submitdata.quantities[0]['sal']);
          console.log(submitdata.quantities[0]['and_or']);
          if(submitdata.quantities[0]['gross']!='' && submitdata.quantities[0]['price']!='' && submitdata.quantities[0]['sal']!='' && submitdata.quantities[0]['and_or']!= ''){
            console.log('true part');
           
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+this.data.table_id).subscribe(
                (response: any) => {
                 // this.metaData = response["data"];
                  console.log(response)
                  console.log(response["data"][0]["tableName"]["value"])
                  console.log(response["data"][0]["refOrganization"]["value"])
                  //console.log('meta data',this.metaData)
          
                  var post_val2:any =  {
                   
                    "type": "UserDataAccessRows",
                    "tableName": {
                      "type": "Property",
                      "value": response["data"][0]["tableName"]["value"]
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
                      "value":""
                  },
                  "refUserId": {
                      "type": "Relationship",
                      "value": this.data.user_id
                  },
                  "refApplicationId": {
                      "type": "Relationship",
                      "value": ""
                  },
                  "refTableMetaData": {
                      "type": "Relationship",
                      "value": this.data.table_id
                  },
                
              
                }
          
                var feildIndex =0;
             rowarray.forEach((element:any) => { 
          
              if(element){
                feildIndex = feildIndex + 1;
          
                post_val2["field" + feildIndex] = {
                  "type" : "Property",
                  "value" : element.gross,
                 
                  "metadata" : {
                  "condition": {
                  "type" : "Property",
                  "value" : element.and_or
                  },
                  "operator": {
                  "type" : "Property",
                  "value" : element.price
                  },
                  "whereCondition" : {
                  "type" : "Property",
                  "value" : element.sal
                  }
                  }
                }
            }
                })
                console.log('post_val',post_val2);
          
                this.dataService.postData(post_val2, this.dataService.NODE_API + '/api/service/entities').subscribe((response3: any) => {
              
                  console.log('User addeddd');
                  console.log('used added response',response3);
                  //window.location.reload();
                  this.commonService.triggerToast({ type: 'success', title: "", msg: "Row restriction addedd.." })
                  this.router.navigateByUrl("identity-access");
                
                });
          
                });

          
            
        
      
          }else{
            console.log('else part')
            this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill Row restriction values.." })
          }
        

        }

      });

  
    
  
      
      
  //   for(var i=0;i<submitdata.quantities.length;i++){
  //     console.log(submitdata.quantities[i]['gross']);
  //   }

   


  }


  columndatadropdown(){

   
    console.log('sks',this.data)
    console.log('sks',this.data.table_id)
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+this.data.table_id).subscribe(
      (response: any) => {
        //this.columndata = response["data"];
        if(response["data"].length>0){
          this.clist=[];
          this.columndata = [];
          console.log(response)
          console.log(response["data"]);
         this.columnidval = response["data"][0]["id"]
       
          console.log('column',this.columndata)
      
        
          Object.entries(response["data"][0]).forEach(([key, value], index) => {
  
            if (key.indexOf("field", 0) == 0) {
              console.log('key',key);
              console.log('value',value);
              var val:any = value;
              console.log('val',val)
            
              this.clist.push(val);
            }
          })
  
          console.log('clist',this.clist)
          this.columndata=this.clist;
          console.log('clist',this.clist[0]['value'])
          console.log('clist',this.clist[1]['value'])

        }else{
          this.clist=[];
          this.columndata = [];

        }
       
       
       
        
  
   

      });
    

  }



}
