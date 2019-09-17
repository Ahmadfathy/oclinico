import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../userinfo.service'



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  getpayments: any = [];
  dataTable: any;
  data: any = [];
  public isPageloaderVisible = true;
  userid: string;
  showdata: boolean = false;
  public showpagenation: boolean = false;
  nodata: boolean = false;
  languageoption: string;
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
  ) { }
  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.binddata();
    this.showdata = false;
  }
  binddata() {
    var accessToken=  window.localStorage.Tokenval;
      
      let serviceUrl = this.cmn.commonUrl + "Account/inserPaymentDetails_new";
      let params =
      {
        "Sno": "",
        "clinicid": this.userid,
        "branchid": "",
        "PrescriptionID": "",
        "patientid": "",
        "invoiceid": "",
        "payment_dttime": "",
        "paymodeids": "",
        "paymode_amts": "",
        "notes": "",
        "total": "",
        "loginid": "",
        "Trans_Date": "",
        "Last_updated": "",
        "status": "",
        "operation": "Get_Payments",
        "inv_amnts": "",
        "credit": "",
        "pagecount": ""
      }
      console.log(JSON.stringify(params)
      )
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        // if (result.status_cd === "1") {
        if (result.data.Table[0].Result.toString().toLowerCase() === "true") {
          this.getpayments = result.data.Table;
          this.showdata = true;
          this.nodata = false;
          this.showpagenation = true;
          this.chRef.detectChanges();
          $('#dataTable_wrapper').show();

          const getpayments: any = $('#dataTable');
          this.dataTable = getpayments.DataTable({
            responsive: true,
          });
          //var x=document.querySelectorAll('label')            
          //  x[1].style.cssFloat  ="right";                                                
          // $('div.dataTables_filter input').css('float','right !important;');
        } else {
          this.showdata = false;
          this.nodata = true;
          this.showpagenation = false;
          $('#dataTable_wrapper').hide();
        }
        $('.div.dataTables_filter input').addClass('filter');
      },
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
      );
    
  }
  View(content, value) {

    this.router.navigateByUrl('/view-payments', value);
  }
  gotoaddpayment() {
    this.router.navigate(['/AddPayment', { "frompage": "payment" }])
  }
}
