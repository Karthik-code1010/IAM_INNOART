import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { filter, startWith, tap } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-create-account-details',
  templateUrl: './create-account-details.component.html',
  styleUrls: ['./create-account-details.component.scss']
})
export class CreateAccountDetailsComponent implements OnInit {
  account_id: any;
  editedData: any = [];

  constructor(private commonService:CommonService, private router: Router, private dataService: DataService,private formBuilder: FormBuilder, ) { }


  ngOnInit(): void {

    console.log(history.state)
    this.account_id = history.state.accountId;
    console.log(this.account_id)
    this.getEdittedData(this.account_id);
  }
  getEdittedData(eid:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Organization&id="+eid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        this.editedData = response1["data"];
         this.model0 = {
          product: this.editedData[0]['product']['value'],
          product_type : this.editedData[0]['productType']['value'],
          number_of_devices:this.editedData[0]['numberOfDevices']['value'],
          number_of_camaras: this.editedData[0]['numberOfCameras']['value'],
          number_of_gateway: this.editedData[0]['numberOfGateway']['value'],
          number_of_plc: this.editedData[0]['numberOfPLC']['value'],
          }


          this.model1 = {
            number_of_users:  this.editedData[0]['numberOfUsers']['value'],
            number_of_Web_users:  this.editedData[0]['numberOfWebUsers']['value'],
            number_of_mobile_users: this.editedData[0]['numberOfMobileUsers']['value'],
          }

          this.model2 = {
            salutation:  this.editedData[0]['salutation']['value'],
            adminname: this.editedData[0]['adminName']['value'],
            admin_email_address: this.editedData[0]['adminEmail']['value'],
          }


          this.model3 = {
            subcription_duration: this.editedData[0]['subcriptionDuration']['value'],
            subcription_start_date: this.editedData[0]['startDate']['value'],
            subcription_renewel_date: this.editedData[0]['renewalDate']['value'],
         
          }
          this.model4 = {
            amc_duration:this.editedData[0]['amcDuration']['value'],
            amc_start_date: this.editedData[0]['amcStartDate']['value'],
            amc_renewel_date: this.editedData[0]['amcRenewalDate']['value'],
          }

       }



      });


  }
  product = 'Product';
  deployment_type ='On-Premises'

  startDate = new Date();

  form0 = new FormGroup({});
  model0: any = {};
  options0: FormlyFormOptions = {};

  fields0: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'product',
          templateOptions: {
            label: 'Product',
            options: [
              { label: 'Product', value: 'Product' },
              { label: 'Product1', value: 'Product2' },
              { label: 'Product2', value: 'Product3' },
            
            ],
            required: true,
          },
        },
       
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'product_type',
          templateOptions: {
            label: 'Deployment Type',
            options: [
              { label: 'On-Premises', value: 'On-Premises' },
              { label: 'SaaS', value: 'SaaS' },
           
            
            ],
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_devices',
          templateOptions: {
            label: 'Number of Devices',
            type: 'number',
            required: true,
          },
        },
     
      
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_camaras',
          templateOptions: {
            label: 'Number of Camaras',
            type: 'number',
          

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_gateway',
          templateOptions: {
            label: 'Number of Gateway',
            type: 'number',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_plc',
          templateOptions: {
            label: 'Number of PLC',
            type: 'number',
         
            required: true,
          },
        },
      
      ],
    },
 
    
    
   
   
  ];



  
  form1 = new FormGroup({});
  model1: any = {};
  options1: FormlyFormOptions = {};

  fields1: FormlyFieldConfig[] = [
    
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_users',
          templateOptions: {
            label: 'Number of Users',
            type: 'number',
          

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_Web_users',
          templateOptions: {
            label: 'Number of Web Users',
            type: 'number',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'number_of_mobile_users',
          templateOptions: {
            label: 'Number of Mobile Users',
            type: 'number',
            required: true,
          },
        },
      
      ],
    },
 
    
    
   
   
  ];



  form2 = new FormGroup({});
  model2: any = {};
  options2: FormlyFormOptions = {};

  fields2: FormlyFieldConfig[] = [
    
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'salutation',
          templateOptions: {
            label: 'Salutation',
          

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'adminname',
          templateOptions: {
            label: 'Name',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'admin_email_address',
          templateOptions: {
            label: 'Email Address',
         
           required: true,
          },
        },
      
      ],
    },

   
  ];




  form3 = new FormGroup({});
  model3: any = {};
  options3: FormlyFormOptions = {};

  fields3: FormlyFieldConfig[] = [
    
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'subcription_duration',
          templateOptions: {
            label: 'Subcription Duration',
            change: (field:any, $event)=>{ 
              console.log(field.form.controls.subcription_duration.value);
              var changeVal = field.form.controls.subcription_duration.value;
              console.log(changeVal)
              var ym_str = changeVal.split(' ');
              console.log('ym_str',ym_str);
              var date = new Date();
              var renewdate = new Date();
              if(ym_str[1]=='Year' || ym_str[1]=='year'){
                var y:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                console.log('y',y,'year',year);
                console.log(+y + year);
                var new_num:number = +y + year;
               
              
                renewdate.setFullYear(new_num);
                renewdate.setDate(day);
                renewdate.setMonth(month);

              }
              if(ym_str[1] == 'Y' || ym_str[1]=='y'){
                var y:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                console.log('y',y,'year',year);
                console.log(+y + year);
                var new_num:number = +y + year;
               
              
                renewdate.setFullYear(new_num);
                renewdate.setDate(day);
                renewdate.setMonth(month);

              }
              if(ym_str[1]=='Month' || ym_str[1]=='month'){
                var m:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month:number = date.getMonth();
                var day = date.getDate();
                console.log('m',m,'month',month);
                console.log(+m + year);
                var new_num:number = +m + month;
             
                  console.log('new_num',new_num);
                renewdate.setFullYear(year);
                renewdate.setDate(day);
                renewdate.setMonth(new_num);
              
             

              }
              if(ym_str[1]=='M' ||  ym_str[1]=='m'){
                var m:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month:number = date.getMonth();
                var day = date.getDate();
                console.log('m',m,'month',month);
                console.log(+m + year);
                var new_num:number = +m + month;
             
                  console.log('new_num',new_num);
                renewdate.setFullYear(year);
                renewdate.setDate(day);
                renewdate.setMonth(new_num);
              

              }
             
           

           
            


              this.model3 = {
                subcription_duration:field.form.controls.subcription_duration.value,
                subcription_start_date : new Date(),
                subcription_renewel_date:renewdate

              }

          
          },

            required: true,
          },
       
        },
        {
          className: 'flex-1',
          type: 'inno-date',
          key: 'subcription_start_date',
          templateOptions: {
            label: 'Subcription Start Date',
           required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-date',
          key: 'subcription_renewel_date',
          templateOptions: {
            label: 'Subcription Renewel Date',
         
            required: true,
          },
        },
      
      ],
    },
  
 
   
  ];

  
  form4 = new FormGroup({});
  model4: any = {};
  options4: FormlyFormOptions = {};

  fields4: FormlyFieldConfig[] = [
    
   
  
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'amc_duration',
          templateOptions: {
            label: 'AMC Duration',
            change: (field1:any, $event)=>{ 
              console.log(field1.form.controls.amc_duration.value);
              var changeVal = field1.form.controls.amc_duration.value;
              console.log(changeVal)
              var ym_str = changeVal.split(' ');
              console.log('ym_str',ym_str);
              var date = new Date();
              var renewdate = new Date();
              if(ym_str[1]=='Year' || ym_str[1]=='year'){
                var y:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                console.log('y',y,'year',year);
                console.log(+y + year);
                var new_num:number = +y + year;
               
              
                renewdate.setFullYear(new_num);
                renewdate.setDate(day);
                renewdate.setMonth(month);

              }
              if(ym_str[1] == 'Y' || ym_str[1]=='y'){
                var y:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                console.log('y',y,'year',year);
                console.log(+y + year);
                var new_num:number = +y + year;
               
              
                renewdate.setFullYear(new_num);
                renewdate.setDate(day);
                renewdate.setMonth(month);

              }
              if(ym_str[1]=='Month' || ym_str[1]=='month'){
                var m:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month:number = date.getMonth();
                var day = date.getDate();
                console.log('m',m,'month',month);
                console.log(+m + year);
                var new_num:number = +m + month;
               
                  console.log('new_num',new_num);
                renewdate.setFullYear(year);
                renewdate.setDate(day);
                renewdate.setMonth(new_num);
              
               
             

              }
              if(ym_str[1]=='M' ||  ym_str[1]=='m'){
                var m:number = ym_str[0];
                var year:number =  date.getFullYear();
                var month:number = date.getMonth();
                var day = date.getDate();
                console.log('m',m,'month',month);
                console.log(+m + year);
                var new_num:number = +m + month;
             
                  console.log('new_num',new_num);
                renewdate.setFullYear(year);
                renewdate.setDate(day);
                renewdate.setMonth(new_num);
              

              }
             

              this.model4 = {
                amc_duration:field1.form.controls.amc_duration.value,
                amc_start_date : new Date(),
                amc_renewel_date:renewdate

              }

          
          },


            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-date',
          key: 'amc_start_date',
          templateOptions: {
            label: 'AMC Start Date',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-date',
          key: 'amc_renewel_date',
          templateOptions: {
            label: 'AMC Renewel Date',
         
            required: true,
          },
        },
      
      ],
    },
   
  ];
  accountSubmitData(){
   
    if(this.form0.valid && this.form1.valid && this.form2.valid && this.form3.valid){
      if(this.account_id != undefined)
      console.log(this.model0)
      console.log(this.model1)
      console.log(this.model2)
      console.log(this.model3)
      
      var post_val:any = {
       
    
      "product":{
            "type": "Property",
            "value": this.model0.product
           },
      "productType":{
            "type": "Property",
            "value": this.model0.product_type
           },
        "numberOfDevices":{
            "type": "Property",
            "value": this.model0.number_of_devices
          },
        "numberOfCameras":{
            "type": "Property",
            "value": this.model0.number_of_camaras
          },
        "numberOfPLC":{
            "type": "Property",
            "value":  this.model0.number_of_plc
          },
        "numberOfGateway":{
            "type": "Property",
            "value": this.model0.number_of_gateway
          },
     
        "numberOfUsers":{
            "type": "Property",
            "value": this.model1.number_of_users
          },
        "numberOfWebUsers":{
            "type": "Property",
            "value":  this.model1.number_of_Web_users
          },
        "numberOfMobileUsers":{
            "type": "Property",
            "value":  this.model1.number_of_mobile_users
          },
        "salutation":{
            "type": "Property",
            "value": this.model2.salutation
          },
        "adminName":{
            "type": "Property",
            "value": this.model2.adminname
          },
        "adminEmail":{
            "type": "Property",
            "value": this.model2.admin_email_address
          },
        "subcriptionDuration":{
            "type": "Property",
            "value": this.model3.subcription_duration
          },

        "startDate":{
            "type": "Property",
            "value": this.model3.subcription_start_date
          },
      
        "renewalDate":{
            "type": "Property",
            "value":this.model3.subcription_renewel_date
          },
        "amcStartDate":{
            "type": "Property",
            "value": this.model4.amc_start_date
          },
      
        "amcRenewalDate":{
            "type": "Property",
            "value": this.model4.amc_renewel_date
          },
        "amcDuration":{
            "type": "Property",
            "value": this.model4.amc_duration
          },
       
       


        }

    
        this.dataService.patchData(post_val, this.dataService.NODE_API + '/api/service/entities/'+this.account_id+'/Organization').subscribe((response7: any) => {
        
          this.router.navigateByUrl('/create-accounts-theme', { state: { accountId:response7["data"]["id"]  } });
          this.commonService.triggerToast({ type: 'success', title: "", msg: "Account successfullty updated.." })
        })



    }

  }



}
