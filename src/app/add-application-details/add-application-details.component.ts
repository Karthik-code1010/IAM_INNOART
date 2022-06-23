import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-application-details',
  templateUrl: './add-application-details.component.html',
  styleUrls: ['./add-application-details.component.scss']
})
export class AddApplicationDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
   
      fieldGroup: [
       
        {
         
          type: 'inno-input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter Name',
          },
          validation: {
            messages: {
                required: 'You need to provide a Name! '
            }
        }
        },
        {
         
          type: 'inno-input',
          key: 'shortdescription',
          templateOptions: {
            label: 'Short Description',
            placeholder: 'Short Description',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a Short Description'
            }
        }
        },
        {
        
          type: 'inno-input',
          key: 'application',
          templateOptions: {
            label: 'Application',
            placeholder: 'Application',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
        
          type: 'inno-input',
          key: 'dockerrepo',
          templateOptions: {
            label: 'Docker Repository',
            placeholder: 'Docker Repository',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        }, 
        {
         
          type: 'inno-input',
          key: 'dockerimage',
          templateOptions: {
            label: 'Docker Image',
            placeholder: 'Docker Repository',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
        
          type: 'inno-input',
          key: 'imageversion',
          templateOptions: {
            label: 'Image Version',
            placeholder: 'Image Version',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
        
          type: 'inno-input',
          key: 'dockerimageversion',
          templateOptions: {
            label: 'Docker Image Version',
            placeholder: 'Docker Image Version',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
         
          type: 'inno-input',
          key: 'githunsource',
          templateOptions: {
            label: 'GitHub Source',
            placeholder: 'GitHub Source',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
         
          type: 'inno-input',
          key: 'githubtoken',
          templateOptions: {
            label: 'GitHub Token',
            placeholder: 'GitHub Token',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
        
          type: 'inno-input',
          key: 'dockerrepouser',
          templateOptions: {
            label: 'Docker Repository User',
            placeholder: 'Docker Repository User',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
         
          type: 'inno-input',
          key: 'dockerrepouser',
          templateOptions: {
            label: 'Docker Repository User',
            placeholder: 'Docker Repository User',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        {
         
          type: 'inno-input',
          key: 'islatestversion',
          templateOptions: {
            label: 'Is Latest Version',
            placeholder: 'Is Latest Version',
            required:true,
          },
          validation: {
            messages: {
                required: 'You need to provide a last name! '
            }
        },
         
        },
        
      ],
    },
   
    
  
    
  ];

}
