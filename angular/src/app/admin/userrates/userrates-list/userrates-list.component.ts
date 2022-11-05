import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRatesRestService } from '../userrates-rest.service';
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
  selector: 'userrates-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  templateUrl: './userrates-list.component.html',
  styleUrls: ['./userrates-list.component.scss']
})
export class UserRatesListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];

  loading: boolean = true;


  constructor( private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRatesRestService,
     private router: Router) { }

  ngOnInit() {

    this.userRest.getRates().subscribe(
      (response) => {  this.timeSheets = response.userrates; this.loading = false; },
      (error) => { console.log(error) }
    );

  }

  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteSupport(id).subscribe(
        (response) => {this.timeSheets = response.userrates} ,

        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['userrates/edit',id]);
  }

}
