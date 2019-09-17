import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-occupationsdetailssettings',
  templateUrl: './occupationsdetailssettings.component.html',
  styleUrls: ['./occupationsdetailssettings.component.css']
})
export class OccupationsdetailssettingsComponent implements OnInit {

 
  occupationsdetails = [];
 
  clients: any[];
 // dataTable : any =[];
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
    document.title="Occupations"
    this.userid =  window.localStorage.getItem("userId")
  
this.getoccupationsata();

  }


 


 getoccupationsata(){
  var accessToken=window.localStorage.Tokenval;
    //console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Occupation_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/Occupation_Transactions"
    let params = {
        "Sno":"",
        "Occupation_ID":"",       
        "Occupation_Name":"",      
        "Trans_Date":"", 
        "Loginid":"", 
        "Clinicid":this.userid,
        "status":"", 
        "Operation":"GetOccupation", 
        "branchid":""
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
                this.occupationsdetails = result.data.Table;
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
              this.isPageloaderVisible = false;
           //  this.hideLoader=true;
             // console.log(error);
            
            }
            );

    
}


}
