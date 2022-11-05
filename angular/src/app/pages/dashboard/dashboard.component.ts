import { Component, ViewChild,OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { UserService } from '../../layouts/admin-layout/user.serviuce';
import { Table } from 'primeng/table';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { jsPDF } from 'jspdf';
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import * as Chartist from 'chartist';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styles: [`
    :host ::ng-deep .p-button {
        margin: 0 .5rem 0 0;
        min-width: 10rem;
    }

    p {
        margin: 0;
    }

    .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
    }
    pcard{
      margin-right: 20px
    }
    .invoice-head td {
      padding: 0 8px;
    }
    .container {
      padding-top:30px;
    }
    .invoice-body{
      background-color:transparent;
    }
    .invoice-thank{
      margin-top: 60px;
      padding: 5px;
    }
    address{
      margin-top:15px;
    }
`]
})

export class DashboardComponent implements OnInit {
  title = 'html-to-pdf';
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF();
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('invoice-payment.pdf');
    });
  }
  searchReport: FormGroup;
  timeSheets: Array<object> = [];
  values: any;
  display: boolean = false;
  displayModal: boolean;
  displayBasic: boolean;
  displayDataBasic: boolean;
  displayMaximizable: boolean;
  displayPosition: boolean;
  address: string;
  address1: string;
  city: string;
  state: string;
  zipcode: string;
  amount: any;
  hours:any;
  confirmationNumber: any;
  transferdate: any;
  paymentType: any;
  user: any;
  users:any;
  seriesData:any;
  schedules:any;
  name:string;
  fromDate:any;
  toDate:any;
  firstName:string;
  position: string;
  loading: boolean = true;
  dataload:boolean =false;
  menuexpectedrole:string;
  constructor(private userRest: UserService
  ) {
    this.userRest.getpayments().subscribe(
      (response) => { this.timeSheets = response.timesheet; },
      (error) => { console.log(error) }
    );
    this.userRest.loadUser().subscribe(
      (response) => { response = this.user;

      },
      (error) => { console.log(error) }
    );

    this.userRest.getUsers().subscribe(
      (responses) => { this.users=responses.user;
      this.schedules = responses.schedules
      },
      (error) => { console.log(error) }
    );
    this.address = "";
  }

  ngOnInit() {



    this.menuexpectedrole = localStorage.getItem('role');
    
    this.searchReport = new FormGroup({
      'fromdate': new FormControl(new Date(),[Validators.required]),
      'todate' : new FormControl(new Date(), [Validators.required]),
      'user': new FormControl("", [Validators.required])

    })

  }
  showBasicDialog(id: number) {
    //this.position = 'top';
   // this.displayPosition = true;
    this.displayBasic = true;
    this.dataload =false;
    this.amount=0;
    this.confirmationNumber=0;
    this.paymentType='';
    this.fromDate='';
    this.toDate='';
    this.userRest.getpaymentbyId(id).subscribe(
      (response) => {
        this.dataload = true;
        this.values = response.payment;
        this.displayDataBasic = true;
        this.name=  response.payment.user_details.name +" "+ response.payment.user_details.lastName;
        this.address = response.payment.user_details.address;
        this.address1 = response.payment.user_details.address1;
        this.city = response.payment.user_details.city;
        this.state = response.payment.user_details.state;
        this.zipcode = response.payment.user_details.zipcode;
        this.transferdate = response.payment.transferDate;
        this.amount = response.payment.amount;
        this.hours = response.payment.hours;
        this.confirmationNumber = response.payment.confirmationNumber;
        this.paymentType = response.payment.user_details.paymentType;
        this.fromDate =  response.payment.fromDate;
        this.toDate = response.payment.toDate;
      },
      (error) => { console.log(error) }
    );
  }

  searchReportSubmit($event:any){

    var body = "userId=" +$event;

     this.userRest.getpaymentSearch(body).subscribe(
       response => {
        this.timeSheets = response.payments

       },
       error =>{

       }
     );
 }

 data: any;

ngAfterViewInit() {

  const optionsEmailsSubscriptionChart = {
    axisX: {
      showGrid: true, axisTitle: 'Time (mins)',
    },
    low: 0,
    high: 56,
    chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
  };
  this.userRest.getloadTimeSheetsforuserw().subscribe(
    (response) => {
                      this.seriesData = response.getDatauserw;
                      this.data = {
                        labels: response.weekdates,
                        series: [ this.seriesData]
                      };
                      const emailsSubscriptionChart = new Chartist.Line(
                        '#chart',
                        this.data,
                        optionsEmailsSubscriptionChart
                      );
    },
    (error) => { console.log(error) }
  );

}

}
