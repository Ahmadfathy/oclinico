
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-insucoverdetailssettings',
  templateUrl: './insucoverdetailssettings.component.html',
  styleUrls: ['./insucoverdetailssettings.component.css']
})
export class InsucoverdetailssettingsComponent implements OnInit {
  inscoverdetails = [];
  selected_qarr = [];
  inscoverdata: any[];
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(private http: HttpClient,
    public router: Router,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    public https: Http) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.getinsurancecoveragedetails();
  }

  getinsurancecoveragedetails() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_Coverage_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_Coverage_Details"
      let params = {
        "Sno": "",
        "Clinic_ID": this.userid,
        "Branch_ID": "",
        "Login_ID": "",
        "Insurance_Coverage_ID": "",
        "Insurance_CompanyID": "",
        "Service_Type": "",
        "Coverage_Per": "",
        "Status": "",
        "Trans_Date": "",
        "Last_UpdatedDate": "",
        "pagecount": "",
        "Condition": "GetData",
        "Type": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
       // console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.inscoverdetails = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        } else {
          this.isPageloaderVisible = false;
          // console.log(result.error_msg);
          // console.log(accessToken);
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        error => {
          this.isPageloaderVisible = false;
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
  }
}
