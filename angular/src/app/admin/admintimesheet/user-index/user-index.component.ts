import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    statuses: any[];
    loading: boolean = true;
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {


  }

}
