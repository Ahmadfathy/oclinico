import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-viewbranch',
  templateUrl: './viewbranch.component.html',
  styleUrls: ['./viewbranch.component.css']
})
export class ViewbranchComponent implements OnInit {
  display_type: any;
  bid: any;
  memtype: any;
  userid: any;
  viewbranch: FormGroup;
  countries: any = [];
  mapsurl: any;
  branchname: any;
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
  fromtime: any;
  scheduletypeinput: any;
  password: any;
  langulagetype: any = 'EN';
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  language: any;
  // business_image: any;
  // nin_image: any;
  // muncipal_image: any;
  // imageres: any;
  // imageres1: any;
  // imageres2: any
  // finalimage: any;
  disabled: true;
  branchnames: any = [];
  business_image: any;
  national_image: any;
  muncipal_image: any;
  imageres1: any;
  imageres2: any;
  imageres3: any
  arabicname: any;
  editdiv: boolean = false;
  viewdiv: boolean = false;
  public isPageloaderVisible = true;
  timingsarray: any = [];
  public timingsdaysif: boolean = false;
  public timingsif: boolean = false;
  dayorsessionval: any;
  daysarray: any=[];
  sessionarray: any = [];
  scheduletype: any;

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId")
    this.bid = window.sessionStorage.getItem("branchid");
    this.commonService.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {
        this.langulagetype = this.languageoption;
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    this.viewdetails();
  }

  viewdetails() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Getdata_By_Id";
      let serviceUrl = this.commonService.commonUrl + "Account/Getdata_By_Id"
      let params = {
        "operation": "getBranchDetails",
        "value": this.userid,
        "uid": this.bid
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          // this.viewbranch.patchValue({
          this.branchname = result.data.Table[0].Branch_Name,
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
            this.scheduletype = result.data.Table[0].timetype,
            this.password = result.data.Table[0].Pwd,
            this.timingsarray = result.data.Table1;

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

          this.scheduletypeinput = result.data.Table[0].timetype.split(',');
          console.log("type.. " + this.scheduletypeinput);
          if (this.scheduletypeinput == "Day Wise") {
            this.timingsdaysif = true;
            this.timingsif = false;
          }
          else if (this.scheduletypeinput == "") {
            this.timingsif = false;
            this.timingsdaysif = false;
          }
          else if (this.scheduletypeinput == "Session Wise") {
            this.timingsdaysif = false;
            this.timingsif = true;
          }
          // else if (this.scheduletypeinput == "Session Wise,Day Wise" || this.scheduletypeinput == "Day Wise,Session Wise") {
          //   this.timingsdaysif = true;
          //   this.timingsif = false;
          // }
          else if (this.scheduletypeinput == null) {
            this.timingsdaysif = false;
            this.timingsif = false;
          }
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
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
}
