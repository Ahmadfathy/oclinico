import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'

@Component({
  selector: 'app-bankmasterdetails',
  templateUrl: './bankmasterdetails.component.html',
  styleUrls: ['./bankmasterdetails.component.css']
})
export class BankmasterdetailsComponent implements OnInit {
  userid: any;
  bankdetails:any=[];
  dataTable:any=[];
  Sno:any;
  public isPageloaderVisible = true;
  constructor(public router : Router,
              public commonService:UserinfoService,
              public https: Http,
              private chRef : ChangeDetectorRef) { }

  ngOnInit() {
    document.title="Bank Master Details";

    this.userid = window.localStorage.getItem("userId")
    this.getbankdetails();
  }

  getbankdetails() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Bank_Master_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Bank_Master_Details"
      let params = {
        "Sno":"",
        "Clinic_ID":this.userid,       
        "Branchid":"",      
        "Bank_ID":"", 
        "Bank_Name":"", 
        "Status":"",
        "LoginID":"", 
        "Trans_Date":"", 
        "Last_Updated":"",
        "Condition":"GetData"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.bankdetails = result.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
      );
  }

  edit(sno){
      this.Sno = sno;
      window.sessionStorage.setItem("Sno",this.Sno);
      this.router.navigate(['/editbankmaster']);
  }
}
