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
  selector: 'app-pricewiseproduct',
  templateUrl: './pricewiseproduct.component.html',
  styleUrls: ['./pricewiseproduct.component.css']
})
export class PricewiseproductComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];  dataTable: any;  data: any = [];  FromPrice: any;
  ToDate: any;  FromDate: any;  ToPrice: any;  From_Price: any;  To_Date: any;
  From_Date: any;  To_Price: any;  userid: string;  Day_FromDate: any;
  Day_ToDate: any;Year: any;
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.binddata();
  }
  binddata() {
    //this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
     var accessToken = window.localStorage.Tokenval ;
     if (this.FromPrice == "" || this.FromPrice == null || this.FromPrice == undefined) {
        this.From_Price = "";
      } else {
        this.From_Price = this.FromPrice;

      }
      if (this.ToPrice == "" || this.ToPrice == null || this.ToPrice == undefined) {
        this.To_Price = "";
      } else {
        this.To_Price = this.ToPrice;

      }
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
      let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
      let params = {
        "Sno": "",
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
        "Trans_date": this.From_Date,
        "Last_updated": this.To_Date,
        "var1": this.From_Price,
        "var2": this.To_Price,
        "condition": "Get_Products_search"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        //  console.log(result);
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
    var date = new Date(this.Day_ToDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    this.ToDate = day + '/' + mnth + '/' + this.Year;
  }
  MyFromPrice(Sname) {
    this.FromPrice = Sname;
  }
  MyToPrice(Sname) {
    this.ToPrice = Sname;
  }
}
