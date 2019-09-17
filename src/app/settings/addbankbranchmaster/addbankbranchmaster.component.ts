import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbankbranchmaster',
  templateUrl: './addbankbranchmaster.component.html',
  styleUrls: ['./addbankbranchmaster.component.css']
})
export class AddbankbranchmasterComponent implements OnInit {
  addbankbranchdetails: FormGroup;
  fromsubmit: boolean;
  userid: any;
  banknames: any = [];
  countries: any = [];
  nullValue: any;
  bankname = this.nullValue;
  status = this.nullValue;
  branchname = this.nullValue;
  country = this.nullValue;
  city = this.nullValue;
  swiftcode = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;

  formErrors = {
    'bankname': '',
    'status': '',
    'branchname': '',
    'swiftcode': '',
    'country': '',
    'city': '',
  }

  ValidationMessages = {
    'bankname': {
      'required': 'Bank name is required',
    },
    'status': {
      'required': 'Status is required'
    },
    'branchname': {
      'required': 'Branch name is required'
    },
    'swiftcode': {
      'required': 'Swiftcode is required'
    },
    'country': {
      'required': 'Country is required'
    },
    'city': {
      'required': 'City is required'
    },
  }

  ValidationarabicMessages = {
    'bankname': {
      'required': 'اسم البنك مطلوب',
    },
    'status': {
      'required': 'الوضع مطلوب'
    },
    'branchname': {
      'required': 'اسم الفرع مطلوب'
    },
    'swiftcode': {
      'required': 'مطلوب رمز سويفت'
    },
    'country': {
      'required': 'الدولة مطلوبة'
    },
    'city': {
      'required': 'المدينة مطلوبة'
    },
  }

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId");
    console.log("user language....." + this.langulagetype);
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {

        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'bankname': '',
        'status': '',
        'branchname': '',
        'swiftcode': '',
        'country': '',
        'city': '',
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    document.title="Add Bank BranchMaster"

    this.isPageloaderVisible = false;
 
    this.addbankbranchdetails = this.formBuilder.group({
      bankname: ['', Validators.required],
      status: ['', [Validators.required]],
      branchname: ['', [Validators.required]],
      swiftcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    })

    this.addbankbranchdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addbankbranchdetails);
    });
    this.getbanknames();
    this.getcountry();

  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  getbanknames() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://23.92.209.46/OclinicoAPI/Api/Account/Bank_Branch_Master_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Bank_Branch_Master_Details"
      let params = {
        "Sno": "",
        "Clinic_ID": this.userid,
        "Branchid": "",
        "Bank_ID": "",
        "Bank_Branch_ID": "",
        "Bank_Branch_Name": "",
        "Swift_Code": "",
        "Country": "",
        "City": "",
        "Status": "",
        "LoginID": "",
        "Trans_Date": "",
        "Last_Updated": "",
        "Condition": "GetBankName"
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
          this.banknames = result.data.Table;
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          console.log(error);
        }
      );

  }

  getcountry() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://23.92.209.46/OclinicoAPI/Api/Account/Get_Countries";
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
   
  }

  checkValidationErrors(group: FormGroup = this.addbankbranchdetails): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ValidationarabicMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else { }
        } else {
          console.log('untouched')
        }
      }
      else {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          console.log("entered.....if" + this.langulagetype);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ValidationarabicMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }

          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }

  submit() {

    if (this.addbankbranchdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addbankbranchdetails);
      //return;
    } else {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://23.92.209.46/OclinicoAPI/Api/Account/Bank_Branch_Master_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Bank_Branch_Master_Details"
        let params = {
          "Sno": "",
          "Clinic_ID": this.userid,
          "Branchid": this.userid,
          "Bank_ID": this.addbankbranchdetails.value.bankname,
          "Bank_Branch_ID": "",
          "Bank_Branch_Name": this.addbankbranchdetails.value.branchname,
          "Swift_Code": this.addbankbranchdetails.value.swiftcode,
          "Country": this.addbankbranchdetails.value.country,
          "City": this.addbankbranchdetails.value.city,
          "Status": this.addbankbranchdetails.value.status,
          "LoginID": this.userid,
          "Trans_Date": "",
          "Last_Updated": "",
          "Condition": "Insert"
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
          if (result.status_cd === "1") {
            this.isPageloaderVisible = false;
            alert("Bank Branch Details Added Successfully");
            this.router.navigate(['/bankbranchdetails'])
          } else {
            console.log(result.error_msg);
            console.log(accessToken);
          }
        },
          error => {
            this.isPageloaderVisible = false;
            console.log(error);
          }
        );
    }
  }
}
