import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-cashreceiptsettings',
  templateUrl: './cashreceiptsettings.component.html',
  styleUrls: ['./cashreceiptsettings.component.css']
})
export class CashreceiptsettingsComponent implements OnInit {

  cashreceiptdetails = [];
  
  refcheckedval:any;
  message:string;
  dataTable : any =[];
  userid: any = "";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,public commonService:UserinfoService,public https: Http,
     private chRef : ChangeDetectorRef)
    // private dataserv: EvntserviceService
     { }

  ngOnInit() {

    document.title ="Cash Receipts";
    this.userid =  window.localStorage.getItem("userId");
  
     this.getcashreceiptdata();

  }


  getcashreceiptdata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl=http://graylogic.net/OclinicoAPI/Api/Account/Laboratory_Cashreceipts_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/Laboratory_Cashreceipts_Details"
    let params = {
      "Sno":"",
      "Clinicid": this.userid,       
      "Branchid":"",      
      "Loginid":"", 
      "ReceiptID":"", 
      "EmployeeID":"",
      "ReceiptNo":"", 
      "Cash_type":"", 
      "Amount":"",
      "Notes":"",
      "Trans_Date":"",
      "Status":"",
      "Condition":"GetData"
    }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
               // console.log(result);
                
               // console.log(result.data.Table);
                this.isPageloaderVisible = false;
                if(result.status_cd === "1"){
                  this.cashreceiptdetails = result.data.Table;
                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable();
                
                }else{
                // this.hideLoader=true;
                  // console.log(result.error_msg);
                  // console.log(accessToken);
                  this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable();
                }
              },
              error=>{
                this.isPageloaderVisible = false;
             //  this.hideLoader=true;
               // console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      // },
      // err=>{
      //   this.isPageloaderVisible = false;
      // //console.log("Token Error:"+err);
      // }
      
      // );
  }



}
