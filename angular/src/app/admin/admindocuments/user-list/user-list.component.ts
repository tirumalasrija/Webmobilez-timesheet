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
  loading: boolean = true;


  constructor( private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
     private router: Router) { }

  ngOnInit() {

    this.userRest.getTimeSheetDocuments().subscribe(
      (response) => { console.log(this.timeSheets = response.documents); this.loading = false; },
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
    this.table.filter(this.formatDate(value), 'dateOfWeek', 'equals')
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



}
