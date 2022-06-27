import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdduserComponent } from './modules/pages/adduser/adduser.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
