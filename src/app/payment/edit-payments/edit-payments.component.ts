import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from '../../userinfo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-edit-payments',
  templateUrl: './edit-payments.component.html',
  styleUrls: ['./edit-payments.component.css']
})
export class EditPaymentsComponent implements OnInit {
  years = []; hours = []; days = []; minutes = []; hoursVal; minsVal; hoursValue: string; minsValue: string;
  day: string; months: string; year: any; mon: any; userName: string; hidesearch: boolean; userid: any;
  PatientsList: any; tableslist: any; pnamehidden: boolean = false; pname: any; paymentTotal: any = 0;
  pid: any; patient_id: any; credit: boolean = false; creamount: string = ''; getpayments: any;
  dataTable: any; creditCard: any = 0; insurance: any = 0; cash: any = 0; showtable: boolean = false;
  cashhidden: boolean = false; lblblnsremain: any; lblOutstandingBalance: any = 0; lblappliedpaymnt: any = "0";
  oustandinggrid: any; debitcard: string = "0"; debitapproval: string = ""; creditapproval: string = "";
  bindpaymentmodes: any; paymentmodes = []; amount = []; tatal: string; oldamount: string; approvalno = []; notes: any = ""; allInputsArr = []; i: any; invocieid = [];
  Paymentid: string; date: any; patient: any; payment: any; lblcur: any;
  lbcredit: any = "0"; lbpymntinvoice: any; paymentdetails: any; invoicedetails: any;
  ServiceRes: any; Notes: any;
  dataTable1: any = []; showdata: boolean = false; nodata: boolean;
  nodata1: boolean; getinvoicedetails: any;
  paymenttype: any;
  hdncredit1: any = 0;
  hdnpaycredit: any = 0;
  hdnremaining: number = 0;
  currency: string;
  hdncredit: number;
  public isPageloaderVisible = true;
  constructor(public cmn: UserinfoService,
    public http: Http, public chRef: ChangeDetectorRef, public commonService: UserinfoService,
    private router: Router) { }

  month = [{
    monthNum: '1',
    monthName: 'January'
  }, {
    monthNum: '2',
    monthName: 'February'
  }, {
    monthNum: '3',
    monthName: 'March'
  }, {
    monthNum: '4',
    monthName: 'April'
  }, {
    monthNum: '5',
    monthName: 'May'
  }, {
    monthNum: '6',
    monthName: 'June'
  }, {
    monthNum: '7',
    monthName: 'july'
  }, {
    monthNum: '8',
    monthName: 'August'
  }, {
    monthNum: '9',
    monthName: 'September'
  }, {
    monthNum: '10',
    monthName: 'October'
  }, {
    monthNum: '11',
    monthName: 'November'
  }, {
    monthNum: '12',
    monthName: 'December'
  }
  ]
  houres = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

