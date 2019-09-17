import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-m-servicedetailssettings',
  templateUrl: './m-servicedetailssettings.component.html',
  styleUrls: ['./m-servicedetailssettings.component.css']
})
export class MServicedetailssettingsComponent implements OnInit {
  servicedetails = [];
  servdetails = [];
  selected_qarr=[];
  clients: any[];
 // dataTable : any =[];
  refcheckedval:any;
  message:string;
  dataTable : any =[];
  userid: any ="";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,public commonService:UserinfoService,public https: Http,
     private chRef : ChangeDetectorRef)
    // private dataserv: EvntserviceService
     { }

  ngOnInit() {
    document.title="Service Master Details"
    this.userid =  window.localStorage.getItem("userId")
  
    this.servdetails = [

      {
        servid: "1001",
        servcode:"4056",
        servmname: "test",
        servprice:"2500",
        status: "Active",
        transdate: "26/03/2019"
      }, {

        servid: "1002",
        servcode:"4057",
        servmname: "test",
        servprice:"2500",
        status: "Active",
        transdate: "26/03/2019"
      }
    ]
   
    // this.http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
    // .subscribe((data: any[]) => this.clients = data);
    // this.clients = this.deptdetails
   

this.getservicedetails();

  }
  getservicedetails(){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Service_Master_details";
      let serviceUrl = this.commonService.commonUrl+"Account/Service_Master_details"

      let params = {
        "Sno":"",
        "Service_ID":"",
        "Servicecode":"", 
        "Service_Name":"",
        "Price":"", 
        "Status":"", 
        "Trans_date":"",
        "Loginid":"", 
        "Clinicid":this.userid,
        "Condition":"GetServices",
        "BranchId":"", 
        "pagecount":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              //  console.log(result);
                this.isPageloaderVisible=false;
                if(result.status_cd === "1"){
                  this.servicedetails = result.data.Table;
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
                this.isPageloaderVisible=false;
             //  this.hideLoader=true;
              //  console.log(error);
             
              }
              );
  
     
  }

}
