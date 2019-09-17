import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-insurancecatsettingsadd',
  templateUrl: './insurancecatsettingsadd.component.html',
  styleUrls: ['./insurancecatsettingsadd.component.css']
})
export class InsurancecatsettingsaddComponent implements OnInit {
  type: any = [];
  languageoption: any;
  insurtypedata: any = [];
  nullValue: any;
  instype = this.nullValue;
  helthinscat = this.nullValue;
  status = this.nullValue;
  addinscat: FormGroup;

  ValidationMessages = {
    'instype': {
      'required': 'Please select insurance type',
    },
    'helthinscat': {
      'required': 'Please enter insurance category'
    },
    'status': {
      'required': 'Please select status',
    }
  }

  ValidationMessagesarabic = {
    'instype': {
      'required': 'يرجى اختيار نوع التأمين',
    },
    'helthinscat': {
      'required': 'الرجاء إدخال فئة التأمين'
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
    }
  }


  formErrors = {
    'instype': '',
    'helthinscat': '',
    'status': '',
  }

  userid: any = "";
  fromsubmit: boolean;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  language: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;

  constructor(private meta: Meta,
    private router: Router,
    private MainTitle: Title,
    public commonService: UserinfoService,
    public http: Http,
    private fb: FormBuilder
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.commonService.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
      //console.log(this.languageoption);
      this.formErrors = {
        'instype': '',
        'helthinscat': '',
        'status': '',
      }
    })
    this.type = ['test', 'test2', 'test3', 'test4'];
    this.addinscat = this.fb.group({
      instype: ['', Validators.required],
      helthinscat: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.addinscat.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addinscat);
    });
    this.getinsurencetype();
  }

  checkValidationErrors(group: FormGroup = this.addinscat): void {
    // console.log("sdf");
  //  console.log(this.addfollowup.value.docname);
    // if(this.addfollowup.value.docname==""||this.addfollowup.value.docname=="undefined"||this.addfollowup.value.docname==undefined){
    
    // }else{
    // this.chsckdocname(this.addfollowup.value.docname);
    // }
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
         // console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }else{
        const messages = this.ValidationMessagesarabic[key];
        for (const errorKey in abstractControl.errors) {
        //  console.log("errorKey :" + errorKey)
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
     
   checkValidationErrorssubmit(group: FormGroup = this.addinscat): void {
   
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
    
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
      //  alert("test");
      if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
       const messages = this.ValidationMessages[key];
       for (const errorKey in abstractControl.errors) {
       //  console.log("errorKey :" + errorKey)
         if (errorKey) {
           this.formErrors[key] += messages[errorKey] + '';
         }
       }
     }else{
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
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
}


  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  getinsurencetype() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
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
        "LoginId": this.userid,
        "ClinicId": this.userid,
        "BranchId": "",
        "status": "",
        "Condition": "GetInsurancetype",
        "pagecount": ""
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
       // console.log(result);
        if (result.status_cd === "1") {
          this.insurtypedata = result.data.Table;
        //  console.log(this.insurtypedata);
        } else {
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
         // console.log(error);
        }
      );
    // },
    //   err => {
    //     //console.log("Token Error:" + err);
    //   }
    // );
  }

  addinscatsubmit() {
    console.log(this.addinscat.valid)
    if (this.addinscat.valid == false) {
      this.checkValidationErrorssubmit(this.addinscat);
    } else {
      // console.log(this.addinscat.value.instype);
      // console.log(this.addinscat.value.helthinscat);
      // console.log(this.addinscat.value.istatus);
      this.isPageloaderVisible = true;
      // this.commonService.tokenFun().subscribe(tokenResult => {
      //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
       // console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
        let params = {
          "Sno": "",
          "Insurance_Category": this.addinscat.value.instype,
          "Insurance_CompanyID": "",
          "Insurance_CompanyName": "",
          "Insurance_PhoneNo": "",
          "Insurance_EmailID": "",
          "Insurance_Type": this.addinscat.value.helthinscat,
          "Trans_date": "",
          "LoginId": this.userid,
          "ClinicId": this.userid,
          "BranchId": "",
          "status": this.addinscat.value.status,
          "Condition": "InsertCategory",
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
            alert("Inserted Successfully");
            this.router.navigate(['/InsuranceCategoryDetails']);
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
