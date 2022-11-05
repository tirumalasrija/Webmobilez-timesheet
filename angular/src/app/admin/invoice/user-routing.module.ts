import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserViewComponent } from './user-view/user-edit.component';
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
        expectedRole: 'User'
      }},

      {path: 'edit/:id', component: UserEditComponent,data: {
        expectedRole: 'User'
      }},
      {path: 'delete', component: UserIndexComponent,data: {
        expectedRole: 'User'
      }},
      {path: 'view/:id', component: UserViewComponent,data: {
        expectedRole: 'User'
      }},
      {path: 'list', component: UserListComponent,data: {
        expectedRole: 'User'
      }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
