import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addslotdetails',
  templateUrl: './addslotdetails.component.html',
  styleUrls: ['./addslotdetails.component.css']
})
export class AddslotdetailsComponent implements OnInit {
  addslotdetails: FormGroup;
  fromsubmit: boolean;
  userid: any;
  nullValue: any;
  slotname = this.nullValue;
  status = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;
  
  formErrors = {
    'slotname': '',
    'status': ''
  }

  ValidationMessages = {
    'slotname': {
      'required': 'Slot name is required',
      'minlength': 'Minimum 3 characters required'
    },
    'status': {
      'required': 'Status is required'
    },
  }

  ValidationarabicMessages = {
    'slotname': {
      'required': 'اسم الفتحة مطلوب',
      'minlength': 'الحد الأدنى 3 أحرف المطلوبة'
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
        'slotname': '',
        'status': '',
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    document.title="Add Slot Details";


    this.addslotdetails = this.formBuilder.group({
      slotname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      status: ['', [Validators.required]],
    })

    this.addslotdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addslotdetails);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
    }
  }

  keypress(val){
    let slotpattern= /[a-zA-Z ]/
    let inputChar = String.fromCharCode(val.charCode);
    if ( !slotpattern.test(inputChar)) {
    event.preventDefault();
    }
}

  checkValidationErrors(group: FormGroup = this.addslotdetails): void {
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
    if (this.addslotdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addslotdetails);

    } else {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Slot_Settings_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Slot_Settings_Details"
        let params = {
          "Sno":"",
          "Clinic_ID":this.userid,       
          "Branchid":this.userid,      
          "Slot_ID":"", 
          "Slot_Name":this.addslotdetails.value.slotname, 
          "Status":this.addslotdetails.value.status,
          "LoginID":this.userid,
          "Trans_Date":"",
          "Last_Updated":"",
          "Condition":"Insert"
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
            alert("Added Successfully");
            this.router.navigate(['/slotdetails'])
          } else {
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
