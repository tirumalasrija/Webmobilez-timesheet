import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportIndexComponent } from './support-index/support-index.component';
import { SupportCreateComponent } from './support-create/support-create.component';
import { SupportEditComponent } from './support-edit/support-edit.component';
import { SupportListComponent } from './support-list/support-list.component';

const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: SupportIndexComponent,
    children: [
      {path: 'create', component: SupportCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'edit/:id', component: SupportEditComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'delete', component: SupportIndexComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'list', component: SupportListComponent,data: {
        expectedRole: 'Admin'
      }},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
