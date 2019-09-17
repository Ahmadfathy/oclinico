import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';

import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent implements OnInit {
  userid: any = "";
  table1 = [];
  ptable = []
  patientid: any = ""
  showdata: boolean = false;
  showLoader: boolean = true;
  nodata: boolean;
  dataTable: any;
  public showpagenation: boolean = false;
 public isPageloaderVisible = false;

  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    document.title = "Radiology";

    this.userid = window.localStorage.getItem("userId")
    this.patientid = localStorage.getItem('patientId')
    this.showdata = false;
    this.nodata = true
    this.showpagenation = true;
    this.getdata()
    this.chRef.detectChanges();
    $('#dataTable_wrapper').show();
    const table1: any = $('#dataTable');
    this.dataTable = table1.DataTable();
  }
  getdata() {

    //service call

    var accessToken = window.localStorage.Tokenval;

    // our service calling as usual
    let url =  this.cmn.commonUrl+'Account/Patient_operations';

    let body = {
      "sno": "",
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": "",
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
      "Condition": "patientdetailsearch",
      "Par1": "",
      "Par2": "",
      "Par3": ""

    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    // this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
    //   console.log(res)
    //   this.isPageloaderVisible = false;
    //   if (res.status_cd === "1") {
    //     this.ptable = res.data.Table;
    //     this.chRef.detectChanges();
    //     const table: any = $('table');
    //     this.dataTable = table.DataTable();
    //   } else {
    //     this.isPageloaderVisible = false;
    //     console.log(res.error_msg);
    //     console.log(accessToken);
    //     this.chRef.detectChanges();
    //     const table: any = $('table');
    //     this.dataTable = table.DataTable();
    //   }
    // })
    // err => {
    //   console.log("Token Error:" + err);
    // }
  }
}

