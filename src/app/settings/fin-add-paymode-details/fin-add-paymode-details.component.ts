import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fin-add-paymode-details',
  templateUrl: './fin-add-paymode-details.component.html',
  styleUrls: ['./fin-add-paymode-details.component.css']
})
export class FinAddPaymodeDetailsComponent implements OnInit {
  addfinancedetails: FormGroup;
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
      'required':'Pay mode is required',
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
      this.userid =  window.localStorage.getItem("userId");
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
      console.log("user language....." + this.langulagetype);
     }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.addfinancedetails = this.formBuilder.group({
      paymode: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      status: ['', [Validators.required]],
    })

    this.addfinancedetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addfinancedetails);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.addfinancedetails): void {
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

finSubmit(){
  if (this.addfinancedetails.invalid == true) {
    this.fromsubmit = true;
    this.checkValidationErrors(this.addfinancedetails);
  } else {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.commonService.commonUrl+"Account/Paymode_Master_details"
      var params  = {
                    "Sno":"",
                    "Paymodetype_ID":"",       
                    "Paymodetype_Name":this.addfinancedetails.value.paymode,      
                    "Status":this.addfinancedetails.value.status,       
                    "Trans_date":"",
                    "Loginid":this.userid,
                    "Clinicid":this.userid,
                    "Condition":"Insert" 
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
        if(result.status_cd === "1"){
          this.isPageloaderVisible = false;
          console.log(result.data.Table[0].output);
          alert("Added Successfully");
          this.router.navigate(['/MainFinanceDetail']);
        }else{
          this.isPageloaderVisible = false;
        }
      },
      );
      error =>{
        this.isPageloaderVisible = false;
        console.log(error);
      }
    }
  }
}
