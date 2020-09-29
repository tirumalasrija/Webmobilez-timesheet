import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';

import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [

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
