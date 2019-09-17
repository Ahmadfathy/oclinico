
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  patient: any
  userid: any = "";
  table = [];
  showdata: boolean = false;
  showLoader: boolean = true;
  nodata: boolean;
  dataTable: any;
  patientid: any
  public showpagenation: boolean = false;
  payment: any;
  pay: boolean;
  patientId: any;
  patient_name: any;
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.payment = localStorage.getItem('patientPaymentStatus')
    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    this.patient = localStorage.getItem('patient')
    this.patient_name = sessionStorage.patient_name;
    document.title = "Invoices"
    this.userid = window.localStorage.getItem("userId")
    this.patientId = localStorage.getItem('patientId')
    this.getdata()
    this.showdata = false;
    this.nodata = true
    this.showpagenation = true;
    this.patientid = (sessionStorage.getItem('patientId'));
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Invoice_transactions"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Invoiceno": "",
      "Issued_date": "",
      "PatientId": this.patientid,
      "Doctorid": "",
      "Appointment_info": "",
      "Invoiceto": "",
      "Extra_patient": "",
      "Note": "",
      "Tot_discount": "",
      "Sub_total": "",
      "Tax": "",
      "Invoice_tot": "",
      "Loginid": this.userid,
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
      "condition": "ViewPatientInvoice"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd == "0") {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.table = result.data.Table;
        // console.log(this.table)
        this.showdata = true;
        this.nodata = true;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }


    })

    //},
    // err=>{
    // console.log("Token Error:"+err);
    // }

    //);
  }
  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  lab() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

}