import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-insurancecatsettingsedit',
  templateUrl: './insurancecatsettingsedit.component.html',
  styleUrls: ['./insurancecatsettingsedit.component.css']
})
export class InsurancecatsettingseditComponent implements OnInit {

  type: any = [];
  languageoption: any;
  insurtypedata: any = [];
  inscatedetails = [];
  nullValue: any;
  instype = this.nullValue;
  helthinscat = this.nullValue;
  status = this.nullValue;
  insurancecatid: any;
  editinscat: FormGroup;
  select: string = 'select'
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
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;

  constructor(private meta: Meta,
    private router: Router,
    private MainTitle: Title,
    private fb: FormBuilder,
    public commonService: UserinfoService,
    public http: Http) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
      this.formErrors = {
        'instype': '',
        'helthinscat': '',
        'status': '',
      }
    })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.insurancecatid = currentUrl[currentUrl.length - 1]
   // console.log(this.insurancecatid);
    this.editinscat = this.fb.group({
      instype: ['', Validators.required],
      helthinscat: ['', Validators.required],
      status: ['', Validators.required],

    });

    this.editinscat.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editinscat);
    });
    this.getinsurancecat();
    this.getinsurencetype();
  }


  checkValidationErrors(group: FormGroup = this.editinscat): void {
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
          //console.log("errorKey :" + errorKey)
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
     
   checkValidationErrorssubmit(group: FormGroup = this.editinscat): void {
   
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

  get f() {
    return this.editinscat.controls;
  }


  getinsurancecat() {
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
      let params = {
        "Sno": this.insurancecatid,
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
        "Condition": "GetInsuranceCategory",
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
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          
          this.editinscat.patchValue({
            helthinscat: result.data.Table[0].Category_Name,
            status: result.data.Table[0].Status,
            instype: result.data.Table[0].InsuType
          });
        } else {
          this.isPageloaderVisible = false;
        }
      },
        error => {
          this.isPageloaderVisible = false;
         // console.log(error);
        }
      );
   
  }

  getinsurencetype() {
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
        } else {
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
        //  console.log(error);
        }
      );
   
  }

  editinscatsubmit() {
   // console.log(this.editinscat.valid)
    if (this.editinscat.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrorssubmit(this.editinscat);
    } else {
    
      this.isPageloaderVisible = true;
      var accessToken=window.localStorage.Tokenval;
      //  console.log(accessToken);
       
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_transactions";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_transactions"
        let params = {
          "Sno": this.insurancecatid,
          "Insurance_Category": this.editinscat.value.instype,
          "Insurance_CompanyID": "",
          "Insurance_CompanyName": "",
          "Insurance_PhoneNo": "",
          "Insurance_EmailID": "",
          "Insurance_Type": this.editinscat.value.helthinscat,
          "Trans_date": "",
          "LoginId": this.userid,
          "ClinicId": this.userid,
          "BranchId": "",
          "status": this.editinscat.value.status,
          "Condition": "Inscategory_Update",
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
        //  console.log(result);
          if (result.status_cd === "1") {
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            this.router.navigate(['/InsuranceCategoryDetails']);
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
     
    }
  }
}