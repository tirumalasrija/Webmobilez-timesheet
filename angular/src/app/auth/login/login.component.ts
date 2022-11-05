import { Component, OnInit } from '@angular/core';
import { CommonAuthService } from '../common-auth.service';
import { NgForm, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverErrors = [];

  constructor(private auth: CommonAuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  get email(){ return this.loginForm.get('email'); }
  get password(){ return this.loginForm.get('password'); }

  login(){
    
    this.auth.logIn(this.loginForm).subscribe(
      (response) => {
     
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.serverErrors = error.error;
        
      }
    );
  }

}
