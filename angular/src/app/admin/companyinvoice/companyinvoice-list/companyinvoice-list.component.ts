import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInvoiceRestService } from '../companyinvoice-rest.service';
import { Table } from 'primeng/table';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';


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
  selector: 'companyinvoice-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  templateUrl: './companyinvoice-list.component.html',
  styleUrls: ['./companyinvoice-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];

  loading: boolean = true;


  constructor( private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: CompanyInvoiceRestService,
     private router: Router) { }

  ngOnInit() {

    this.userRest.getInvoices().subscribe(
      (response) => {  this.timeSheets = response.companyinvoices; this.loading = false; },
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
    this.router.navigate(['companyinvoice/edit',id]);
  }
  viewUser(id: number) {
    this.router.navigate(['companyinvoice/view',id]);
  }

}
