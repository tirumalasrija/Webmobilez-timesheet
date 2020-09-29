import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

    childMenu:Array<object>;
}

export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon:'nc-bank', class: '',
        childMenu: null
    },
    {path: '/timesheets/list', title: 'Time Sheets', icon: 'nc-calendar-60', class: '', childMenu: null},
    { path: '/profile',        title: 'Your Profile', icon:'nc-single-02',  class: '' ,childMenu: null},

    /*   {path: '/users/list', title: 'Users', icon: 'nc-single-02', class: '', childMenu: null},
 { path: '', title: 'Manage Timesheets', icon:'nc-support-17', class: '',
        childMenu: [
            {path: '/timesheets', title: 'Time Sheets', icon: 'nc-single-02', class: ''},

        ]
    } */
];
export const AdminROUTES: RouteInfo[] = [
  {
      path: '/dashboard', title: 'Dashboard', icon:'nc-bank', class: '',
      childMenu: null
  },


  { path: '/users/list',        title: 'Users List', icon:'nc-single-02',  class: '' ,childMenu: null},
  { path: '/admintimesheets/list',        title: 'Timesheet List', icon:'nc-calendar-60',  class: '' ,childMenu: null},
  { path: '/admindocuments/list',        title: 'Timesheet Documents', icon:'nc-calendar-60',  class: '' ,childMenu: null},
  { path: '/profile',      title: 'Your Profile', icon:'nc-icon nc-settings',  class: '' ,childMenu: null},

  /*   {path: '/users/list', title: 'Users', icon: 'nc-single-02', class: '', childMenu: null},
{ path: '', title: 'Manage Timesheets', icon:'nc-support-17', class: '',
      childMenu: [
          {path: '/timesheets', title: 'Time Sheets', icon: 'nc-single-02', class: ''},

      ]
  } */
];

// [
//     { path: '/users',         title: 'User List',         icon:'nc-bank',       class: '' },
//     { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
//     { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
//     { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
//     { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
//     { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
//     { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
//     { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' }
// ];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  menuexpectedrole:string;
    public menuItems: any[];
    public AdminmenuItems: any[];
    ngOnInit() {
      this.menuexpectedrole =localStorage.getItem('role');
      console.log(this.menuexpectedrole)
      if( this.menuexpectedrole =='Admin')
      {
        this.menuItems = AdminROUTES.filter(menuItem => menuItem);
      }else{
        this.menuItems = ROUTES.filter(menuItem => menuItem);

      }
    }
}
