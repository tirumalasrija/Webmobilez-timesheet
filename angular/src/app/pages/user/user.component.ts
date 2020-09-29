import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { FormGroup, FormControlName,Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {Message,MessageService} from 'primeng/api';
import { UserService } from '../../layouts/admin-layout/user.serviuce';
import { tap } from 'rxjs/operators';
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
  user: Observable<object>;
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
      tap(user => this.updateUser.patchValue(user))
    );


      this.updateUser = new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'id': new FormControl(null,[Validators.required]),
        'password': new FormControl(null),

      });
  }

  get name() { return this.updateUser.get('name'); }
  get email() { return this.updateUser.get('email'); }
   get password() { return this.updateUser.get('password'); }
   get id() { return this.updateUser.get('id'); }

  updateUserDetails(){
    let id = this.updateUser.get('id').value;
    this.http.put('https://employees.webmobilez.com/public/api/user-list/' + id, this.updateUser.value).subscribe(
      (response) => {
        console.log(response),
        this.messageService.add({severity:'success', summary:'Your Profile Updated ', detail:'successfull'})
        this.router.navigate(['profile'])
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  }
}
