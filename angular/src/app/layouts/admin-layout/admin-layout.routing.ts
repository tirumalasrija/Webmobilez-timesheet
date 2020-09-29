import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { RouteGuardService } from 'app/rout-guard.service';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', canActivate:[AuthGuardService],      component: DashboardComponent },
    { path: 'profile',   canActivate:[AuthGuardService],        component: UserComponent },

    { path: 'timesheets', canActivateChild:[AuthGuardService],
      loadChildren: () => import('../../admin/timesheets/timesheet.module').then(m => m.TimesheetModule),
    },
    { path: 'users', canActivateChild:[RouteGuardService],data: {
      expectedRole: 'Admin'
    } ,

    loadChildren: () => import('../../admin/users/user.module').then(m => m.UserModule),
  },
  { path: 'admintimesheets', canActivateChild:[RouteGuardService],data: {
    expectedRole: 'Admin'
  } ,

  loadChildren: () => import('../../admin/admintimesheet/user.module').then(m => m.UserModule),
},
{ path: 'admindocuments', canActivateChild:[RouteGuardService],data: {
  expectedRole: 'Admin'
} ,

loadChildren: () => import('../../admin/admindocuments/user.module').then(m => m.UserModule),
},


];

