import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-letter-template-view',
  templateUrl: './settings-letter-template-view.component.html',
  styleUrls: ['./settings-letter-template-view.component.css']
})
export class SettingsLetterTemplateViewComponent implements OnInit {
  public Editor = ClassicEditor;
  userid: any;
  sno: string;
  fromsubmit: boolean;
  nullValue: any;
  tname = this.nullValue;
  addTemp_Descri = this.nullValue;
  addtemp:FormGroup;
  public isPageloaderVisible = true;
  language: any;
  displaytype:any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';

  formErrors = {
    'tname': '',
    'addTemp_Descri': '',
  }

  ValidationMessages = {
    'tname': {
      'required': 'Template name is required',
    },
    'addTemp_Descri': {
      'required': 'Template Description is required'
    },
  }

  ValidationarabicMessages = {
    'tname': {
      'required': 'اسم البنك مطلوب',
    },
    'addTemp_Descri': {
      'required': 'الوضع مطلوب'
    },
  }
  constructor( public cmn: UserinfoService,
               private formBuilder: FormBuilder,
               private router: Router,
               public http: Http,) { 
      this.cmn.currentMessagecat.subscribe(message => {
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
          'tname': '',
          'addTemp_Descri': '',
        }
      })
    }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.addtemp = this.formBuilder.group({
      tname: ['', Validators.required],
      addTemp_Descri: ['', Validators.required]
    })

    this.addtemp.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addtemp);
    });
  }

  checkValidationErrors(group: FormGroup = this.addtemp): void {
    console.log("entered.....");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          console.log(abstractControl);
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

  get f() {
    return this.addtemp.controls;
  }

  AddTempSubmit() {
    if (this.addtemp.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addtemp);

    } else {
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/CL_LetterTemplate_Details"
        var params = {
          "Sno": "",
          "ID": "",
          "Template_Name": this.addtemp.value.tname,
          "Description": this.addtemp.value.addTemp_Descri,
          "Status": "Active",
          "TransDate": "",
          "Clinicid": this.userid,
          "Branch_ID": this.userid,
          "Loginid": this.userid,
          "Condition": "Insert",
          "pagecount": ""
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
  
          if (result.status_cd === "1") {
            console.log(result.data);
            this.isPageloaderVisible = false;
            alert("Added Successfully.");
            this.router.navigate(['/MainTemplate']);
          } else {
            this.isPageloaderVisible = false;
          }
        },
        );
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);;
        }
      
    }
  }
}