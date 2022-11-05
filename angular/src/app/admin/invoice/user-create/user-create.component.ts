import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { jsPDF } from 'jspdf'
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  BDate: Date;
  serverErrors = [];
  users: any;
  disableBtn: boolean = false;
  points = [];
  total: number;
  signatureImage;
  count: number;
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
  width: string;
  height: string;
  routerChanged = false;

  constructor(private route: ActivatedRoute, private userRest: UserRestService, private router: Router) {

  }

  generatePDF() {
    this.displayBasic = false;
    var data = document.getElementById('tablecontent');
    console.log(data)
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF();
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('invoice-payment.pdf');
    });

    this.userRest.storeInvoices(this.registerForm).subscribe(
      response => {
        console.log(response)
        this.router.navigate(['invoice/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
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
  ngOnInit() {
    this.BDate = new Date();
    this.registerForm = new FormGroup({
      'invoiceNumber': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'rate': new FormControl("", [Validators.required]),
      'hours': new FormControl(null, [Validators.required]),
      'services': new FormControl("", [Validators.required]),
      'printName': new FormControl("", [Validators.required]),
      'date': new FormControl(new Date(), [Validators.required]),
      'signature': new FormControl("", [Validators.required]),
    })
    this.userRest.getCountInvoices().subscribe(
      (response) => {
        console.log(this.count = response.count);
        let countnum = "WMZ00" + this.count;
        this.registerForm.patchValue({ invoiceNumber: countnum })
      },
      (error) => { console.log(error) }
    );
    this.userRest.getCurentUser().subscribe(
      (response) => {
        console.log(this.users = response.user);
        this.registerForm.patchValue({ rate: response.user.rate })
      },
      (error) => { console.log(error) }
    );
    this.registerForm.valueChanges.pipe(

      distinctUntilChanged(this.isSame)
    ).subscribe(values => {
      console.log(values)
      const { rate, hours } = values;
      this.registerForm.patchValue(
        {
          amount: (rate * hours).toFixed(2)
        }
      )
    })
    this.signatureImage = "";
  }

  get invoiceNumber() { return this.registerForm.get('invoiceNumber'); }
  get amount() { return this.registerForm.get('amount'); }
  get rate() { return this.registerForm.get('rate'); }
  get hours() { return this.registerForm.get('hours'); }
  get services() { return this.registerForm.get('services'); }
  get printName() { return this.registerForm.get('printName'); }
  get date() { return this.registerForm.get('date'); }
  get signature() { return this.registerForm.get('signature'); }


  isSame(prev, next) {
    return (prev.rate === next.rate)
      && (prev.hours === next.hours);
  }
  onSave($event: any) {
    this.width = "300";
    this.height = "100";
    this.displayBasic1 = true;

  }
  registerUser() {
    /*
        console.log(this.registerForm);
        this.userRest.storeInvoices(this.registerForm).subscribe(
          response => {
            console.log(response),
              this.router.navigate(['invoices/list'])
          },
          error => {
            this.serverErrors = error.error.errors
          }
        ); */
  }

}
