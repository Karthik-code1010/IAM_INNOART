import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-create-account-theme',
  templateUrl: './create-account-theme.component.html',
  styleUrls: ['./create-account-theme.component.scss']
})
export class CreateAccountThemeComponent implements OnInit {
  app_bg_color:any = '#1C31E3';
  menu_color:any ='#CE6459';
  button_table_color:any = '#E31C61';
  header_color:any = '#B81CE3';
  widget_color:any = '#1C31E3';
  a_bg_heading_text:any = '#1C31E3';
  menu_text:any = '#CE6459';
  widget_text:any= '#E31C61';
  error_validation:any = '#B81CE3';
  header_text_icon:any = '#1C31E3';
  input_fields:any = '#1CE3D7';
  acc_ord_id: any;

  constructor(private commonService:CommonService, private router: Router, private dataService: DataService,private formBuilder: FormBuilder, ) { }


  ngOnInit(): void {
    console.log(history.state);
    this.acc_ord_id = history.state.accountId
    console.log(this.acc_ord_id);
    this.editThemeSetting(this.acc_ord_id);
  }
  country = 'India';
  state = 'chennai';
  editThemeSetting(theme_id:any){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=ThemeSetting&q=refAccountID=="+theme_id).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
      
        console.log('edited data=>',response1["data"]);
        this.app_bg_color = response1["data"][0]["applicationBackground"]["value"];
        this.menu_color = response1["data"][0]["menuColor"]["value"];
        this.button_table_color =  response1["data"][0]["buttonTableColor"]["value"];
        this.header_color = response1["data"][0]["headerColor"]["value"];
        this.widget_color = response1["data"][0]["widgetColor"]["value"];
        this.a_bg_heading_text =  response1["data"][0]["backgroundHeadingText"]["value"];
        this.menu_text =  response1["data"][0]["menuText"]["value"];
        this.widget_text =  response1["data"][0]["widgetText"]["value"];
        this.error_validation =  response1["data"][0]["errorValidation"]["value"];
        this.header_text_icon =  response1["data"][0]["headerTextIcon"]["value"];
        this.input_fields =  response1["data"][0]["inputFields"]["value"];
        this.model0 = {
          headline_h1:  response1["data"][0]["headlineH1"]["value"],
          title_h2:  response1["data"][0]["titleH2"]["value"],
          subheading_1_h3:  response1["data"][0]["subheading1H3"]["value"],
          subheading_1_h4: response1["data"][0]["subheading1H4"]["value"],
          body_1_h5: response1["data"][0]["body1H5"]["value"],
          ts_input:  response1["data"][0]["input"]["value"],
          button:   response1["data"][0]["button"]["value"],


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
          className: 'flex-1',
          type: 'inno-input',
          key: 'headline_h1',
          templateOptions: {
            label: 'Headline H1',
          

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'title_h2',
          templateOptions: {
            label: 'Title H2',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'subheading_1_h3',
          templateOptions: {
            label: 'Subheading 1 H3',
         
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
          key: 'subheading_1_h4',
          templateOptions: {
            label: 'Subheading 1 H4',
         

            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'body_1_h5',
          templateOptions: {
            label: 'Body 1 H5',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'ts_input',
          templateOptions: {
            label: 'Input ',
          
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
          key: 'button',
          templateOptions: {
            label: 'Button',
         

            required: true,
          },
        },
        {
          className: 'flex-1',
        
        },
        {
          className: 'flex-1',
        
        },
      
      ],
    },
    
    
   
   
  ];


  saveThemeData(){

    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=ThemeSetting&q=refAccountID=="+this.acc_ord_id).subscribe(
      (response1: any) => {
       if(response1["data"].length == 0){
        console.log('new data');
      

          if(this.form0.valid){

         
            var post_val:any = {
              "type": "ThemeSetting",
              "refAccountID":{
                "type": "Relationship",
                "value":this.acc_ord_id
        
              },
              "applicationBackground": {
                "type": "Property",
                "value": this.app_bg_color
               
              },
              "menuColor": {
                "type": "Property",
                "value":this.menu_color
               
              },
              "buttonTableColor": {
                "type": "Property",
                "value": this.button_table_color
               
              },
              "headerColor": {
                "type": "Property",
                "value": this.header_color
              },
              "widgetColor": {
                "type": "Property",
                "value": this.header_color
              },
              "backgroundHeadingText": {
                "type": "Property",
                "value": this.a_bg_heading_text
              },
              "menuText": {
                "type": "Property",
                "value": this.menu_text
              },
              "widgetText": {
                "type": "Property",
                "value": this.widget_text
              },
              "errorValidation": {
                "type": "Property",
                "value": this.error_validation
              },
              "headerTextIcon": {
                "type": "Property",
                "value": this.header_text_icon
              },
              "inputFields": {
                "type": "Property",
                "value": this.input_fields
                },
              "headlineH1": {
                  "type": "Property",
                  "value": this.model0.headline_h1
                  },
              "titleH2": {
                  "type": "Property",
                  "value": this.model0.title_h2
                },
              "subheading1H3": {
                  "type": "Property",
                  "value": this.model0.subheading_1_h3
                },
              "subheading1H4": {
                  "type": "Property",
                  "value": this.model0.subheading_1_h4
                },
              "body1H5": {
                  "type": "Property",
                  "value": this.model0.body_1_h5
                },
              "input": {
                  "type": "Property",
                  "value": this.model0.ts_input
                },
              "button": {
                  "type": "Property",
                  "value": this.model0.button
                },
              
             
        
        
              }
        
        console.log( post_val)
              this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response2: any) => {
                console.log('Account added response',response2);
                this.router.navigateByUrl("accounts");
                this.commonService.triggerToast({ type: 'success', title: "", msg: "Create Account Theme added" })
               // this.router.navigateByUrl('/create-accounts-details', { state: { accountId:response2["data"]["id"]  } });
        
              });
        
            }
      

       }
       else{
        console.log('editted data');
        if(this.form0.valid){

         
          var post_val:any = {
           
            "refAccountID":{
              "type": "Relationship",
              "value":this.acc_ord_id
      
            },
            "applicationBackground": {
              "type": "Property",
              "value": this.app_bg_color
             
            },
            "menuColor": {
              "type": "Property",
              "value":this.menu_color
             
            },
            "buttonTableColor": {
              "type": "Property",
              "value": this.button_table_color
             
            },
            "headerColor": {
              "type": "Property",
              "value": this.header_color
            },
            "widgetColor": {
              "type": "Property",
              "value": this.header_color
            },
            "backgroundHeadingText": {
              "type": "Property",
              "value": this.a_bg_heading_text
            },
            "menuText": {
              "type": "Property",
              "value": this.menu_text
            },
            "widgetText": {
              "type": "Property",
              "value": this.widget_text
            },
            "errorValidation": {
              "type": "Property",
              "value": this.error_validation
            },
            "headerTextIcon": {
              "type": "Property",
              "value": this.header_text_icon
            },
            "inputFields": {
              "type": "Property",
              "value": this.input_fields
              },
            "headlineH1": {
                "type": "Property",
                "value": this.model0.headline_h1
                },
            "titleH2": {
                "type": "Property",
                "value": this.model0.title_h2
              },
            "subheading1H3": {
                "type": "Property",
                "value": this.model0.subheading_1_h3
              },
            "subheading1H4": {
                "type": "Property",
                "value": this.model0.subheading_1_h4
              },
            "body1H5": {
                "type": "Property",
                "value": this.model0.body_1_h5
              },
            "input": {
                "type": "Property",
                "value": this.model0.ts_input
              },
            "button": {
                "type": "Property",
                "value": this.model0.button
              },
            
           
      
      
            }
      
      console.log( post_val)
      
      this.dataService.patchData(post_val, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/ThemeSetting').subscribe((response7: any) => {
        console.log('Account added response',response7);
              this.router.navigateByUrl("accounts");
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Account successfullty updated.." })
      })
          
      
          }
      

       }

      });

//     if(this.form0.valid){

         
//     var post_val:any = {
//       "type": "ThemeSetting",
//       "refAccountID":{
//         "type": "Relationship",
//         "value":this.acc_ord_id

//       },
//       "applicationBackground": {
//         "type": "Property",
//         "value": this.app_bg_color
       
//       },
//       "menuColor": {
//         "type": "Property",
//         "value":this.menu_color
       
//       },
//       "buttonTableColor": {
//         "type": "Property",
//         "value": this.button_table_color
       
//       },
//       "headerColor": {
//         "type": "Property",
//         "value": this.header_color
//       },
//       "widgetColor": {
//         "type": "Property",
//         "value": this.header_color
//       },
//       "backgroundHeadingText": {
//         "type": "Property",
//         "value": this.a_bg_heading_text
//       },
//       "menuText": {
//         "type": "Property",
//         "value": this.menu_text
//       },
//       "widgetText": {
//         "type": "Property",
//         "value": this.widget_text
//       },
//       "errorValidation": {
//         "type": "Property",
//         "value": this.error_validation
//       },
//       "headerTextIcon": {
//         "type": "Property",
//         "value": this.header_text_icon
//       },
//       "inputFields": {
//         "type": "Property",
//         "value": this.input_fields
//         },
//       "headlineH1": {
//           "type": "Property",
//           "value": this.model0.headline_h1
//           },
//       "titleH2": {
//           "type": "Property",
//           "value": this.model0.title_h2
//         },
//       "subheading1H3": {
//           "type": "Property",
//           "value": this.model0.subheading_1_h3
//         },
//       "subheading1H4": {
//           "type": "Property",
//           "value": this.model0.subheading_1_h4
//         },
//       "body1H5": {
//           "type": "Property",
//           "value": this.model0.body_1_h5
//         },
//       "input": {
//           "type": "Property",
//           "value": this.model0.ts_input
//         },
//       "button": {
//           "type": "Property",
//           "value": this.model0.button
//         },
      
     


//       }

// console.log( post_val)
//       this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response2: any) => {
//         console.log('Account added response',response2);
//         this.router.navigateByUrl("accounts");
//         this.commonService.triggerToast({ type: 'success', title: "", msg: "Create Account Theme added" })
//        // this.router.navigateByUrl('/create-accounts-details', { state: { accountId:response2["data"]["id"]  } });

//       });

//     }


    
  }
}
