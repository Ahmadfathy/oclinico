import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
//import { ADDRCONFIG } from 'dns';

@Component({
  selector: 'app-dailypayments',
  templateUrl: './dailypayments.component.html',
  styleUrls: ['./dailypayments.component.css']
})
export class DailypaymentsComponent implements OnInit {
  public isPageloaderVisible = true;
  summary: any = []; Typedata: any; Details: any = []; payments: any[];
  From_Date: any; Day_FromDate: any; dataTable: any; data: any = [];
  mon: any; currentdt: any; yr: any; selday: any; selyear: any; public years = [];
  selectedmonth: any; selectedyear: any; monthname: any; dayname: any;
  selectedday: any; months: any; FromDate: any;
  userid: string; Year: any;
  nodata: boolean;
  nodata1: boolean;
  
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }


  ngOnInit() {
    this.currentdt = new Date();
    this.mon = this.currentdt.getMonth() + 1;
    if (this.mon < 10) {
      this.mon = "0" + this.mon;
    }
    this.yr = this.currentdt.getFullYear();
    this.userid = window.localStorage.getItem("userId")
    this.selday = this.mon;
    this.selyear = this.yr;
    this.bindCurrentDate();
    this.binddata();
  }
  binddata() {
   // this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
     var accessToken = window.localStorage.Tokenval ;
     if (this.FromDate == "" || this.FromDate == null || this.FromDate == undefined) {
        this.From_Date = "";
      } else {
        this.From_Date = this.FromDate;
      }
     // alert(this.From_Date)
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl + "Account/GetUser";
      let params = {
        "text": "GetDailyPayments",
        "id": this.userid,
        "param1": "",
        "param2": this.From_Date
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        //console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.summary = result.data.Table;
          this.payments = result.data.Table1;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          this.nodata = true;
          this.nodata1 = true;
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
          this.chRef.detectChanges();
          this.nodata = false;
          this.nodata1 = false;
         // const table: any = $('table');
          //this.dataTable = table.DataTable();
        }
      },
        error => {
          console.log(error);
        }
      );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
  }
  bindCurrentDate() {
    var d = new Date();
    let dd = ('0' + (d.getDate())).slice(-2);
    let mm = ('0' + (d.getMonth() + 1)).slice(-2);
    let yy = d.getFullYear();
    this.Day_FromDate = yy + '-' + mm + '-' + dd;
    // this.FromDate = dd + '/' + mm + '/' + yy;
    this.FromDate = mm + '/' + dd + '/' + yy;
  }
  btnSearch() {
    this.binddata();
  }
  MyFromDate() {
    var date = new Date(this.Day_FromDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.Year = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    // this.FromDate = day + '/' + mnth + '/' + this.Year;
    this.FromDate = mnth + '/' + day + '/' + this.Year;
  }

}
