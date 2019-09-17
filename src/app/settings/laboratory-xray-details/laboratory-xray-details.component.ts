import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-laboratory-xray-details',
  templateUrl: './laboratory-xray-details.component.html',
  styleUrls: ['./laboratory-xray-details.component.css']
})
export class LaboratoryXrayDetailsComponent implements OnInit {
  dataTable: any = [];
  LaboratoryXrayData: any = [];
  myToastMsg: string;
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.GetLabxrayData();
  }

  GetLabxrayData() {
    console.log("GetLabdata");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/Laboratory_Xray_transactions"
      var params = {
        "Sno": "",
        "Patient_Id": "",
        "Report_Id": "",
        "Attachment_url": "",
        "Trans_Date": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "param1": "",
        "param2": "",
        "condition": "Getxrayinfo"
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
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.LaboratoryXrayData = result.data.Table;
          console.log(this.LaboratoryXrayData);
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
      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      }
    
  }
}
