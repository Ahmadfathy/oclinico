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
  selector: 'app-upcomingbirthdays',
  templateUrl: './upcomingbirthdays.component.html',
  styleUrls: ['./upcomingbirthdays.component.css']
})
export class UpcomingbirthdaysComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = []; dataTable: any; data: any = [];
  mon: any; currentdt: any; yr: any; selday: any; selyear: any; public years = [];
  selectedmonth: any; selectedyear: any; monthname: any; dayname: any;
  selectedday: any; selected = "all"; Yes: any; No: any;
  year: any; dates: any; months: any; UserType: any;
  userid: string; Year: any;
  User_Type: any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.User_Type = "Patient";
    this.currentdt = new Date();
    this.mon = this.currentdt.getMonth() + 1;
    if (this.mon < 10) {
      this.mon = "0" + this.mon;
    }
    this.yr = this.currentdt.getFullYear();
    this.getDates();
    this.selday = this.mon;
    this.binddata();
  }
  getDates() {
    var date = new Date();
    var currentYear = new Date().getFullYear() - 1;

    var todayTime = new Date();
    this.dates = (todayTime.getDate());

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

    for (var i = 0; i < this.months.length; i++) {
      if (this.selectedmonth == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }


  mymonth(day) {
    this.selday = day;
    //this.selectedmonth=day;
    for (var i = 0; i < this.months.length; i++) {
      if (this.selday == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }
  myUserType(UserType) {
    // alert(UserType)
    this.User_Type = UserType
  }
  btnSearch() {
    this.binddata();
  }
  binddata() {
    var accessToken = window.localStorage.Tokenval ;
    //this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
     // alert(this.User_Type)

      let params = {
        "sno": this.selectedmonth,
        "Clinicid": this.userid,
        "Branchid": "",
        "Category": "",
        "Item_code": "",
        "Name": "",
        "Serial_number": "",
        "Supplier": "",
        "Price": "",
        "Tax": "",
        "Cost_price": "",
        "Stock_level": "",
        "Notes": "",
        "Tax_includes": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_updated": "",
        "var1": "",
        "var2": "",
        "condition": "CheckDob"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        this.isPageloaderVisible = false;
      //  console.log(result);
        if (this.User_Type === "Patient") {
          if (result.status_cd === "1") {
            this.products = result.data.Table;
            this.chRef.detectChanges();
            const table: any = $('table');
            this.dataTable = table.DataTable();
          } else {
            console.log(result.error_msg);
            console.log(accessToken);
            this.products = result.data.Table;
            this.chRef.detectChanges();
            const table: any = $('table');
            this.dataTable = table.DataTable();
          }
        } else {
          if (result.status_cd === "1") {
            this.products = result.data.Table1;
            this.chRef.detectChanges();
            const table: any = $('table');
            this.dataTable = table.DataTable();
          } else {
            console.log(result.error_msg);
            console.log(accessToken);
            this.products = result.data.Table1;
            this.chRef.detectChanges();
            const table: any = $('table');
            this.dataTable = table.DataTable();
          }
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

}
