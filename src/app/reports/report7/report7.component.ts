import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report7',
  templateUrl: './report7.component.html',
  styleUrls: ['./report7.component.css']
})
export class Report7Component implements OnInit {
  insertbutton: boolean;
  patient: boolean = true


  updatebutton: boolean;
  field1: any;
  field2: any;
  field3: any;
  field4: any;
  field5: any;
  field6: any;
  field7: any;
  field8: any;
  field9: any;
  fieldnames: any = [];
  paramtext: any;
  paramid: any;
  paramdate: any;
  inpatientpage: boolean;
  inreportspage: boolean;
  userid: any;

  constructor(
    public http: Http,
    public cmn: UserinfoService,
    public route: ActivatedRoute,
    public router: Router) { 
      this.userid = window.localStorage.getItem("userId");
    }

  ngOnInit() {
    this.patient = true
    this.route.paramMap.subscribe(params => {
      console.log(params)
      console.log(params.get('id'))
      console.log(params.get('text'))
      this.paramid = params.get('id');
      this.paramdate = params.get('id');
      this.paramtext = params.get('text');
      if (this.paramtext == 'View') {
        $("input").attr('disabled', 'disabled');
        this.view();
        this.inpatientpage = false;
        this.inreportspage = true;
        this.insertbutton = false;
        this.updatebutton = false;
        this.patient = false;
      }
      else if (this.paramtext == 'Edit') {
        this.inpatientpage = false;
        this.inreportspage = true;
        this.updatebutton = true;
        this.insertbutton = false;
        this.patient = false;
        this.view();
      } else {
        this.inpatientpage = true;
        this.inreportspage = false;
        this.insertbutton = true;
        this.patient = true
      }
    })
  }

  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  insert() {
    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.field1 + ',' + this.field2 + ',' + this.field3 + ',' + this.field4
      + ',' + this.field5 + ',' + this.field6 + ',' + this.field7 + ',' + this.field8 + ',' + this.field9;
    let body =
    {
      "Sno": "110",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(body)

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    let url = this.cmn.commonUrl + 'Account/DocTreatment_Transactions'
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == 1) {
        alert('Successfully Inserted')
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      }
      else {
        console.log('error')
      }
    })
  }

  update() {
    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.field1 + ',' + this.field2 + ',' + this.field3 + ',' + this.field4
      + ',' + this.field5 + ',' + this.field6 + ',' + this.field7 + ',' + this.field8 + ',' + this.field9;
    let body =
    {
      "Sno": "110",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    let url = this.cmn.commonUrl + 'Account/DocTreatment_Transactions'
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == 1) {
        alert('Updated Successfully')
        this.router.navigate(['/report7grid']);
      }
      else {
        console.log('error')
      }
    })
  }

  view() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "110",
      "Practitioner_Id": this.paramid,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "getprintsindividualdata",
      "clinicid":this.userid,
      "Branchid": "", "Last_Updated": ""
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
        console.log("print.. ")
        this.field1 = result.data.Table[0].LABELLABEL1;
        this.field2 = result.data.Table[0].LABELLABEL2;
        this.field3 = result.data.Table[0].LABELLABEL3;
        this.field4 = result.data.Table[0].LABELLABEL4;
        this.field5 = result.data.Table[0].LABELLABEL5;
        this.field6 = result.data.Table[0].LABELLABEL6;
        this.field7 = result.data.Table[0].LABELLABEL7;
        this.field8 = result.data.Table[0].LABELLABEL8;
        this.field9 = result.data.Table[0].LABELLABEL9;
      } else {
      }
    }, err => {
      console.log(err)
    })
  }
}
