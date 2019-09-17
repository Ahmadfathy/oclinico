import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addinsucoversettings',
  templateUrl: './addinsucoversettings.component.html',
  styleUrls: ['./addinsucoversettings.component.css']
})
export class AddinsucoversettingsComponent implements OnInit {
  type: any = [];
  insurencecompnames: any = [];
  rdtype: any = [];
  nullValue: any;
  typevalid: any;
  selectedtype: any;
  typenames: any = [];
  compname = this.nullValue;
  instype = this.nullValue;
  incname = this.nullValue;
  covepercen = this.nullValue;
  addinsurancecover: FormGroup;
  userid: any = "";
  languageoption:any;
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
      'required': 'Please enter coverage percentage'
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
  langulagetype: string;
  language: string;
  fromsubmit: boolean;
  st: string = 'false';
  public isPageloaderVisible = true;

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
    document.title="Add InsuranceCoverage";

    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
      'compname': '',
      'instype': '',
      'incname': '',
      'covepercen': '',
      }
  })

    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.addinsurancecover = this.fb.group({
      compname: ['', [Validators.required]],
      instype: ['', [Validators.required]],
      incname: ['', [Validators.required]],
      covepercen: ['', [Validators.required]],
    });

    this.addinsurancecover.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addinsurancecover);
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
    this.getcomponyname();
    //this. gettypenames();
  }

  typechange(event) {
    console.log(event.target.value);
    var str = event.target.value;
    // this.st = status;
    // console.log(typeof status);
   // console.log("st" +this.st);
    this.typevalid = str.split(":")[1];
   // console.log(this.typevalid);
    this.gettypenames(this.typevalid);
  }

  gettypenames(typename) {
    this.selectedtype = typename.trim();
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);

      // our service calling as usual

      //  let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/CL_Referral_Discount_Details"
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
       // console.log(result);
        if (result.status_cd === "1") {
          this.typenames = result.data.Table;
          console.log(this.typenames);
        } else {
          // this.hideLoader=true;
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
          //  this.hideLoader=true;
        //  console.log(error);
        }
      );
    // },
    //   err => {
    //    // console.log("Token Error:" + err);
    //   });
  }

  getcomponyname() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      //console.log(accessToken);

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
        "Condition": "Get_Data1",
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
          this.insurencecompnames = result.data.Table;
        //  console.log(this.insurencecompnames);

        } else {
          // this.hideLoader=true;
          // console.log(result.error_msg);
          // console.log(accessToken);
        }
      },
        error => {
          //  this.hideLoader=true;
         // console.log(error);
          //  console.log(accessToken);
          //   alert(error)
        }
      );

    // },
    //   err => {
    //  //   console.log("Token Error:" + err);
    //   }

    // );
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  
  checkValidationErrors(group: FormGroup = this.addinsurancecover): void {
    // console.log("sdf");
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       //alert(this.languageoption);
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
     checkValidationErrorssubmit(group: FormGroup = this.addinsurancecover): void {
   
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
          // console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }

  get f() {
    return this.addinsurancecover.controls;
  }

  addinscoversubmit() {
    console.log(this.addinsurancecover.valid)
    if (this.addinsurancecover.valid == false) {
      this.fromsubmit = true;
      this.checkValidationErrorssubmit(this.addinsurancecover);
    } else {
      // console.log(this.addinsurancecover.value.compname);
      // console.log(this.addinsurancecover.value.instype);
      // console.log(this.addinsurancecover.value.incname);
      // console.log(this.addinsurancecover.value.covepercen);
      this.isPageloaderVisible=true;
      // this.commonService.tokenFun().subscribe(tokenResult => {
      //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
       // console.log(accessToken);

        // our service calling as usual

        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Insurance_Coverage_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Insurance_Coverage_Details";

        let params = {
          "Sno": "",
          "Clinic_ID": this.userid,
          "Branch_ID": "",
          "Login_ID": this.userid,
          "Insurance_Coverage_ID": "",
          "Insurance_CompanyID": this.addinsurancecover.value.compname,
          "Service_Type": this.addinsurancecover.value.incname,
          "Coverage_Per": this.addinsurancecover.value.covepercen,
          "Status": "Active",
          "Trans_Date": "",
          "Last_UpdatedDate": "",
          "pagecount": "",
          "Condition": "Insert",
          "Type": this.addinsurancecover.value.instype
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
            alert("Inserted Successfully");
            this.router.navigate(['/InsuranCoverageDetails']);
          } else {
            this.isPageloaderVisible = false;
           // console.log(result.error_msg);
          //  console.log(accessToken);
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
