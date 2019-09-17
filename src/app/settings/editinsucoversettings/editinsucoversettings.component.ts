import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editinsucoversettings',
  templateUrl: './editinsucoversettings.component.html',
  styleUrls: ['./editinsucoversettings.component.css']
})
export class EditinsucoversettingsComponent implements OnInit {
  type: any = [];
  insurencecompnames: any = [];
  rdtype: any = [];
  nullValue: any;
  compname = this.nullValue;
  instype = this.nullValue;
  incname = this.nullValue;
  covepercen = this.nullValue;
  inscoverid: any;
  typenames: any = [];
  typevalid: any;
  selectedtype: any;
  editinsurancecover: FormGroup;
  select: string = 'Select';
  languageoption:any;
  public isPageloaderVisible = true;

  ValidationMessages = {
    'compname': {
      'required': 'Please select company name',
    },
    'instype': {
      'required': 'Please select type',
    },
    'incname': {
      'required': 'Please select name',
    },
    'covepercen': {
      'required': 'Please enter coverage percentage',
    }

  }
  ValidationMessagesarabic = {

    'compname': {
      'required': 'Please select company name'
    },
    'instype': {
      'required':'الرجاء اختيار النوع',
    },
    'incname': {
      'required': 'الرجاء اختيار الاسم',
    },
    'covepercen': {
      'required': 'Please enter coverage percentage',
    }
  }

  formErrors = {
    'compname': '',
    'instype': '',
    'incname': '',
    'covepercen': '',
  }
  userid: any = "";
  langulagetype: string;
  language: string;
  fromsubmit: boolean;

  constructor(private meta: Meta,
    private router: Router,
    public commonService: UserinfoService,
    public http: Http,
    private MainTitle: Title,
    private fb: FormBuilder) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    this.isPageloaderVisible = false;
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
     this. formErrors = {
      'compname': '',
      'instype': '',
      'incname': '',
      'covepercen': '',
      }
  })
    this.userid = window.localStorage.getItem("userId")
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.inscoverid = currentUrl[currentUrl.length - 1]
    console.log(this.inscoverid);
    this.editinsurancecover = this.fb.group({
      compname: ['', [Validators.required]],
      instype: ['', [Validators.required]],
      incname: ['', [Validators.required]],
      covepercen: ['', [Validators.required]],
    });

    this.editinsurancecover.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editinsurancecover);
    });

    this.rdtype = [
      {
        typeval: "Appointment",
        typename: "Appointment",
      },
      {
        typeval: "Treatment",
        typename: "Treatment",
      },
      {
        typeval: "Service",
        typename: "Service",
      },
      {
        typeval: "Product",
        typename: "Product",
      }
    ];
    this.bindinscoveragedata();
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  

  checkValidationErrors(group: FormGroup = this.editinsurancecover): void {
    // console.log("sdf");
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         
       if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
         const messages = this.ValidationMessages[key];
         for (const errorKey in abstractControl.errors) {
        //   console.log("errorKey :" + errorKey)
           if (errorKey) {
             this.formErrors[key] += messages[errorKey] + '';
           }
         }
       }else{
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
          // console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.editinsurancecover): void {
   
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
           //  console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
         }
   
   
   
         
           
         }
   
         if (abstractControl instanceof FormGroup) {
        //   console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }

  get f() {
    return this.editinsurancecover.controls;
  }

  typechange(event) {
  //  console.log(event.target.value);
    var str = event.target.value;
    this.typevalid = str.split(":")[1];
  //  console.log(this.typevalid);
    this.gettypenames(this.typevalid, "");
  }

  gettypenames(typename, allValues) {
    this.selectedtype = typename.trim();
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);

      //  let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/CL_Referral_Discount_Details";
      let params = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branch_ID": "",
        "Loginid": "",
        "Referral_Dis_ID": "",
        "Referral_ID": "",
        "Service_ID": "",
        "Disc_Per": "",
        "Status": "",
        "Trans_Date": "",
        "pagecount": "",
        "Condition": "GetTypes",
        "Type": this.selectedtype
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.typenames = [];
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.typenames = result.data.Table;
          this.editinsurancecover.patchValue({
            incname: allValues.incnameval
          });
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
          //  this.hideLoader=true;
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

  getcomponyname(aval) {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
   //   console.log(accessToken);
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
        "Condition": "Get_Data1",
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
          this.insurencecompnames = result.data.Table;
          console.log(this.insurencecompnames);
          this.editinsurancecover.patchValue({
            compname: aval.compnameval,
          });
          console.log(this.editinsurancecover.value.compname);
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
          console.log(error);
          //  console.log(accessToken);
          //   alert(error)
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
  }


  bindinscoveragedata() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_Coverage_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Insurance_Coverage_Details"

      let params = {
        "Sno": this.inscoverid,
        "Clinic_ID": this.userid,
        "Branch_ID": "",
        "Login_ID": "",
        "Insurance_Coverage_ID": "",
        "Insurance_CompanyID": "",
        "Service_Type": "",
        "Coverage_Per": "",
        "Status": "",
        "Trans_Date": "",
        "Last_UpdatedDate": "",
        "pagecount": "",
        "Condition": "GetData",
        "Type": ""
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
          this.editinsurancecover.patchValue({
            covepercen: result.data.Table[0].Coverage_Per,
            instype: result.data.Table[0].Type,
            //  'compname': '',
            // 'instype': '',
            // 'incname': '',
            // 'covepercen':
            // compname:result.data.Table[0].Insurance_CompanyID,
            // incname: result.data.Table[0].Name,
          });
          var allValues = {
            compnameval: result.data.Table[0].Insurance_CompanyID,
            instypeval: result.data.Table[0].Type,
            incnameval: result.data.Table[0].Service_Type.trim(),
          }
          this.getcomponyname(allValues);
          this.gettypenames(result.data.Table[0].Type, allValues);
          // console.log(result.data.Table[0].Insurance_CompanyID);
          // console.log(result.data.Table[0].Type);
          // console.log(result.data.Table[0].Service_ID);
          // console.log(result.data.Table[0].Coverage_Per);
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

  editinscoversubmit() {
   // console.log(this.editinsurancecover.valid)
    if (this.editinsurancecover.valid == false) {
      this.fromsubmit = true;
      this.checkValidationErrorssubmit(this.editinsurancecover);
    } else {
      // console.log(this.editinsurancecover.value.compname);
      // console.log(this.editinsurancecover.value.instype);
      // console.log(this.editinsurancecover.value.incname);
      // console.log(this.editinsurancecover.value.covepercen);
      this.isPageloaderVisible=true;
      // this.commonService.tokenFun().subscribe(tokenResult => {
      //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

      var accessToken=window.localStorage.Tokenval;
       // console.log(accessToken);

        // our service calling as usual

        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_Coverage_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_Coverage_Details"
        let params = {
          "Sno": this.inscoverid,
          "Clinic_ID": this.userid,
          "Branch_ID": this.userid,
          "Login_ID": this.userid,
          "Insurance_Coverage_ID": "",
          "Insurance_CompanyID": this.editinsurancecover.value.compname,
          "Service_Type": this.editinsurancecover.value.incname,
          "Coverage_Per": this.editinsurancecover.value.covepercen,
          "Status": "Active",
          "Trans_Date": "",
          "Last_UpdatedDate": "",
          "pagecount": "",
          "Condition": "Update",
          "Type": this.editinsurancecover.value.instype
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
            this.router.navigate(['/InsuranCoverageDetails']);
          } else {
            this.isPageloaderVisible = false;
            // this.hideLoader=true;
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
