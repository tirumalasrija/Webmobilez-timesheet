import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserDocumentsRestService } from '../user-documents-rest.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  documentDetails: any;
  serverErrors = [];
  url:string;
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: UserDocumentsRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
   
     this.userRest.viewDocument(id).subscribe(
      (response) => {
     this.documentDetails=response.user;
    this.url ="https://employees.webmobilez.com/storage/app/uploads/documentfile/"+response.user.documentFile;
      },
      (error) => console.log(error)
    );



  }



}
