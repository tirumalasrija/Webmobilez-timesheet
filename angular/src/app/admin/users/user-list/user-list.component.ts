import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Customer, Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from '../../timesheets/products';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];

  loading: boolean = true;


  constructor( private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
     private router: Router) { }

  ngOnInit() {

    this.userRest.getUsers().subscribe(
      (response) => { console.log(this.timeSheets = response.user); this.loading = false; },
      (error) => { console.log(error) }
    );

  }

  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteUser(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['users/edit',id]);
  }

}
