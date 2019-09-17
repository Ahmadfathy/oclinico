import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-edit-paymode-details',
  templateUrl: './fin-edit-paymode-details.component.html',
  styleUrls: ['./fin-edit-paymode-details.component.css']
})
export class FinEditPaymodeDetailsComponent implements OnInit {
  sno: any = "";
  paymentid: any;
  editfinancedetails: FormGroup;
  fromsubmit: boolean;
  userid: any;
  nullValue: any;
  paymode = this.nullValue;
  status = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;

  formErrors = {
    'paymode': '',
    'status': ''
  }

  ValidationMessages = {
    'paymode': {
      'required': 'Pay mode is required',
    },
    'status': {
      'required': 'Status is required'
    },
  }

  ValidationarabicMessages = {
    'paymode': {
      'required': 'مطلوب وضع الدفع',
    },
    'status': {
      'required': 'الوضع مطلوب'
    },
  }

  constructor(public commonService: UserinfoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public http: Http) {

    var currentUrl = document.URL.split('?');
    console.log(currentUrl);
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    console.log(currentUrl);
    this.sno = currentUrl[1];
    console.log(this.sno);
    this.userid = window.localStorage.getItem("userId");
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
        'paymode': '',
        'status': '',
      }
    })
  }

  ngOnInit() {
    this.GetData();
    this.editfinancedetails = this.formBuilder.group({
      paymode: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      status: ['', [Validators.required]],
    })
    this.editfinancedetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.editfinancedetails);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.editfinancedetails): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
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

  Submit() {
    console.log("GetLabdata");
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.commonService.commonUrl + "Account/Paymode_Master_details"
      var params = {
        "Sno": this.sno,
        "Paymodetype_ID": this.paymentid,
        "Paymodetype_Name": this.editfinancedetails.value.paymode,
        "Status": this.editfinancedetails.value.status,
        "Trans_date": "",
        "Loginid": this.userid,
        "Clinicid": this.userid,
        "Condition": "Update"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)

        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          alert("Updated Successfully");
          console.log(result.data.Table)
          this.router.navigate(['/MainFinanceDetail']);
        } else {
          this.isPageloaderVisible = false;
        }
      },
      );
      error => {
        this.isPageloaderVisible = false;
      }
  }

  GetData() {
    console.log("Getdata");
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.commonService.commonUrl + "Account/Paymode_Master_details"
      var params = {
        "Sno": this.sno,
        "Paymodetype_ID": "",
        "Paymodetype_Name": "",
        "Status": "",
        "Trans_date": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "Condition": "GetData"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          console.log(result.data.Table)
          this.editfinancedetails.patchValue({
            paymode: result.data.Table[0].Paymodetype_Name,
            status: result.data.Table[0].Status,
            paymentid: result.data.Table[0].Paymodetype_Name
          })
        } else {
          this.isPageloaderVisible = false;
          console.log("please try again later");
        }
      },
      );
      error => {
        this.isPageloaderVisible = false;
        console.log(error);
      }
  }
}
