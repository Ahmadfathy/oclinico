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
  selector: 'app-outstandinginvoices',
  templateUrl: './outstandinginvoices.component.html',
  styleUrls: ['./outstandinginvoices.component.css']
})
export class OutstandinginvoicesComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];  dataTable: any;  data: any = [];  DoctorList: any = [];
  Doctor_id: any;  Doctorid: any;  InvoiceListing: any;  userid: string;
  nodata: boolean;  nodata1: boolean;Year: any;
  
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.bindDoctor();
    this.binddata();
  }
  bindDoctor() {
    var accessToken = window.localStorage.Tokenval ;
    //this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetPatients";
      let serviceUrl = this.commonService.commonUrl + "Account/GetPatients";
      let params = {
        "FirstName": "",
        "par1": "",
        "par2": this.userid,
        "par3": this.userid,
        "condition": "GetDoctorName"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        // console.log(result);
        
        if (result.status_cd === "1") {
          this.DoctorList = result.data.Table;
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
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
  binddata() {
    var accessToken = window.localStorage.Tokenval ;
     //this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      if (this.Doctor_id == "" || this.Doctor_id == null || this.Doctor_id == undefined || this.Doctor_id == "Select") {
        this.Doctorid = "";
      } else {
        this.Doctorid = this.Doctor_id;
      }

      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Invoice_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Invoice_transactions";
      let params = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branchid": "",
        "Invoiceno": "",
        "Issued_date": "",
        "PatientId": "",
        "Doctorid": this.Doctorid,
        "Appointment_info": "",
        "Invoiceto": "",
        "Extra_patient": "",
        "Note": "",
        "Tot_discount": "",
        "Sub_total": "",
        "Tax": "",
        "Invoice_tot": "",
        "Loginid": "",
        "Status": "",
        "Item_code": "",
        "bill_type": "",
        "Qty": "",
        "Price": "",
        "Tot_Qty": "",
        "TotPrice": "",
        "Taxper": "",
        "Tax_amt": "",
        "Discount": "",
        "Total": "",
        "Trans_date": "",
        "Last_Update": "",
        "condition": "Invoice_Report"
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
          this.products = result.data.Table1;
          this.InvoiceListing = result.data.Table;
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
  MyDoctors(docid) {
    this.Doctor_id = docid;
  }
  btnSearch() {
    this.binddata();
  }

}
