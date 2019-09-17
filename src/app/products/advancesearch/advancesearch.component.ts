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
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.css']
})
export class AdvancesearchComponent implements OnInit {
  userid: any;
  products: any = []; Typedata: any; Details: any = []
  dataTable: any; data: any = [];
  Search: any;
  SearchName: string;
  isPageloaderVisible : boolean = false;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.binddata();
  }
  binddata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/cl_Product_SearchString";
    if (this.Search == "" || this.Search == null || this.Search == undefined) {
      this.SearchName = "";
    } else {
      this.SearchName = this.Search;
    }
    let params = {
      "Search": this.SearchName,
      "clinicid":this.userid
    }
   
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
       console.log(result);

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

  }
  btnSearch() {
    this.binddata();
  }
  myDoctor(doctor) {
   //alert(doctor)
    this.Search = doctor;
  }
}


