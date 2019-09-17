import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-insurancecatsettingsbind',
  templateUrl: './insurancecatsettingsbind.component.html',
  styleUrls: ['./insurancecatsettingsbind.component.css']
})
export class InsurancecatsettingsbindComponent implements OnInit {
  inscatedetails = [];
  selected_qarr = [];
  inscate: any[];
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(private http: HttpClient,
    public router: Router,
    public commonService: UserinfoService,
    public https: Http,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.getinsurancecat();
  }

  getinsurancecat() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
      let params = {
        "Sno": "",
        "Insurance_Category": "",
        "Insurance_CompanyID": "",
        "Insurance_CompanyName": "",
        "Insurance_PhoneNo": "",
        "Insurance_EmailID": "",
        "Insurance_Type": "",
        "Trans_date": "",
        "LoginId": this.userid,
        "ClinicId": this.userid,
        "BranchId": "",
        "status": "",
        "Condition": "GetInsuranceCategory",
        "pagecount": ""
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
          this.inscatedetails = result.data.Table;
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
         // console.log(error);
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //    // console.log("Token Error:" + err);
    //   }
    // );
  }
}
