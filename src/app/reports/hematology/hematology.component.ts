import { Component, OnInit } from '@angular/core';
import main from '@fullcalendar/core/reducers/main';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hematology',
  templateUrl: './hematology.component.html',
  styleUrls: ['./hematology.component.css']
})
export class HematologyComponent implements OnInit {
  patient: boolean = true
  fieldnames: any = [];
  insertbutton: boolean = true;
  editfields: any = [];
  gender: any = ""
  name: any;
  filenumber: any;
  date: any;
  nationality: any
  age: any;
  CBC: any = ""
  Routine: any;
  Urgent: any;
  Preoperative: any;
  clinicalcoment: any;
  requestedby: any;
  stamp: any;
  ESR: any;
  HbA1c: any;
  PT: any;
  BIGrop: any;
  Malaria: any;
  PTT: any;
  BItime: any;
  CItime: any;
  Others: any;
  remarks: any;
  checkedby: any;
  stampsinature: any;
  paramid: any;
  paramtext: any;
  updatebutton: boolean;
  inreportspage: boolean;
  inpatientpage: boolean;
  paramdate: any;
  userid: any;

  constructor(public http: Http, 
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
      this.paramdate = params.get('date');
      this.paramid = params.get('id');
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

  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------



  genderchange(event) {
    (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');
    if (event.target.value == "Female") {
      this.gender = 'Female';
      (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
    } else {
      this.gender = 'Male';
      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
    }
  }


  checkboxchange() {
    (<HTMLInputElement>document.getElementById('CBC1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('ESR1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('HbA1c1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('PT1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BIGrop1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Malaria1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('PTT1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BItime1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('CItime1')).removeAttribute('checked');
    //(<HTMLInputElement>document.getElementById('Others1')).removeAttribute('checked');
    if (this.CBC == true) {
      (<HTMLInputElement>document.getElementById('CBC1')).setAttribute('checked', 'true');
    }
    if (this.Routine == true) {
      (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked', 'true');
    }
    if (this.Urgent == true) {
      (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked', 'true')
    }
    if (this.Preoperative == true) {
      (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked', 'true')
    }
    if (this.ESR == true) {
      (<HTMLInputElement>document.getElementById('ESR1')).setAttribute('checked', 'true')
    }
    if (this.HbA1c == true) {
      (<HTMLInputElement>document.getElementById('HbA1c1')).setAttribute('checked', 'true')
    }
    if (this.PT == true) {
      (<HTMLInputElement>document.getElementById('PT1')).setAttribute('checked', 'true')
    }
    if (this.BIGrop == true) {
      (<HTMLInputElement>document.getElementById('BIGrop1')).setAttribute('checked', 'teue')
    }
    if (this.Malaria == true) {
      (<HTMLInputElement>document.getElementById('Malaria1')).setAttribute('checked', 'true')
    }
    if (this.PTT == true) {
      (<HTMLInputElement>document.getElementById('PTT1')).setAttribute('checked', 'true')
    }
    if (this.BItime == true) {
      (<HTMLInputElement>document.getElementById('BItime1')).setAttribute('checked', 'true')
    }
    if (this.CItime == true) {
      (<HTMLInputElement>document.getElementById('CItime1')).setAttribute('checked', 'true')
    }

  }

  insert() {

    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality
      + ',' + this.gender + ',' + this.Routine + ',' + this.Urgent + ',' + this.Preoperative + ',' + this.clinicalcoment + ',' + this.requestedby
      + ',' + this.stamp + ',' + this.CBC + ',' + this.HbA1c + ',' + this.BIGrop + ',' + this.Malaria + ',' + this.BItime + ',' + this.ESR + ',' + this.PT
      + ',' + this.PTT + ',' + this.CItime + ',' + this.Others + ',' + this.remarks + ',' + this.checkedby + ',' + this.stampsinature;
    let body =
    {
      "Sno": "103",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
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
    // var transdate = sessionStorage.getItem('transdate')
    this.editfields = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality
      + ',' + this.gender + ',' + this.Routine + ',' + this.Urgent + ',' + this.Preoperative + ',' + this.clinicalcoment + ',' + this.requestedby
      + ',' + this.stamp + ',' + this.CBC + ',' + this.HbA1c + ',' + this.BIGrop + ',' + this.Malaria + ',' + this.BItime + ',' + this.ESR + ',' + this.PT
      + ',' + this.PTT + ',' + this.CItime + ',' + this.Others + ',' + this.remarks + ',' + this.checkedby + ',' + this.stampsinature;

    let body =
    {
      "Sno": "103",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
      "status": this.editfields,
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "UpdatePrintdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
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
        this.router.navigate(['/hematologygrid']);
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
      "Sno": "103",
      "Practitioner_Id": this.paramid,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.paramdate,
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
        console.log("print.. ")
        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.age = result.data.Table[0].LABELLABEL4;
        this.nationality = result.data.Table[0].LABELLABEL5;
        this.gender = result.data.Table[0].LABELLABEL6;
        let Routine = result.data.Table[0].LABELLABEL7;
        let Urgent = result.data.Table[0].LABELLABEL8;
        let Preoperative = result.data.Table[0].LABELLABEL9;
        this.clinicalcoment = result.data.Table[0].LABELLABEL10;
        this.requestedby = result.data.Table[0].LABELLABEL11;
        this.stamp = result.data.Table[0].LABELLABEL12;
        let CBC = result.data.Table[0].LABELLABEL13;
        let HbA1c = result.data.Table[0].LABELLABEL14;
        let BIGrop = result.data.Table[0].LABELLABEL15;
        let Malaria = result.data.Table[0].LABELLABEL16;
        let BItime = result.data.Table[0].LABELLABEL17;
        let ESR = result.data.Table[0].LABELLABEL18;
        let PT = result.data.Table[0].LABELLABEL19;
        let PTT = result.data.Table[0].LABELLABEL20;
        let CItime = result.data.Table[0].LABELLABEL21;
        this.Others = result.data.Table[0].LABELLABEL22;
        this.remarks = result.data.Table[0].LABELLABEL23;
        this.checkedby = result.data.Table[0].LABELLABEL24;
        this.stampsinature = result.data.Table[0].LABELLABEL25;

        if (this.gender == "Male") {
          $("#male").prop("checked", true);
          this.gender = 'Male';
          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');

        }
        if (this.gender == "Female") {
          this.gender = 'Female'
          $("#female").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
        }

        if (CBC == "true") {
          this.CBC = CBC
          $("#CBC").prop("checked", true);
          (<HTMLInputElement>document.getElementById('CBC1')).setAttribute('checked', 'true');
        } else {

          (<HTMLInputElement>document.getElementById('CBC1')).removeAttribute('checked');
        }

        if (Routine == 'true') {
          this.Routine = Routine
          $("#Routine").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked', 'true');
        }
        else {
            (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
        }

        if (Urgent == 'true') {
          this.Urgent = Urgent;
          $("#Urgent").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked', 'true');

        }
        else {

          (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked')
        }
        if (Preoperative == 'true') {

          this.Preoperative = Preoperative;
          $("#Preoperative").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked')
        }
        if (ESR == 'true') {
          this.ESR = ESR;
          $("#ESR").prop("checked", true);
          (<HTMLInputElement>document.getElementById('ESR1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('ESR1')).removeAttribute('checked')

        }
        if (HbA1c == 'true') {
          this.HbA1c = HbA1c;
          $("#HbA1c").prop("checked", true);
          (<HTMLInputElement>document.getElementById('HbA1c1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('HbA1c1')).removeAttribute('checked')
        }

        if (PT == 'true') {
          this.PT = PT;
          $("#PT").prop("checked", true);
          (<HTMLInputElement>document.getElementById('PT1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('PT1')).removeAttribute('checked')
        }

        if (BIGrop == 'true') {
          this.BIGrop = BIGrop;
          $("#BIGrop").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BIGrop1')).setAttribute('checked', 'teue')
        }
        else {
          (<HTMLInputElement>document.getElementById('BIGrop1')).removeAttribute('checked')
        }
        if (Malaria == 'true') {
          this.Malaria = Malaria;
          $("#Malaria1").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Malaria1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('Malaria1')).removeAttribute('checked')
        }
        if (PTT == 'true') {
          this.PTT = PTT;
          $("#PTT1").prop("checked", true);
          (<HTMLInputElement>document.getElementById('PTT1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('PTT1')).removeAttribute('checked')
        }

        if (BItime == 'true') {
          this.BItime = BItime;
          $("#BItime").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BItime1')).setAttribute('checked', 'true')
        }
        else {
          (<HTMLInputElement>document.getElementById('BItime1')).removeAttribute('checked')
        }
        if (CItime == 'true') {
          this.CItime = CItime;
          $("#CItime").prop("checked", true);
          (<HTMLInputElement>document.getElementById('CItime1')).setAttribute('checked', 'true')
        } else {
          (<HTMLInputElement>document.getElementById('CItime1')).removeAttribute('checked')
        }
      } else {
      }
    }, err => {
      console.log(err)
    })
  }
}



