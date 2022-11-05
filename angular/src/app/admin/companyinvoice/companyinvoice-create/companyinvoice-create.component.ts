import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { CompanyInvoiceRestService } from '../companyinvoice-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { jsPDF } from 'jspdf'
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
export interface UserData {
  address?:string;
  address1?:string;
  state?:number;
  city?:string;
  zipcode?:number;
}
@Component({
  selector: 'companyinvoice-user-create',
  templateUrl: './companyinvoice-create.component.html',
  styleUrls: ['./companyinvoice-create.component.scss']
})

export class UserCreateComponent implements OnInit {
  BDate:Date;
  extradate: Date;
  serverErrors = [];
  users: UserData;
  usersChoose: any;
  disableBtn: boolean = false;
  points = [];
  total: number;
  signatureImage;
  count:number;
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
changeUserData:any;
 monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  constructor(private route: ActivatedRoute, private userRest: CompanyInvoiceRestService, private router: Router) {

}

  generatePDF() {

    var data = document.getElementById('tablecontent');
    
    html2canvas(data).then(canvas => {
      var imgWidth = 220;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF();
      var position = 0;
      var d = new Date(this.registerForm.value.date);
    var n = d.getMonth();
      let name =this.changeUserData.name+''+this.changeUserData.lastName+'-'+this.monthNames[n]+'-Invoice';
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(name.replace(/ /g,'')+'.pdf');
    });
    this.registerForm.patchValue({ name: this.changeUserData.name+''+this.changeUserData.lastName });
    this.registerForm.patchValue({ clientName: this.changeUserData.companyName });
    this.registerForm.patchValue({ userId: this.changeUserData.id });
    this.registerForm.patchValue({ paymentDuedate: this.formatDate(this.extradate )});
    this.userRest.storeCompanyInvoices(this.registerForm).subscribe(
      response => {
         
        this.router.navigate(['companyinvoice/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
  showBasicDialog() {
    this.displayBasic = true;
     

  }

  showImage(data) {
    this.signatureImage = data;
    this.registerForm.patchValue({ signature: this.signatureImage });
   
    this.displayBasic1 = false;
  }
  somethingChanged($event)
  {
     
    let temporydte = new Date($event.target.value);
    this.extradate =temporydte;
     
    this.extradate.setDate( this.extradate.getDate() + 45 );
  //  this.extradate.setDate( new Date($event.target.value).getDate() + 45 );
 
  }

  searchReportSubmitId($event: any) {


     this.userRest.editUser($event).subscribe(
      (response) => {
        this.changeUserData =response.user;
        this.registerForm.patchValue({
          'rate': response.actualrate,


        })
      },
      (error) => console.log(error)
    );

  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }
  ngOnInit() {
    this.BDate = new Date();
    this.extradate = new Date();
    this.extradate.setDate( this.extradate.getDate() + 45 );
    this.registerForm = new FormGroup({
      'invoiceNumber': new FormControl(null, [Validators.required]),
      'clientName': new FormControl(null),
      'paymentDuedate' : new FormControl(null),
      'name' : new FormControl(null),
      'amount': new FormControl(null, [Validators.required]),
      'rate': new FormControl("", [Validators.required]),
      'hours': new FormControl(null, [Validators.required]),
      'description': new FormControl(""),
      'date': new FormControl(new Date(), [Validators.required]),
'userId' : new FormControl("")
    })
    this.userRest.getAllEmployees().subscribe(
      (responses) => {
       this.usersChoose = responses.user;

      },
      (error) => { console.log(error) }
    );

    this.userRest.getCountInvoices().subscribe(
      (response) => {  this.count = response.count;
        let countnum ="WMZ00"+this.count;
        this.registerForm.patchValue({ invoiceNumber: countnum })
       },
      (error) => { console.log(error) }
    );
    this.userRest.getCurentUser().subscribe(
      (response) => {
         this.users = response.user;
        this.registerForm.patchValue({ rate: response.user.rate })
      },
      (error) => { console.log(error) }
    );
    this.registerForm.valueChanges.pipe(

      distinctUntilChanged(this.isSame)
    ).subscribe(values => {
      
      const { rate, hours } = values;
      this.registerForm.patchValue(
        {
          amount: (rate * hours)
        }
      )
    })

  }

  get invoiceNumber() { return this.registerForm.get('invoiceNumber'); }
  get amount() { return this.registerForm.get('amount'); }
  get rate() { return this.registerForm.get('rate'); }
  get hours() { return this.registerForm.get('hours'); }
  get description() { return this.registerForm.get('description'); }
  get date() { return this.registerForm.get('date'); }
  get name() { return this.registerForm.get('name'); }
  get clientName() { return this.registerForm.get('clientName'); }
  get paymentDuedate() { return this.registerForm.get('paymentDuedate'); }
  get userId() { return this.registerForm.get('userId'); }
  isSame(prev, next) {
    return (prev.rate === next.rate)
      && (prev.hours === next.hours);
  }
  onSave($event:any)
  {
 
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
