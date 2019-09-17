import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'

@Component({
  selector: 'app-refdisountdetailssettings',
  templateUrl: './refdisountdetailssettings.component.html',
  styleUrls: ['./refdisountdetailssettings.component.css']
})
export class RefdisountdetailssettingsComponent implements OnInit {
  refdiscountdetails = [];
  clients: any[];
  dataTable : any =[];
  userid: any ="";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,private chRef : ChangeDetectorRef,public https: Http,
    public commonService:UserinfoService) { }

  ngOnInit() {
    document.title="Referral Discount Details";

    this.userid =  window.localStorage.getItem("userId")

    // this.refdiscountdetails = [

    //   {
    //     refid: "103",
    //     refname: "test",
    //     reftpe: "sampdata",
    //     name: "	sample",
    //     discount: "20",
    //     transdate: "19/03/2019"
    //   }, {

    //     refid: "104",
    //     refname: "test",
    //     reftpe: "sampdata",
    //     name: "	sample",
    //     discount: "20",
    //     transdate: "19/03/2019"


    //   }
    // ]
this.getreferaldiscountdata();

   // this.clients = this.refdiscountdetails;
    // this.chRef.detectChanges();
    // const table: any = $('table');
    // this.dataTable = table.DataTable();
  }


  getreferaldiscountdata(){
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details"
      let params = {
        "Sno":"",
        "Clinicid":this.userid,       
        "Branch_ID":"",      
        "Loginid":"",        
        "Referral_Dis_ID":"",
        "Referral_ID":"",    
        "Service_ID":"",     
        "Disc_Per":"",
        "Status":"",
        "Trans_Date":"",
        "pagecount":"",
        "Condition":"GetData",      
        "Type":"" 
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
                  if(result.data.Table[0].Result=="False"){
                    console.log(result.error_msg);
                    console.log(accessToken);
                    this.chRef.detectChanges();
                    const table: any = $('table');
                    this.dataTable = table.DataTable();
                  }else{
                    this.refdiscountdetails = result.data.Table;
                    console.log(this.refdiscountdetails);
                    this.chRef.detectChanges();
                    const table: any = $('table');
                    this.dataTable = table.DataTable();
                  }
                 
                
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
