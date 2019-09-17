import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoinmentsgrid',
  templateUrl: './appoinmentsgrid.component.html',
  styleUrls: ['./appoinmentsgrid.component.css']
})
export class AppoinmentsgridComponent implements OnInit {
  patient: any;
  status: boolean;
  Aponmentstaus = [];
  userid: any = "";
  payment: any;
  pay: boolean;
  table = [];
  showdata: boolean = true;
  showLoader: boolean = true;
  isPageloaderVisible: boolean;
  nodata: boolean = false;
  dataTable: any;
  Viewlog: any;
  patientId: string;
  patient_name: any;

  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1];
    this.payment = localStorage.getItem('patientPaymentStatus')
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    this.patient = localStorage.getItem('patient')
    document.title = "Appointment Details"
    this.userid = window.localStorage.getItem("userId")
    this.getdata()
    this.showdata = true;
    this.nodata = false;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/GetUser";
    let body = {
      "text": "Appointmentsearch",
      "id": this.patientId,
      "param1": "",
      "param2": this.userid
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
       console.log(result)
      if (result.status_cd == "0") {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = true;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        result.data.Table.forEach((elem) => {
          elem['showAppointmentData'] = 'false'
        })
        this.table = result.data.Table;
        this.showdata = true;
        this.nodata = false;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    })
    err => {
    }
  }

  viewpatient() {
    var Refrral = this.patientId
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = this.patientId
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  getapoinments(val, ind) {
    console.log(ind)

    if (this.table[ind].showAppointmentData === 'true') {
      this.table[ind].showAppointmentData = 'false'
      return;
    }
    let staus = val;
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/CL_GetAppointments";
    let body = {
      "text": "getstartdate",
      "start": "",
      "end": "",
      "id": staus,
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd === "0") {
        this.status = true;
        this.table[ind].showAppointmentData = 'true'
        this.Viewlog = result.data.Table[0].Viewlog
        console.log(this.Viewlog)
      }
      else {
        this.status = false
      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }
}
