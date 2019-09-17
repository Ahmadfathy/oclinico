import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'


@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {
  dataTable: any = [];
  TaxData: any = [];
  // showdata: boolean = false;
  public showpagenation: boolean = false;
  // nodata: boolean = false;
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    // this.showdata = false;
    this.GetTempData();
  }

  GetTempData() {
    console.log("GetTempData");
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/Taxes_Details"
      var params = {
        "Sno": "",
        "ClinicID": this.userid,
        "Branchid": "",
        "TaxID": "",
        "TaxName": "",
        "TaxPer": "",
        "Status": "",
        "LoginID": "",
        "Trans_date": "",
        "Last_update": "",
        "Condition": "GetData"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      console.log(params);
      console.log(serviceUrl);
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.TaxData = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          // this.nodata;
        } else {
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
      );
      error => {
        this.isPageloaderVisible = false;
        console.log(error);
      }
  }
}
