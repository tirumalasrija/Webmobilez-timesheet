import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportRestService } from '../support-rest.service';
import { Customer,Representative  } from '../../../customer';

import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'support-user-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.scss']
})
export class SupportIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    products1: Customer[];
    @ViewChild('dt',{ static: true }) table: Table;
  constructor(private route: ActivatedRoute, private userRest: SupportRestService, private router: Router) { }

  ngOnInit() {
     this.userRest.getSupport().subscribe(
     (response) => { console.log(this.userList = response.faqs);  this.loading = false; },
     (error) => { console.log(error) }
    );


  }

  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteSupport(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['users/edit',id]);
  }

}
