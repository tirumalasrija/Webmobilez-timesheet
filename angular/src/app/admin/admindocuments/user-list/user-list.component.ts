import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Customer, Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from '../../timesheets/products';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/primeng';

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
  representatives: Representative[];

  statuses: any[];
  userselect: any;
  date12: Date;
  loading: boolean = true;
  users: any;
  totalHours: any;
  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  ngOnInit() {

    this.userRest.getTimeSheetDocuments().subscribe(
      (response) => {  this.timeSheets = response.documents; this.loading = false; },
      (error) => { console.log(error) }
    );
    this.userRest.getUsers().subscribe(
      (responses) => {
        console.log(this.users = responses.user);

      },
      (error) => { console.log(error) }
    );

  }
  clearFilters() {
    this.userselect = '';
    this.date12 = null;
    this.userRest.getTimeSheetDocuments().subscribe(
      (response) => {  this.timeSheets = response.documents; this.loading = false; },
      (error) => { console.log(error) }
    );
  }
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'startWeek', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
  searchByDateReportSubmitId() {
   // let date = this.formatDate(this.date12);
   let date1:any;
    let date2:any;

    if(this.date12[0]&&this.date12[1])
    {
      if(!this.userselect)
      {
        alert("Please Select Employee")
      }
      date1 = this.formatDate(this.date12[0]);
      date2 = this.formatDate(this.date12[1]);

    if (this.userselect) {
      var body = "userId=" + this.userselect + "&date1="+date1+"&date2="+date2;
    }
    this.userRest.getpaymentSearchTimesheet(body).subscribe(
      response => {
        this.timeSheets = response.documents
        this.totalHours = response.getHours;
      },
      error => {

      }
    );
    }
  }
  searchReportSubmitId($event: any) {

    var body = "userId=" + $event;
    if (this.date12) {
      let date = this.formatDate(this.date12);
      var body = "userId=" + $event + "&date=" + date;
    }

    this.userRest.getpaymentSearchTimesheet(body).subscribe(
      response => {
        this.timeSheets = response.documents
        this.totalHours = response.getHours;
      },
      error => {

      }
    );
  }


}
