import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDocumentsRestService } from '../user-documents-rest.service';
import { Customer,Representative  } from '../../../customer';

import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    products1: Customer[];
    @ViewChild('dt',{ static: true }) table: Table;
  constructor(private route: ActivatedRoute, private userRest: UserDocumentsRestService, private router: Router) { }

  ngOnInit() {
     this.userRest.getUsers().subscribe(
     (response) => { this.userList = response.user;  this.loading = false; },
     (error) => { console.log(error) }
    );


  }

  deleteUser(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.userRest.deleteUser(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  editUser(id: number) {
    this.router.navigate(['users/edit',id]);
  }

}
