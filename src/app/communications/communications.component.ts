import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../userinfo.service'
@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {
  dataTable : any =[];
  communicationindetails:any;
  userid: string;
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,public commonService:UserinfoService,public https: Http,
    private chRef : ChangeDetectorRef) { }

  ngOnInit() {
    this.getcommunicationdata();
    this.userid =  window.localStorage.getItem("userId")
  }
  getcommunicationdata(){
    var accessToken=  window.localStorage.Tokenval;
      
      // our service calling as usual
      
      // let serviceUrl="http://23.92.209.46/OclinicoAPI/Api/Account/Cl_Communication";
      let serviceUrl = this.commonService.commonUrl+"Account/Cl_Communication";
      let params = {
        "sno":"",
        "clinicid":"", 
        "Branchid":"",
        "LoginId":this.userid,
        "jobtitle":"",
        "jobrole":"",
        "docortreat":"",
        "DocId":"",
        "fromdt":"",
        "todt":"",
        "Msgtype":"",
        "MobileNo":"",
        "Msgtext":"",
        "Availblemsgcnt":"",
        "sendingmsgcnt":"",
        "totalmbilnum":"",
        "transdt":"",
        "Condition":"getCommunicationDetails",
        "ToEmail":"",
        "mailSub":"",
        "EmailMsg":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                this.isPageloaderVisible=false;
                if(result.status_cd === "1"){
                  this.communicationindetails = result.data.Table;
                  this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                  this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
                }
              },
              error=>{
                this.isPageloaderVisible=false;
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      
  }
}
