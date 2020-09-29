import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
    loading: boolean = true;

    @ViewChild('dt',{ static: true }) table: Table;
  constructor(private route: ActivatedRoute ,private router: Router) { }

  ngOnInit() {


  }

}
