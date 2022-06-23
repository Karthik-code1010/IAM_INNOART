import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-globaldataprivacy',
  templateUrl: './globaldataprivacy.component.html',
  styleUrls: ['./globaldataprivacy.component.scss']
})
export class GlobaldataprivacyComponent implements OnInit {



  
  toppings: FormGroup;
  fieldname:any='';
  datatype:any='';
  ispersonal: FormControl = new FormControl({}, []);
  ispublic:FormControl = new FormControl({}, []);
 
  issensitive:FormControl = new FormControl({}, []);
  isrestricted:FormControl = new FormControl({}, []);
  isinternal_use:FormControl = new FormControl({}, []);
  ismasked:FormControl = new FormControl({}, []);
  mask_character:FormControl = new FormControl({}, []);
  isencrpted:FormControl = new FormControl({}, []);
  consent_required:FormControl = new FormControl({}, []);
  data_sharable:FormControl = new FormControl({}, []);
  impect_level:FormControl = new FormControl({}, []);
  isprotected:FormControl = new FormControl({}, []);
  encryptiontech:FormControl = new FormControl({}, []);

  dataprivacyid:any = '1';
  globaleditvalue: any = [];


  constructor(private formBuilder: FormBuilder,private dataService: DataService,private commonService:CommonService,private router: Router,) {
    this.toppings =  this.formBuilder.group({
      GDPR: new FormControl(false),
      HIPPA: new FormControl(false),
      PII: new FormControl(false),
      PCI:new FormControl(false),
      ISO:new FormControl(false),
    });
  
  }
  ngOnInit(): void {
    //this.toppings.get('GDPR').setValue(true);
    console.log('history.state',history.state);
    this.dataprivacyid = history.state;
    console.log('this.dataprivacyid',this.dataprivacyid)
    console.log(this.dataprivacyid.id);
    console.log(this.dataprivacyid.navigationId)
    this.getEditDataPrivacy(this.dataprivacyid.id);

  }
  // checked1 = false;
  // indeterminate = false;
  // labelPosition: 'before' | 'after' = 'after';
  // disabled = false;
  getEditDataPrivacy(editDataId:any){
    if(editDataId != ''){
      var _this = this;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=GlobalDataPrivacy&id="+editDataId).subscribe(
        (response2: any) => {
          if(response2["data"].length>0){
            this.globaleditvalue = response2["data"]
      
            console.log('this.globaleditvalue',this.globaleditvalue);
  
            this.fieldname = this.globaleditvalue[0]["field1"]["value"];
            this.datatype = this.globaleditvalue[0]["field1"]["metadata"]["dataType"]["value"];
            var arrayobj = this.globaleditvalue[0]["field1"]["metadata"]["complianceType"]["value"];
            console.log(this.toppings.value)
            console.log('this.toppings',this.toppings) //isPersonal this.globaleditvalue[0]["field1"]["metadata"]["isPersonal"]["value"]
            var obj:any = {};
            for(var i=0;i<arrayobj.length;i++){
              console.log('arrayobj[i]',arrayobj[i]);
              this.toppings.get(arrayobj[i])?.setValue(true);
              //var localval:any = arrayobj[i];
              //console.log()
            //  _this.toppings.get(localval).setValue(true);
           // this.toppings.get('GDPR').setValue(true);

              console.log('obj==>',obj);

            }
            if(this.globaleditvalue[0]['field1']['metadata']['isPersonal']['value']=='Yes'){
              this.ispersonal = new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isPersonal']['value']=='No'){
              this.ispersonal = new FormControl('No');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isPublic']['value'] == 'Yes'){
              this.ispublic = new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isPublic']['value'] == 'No'){
              this.ispublic = new FormControl('No');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isSensitive']['value'] == 'Yes'){
              this.issensitive =  new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isSensitive']['value'] == 'No'){
              this.issensitive =  new FormControl('No');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isRestricted']['value'] == 'Yes'){
              this.isrestricted =  new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isRestricted']['value'] == 'No'){
              this.isrestricted =  new FormControl('No');
            }

            if(this.globaleditvalue[0]['field1']['metadata']['isInternalUseOnly']['value'] == 'Yes'){
              this.isinternal_use =  new FormControl('Yes');
            }
            
            if(this.globaleditvalue[0]['field1']['metadata']['isInternalUseOnly']['value'] == 'No'){
              this.isinternal_use =  new FormControl('No');
            }

            if(this.globaleditvalue[0]['field1']['metadata']['isProtected']['value'] == 'Yes'){
              this.isprotected = new FormControl('Yes');
            }
            
            if(this.globaleditvalue[0]['field1']['metadata']['isProtected']['value'] == 'No'){
              this.isprotected = new FormControl('No');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isMasked']['value'] == 'Yes'){
              this.ismasked = new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isMasked']['value'] == 'No'){
              this.ismasked = new FormControl('No');
            }

            if(this.globaleditvalue[0]['field1']['metadata']['maskCharacter']['value'] == 'Yes'){
              this.mask_character = new FormControl('Yes');
            }

            if(this.globaleditvalue[0]['field1']['metadata']['maskCharacter']['value'] == 'No'){
              this.mask_character = new FormControl('No');
            }
         
            if(this.globaleditvalue[0]['field1']['metadata']['isEncrypted']['value'] == 'Yes'){
              this.isencrpted = new FormControl('Yes');

            }
            if(this.globaleditvalue[0]['field1']['metadata']['isEncrypted']['value'] == 'No'){
              this.isencrpted = new FormControl('No');

            }
            if(this.globaleditvalue[0]['field1']['metadata']['encryptionTechique']['value'] == 'Yes'){
              this.encryptiontech = new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['encryptionTechique']['value'] == 'No'){
              this.encryptiontech = new FormControl('No');
            }

            if(this.globaleditvalue[0]['field1']['metadata']['isConsentRequired']['value'] == 'Yes'){
              this.consent_required =  new FormControl('Yes');
            }
            
            if(this.globaleditvalue[0]['field1']['metadata']['isConsentRequired']['value'] == 'No'){
              this.consent_required =  new FormControl('No');
            }
            
            if(this.globaleditvalue[0]['field1']['metadata']['isDataSharable']['value'] == 'Yes'){
              this.data_sharable  = new FormControl('Yes');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['isDataSharable']['value'] == 'No'){
              this.data_sharable  = new FormControl('No');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['impactLevel']['value'] == 'High'){
              this.impect_level = new FormControl('High');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['impactLevel']['value'] == 'Medium'){
              this.impect_level = new FormControl('Medium');
            }
            if(this.globaleditvalue[0]['field1']['metadata']['impactLevel']['value'] == 'Low'){
              this.impect_level = new FormControl('Low');
            }
        
            console.log(arrayobj);
            //this.ispersonal = new FormControl(true);
            
            
           

          }

    

      });

     }
     else{
      this.globaleditvalue = [];
     }


  }
     
  goPage(page: any) {
    this.router.navigateByUrl(page);
  }

  

  save(){
    console.log(this.dataprivacyid.id);
    if(this.dataprivacyid.id == undefined){
       console.log('new Section');
     
    console.log(this.fieldname);
    console.log(this.datatype);
    console.log(this.toppings.value);
    var checkboxval =this.toppings.value;
    console.log(checkboxval);
    var checkarray = [];
    console.log(checkboxval.GDPR)
    if(checkboxval.GDPR==true){
      checkarray.push("GDPR")
    }
    if(checkboxval.HIPPA==true){
      checkarray.push("HIPPA")
    }
    if(checkboxval.PII==true){
      checkarray.push("PII")
    }
    if(checkboxval.PCI==true){
      checkarray.push("PCI")
    }
    if(checkboxval.ISO==true){
      checkarray.push("ISO")
    }

    console.log(checkarray);
   
  
    if(this.fieldname!='' && this.datatype!=''){
      var post_val = {
        "type":"GlobalDataPrivacy",
        "field1": {
   
           "type": "Property",
   
           "value": this.fieldname,
   
           "metadata": {
   
                "complianceType":{
                "type": "Property",
                "value":checkarray
           },
          
         "dataType":{
                 "type": "Property",
                  "value": this.datatype 
         },
         "isPersonal": {
                   "type": "Property",
                   "value": this.ispersonal.value
                 
               },
         "isPublic": {
                   "type": "Property",
                   "value": this.ispublic.value
                 
               },
         "isSensitive": {
                   "type": "Property",
                   "value":this.issensitive.value
                 
               },
         "isRestricted": {
                   "type": "Property",
                   "value":this.isrestricted.value
                 
               },
         "isInternalUseOnly": {
                   "type": "Property",
                   "value": this.isinternal_use.value
                 
               },
         "isProtected": {
                   "type": "Property",
                   "value": this.isprotected.value
                 
               },
         "isMasked": {
                   "type": "Property",
                   "value": this.ismasked.value
                 
               },
         "maskCharacter": {
                   "type": "Property",
                  "value": this.mask_character.value
                 
               },
         "isEncrypted": {
                   "type": "Property",
                   "value": this.isencrpted.value
                 
               },
         "encryptionTechique": {
                   "type": "Property",
                   "value": this.encryptiontech.value
                 
               },
         "isConsentRequired": {
                   "type": "Property",
                   "value": this.consent_required.value
                 
               },
         "isDataSharable": {
                   "type": "Property",
                   "value": this.data_sharable.value
                 
               },
         "impactLevel": {
                   "type": "Property",
                   "value":this.impect_level.value
                 
               },
         "createdBy": {
                   "type": "Property",
                    "value": ""
                 
               },
         "modifiedBy": {
                   "type": "Property",
                   "value": ""
                 
               }
   
           }
   
       }
   
          
          
          
             
   }

   console.log(post_val);
   this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response3: any) => {
    
     console.log('User addeddd');
     console.log('used added response',response3);
     //window.location.reload();
     this.commonService.triggerToast({ type: 'success', title: "", msg: "Data Privacy added.." })
     this.router.navigateByUrl("list-fields");
  
   
   });
    }else{
      this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill data.." })
    }

    }

    if(this.dataprivacyid.id){
      console.log('Edit Section')

      console.log(this.fieldname);
      console.log(this.datatype);
      console.log(this.toppings.value);
      var checkboxval =this.toppings.value;
      console.log(checkboxval);
      var checkarray = [];
      console.log(checkboxval.GDPR)
      if(checkboxval.GDPR==true){
        checkarray.push("GDPR")
      }
      if(checkboxval.HIPPA==true){
        checkarray.push("HIPPA")
      }
      if(checkboxval.PII==true){
        checkarray.push("PII")
      }
      if(checkboxval.PCI==true){
        checkarray.push("PCI")
      }
      if(checkboxval.ISO==true){
        checkarray.push("ISO")
      }
  
      console.log(checkarray);
     
    
      if(this.fieldname!='' && this.datatype!=''){
        var post_va3 = {
      
          "field1": {
     
             "type": "Property",
     
             "value": this.fieldname,
     
             "metadata": {
     
                  "complianceType":{
                  "type": "Property",
                  "value":checkarray
             },
            
           "dataType":{
                   "type": "Property",
                    "value": this.datatype
           },
           "isPersonal": {
                     "type": "Property",
                     "value": this.ispersonal.value
                   
                 },
           "isPublic": {
                     "type": "Property",
                     "value": this.ispublic.value
                   
                 },
           "isSensitive": {
                     "type": "Property",
                     "value":this.issensitive.value
                   
                 },
           "isRestricted": {
                     "type": "Property",
                     "value":this.isrestricted.value
                   
                 },
           "isInternalUseOnly": {
                     "type": "Property",
                     "value": this.isinternal_use.value
                   
                 },
           "isProtected": {
                     "type": "Property",
                     "value": this.isprotected.value
                   
                 },
           "isMasked": {
                     "type": "Property",
                     "value": this.ismasked.value
                   
                 },
           "maskCharacter": {
                     "type": "Property",
                    "value": this.mask_character.value
                   
                 },
           "isEncrypted": {
                     "type": "Property",
                     "value": this.isencrpted.value
                   
                 },
           "encryptionTechique": {
                     "type": "Property",
                     "value": this.encryptiontech.value
                   
                 },
           "isConsentRequired": {
                     "type": "Property",
                     "value": this.consent_required.value
                   
                 },
           "isDataSharable": {
                     "type": "Property",
                     "value": this.data_sharable.value 
                   
                 },
           "impactLevel": {
                     "type": "Property",
                     "value":this.impect_level.value
                   
                 }
     
             }
     
         }
     
            
            
            
               
     }
     console.log(post_va3);

     this.dataService.patchData(post_va3, this.dataService.NODE_API + '/api/service/entities/'+this.dataprivacyid.id+'/GlobalDataPrivacy').subscribe((response7: any) => {
    
      this.commonService.triggerToast({ type: 'success', title: "", msg: "Global Data Privacy successfullty updated.." })
      this.router.navigateByUrl("list-fields");
    })

    }
  
    

    
  
  
   

    }
  
  


  }
}
