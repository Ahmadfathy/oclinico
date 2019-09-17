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
  selector: 'app-supplierwiseproducts',
  templateUrl: './supplierwiseproducts.component.html',
  styleUrls: ['./supplierwiseproducts.component.css']
})
export class SupplierwiseproductsComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];  SupplierName: any = [];  dataTable: any;
  data: any = [];  Supplier_Name: any;  SupName: any;  GridHide: any;
  userid: string;Year: any;
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
    var accessToken = window.localStorage.Tokenval ;
    //this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      if (this.Supplier_Name == "" || this.Supplier_Name == undefined || this.Supplier_Name == null || this.Supplier_Name == "Select") {
        this.SupName = "";
      } else {
        this.SupName = this.Supplier_Name;
      }
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
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
        "Trans_date": "",
        "Last_updated": "",
        "var1": "",
        "var2": this.SupName,
        "condition": "Get_Products_reports_suppplier"
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

          if (this.Supplier_Name == "" || this.Supplier_Name == undefined || this.Supplier_Name == null || this.Supplier_Name == "Select") {
            this.SupplierName = result.data.Table;
            this.GridHide = false;
          } else {
            this.GridHide = true;
            this.products = result.data.Table;
            this.chRef.detectChanges();
            const table: any = $('table');
            this.dataTable = table.DataTable();
          }

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
  MySName(Sname) {
    this.Supplier_Name = Sname;
  }
}
