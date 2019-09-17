import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserinfoService } from '../userinfo.service'
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-patient-summery',
  templateUrl: './patient-summery.component.html',
  styleUrls: ['./patient-summery.component.css']
})
export class PatientSummeryComponent implements OnInit {
  @ViewChild('CreateContact') Ccontact: TemplateRef<any>;
  dataTable: any;
  data: any = [];
  userid: string;
  public isPageloaderVisible = true;
  PsummeryData: any;
  modalReference: any;
  sno: any;
  constructor(
    public http: Http,
    public commonService: UserinfoService,
    private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.getPsummery();
  }

  getPsummery() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
    let params = {
      // "Sno": "",
      // "Clinicid":this.userid,
      // "Branchid": "",
      // "Category": "",
      // "Item_code": "",
      // "Name": "",
      // "Serial_number": "",
      // "Supplier": "",
      // "Price": "",
      // "Tax": "",
      // "Cost_price": "",
      // "Stock_level": "",
      // "Notes": "",
      // "Tax_includes": "",
      // "Loginid": "",
      // "Trans_date": "",
      // "Last_updated": "",
      // "var1": "",
      // "var2": "",
      // "condition": "patient_info"
        "sno":"",
        "Clinicid":this.userid,
        "Branchid":"",
        "Category":"",
        "Item_code":"",
        "Name":"",
        "Serial_number":"",
        "Supplier":"",
        "Price":"",
        "Tax":"",
        "Cost_price":"",
        "Stock_level":"",
        "Notes":"",
        "Tax_includes":"",
        "Loginid":"",
        "Trans_date":"",
        "Last_updated":"",
        "var1":"",
        "var2":"",
        "condition":"getpharmasistdetails"
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
        this.PsummeryData = result.data.Table;
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

  }
}


