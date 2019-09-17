import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-insuranc-type-add',
  templateUrl: './insuranc-type-add.component.html',
  styleUrls: ['./insuranc-type-add.component.css']
})
export class InsurancTypeAddComponent implements OnInit {
  nullValue: any;
  instype = this.nullValue;
  status = this.nullValue;
  addinstype: FormGroup;
  languageoption: any;
  fromsubmit: boolean;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  language: any;
  // public langulagetype: any;
  userid: any = "";
  public isPageloaderVisible = true;
  ValidationMessages = {
    'instype': {
      'required': 'Please select insurance type'
    },
    'status': {
      'required': 'Please select status',
    }
  }
  ValidationMessagesarabic = {
    'instype': {
      'required': 'يرجى اختيار نوع التأمين'
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
    }
  }
  formErrors = {
    'instype': '',
    'status': '',
  }

  constructor(private meta: Meta,
    private router: Router,
    private MainTitle: Title,
    public commonService: UserinfoService,
    public http: Http,
    private fb: FormBuilder) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      this.formErrors = {
        'instype': '',
        'status': '',
      }
    })

    this.addinstype = this.fb.group({
      instype: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.addinstype.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addinstype);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }
  checkValidationErrors(group: FormGroup = this.addinstype): void {
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
     checkValidationErrorssubmit(group: FormGroup = this.addinstype): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
         if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
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
  

  addinstypesubmit() {
    console.log(this.addinstype.valid)
    if (this.addinstype.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrorssubmit(this.addinstype);

    } else {
      // console.log(this.addinstype.value.instype);
      // console.log(this.addinstype.value.status);
      this.isPageloaderVisible = true;
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
          "Insurance_Type": this.addinstype.value.instype,
          "Trans_date": "",
          "LoginId": this.userid,
          "ClinicId": this.userid,
          "BranchId": "",
          "status": this.addinstype.value.status,
          "Condition": "Inserttype",
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
            alert("Added Successfully");
            this.router.navigate(['/insuranceType']);
          } else {
            this.isPageloaderVisible = false;
            // console.log(result.error_msg);
            // console.log(accessToken);
          }
        },
          error => {
            this.isPageloaderVisible = false;
          //  console.log(error);
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
