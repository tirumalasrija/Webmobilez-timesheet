import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDocumentsRestService } from '../user-documents-rest.service';
import { Table } from 'primeng/table';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  templateUrl: './user-document-list.component.html',
  styleUrls: ['./user-document-list.component.scss']
})
export class UserDocumentListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  userdata: Array<object> = [];
  mexpectedrole: string;
  loading: boolean = true;


  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserDocumentsRestService,
    private router: Router) { }

  ngOnInit() {
    this.mexpectedrole = localStorage.getItem('role');
    this.userRest.getDocumentsUsers().subscribe(
      (response) => {  this.userdata = response.user; this.loading = false; },
      (error) => { console.log(error) }
    );

  }

  deleteUser(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.userRest.deleteUser(id).subscribe(
        (response) => {
          this.userdata = response.user;
        },

        (error) => console.log(error)
      );
    }
  }

  editDocument(id: number) {
    this.router.navigate(['docs/view', id]);
  }

}
