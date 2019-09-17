import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {
  userid: any="";
  table=[];
  showdata:boolean=false;
  showLoader:boolean = true;
  nodata:boolean;
  dataTable: any;
  public showpagenation: boolean = false;
  patientId: string;
  patient_name:any;
  constructor(private http:Http, 
    private cmn:UserinfoService,
    public router : Router,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    document.title="Laboratory Details"
    this.userid =  window.localStorage.getItem("userId")
    this.getdata()
    this.showdata = false;
    this.nodata=true
    this.showpagenation = true;

    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]

  
  }
  getdata(){
    // this.cmn.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;
     // console.log(accessToken);
     
      // our service calling as usual
      var url = this.cmn.commonUrl+"Account/LabDetails_Transactions"
let body={ 
  "Sno":"", 
  "Patient_Id":"000137",
  "Report_Id":"",
  "Attachment_url":"",
  "Trans_Date":"",
  "Loginid":"",
  "Clinicid":"10008",
  "branchid":"",
  "operation":"GetPatientLabDetails"
  
  }
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: accessToken
  });
  let options = new RequestOptions({ headers: headers });

this.http.post(url,body,options).map(res =>res.json()).subscribe(result =>{
 // console.log(result)
  if(result.status_cd == "0"){
    this.showLoader = false;
        this.showdata = false;
         this.nodata = false;
         this.showpagenation=false;  
         $('#dataTable_wrapper').hide();
  }
  else{
    this.showLoader = false;
         this.table = result.data.Table;
        // console.log(this.table)
             this.showdata = true;  
            this.nodata = true;
             this.showpagenation=true;
             this.chRef.detectChanges();
             $('#dataTable_wrapper').show();
             const table1 : any = $('#dataTable');
             this.dataTable = table1.DataTable(); 
  }


})

      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
  }
  // viewpatient(){
    
  //   var url = document.URL
  //   var url1 = url.split('?')
  //   var patientid = url1[1].split('=')[1]
    
  //   this.router.navigate(['/viewpatient'],{ queryParams: { patientid} });
  // }
  tretement(){
    
    var url = document.URL
    var url1 = url.split('?')
    var patientid = url1[1].split('=')[1]
    
    this.router.navigate(['/treatmentnote'],{ queryParams: { patientid} });
  }
  viewpatient(){
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
  }
  lab(){
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
  }
}
