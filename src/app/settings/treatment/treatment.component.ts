import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  treatmentData: any[];
  dataTable : any =[];
  userid: string="";
  myToastMsg: string="";
  public isPageloaderVisible = true;
  constructor(
              private chRef : ChangeDetectorRef,
              public cmn: UserinfoService,
              private router: Router,
              public http: Http,) { }


    ngOnInit() {
     
document.title="Treatments"
 
      this.userid =  window.localStorage.getItem("userId")
    
      this.GetData();
       }
     
      GetData(){
     
      // console.log("GetTempData");
     
      var accessToken=window.localStorage.Tokenval;
          // console.log(accessToken);
     
           // our service calling as usual
        
          //  let serviceUrl = "http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Transactions"
           let serviceUrl = this.cmn.commonUrl+"Account/Treatment_Transactions"
           let params  = {
                          "Sno":"",
                          "Treatment_Id":"",
                          "Treatment_Name":"", 
                          "Treatmentcode":"",
                          "Default_Duration":"", 
                          "Login_Id":"", 
                          "status":"",
                          "Trans_Date":"", 
                          "SlotType":"",
                          "Noof_Sittings":"",
                          "Repeats":"", 
                          "Color":"",
                          "Cost":"",
                          "clinicid":this.userid,
                          "branchid":"",
                          "Operation":"GetTreatments",
                          "pagecount":""
                          }
     
           let headers = new Headers({
             "Content-Type": "application/json",
             Accept: "application/json",
             Authorization: accessToken
           });
           let options = new RequestOptions({ headers: headers });
     
          //  console.log(params);
          //  console.log(serviceUrl);
           this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
            // console.log(result);
             this.isPageloaderVisible = false;
     
             if(result.status_cd === "1"){
     
               this.treatmentData = result.data.Table;
     
               this.chRef.detectChanges();
     
             const table: any = $('table');
             this.dataTable = table.DataTable();
                // this.nodata;
             }else{
                 this.myToastMsg = "No Data Found";
                 this.ToastFun();
                //  this.nodata = false;
             }
           },
           );
           error =>{
             console.log(error);
             this.isPageloaderVisible = false;
             this.showToastMsg();
           }
             err => {
              this.isPageloaderVisible = false;
              // console.log("Token Error:" + err);
               this.showToastMsg();
             }
          
     
           }
                
         
           ToastFun(){
             var x = document.getElementById("mytoastmsg");
               x.className = "show";
               setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
           }
     
           showToastMsg(){
             // alert("test");
             this.myToastMsg="There is some problem, Please try again.";
             this.ToastFun();
           }
     
         

}
