import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { UserinfoService } from '../userinfo.service'
@Component({
  selector: 'app-laboratary',
  templateUrl: './laboratary.component.html',
  styleUrls: ['./laboratary.component.css']
})
export class LaborataryComponent implements OnInit {

  referaldetails = [];
  selected_qarr = [];
  clients: any[];
  refcheckedval: any;
  message: string;
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(private http: HttpClient, public router: Router, public commonService: UserinfoService, public https: Http,
    private chRef: ChangeDetectorRef)
  // private dataserv: EvntserviceService
  { }

  ngOnInit() {

    this.userid = window.localStorage.getItem("userId");
    this.getreferaldata();
  }
  getreferaldata() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    let serviceUrl = this.commonService.commonUrl + "Account/CL_Referral_Master_Details"
    let params = {
      "Sno": "",
      "Referral_ID": "",
      "Company_Name": "",
      "Address": "",
      "City": "",
      "PhoneNo": "",
      "EmailID": "",
      "TransDate": "",
      "Loginid": "",
      "Clinicid": this.userid,
      "Condition": "GetData",
      "Contact_person": "",
      "Status": "",
      "Branch_ID": "",
      "pagecount": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      this.isPageloaderVisible = false;
      // if (result.status_cd === "1") {
      //   this.showLoader = false;
      //   this.referaldetails = result.data.Table;
      //   this.chRef.detectChanges();
      //   const table: any = $('table');
      //   this.dataTable = table.DataTable();

      // } else {
      //   this.showLoader = false;
      //   console.log(result.error_msg);
      //   console.log(accessToken);
      //   this.chRef.detectChanges();
      //   const table: any = $('table');
      //   this.dataTable = table.DataTable();
      // }
      if (result.status_cd === "1") {
        this.referaldetails = result.data.Table;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
      } else {
        this.isPageloaderVisible = false;
        console.log(result.error_msg);
        console.log(accessToken);
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
      }
    },
      error => {
        this.isPageloaderVisible = false;
          console.log(error);
      }
    );


  }
}