  ngOnInit() {
    this.userName = localStorage.getItem('name');
    this.userid = localStorage.getItem("userId")
    this.getdropdown();
    this.daysInThisMonth();
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.Paymentid = currentUrl[currentUrl.length - 1]

    this.getdata(this.Paymentid);
    this.OutstandingBalance(this.Paymentid);
    this.getcurrency();
    var self = this;
    setTimeout(() => {
      self.calc()
    }, 1500);
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  daysInThisMonth() {
    var now = new Date();
    // console.log(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
  }
  changemonth(num) {

    // console.log(this.year, num.target.value)
    this.mon = num.target.value
    this.days = [];
    var now = new Date();
    // console.log(new Date(this.year, this.mon, 0).getDate());
    let dlen = (new Date(this.year, this.mon, 0).getDate());
    for (let d = 1; d <= dlen; d++) {
      this.days.push(d);
    }
  }
  changeyear(year) {
    this.days = [];
    this.year = year.target.value;
    var now = new Date();
    // console.log(new Date(this.year, this.mon, 0).getDate());
    let dlen = (new Date(this.year, this.mon, 0).getDate());
    for (let d = 1; d <= dlen; d++) {
      this.days.push(d);
    }
  }
  pad(n) {
    return n < 10 ? '0' + n : n
  }
  getdropdown() {
    var year = new Date().getFullYear() - 20;

    this.years.push(year);
    for (var i = 1; i < 25; i++) {
      this.years.push(year + i);
    }
    for (let i = 0; i <= this.houres.length; i++) {
      this.hours.push(this.houres[i])
    }
    // for (let d = 1; d <= 31; d++) {
    //   this.days.push(d);
    // }

    for (let t = 0; t < 60; t++) {
      if (t <= 9) {
        this.minutes.push("0" + t);
      } else {
        this.minutes.push(t);
      }

    }

    var today = new Date();

    this.hoursValue = today.getHours().toString();
    this.minsValue = this.pad(today.getMinutes().toString());
    this.day = this.pad(today.getDate().toString());
    // console.log(today.getFullYear())
    this.year = today.getFullYear().toString();
    this.mon = (today.getMonth() + 1).toString()

    let dlen = (new Date(this.year, this.mon, 0).getDate());
    for (let d = 1; d <= dlen; d++) {
      this.days.push(d);
    }
  }
  //calling edit servicce
  getdata(pid) {
    var accessToken = window.localStorage.Tokenval;
    this.isPageloaderVisible = false;
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params = {
      "clinicid": localStorage.getItem('userId'),
      "paymentid": pid,
      "operation": "GetPaymentsdetails",
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var self = this;
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.data.Table[0].Result.toString().toLowerCase() === "true") {
        var dt = [];
        var date = [];
        var tme = [];
        // console.log(result.data)
        this.ServiceRes = result.data.Table;
        this.date = this.ServiceRes[0].Payment_dttime;
        dt = this.ServiceRes[0].Payment_dttime.split(' ');
        date = dt[0].split('/');
        tme = dt[1].split(':');
        this.day = date[1];
        this.mon = date[0];
        this.year = date[2];
        this.hoursValue = tme[0];
        this.minsValue = tme[1];
        this.pname = this.ServiceRes[0].First_name;
        this.paymentTotal = this.ServiceRes[0].Total;
        this.lbpymntinvoice = this.ServiceRes[0].Invoiceid;
        this.creamount = this.ServiceRes[0].Acnt_credit;
        this.hdncredit1 = this.ServiceRes[0].Acnt_credit;
        this.patient_id = this.ServiceRes[0].patientid;
        this.notes = this.ServiceRes[0].Notes;
        this.hdnpaycredit = this.ServiceRes[0].Payment_credit;
        // debugger;
        if(result.data.Table1 ! = '' && result.data.Table1 !== null){
          this.paymentdetails = result.data.Table1;
          this.cash = this.paymentdetails[0].Pay_Amnt;
          this.approvalno = this.paymentdetails[0].approvalno;
          this.paymenttype = this.paymentdetails[0].paymenttype;
        }
        // if(result.data.Table2.length > 0){
        //   this.paymentdetails = result.data.Table1;
        // }
        // if(result.data.Table3.length > 0){
        //   this.invoicedetails = result.data.Table1;
        // }
        
        this.invoicedetails = result.data.Table3;
       

        //this.paymentmodes.push(this.paymentdetails[0].Paymodetype_ID);


        if (this.invoicedetails == "" || this.invoicedetails == null) {
          this.nodata = false
          this.showdata = false;
        }
        else {
          this.nodata = true
          this.showdata = true;
        }
        //binding datatable payments if exists 
        this.tableslist = result.data.Table2;
        if (this.tableslist != "") {
          this.showtable = true;
          // console.log("datatable")
          this.getpayments = result.data.Table2;
          self.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          this.nodata1 = false

        } else {
          this.showtable = true;
          // console.log(result.error_msg);
          // console.log(accessToken);
          self.chRef.detectChanges();
          const table: any = $('table');
          // console.log(table)
          this.dataTable = table.DataTable();
          this.nodata1 = true

        }
      }
    },
      error => {
        // console.log(error);
      }
    );

  }
  OutstandingBalance(pid) {

    var accessToken = window.localStorage.Tokenval;

    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params = {
      "clinicid": localStorage.getItem('userId'),
      "paymentid": pid,
      "operation": "GetInvoicePaymentsEdit",
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var self = this;
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //// console.log(result);
      if (result.data.Table[0].Result.toString().toLowerCase() === "true") {
        // console.log(result.data)
        this.ServiceRes = result.data.Table;
        this.lblOutstandingBalance = this.ServiceRes[0].outstanding;
        this.lblblnsremain = this.ServiceRes[0].outstanding;//(parseInt((this.ServiceRes[0].outstanding))-parseInt(this.ServiceRes[0].remaining));
        this.lblappliedpaymnt = (parseInt(this.paymentTotal) - parseInt(this.creamount))// this.ServiceRes[0].remaining;
        this.hdnremaining = this.lblblnsremain;

      }
    },
      error => {
        // console.log(error);
      }
    );

  }
  calc() {


    var elemArray = <HTMLCollection>document.getElementsByClassName('rpAmnts');
    var total = 0;
    for (var i = 0; i < elemArray.length; i++) {
      var eacharray = <HTMLInputElement>elemArray[i];
      var j = 0;
      if (eacharray.value != "")
        j = parseInt(eacharray.value);
      total = total + j;
    }
    this.paymentTotal = total;
    var appliedpaymnt = this.lblappliedpaymnt//document.getElementById('<%=lblappliedpaymnt.ClientID %>');
    var blnsremain = this.lblblnsremain;//document.getElementById('<%=lblblnsremain.ClientID %>');
    var remaining = this.hdnremaining;
    remaining = remaining - total;
    if (remaining >= 0) {
      this.lblappliedpaymnt = total;
      this.lblblnsremain = remaining;
    }
    else {
      this.lblblnsremain = 0;
      this.lblappliedpaymnt = this.hdnremaining;
    }
    //when invoices are empty
    var credit_Amnt = parseInt(this.hdncredit1) - parseInt(this.hdnpaycredit)
    //        alert(total);
    this.hdncredit = total;
    if (total + credit_Amnt > 0) {
      this.creamount = (total + credit_Amnt).toString();
      this.credit = true;
    }
    else {
      this.creamount = "";
      this.credit = false;
    }
    //
    var grid = document.getElementsByClassName('table')[0];
    var inputs = <HTMLCollection>grid.getElementsByClassName('csspayamnt');
    var out = <HTMLCollection>grid.getElementsByClassName('cssoutstanding');
    var remain = <HTMLCollection>grid.getElementsByClassName('cssremaining');

    var credit = <HTMLCollection>grid.getElementsByClassName('csscredit');
    var Amnt = total,
      status = true;

    var credit_Amnt: number = parseInt(this.hdncredit1) - parseInt(this.hdnpaycredit);

    for (var i = 0; i < inputs.length; i++) {
      var eachinput = <HTMLInputElement>inputs[i];
      var eachremain = <HTMLElement>remain[i];
      var eachcredit = <HTMLInputElement>credit[i];
      var eachout = <HTMLElement>out[i];
      eachinput.value = "";
      eachremain.innerHTML = eachout.innerHTML;
    }

    for (var i = 0; i < inputs.length; i++) {

      var eachinput = <HTMLInputElement>inputs[i];
      var eachremain = <HTMLElement>remain[i];
      var eachcredit = <HTMLInputElement>credit[i];
      var eachout = <HTMLElement>out[i];
      if (total != 0) {
        if (status = true && Amnt != 0) {
          if (Amnt <= parseInt(eachout.innerHTML)) {
            eachinput.value = Amnt.toString();
            Amnt = 0;
            status = false;
          }
          else {
            eachinput.value = eachout.innerHTML;
            Amnt = Amnt - parseInt(eachout.innerHTML);
          }
          eachremain.innerHTML = (parseInt(eachout.innerHTML) - parseInt(eachinput.value)).toString();
        }
      }
      else {
        eachinput.value = "0";
        eachremain.innerHTML = eachout.innerHTML;
      }
      if (credit_Amnt > 0) {
        if ((parseInt(eachremain.innerHTML)) >= credit_Amnt) {
          eachcredit.value = credit_Amnt.toString();
          credit_Amnt = 0;
        }
        else {
          if (eachinput.value == '')
            eachinput.value = "0";
          eachcredit.value = (parseInt(eachout.innerHTML) - parseInt(eachinput.value)).toString();
          credit_Amnt = credit_Amnt - parseInt(eachcredit.value);
        }
      }
    }
    if (Amnt + credit_Amnt > 0) {
      this.creamount = (Amnt + credit_Amnt).toString();
      this.credit = true;
    }
    else {
      this.creamount = "";
      this.credit = false;
    }
  }

  btnchcekvaldation() {
    let pname = $("#pname").val()
    if (pname == "") {
      this.pnamehidden = true
      return
    }
    else {
      this.pnamehidden = false
    }
    var elemArray = <HTMLCollection>document.getElementsByClassName('rpAmnts');
    var rppaymodes = <HTMLCollection>document.getElementsByClassName('rppaymode');
    var approvalnos = <HTMLCollection>document.getElementsByClassName('cardapp');
    var payids = <HTMLCollection>document.getElementsByClassName('payid');
    //var approval = document.getElementsByClassName('cssapprove');
    var count = 0;
    var cardcount = 0;
    var validation = true;
    for (var i = 0; i < elemArray.length; i++) {
      var j = 0;
      var eachElem = <HTMLInputElement>elemArray[i]

      var eachpayids = <HTMLInputElement>payids[i]
      if (eachElem.value != "" && eachElem.value != "0") {

        if (rppaymodes[i].textContent == "Credit Card" || rppaymodes[i].textContent == "Debit Card") {
          for (var k = 0; k < approvalnos.length; k++) {
            var eachApprovenos = <HTMLInputElement>approvalnos[k]
            if (eachApprovenos.value == "" || eachApprovenos.value == "undefined") {
              cardcount++
            } else {
              this.paymentmodes.push(eachpayids.value)
              this.amount.push(eachElem.value);
              this.approvalno.push(eachpayids.value + ";" + eachApprovenos.value);
            }
            if (cardcount == approvalnos.length) {
              alert('Please Enter Approval No.');
              this.paymentmodes = [];
              this.amount = [];
              this.approvalno = [];
              validation = false;
              return false;
            }
          }
        } else {

          this.paymentmodes.push(eachpayids.value)
          this.amount.push(eachElem.value);
        }
      } else {
        count++
      }
      if (count == elemArray.length) {
        alert('Please Enter Atleast One Payment Source');
        this.paymentmodes = [];
        this.amount = [];
        this.approvalno = [];
        validation = false;
        return false;
      }
    }
    if (validation) {
      if (this.tableslist != null && this.tableslist != "" && this.tableslist != "undefined") {
        this.showtable = true;
        var allTextValues = document.getElementsByClassName('table')[0];
        var allInputs = allTextValues.querySelectorAll('input');
        var invoice = [];
        for (var i = 0; i < allInputs.length; i++) {
          var eachInput = allInputs[i].value;
          if (eachInput != "" && eachInput != null && eachInput != undefined)
            this.allInputsArr.push(eachInput)
        }
        this.invoiceids();
        //alert(this.allInputsArr.toString());             
      }
      this.update();
    }
  }
  //pusing invoices id's from datatable if exists
  invoiceids() {

    this.showtable = true;
    var allInputs = [];
    var invoice = [];
    var hdnextra = [];
    $('.eachdata').each(function () {
      invoice.push($(this).find('td').eq(1).html());
      allInputs.push(parseInt($(this).find('td').eq(6).find('input').val().toString()) + parseInt($(this).find('td').eq(7).find('input').val().toString()));
    });
    this.allInputsArr.push(allInputs)
    this.invocieid.push(invoice);

  }

  //calling update service
  update() {
    var accessToken = window.localStorage.Tokenval;

    // our service calling as usual
    var datetime = this.mon + "/" + this.day + "/" + this.year + " " + this.hoursValue + ":" + this.minsValue;
    // alert("clinicid" + localStorage.getItem('userId'))
    // alert(this.userName);
    // alert(this.patient_id);
    // //alert("invalid"+this.allInputsArr.toString());
    // alert("invalid" + this.invocieid.toString());
    // alert(datetime)
    // alert(this.paymentmodes);
    // alert(this.amount.toString());
    // alert(this.notes);
    // alert(this.tatal);
    // alert("userid" + localStorage.getItem('userId'))
    // alert("invoice amount" + this.allInputsArr);
    // alert(this.creamount);
    // alert(this.approvalno)
    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params =
    {
      "Sno": "",
      "clinicid": localStorage.getItem('userId'),
      "branchid": this.userName,
      "paymentid": this.Paymentid,
      "patientid": this.patient_id,
      "invoiceid": this.invocieid.toString(),
      "payment_dttime": datetime,
      "paymodeids": this.paymentmodes,
      "paymode_amts": this.amount.toString(),
      "notes": this.notes,
      "total": this.paymentTotal,
      "loginid": localStorage.getItem('userId'),
      "Trans_Date": "",
      "Last_updated": "",
      "status": "",
      "operation": "update",
      "inv_amnts": this.allInputsArr.toString(),
      "credit": this.creamount,
      "pagecount": this.approvalno
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //// console.log(result);
      if (result.data.Table[0].Result.toString().toLowerCase() === "true") {
        alert('Updated successfully');
        this.router.navigate(['/getpayment']);
      }
    },
      error => {
        // console.log(error);
      }
    );

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
      //// console.log(result);                    
      if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
        localStorage.setItem('cur', result.data.Table[0].Currency);
        this.currency = localStorage.getItem('cur');
      }
    },
      error => {
        // console.log(error);
      }
    );

  }
}
