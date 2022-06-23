


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddApplicationDetailsComponent } from './add-application-details/add-application-details.component';


import { FormlyFieldCustomInput } from 'src/formly/formly-field-custom-input';

import { IdentityAccessComponent } from './modules/pages/identity-access/identity-access.component';

import { DataPrivacyComponent } from './modules/pages/data-privacy/data-privacy.component';

import { DialogboxComponent } from './modules/pages/dialogbox/dialogbox.component';
import { GrouppermissionComponent } from './modules/pages/grouppermission/grouppermission.component';
import { UserpermissionComponent } from './modules/pages/userpermission/userpermission.component';
import { GlobaldataprivacyComponent } from './modules/pages/globaldataprivacy/globaldataprivacy.component';
import { ListOfUsersComponent } from './modules/pages/list-of-users/list-of-users.component';
import { AdduserComponent } from './modules/pages/adduser/adduser.component';
import { ListOfGroupComponent } from './modules/pages/list-of-group/list-of-group.component';
import { ListOfFieldsComponent } from './modules/pages/list-of-fields/list-of-fields.component';
import { AddgroupnameDialogComponent } from './modules/pages/addgroupname-dialog/addgroupname-dialog.component';
import { AccountsComponent } from './modules/pages/accounts/accounts.component';
import { AccountDialogComponent } from './modules/pages/account-dialog/account-dialog.component';
import { CreateAccountComponent } from './modules/pages/create-account/create-account.component';
import { CreateAccountDetailsComponent } from './modules/pages/create-account-details/create-account-details.component';
import { CreateAccountThemeComponent } from './modules/pages/create-account-theme/create-account-theme.component';
import { ColumnDialog } from './modules/pages/column-dialog/column-dialog';

import { FormlyFieldCustomSelect } from 'src/formly/formly-field-custom-select';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial.module';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';


import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';
import { FormlyFieldCustomDatePicker } from 'src/formly/formly-field-custom-datepicker';
import { FormlyFieldCustomFile } from 'src/formly/formly-field-custom-file';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    FormlyFieldCustomFile ,
    FormlyFieldCustomDatePicker,
    FormlyFieldCustomSelect,
    ColumnDialog,
    AppComponent,
    AddApplicationDetailsComponent,
    FormlyFieldCustomInput,
    IdentityAccessComponent,
    DataPrivacyComponent,
    DialogboxComponent,
    GrouppermissionComponent,
    UserpermissionComponent,
    GlobaldataprivacyComponent,
    ListOfUsersComponent,
    AdduserComponent,
    ListOfGroupComponent,
    ListOfFieldsComponent,
    AddgroupnameDialogComponent,
    AccountsComponent,
    AccountDialogComponent,
    CreateAccountComponent,
    CreateAccountDetailsComponent,
    CreateAccountThemeComponent,


   
   
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(), 
    
    FlexLayoutModule,
    MatFormFieldModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ 
      extras: { lazyRender: true },
     
      types: [
     
      { name: 'inno-input', component: FormlyFieldCustomInput}, //
      { name: 'inno-select', component: FormlyFieldCustomSelect}, 
      { name: 'inno-date', component: FormlyFieldCustomDatePicker}, 
      { name: 'inno-file', component:  FormlyFieldCustomFile }, 
      
    ],
      wrappers: [
       
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ], 
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
