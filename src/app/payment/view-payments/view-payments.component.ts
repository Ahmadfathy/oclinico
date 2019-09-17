import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from '../../userinfo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent implements OnInit {

  date: any;
  patient: any;
  payment: any;
  lblcur: any;
  lbcredit: any = "0";
  lbpymntinvoice: any;
  paymentdetails: any;
  invoicedetails: any;
  Paymentid: any; s
  ServiceRes: any;
  Notes: any;
  getpayments: any;
  dataTable: any = [];
  dataTable1: any = [];
  showdata: boolean = false;
  nodata: boolean = true;
  //nodata1: boolean
  getinvoicedetails: any;
  lblcur1: any;
  userid: string;
  currency: string;
  languageoption: any;
  langulagetype: any;

  constructor(public cmn: UserinfoService,
    public router: Router,
    public http: Http,
    public chRef: ChangeDetectorRef,
    public routeparam: ActivatedRoute) {

  }
  ngOnInit() {
    this.cmn.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
      //console.log(this.languageoption);
      // if (this.languageoption == " " || this.languageoption == undefined || this.languageoption == "undefined") {
      //   //console.log('english')
      //   $('.ltr').show()
      //   $('.rtl').hide()
      // } else {
      //   $('.rtl').show()
      //   $('.ltr').hide()
      // }
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {

        this.langulagetype = this.languageoption;
      }
    });

    this.userid = window.localStorage.getItem("userId")

    this.Paymentid = this.routeparam.snapshot.params['mypid'];

    this.nodata = true
    //this.nodata1 = true
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.Paymentid = currentUrl[currentUrl.length - 1]
    //console.log(this.Paymentid);
    this.getdata(this.Paymentid);
    this.getcurrency();
  }
 
  print() {
    var divToPrint = document.getElementById('DivIdToPrint');
    var a = '<div style="text-align:center"><img src="http://graylogic.net/OclinicoAPI/images/invoice-log.png" style="width:120; max-width:150px;"></div><br/>';
    var s = a + divToPrint.innerHTML;
    var printWindow = window.open('', '', 'left=100,top=10,width=800,height=600');// window.open('', 'Print-Window');
    printWindow.document.write('<html><head> </head><body> ' + s + '</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setTimeout(function () { printWindow.close(); }, 10);
  }

  myFunction() {
    window.print();
  }

  getdata(pid) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "paymentid": pid,
      "patientid": "",
      "invoiceid": "",
      "payment_dttime": "",
      "paymodeids": "",
      "paymode_amts": "",
      "notes": "",
      "total": "",
      "loginid": "",
      "Trans_Date": "",
      "Last_updated": "",
      "status": "",
      "operation": "GetPaymentsdetails",
      "inv_amnts": "",
      "credit": "",
      "pagecount": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var self = this;
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      ////console.log(result);          
      if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
        //console.log(result.data)
        this.ServiceRes = result.data.Table;
        this.date = this.ServiceRes[0].Payment_dttime;
        this.patient = this.ServiceRes[0].First_name;
        this.payment = this.ServiceRes[0].Total;
        this.lbpymntinvoice = this.ServiceRes[0].Invoiceid;
        this.lbcredit = this.ServiceRes[0].Acnt_credit;
        this.Notes = this.ServiceRes[0].Notes;
        this.paymentdetails = result.data.Table1;
        this.invoicedetails = result.data.Table3;
        if (this.invoicedetails == "" || this.invoicedetails == null) {
          this.nodata = false
          this.showdata = false;
        }
        else {
          this.nodata = true
          this.showdata = true;
        }
        //binding datatable payments if exists 

        this.paymentdetails = result.data.Table1;
        if (this.paymentdetails == "") {
        } else {
        }

        //binding datatable invoice if exists 

        // if (this.invoicedetails == "" && this.invoicedetails != "" && this.invoicedetails != undefined) {
        //   this.getinvoicedetails = result.data.Table3;
        //   self.chRef.detectChanges();
        //   const table: any = $('table');
        //   this.dataTable1 = table.DataTable();
        //   this.nodata = false;
        //   this.showdata = true;
        // } else {
        //   self.chRef.detectChanges();
        //   const table: any = $('table');
        //   this.dataTable1 = table.DataTable();
        //   this.showdata = false
        //   this.nodata = true
        // }
      }
    },
      error => {
      }
    );


  }
  DeleteUser() {
    if (confirm("Want to delete?")) {
      var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
      let params = {
        "Sno": "",
        "clinicid": this.userid,
        "branchid": "",
        "paymentid": this.Paymentid,
        "patientid": "",
        "invoiceid": "",
        "payment_dttime": "",
        "paymodeids": "",
        "paymode_amts": "",
        "notes": "",
        "total": "",
        "loginid": "",
        "Trans_Date": "",
        "Last_updated": "",
        "status": "",
        "operation": "Delete",
        "inv_amnts": "",
        "credit": "",
        "pagecount": ""

      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      var self = this;
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        //console.log(result);
        if (result.status_cd === "1") {
          alert(this.Paymentid + " Deleted successfully.");
          this.router.navigate(['/getpayment']);
        } else {
          alert("Please try agian.");
        }
      },
        error => {
          //console.log(error);
        }
      );

    }
  }

  getcurrency() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params = {
      "Sno": localStorage.getItem('username'),
      "clinicid": "",
      "branchid": "",
      "paymentid": "",
      "patientid": "",
      "invoiceid": "",
      "payment_dttime": "",
      "paymodeids": "",
      "paymode_amts": "",
      "notes": "",
      "total": "",
      "loginid": "",
      "Trans_Date": "",
      "Last_updated": "",
      "status": "",
      "operation": "getcurrency",
      "inv_amnts": "",
      "credit": "",
      "pagecount": ""

    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var self = this;
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      ////console.log(result);                    
      if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
        localStorage.setItem('cur', result.data.Table[0].Currency);
        this.currency = localStorage.getItem('cur');
      }
    },
      error => {
        //console.log(error);
      }
    );

  }
}



