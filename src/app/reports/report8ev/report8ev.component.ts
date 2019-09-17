import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-report8ev',
  templateUrl: './report8ev.component.html',
  styleUrls: ['./report8ev.component.css']
})
export class Report8evComponent implements OnInit {

  viewtype: any;
  pidval: any;
  tdatevalue: any;

  p1: any;
  p2: any;
  p3: any;
  p4: any;
  p5: any;
  p6: any;
  p7: any;
  p8: any;
  p9: any;
  p10: any;
  p11: any;
  p12: any;
  lablenames: any;
  values: any;
  public isPageloaderVisible = false;

  lable1: any
  lable2: any
  lable3: any
  lable4: any
  lable5: any
  lable6: any
  table: any = [];
  dataTable: any;
  showsubmit: boolean = true;
  reportid: any;
  userid:any;
  constructor(private router: Router, 
    public commonService: UserinfoService,
    public http: Http) {
      this.userid = window.localStorage.getItem("userId");
  }

  ngOnInit() {

    this.viewtype = window.sessionStorage.getItem("ltype");
    this.pidval = window.sessionStorage.getItem("lid");
    this.tdatevalue = window.sessionStorage.getItem("tdateval");
    console.log(this.viewtype);
    console.log(this.pidval);
    if (this.viewtype == "Edit") {
      this.reportid = this.pidval;
      this.get_report8(this.reportid);
      this.showsubmit = true;
    } else {
      $("input").attr('disabled', 'disabled');
      var currentUrl = document.URL.split('?');
      currentUrl = currentUrl[currentUrl.length - 1].split('=');
      this.reportid = this.pidval;
      console.log(this.reportid);
      this.get_report8(this.reportid);
      this.showsubmit = false;
    }


  }

  get_report8(patientid) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "111",
      "Practitioner_Id": patientid,
      "Treatment_Id": '',
      "status": '',
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "getprintsindividualdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(params)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });

    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == '1') {

        this.p1 = result.data.Table[0].LABELLABEL1
        this.p2 = result.data.Table[0].LABELLABEL2
        this.p3 = result.data.Table[0].LABELLABEL3
        this.p4 = result.data.Table[0].LABELLABEL4
        this.p5 = result.data.Table[0].LABELLABEL5
        this.p6 = result.data.Table[0].LABELLABEL6
        this.p7 = result.data.Table[0].LABELLABEL7
        this.p8 = result.data.Table[0].LABELLABEL8
        this.p9 = result.data.Table[0].LABELLABEL9
        this.p10 = result.data.Table[0].LABELLABEL10
        this.p11 = result.data.Table[0].LABELLABEL11
        this.p12 = result.data.Table[0].LABELLABEL12
        // this.table = result.data.Table;
        // this.chRef.detectChanges();
        // $('#dataTable_wrapper').show();
        // const table1: any = $('#dataTable');
        // this.dataTable = table1.DataTable();
      }
    }, err => {
      console.log(err)
    })
  }
  print() {

    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print2.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  submit() {

    if (this.p1 === undefined || this.p1 === null || this.p1 == "") {
      this.p1 = ""
    }
    if (this.p2 === undefined || this.p2 === null || this.p2 == "") {
      this.p2 = ""
    }
    if (this.p3 === undefined || this.p3 === null || this.p3 == "") {
      this.p3 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    if (this.p5 === undefined || this.p5 === null || this.p5 == "") {
      this.p5 = ""
    }
    if (this.p6 === undefined || this.p6 === null || this.p6 == "") {
      this.p6 = ""
    }
    if (this.p7 === undefined || this.p7 === null || this.p7 == "") {
      this.p7 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    if (this.p8 === undefined || this.p8 === null || this.p8 == "") {
      this.p8 = ""
    }
    if (this.p9 === undefined || this.p9 === null || this.p9 == "") {
      this.p9 = ""
    }
    if (this.p10 === undefined || this.p10 === null || this.p10 == "") {
      this.p10 = ""
    }
    if (this.p11 === undefined || this.p11 === null || this.p11 == "") {
      this.p11 = ""
    }
    if (this.p12 === undefined || this.p12 === null || this.p12 == "") {
      this.p12 = ""
    }


    this.lablenames = "1" + "," + "2" + "," + "3" + "," + "4" + "," + "6" + "," + "7" + "," + "5" + "," + "8" + "," + "9" + "," + "10" + "," + "11" + "," + "12"

    this.values = this.p1 + "," + this.p2 + "," + this.p3 + "," + this.p4 + "," + this.p7 + "," + this.p6 + "," + this.p5 + "," + this.p9 + "," + this.p8 + "," + this.p12 + "," + this.p11 + "," + this.p10

    console.log(this.lablenames);
    console.log(this.values);



    this.isPageloaderVisible = true;
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    // console.log(accessToken);


    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    // let params = {
    //   "Sno": "111",
    //   "Practitioner_Id": "102367836",
    //   "Treatment_Id": this.lablenames,
    //   "status": this.values,
    //   "Login_ID": "",
    //   "Trans_Date": "",
    //   "Operation": "InsertTempletetransactionData",
    //   "clinicid": "10250",
    //   "Branchid": "",
    //   "Last_Updated": ""
    // }


    let params = {
      "Sno": "111",
      "Practitioner_Id": this.reportid,
      "Treatment_Id": this.lablenames,
      "status": this.values,
      "Login_ID": "",
      "Trans_Date": this.tdatevalue,
      "Operation": "UpdatePrintdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }

    console.log(params)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);

      if (result.status_cd === "1") {
        this.isPageloaderVisible = false;
        alert("Updated Successfully");
        this.router.navigate(['/report8']);
        // this.router.navigate(['/CashReceipts']);

      } else {
        this.isPageloaderVisible = false;

      }
    },
      error => {
        this.isPageloaderVisible = false;

        console.log(error);

      }
    );


  }


}
