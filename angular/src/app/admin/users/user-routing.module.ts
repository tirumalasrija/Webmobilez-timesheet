import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDocumentCreateComponent } from './userdocuments/user-documents-create/user-create.component';
import { UserDocumentEditComponent } from './userdocuments/user-documents-edit/user-edit.component';
import { UserDocumentListComponent } from './userdocuments/user-documents-list/user-document-list.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [
      {path: 'create', component: UserCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'edit/:id', component: UserEditComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'delete', component: UserIndexComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'list', component: UserListComponent,data: {
        expectedRole: 'Admin'
      }},
       {path: 'documentcreate', component: UserDocumentCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'documentuserlist', component: UserDocumentListComponent,data: {
        expectedRole: 'Admin'
      }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
