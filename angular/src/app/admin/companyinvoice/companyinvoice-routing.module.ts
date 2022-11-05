import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './companyinvoice-index/companyinvoice-index.component';
import { UserViewComponent } from './companyinvoice-view/companyinvoice-view.component';
import { UserCreateComponent } from './companyinvoice-create/companyinvoice-create.component';
import { UserEditComponent } from './companyinvoice-edit/companyinvoice-edit.component';
import { UserListComponent } from './companyinvoice-list/companyinvoice-list.component';
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
      {path: 'view/:id', component: UserViewComponent,data: {
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
export class CompanyInvoiceRoutingModule { }
