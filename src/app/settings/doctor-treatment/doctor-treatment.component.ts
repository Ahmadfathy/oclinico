import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-doctor-treatment',
  templateUrl: './doctor-treatment.component.html',
  styleUrls: ['./doctor-treatment.component.css']
})
export class DoctorTreatmentComponent implements OnInit {
  Doct_treat_data: any=[];
  dataTable : any =[];
  userid: any = "";
  public isPageloaderVisible = true;
  constructor(public http : HttpClient, private chRef: ChangeDetectorRef,
    public router : Router,public commonService:UserinfoService,public https: Http) { }

  ngOnInit() {

    document.title="DoctorTreatment";
    this.userid =  window.localStorage.getItem("userId")
  
    this.getdocumenttypeata();
}



getdocumenttypeata(){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/DocTreatment_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions"
    let params = {
            "Sno":"",
            "Practitioner_Id":"",       
            "Treatment_Id":"",      
            "status":"",
            "Login_ID":"", 
            "Trans_Date":"", 
            "Operation":"GetDocTreatments",
            "clinicid":this.userid,
            "Branchid":"", 
            "Last_Updated":"" 
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            //  console.log(result);
            //  console.log(result.data.Table);
              this.isPageloaderVisible = false;
              if(result.status_cd === "1"){
                this.Doct_treat_data = result.data.Table;
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
            //  console.log(error);
           
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
