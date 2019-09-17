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
  selector: 'app-erpatientinfo',
  templateUrl: './erpatientinfo.component.html',
  styleUrls: ['./erpatientinfo.component.css']
})
export class ErpatientinfoComponent implements OnInit {
  collection = [];
  patient: any
  userid: any = "";
  table1 = [];
  table = []
  patientid: any = ""
  showdata: boolean = false;
  showLoader: boolean = true;
  isPageloaderVisible: boolean = false;
  nodata: boolean = true;
  dataTable: any;
  public showpagenation: boolean = false;
  showPage: any;

  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    for (let i = 1; i <= 100; i++) {
      this.collection.push('item ${i}');
    }
  }
  ngOnInit() {

    document.title = "Patient Details"
    this.userid = window.localStorage.getItem("userId")
    this.patientid = localStorage.getItem('patientId')
    this.showdata = false;
    this.showpagenation = true;
    this.getdata()
    this.chRef.detectChanges();
    // $('#dataTable_wrapper').show();
    // const table1: any = $('#dataTable');
    // this.dataTable = table1.DataTable();
    // let page = $('.page-link').val();
  }

  getdata() {
  //  this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    let url = this.cmn.commonUrl + 'Account/Patient_operations';

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
    // let options = new RequestOptions({ headers: headers });
    // this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
    //   console.log(res)
    //   this.isPageloaderVisible = false;
    //   this.patient = res.data.Table[0].patient_id;
    //   if (res.status_cd == "0") {
    //     this.showLoader = false;
    //     this.showdata = false;
    //     this.nodata = true;
    //     this.showpagenation = false;
    //     $('#dataTable_wrapper').hide();
    //   } else {
    //     this.showLoader = false;
    //     this.table = res.data.Table;
    //     this.table1 = res.data.Table1
    //     this.showdata = true;
    //     this.nodata = false;
    //     this.showpagenation = true;
    //     this.chRef.detectChanges();
    //     $('#dataTable_wrapper').show();
    //     const table1: any = $('#dataTable');
    //     this.dataTable = table1.DataTable();
    //   }
    // })
    // error => {
    //   this.isPageloaderVisible = false;
    //   console.log(error);
    // }
    // err => {
    //   this.isPageloaderVisible = false;
    //   console.log("Token Error:" + err);
    // }
  }

  goToViewPatient(val) {
    let referal = val
    this.router.navigate(['viewpatient'], { queryParams: { referal } });
  }
}















