import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetRestService } from '../timesheet-rest.service';
import { Customer,Representative  } from '../../../customer';

import { Table } from 'primeng/table';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    representatives: Representative[];
    statuses: any[];
    loading: boolean = true;
    @ViewChild('dt',{static: false}) table: Table;
  constructor(private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router) { }

  items: MenuItem[];
  activeItem: MenuItem;
    ngOnInit() {
        this.items = [
            {label: 'Timesheets', icon: 'pi pi-fw pi-home',routerLink:['/timesheets/list']},
            {label: 'Documents', icon: 'pi pi-fw pi-file-o',routerLink:['/timesheets/documents']},
         //   {label: 'Add TimeSheet', icon: 'pi pi-fw pi-calendar',routerLink:['/timesheets/create']},
        ];
        this.activeItem = this.items[0];

  }


}
