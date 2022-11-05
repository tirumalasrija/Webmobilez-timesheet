import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportRestService } from '../support-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'support-user-create',
  templateUrl: './support-create.component.html',
  styleUrls: ['./support-create.component.scss']
})
export class SupportCreateComponent implements OnInit {
  serverErrors = [];
  registerForm: FormGroup;

  constructor(private route: ActivatedRoute, private userRest: SupportRestService, private router: Router) { }

  ngOnInit() {


    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'answer': new FormControl(null, [Validators.required, Validators.minLength(10)]),

    })
  }

  get answer() { return this.registerForm.get('answer'); }
  get name() { return this.registerForm.get('name'); }

  registerUser(){
     console.log(this.registerForm);
      this.userRest.storeSupport(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.router.navigate(['adminsupport/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }


}
