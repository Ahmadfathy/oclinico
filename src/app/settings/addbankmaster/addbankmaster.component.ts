import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbankmaster',
  templateUrl: './addbankmaster.component.html',
  styleUrls: ['./addbankmaster.component.css']
})
export class AddbankmasterComponent implements OnInit {
  addbankdetails: FormGroup;
  fromsubmit: boolean;
  userid: any;
  nullValue: any;
  bankname = this.nullValue;
  status = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;

  formErrors = {
    'bankname': '',
    'status': ''
  }

  ValidationMessages = {
    'bankname': {
      'required':'Bank name is required',
      'pattern': 'Please Enter Valid Bank Name'
    },
    'status': {
      'required': 'Status is required'
    },
  }

  ValidationarabicMessages = {
    'bankname': {
      'required': 'اسم البنك مطلوب',
      'pattern': 'الرجاء إدخال اسم البنك صالح'
    },
    'status': {
      'required': 'الوضع مطلوب'
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
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    document.title="Add BankMaster"

    this.isPageloaderVisible = false;
    this.addbankdetails = this.formBuilder.group({
      bankname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      status: ['', [Validators.required]],
    })

    this.addbankdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addbankdetails);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.addbankdetails): void {
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
    if (this.addbankdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addbankdetails);

    } else {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Bank_Master_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Bank_Master_Details"
        let params = {
          "Sno": "",
          "Clinic_ID": this.userid,
          "Branchid": this.userid,
          "Bank_ID": "",
          "Bank_Name": this.addbankdetails.value.bankname,
          "Status": this.addbankdetails.value.status,
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
            alert("Bank Details Added Successfully");
            this.router.navigate(['/bankdetails'])
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
    }
  }
}
