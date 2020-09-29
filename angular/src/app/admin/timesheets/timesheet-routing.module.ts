import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './timesheet-index/user-index.component';
import { TimesheetCreateComponent } from './timesheet-create/timesheet-create.component';
import { UserEditComponent } from './timesheet-edit/user-edit.component';
import { UserListComponent } from './timesheet-list/user-list.component';
import { TimesheetDocumentsComponent } from './timesheet-documents/timesheet-documents.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [
      {path: 'create', component: TimesheetCreateComponent},
      {path: 'edit/:id', component: UserEditComponent},
      {path: 'delete', component: UserIndexComponent},
      {path: 'list', component: UserListComponent},
      {path: 'documents', component: TimesheetDocumentsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
