import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserRestService } from '../user-rest.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { jsPDF } from 'jspdf';
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  serverErrors = [];
  users: any;
  disableBtn: boolean = false;
  points = [];
  total: number;
  signatureImage;
  registerForm: FormGroup;
  values: any;
  display: boolean = false;
  displayModal: boolean;
  displayBasic: boolean;
  displayBasic1: boolean;
  displayDataBasic: boolean;
  displayMaximizable: boolean;
  displayPosition: boolean;
  timeout;
  routerChanged = false;
  updateUser: FormGroup;
  @Input() data:any;
  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
     let id = this.route.snapshot.params.id;
     this.userRest.editUser(id).subscribe(
      (response) => {
        this.users = response.user;
        console.log(this.users);
        console.log(response);
        this.updateUser.patchValue({
          'invoiceNumber': response.payment.invoiceNumber,
          'amount':response.payment.amount,
          'rate':response.payment.rate,
          'hours':response.payment.hours,
          'services':response.payment.services,
          'printName':response.payment.printName,
          'date':response.payment.date,
          'signature':response.payment.signature,

        })
      },
      (error) => console.log(error)
    );

      console.log(this.data);

      this.updateUser = new FormGroup({
        'invoiceNumber': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null, [Validators.required]),
        'hours': new FormControl(null, [Validators.required]),
        'services': new FormControl(null, [Validators.required]),
        'printName': new FormControl(null, [Validators.required]),
        'date': new FormControl(null, [Validators.required]),
        'signature': new FormControl(null, [Validators.required]),
      });
      this.updateUser.valueChanges.pipe(

        distinctUntilChanged(this.isSame)
      ).subscribe(values => {
        console.log(values)
        const { rate, hours } = values;
        this.updateUser.patchValue(
          {
            amount: (rate * hours).toFixed(2)
          }
        )
      })
  }

  isSame(prev, next) {
    return (prev.rate === next.rate)
      && (prev.hours === next.hours);
  }
  onSave()
  {
    this.displayBasic1 = true;
  }
  get invoiceNumber() { return this.updateUser.get('invoiceNumber'); }
  get amount() { return this.updateUser.get('amount'); }
  get rate() { return this.updateUser.get('rate'); }
  get hours() { return this.updateUser.get('hours'); }
  get services() { return this.updateUser.get('services'); }
  get printName() { return this.updateUser.get('printName'); }
  get date() { return this.updateUser.get('date'); }
  get signature() { return this.updateUser.get('signature'); }

  generatePDF() {

    var data = document.getElementById('tablecontent');
    console.log(data)
    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF();
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('invoice-payment.pdf');
      let id = this.route.snapshot.params.id;
      this.userRest.updateUser(this.updateUser,id).subscribe(
        (response) => {
          console.log(response),
          this.router.navigate(['invoice/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        },
        () => console.log('completed')
      );
    });

  /*  this.userRest.storeInvoices(this.registerForm).subscribe(
      response => {
        console.log(response)

      },
      error => {
        this.serverErrors = error.error.errors
      }
    ); */
  }
  showBasicDialog() {
    this.displayBasic = true;
    console.log()

  }

  showImage(data) {
    this.signatureImage = data;
    this.registerForm.patchValue({ signature: this.signatureImage });
    console.log(this.signatureImage)
    this.displayBasic1 = false;
  }
  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.updateUser,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['users/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }
}
