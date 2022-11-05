import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyInvoiceRestService } from '../companyinvoice-rest.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { jsPDF } from 'jspdf';
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
@Component({
  selector: 'companyinvoice-user-view',
  templateUrl: './companyinvoice-view.component.html',
  styleUrls: ['./companyinvoice-view.component.scss']
})
export class UserViewComponent implements OnInit {
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
  @Input() data: any;
  constructor(private route: ActivatedRoute, private userRest: CompanyInvoiceRestService, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.userRest.editUser(id).subscribe(
      (response) => {
        this.users = response.payment.user_details;
      
        this.updateUser.patchValue({
          'invoiceNumber': response.payment.invoiceNumber,
          'amount': response.payment.amount,
          'rate': response.payment.rate,
          'hours': response.payment.hours,
          'services': response.payment.services,
          'printName': response.payment.printName,
          'date': response.payment.date,
          'signature': response.payment.signature,

        })
      },
      (error) => console.log(error)
    );

 

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
  }

  isSame(prev, next) {
    return (prev.rate === next.rate)
      && (prev.hours === next.hours);
  }
  onSave() {
    this.displayBasic1 = true;
  }
  get invoiceNumber() { return this.registerForm.get('invoiceNumber'); }
  get amount() { return this.registerForm.get('amount'); }
  get rate() { return this.registerForm.get('rate'); }
  get hours() { return this.registerForm.get('hours'); }
  get services() { return this.registerForm.get('services'); }
  get printName() { return this.registerForm.get('printName'); }
  get date() { return this.registerForm.get('date'); }
  get signature() { return this.registerForm.get('signature'); }

  generatePDF() {

    var data = document.getElementById('tablecontent');
     
    html2canvas(data).then(canvas => {
      var imgWidth = 205;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF();
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('invoice-payment.pdf');
      let id = this.route.snapshot.params.id;

    });

    this.userRest.storeCompanyInvoices(this.registerForm).subscribe(
      response => {
        

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
  updateUserDetails() {
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.updateUser, id).subscribe(
      (response) => {
        
          this.router.navigate(['users/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }
}
