import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SupportRestService } from '../support-rest.service';

@Component({
  selector: 'support-user-edit',
  templateUrl: './support-edit.component.html',
  styleUrls: ['./support-edit.component.scss']
})
export class SupportEditComponent implements OnInit {
  updateUser: FormGroup;
  serverErrors = [];
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: SupportRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
     this.userRest.editSupport(id).subscribe(
      (response) => {
        this.updateUser.patchValue({
          'question': response.faq.question,
          'answer':response.faq.answer,

        })
      },
      (error) => console.log(error)
    );


      this.updateUser = new FormGroup({
        'question': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'answer': new FormControl(null, [Validators.required, Validators.minLength(10)]),

      });
  }

  get question() { return this.updateUser.get('question'); }
  get answer() { return this.updateUser.get('answer'); }

  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateSupport(this.updateUser,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['adminsupport/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }
}
