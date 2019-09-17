import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];
  dataTable: any;
  data: any = [];
  ToDate: any; FromDate: any; To_Date: any; From_Date: any;
  userid: string; Day_FromDate: string; Day_ToDate: string;
  revenue: any; appointmnets: any; avgrevenue: any; NewPateints: any; notarrivefull: any; cancelperfull: any;
  cancelper: any;
  cancel: any;
  notarriveper: any;
  notarrive: any;
  newpateintsper: any;
  newpatients: string;
  Year: any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {

    this.userid = window.localStorage.getItem("userId");
    this.bindCurrentDate();
    this.binddata();
  }
  binddata() {
    var accessToken = window.localStorage.Tokenval ;
    //this.commonService.tokenFun().subscribe(tokenResult => {
      //var accessToken = tokenResult.token_type + " " + tokenResult.access_token

      if (this.FromDate == "" || this.FromDate == null || this.FromDate == undefined) {
        this.From_Date = "";
      } else {
        this.From_Date = this.FromDate;
      }
      if (this.ToDate == "" || this.ToDate == null || this.ToDate == undefined) {
        this.To_Date = "";
      } else {
        this.To_Date = this.ToDate;
      }
      let serviceUrl = this.commonService.commonUrl + "Account/Reports_DoctorPerformance";
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Reports_DoctorPerformance";
      let params = {
        "text": "",
        "startdate": this.From_Date,
        "enddate": this.To_Date,
        "Clinicid": this.userid,
        "branchid": ""
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
          this.products = result.data.Table;
          this.revenue = result.data.Table1[0].revenue;
          this.appointmnets = result.data.Table1[0].appointmnets;
          this.avgrevenue = result.data.Table1[0].avgrevenue;
          this.NewPateints = result.data.Table1[0].NewPateints;
          this.newpateintsper = result.data.Table1[0].newpateintsper;
          this.notarrive = result.data.Table1[0].notarrive;
          this.notarriveper = result.data.Table1[0].notarriveper;
          this.cancel = result.data.Table1[0].cancel;
          this.cancelper = result.data.Table1[0].cancelper;
          this.newpatients = this.NewPateints + " {" + this.newpateintsper + " %}";
          this.notarrivefull = this.notarrive + " {" + this.notarriveper + " %}";
          this.cancelperfull = this.cancel + " {" + this.cancelper + " %}";
          // this.chRef.detectChanges();
          // const table: any = $('table');
          // this.dataTable = table.DataTable();
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
          // this.chRef.detectChanges();
          // const table: any = $('table');
          // this.dataTable = table.DataTable();
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
  btnSearch() {
    this.binddata();
  }
  MyFromDate() {
    var date = new Date(this.Day_FromDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    this.FromDate = day + '/' + mnth + '/' + this.Year;
  }
  MyToDate() {
    //this.ToDate = Sname;
    //this.ToDate = this.Day_ToDate;
    var date = new Date(this.Day_ToDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    this.ToDate = day + '/' + mnth + '/' + this.Year;
  }
  bindCurrentDate() {
    var d = new Date();
    let dd = ('0' + (d.getDate())).slice(-2);
    let mm = ('0' + (d.getMonth() + 1)).slice(-2);
    let yy = d.getFullYear();

    this.Day_FromDate = yy + '-' + mm + '-' + dd;
    this.Day_ToDate = yy + '-' + mm + '-' + dd;

    this.FromDate = dd + '/' + mm + '/' + yy;
    this.ToDate = dd + '/' + mm + '/' + yy;
  }

}
