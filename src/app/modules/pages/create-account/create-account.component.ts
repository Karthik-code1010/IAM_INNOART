import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  editAccId: any;
  editedData: any = [];

  constructor(private commonService:CommonService, private router: Router, private dataService: DataService,private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    console.log(history.state)
    this.editAccId = history.state.accountEditId
    console.log(this.editAccId)
    this.getEditData(this.editAccId);
  }
  country = 'India';
  state = 'chennai';
  deployment_type ='MSI'
  getEditData(e_id:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Organization&id="+e_id).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        this.editedData = response1["data"];
        this.model0 = {
          lname: this.editedData[0]['legalName']['value'], //
          deploy_type: this.editedData[0]['organizationType']['value'], 
         // organization_logo:  this.editedData[0]['organizationLogo']['value'],
          founder: this.editedData[0]['founder']['value'],
         
          cin:  this.editedData[0]['cin']['value'],
          gstn: this.editedData[0]['gstin']['value'],
          tax_id: this.editedData[0]['taxid']['value'],
        }

        this.model1 = {
          email_Address: this.editedData[0]['emailAddress']['value'],
          website: this.editedData[0]['website']['value'],
          telephone_number: this.editedData[0]['telephoneNumber']['value'],
        }

        this.model2  = {
          country: this.editedData[0]['country']['value'],
          state : this.editedData[0]['state']['value'],
          locality: this.editedData[0]['locality']['value'],
          street_Address:  this.editedData[0]['streetAddress']['value'],
          post_office_box_number:  this.editedData[0]['postOfficeBoxNumber']['value'],
          postal_code: this.editedData[0]['postalCode']['value'],

        }

       }



      });


  }

  
  form0 = new FormGroup({});
  model0: any = {};
  options0: FormlyFormOptions = {};

  fields0: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-2',
          type: 'inno-input',
          key: 'lname',
          templateOptions: {
            label: 'Legal Name',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'deploy_type',
          templateOptions: {
            label: 'Organization Type',
            options: [
              { label: 'MSI', value: 'MSI' },
              { label: 'Client', value: 'Client' },
              { label: 'OEM', value: 'OEM' },
            
            ],
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
          type: 'inno-file',
          key: 'organization_logo',
          templateOptions: {
            label: 'Organization Logo',
          

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'founder',
          templateOptions: {
            label: 'Founder',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'cin',
          templateOptions: {
            label: 'CIN',
         

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
          key: 'gstn',
          templateOptions: {
            label: 'GSTN',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'tax_id',
          templateOptions: {
            label: 'Tax ID',
          
            required: true,
          },
        },
        {
          className: 'flex-1',
        
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
          key: 'email_Address',
          templateOptions: {
            label: 'Email Address',
         

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'website',
          templateOptions: {
            label: 'Website',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'telephone_number',
          templateOptions: {
            label: 'Telephone Number',
            type:'tel',
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
          type: 'inno-select',
          key: 'country',
          templateOptions: {
            label: 'Country',
            options: [
              { label: 'USA', value: 'USA' },
              { label: 'India', value: 'India' },
              { label: 'UK', value: 'UK' },
            
            ],

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'state',
          templateOptions: {
            label: 'State',
            options: [
              { label: 'New York', value: 'New York' },
              { label: 'California', value: 'California' },
              { label: 'walmart', value: 'walmart' },
            
            ]
            ,
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'locality',
          templateOptions: {
            label: 'Locality',
          
           // required: true,
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
          key: 'street_Address',
          templateOptions: {
            label: 'Street Address',
         

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'post_office_box_number',
          templateOptions: {
            label: 'Post office Box Number',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'postal_code',
          templateOptions: {
            label: 'Postal Code',
            
            required: true,
          },
        },
      
      ],
    },
    
    
    
   
   
  ];


  accountSubmitData(){
    console.log(this.model0);
    if(this.editAccId == undefined){
      console.log('New data');
      
    if(this.form0.valid && this.form1.valid && this.form2.valid ){
      console.log(this.model0);
      console.log(this.model1);
      console.log(this.model2);
      // var postAccount:any = {
      //   "type": "Account",
      //   "name": {
      //       "type": "Property",
      //       "value": "Innoart"
      //       },
      //  "description":{
      //       "type": "Property",
      //       "value": ""
      //      },
      //  "createdBy":{
      //       "type": "Property",
      //       "value": ""
      //      },
      //  "modifiedBy":{
      //       "type": "Property",
      //       "value": ""
      //      },
    



      //   }
      //   this.dataService.postData(postAccount, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
      //     console.log('account  added response',response1);
      //     console.log(response1["data"]["id"]);

        
 
      //   });

        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Account").subscribe(
          (response1: any) => {
           if(response1["data"].length>0){
            
        var post_val:any = {
          "type": "Organization",
          "name": {
              "type": "Property",
              "value": response1["data"][0]["name"]["value"]
              },
         "description":{
              "type": "Property",
              "value": ""
             },
        "refAccountID":{
             "type": "Relationship",
             "value": response1["data"][0]["id"]
        },
         "organizationType":{
              "type": "Property",
              "value": this.model0.deploy_type
            },
         "legalName":{
              "type": "Property",
              "value":this.model0.lname
            },
          "organizationLogo":{
              "type": "Property",
              "value": this.model0.organization_logo
            }, 
       
          "refParentOrganization":{
              "type": "Relationship",
              "value": ""
            },
          "subOrganization":{
              "type": "Property",
              "value": ""
            }, 
          "foundingDate":{
              "type": "Property",
              "value": ""
            }, 
          "founder":{
              "type": "Property",
              "value":this.model0.founder
            },
          "emailAddress":{
              "type": "Property",
              "value": this.model1.email_Address
            },
          "website":{
              "type": "Property",
              "value": this.model1.website
            },
          "telephoneNumber":{
              "type": "Property",
              "value": this.model1.telephone_number
            },
          "faxNumber":{
              "type": "Property",
              "value": ""
            },
          "numberOfEmployees":{
              "type": "Property",
              "value": ""
            },
          "nonProfitStatus":{
              "type": "Property",
              "value": ""
            },
          "country":{
              "type": "Property",
              "value":  this.model2.country
            },
          "state":{
              "type": "Property",
              "value":  this.model2.state
            },
          "locality":{
              "type": "Property",
              "value":  this.model2.locality
            },
          "streetAddress":{
              "type": "Property",
              "value":  this.model2.street_Address
            },
          "postOfficeBoxNumber":{
              "type": "Property",
              "value":  this.model2.post_office_box_number
            },
          "postalCode":{
              "type": "Property",
              "value":  this.model2.postal_code
            },
          "cin":{
              "type": "Property",
              "value": this.model0.cin
            },
            "taxid":{
              "type": "Property",
              "value": this.model0.tax_id
            },
          "tan":{
              "type": "Property",
              "value": ""
            },
        
          "vatid":{
              "type": "Property",
              "value": ""
            },
          "pan":{
              "type": "Property",
              "value": ""
            },
          "gstin":{
              "type": "Property",
              "value": this.model0.gstn
            },
          "pfNumber":{
              "type": "Property",
              "value": ""
            }, 
          "esiNumber":{
              "type": "Property",
              "value": ""
            },
          "dun&bradstreetnumber":{
              "type": "Property",
              "value": ""
            },
          "globalLocationNumber":{
              "type": "Property",
              "value": ""
            },
          "leiCode":{
              "type": "Property",
              "value": ""
            },
          "naicsCode":{
              "type": "Property",
              "value": ""
            },
          "rating":{
              "type": "Property",
              "value": ""
            },
          "brands":{
              "type": "Property",
              "value": ""
            },
          "numberofpartners":{
              "type": "Property",
              "value": ""
            },
          "numberOfDevices":{
              "type": "Property",
              "value": ""
            },
          "numberOfCameras":{
              "type": "Property",
              "value": ""
            },
          "numberOfPLC":{
              "type": "Property",
              "value": ""
            },
          "numberOfGateway":{
              "type": "Property",
              "value": ""
            },
          "numberOfServers":{
              "type": "Property",
              "value": ""
            },
          "numberOfUsers":{
              "type": "Property",
              "value": ""
            },
          "numberOfWebUsers":{
              "type": "Property",
              "value": ""
            },
          "numberOfMobileUsers":{
              "type": "Property",
              "value": ""
            },
          "startDate":{
              "type": "Property",
              "value": ""
            },
          "endDate":{
              "type": "Property",
              "value": ""
            },
          "renewalDate":{
              "type": "Property",
              "value": ""
            },
          "amcStartDate":{
              "type": "Property",
              "value": ""
            },
          "amcEndDate":{
              "type": "Property",
              "value": ""
            },
          "amcRenewalDate":{
              "type": "Property",
              "value": ""
            },
          "amcDuration":{
              "type": "Property",
              "value": ""
            },
          "createdBy":{
              "type": "Property",
              "value": ""
            },
          "modifiedBy":{
              "type": "Property",
              "value": ""
            },
         
  
  
          }


          this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response2: any) => {
            console.log('Account added response',response2);
            this.commonService.triggerToast({ type: 'success', title: "", msg: "Account added" })
            this.router.navigateByUrl('/create-accounts-details', { state: { accountId:response2["data"]["id"]  } });

          });
           
          
           
           
           }
          
          });


       

     

    

    }

    }
      if(this.editAccId != undefined){
        console.log('editted data');
        if(this.form0.valid && this.form1.valid && this.form2.valid){
          console.log(this.model0);
          console.log(this.model1);
          console.log(this.model2);
        
            this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Account").subscribe(
              (response1: any) => {
               if(response1["data"].length>0){
                
            var post_val:any = {
          
              "name": {
                  "type": "Property",
                  "value": response1["data"][0]["name"]["value"]
                  },
           
            "refAccountID":{
                 "type": "Relationship",
                 "value": response1["data"][0]["id"]
            },
             "organizationType":{
                  "type": "Property",
                  "value": this.model0.deploy_type
                },
             "legalName":{
                  "type": "Property",
                  "value":this.model0.lname
                },
              "organizationLogo":{
                  "type": "Property",
                  "value": this.model0.organization_logo
                }, 
           
            
              "founder":{
                  "type": "Property",
                  "value":this.model0.founder
                },
              "emailAddress":{
                  "type": "Property",
                  "value": this.model1.email_Address
                },
              "website":{
                  "type": "Property",
                  "value": this.model1.website
                },
              "telephoneNumber":{
                  "type": "Property",
                  "value": this.model1.telephone_number
                },
             
              "country":{
                  "type": "Property",
                  "value":  this.model2.country
                },
              "state":{
                  "type": "Property",
                  "value":  this.model2.state
                },
              "locality":{
                  "type": "Property",
                  "value":  this.model2.locality
                },
              "streetAddress":{
                  "type": "Property",
                  "value":  this.model2.street_Address
                },
              "postOfficeBoxNumber":{
                  "type": "Property",
                  "value":  this.model2.post_office_box_number
                },
              "postalCode":{
                  "type": "Property",
                  "value":  this.model2.postal_code
                },
              "cin":{
                  "type": "Property",
                  "value": this.model0.cin
                },
            
                "taxid":{
                  "type": "Property",
                  "value": this.model0.tax_id
                },
            
              "gstin":{
                  "type": "Property",
                  "value": this.model0.gstn
                },
            
             
              
             
      
      
              }
              
              this.dataService.patchData(post_val, this.dataService.NODE_API + '/api/service/entities/'+this.editAccId+'/Organization').subscribe((response7: any) => {
                console.log('Account added response',response7);
                this.commonService.triggerToast({ type: 'success', title: "", msg: "Account updated" })
                 this.router.navigateByUrl('/create-accounts-details', { state: { accountId:response7["data"]["id"]  } });

                })

    
    
              // this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response2: any) => {
              //   console.log('Account added response',response2);
              //   this.commonService.triggerToast({ type: 'success', title: "", msg: "Account added" })
              //   this.router.navigateByUrl('/create-accounts-details', { state: { accountId:response2["data"]["id"]  } });
    
              // });
               
              
               
               
               }
              
              });
    
    
           
    
         
    
        
    
        }

      }



  }


}
