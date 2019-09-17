import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import {  ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loginactivities',
  templateUrl: './loginactivities.component.html',
  styleUrls: ['./loginactivities.component.css']
})
export class LoginactivitiesComponent implements OnInit {
  public isPageloaderVisible:boolean=true;
  public logindata:any=[];
  public dataTable:[];
  formatdate: string;

  constructor(
    public http : Http, 
              public router:Router,
              public commonService:UserinfoService,
              private chRef : ChangeDetectorRef
  ) { }

  ngOnInit() {
    document.title="Login Activities";
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval
      let url= this.commonService.commonUrl+"Account/user_transactions"
      let body={ 
        "Clinic_ID":"",
        "Branchid":"",
        "Emp_Id":"",
        "Pwd":"",
        "Title":"",
        "First_name":"",
        "Middle_name":"",
        "Last_name":"",
        "ARA_Fname":"",
        "ARA_Lname":"",
        "ARA_FatherName":"",
        "Gender":"",
        "Marital_status":"",
        "Identification_type":"",
        "Identification_cardno":"",
        "Identification_attach":"",
        "Expiry_date":"",
        "Nationality":"",
        "occupation":"",
        "jobtitle":"",
        "Department":"",
        "Residence_card":"",
        "Hire_date":"",
        "Mobile":"",
        "Homeno":"",
        "start_date":"",
        "Salary":"",
        "Sponsersname":"",
        "status":"",
        "schedule_type":"",
        "Loginid":"",
        "days":"",
        "start_session":"",
        "end_session":"",
        "start_session2":"",
        "end_session2":"",
        "start_session3":"",
        "end_session3":"",
        "param1":"",
        "param2":"",
        "condition":"CheckStatus"
        
        }
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
              let options = new RequestOptions({ headers : headers });
      this.http.post(url,body,options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible=false;
        if(res.status_cd == 1){
          this.logindata=res.data.Table;
          for(let i=0;i<this.logindata.length;i++){
           
           let date=this.logindata[i].Logindate.split("T")[0];
           let res= date.split("-")[0];
           let res1= date.split("-")[1];
           let res2= date.split("-")[2];
           this.formatdate=res1+"/"+res2+"/"+res;
           this.logindata[i].Logindate= this.formatdate +" "+ this.logindata[i].Logindate.split("T")[1];
          //  console.log(this.logindata[i].Logindate)
          }
         
           this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
         //console.log("usersdata..."+JSON.stringify(this.usersdata));
        }
        else{
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }
      // err=>{
      // console.log("Token Error:"+err);
      // } 
      // );
 // }

}
