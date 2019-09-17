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
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = []; Typedata: any; Details: any = []
  dataTable: any; data: any = []; ToDate: any; FromDate: any; To_Date: any;
  From_Date: any; Day_FromDate: any; Day_ToDate: any; Div_FromDate: any;
  Div_ToDate: any; Div_Month: any; Div_Year: any;
  mon: any; currentdt: any; yr: any; selday: any; selyear: any; public years = [];
  selectedmonth: any; selectedyear: any; monthname: any; dayname: any;
  selectedday: any; DivTax: any; selected = "all"; Yes: any; No: any;
  year: any; dates: any; months: any;
  userid: string;Year:any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    
    this.userid = window.localStorage.getItem("userId")
    this.Div_FromDate = true;
    this.Div_ToDate = true;
    this.Div_Month = false;
    this.Div_Year = false;
    this.currentdt = new Date();
    this.mon = this.currentdt.getMonth() + 1;
    if (this.mon < 10) {
      this.mon = "0" + this.mon;
    }
    this.Typedata = "Days";
    this.yr = this.currentdt.getFullYear();
    this.getDates();
    this.selday = this.mon;
    this.selyear = this.yr;
    this.bindCurrentDate();
    this.binddata();

  }
  binddata() {
    //this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
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
      let serviceUrl = this.commonService.commonUrl + "Account/Laboratory_Cashreceipts_Details";
      //let serviceUrl = "http://graylogic.net/OclinicoAPI/Api/Account/Laboratory_Cashreceipts_Details";
      let params = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branchid": "",
        "Loginid": "",
        "ReceiptID": "",
        "EmployeeID": "",
        "ReceiptNo": "",
        "Cash_type": this.Typedata,
        "Amount": "",
        "Notes": "",
        "Trans_Date": this.From_Date,
        "Status": this.To_Date,
        "Condition": "GetInvoiceBalance"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        // console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {

          this.products = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        error => {
          console.log(error);
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
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
    this.Day_ToDate = yy + '-' + mm + '-' + dd;

    this.FromDate = dd + '/' + mm + '/' + yy;
    this.ToDate = dd + '/' + mm + '/' + yy;
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
    var date = new Date(this.Day_ToDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    this.ToDate = day + '/' + mnth + '/' + this.Year;
  }
  getDates() {
    var date = new Date();
    var currentYear = new Date().getFullYear() - 1;

    var todayTime = new Date();
    this.dates = (todayTime.getDate());

    for (var i = 0; i <= 10; i++) {
      this.years.push(currentYear + i);
    }

    this.months = [{ "name": "January", "id": "01" },
    { "name": "February", "id": "02" },
    { "name": "March", "id": "03" },
    { "name": "April", "id": "04" },
    { "name": "May", "id": "05" },
    { "name": "June", "id": "06" },
    { "name": "July", "id": "07" },
    { "name": "August", "id": "08" },
    { "name": "September", "id": "09" },
    { "name": "October", "id": "10" },
    { "name": "November", "id": "11" },
    { "name": "December", "id": "12" }];

    this.selectedmonth = this.mon;
    this.selectedyear = this.yr;


    for (var i = 0; i < this.months.length; i++) {
      if (this.selectedmonth == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }


  mymonth(day) {
    this.selday = day;
    this.FromDate = day;
    for (var i = 0; i < this.months.length; i++) {
      if (this.selday == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }

  myyear(year) {
    this.selyear = year;
    this.ToDate = year;
  }
  MyType(Type) {
    this.Typedata = Type;
    if (this.Typedata == "Days") {
      this.Div_FromDate = true;
      this.Div_ToDate = true;
      this.Div_Month = false;
      this.Div_Year = false;
      var d = new Date();
      let dd = ('0' + (d.getDate())).slice(-2);
      let mm = ('0' + (d.getMonth() + 1)).slice(-2);
      let yy = d.getFullYear();
      this.FromDate = dd + '/' + mm + '/' + yy;
      this.ToDate = dd + '/' + mm + '/' + yy;
    } else {
      this.Div_FromDate = false;
      this.Div_ToDate = false;
      this.Div_Month = true;
      this.Div_Year = true;
      var d = new Date();
      let mm = ('0' + (d.getMonth() + 1)).slice(-2);
      this.FromDate = mm;
      this.ToDate = this.currentdt.getFullYear();
    }
  }
}
