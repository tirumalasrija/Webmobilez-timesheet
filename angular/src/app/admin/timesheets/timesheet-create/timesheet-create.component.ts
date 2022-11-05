import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetRestService } from '../timesheet-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import {  subMonths,  addMonths,  addDays,  addWeeks,  subDays,  subWeeks,
  startOfMonth,  endOfMonth,  startOfWeek,  endOfWeek,  startOfDay,  endOfDay
} from 'date-fns';

@Component({
  selector: 'timesheet-user-create',
  templateUrl: './user-create.component.html',
  providers: [MessageService],
  styleUrls: ['./user-create.component.scss']
})
export class TimesheetCreateComponent implements OnInit {

  public ownerForm: FormGroup;
  @Input() max: any;
  @Input() min: any;
  tomorrow = new Date();
  yesterday = new Date();
  serverErrors = [];
  registerForm: FormGroup;
  myDate = new Date();
  viewDate: Date = new Date();
  users: Array<any> = [];
  formattedDate: string;

  constructor(private location: Location, private messageService: MessageService, private route: ActivatedRoute, private userRest: TimesheetRestService, private router: Router) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    this.yesterday.setDate(this.yesterday.getDate() - 20);
    this.formattedDate = this.viewDate.getFullYear() + '-' + ('0' + (this.viewDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.viewDate.getDate()).slice(-2);
  }

  ngOnInit() {
    this.userRest.getCurentUser().subscribe(
      (response) => {
         this.users = response.user;
        this.registerForm.patchValue({ assignment: response.user.technology })
      },
      (error) => { console.log(error) }
    );
    this.registerForm = new FormGroup({
      'duration': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(15)]),
      'date': new FormControl(new Date(), [Validators.required]),
      'assignment': new FormControl("", [Validators.required]),
      'serviceCode': new FormControl("Regular", [Validators.required]),
    })

  }



  get duration() { return this.registerForm.get('duration'); }
  get date() { return this.registerForm.get('date'); }
  get assignment() { return this.registerForm.get('assignment'); }
  get serviceCode() { return this.registerForm.get('serviceCode'); }
  registerUser() {
   
    let dateformat = this.registerForm.value.date.getFullYear() + '-' + ('0' + (this.registerForm.value.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.registerForm.value.date.getDate()).slice(-2);
    let value = {
      "duration": this.registerForm.value.duration,
      'date': dateformat,
      'assignment': this.registerForm.value.assignment,
      'serviceCode': this.registerForm.value.serviceCode
    }
    this.userRest.storeUser(value).subscribe(
      response => {
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet is added' });
        const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    });
      },
      error => {

        this.serverErrors = error.error.errors
        

      }
    );
  }

}
