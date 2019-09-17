import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-m-arabicaddrdetails',
  templateUrl: './m-arabicaddrdetails.component.html',
  styleUrls: ['./m-arabicaddrdetails.component.css']
})
export class MArabicaddrdetailsComponent implements OnInit {
  clinicaddress = [];
  selected_qarr=[];
  clients: any[];
 // dataTable : any =[];
  refcheckedval:any;
  message:string;
  dataTable : any =[];
  userid: any= "";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,public commonService:UserinfoService,public https: Http,
     private chRef : ChangeDetectorRef)
    // private dataserv: EvntserviceService
     { }

  ngOnInit() {
    document.title="Clinic Address Details"
    this.userid =  window.localStorage.getItem("userId")
    this.getdclinicaddressdetails();
  
  
   
    // this.http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
    // .subscribe((data: any[]) => this.clients = data);
    // this.clients = this.deptdetails
    // this.chRef.detectChanges();
    // const table: any = $('table');
    // this.dataTable = table.DataTable();



  }

  getdclinicaddressdetails(){
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/Clinic_Address_Details"
      let params = {
        "Sno":"",
        "clinicid":this.userid,
        "branchid":"", 
        "loginid":"",
        "RoleType":"", 
        "FirstName":"", 
        "LastName":"",
        "FatherName":"", 
        "CName":"",
        "Address":"",
        "City":"", 
        "condition":"Getdata",
        "Country":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
               // console.log(result);
                this.isPageloaderVisible=false;
                if(result.status_cd === "1"){
                  this.clinicaddress = result.data.Table;
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
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      
  }
 


}
