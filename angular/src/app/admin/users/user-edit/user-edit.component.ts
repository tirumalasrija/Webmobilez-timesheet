import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserRestService } from '../user-rest.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  updateUser: FormGroup;
  serverErrors = [];
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
     this.userRest.editUser(id).subscribe(
      (response) => {
        this.updateUser.patchValue({
          'name': response.user.name,
          'email':response.user.email,
          'lastName':response.user.lastName,
          'companyName':response.user.companyName,
          'technology':response.user.technology,
          'rate':response.user.rate,
          'role':response.user.role,
          'address':response.user.address,
          'paymentType':response.user.paymentType,
          'paymentMode':response.user.paymentMode,
          'hoursperWeek':response.user.hoursperWeek,
          'address1':response.user.address1,
          'state':response.user.state,
          'city':response.user.city,
          'zipcode':response.user.zipcode,

        })
      },
      (error) => console.log(error)
    );

      console.log(this.data);

      this.updateUser = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),

        'lastName': new FormControl(null, [Validators.required, Validators.minLength(1)]),
        'companyName': new FormControl(null, [Validators.required]),
        'joinDate': new FormControl(null),
        'technology': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null, [Validators.required]),
        'role': new FormControl("", [Validators.required]),
        'address': new FormControl(null, [Validators.required]),
        'address1': new FormControl(null),
        'state': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'zipcode': new FormControl(null, [Validators.required]),
        'paymentType': new FormControl("", [Validators.required]),
        'paymentMode': new FormControl("", [Validators.required]),
        'hoursperWeek': new FormControl(null, [Validators.required]),

        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null),

      });
  }

  get name() { return this.updateUser.get('name'); }
  get email() { return this.updateUser.get('email'); }
   get password() { return this.updateUser.get('password'); }
  get lastName() { return this.updateUser.get('lastName'); }
  get companyName() { return this.updateUser.get('companyName'); }
  get joinDate() { return this.updateUser.get('joinDate'); }
  get technology() { return this.updateUser.get('technology'); }
  get rate() { return this.updateUser.get('rate'); }
  get role() { return this.updateUser.get('role'); }
  get address() { return this.updateUser.get('address'); }
  get paymentType() { return this.updateUser.get('paymentType'); }
  get paymentMode() { return this.updateUser.get('paymentMode'); }
  get hoursperWeek() { return this.updateUser.get('hoursperWeek'); }
  get zipcode() { return this.updateUser.get('zipcode'); }
  get state() { return this.updateUser.get('state'); }
  get city() { return this.updateUser.get('city'); }
  get address1() { return this.updateUser.get('address1'); }
  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.updateUser,id).subscribe(
      (response) => {
        
        this.router.navigate(['users/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }
}
