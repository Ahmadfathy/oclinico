import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-m-departmemtdetailssettings',
  templateUrl: './m-departmemtdetailssettings.component.html',
  styleUrls: ['./m-departmemtdetailssettings.component.css']
})
export class MDepartmemtdetailssettingsComponent implements OnInit {
  deptdetails = [];
  selected_qarr = [];
  clients: any[];
  refcheckedval: any;
  message: string;
  dataTable: any = [];
  userid: any = "";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient, public router: Router, public commonService: UserinfoService, public https: Http,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    document.title = "Department Details"
    this.userid = window.localStorage.getItem("userId")
    this.getdepartmentdetails();
  }

  getdepartmentdetails() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Departments_Details"
    let params = {
      "Sno": "",
      "clinicid": this.userid,
      "BranchID": "",
      "DeptID": "",
      "DeptName": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_update": "",
      "Condition": "GetData"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      this.isPageloaderVisible = false;
      if (result.status_cd === "1") {
        console.log(result)
        this.deptdetails = result.data.Table;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({});
      } else {
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
      }
    },
      error => {
        this.isPageloaderVisible = false;
      }
    );
  }
}
