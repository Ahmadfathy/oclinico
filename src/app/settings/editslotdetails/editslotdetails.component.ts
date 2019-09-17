import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editslotdetails',
  templateUrl: './editslotdetails.component.html',
  styleUrls: ['./editslotdetails.component.css']
})
export class EditslotdetailsComponent implements OnInit {
  sno: any;
  editslotdetails: FormGroup;
  fromsubmit: boolean;
  userid: any;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  public isPageloaderVisible = true;
  nullValue: any;
  bankname = this.nullValue;
  status = this.nullValue;

  formErrors = {
    'slotname': '',
    'status': ''
  }

  ValidationMessages = {
    'slotname': {
      'required':'Slot name is required',
      'minlength':'Minimum 3 characters required',
      // 'pattern' :'Numbers are not allowed'
    },
    'status': {
      'required': 'Status is required'
    },
  }

  ValidationarabicMessages = {
    'slotname': {
      'required': 'اسم البنك مطلوب',
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
    this.userid = window.localStorage.getItem("userId")
    this.sno = window.sessionStorage.getItem("slotno");
    console.log(this.sno);
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
    this.getbankdetails();
    this.editslotdetails = this.formBuilder.group({
      slotname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'),Validators.minLength(3)]],
      status: ['', [Validators.required]],
    })
    this.editslotdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editslotdetails);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
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

  checkValidationErrors(group: FormGroup = this.editslotdetails): void {
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

  getbankdetails() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Slot_Settings_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Slot_Settings_Details"
      let params = {
        "Sno":this.sno,
        "Clinic_ID":this.userid,       
        "Branchid":"",      
        "Slot_ID":"", 
        "Slot_Name":"", 
        "Status":"",
        "LoginID":"",
        "Trans_Date":"",
        "Last_Updated":"",
        "Condition":"GetData"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          this.editslotdetails.patchValue({
            slotname: result.data.Table[0].Slot_Name,
            status: result.data.Table[0].Status,
          })
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
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

  update() {
    if (this.editslotdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editslotdetails);
    } else {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Slot_Settings_Details";
        let serviceUrl = this.commonService.commonUrl + "Account/Slot_Settings_Details"
        let params = {
          "Sno":this.sno,
          "Clinic_ID":this.userid,       
          "Branchid":this.userid,      
          "Slot_ID":"", 
          "Slot_Name":this.editslotdetails.value.slotname, 
          "Status":this.editslotdetails.value.status,
          "LoginID":this.userid,
          "Trans_Date":"",
          "Last_Updated":"",
          "Condition":"Update"
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
            alert("Slot Details Updated Successfully");
            this.router.navigate(['/slotdetails'])
          } else {
            this.isPageloaderVisible = false;
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
