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
  representatives: Representative[];

  statuses: any[];
  userselect: any;
  date12: Date[];
  loading: boolean = true;
  users: any;
  totalHours: any;

  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  ngOnInit() {

    this.userRest.getTimeSheet().subscribe(
      (response) => {  this.timeSheets = response.timesheet; this.loading = false; },
      (error) => { console.log(error) }
    );
    this.userRest.getUsers().subscribe(
      (responses) => {
        this.users = responses.user;

      },
      (error) => { console.log(error) }
    );
    this.representatives = [
      { name: "Amy Elsner", image: 'amyelsner.png' },
      { name: "Anna Fali", image: 'annafali.png' },
      { name: "Asiya Javayant", image: 'asiyajavayant.png' },
      { name: "Bernardo Dominic", image: 'bernardodominic.png' },
      { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
      { name: "Ioni Bowcher", image: 'ionibowcher.png' },
      { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
      { name: "Onyama Limba", image: 'onyamalimba.png' },
      { name: "Stephen Shaw", image: 'stephenshaw.png' },
      { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
  }
  searchByDateReportSubmitId() {

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
          this.timeSheets = response.timesheets
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
        this.timeSheets = response.timesheets
        this.totalHours = response.getHours;
      },
      error => {

      }
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
    this.table.filter(this.formatDate(value), 'fromDate', 'equals')
  }
  clearFilters() {
    this.userselect = '';
    this.date12 = null;
    this.userRest.getTimeSheet().subscribe(
      (response) => {  this.timeSheets = response.timesheet; this.loading = false; },
      (error) => { console.log(error) }
    );
  }
  formatDate2(date1,date2) {
    let month = date1.getMonth() + 1;
    let day = date1.getDate();
    let month1 = date2.getMonth() + 1;
    let day1 = date2.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (month1 < 10) {
      month1 = '0' + month1;
    }

    if (day < 10) {
      day = '0' + day;
    }
    if (day1 < 10) {
      day1 = '0' + day1;
    }

    return date1.getFullYear() + '-' + month + '-' + day+'&date2='+date2.getFullYear() + '-' + month1 + '-' + day1;
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
  getColor(status: string,duration:number) {
     
    if (duration == 0) {
      return "rgb(248, 215, 218)"
    }
  }


}
