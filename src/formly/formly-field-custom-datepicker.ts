import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'formly-field-custom-datepicker',
  template: `<mat-form-field appearance="outline"  style="width: 100% !important;"  class="example-form-field">

  <input matInput  [formControl]="formControl" [formlyAttributes]="field" [matDatepicker]="datepicker">
 
  <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
  <mat-datepicker #datepicker>
    <mat-datepicker-actions>
      <button mat-button matDatepickerCancel>Cancel</button>
      <button mat-raised-button color="primary" matDatepickerApply>Apply</button>
    </mat-datepicker-actions>
  </mat-datepicker>
</mat-form-field>
  `,
})
export class FormlyFieldCustomDatePicker extends FieldType {
}