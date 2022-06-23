import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-custom-file',
  template: `
  <mat-card class="input-container" style="margin-top: 5px;">
  <button #file mat-button color="primary">Organization Logo
  <input type="file" #myInput 
  style="color:block; opacity: 0; position:absolute; left:0px; top:0px; width:100%; height:100%;"
  [formControl]="formControl"
  [formlyAttributes]="field"
  multiple="multiple"
  (change)="onFileSelected($event)"
  >
  </button>
  {{files|json}}
</mat-card>
 
 
  `,
})

export class FormlyFieldCustomFile extends FieldType { // [multiple]="to.multiple"
  // fileChanged(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       reader.onload = (event: any) => {
  //         console.log(event.target.result);
  //         debugger;
  //         console.log(this.formControl);
  //         //console.log(this.field.templateOptions.nextFields);
  //          this.formControl.patchValue(event.target.result)
  //       }
  //       reader.readAsDataURL(event.target.files[i]);
  //     }

  //     //reader.readAsText(event.target.files[0]);
  //   }
  // }
  files: string[] = [];
  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i].name);
        console.log(event.target.files[0].name);
      }
    }
  }
}