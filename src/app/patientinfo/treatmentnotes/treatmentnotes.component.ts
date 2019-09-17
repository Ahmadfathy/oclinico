import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
@Component({
  selector: 'app-treatmentnotes',
  templateUrl: './treatmentnotes.component.html',
  styleUrls: ['./treatmentnotes.component.css']
})
export class TreatmentnotesComponent implements OnInit {
  patient: any;
  payment: any;
  pay: boolean
  table = []
  showdata: boolean = true;
  showLoader: boolean = false;
  patient_name: any;
  m: any;
  table2: any;
  table3: any;
  viewtable: any;
  noap: boolean = false;
  draft: boolean = false;
  nodata: boolean = false;
  dataTable: any;
  mainPatientId: any
  public showpagenation: boolean = false;
  userid: any = ""
  test: any;
  patientId: any;
  Ap_id: any;
  table1: any;
  presentcomplainet: any;


  constructor(private http: Http,
    private modalService: NgbModal,
    private cmn: UserinfoService,
    private router: Router) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var d = new Date();
    var d1 = d.getDate();
    var m = d.getMonth() + 1;
    var y = d.getFullYear();
    this.nodata = true
    var url = document.URL
    var url1 = url.split('?')
    var getids = url1[1].split('=')[1]
    console.log(getids);
    this.patientId = getids.split(":")[0]
    console.log(this.patientId);
    this.Ap_id = getids.split(":")[2]
    console.log(this.Ap_id);
    this.userid = window.localStorage.getItem("userId")
    window.sessionStorage.setItem("Clicked_Apid", this.Ap_id);
    localStorage.setItem('trpatientid', this.patientId);
    sessionStorage.setItem('patientId', this.patientId)
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }

    this.getPatientName()
    this.patient = sessionStorage.getItem('patient')
    document.title = "Treatment Note"
    this.showdata = true;
    this.nodata = false
    this.showpagenation = true;
    this.mainPatientId = localStorage.getItem('patientId')
    this.getdata();
  }

  getdata() {

    let d = new Date();
    let d1 = d.getDate();
    this.m = d.getMonth() + 1;
    let y = d.getFullYear();

    if (this.m.toString().length === 1) {
      this.m = '0' + this.m
    }
    let date = d1 + "/" + this.m + "/" + y;
    this.showLoader = true;
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    let url = this.cmn.commonUrl + 'Account/GetUser';
    let body = {
      "text": "Treat_notes",
      "id": this.patientId,
      "param1": this.userid,
      "param2": date
    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.showLoader = false;
      if (res.status_cd == "1") {
        this.showdata = true;
        this.table1 = res.data.Table;
        // this.table3 = res.data.Table3;
        // if (res.data.Table2.length == 0) {
        //   this.noap = true;
        // }
        // else {
        //   this.noap = false;
        //   this.table2 = res.data.Table2;
        // }
        this.nodata = false
      } else {
        this.nodata = true
        this.showdata = false;
      }

      let draft = res.data.Table[0].status
      if (draft == "Draft") {
        this.draft = true;
        $("#dra").css("background-color", "#fcf0c7");
      }
      else {
        this.draft = false;
        $("#dra").css("background-color", "#DEEEF3;");
      }
      if (draft == "Save") {
        this.draft = false;
        $("#dra").css("background-color", "#DEEEF3");
      }
      else {
        this.draft = true;
        $("#dra").css("background-color", "#fcf0c7");
      }
    },
      error => {
        alert("There is an error accured, Please try after some time.");
      })
  }

  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  getPatientName() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    let url = this.cmn.commonUrl + "Account/Patient_operations";
    let body = {
      "sno": this.patientId,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": this.patientId,
      "Title": "",
      "Ara_firstname": "",
      "Ara_Lastname": "",
      "Ara_fathername": "",
      "First_name": "",
      "Last_Name": "",
      "Middle_name": "",
      "DOB": "",
      "DOB_Arabic": "",
      "Gender": "",
      "Marital_status": "",
      "Identification_type": "",
      "Identification_no": "",
      "Identification_attachment": "",
      "Identification_Expiry": "",
      "Nationality": "",
      "Occupation": "",
      "Area": "",
      "Block": "",
      "Building": "",
      "Street": "",
      "Floor": "",
      "City": "",
      "Country": "",
      "Email": "",
      "Mobileno": "",
      "Home_phone": "",
      "Work_phoneno": "",
      "Emergency_contact": "",
      "Notes": "",
      "Reminder_type": "",
      "status": "",
      "Trans_date": "",
      "Last_update": "",
      "Condition": "GetDate",
      "Par1": "",
      "Par2": "",
      "Par3": ""
    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res);
      if (res.status_cd == "1") {
        console.log(res.data);
        var patientname = res.data.Table[0].Title + " " + res.data.Table[0].First_name + " " + res.data.Table[0].Middle_name + " " + res.data.Table[0].Last_Name;
        localStorage.setItem("patient", patientname)
        sessionStorage.setItem("patient", patientname)
        this.patient = patientname;
      }
      else {
        console.log("No data");
      }
    },
    );
    error => {
      console.log(error);
    }
  }

  open(content, val) {
    this.modalService.open(content, { size: 'lg' });
    var accessToken = window.localStorage.Tokenval;
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    let url = this.cmn.commonUrl + 'Account/GetUser';
    let body = {
      "text": "gettreatinvidual",
      "id": val,
      "param1": this.userid,
      "param2": ""
    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.nodata = true
        this.viewtable = res.data.Table;
      } else {
        this.nodata = false
      }
    })
  }
}