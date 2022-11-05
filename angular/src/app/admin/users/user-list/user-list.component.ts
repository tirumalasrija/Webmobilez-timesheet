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
  displayBasic: boolean;
fullname:string;
contactNumber:string;
emergencyNumber:string;
emrgencyContactPerson:string;
relationContactPerson:string;
address:string;
urate:number;
email:string;
paymentType: string;
paymentMode:string;

  constructor( private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
     private router: Router) { }

  ngOnInit() {

    this.userRest.getUsers().subscribe(
      (response) => {  this.timeSheets = response.user; this.loading = false; },
      (error) => { console.log(error) }
    );

  }
  showBasicDialog(event) {
    this.displayBasic = true;
    this.fullname= event.name +' '+event.lastName;
    this.contactNumber= event.contactNumber;
    this.emergencyNumber= event.emergencyNumber;
    this.emrgencyContactPerson= event.emrgencyContactPerson;
    this.relationContactPerson= event.relationContactPerson;
    this.address= event.address;
    this.urate= event.rate;
    this.email= event.email;
    this.paymentType= event.paymentType;
    this.paymentMode= event.paymentMode;

  }
  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteUser(id).subscribe(
        (response) => {this.timeSheets = response.user },
        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['users/edit',id]);
  }

}
