import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { animate } from 'popmotion';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  @ViewChild('title') title!: ElementRef;
  orgselected='';
  people_selected='';
  role_selected='';
  organizationVal: any = [];
  peopleVal: any = [];

  roleVal: any = [];
  editid: any = '';
  navigation_id: any;

  active_inactive:FormControl = new FormControl({}, []);
 
  constructor(private commonService:CommonService,private renderer: Renderer2, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
 

    this.getOrganization();
    // this.getPeopleData('');
    this.getPeopleData();
    this.getRoleData();
 

console.log('history.state',history.state);
 this.editid = history.state;
 this.navigation_id = this.editid.navigationId
 if(this.editid.id == undefined){
      this.active_inactive = new FormControl('Active');
 }
this.getLoadEdittedData(this.editid.id) 


  }
  getLoadEdittedData(eid:any){
    console.log('eid==>',eid);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=User&id="+eid).subscribe(
      (responseedit: any) => {
        if(responseedit["data"].length > 0){
          console.log('responseedit["data"]',responseedit["data"])
          console.log('User Name',responseedit["data"][0]["username"]["value"]);
       console.log(responseedit["data"][0]["refOrganization"]["value"]);
       console.log(responseedit["data"][0]["refPeople"]["value"]);
          var org = responseedit["data"][0]["refOrganization"]["value"]
          this.orgselected = org;
          this.people_selected = responseedit["data"][0]["refPeople"]["value"]
          this.role_selected =  responseedit["data"][0]["refRole"]["value"]
          this.model4 = {
            username: responseedit["data"][0]["username"]["value"],

          }
      this.active_inactive = new FormControl(responseedit["data"][0]["status"]["value"]);

        }
      
      });

  }

  getOrganization(){
    console.log(this.dataService.NODE_API);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=ORGMASTER").subscribe(
    (response: any) => {
      this.organizationVal = response["data"];
      console.log(response)
      console.log(response["data"]);
      console.log('this.organizationVal',this.organizationVal)
    });

  }
  
  getPeopleData(){
    console.log(this.dataService.NODE_API);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=PEOPLES").subscribe(
    (response: any) => {
      this.peopleVal = response["data"];
      console.log(response)
      console.log(response["data"]);
      console.log('this.organizationVal',this.peopleVal)
    });

  }

  // onOrgChange(){
  //   console.log('org on change');
  //   console.log(this.orgselected);
  //   this.getPeopleData(this.orgselected);
    
  // }
  
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
          key: 'username',
          templateOptions: {
            label: 'Username',
      

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'password',
          templateOptions: {
            label: 'Password',
            type:'password',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'repassword',
          templateOptions: {
            label: 'Re-type Password',
            type:'password',
            required: true,
          },
        },
      
      ],
    },
   
  ];


  getRoleData(){
 
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=Role").subscribe(
    (response: any) => {
      this.roleVal = response["data"];
      console.log(response)
    
      console.log('role',this.roleVal)
    });

  }
  onSubmit() {
 console.log(this.active_inactive.value)
    if(this.editid.id == undefined){
     console.log('new  section')
  

      if(this.orgselected!='' && this.people_selected != '' && this.role_selected != ''){
        if(this.form4.valid){
          if(this.model4.password == this.model4.repassword){
            console.log('password matched');
            console.log(this.orgselected);
            console.log(this.people_selected);
            console.log(this.role_selected);
            var post_val =  {
             
              "type": "User",
              "username": {
                  "type": "Property",
                  "value": this.model4.username
              },
              "status": {
                  "type": "Property",
                  "value": this.active_inactive.value
              },
              "refAccountID": {
                "type": "Relationship",
                "value": ""
            },
         
            "refPeople": {
                "type": "Relationship",
                "value": this.people_selected
               },
            "refRole": {
                "type": "Relationship",
                "value": this.role_selected
               },
    
              "refOrganization": {
                  "type": "Relationship",
                  "value": this.orgselected
              },
              "hashedPassword": {
                  "type": "Property",
                  "value": this.model4.repassword
              },
              "salt": {
                  "type": "Property",
                  "value": ""
              }
          }
    
          console.log(post_val);
          this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
           
            console.log('User addeddd');
            console.log('used added response',response1);
            this.router.navigateByUrl("list-of-user");
            this.commonService.triggerToast({ type: 'success', title: "", msg: "User successfullty added.." })
          
          });
    
          }else{
                
            this.commonService.triggerToast({ type: 'error', title: "", msg: "Password is missmatch" });
            console.log('Organization id is empty')
          }

        }else{
          this.commonService.triggerToast({ type: 'error', title: "", msg: "please fill data" });
        }
       

      }else{
        this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill data" });
      }

     

    



    }
    
    if(this.editid.id){
      console.log('edit Section');
      console.log(this.editid.id);
      
      if(this.orgselected!='' && this.people_selected != '' && this.role_selected != ''){
        if(this.form4.valid){
          if(this.model4.password == this.model4.repassword){
            console.log('password matched');
            console.log(this.orgselected);
            console.log(this.people_selected);
            console.log(this.role_selected);
            var post_val3 =  {
             
          
              "username": {
                  "type": "Property",
                  "value":  this.model4.username
              },
             
              "hashedPassword": {
                  "type": "Property",
                  "value":  this.model4.repassword
              },
              "refPeople": {
                "type": "Relationship",
                "value": this.people_selected
               },
            "refRole": {
                "type": "Relationship",
                "value": this.role_selected
               },
    
              "refOrganization": {
                  "type": "Relationship",
                  "value": this.orgselected
              },
              "status": {
                "type": "Property",
                "value": this.active_inactive.value
              },
             
          }
    
          console.log(post_val3);
        
          this.dataService.patchData(post_val3, this.dataService.NODE_API + '/api/service/entities/'+this.editid.id+'/User').subscribe((response7: any) => {
            this.router.navigateByUrl("list-of-user");
            this.commonService.triggerToast({ type: 'success', title: "", msg: "User successfullty updated.." })
          })
    
          }else{
                
            this.commonService.triggerToast({ type: 'error', title: "", msg: "Password is missmatch" });
            console.log('Organization id is empty')
          }

        }
        else{
          this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill data" });
        }
      }else{
        this.commonService.triggerToast({ type: 'error', title: "", msg: "Please fill data" });
      }
      
       
  
      




    }


   
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
  // form = new FormGroup({});
  // model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: 'display-flex',
   
  //     fieldGroup: [
       
  //       {
  //         className: 'flex-1',
  //         type: 'inno-input',
  //         key: 'name',
  //         templateOptions: {
  //           label: 'User Name',
  //           placeholder: 'Enter Name',
  //         },
  //         validation: {
  //           messages: {
  //               required: 'You need to provide a Name! '
  //           }
  //       }
  //       },
  //       {
  //         className: 'flex-1',
  //         type: 'inno-input',
  //         key: 'shortdescription',
  //         templateOptions: {
  //           label: 'Password',
  //           placeholder: 'Password',
  //           required:true,
  //         },
  //         validation: {
  //           messages: {
  //               required: 'You need to provide a password'
  //           }
  //       }
  //       },
  //       {
  //         className: 'flex-1',
  //         type: 'inno-input',
  //         key: 'application',
  //         templateOptions: {
  //           label: 'Retype Password',
  //           placeholder: 'Retype Password',
  //           required:true,
            
  //         },
  //         validation: {
  //           messages: {
  //               required: 'You need to provide a password '
  //           }
  //       },
         
  //       },
      
        
  //     ],
  //   },
   
    
  
    
  // ];

      
  goPage(page: any) {
    this.router.navigateByUrl(page);
  }



}
