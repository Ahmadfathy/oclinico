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
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  public isPageloaderVisible = true;
  products: any = [];  dataTable: any;  data: any = [];  ToDate: any;
  FromDate: any;  To_Date: any;  From_Date: any;  Day_FromDate: any;
  Day_ToDate: any;  userid: string;Year: any;

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
      let serviceUrl = this.commonService.commonUrl + "Account/Patient_operations";
      //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations";
      let params = {
        "sno": "",
        "clinicid": this.userid,
        "loginid": this.From_Date,
        "patient_id": "",
        "Title": this.To_Date,
        "Ara_firstname": "",
        "Ara_Lastname": "",
        "Ara_fathername": "",
        "First_name": "",
        "Last_Name": "",
        "Middle_name": "",
        "DOB": "",
        "DOB_Arabic": "",
        "Gender": "",
        "Marital_status": "",
        "Identification_type": "",
        "Identification_no": "",
        "Identification_attachment": "",
        "Identification_Expiry": "",
        "Nationality": "",
        "Occupation": "",
        "Area": "",
        "Block": "",
        "Building": "",
        "Street": "",
        "Floor": "",
        "City": "",
        "Country": "",
        "Email": "",
        "Mobileno": "",
        "Home_phone": "",
        "Work_phoneno": "",
        "Emergency_contact": "",
        "Notes": "",
        "Reminder_type": "",
        "status": "",
        "Trans_date": "",
        "Last_update": "",
        "Condition": "NewPatientReport",
        "Par1": "",
        "Par2": "",
        "Par3": ""
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
    //this.ToDate = Sname;
    //this.ToDate = this.Day_ToDate;
    var date = new Date(this.Day_ToDate),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    this.Year  = (date.getFullYear());
    //this.FromDate = this.Day_FromDate;
    this.ToDate = day + '/' + mnth + '/' + this.Year;
  }
}
