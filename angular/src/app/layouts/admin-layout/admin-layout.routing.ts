import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { UserDocsComponent } from '../../pages/userdocs/userdocs.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { RouteGuardService } from 'app/rout-guard.service';
import { SupportComponent } from '../../pages/support/support.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent },
  { path: 'support', canActivate: [AuthGuardService], component: SupportComponent },
  { path: 'userdocuments', canActivate: [AuthGuardService], component: UserDocsComponent },
  {
    path: 'timesheets', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/timesheets/timesheet.module').then(m => m.TimesheetModule),
  },
  {
    path: 'users', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/users/user.module').then(m => m.UserModule),
  },
  {
    path: 'userrates', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/userrates/userrates.module').then(m => m.UserRatesModule),
  },
  {
    path: 'adminsupport', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/support/support.module').then(m => m.SupportModule),
  },
  {
    path: 'payments', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/payments/user.module').then(m => m.UserModule),
  },
  {
    path: 'invoice', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'User'
    },

    loadChildren: () => import('../../admin/invoice/user.module').then(m => m.UserModule),
  },
  {
    path: 'admininvoice', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/admininvoice/user.module').then(m => m.UserModule),
  },
  {
    path: 'companyinvoice', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/companyinvoice/companyinvoice.module').then(m => m.CompanyInvoiceModule),
  },
  {
    path: 'admintimesheets', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/admintimesheet/user.module').then(m => m.UserModule),
  },
  {
    path: 'admindocuments', canActivateChild: [RouteGuardService], data: {
      expectedRole: 'Admin'
    },

    loadChildren: () => import('../../admin/admindocuments/user.module').then(m => m.UserModule),
  },
  {
    path: 'docs', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/commonmodule/user.module').then(m => m.UserModule),
  },

];

