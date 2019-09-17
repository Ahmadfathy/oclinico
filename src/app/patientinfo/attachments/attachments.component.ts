import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  userid: any = "";
  isPageloaderVisible: boolean;
  table = [];
  showdata: boolean = true;
  showLoader: boolean = true;
  nodata: boolean = false;
  dataTable: any;
  patient: any
  payment: any;
  pay: boolean;
  mainpatientid: string;
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
    this.patientId = url1[1].split('=')[1]
    this.payment = localStorage.getItem('patientPaymentStatus')
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    this.patient = localStorage.getItem('patient')
    document.title = "Attachments"
    this.userid = window.localStorage.getItem("userId");
    this.mainpatientid = localStorage.getItem('patientId');
    this.getdata()
    this.showdata = false;
    this.nodata = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    var url = this.cmn.commonUrl + "Account/Fileattch_Transactions";
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Patientid": this.patientId,
      "Attachment": "",
      "Description": "",
      "Trans_date": "",
      "Last_Updated": "",
      "condition": "Getattachments"
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
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.table = result.data.Table;
        console.log(this.table)
        this.showdata = true;
        this.nodata = false;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    })
    err => {
      console.log("Token Error:" + err);
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
}
