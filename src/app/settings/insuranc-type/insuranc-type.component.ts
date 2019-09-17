import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'

@Component({
  selector: 'app-insuranc-type',
  templateUrl: './insuranc-type.component.html',
  styleUrls: ['./insuranc-type.component.css']
})
export class InsurancTypeComponent implements OnInit {

  InsuranceData: any = [];
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;
  constructor(public http: HttpClient, 
    private chRef: ChangeDetectorRef, 
    public commonService: UserinfoService, 
    public https: Http) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.getinsurancetypedetails();
  }

  getinsurancetypedetails() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);
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
        "Condition": "GetInsurancetype",
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
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.InsuranceData = result.data.Table;
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
