import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRatesRestService } from '../userrates-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'userrates-user-create',
  templateUrl: './userrates-create.component.html',
  styleUrls: ['./userrates-create.component.scss']
})
export class UserRatesCreateComponent implements OnInit {
  serverErrors = [];
  registerForm: FormGroup;
  usersChoose :any;
  constructor(private route: ActivatedRoute, private userRest: UserRatesRestService, private router: Router) { }

  ngOnInit() {

    this.userRest.getAllEmployees().subscribe(
      (responses) => {
         this.usersChoose = responses.user;

      },
      (error) => { console.log(error) }
    );
    this.registerForm = new FormGroup({
      'userId': new FormControl(null, [Validators.required]),
      'rate': new FormControl(null, [Validators.required]),

    })
  }

  get userId() { return this.registerForm.get('userId'); }
  get rate() { return this.registerForm.get('rate'); }

  registerUser(){
      
      this.userRest.storeSupport(this.registerForm).subscribe(
        response => {
          
          this.router.navigate(['userrates/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }


}
