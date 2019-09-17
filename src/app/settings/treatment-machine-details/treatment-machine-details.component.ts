import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'

@Component({
  selector: 'app-treatment-machine-details',
  templateUrl: './treatment-machine-details.component.html',
  styleUrls: ['./treatment-machine-details.component.css']
})
export class TreatmentMachineDetailsComponent implements OnInit {

  userid: any = "";
  treatmechineData: any[];
  dataTable : any =[];
  public isPageloaderVisible = true;
  constructor(private http: HttpClient, 
              private chRef : ChangeDetectorRef,public router : Router,public https: Http,
              public commonService : UserinfoService) { }

  ngOnInit() {
    document.title="Treatment Machine Details";
    this.userid =  window.localStorage.getItem("userId")
  
    this.gettreatmachinedata();
  
  }

  gettreatmachinedata(){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Machine_operations";
      let serviceUrl = this.commonService.commonUrl+"Account/Treatment_Machine_operations"
      let params = {
              "Sno":"",
              "Treatment_ID":"",       
              "Machine_ID":"",      
              "Trans_date":"", 
              "LoginId":"", 
              "ClinicId":this.userid,
              "Condition":"GetData", 
              "Par1":"", 
              "Par2":""
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
                  this.treatmechineData = result.data.Table;
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
  
     
  }

}
