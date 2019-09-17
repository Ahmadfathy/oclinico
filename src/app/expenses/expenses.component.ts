
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from '../userinfo.service'
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';


import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  userid: any = "";
  table = []
  showdata: boolean = false;
  showLoader: boolean = true;
  nodata: boolean;
  dataTable: any;
  public showpagenation: boolean = false;
  public isPageloaderVisible = true;

  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }     

  ngOnInit() {
  
    this.userid = window.localStorage.getItem("userId")
    this.showdata = false;
    this.nodata = true
    this.showpagenation = true;
    this.getdata()
    // this.chRef.detectChanges();
    // $('#dataTable_wrapper').show();
    // const table1: any = $('#dataTable');
    // this.dataTable = table1.DataTable();


  }
  getdata() {

    //service call

    var accessToken=  window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual
      let url = this.cmn.commonUrl+'Account/Expense_Operations';

      let body = {
        "Clinicid": window.localStorage.getItem('userId'),
        "Branchid": "",
        "Expense_Id": "",
        "Expense_date": "",
        "Vendor": "",
        "Category": "",
        "Sub_total": "",
        "Tax": "",
        "Total_Expense_Amount": "",
        "Notes": "",
        "expense_products": "",
        "Status": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_Updated": "",
        "Item_code": "",
        "Unitcost": "",
        "Qty": "",
        "Flag": "",
        "Condtion": "Get_Data"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        this.isPageloaderVisible = false;
        if (res.status_cd == "0") {

          this.showLoader = false;
          this.showdata = false;
          this.nodata = false;
          this.showpagenation = false;
          $('#dataTable_wrapper').hide();
        } else {
          this.showLoader = false;
          this.table = res.data.Table;
          this.showdata = true;
          this.nodata = true;
          // this.showpagenation = true;
          this.chRef.detectChanges();
          $('#dataTable_wrapper').show();
          const table1: any = $('#dataTable');
          this.dataTable = table1.DataTable();
        }
      })


      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      }
    
  }

  edit(id) {
    this.router.navigate(['/editexpense', id])
  }

}














