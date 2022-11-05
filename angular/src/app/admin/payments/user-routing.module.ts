import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
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
      }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
