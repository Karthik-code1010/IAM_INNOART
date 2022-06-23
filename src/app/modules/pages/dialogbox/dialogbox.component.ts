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
  //and_or:FormControl = new FormControl({}, []);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private dataService: DataService,private commonService:CommonService,private router: Router,) {
    this.columndatadropdown();
    this.productForm = this.fb.group({
    
      quantities: this.fb.array([]) ,
    });
 
  

    console.log('Dialog Table Id',data);
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
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+this.data).subscribe(
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
            "value":response["data"][0]["refOrganization"]["value"]
        },
        "refUserId": {
            "type": "Relationship",
            "value": ""
        },
        "refApplicationId": {
            "type": "Relationship",
            "value": ""
        },
        "refTableMetaData": {
            "type": "Relationship",
            "value": this.data
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
  
      
      
    for(var i=0;i<submitdata.quantities.length;i++){
      console.log(submitdata.quantities[i]['gross']);
    }

   


  }

  ngOnInit(): void {
    this.quantities().push(this.newQuantity());
  }
  columndatadropdown(){

   
    console.log('sks',this.data)
    console.log('sks',this.data)
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=TableMetaData&id="+this.data).subscribe(
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
