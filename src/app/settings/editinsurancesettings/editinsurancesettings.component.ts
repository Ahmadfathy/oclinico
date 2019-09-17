import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editinsurancesettings',
  templateUrl: './editinsurancesettings.component.html',
  styleUrls: ['./editinsurancesettings.component.css']
})
export class EditinsurancesettingsComponent implements OnInit {
  type: any = [];
  insucategory: any = [];
  nullValue: any;
  inscategory = this.nullValue;
  compname = this.nullValue;
  phno = this.nullValue;
  emailid = this.nullValue;
  instype = this.nullValue;
  status = this.nullValue;
  insuranceid: any;
  editinsurance: FormGroup;
  public isPageloaderVisible = true;
  languageoption: any;
  ValidationMessages = {

    'inscategory': {
      'required': 'Please select category',
      'Select': 'Please select category'
    },
    'compname': {
      'required': 'Please enter company name'
    },
    'phno': {
      'required': 'Please enter phone No',
      'maxlength': 'Please enter 10 digits mobile no',
      'minlength': 'Please enter 10 digits mobile no'
    },
    'emailid': {
      'required': 'Please enter email id',
      'email': 'please enter valid email id'
    },
    'instype': {
      'required': 'Please select type',
      'Select': 'Please select type'
    },
    'status': {
      'required': 'Please select status',
      'Select': 'Please select status'
    }
  }

  ValidationMessagesarabic = {

    'inscategory': {
      'required': 'Please select category',
    },
    'compname': {
      'required': 'الرجاء إدخال اسم الشركة'
    },
    'phno': {
      'required': 'الرجاء إدخال رقم الهاتف',
      'maxlength': 'الرجاء إدخال رقم الجوال المكون من 10 أرقام',
      'minlength': 'الرجاء إدخال رقم الجوال المكون من 10 أرقام'
    },
    'emailid': {
      'required': 'الرجاء إدخال معرف البريد الإلكتروني',
      'email': 'الرجاء إدخال معرف بريد إلكتروني صالح'
    },
    'instype': {
      'required': 'الرجاء اختيار النوع',
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
    }
  }


  formErrors = {
    'inscategory': '',
    'compname': '',
    'phno': '',
    'emailid': '',
    'instype': '',
    'status': '',


  }
  userid: any = "";

  constructor(
    private meta: Meta,
    private router: Router,
    public commonService: UserinfoService,
    public http: Http,
    private MainTitle: Title,
    private fb: FormBuilder
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
      this.formErrors = {
        'inscategory': '',
        'compname': '',
        'phno': '',
        'emailid': '',
        'instype': '',
        'status': '',
      }
    })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.insuranceid = currentUrl[currentUrl.length - 1]
   // console.log(this.insuranceid);
    this.type = ['test', 'test2', 'test3', 'test4'];
    this.editinsurance = this.fb.group({
      inscategory: ['', [Validators.required]],
      compname: ['', [Validators.required]],
      phno: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      emailid: ['', [Validators.required, Validators.email]],
      instype: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.editinsurance.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editinsurance);
    });
    this.getinsurancedetails();
    this.getinsurencetegory();
  }
  checkValidationErrors(group: FormGroup = this.editinsurance): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
          //  console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
           // console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
       // console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }
  checkValidationErrorssubmit(group: FormGroup = this.editinsurance): void {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
          //  console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            //console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
      //  console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
  }


  getinsurencetegory() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
      let params = {
        "Sno": "",
        "Insurance_Category": "",
        "Insurance_CompanyID": "",
        "Insurance_CompanyName": "",
        "Insurance_PhoneNo": "",
        "Insurance_EmailID": "",
        "Insurance_Type": "",
        "Trans_date": "",
        "LoginId": "",
        "ClinicId": this.userid,
        "BranchId": "",
        "status": "Active",
        "Condition": "GetInsCategorydropdown",
        "pagecount": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      // this.PArray=[];
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
       // console.log(result);

        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.insucategory = result.data.Table;
          // console.log(this.insucategory);
          // this.editinsurance.patchValue({
          //   inscategory: allValues.catinsurence

          // });
          // console.log(allValues.catinsurence);
        } else {
          this.isPageloaderVisible = false;
          // this.hideLoader=true;
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
        //  console.log(error);
        }
      );
    // },
    //   err => {
    //   //  console.log("Token Error:" + err);
    //   }
    // );
  }


  getinsurancedetails() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);

      // our service calling as usual

      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
      let params = {
        "Sno": this.insuranceid,
        "Insurance_Category": "",
        "Insurance_CompanyID": "",
        "Insurance_CompanyName": "",
        "Insurance_PhoneNo": "",
        "Insurance_EmailID": "",
        "Insurance_Type": "",
        "Trans_date": "",
        "LoginId": this.userid,
        "ClinicId": this.userid,
        "BranchId": "",
        "status": "",
        "Condition": "View",
        "pagecount": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //  console.log(result);
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.editinsurance.patchValue({
            inscategory:result.data.Table[0].Insurance_Category,
            compname: result.data.Table[0].Insurance_CompanyName,
            phno: result.data.Table[0].Insurance_PhoneNo,
            emailid: result.data.Table[0].Insurance_EmailID,
            instype: result.data.Table[0].Insurance_Type,
            status: result.data.Table[0].Status
          });
          // var allValues = {
          //   catinsurence: result.data.Table[0].Insurance_Category,
          // }
          // this.getinsurencetegory(allValues);
        } else {
          this.isPageloaderVisible = false;
          // this.hideLoader=true;
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
          //  this.hideLoader=true;
        //  console.log(error);
        }
      );

    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //   //  console.log("Token Error:" + err);
    //   }
    // );
  }

  editinssubmit() {
    console.log(this.editinsurance.valid)
    if (this.editinsurance.valid == false) {
      this.checkValidationErrorssubmit(this.editinsurance);
    } else {
      // console.log(this.editinsurance.value.inscategory);
      // console.log(this.editinsurance.value.compname);
      // console.log(this.editinsurance.value.phno);
      // console.log(this.editinsurance.value.emailid);
      // console.log(this.editinsurance.value.instype);
      // console.log(this.editinsurance.value.istatus);
      this.isPageloaderVisible = true
      // this.commonService.tokenFun().subscribe(tokenResult => {
      //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
       // console.log(accessToken);
        // our service calling as usual

        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
        let params = {
          "Sno": this.insuranceid,
          "Insurance_Category": this.editinsurance.value.inscategory,
          "Insurance_CompanyID": "",
          "Insurance_CompanyName": this.editinsurance.value.compname,
          "Insurance_PhoneNo": this.editinsurance.value.phno,
          "Insurance_EmailID": this.editinsurance.value.emailid,
          "Insurance_Type": this.editinsurance.value.instype,
          "Trans_date": "",
          "LoginId": this.userid,
          "ClinicId": this.userid,
          "BranchId": "",
          "status": this.editinsurance.value.status,
          "Condition": "Update",
          "pagecount": ""
        }

        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });
        // this.PArray=[];
        this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
         // console.log(result);
          if (result.status_cd === "1") {
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            this.router.navigate(['/InsuranceDetails']);
          } else {
            this.isPageloaderVisible = false;
          }
        },
          error => {
            this.isPageloaderVisible = false;
           // console.log(error);
          }
        );
      // },
      //   err => {
      //     this.isPageloaderVisible = false;
      //    // console.log("Token Error:" + err);
      //   }
      // );
    }
  }
}
