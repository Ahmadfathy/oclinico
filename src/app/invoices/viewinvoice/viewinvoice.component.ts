import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserinfoService } from '../../userinfo.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';


@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.css']
})
export class ViewinvoiceComponent implements OnInit {
  userid: string;
  paymentsshow: boolean = false;
  viewinvoice: FormGroup;
  viewinvoicetotal: FormGroup;
  dataTable: any = [];
  mytable = []
  invoiceno: string;
  clinicname;
  clinicidnum: any;
  myemail: any;
  myaddress: string;
  mycontact: any;
  mywebsite: any;
  myarabicaddress: string;
  languageoption: string;
  invDate: any;
  invTime: any;
  invDname: any;
  invDoctcode: any;
  invCliniccode: any;
  invPatientname: any;
  invPaymetby: any;
  invNote: any;
  Email: any;
  invoicenum: any;
  time: any;
  date: any;
  filenumber: any;
  pname: any;
  pmobile: any;
  gender: any;
  age: any;
  doctcode: any;
  clinicvat: any;
  cliniccode: any;
  pracname: any;
  subtotal: any;
  discounttotal: string;
  Vatval: string;
  grandtotal: any;
  paymetby: any;
  note: any;
  currency: string;
  name: any;
  araname: any;
  // showdata: boolean = true;
  // nodata: boolean = true;

  constructor(private router: Router,
    public cmn: UserinfoService,
    public http: Http,
    private chRef: ChangeDetectorRef,
    public formbuilder: FormBuilder) {
    var currentUrl = document.URL.split('?');
    console.log(currentUrl);
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    console.log(currentUrl);
    this.invoiceno = currentUrl[1];
    console.log(this.invoiceno);
  }

  ngOnInit() {
    this.getcurrency();
    this.cmn.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
      //console.log(this.languageoption);
      if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
        //console.log('english')
        $('.ltr').show()
        $('.rtl').hide()
      } else {
        $('.rtl').show()
        $('.ltr').hide()
      }
    });
    this.userid = window.localStorage.getItem("userId");
    this.clinicname = window.localStorage.getItem("name");
    this.GetInvoiceData();
  }

  GetInvoiceData() {
    var accessToken = window.localStorage.Tokenval;
    //console.log(accessToken);  
    var serviceUrl = this.cmn.commonUrl + "Account/Invoice_transactions"
    var params = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Invoiceno": this.invoiceno,
      "Issued_date": "",
      "PatientId": "",
      "Doctorid": "",
      "Appointment_info": "",
      "Invoiceto": "",
      "Extra_patient": "",
      "Note": "",
      "Tot_discount": "",
      "Sub_total": "",
      "Tax": "",
      "Invoice_tot": "",
      "Loginid": this.userid,
      "Status": "",
      "Item_code": "",
      "bill_type": "",
      "Qty": "",
      "Price": "",
      "Tot_Qty": "",
      "TotPrice": "",
      "Taxper": "",
      "Tax_amt": "",
      "Discount": "",
      "Total": "",
      "Trans_date": "",
      "Last_Update": "",
      "condition": "GetInvoice"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      console.log(params)
      if (result.status_cd === "1") {
        console.log(result.data);
        this.clinicidnum = result.data.Table2[0].Spl_Eng;
        // this.viewinvoice.patchValue({
        this.date = result.data.Table[0].Trans_date,
          this.time = result.data.Table[0].Time,
          this.invoicenum = result.data.Table[0].Invoiceno,
          this.filenumber = result.data.Table[0].PatientId,
          this.pname = result.data.Table[0].PatientName,
          this.pmobile = result.data.Table[0].PatientMobile,
          this.gender = result.data.Table[0].Gender,
          this.age = result.data.Table[0].Age,
          this.pracname = result.data.Table[0].practitionerName,
          this.doctcode = result.data.Table[0].Doctorid,
          this.clinicvat = result.data.Table[0].VAT_No,
          this.cliniccode = result.data.Table[0].Clinicid,
          this.Email = result.data.Table[0].Email;
          this.invDate = result.data.Table[0].Trans_date,
          this.invTime = result.data.Table[0].Time,
          this.invDname = result.data.Table[0].practitionerName,
          this.invDoctcode = result.data.Table[0].Doctorid,
          this.invCliniccode = result.data.Table[0].Clinicid,
          this.invPatientname = result.data.Table[0].PatientName,
          this.invPaymetby = result.data.Table[0].paymentmode,
          this.invNote = result.data.Table[0].Note
          this.subtotal = ((result.data.Table[0].Sub_total) + (result.data.Table[0].Tot_discount)),
          this.discounttotal = result.data.Table[0].Tot_discount,
          this.Vatval = result.data.Table[0].VAT_No,
          this.grandtotal = result.data.Table[0].Invoice_tot,
          this.paymetby = result.data.Table[0].paymentmode,
          this.note = result.data.Table[0].Note
        if (result.data.Table3.length != 0) {
          // if (result.data.Table3[0].Paymodetype_Name != null) {
          //   this.viewinvoicetotal.patchValue({
          //     paymode: result.data.Table3[0].Paymodetype_Name + " : " + result.data.Table3[0].Amnt + this.currency
          //   })
          // } else {
          //   this.viewinvoicetotal.patchValue({
          //     paymode: "" + " : " + "" + this.currency
          //   })
          // }
          this.viewinvoicetotal = result.data.Table3;
          this.paymentsshow = false;
        } else {
          this.paymentsshow = true;
        }
        this.name = result.data.Table2[0].Name
        this.araname = result.data.Table2[0].Arabic_name
        this.myemail = result.data.Table2[0].Email;
        this.mywebsite = result.data.Table2[0].Website;
        this.mycontact = result.data.Table2[0].phoneno;
        this.myaddress = result.data.Table2[0].Address + " " + result.data.Table2[0].city;
        this.myarabicaddress = (result.data.Table2[0].Ara_Address || '') + " " + (result.data.Table2[0].Ara_City || '');
        this.mytable = result.data.Table1;
        console.log(this.mytable);
        // $('#dataTable_wrapper').show();
        // this.chRef.detectChanges();
        // const table: any = $('table');
        // this.dataTable = table.DataTable({
        //   'dom': '',
        //   'iDisplayLength': -1
        // });
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable(
          {
              'dom': '',
              'iDisplayLength': -1
            }
        );
        // this.showdata=false;
        // this.nodata = true;
      } else {
        $('#dataTable_wrapper').hide();
        console.log("No Data Found");
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }

  }

  print() {
    var divToPrint = document.getElementById('Print');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 100);
  }
  myFunction() {
    // var divToPrint = document.getElementById('DivIdToPrint');
    // divToPrint.style.display='none';
    window.print();
  }
  Sendemail() {
    if (this.Email != "" && this.Email != null && this.Email != "undefined") {
      var accessToken = window.localStorage.Tokenval;

      var mailbody = document.getElementById('Print');

      var serviceUrl = this.cmn.commonUrl + "Login/sendInvoiceMail"
      var params = {
        "mailbody": '<html><head></head><body>' + mailbody.innerHTML + '</body></html>',
        "mailid": this.Email,

      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {

        if (result.status_cd = "1") {
          alert("Email send successfully");
        }

      },
      );
      error => {
        console.log(error);
        alert(error);
      }
    } else {
      alert("Please update patient emaild");
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