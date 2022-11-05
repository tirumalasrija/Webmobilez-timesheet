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
  registerForm: FormGroup;
  employees:Array<object> = [];
  countryList: Array<any> = [
    { name: 'Alabama'},
    { name: 'Alaska' },
    { name: 'American Samoa' },
    { name: 'Arizona' },
    { name: "California"},
    { name: "Colorado"},
    { name: "Connecticut"},
    { name: "Delaware"},
    { name: "District Of Columbia"},
    { name: "Federated States Of Micronesia"},
    { name: "Florida"},
    { name: "Georgia"},
    { name: "Guam"},
    { name: "Hawaii"},
    { name: "Idaho"},
    { name: "Illinois"},
    { name: "Indiana"},
    { name: "Iowa"},
    { name: "Kansas"},
    { name: "Kentucky"},
    { name: "Louisiana"},
    { name: "Maine"},
    { name: "Marshall Islands"},
    { name: "Maryland"},
    { name: "Massachusetts"},
    { name: "Michigan"},
    { name: "Minnesota"},
    { name:"Mississippi"},
    { name: "Missouri"},
    { name: "Montana"},
    { name: "Nebraska"},
    { name: "Nevada"},
    { name: "New Hampshire"},
    { name: "New Jersey"},
    { name: "New Mexico"},
    { name: "New York"},
    { name: "North Carolina"},
    { name: "North Dakota"},
    { name: "Northern Mariana Islands"},
    { name: "Ohio"},
    { name: "Oklahoma"},
    { name: "Oregon"},
    { name: "Palau"},
    { name: "Pennsylvania"},
    { name: "Puerto Rico"},
    { name: "Rhode Island"},
    { name: "South Carolina"},
    { name: "South Dakota"},
    { name: "Tennessee"},
    { name: "Texas"},
    { name: "Utah"},
    { name: "Vermont"},
    { name: "Virgin Islands"},
    { name: "Virginia"},
    { name: "Washington"},
    { name: "West Virginia"},
    { name: "Wisconsin"},
    { name: "Wyoming"}

  ];
  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {

    this.userRest.getPlacedUsers().subscribe(
      (response) => {  this.employees = response.user;  },
      (error) => { console.log(error) }
    );
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'companyName': new FormControl(null, [Validators.required]),
      'joinDate': new FormControl(null),
      'technology': new FormControl(null, [Validators.required]),
      'rate': new FormControl(null, [Validators.required]),
      'role': new FormControl("", [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'address1': new FormControl(null),
      'state': new FormControl("", [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'zipcode': new FormControl(null, [Validators.required]),
      'paymentType': new FormControl("", [Validators.required]),
      'paymentMode': new FormControl("", [Validators.required]),
      'hoursperWeek': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirm_password': new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm_password() { return this.registerForm.get('confirm_password'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get companyName() { return this.registerForm.get('companyName'); }
  get joinDate() { return this.registerForm.get('joinDate'); }
  get technology() { return this.registerForm.get('technology'); }
  get rate() { return this.registerForm.get('rate'); }
  get role() { return this.registerForm.get('role'); }
  get address() { return this.registerForm.get('address'); }
  get address1() { return this.registerForm.get('address1'); }
  get state() { return this.registerForm.get('state'); }
  get city() { return this.registerForm.get('city'); }
  get zipcode() { return this.registerForm.get('zipcode'); }
  get paymentType() { return this.registerForm.get('paymentType'); }
  get paymentMode() { return this.registerForm.get('paymentMode'); }
  get hoursperWeek() { return this.registerForm.get('hoursperWeek'); }
  registerUser(){
     console.log(this.registerForm);
      this.userRest.storeUser(this.registerForm).subscribe(
        response => {
          
          this.router.navigate(['users/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }
  firstDropDownChanged($event)
  {
    this.userRest.editConsultantUser($event).subscribe(
      (response) => {
        this.registerForm.patchValue({
          'name': response.user.consultatName,
          'lastName':response.user.consultantLastName,
          'technology':response.user.technology,
          'rate':response.user.rate,
          'email':response.user.consultantEmail,
          'city':response.user.city,
          'state':response.user.state,

        })


      },
      (error) => console.log(error)
    );

  }

}
