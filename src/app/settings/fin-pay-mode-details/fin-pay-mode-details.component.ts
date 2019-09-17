import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'app-fin-pay-mode-details',
  templateUrl: './fin-pay-mode-details.component.html',
  styleUrls: ['./fin-pay-mode-details.component.css']
})
export class FinPayModeDetailsComponent implements OnInit {
  FinanceDetailsData: any = [];
  userid: string = "";
  myToastMsg: string;
  dataTable: any = [];
  public isPageloaderVisible = true;
  
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.GetData();
  }

  GetData() {
    console.log("GetLabdata");
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/Paymode_Master_details"
      var params = {
        "Sno": "",
        "Paymodetype_ID": "",
        "Paymodetype_Name": "",
        "Status": "",
        "Trans_date": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "Condition": "GetData"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.FinanceDetailsData = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        } else {
          this.isPageloaderVisible = false;
        }
      },
      );
      error => {
        this.isPageloaderVisible = false;
        console.log(error);
      }
  }
}
