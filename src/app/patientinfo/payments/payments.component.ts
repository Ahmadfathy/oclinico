
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payment:any;
  pay:boolean;
  patient:any;
  userid: any="";
  table=[];
  showdata:boolean=false;
  showLoader:boolean = true;
  nodata:boolean;
  dataTable: any;
  public showpagenation: boolean = false;
  patientId: string;
  patient_name: any;
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
  
    this.payment=localStorage.getItem('patientPaymentStatus')
    if(this.payment=="pending"){
this.pay=true
    }
    else{
      this.pay=false
    }
    this.patient= localStorage.getItem('patient')
    document.title="Payments"
    this.userid =  window.localStorage.getItem("userId")
    this.getdata()
    this.showdata = false;
    this.showpagenation = true;
    this.nodata = true;
  }
  getdata(){
    // this.cmn.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;
     // console.log(accessToken);
     
      // our service calling as usual
      var url = this.cmn.commonUrl+"Account/inserPaymentDetails_new"
let body={
  "sno":"",
  "clinicid":this.userid,
  "branchid":"",
  "paymentid":"",
  "patientid":this.patientId,
  "invoiceid":"",
  "payment_dttime":"",
  "paymodeids":"",
  "paymode_amts":"",
  "notes":"",
  "total":"",
  "loginid":this.userid,
  "Trans_Date":"",
  "Last_updated":"",
  "status":"",
  "operation":"GetPatientPayments",
  "inv_amnts":"",
  "credit":"",
  "pagecount":""
  
  }
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: accessToken
  });
  let options = new RequestOptions({ headers: headers });

this.http.post(url,body,options).map(res =>res.json()).subscribe(result =>{
  console.log(result)
  if(result.data.Table[0].Result !== "True"){
    console.log("False.  .. .");
    this.showLoader = false;
        this.showdata = false;
         this.nodata = true;
         this.showpagenation=false;  
         $('#dataTable_wrapper').hide();
  }
  else{
    console.log("True.  .. .");
    this.showLoader = false;
         this.table = result.data.Table;
         //console.log(this.table)
             this.showdata = true;  
            this.nodata = false;
             this.showpagenation=true;
             this.chRef.detectChanges();
             $('#dataTable_wrapper').show();
             const table1 : any = $('#dataTable');
             this.dataTable = table1.DataTable(); 
  }


})

      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
  }

  viewpatient(){
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
  }
  lab(){
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
  }

  // patientnamebind(){
  //   var accessToken = window.localStorage.Tokenval ;
  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken
  //     });
  //     let body={"text": "patient_name",
  //     "id": this.patientId,
  //     "param1": "",
  //     "param2": ""
  //     }
  //     let options = new RequestOptions({ headers: headers });
  //     var url = this.cmn.commonUrl + "Account/GetUser";
  //     this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //      // console.log(res)
  //       if (res.status_cd == "1") {
  //         this.patient_name = res.data.Table[0].PatientName;
  //       }
  //     });
  // }
}
