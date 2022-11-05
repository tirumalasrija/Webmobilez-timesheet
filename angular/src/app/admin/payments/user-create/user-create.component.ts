import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  serverErrors = [];
  rate:number;
  companyName:string;
  users: Array<object> = [];
  disableBtn:boolean=false;
  registerForm: FormGroup;

  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
    this.userRest.getUsers().subscribe(
      (response) => { console.log(this.users = response.user);  },
      (error) => { console.log(error) }
    );

    this.registerForm = new FormGroup({
      'userId': new FormControl("", [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'hours': new FormControl(null, [Validators.required]),
      'transferDate': new FormControl(null, [Validators.required]),
      'confirmationNumber': new FormControl(null, [Validators.required]),
      'paymentStatus': new FormControl("", [Validators.required]),
      'rangeDates': new FormControl("", [Validators.required]),
      'type' : new FormControl("", [Validators.required]),
    })
  }

  get userId() { return this.registerForm.get('userId'); }
  get amount() { return this.registerForm.get('amount'); }
  get hours() { return this.registerForm.get('hours'); }
  get transferDate() { return this.registerForm.get('transferDate'); }
  get paymentStatus() { return this.registerForm.get('paymentStatus'); }
  get confirmationNumber() { return this.registerForm.get('confirmationNumber'); }
  get rangeDates() { return this.registerForm.get('rangeDates'); }
  get type() { return this.registerForm.get('type'); }

  registerUser(){

     console.log(this.registerForm);

      this.userRest.storePayment(this.registerForm).subscribe(
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
