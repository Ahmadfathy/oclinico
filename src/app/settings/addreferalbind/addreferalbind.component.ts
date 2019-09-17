import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';


import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-addreferalbind',
  templateUrl: './addreferalbind.component.html',
  styleUrls: ['./addreferalbind.component.css']
})


export class AddreferalbindComponent implements OnInit {

 
  referaldetails = [];
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
    this.userid =  window.localStorage.getItem("userId")
  
    document.title="Referral Master Details"
   
  //   this.http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
  //   .subscribe((data: any[]) => this.clients = data);
  //  this.clients = this.referaldetails
    
//  this.dataserv.currentMessage.subscribe(message => {
      
//     }

// this.dataserv.currentMessage.subscribe(message => this.message = message)
this.getreferaldata();

  }


  selcatvalue(refrid){
    console.log(refrid);
    let temp = {
      "refrralid" : refrid,
 }                
 this.selected_qarr.push(temp);
 this.refcheckedval=refrid;
 }
 editclick(){
   //alert("sample");
 // alert(this.refcheckedval);

  if(this.refcheckedval=="undefined"||this.refcheckedval==undefined||this.refcheckedval==""||this.refcheckedval=="null"||this.refcheckedval==null){
    alert("please select checkbox");
  }else{
    // this.dataserv.changeMessage("refid_" + this.refcheckedval);
    this.router.navigate(['AddReferal']);
  }
  //  if(this.selected_qarr.length==0){
  //    alert("please select checkbox");
  //  }else{
  //    alert(this.selected_qarr);
  //   this.router.navigate(['AddReferal']);

  //  }
  //  if(this.selected_qarr.length==0){
  //    alert("please select checkbox");
  //  }else{
  //    alert(this.selected_qarr);
  //   this.router.navigate(['AddReferal']);

  //  }
  
 }



 getreferaldata(){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Master_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Master_Details"
    let params = {
      "Sno":"", 
      "Referral_ID":"",
      "Company_Name":"",
      "Address":"",
      "City":"",
      "PhoneNo":"",
      "EmailID":"",
      "TransDate":"",
      "Loginid":"",
      "Clinicid":this.userid,
      "Condition":"GetData",
      "Contact_person":"",
      "Status":"",
      "Branch_ID":"",
      "pagecount":""
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
               
                this.referaldetails = result.data.Table;
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

    // },
    // err=>{
    //   this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }
    
    // );
}

}
