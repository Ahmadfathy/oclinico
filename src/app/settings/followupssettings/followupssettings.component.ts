import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-followupssettings',
  templateUrl: './followupssettings.component.html',
  styleUrls: ['./followupssettings.component.css']
})
export class FollowupssettingsComponent implements OnInit {

 
  followupdetails = [];
  selected_qarr=[];
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
    document.title="FollowUps";

    this.userid =  window.localStorage.getItem("userId")
  
    
   
  //   this.http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
  //   .subscribe((data: any[]) => this.clients = data);
  //  this.clients = this.referaldetails
    
//  this.dataserv.currentMessage.subscribe(message => {
      
//     }

// this.dataserv.currentMessage.subscribe(message => this.message = message)
this.getfollowupdata();

  }


 


 getfollowupdata(){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Followups";
    let serviceUrl = this.commonService.commonUrl+"Account/Followups"
    let params = {
      "Sno":"",
        "Doctorid":"",       
        "count":"",      
        "Repeat_type":"", 
        "Trans_date":"", 
        "loginid":"",
        "clinicid": this.userid , 
        "param1":"", 
        "param2":"",
        "Condition":"Getinfo"
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
                this.followupdetails = result.data.Table;
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

  //   },
  //   err=>{
  //     this.isPageloaderVisible = false;
  //  // console.log("Token Error:"+err);
  //   }
    
  //   );
}

}
