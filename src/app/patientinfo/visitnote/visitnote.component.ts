import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitnote',
  templateUrl: './visitnote.component.html',
  styleUrls: ['./visitnote.component.css']
})
export class VisitnoteComponent implements OnInit {
  payment: any;
  userid: any = "";
  table = [];
  showdata: boolean = true;
  showLoader: boolean = true;
  nodata: boolean = false;
  dataTable: any;
  patient: any
  pay: boolean
  public showpagenation: boolean = false;
  patientId: string;
  patient_name: any;

  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    this.payment = localStorage.getItem('patientPaymentStatus')
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    this.patient = localStorage.getItem('patient')
    document.title = "Visit Note"
    this.userid = window.localStorage.getItem("userId")
    this.getdata()
    this.showdata = false;
    this.nodata = true
    this.showpagenation = true;
    let patient = localStorage.getItem('patient');
    console.log(patient);

  }
  getdata() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    var url = this.cmn.commonUrl + "Account/VisitNote_Details"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": "",
      "VistID": "",
      "PatientID": this.patientId,
      "DoctorID": "",
      "Notes": "",
      "Status": "",
      "LoginID": this.userid,
      "Trans_Date": "",
      "Last_update": "",
      "Arrival_Datetime": "",
      "Condition": "GetData"

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
      if (res.data.Table[0].Result == "False") {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = true;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.table = res.data.Table;
        this.showdata = true;
        this.nodata = false;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    })
  }

  viewpatient() {
    var Refrral = this.patientId
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = this.patientId
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

}
