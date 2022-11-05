import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Message, MessageService } from 'primeng/api';
import { UserService } from '../../layouts/admin-layout/user.serviuce';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'support-user-cmp',
  moduleId: module.id,
  providers: [MessageService],
  templateUrl: 'user.component.html'
})

export class SupportComponent implements OnInit {
  serverErrors = [];
  support: FormGroup;
  timeout;
  routerChanged = false;
  faqs: any;

  constructor(private userService: UserService, private messageService: MessageService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {


    this.userService.getFaqs().subscribe(
      (response) => {
       this.faqs = response.faqs;
      },
      (error) => { console.log(error) }
    );

    this.support = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(10)])

    });
  }

  get name() { return this.support.get('name'); }

  updateUserDetails() {

    this.userService.storeFaq(this.support).subscribe(
      response => {
        this.faqs = response.faqs
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
}
