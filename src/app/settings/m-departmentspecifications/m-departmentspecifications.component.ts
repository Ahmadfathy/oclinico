import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-m-departmentspecifications',
  templateUrl: './m-departmentspecifications.component.html',
  styleUrls: ['./m-departmentspecifications.component.css']
})
export class MDepartmentspecificationsComponent implements OnInit {
  deptdetails = [];
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
    document.title="Specialization Details"

    this.userid =  window.localStorage.getItem("userId")
    
    this.getspecficdetails();
  }
  getspecficdetails(){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
     

    
      // let serviceUrl=" http://23.92.209.46/OclinicoAPI/Api/Account/Departments_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/Departments_Details"
      let params = {
       
        "Sno":"",
      "clinicid":this.userid,       
      "BranchID":"",      
      "DeptID":"",        
      "DeptName":"",
      "Status":"", 
      "LoginID":"",
      "Trans_Date":"", 
      "Last_update":"",
      "Condition":"GetspecializationData" 

              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                this.isPageloaderVisible = false;
                if(result.status_cd === "1"){
                  
                  this.deptdetails = result.data.Table;
                  this.chRef.detectChanges();
                  const table: any = $('table');
                  this.dataTable = table.DataTable({});
                
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
               // console.log(error);
              
              }
              );
  
     
  }
}
