import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import { UserinfoService } from '../../userinfo.service'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-fee-add',
  templateUrl: './doctor-fee-add.component.html',
  styleUrls: ['./doctor-fee-add.component.css']
})
export class DoctorFeeAddComponent implements OnInit {

  val: any = "test";
  userid: any = "";
  docfeedata: any[];
  dataTable: any = [];
  doctorfee: FormGroup;
usercreationid:any;
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,
    public router: Router, public https: Http,
    public commonService: UserinfoService,
    public fb: FormBuilder) { }

  ngOnInit() {
    document.title = "Add doctorfee"
    this.userid = window.localStorage.getItem("userId")
    this.doctorfee = this.fb.group({
      doctors: new FormArray([])
    });

   

    this.doctorfee.valueChanges.subscribe((data) => {
          console.log(data);
    })

    
    this.usercreationid=  window.localStorage.getItem("eachuserid");
    if( this.usercreationid==""|| this.usercreationid=="undefined"|| this.usercreationid==undefined|| this.usercreationid=="null"|| this.usercreationid==null){
      this.usercreationid="";
    }else{
      this.usercreationid=  window.localStorage.getItem("eachuserid");
    }
    console.log(this.usercreationid);
    //alert(this.usercreationid);
    this.getdocnames(this.usercreationid);
  }

  getdocnames(docid) {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    //  console.log(accessToken);


    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Doctore_Fee_Details";
    let serviceUrl = this.commonService.commonUrl + "Account/Doctore_Fee_Details"
    let params = {
      "Sno": "",
      "clinicid": this.userid,     
      "branchid": "",
      "loginid": this.userid,
      "docid":docid,
      "app_ID": "",
      "pay_Fee": "",
      "status": "",
      "date": "",
      "condition": "select"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      // console.log(result.data.Table);
      this.isPageloaderVisible = false;
      if (result.status_cd === "1") {
        this.docfeedata = result.data.Table;
        console.log(this.docfeedata);
        let rows = <FormArray>this.doctorfee.get('doctors');
        this.docfeedata.forEach(data => {
          rows.push(this.fb.group({
            doctornamecheck: [],
            doctorname: data.Doctor_Name,
            doctorid: data.Doctor_ID,
            firstapp: [],
            standardapp: [],
            firstappid:data.First_Appointment,
            secondappid:data.Standard_Appointment
          }));
        })

      } else {
        alert("No doctors available please add doctors")
        this.router.navigate(['/Doctorfee']);
        // this.hideLoader=true;
        // console.log(result.error_msg);
        // console.log(accessToken);

      }
    },
      error => {
        this.isPageloaderVisible = false;
        //  this.hideLoader=true;
        console.log(error);
        //  console.log(accessToken);
        //   alert(error)
      }
    );

    //   },
    //   err=>{
    //     this.isPageloaderVisible = false;
    // //  console.log("Token Error:"+err);
    //   }

    //   );
  }
  // selcatvalue(val ,index){
  //  console.log(val);
  //  console.log(index);
  // }
  get formData() { return <FormArray>this.doctorfee.get('doctors'); }
  Submit() {
    var fee;
    var id;
    var appid;
    let doctrfee=[];
    let doctid=[];

    console.log(this.doctorfee.value);
    for (let i = 0; i < this.doctorfee.value.doctors.length; i++) {

   
      if (this.doctorfee.value.doctors[i].doctornamecheck == true) {
        console.log(this.doctorfee.value.doctors[i].firstapp + ';' + this.doctorfee.value.doctors[i].standardapp)
         fee = this.doctorfee.value.doctors[i].firstapp + ';' + this.doctorfee.value.doctors[i].standardapp;
         id = this.doctorfee.value.doctors[i].doctorid;
         appid = this.doctorfee.value.doctors[0].firstappid+','+this.doctorfee.value.doctors[0].secondappid;
         doctrfee.push(fee);
         doctid.push(id);
         console.log(doctrfee);
         console.log(doctid);
      } else {
        console.log('else')
      }
      
    
      console.log(doctrfee.toString());
      console.log(doctid.toString());
      console.log(appid)
    }


    this.isPageloaderVisible = false;

    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Doctore_Fee_Details"
    let params = {
      "Sno": "",
      "clinicid": this.userid,
      "branchid": "", 
      "loginid": this.userid,
      "docid": doctid.toString(),
      "app_ID": appid,
      "pay_Fee": doctrfee.toString(),
      "status": "Active",
      "date": "",
      "condition": "Insert"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.https.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      // console.log(result.data.Table);
      this.isPageloaderVisible = false;
      if (result.status_cd === "1") {
        alert("Doctor fee  inserted sucessfully");
        window.localStorage.setItem("eachuserid","");
        this.router.navigate(['/Doctorfee']);
      } else {
        // this.hideLoader=true;
        // console.log(result.error_msg);
        // console.log(accessToken);
        
      }
    },
      error => {
        this.isPageloaderVisible = false;
        //  this.hideLoader=true;
        console.log(error);
        //  console.log(accessToken);
        //   alert(error)
      }
    );
  }

  Cancle(){
    // alert("test");
    this.router.navigate(['/Doctorfee']);
    window.localStorage.setItem("eachuserid","");
  }
}
