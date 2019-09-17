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
  selector: 'app-paymentsummary',
  templateUrl: './paymentsummary.component.html',
  styleUrls: ['./paymentsummary.component.css']
})
export class PaymentsummaryComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];  dataTable: any;  data: any = [];  ToDate: any;
  FromDate: any;  To_Date: any;  From_Date: any;  Day_FromDate: any;
  Day_ToDate: any;  PaymentListing: any;  userid: string;
  nodata: boolean;  nodata1: boolean;Year: any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.bindCurrentDate();
    this.binddata();
  }
  binddata() {
    //this.commonService.tokenFun().subscribe(tokenResult => {
      //var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      var accessToken = window.localStorage.Tokenval ;
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


      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/messagestopost";
      let serviceUrl = this.commonService.commonUrl + "Account/messagestopost";
      let params = {
        "msg_subject": "",
        "Message": "",
        "Expiry_Date": this.To_Date,
        "Trans_Date": this.From_Date,
        "LoginId": "",
        "Clinicid": this.userid,
        "condition": "PaymentSummary",
        "Branch": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.products = result.data.Table2;
          this.PaymentListing = result.data.Table;
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
          //  const table: any = $('table');
          //  this.dataTable = table.DataTable();
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
    // let dd=d.getDate();
    // let mm=d.getMonth()+1;
    let yy = d.getFullYear();

    this.Day_FromDate = yy + '-' + mm + '-' + dd;
    this.Day_ToDate = yy + '-' + mm + '-' + dd;

    // this.FromDate=dd+'/'+mm+'/'+yy;
    // this.ToDate=dd+'/'+mm+'/'+yy;
    this.FromDate = mm + '/' + dd + '/' + yy;
    this.ToDate = mm + '/' + dd + '/' + yy;
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
   // this.FromDate = day + '/' + mnth + '/' + this.Year;
   this.FromDate = mnth + '/' + day + '/' + this.Year;
  }
  MyToDate() {
    var date = new Date(this.Day_ToDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.ToDate = this.Day_ToDate;
    //this.ToDate = day + '/' + mnth + '/' + this.Year;
    this.ToDate = mnth + '/' + day + '/' + this.Year;
  }
}

