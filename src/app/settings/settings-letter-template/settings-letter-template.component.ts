import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Http, Headers, RequestOptions } from '@angular/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings-letter-template',
  templateUrl: './settings-letter-template.component.html',
  styleUrls: ['./settings-letter-template.component.css']
})
export class SettingsLetterTemplateComponent implements OnInit {

  dataTable: any = [];
  userid: any;
  LetterTempArray: any = [];
  nodata: boolean = true;
  psw: any = "";
  public isPageloaderVisible = true;

  constructor(private httpclient: HttpClient,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    console.log(this.psw)
    this.userid = window.localStorage.getItem("userId")
    this.GetTempData();
  }

  GetTempData() {
    console.log("GetTempData");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "/Account/CL_LetterTemplate_Details"
      var params = {
        "Sno": "",
        "ID": "",
        "Template_Name": "",
        "Description": "",
        "Status": "",
        "TransDate": "",
        "Clinicid": this.userid,
        "Branch_ID": "",
        "Loginid": "",
        "Condition": "GetData",
        "pagecount": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      console.log(serviceUrl);
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)

        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.LetterTempArray = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          this.nodata;
        } else {
          this.isPageloaderVisible = false;
          this.nodata = false;
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

  edit(type,sno){
    console.log("type" +type + "sno"+sno);
    window.sessionStorage.setItem("temptype" ,type);
    window.sessionStorage.setItem("tempsno" ,sno);
    this.router.navigate(['/EditTemplate']);
  }
}
