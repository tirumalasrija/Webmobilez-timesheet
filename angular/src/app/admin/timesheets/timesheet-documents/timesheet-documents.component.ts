import { Component, ChangeDetectionStrategy, TemplateRef, OnInit,EventEmitter ,Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetRestService } from '../timesheet-rest.service';
import { Customer, Representative } from '../../../customer';
import { CustomerService } from '../../../customer.service';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';



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
  selector: 'app-user-documents',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-documents.component.html',
  styleUrls: ['./user-documents.component.scss']
})
export class TimesheetDocumentsComponent implements OnInit {

  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Week;

  @Output() public click: EventEmitter<MouseEvent> = new EventEmitter();

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  title = 'dropzone';



  files: File[] = [];
  path: string = '';
  userList: Array<object> = [];
  documents: Array<object> = [];
  customers: Customer[];
  timeSheetEditable:boolean =true;
  timeSheetDisable:boolean =false;
  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;

  products1: Customer[];

  constructor(private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router) { }

  items: MenuItem[];

  ngOnInit() {
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;
    this.userRest.getTimeDocuments(formattedDate).subscribe(
      (response) => {  this.documents = response.documents; this.path = response.path; this.loading = false; },
      (error) => { console.log(error) }
    );
  }



  editUser(id: number) {
    this.router.navigate(['users/edit', id]);
  }


  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'fromDate', 'equals')
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




  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  dayHeaderClicked(evn) {

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
      this.timeSheetDisable =false;
    }else{
      this.timeSheetEditable = false;
      this.timeSheetDisable =true;
    }
    this.userRest.getTimeDocuments(formattedDate).subscribe(
      (response) => {  this.documents = response.documents; this.path = response.path; this.loading = false; },
      (error) => { console.log(error) }
    );
  }
  onSelect(event) {

    this.files.push(...event.addedFiles);
   
    let actualDate = this.viewDate.getDate();
    let actualMonth = this.viewDate.getMonth() + 1;
    let actualYear = this.viewDate.getFullYear();
    let formattedDate = actualDate + '-' + actualMonth + '-' + actualYear;
    const formData = new FormData();
    formData.append("image", event.addedFiles[0]);
    formData.append("dateOfWeek", formattedDate);

    this.userRest.storeDocument(formData).subscribe(
      (response) => { this.documents = response.documents; this.path = response.path; this.loading = false; },
      (error) => { console.log(error) }
    );

  }

  onRemove(event) {
    this.documents.splice(this.documents.indexOf(event), 1);
    this.userRest.deleteDocument(event.documentId).subscribe(
      (response) => { this.loading = false; },
      (error) => { console.log(error) }
    );
  }

  onSpanClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit(event);
  }

}
