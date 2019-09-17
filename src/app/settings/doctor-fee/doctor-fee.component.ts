import { Component, OnInit ,  ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-doctor-fee',
  templateUrl: './doctor-fee.component.html',
  styleUrls: ['./doctor-fee.component.css']
})
export class DoctorFeeComponent implements OnInit {

  userid: any = "";
  docfeedata: any[];
  dataTable : any =[];
  public isPageloaderVisible = true;
  constructor(private http: HttpClient, 
              private chRef : ChangeDetectorRef,public router : Router,public https: Http,
              public commonService : UserinfoService) { }

  ngOnInit() {
    document.title="Doctor Fee"
    this.userid =  window.localStorage.getItem("userId")
    console.log(this.userid)
    this.getdocfeedata();
  
  }

  getdocfeedata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Doctore_Fee_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/Doctore_Fee_Details"
      let params = {
              "Sno":"",
              "clinicid": this.userid,    
              "branchid":"",      
              "loginid": this.userid,
              "docid":"", 
              "app_ID":"",
              "pay_Fee":"", 
              "status":"", 
              "date":"",
              "condition":"GetData"
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                // console.log(result.data.Table);
                this.isPageloaderVisible = false;
                if(result.status_cd === "1"){
                  this.docfeedata = result.data.Table;
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
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
    //   },
    //   err=>{
    //     this.isPageloaderVisible = false;
    // //  console.log("Token Error:"+err);
    //   }
      
    //   );
  }


}
