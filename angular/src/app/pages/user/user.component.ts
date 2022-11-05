import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {Message,MessageService} from 'primeng/api';
import { UserService } from '../../layouts/admin-layout/user.serviuce';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    providers: [MessageService],
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  serverErrors = [];
  updateUser: FormGroup;
  timeout;
  routerChanged = false;
  companyNameUser:any;
  submitted = false;
  user: Observable<object>;
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
  constructor(private userService: UserService,private messageService: MessageService,private http: HttpClient,private route: ActivatedRoute,  private router: Router)
  {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = false;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = true;
        }, 1000);
      }
    });

  }

  async  ngOnInit() {

    this.user = this.userService.loadUser().pipe(
      tap(user => { this.updateUser.patchValue(user); this.companyNameUser =user.companyName })
    );


      this.updateUser = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        'lastName': new FormControl(null, [Validators.required, Validators.minLength(1)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'companyEmail': new FormControl(null, [Validators.required, Validators.email]),
        'address': new FormControl(null),
        'address1': new FormControl(null),
        'state': new FormControl(null),
        'city': new FormControl(null),
        'zipcode': new FormControl(null),
        'id': new FormControl(null,[Validators.required]),
        'password': new FormControl(null),
        'contactNumber' : new FormControl(null, [Validators.required]),
        'emergencyNumber' : new FormControl(null, [Validators.required]),
        'emrgencyContactPerson' : new FormControl(null, [Validators.required]),
        'relationContactPerson' : new FormControl(null, [Validators.required])
      });
  }

  get name() { return this.updateUser.get('name'); }
  get lastName() { return this.updateUser.get('lastName'); }
  get email() { return this.updateUser.get('email'); }
  get companyEmail() { return this.updateUser.get('companyEmail'); }
   get password() { return this.updateUser.get('password'); }
   get id() { return this.updateUser.get('id'); }
   get address() { return this.updateUser.get('address'); }
   get address1() { return this.updateUser.get('address1'); }
   get state() { return this.updateUser.get('state'); }
   get city() { return this.updateUser.get('city'); }
   get zipcode() { return this.updateUser.get('zipcode'); }
   get contactNumber() { return this.updateUser.get('contactNumber'); }
   get emergencyNumber() { return this.updateUser.get('emergencyNumber'); }
   get emrgencyContactPerson() { return this.updateUser.get('emrgencyContactPerson'); }
   get relationContactPerson() { return this.updateUser.get('relationContactPerson'); }
  updateUserDetails(){
    this.submitted = true;
    if (this.updateUser.invalid) {
      return;
  }
    let id = this.updateUser.get('id').value;
    this.http.put(`${environment.api}/user-list/` + id, this.updateUser.value).subscribe(
      (response) => {

        this.submitted = false;
        this.messageService.add({severity:'success', summary:'Your Profile Updated ', detail:'successfull'})
        this.router.navigate(['profile'])
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  }
}
