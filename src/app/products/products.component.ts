import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../userinfo.service'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
class Person {
  name: string;
  Supplier: string;
  qty: string;
  Price: string;
  Cost_price: string;
  Expire_date: string;
  Status: string;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  dataTable: any;
  data: any = [];
  userid: string;
  public isPageloaderVisible = true;
  persons: Person[];
  constructor(public http: Http,
    private router: Router,   
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,          
    private https: HttpClient
  ) { }

  ngOnInit() {
    document.title = "Products";
    this.userid = window.localStorage.getItem("userId")  
    this.chRef.detectChanges();
    $('#dataTable_wrapper').show();    
    const table: any = $('table');
    this.dataTable = table.DataTable();
    this.isPageloaderVisible = false;  
      this.dataTable = table.DataTable({
      paging: true,
      destroy: true,
      serverSide: true,
      lengthChange: true,
      pageLength: 25,
      lengthMenu: [25, 50, 100, 500, 1000],
      pagingType: "full_numbers", 
      searching: true,
      searchable: true,
      ordering: false,
      deferRender:true,    
      responsive:true,       
      dom: 'lfrtip',
      processing: true,
      "language": {
        "emptyTable": "No data available in table",
        "processing": "Loading Please Wait........",
        "zeroRecords": "No records to display"
      }, 
      ajax: (dataTablesParameters: any,callback) => {
        //this.isPageloaderVisible = true;
        var accessToken = window.localStorage.Tokenval;             
      var body = { Clinicid: this.userid, loginid: this.userid};                
        this.https
          .post<DataTablesResponse>(
            this.commonService.commonUrl+'/Account/Products_transactions_serverside',
          Object.assign(dataTablesParameters, body)                                 
            , {
              headers: new HttpHeaders().set('Authorization',accessToken)
            }
          ).subscribe(resp => {
            //this.isPageloaderVisible = false;           
            this.persons = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'name' }, { data: 'Supplier' }, { data: 'qty' }, { data: 'Price' }, { data: 'Cost_price' },
       { data: 'Expire_date' }, { data: 'Status' }],     
    });
  }
  
  Edit(content, value) {
    this.router.navigateByUrl('/editproduct?ItemCode=' + value + '');
  }
  View(content, value) {
    this.router.navigateByUrl('/viewproduct?ItemCode=' + value + '');
  }
}
