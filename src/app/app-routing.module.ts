import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApplicationDetailsComponent } from './add-application-details/add-application-details.component';
import { AccountsComponent } from './modules/pages/accounts/accounts.component';
import { AdduserComponent } from './modules/pages/adduser/adduser.component';
import { CreateAccountDetailsComponent } from './modules/pages/create-account-details/create-account-details.component';
import { CreateAccountThemeComponent } from './modules/pages/create-account-theme/create-account-theme.component';
import { CreateAccountComponent } from './modules/pages/create-account/create-account.component';
import { DataPrivacyComponent } from './modules/pages/data-privacy/data-privacy.component';
import { GlobaldataprivacyComponent } from './modules/pages/globaldataprivacy/globaldataprivacy.component';
import { GrouppermissionComponent } from './modules/pages/grouppermission/grouppermission.component';
import { IdentityAccessComponent } from './modules/pages/identity-access/identity-access.component';
import { ListOfFieldsComponent } from './modules/pages/list-of-fields/list-of-fields.component';
import { ListOfGroupComponent } from './modules/pages/list-of-group/list-of-group.component';
import { ListOfUsersComponent } from './modules/pages/list-of-users/list-of-users.component';
import { UserpermissionComponent } from './modules/pages/userpermission/userpermission.component';

const routes: Routes = [
  {path:"", component: ListOfUsersComponent},
  {path:"identity-access", component: IdentityAccessComponent}, //DataPrivacyComponent
  {path:"data-privacy", component: DataPrivacyComponent}, //GrouppermissionComponent
  {path:"group-permission", component: GrouppermissionComponent}, 
  {path:"user-permission", component: UserpermissionComponent}, //UserpermissionComponent
  {path:"global-data", component: GlobaldataprivacyComponent},//GlobaldataprivacyComponent
  {path:"list-of-user", component: ListOfUsersComponent}, //AdduserComponent
  {path:"add-user", component: AdduserComponent},  //ListOfGroupComponent
  {path:"list-of-group", component: ListOfGroupComponent}, // ListOfFieldsComponent
  {path:"list-fields", component: ListOfFieldsComponent},  //AccountsComponent
  {path:"accounts", component: AccountsComponent},  //CreateAccountComponent
  {path:"create-accounts", component: CreateAccountComponent},  //CreateAccountDetailsComponent
  {path:"create-accounts-details", component: CreateAccountDetailsComponent}, //CreateAccountThemeComponent
  {path:"create-accounts-theme", component: CreateAccountThemeComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
