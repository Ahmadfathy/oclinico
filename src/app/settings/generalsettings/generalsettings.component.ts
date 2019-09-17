import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare const google: any;
@Component({
  selector: 'app-generalsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css']
})
export class GeneralsettingsComponent implements OnInit {
  viewgeneral: FormGroup;
  userid: any;
  mapsurl: any;
  myForm: FormGroup;
  public isPageloaderVisible = true;
  langulagetype: any = 'EN';
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  language: any;
  alertcount: any = [];
  fromvalue: any;
  business_image: any;
  nin_image: any;
  muncipal_image: any;
  imageres: any;
  imageres1: any;
  imageres2: any
  finalimage: any;
  clinicname: any;
  spec: any;
  inenglish1: any;
  inenglish2: any;
  inenglish3: any;
  inarabic1: any;
  inarabic2: any;
  inarabic3: any;
  website: any;
  email: any;
  comemail: any;
  phno: any;
  mobile: any;
  clinicno: any;
  address: any;
  city: any;
  country: any;
  businessno: any;
  nationalno: any;
  muncipalno: any;
  vatno: any;
  url: any;
  firstapp: any;
  standapp: any;
  scheduletypeinput: any;
  timingsarray: any = [];
  daysarray: any = [];
  sessionarray: any = [];
  public timingsdaysif: boolean = false;
  public timingsif: boolean = false;
  public notimings: boolean = false;
  // frompage: any;
  tabshide: boolean = true;
  countries: any = [];
  dayorsessionval: any;
  constructor(public formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public sanitizer: DomSanitizer,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {
        this.langulagetype = this.languageoption;
      }
    })
    // var currentUrl = document.URL.split('?');
    // console.log(currentUrl);
    // currentUrl = currentUrl[currentUrl.length - 1].split('=');
    // console.log(currentUrl);
    // this.frompage = currentUrl[1];
    // console.log(this.frompage);
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.getcountry();
    this.getdata();
    // if(this.frompage == "settings" || this.frompage == "clinicinfo"){
    //   this.hidebutton = false;
    // }else{
    //   this.hidebutton = true;
    // }
  }

  getdata() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl + "Account/GetUser"
      let params = {
        "text": "getClinicDetails",
        "id": this.userid,
        "param1": "",
        "param2": ""
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      console.log(params);
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        if (result.status_cd == "1") {
          this.business_image = result.data.Table[0].Business_Identification;
          this.nin_image = result.data.Table[0].National_Identification;
          this.muncipal_image = result.data.Table[0].Municipal_licence;
          this.clinicname = result.data.Table[0].Clinic_Name,
            this.spec = result.data.Table[0].Specialization,
            this.inenglish1 = result.data.Table[0].First_Name,
            this.inenglish2 = result.data.Table[0].middle_Name,
            this.inenglish3 = result.data.Table[0].Last_Name,
            this.inarabic1 = result.data.Table[0].Arafirst_Name,
            this.inarabic2 = result.data.Table[0].Aralast_Name,
            this.inarabic3 = result.data.Table[0].Ara_Fathername,
            this.website = result.data.Table[0].Website,
            this.email = result.data.Table[0].Email,
            this.comemail = result.data.Table[0].Communicationemailid,
            this.phno = result.data.Table[0].phoneno,
            this.mobile = result.data.Table[0].mobileno,
            this.clinicno = result.data.Table[0].Clinicno,
            this.address = result.data.Table[0].Address,
            this.city = result.data.Table[0].city,
            this.country = result.data.Table[0].Country_Name,
            this.businessno = result.data.Table[0].Business_Identificationno,
            this.nationalno = result.data.Table[0].National_Identifuicationno,
            this.muncipalno = result.data.Table[0].Municipal_licenceno,
            this.vatno = result.data.Table[0].VAT_No,
            this.url = result.data.Table[0].Map_url,
            this.firstapp = result.data.Table[0].Slot_First,
            this.standapp = result.data.Table[0].Slt_standard,
            this.scheduletypeinput = result.data.Table[0].timetype,
            this.mapsurl = result.data.Table[0].Map_url;
            this.timingsarray = result.data.Table1;

          console.log("Schedule type... " + this.scheduletypeinput);

          for (var i = 0; i < this.timingsarray.length; i++) {
            if (this.timingsarray[i].schduletype == "Day Wise") {
              let temp = {
                'days': this.timingsarray[i].Days,
                'starttime': this.timingsarray[i].starttime,
                'endtime': this.timingsarray[i].endtime,
                'starttimeformat': this.timingsarray[i].starttimeformat,
                'endtimeformat': this.timingsarray[i].endtimeformat
              }
              this.daysarray.push(temp);
            }
            else if (this.timingsarray[i].schduletype == "Session Wise") {
              let temp1 = {
                'days': this.timingsarray[i].Days,
                'starttime': this.timingsarray[i].starttime,
                'endtime': this.timingsarray[i].endtime,
                'starttimeformat': this.timingsarray[i].starttimeformat,
                'endtimeformat': this.timingsarray[i].endtimeformat,
                'sesstarttime': this.timingsarray[i].Sesstarttime,
                'sesendtime': this.timingsarray[i].Sesendtime,
                'sesstarttimeformat': this.timingsarray[i].Sesstarttimeformat,
                'sesendtimeformat': this.timingsarray[i].Sesendtimeformat
              }
              this.sessionarray.push(temp1)
            }
          }

          console.log("Days Array.. " + JSON.stringify(this.daysarray));
          console.log("Session Array.. " + JSON.stringify(this.sessionarray));

          for(var i = 0; i < this.timingsarray.length; i++){
            if (this.timingsarray[i].schduletype == "Day Wise") {
              console.log("schedule type.. " + this.timingsarray[i].schduletype);
              this.timingsdaysif=true;
              this.timingsif=false;
            }
            else{
              this.timingsif=true;
              this.timingsdaysif=false;
            }
          }
          // if(this.scheduletypeinput == "Day Wise"){
          //   this.timingsdaysif=true;
          //   this.timingsif=false;
          // }
          // else if(this.scheduletypeinput == ""){
          //   this.timingsif=false;
          //  this.timingsdaysif=false;
          // }
          // else if(this.scheduletypeinput == "Session Wise"){
          //   this.timingsdaysif=false;
          //   this.timingsif=true
          // }
          // else{
          //   this.timingsdaysif = true;
          //   this.timingsif = false;
          // }
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          console.log(error);
        }
      );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

  edit() {
    this.router.navigate([('/editgeneralsettings')]);
  }

  selectwise(val) {
    this.dayorsessionval = val;
    if (val == "Day Wise") {
      console.log(val);
      this.timingsdaysif = true;
      this.timingsif = false;
    }
    else if (val == "Session Wise") {
      console.log(val);
      this.timingsdaysif = false;
      this.timingsif = true;
    }
  }

  getcountry() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Get_Countries";
      let serviceUrl = this.commonService.commonUrl + "Account/Get_Countries"
      let params = {

      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      console.log(params);
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        if (result.status_cd == "1") {
          this.countries = result.data.Table;
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          console.log(error);
        }
      );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
  }
}
