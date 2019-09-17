import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {
  userid: any="";
  table=[];
  showdata:boolean=false;
  showLoader:boolean = true;
  nodata:boolean;
  dataTable: any;
  public showpagenation: boolean = false;
  patientId: string;
  patient_name:any;
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    document.title="Communications"
    this.userid =  window.localStorage.getItem("userId")
    this.patientId=localStorage.getItem('patientId')
    this.getdata()
    this.showdata = false;
    this.nodata=true
    this.showpagenation = true;
  }

  getdata(){
    var accessToken = window.localStorage.Tokenval ;
    var url = this.cmn.commonUrl+"Account/Patient_Letters"
    let body= { 
      "Sno":"",
      "Clinicid":this.userid,
      "Branchid":"10008",
      "Loginid":this.userid,
      "LetterID":"",
      "Patientid":"000100",
      "Description":"",
      "Trans_date":"",
      "condition":"GetCommunications",
      "doctorid":""
      
          }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

    this.http.post(url,body,options).map(res =>res.json()).subscribe(result =>{
      if(result.status_cd == "0"){
        this.showLoader = false;
            this.showdata = false;
            this.nodata = true;
            this.showpagenation=false;  
            $('#dataTable_wrapper').hide();
      }
      else{
        this.showLoader = false;
            this.table = result.data.Table;
            //console.log(this.table)
                this.showdata = true;  
                this.nodata = false;
                this.showpagenation=true;
                this.chRef.detectChanges();
                $('#dataTable_wrapper').show();
                const table1 : any = $('#dataTable');
                this.dataTable = table1.DataTable(); 
      }

    })
          err=>{
          }
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
