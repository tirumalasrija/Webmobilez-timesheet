import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDocumentsRestService } from '../user-documents-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserDocumentCreateComponent implements OnInit {
  serverErrors = [];
  rate:number;
  companyName:string;
  users: Array<object> = [];
  disableBtn:boolean=false;
  registerForm: FormGroup;
  imageFile: {link: string, file: any, name: string};
  constructor(private route: ActivatedRoute, private userRest: UserDocumentsRestService, private router: Router) { }

  ngOnInit() {
    this.userRest.getUsers().subscribe(
      (response) => { console.log(this.users = response.user);  },
      (error) => { console.log(error) }
    );

    this.registerForm = new FormGroup({
      'userId': new FormControl("", [Validators.required]),

      'documentType' : new FormControl("", [Validators.required]),
    })
  }

  get userId() { return this.registerForm.get('userId'); }
  get documentType() { return this.registerForm.get('documentType'); }

  imagesPreviewWorkAuth(event) {

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.imageFile = {
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name
            };
        };
        reader.readAsDataURL(event.target.files[0]);
        const formData = new FormData();
        formData.append("documentFile", event.target.files[0]);
        formData.append("userId", this.registerForm.value.userId);
        formData.append("documentType", this.registerForm.value.documentType);
        this.userRest.storeDocument(formData).subscribe(
          (response) => { console.log(response)
            this.router.navigate(['docs/userdocuments'])
          },
          (error) => { console.log(error) }
        );
    }
  }


  firstDropDownChanged() {

if(this.registerForm.value.userId)
{
  this.userRest.editUser(this.registerForm.value.userId).subscribe(
    (response) => {
console.log(response.user)
this.rate=response.user.rate;
this.companyName=response.user.companyName;
    },
    (error) => console.log(error)
  );
}
   // console.log(this.selectedValue);
   }
}
