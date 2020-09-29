import { Component, ChangeDetectionStrategy,Input, TemplateRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  tomorrow :any;
  yesterday:any;

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
  timeSheetEditable:boolean =true;
  customers: Customer[];
  representatives: Representative[];
  loading: boolean = true;
  constructor( private messageService: MessageService, private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router)
   {
    let actualDate :number= new Date().getDate();
    let actualMonth :number= new Date().getMonth() ;
    let actualYear :number= new Date().getFullYear();
    this.tomorrow =this.formatDate(new Date(actualYear, actualMonth ,actualDate));

   }

  items: MenuItem[];

  ngOnInit() {

    this.assignments = [{ label: 'Mainframe Developer', value: 'Mainframe Developer' }]
    this.serviceCodes = [{ label: 'Regular', value: 'Regular' }];
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;

    this.userRest.getTimeSheets(formattedDate).subscribe(
      (response) => { console.log(this.timeSheets = response.timesheet); this.loading = false; },
      (error) => { this.loading = false; console.log(error) }
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




  dayHeaderClicked(evn) {
this.loading = true;
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;
    let d = new Date();
    var g1 = new Date(d.getFullYear(), d.getMonth()+1, d.getDate());
    // (YYYY, MM, DD)
    var g2 = new Date(actualYear, actualMonth,actualDate);

    if (g1.getTime() == g2.getTime())
    {
      this.timeSheetEditable = true;
    }else{
      this.timeSheetEditable = false;
    }

    this.userRest.getTimeSheets(formattedDate).subscribe(
      (response) => { console.log(this.timeSheets = response.timesheet); this.loading = false; },
      (error) => { this.loading = false;  console.log(error) }
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
          console.log(error)
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
}
