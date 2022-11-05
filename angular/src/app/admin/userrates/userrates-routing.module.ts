import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRatesIndexComponent } from './userrates-index/userrates-index.component';
import { UserRatesCreateComponent } from './userrates-create/userrates-create.component';
import { UserRatesEditComponent } from './userrates-edit/userrates-edit.component';
import { UserRatesListComponent } from './userrates-list/userrates-list.component';

const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserRatesIndexComponent,
    children: [
      {path: 'create', component: UserRatesCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'edit/:id', component: UserRatesEditComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'delete', component: UserRatesIndexComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'list', component: UserRatesListComponent,data: {
        expectedRole: 'Admin'
      }},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRatesRoutingModule { }
