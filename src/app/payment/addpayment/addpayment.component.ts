import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from '../../userinfo.service'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Numeric } from 'd3';
@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.css']
})
export class AddpaymentComponent implements OnInit {
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
  years = [];
  hours = [];
  days = [];
  minutes = [];
  hoursVal; minsVal;
  hoursValue: string;
  minsValue: string;
  day: string;
  months: string;
  year: any;
  mon: any; userName: string; hidesearch: boolean; userid: any;
  PatientsList: any; tableslist: any; pnamehidden: boolean = false; pname: any; paymentTotal: any = 0;
  pid: any; patient_id: any; credit: boolean = false; creamount: number = 0; getpayments: any;
  dataTable: any; creditCard: any = 0; insurance: any = 0; cash: any = 0; showtable: boolean = false;
  cashhidden: boolean = false; lblblnsremain: any = 0; lblOutstandingBalance: any = 0; lblappliedpaymnt = 0;
  oustandinggrid: any; debitcard: string = "0"; debitapproval: string = ""; creditapproval: string = "";
  bindpaymentmodes: any; paymentmodes = []; amount = []; tatal: string; oldamount: string; approvalno = [];
  notes: any = ""; allInputsArr = []; i: any; invocieid = [];
  invoicenumber: any;
  from_page: any;
  paymodes: any;
  nodata: boolean;
  paymodesarr = [];
  hdncredit1: number = 0;
  hdnremaining: number = 0;
  currency: string;
  Total_Amnt: any;
  constructor(
    public cmn: UserinfoService,
    public http: Http,
    public chRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
    this.nodata = true;
    console.log(window.localStorage.getItem("userId"));
    this.userid = window.localStorage.getItem("userId")

    this.invoicenumber = this.route.snapshot.params['invoicenum'];
    console.log(this.invoicenumber);
    this.from_page = this.route.snapshot.params['frompage'];

    if (this.from_page != "payment") {
      var pid = this.invoicenumber;

      console.log(pid);

      this.GetPatientName(pid);
    }
    this.getpaymentmodes();

    this.userName = localStorage.getItem('name');

    this.getdropdown();
    this.daysInThisMonth();
  }
  //pusing invocesid's from datatable if exists
  invoiceids() {
    var invoice = []
    $('.eachdata').each(function () {
      invoice.push($(this).find('td').eq(1).html());
    });
    this.invocieid.push(invoice);
  }
  //allow numbers only function
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //caluclation of sum logic
  calc(ev) {
    var elemArray = <HTMLCollection>document.getElementsByClassName('rpAmnts');
    var rppaymodes = document.getElementsByClassName('rppaymode');
    var insur = document.getElementsByClassName('insurance');
    //var approval = document.getElementsByClassName('cssapprove');
    //var total = 0;
    let total: number = 0;
    var insurance_Amnt
    for (var i = 0; i < elemArray.length; i++) {
      var j = 0;
      //(<HTMLInputElement>document.getElementById(elementId)).value;
      var eachElement = <HTMLInputElement>elemArray[i]
      if (eachElement.value != "" && rppaymodes[i].textContent != "Insurance")
        j = parseInt(eachElement.value);
      else if (eachElement.value != "" && rppaymodes[i].textContent == "Insurance")
        insurance_Amnt = eachElement.value;
      total = total + j;
    }
    //applying to out standing balances        
    this.paymentTotal = (total) + parseInt(insurance_Amnt);
    var remaining: number = this.hdnremaining;
    remaining = (remaining) - (total);
    if (remaining >= 0) {
      this.lblappliedpaymnt = (total) + parseInt(insurance_Amnt);
      this.lblblnsremain = remaining;
    }
    else {
      this.lblappliedpaymnt = 0;
      this.lblblnsremain = this.hdnremaining;
    }
    ///performing on table     
    var grid = document.getElementsByClassName('table')[0];
    var inputs = <HTMLCollection>grid.getElementsByClassName('csspayamnt');
    var out = <HTMLCollection>grid.getElementsByClassName('cssoutstanding');
    var remain = <HTMLCollection>grid.getElementsByClassName('cssremaining');
    var creditNew = <HTMLCollection>grid.getElementsByClassName('csscredit');
    let Amnt = total;
    let status = true;
    let credit_Amnt: number = this.hdncredit1;
    for (var i = 0; i < inputs.length; i++) {
      var eachMainInput = <HTMLInputElement>inputs[i]
      eachMainInput.value = "";
      remain[i].innerHTML = out[i].innerHTML;
    }

    for (var i = 0; i < inputs.length; i++) {
      var inputs = <HTMLCollection>grid.getElementsByClassName('csspayamnt');
      var out = <HTMLCollection>grid.getElementsByClassName('cssoutstanding');
      var remain = <HTMLCollection>grid.getElementsByClassName('cssremaining');
      var creditNew = <HTMLCollection>grid.getElementsByClassName('csscredit');
      var eachMainInput1 = <HTMLInputElement>inputs[i];
      var eachOut = <HTMLInputElement>out[i];
      var eachRemain = <HTMLElement>remain[i]
      var eachCredit = <HTMLInputElement>creditNew[i]
      if (total != 0) {
        if (status = true && Amnt != 0) {
          if (Amnt <= parseInt(eachOut.innerHTML)) {
            eachMainInput1.value = (Amnt).toString();
            Amnt = 0;
            status = false;
          }
          else {
            eachMainInput1.value = out[i].innerHTML;
            Amnt = Amnt - parseInt(out[i].innerHTML);
          }
          eachRemain.innerHTML = (parseInt(out[i].innerHTML) - parseInt(eachMainInput1.value)).toString();
        }
      }
      else {
        eachMainInput1.value = "0";
        remain[i].innerHTML = out[i].innerHTML;
      }
      if (credit_Amnt > 0) {
        if (parseInt(remain[i].innerHTML) >= (credit_Amnt)) {
          eachCredit.value = (credit_Amnt).toString();
          credit_Amnt = 0;
        }
        else {
          if (eachMainInput1.value == '')
            eachMainInput1.value = (0).toString();
          eachCredit.value = (parseInt(eachOut.innerHTML) - parseInt(eachMainInput1.value)).toString();
          credit_Amnt = (credit_Amnt) - parseInt(eachCredit.value);
        }
      }
    }
    if ((Amnt) + (credit_Amnt) > 0) {
      this.creamount =((Amnt) + (credit_Amnt));
      this.credit = true;
    }
    else {
      this.creamount = 0;
      this.credit = false;
    }
  }//closing calucaltion func

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
      this.insert();
    }
  }
  daysInThisMonth() {
    var now = new Date();
    //console.log(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
  }
  changemonth(num) {
    //console.log(this.year, num.target.value)
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
    //console.log(new Date(this.year, this.mon, 0).getDate());
    let dlen = (new Date(this.year, this.mon, 0).getDate());
    for (let d = 1; d <= dlen; d++) {
      this.days.push(d);
    }
  }
  getdropdown() {
    var year = new Date().getFullYear() - 1;
    this.years.push(year);
    for (var i = 1; i < 7; i++) {
      this.years.push(year + i);
    }
    for (let i = 0; i <= 23; i++) {
      if (i <= 9) {
        this.hours.push("0" + i)
      } else {
        this.hours.push(i);
      }
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
    this.hoursValue = this.pad(today.getHours().toString());
    this.minsValue = this.pad(today.getMinutes().toString());
    this.day = this.pad(today.getDate().toString());
    this.year = today.getFullYear().toString();
    this.mon = (today.getMonth() + 1).toString()

    let dlen = (new Date(this.year, this.mon, 0).getDate());

    for (let d = 1; d <= dlen; d++) {
      this.days.push(d);
    }
  }
  pad(n) {
    return n < 10 ? '0' + n : n
  }
  // auto complete logic
  patientkeyup(evnt) {
    this.hidesearch = true;
    var val = evnt.target.value;
    //console.log("Auto complete");
    var accessToken = window.localStorage.Tokenval;
    //console.log(accessToken + "" + this.userid);
    // our service calling as usual
    var serviceUrl = this.cmn.commonUrl + "Account/getuser"
    var params = {
      "text": "patientnameall",
      "id": val,
      "param1": this.userid,
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    //console.log(params)

    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
     console.log(result);
      // if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
          if (result.status_cd == "1") {
        // console.log(result.data);
        this.PatientsList = result.data.Table;
        // console.log(this.PatientsList);
      } else {
        //alert("No Data Found");
        // this.nodata = false;
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }


  }
  //getting the selected value
  getval(name, id) {
    //console.log(name, id);
    this.pnamehidden = false;
    this.pname = name;
    this.pid = id;
    // console.log(this.pname, this.pid);
    this.hidesearch = false;
    this.patient_id = id;
    //hiding the credit amount
    this.credit = false;
    this.Varify();
  }
  Varify() {
    //check user exists
    //console.log(this.patient_id);
    var accessToken = window.localStorage.Tokenval;
    // our service calling as usual
    var serviceUrl = this.cmn.commonUrl + "Account/Getdata_By_Id"
    var params = {
      "operation": "checkname",
      "value": this.pname,
      "uid": this.patient_id
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    // console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      /// console.log(result);
      if (result.status_cd === "1") {
        //console.log(result.data);
        this.PatientsList = result.data.Table;

        if (this.PatientsList[0].Result.toString().toLowerCase() == "true") {//check user exists 
          // console.log(this.PatientsList[0].Result);
          this.inserPaymentDetails_new()
          this.outstandingamount()
        } else {
          alert('Please Enter Valid Patient.');
        }
      } else {

      }
    },
    );
    error => {
      //console.log(error);
      alert(error);
    }

  }
  inserPaymentDetails_new() {
    var accessToken = window.localStorage.Tokenval;
    // our service calling as usual
    var serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new"
    var params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "patientid": this.patient_id,
      "operation": "Getpatientinvoices"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    var self = this;
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      // console.log(result);
      if (result.status_cd === "0") {//set o as per server side use 0
        this.showtable = true;
        //console.log(result.data);
        this.tableslist = result.data.Table;
        //checking if credit amount from second table
        if (result.data.Table1[0].credit != null) {
          this.creamount = result.data.Table1[0].credit;
          this.oldamount = result.data.Table1[0].credit;
          this.credit = true
          //checking already total is there or not                       
          if (this.paymentTotal != "" && this.paymentTotal != undefined && this.paymentTotal != "0") {
            this.paymentTotal = this.creamount + parseInt(this.paymentTotal).toString();
          }
        }
        //BINDING TABLE BELOW  FROM FIRST TABLE 
        if (this.tableslist != null && this.tableslist != "" && this.tableslist != "undefined") {
          this.getpayments = result.data.Table;
          self.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          this.nodata = true;
        } else {
          // console.log(result.error_msg);
          // console.log(accessToken);
          //self.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();

          this.nodata = false;
        }
        //binding insurence details from third table if exists     
        if (result.data.Table2 != null) {
          for (let i = 0; i < result.data.Table2.length; i++) {
            this.insurance = this.insurance + parseFloat(result.data.Table2[i].invoice);
            this.paymentTotal = this.insurance;
          }
          $('.insurance').val(this.insurance)
        }
      } else {
        //alert("No Data Found");
        // this.nodata = false;
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }


  }
  ///binding outstanding amount if exists
  outstandingamount() {
    var accessToken = window.localStorage.Tokenval;
    //console.log(accessToken + "" + this.userid);

    // our service calling as usual
    var serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new"
    var params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "patientid": this.patient_id,
      "operation": "GetInvoicePayments"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    // console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      // console.log(result);
      if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
        //  console.log(result.data);
        this.oustandinggrid = result.data.Table;
        ///console.log(this.oustandinggrid);
        // console.log(this.paymentTotal)

        if (this.oustandinggrid[0].outstanding !== null && this.paymentTotal !== null) {
          //  console.log('value came')

          this.lblblnsremain = (parseInt(this.oustandinggrid[0].outstanding) - (parseInt(this.paymentTotal))).toString();
          this.lblOutstandingBalance = this.oustandinggrid[0].outstanding;
          this.hdnremaining = this.lblblnsremain;

          this.Total_Amnt = result.data.Table[0].Total_Amnt;
          this.lblappliedpaymnt = this.paymentTotal;

          if (document.URL.includes('=')) {
            // this.bindCash()
          }
        } else {
        }
      } else {
        //alert("No Data Found");
        // this.nodata = false;
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }

    this.getcurrency();
  }

  insert() {
    var accessToken = window.localStorage.Tokenval;
    // our service calling as usual
    var datetime = this.mon + "/" + this.day + "/" + this.year + " " + this.hoursValue + ":" + this.minsValue;
    //   alert("clinicid" + localStorage.getItem('userId'))
    //   alert(this.userName);
    //   alert(this.patient_id);
    //   alert("invalid"+this.allInputsArr.toString());
    //   alert("invalid" + this.invocieid.toString());
    //   alert(datetime)
    //  alert(this.paymentmodes);
    //  alert(this.amount.toString());
    //   alert(this.notes);
    //  alert(this.paymentTotal);
    //   alert("userid" + localStorage.getItem('userId'))
    //  alert("invoice amount" + this.allInputsArr);
    //   alert(this.creamount);
    //   alert(this.approvalno)
    let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
    let params =
    {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": this.userName,
      "paymentid": "",
      "patientid": this.patient_id,
      "invoiceid": this.invocieid.toString(),
      "payment_dttime": datetime,
      "paymodeids": this.paymentmodes,
      "paymode_amts": this.amount.toString(),
      "notes": this.notes,
      "total": this.paymentTotal,
      "loginid": this.userid,
      "Trans_Date": "",
      "Last_updated": "",
      "status": "Paid",
      "operation": "Insert",
      "inv_amnts": this.allInputsArr,
      "credit": this.creamount.toString(),
      "pagecount": this.approvalno
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      // console.log(result);
      if (result.data.Table[0].Result.toString().toLowerCase() === "true") {

        alert('Payment Submitted Successfully');
        this.router.navigate(['/view-payments', { "mypid": result.data.Table1[0].PaymentId }]);
        //ds.Tables[0].Rows[0]["PaymentId"].ToString()
      } else {
        alert('Payment Not Submitted, try again.');
      }
    },
      error => {
        console.log(error);
      }
    );

  }
  // -----------------------------Patient name binding--------------------
  GetPatientName(pid) {
    console.log(pid);
    var accessToken = window.localStorage.Tokenval;
    //  console.log(accessToken);     
    var serviceUrl = this.cmn.commonUrl + "Account/Invoice_transactions"
    var params = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Invoiceno": pid,
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
      "Loginid": "",
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
      "condition": "get_invoiceinfo"
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
        // console.log(result.data.Table);
        this.pname = result.data.Table[0].name1;
        //console.log(this.pname);
        this.patient_id = result.data.Table[0].patientid;
        this.patient_id = result.data.Table[0].patientid;
        this.hdncredit1 = result.data.Table[0].credit;
        if (this.hdncredit1 > 0) {
          this.creamount=  this.hdncredit1;
          this.credit = true;
        }
        else {
          this.creamount = 0;
          this.credit = false;
        }
        console.log(this.patient_id);
        this.getpaymentmodesnew(this.patient_id)
        this.Varify();
        //  this.nodata;
      } else {
        console.log("No Data Found");
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }

  }
  getpaymentmodes() {
    console.log(this.userid, this.patient_id);
    var accessToken = window.localStorage.Tokenval;
    var serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new"
    var params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "patientid": this.patient_id,
      "operation": "getpaymodes"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    //console.log(params)
    var self = this;
    console.log(params);
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.data.Table[0].Result.toString().toLocaleLowerCase() === "true") {
        // for (let i = 0; i < result.data.Table.length; i++) {
        //  this.paymodesarr.push(result.data.Table[i].Paymodetype_Name.substring(0, 22));
        //}
        this.paymodes = result.data.Table;

      } else {
        console.log("No Data Found");
      }

    },
    );
    error => {
      console.log(error);
      alert(error);
    }
  }



  bindCash() {
    var self = this;
    //console.log(self.Total_Amnt);
    $('#tblpaymentmodes tr').each(function () {

      if ($(this).find('td:eq(0)').html().toLowerCase() === 'cash') {
        $(this).find('td:eq(1)').find('input').val(self.Total_Amnt)
      }
    })
    this.calc("");
  }
  getpaymentmodesnew(pid) {
    //console.log(this.patient_id);
    var accessToken = window.localStorage.Tokenval;
    var serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new"
    var params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "patientid": pid,
      "operation": "getpaymodes"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    //console.log(params)
    var self = this;
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      // console.log(result);
      if (result.data.Table[0].Result.toString().toLowerCase() === "true") {
        // for (let i = 0; i < result.data.Table.length; i++) {
        //  this.paymodesarr.push(result.data.Table[i].Paymodetype_Name.substring(0, 22));
        //}
        this.paymodes = result.data.Table;

      } else {
        //alert("No Data Found");     
      }
    },
    );
    error => {
      console.log(error);
      alert(error);
    }
    err => {
      console.log("Token Error:" + err);
      alert(err);
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
      // console.log(result);
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
