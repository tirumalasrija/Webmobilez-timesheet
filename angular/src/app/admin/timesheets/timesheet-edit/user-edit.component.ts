import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TimesheetRestService } from '../timesheet-rest.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  serverErrors = [];
  updateUser: FormGroup;
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
     this.userRest.editTimeSheet(id).subscribe(
      (response) => {
        this.updateUser.patchValue({
          'duration': response.user.duration,
          'tdate':response.user.fromDate,
          'serviceCode':response.user.serviceCode,
          'assignment':response.user.assignment
        })
      },
      (error) => console.log(error)
    );

     

      this.updateUser = new FormGroup({
        'duration': new FormControl(null,[Validators.required]),
        'tdate' : new FormControl(null, [Validators.required]),
        'assignment': new FormControl(null, [Validators.required]),
        'serviceCode': new FormControl(null, [Validators.required]),
      });
  }

  get duration() { return this.updateUser.get('duration'); }
  get tdate() { return this.updateUser.get('tdate'); }
  get assignment() { return this.updateUser.get('assignment'); }
  get serviceCode() { return this.updateUser.get('serviceCode'); }
  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateTimeSheet(this.updateUser,id).subscribe(
      (response) => {
        
        this.router.navigate(['timesheets/list'])
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  }
}
