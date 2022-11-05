import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDocumentsRestService } from '../user-documents-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserDocumentEditComponent implements OnInit {
  serverErrors = [];
  rate:number;
  companyName:string;
  users: Array<object> = [];
  disableBtn:boolean=false;
  registerForm: FormGroup;

  constructor(private route: ActivatedRoute, private userRest: UserDocumentsRestService, private router: Router) { }

  ngOnInit() {
    this.userRest.getUsers().subscribe(
      (response) => { this.users = response.user;  },
      (error) => { console.log(error) }
    );
    let id = this.route.snapshot.params.id;
    this.userRest.editUser(id).subscribe(
     (response) => {

       
       this.registerForm.patchValue({
         'userId': response.payment.userId,
         'amount':response.payment.amount,
         'hours':response.payment.hours,
         'transferDate':response.payment.transferDate,
         'confirmationNumber':response.payment.confirmationNumber,
         'paymentStatus':response.payment.paymentStatus,
         'type':response.payment.type

       })
     },
     (error) => console.log(error)
   );

    this.registerForm = new FormGroup({
      'userId': new FormControl("", [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'hours': new FormControl(null, [Validators.required]),
      'transferDate': new FormControl(null, [Validators.required]),
      'confirmationNumber': new FormControl(null, [Validators.required]),
      'paymentStatus': new FormControl("", [Validators.required]),

      'type': new FormControl("", [Validators.required]),
    })
  }

  get userId() { return this.registerForm.get('userId'); }
  get amount() { return this.registerForm.get('amount'); }
  get hours() { return this.registerForm.get('hours'); }
  get transferDate() { return this.registerForm.get('transferDate'); }
  get paymentStatus() { return this.registerForm.get('paymentStatus'); }
  get confirmationNumber() { return this.registerForm.get('confirmationNumber'); }

  get type() { return this.registerForm.get('type'); }


  registerUser(){

     
     let id = this.route.snapshot.params.id;
      this.userRest.updatePayment(this.registerForm,id).subscribe(
        response => {
          
          this.router.navigate(['payments/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

  firstDropDownChanged() {

if(this.registerForm.value.userId)
{

  this.userRest.editUser(this.registerForm.value.userId).subscribe(
    (response) => {
 
this.rate=response.user.rate;
this.companyName=response.user.companyName;
    },
    (error) => console.log(error)
  );
}
   // console.log(this.selectedValue);
   }
}
