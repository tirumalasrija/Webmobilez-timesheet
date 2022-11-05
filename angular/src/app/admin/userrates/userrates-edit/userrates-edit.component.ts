import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserRatesRestService } from '../userrates-rest.service';

@Component({
  selector: 'userrates-user-edit',
  templateUrl: './userrates-edit.component.html',
  styleUrls: ['./userrates-edit.component.scss']
})
export class UserRatesEditComponent implements OnInit {
  updateUser: FormGroup;
  serverErrors = [];
  usersChoose:any;
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: UserRatesRestService, private router: Router) { }

  ngOnInit() {
    this.userRest.getAllEmployees().subscribe(
      (responses) => {
        this.usersChoose = responses.user;

      },
      (error) => { console.log(error) }
    );
     let id = this.route.snapshot.params.id;
     this.userRest.editSupport(id).subscribe(
      (response) => {
        this.updateUser.patchValue({
          'userId': response.userrate.userId,
          'rate':response.userrate.rate,

        })
      },
      (error) => console.log(error)
    );


      this.updateUser = new FormGroup({
        'userId': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null, [Validators.required]),

      });
  }

  get userId() { return this.updateUser.get('userId'); }
  get rate() { return this.updateUser.get('rate'); }

  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateSupport(this.updateUser,id).subscribe(
      (response) => {
         
        this.router.navigate(['userrates/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }
}
