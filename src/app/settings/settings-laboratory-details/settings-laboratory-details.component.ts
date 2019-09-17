import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-laboratory-details',
  templateUrl: './settings-laboratory-details.component.html',
  styleUrls: ['./settings-laboratory-details.component.css']
})
export class SettingsLaboratoryDetailsComponent implements OnInit {

  LaboratoryData: any = [];
  myToastMsg: string;
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;

  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) {
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.GetLabData();
  }

  GetLabData() {
    console.log("GetLabdata");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
      var params = {
        "Sno": "",
        "Patient_Id": "",
        "Report_Id": "",
        "Attachment_url": "",
        "TransDate": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "branchid": "",
        "operation": "Getlabdetails"
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
          this.LaboratoryData = result.data.Table;
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
