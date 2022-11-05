import { Component, ViewChild,OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { UserService } from '../../layouts/admin-layout/user.serviuce';
import { Table } from 'primeng/table';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'userdocs-dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'userdocs.component.html',
  styles: ['']
})

export class UserDocsComponent implements OnInit {


  timeSheets: Array<object> = [];

  constructor(private userRest: UserService
  ) {
  }

  ngOnInit() {


  }
}
