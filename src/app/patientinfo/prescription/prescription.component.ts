
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  payment: any;
  pay: boolean;
  patient: any;
  userid: any = "";
  table = [];
  showdata: boolean = true;
  showLoader: boolean = true;
  nodata: boolean = false;
  dataTable: any;
  public showpagenation: boolean = false;
  patientname: any;
  patientId: string;
  Ap_id: string;
  patient_name: any;

  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    var getids = url1[1].split('=')[1]
    console.log(getids);
    this.patientId = getids.split(":")[0].split("&")[0]
    console.log(this.patientId);
    this.Ap_id = url1[1].split('=')[2]
    console.log(this.Ap_id);
    this.payment = localStorage.getItem('patientPaymentStatus')
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    this.patient = localStorage.getItem('patientId')
    this.patientname = localStorage.getItem('patient')
    document.title = "Prescription Details"
    this.userid = window.localStorage.getItem("userId")
    this.getdata()
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Prescription_Details"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": "",
      "PrescriptionID": "",
      "PatientID": this.patientId,
      "AppointmentID": "",
      "Medicine": "",
      "Dosage": "",
      "NoOfDays": "",
      "Refill": "",
      "Notes": "",
      "Status": "",
      "LoginID": this.userid,
      "mnotes": "",
      "Last_update": "",
      "Condition": "GetData",
      "par1": "",
      "refillproduct": ""

    }
    console.log(body)
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
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.table = result.data.Table;
        console.log(JSON.stringify(this.table));
        localStorage.setItem('prescriptionid', result.data.Table[0].PrescriptionID)
        localStorage.setItem('Sno', result.data.Table[0].sno)
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
}
