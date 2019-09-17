import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {
  payment: any;
  pay: boolean;
  patient: any;
  userid: any = "";
  patientid: any = ""
  table = [];
  showdata: boolean = true;
  showLoader: boolean = true;
  nodata: boolean = false;
  dataTable: any;
  mainPatientId: any
  public showpagenation: boolean = false;
  patientId: string;
  patient_name: any;
  constructor(private http: Http, 
    private cmn: UserinfoService, 
    public router: Router,
    private route: ActivatedRoute, 
    private chRef: ChangeDetectorRef) { }

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
    document.title = "Letters"
    this.userid = window.localStorage.getItem("userId")
    this.mainPatientId = sessionStorage.getItem('patientIdNew')
    this.getdata()
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Patient_Letters"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Loginid": this.userid,
      "LetterID": "",
      "Patientid": this.patientId,
      "Description": "",
      "Trans_date": "",
      "condition": "GetPtientLetters",
      "doctorid": ""
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
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.table = result.data.Table;
        console.log(JSON.stringify(this.table));
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
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  lab() {
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }
}
