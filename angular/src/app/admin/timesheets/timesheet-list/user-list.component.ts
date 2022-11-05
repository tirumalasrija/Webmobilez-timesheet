import { Component, ChangeDetectionStrategy, Input, TemplateRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetRestService } from '../timesheet-rest.service';
import { Customer, Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from '../../timesheets/products';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  subMonths, addMonths, addDays, addWeeks, subDays,
  subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  startOfDay, endOfDay,
} from 'date-fns';
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
  @Input() max: any;
  @Input() min: any;

  public ownerForm: FormGroup;
  serverErrors = [];
  registerForm: FormGroup;
  myDate = new Date();
  users: Array<any> = [];
  formattedDate: string;
  selectedValue: string = 'val2';

  tomorrow: any;
  yesterday: any;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  assignments: SelectItem[];
  serviceCodes: SelectItem[];
  clonedProducts: { [s: string]: Product; } = {};
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
  timeSheetEditable: boolean = true;
  customers: Customer[];
  representatives: Representative[];
  loading: boolean = true;
  minDate: Date = addMonths(new Date(), 10);;
  maxDate: Date = addMonths(new Date(), 10);
  prevBtnDisabled: boolean = true;
  nextBtnDisabled: boolean = true;
  disabled: boolean = false;
  items: MenuItem[];
  constructor(private messageService: MessageService, private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router) {
    let actualDate: number = new Date().getDate();
    let actualMonth: number = new Date().getMonth();
    let actualYear: number = new Date().getFullYear();
    this.tomorrow = this.formatDate(new Date(actualYear, actualMonth, actualDate));

  }



  dateIsValid(date: Date): boolean {
    return date <= this.viewDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }
  dateOrViewChanged(): void {
    console.log(this.viewDate);

    console.log(this.getLastWeek(this.viewDate));
    console.log("log" + new Date(this.minDate));
    this.prevBtnDisabled = !this.dateIsValid(new Date(this.minDate));
  }
  ngOnInit() {

    this.assignments = [{ label: 'Mainframe Developer', value: 'Mainframe Developer' }]
    this.serviceCodes = [{ label: 'Regular', value: 'Regular' }];
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;

    this.userRest.getTimeSheets(formattedDate).subscribe(
      (response) => {
        console.log(this.timeSheets = response.timesheet);
        this.minDate = response.user.joinDate;
        this.dateOrViewChanged();
        this.loading = false;
      },
      (error) => { this.loading = false; console.log(error) }
    );

    this.userRest.getCurentUser().subscribe(
      (response) => {
        console.log(this.users = response.user);
        this.registerForm.patchValue({ assignment: response.user.technology })
      },
      (error) => { console.log(error) }
    );
    this.registerForm = new FormGroup({
      'duration': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(15)]),
      'date': new FormControl(new Date(), [Validators.required]),
      'assignment': new FormControl("", [Validators.required]),
      'serviceCode': new FormControl("Regular", [Validators.required]),
      'groupname': new FormControl("onduty"),
    })

  }
  get groupname() { return this.registerForm.get('groupname'); }
  get duration() { return this.registerForm.get('duration'); }
  get date() { return this.registerForm.get('date'); }
  get assignment() { return this.registerForm.get('assignment'); }
  get serviceCode() { return this.registerForm.get('serviceCode'); }
  changeStatus($event) {
    if (this.registerForm.value.groupname == 'leave' || this.registerForm.value.groupname == 'holiday' ) {
      this.registerForm.controls['duration'].disable();
      this.registerForm.patchValue({ duration: 0 })
    } else {
      this.registerForm.controls['duration'].enable();
    }


  }
  registerUser() {
   
    let dateformat = this.registerForm.value.date.getFullYear() + '-' + ('0' + (this.registerForm.value.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.registerForm.value.date.getDate()).slice(-2);
    let curdate = startOfWeek(new Date());
    let durationvalue = this.registerForm.value.duration
    if (this.registerForm.value.groupname == 'leave'||this.registerForm.value.groupname == 'holiday') {
      durationvalue = '1';
    }
    let value = {
      "groupname": this.registerForm.value.groupname,
      "duration": durationvalue,
      'date': dateformat,
      'assignment': this.registerForm.value.assignment,
      'serviceCode': this.registerForm.value.serviceCode
    }
    this.userRest.storeUser(value).subscribe(
      response => {
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet is added' });
        this.timeSheets = response.timesheet;
        this.serverErrors = [];
      },
      error => {
        this.serverErrors = error.error.errors
       

      }
    );
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


  getLastWeek(today: Date) {

    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
  }

  dayHeaderClicked(evn) {
    this.serverErrors = [];
    this.dateOrViewChanged();

    this.loading = true;
    let actualDate1: number = new Date().getDate();
    let actualMonth1: number = new Date().getMonth();
    let actualYear1: number = new Date().getFullYear();
    this.tomorrow = endOfWeek(this.viewDate);
   
    this.yesterday = startOfWeek(this.viewDate);
    this.registerForm.patchValue({ date: this.yesterday })
 
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    // this.yesterday = this.formatDate(new Date(actualYear, actualMonth, actualDate));

    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;
    let d = new Date();
    var g1 = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
    // (YYYY, MM, DD)
    var g2 = new Date(actualYear, actualMonth, actualDate);

    if (g1.getTime() == g2.getTime()) {
      this.timeSheetEditable = true;
    } else {
      this.timeSheetEditable = false;
    }

    this.userRest.getTimeSheets(formattedDate).subscribe(
      (response) => { this.timeSheets = response.timesheet; this.loading = false; },
      (error) => { this.loading = false; console.log(error) }
    );
  }



  onRowEditInit(product: any) {

    this.clonedProducts[product.timeSheetId] = { ...product };
  }

  onRowEditSave(product: any, index: number) {
    //alert(product.timeSheetId)
    this.loading = true;
    if (product.duration < 16) {
      let updateUser: FormGroup;
      updateUser = new FormGroup({
        'duration': new FormControl(product.duration),
        'fromDate': new FormControl(product.fromDate),
        'assignment': new FormControl(product.assignment),
        'serviceCode': new FormControl(product.serviceCode),
      });
      this.userRest.updateTimeSheet(updateUser, product.timeSheetId).subscribe(
        (response) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet is updated' });
        },
        (error) => {
         
          this.loading = false;
          this.timeSheets[index] = this.clonedProducts[product.timeSheetId];
          delete this.timeSheets[product.timeSheetId];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
        () => console.log('completed')
      );

    }
    else {
      this.loading = false;
      this.timeSheets[index] = this.clonedProducts[product.timeSheetId];
      delete this.timeSheets[product.timeSheetId];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Duration only 15 hours accepted' });
    }
  }

  onRowEditCancel(product: any, index: number) {
    this.timeSheets[index] = this.clonedProducts[product.timeSheetId];
    delete this.timeSheets[product.timeSheetId];
  }
  getColor(status: string,duration:number) {
  
    if (duration == 0) {
      return "rgb(248, 215, 218)"
    }
  }
}
