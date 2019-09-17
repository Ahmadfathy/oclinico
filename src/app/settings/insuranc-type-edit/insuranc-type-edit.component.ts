import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-insuranc-type-edit',
  templateUrl: './insuranc-type-edit.component.html',
  styleUrls: ['./insuranc-type-edit.component.css']
})
export class InsurancTypeEditComponent implements OnInit {
  nullValue: any;
  instype = this.nullValue;
  status = this.nullValue;
  editinstype: FormGroup;
  insidtype: any;
  fromsubmit: boolean;
  language: any;
  userid: any = "";
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
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
    this.userid = window.localStorage.getItem("userId")
    // this.sno = window.sessionStorage.getItem("Sno");
    // console.log(this.sno);
   // console.log("user language....." + this.langulagetype);
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {

        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'instype': '',
        'status': '',
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.insidtype = currentUrl[currentUrl.length - 1]
   // console.log(this.insidtype);
    this.editinstype = this.fb.group({
      instype: ['', Validators.required],
      status: ['', [Validators.required]],
    })
    this.editinstype.valueChanges.subscribe((data) => {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editinstype);
    });
    this.getinsurancetypedetails();
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
    }
  }


  checkValidationErrors(group: FormGroup = this.editinstype): void {
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
      }else if (this.langulagetype == "AR"){
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
     checkValidationErrorssubmit(group: FormGroup = this.editinstype): void {
   
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
        }else if (this.langulagetype == "AR"){
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
           //console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   } 


  getinsurancetypedetails() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
      let params = {
        "Sno": this.insidtype,
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
        "Condition": "Instypebyid",
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
          this.isPageloaderVisible = false;
          this.editinstype.patchValue({
            instype: result.data.Table[0].Type_Name,
            status: result.data.Table[0].Status,
          });

        } else {
          this.isPageloaderVisible = false;
          // console.log(result.error_msg);
          // console.log(accessToken);

        }
      },
        error => {
          this.isPageloaderVisible = false;
         //console.log(error);
        }
      );

    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //    // console.log("Token Error:" + err);
    //   }
    // );
  }

  addinstypesubmit() {
    console.log(this.editinstype.valid)
    if (this.editinstype.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrorssubmit(this.editinstype);
    } else {
      // console.log(this.editinstype.value.instype);
      // console.log(this.editinstype.value.istatus);
      // this.commonService.tokenFun().subscribe(tokenResult => {
      //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
       // console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
        let params = {
          "Sno": this.insidtype,
          "Insurance_Category": "",
          "Insurance_CompanyID": "",
          "Insurance_CompanyName": "",
          "Insurance_PhoneNo": "",
          "Insurance_EmailID": "",
          "Insurance_Type": this.editinstype.value.instype,
          "Trans_date": "",
          "LoginId": this.userid,
          "ClinicId": this.userid,
          "BranchId": "",
          "status": this.editinstype.value.status,
          "Condition": "Instype_Update",
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
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            this.router.navigate(['/insuranceType']);

          } else {
            this.isPageloaderVisible = false;
            // console.log(result.error_msg);
            // console.log(accessToken);
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
