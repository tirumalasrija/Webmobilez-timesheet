import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRatesRestService } from '../userrates-rest.service';
import { Customer,Representative  } from '../../../customer';

import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'userrates-user-index',
  templateUrl: './userrates-index.component.html',
  styleUrls: ['./userrates-index.component.scss']
})
export class UserRatesIndexComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }




}
