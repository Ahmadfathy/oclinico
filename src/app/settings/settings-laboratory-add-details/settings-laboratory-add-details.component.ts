import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-laboratory-add-details',
  templateUrl: './settings-laboratory-add-details.component.html',
  styleUrls: ['./settings-laboratory-add-details.component.css']
})
export class SettingsLaboratoryAddDetailsComponent implements OnInit {

  addlabdetails: FormGroup;
  myFile: any = "";
  myToastMsg: string;
  pname: any = "";
  searcharray: any = [];
  hidesearch: boolean = false;
  pid: any = "";
  rephide: boolean = true;
  userid: any;
  nullValue: any;
  reportid = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  fromsubmit: boolean;
  public isPageloaderVisible = true;

  formErrors = {
    'pname': '',
    'reportid': '',
    'myFile': ''
  }

  ValidationMessages = {
    'pname': {
      'required': 'Patient name is required',
    },
    'reportid': {
      'required': 'Report id is required'
    },
    'myFile': {
      'required': 'File attachment is required'
    }
  }

  ValidationarabicMessages = {
    'pname': {
      'required': 'اسم المريض مطلوب',
    },
    'reportid': {
      'required': 'معرف التقرير مطلوب'
    },
    'myFile': {
      'required': 'ملف مرفق مطلوب'
    }
  }


  constructor(public cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: Http) {
    this.cmn.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "us";
      }
      else {
        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'pname': '',
        'reportid': '',
        'myFile': '',
      }
    })
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.addlabdetails = this.formBuilder.group({
      pname: ['', Validators.required],
      reportid: ['', Validators.required],
      file: ['', Validators.required]
    })

    this.addlabdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addlabdetails);
    });
  }

  checkValidationErrors(group: FormGroup = this.addlabdetails): void {
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
    return this.addlabdetails.controls;
  }

  SubmitLaboratory() {
    console.log(this.reportid);
    console.log("Add Laboratory details");
    if (this.addlabdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addlabdetails);

    } else {
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
        var params = {
          "Sno": "",
          "Patient_Id": this.pid,
          "Report_Id": this.reportid,
          "Attachment_url": this.myFile,
          "TransDate": "",
          "Loginid": this.userid,
          "Clinicid": this.userid,
          "branchid": "",
          "operation": "Insert"
        }

        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });

        console.log(params)
          this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
            console.log(result);
            if(result.status_cd == 1){
              this.isPageloaderVisible = false;
              alert("added Successfully");
              this.router.navigate(['/MainLaboratory']);
            }else{
              this.isPageloaderVisible = false;
              console.log("Please try again later");
            }
          },
            err => {
              this.isPageloaderVisible = false;
              console.log("ERROR!: ", err);
            });
         
    }
  }

  patientkeyup(evnt) {
    this.hidesearch = true;
    var val = evnt.target.value;
    console.log("Auto complete");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
      var params = {
        "Sno": "",
        "Patient_Id": val,
        "Report_Id": "",
        "Attachment_url": "",
        "TransDate": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "branchid": "",
        "operation": "patientnameall"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      console.log(params)
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        if (result.status_cd === "1") {
          console.log(result.data);
          this.searcharray = result.data.Table;
          console.log(this.searcharray);
        } else {
          console.log("Please try again later");
        }
      },
        err => {
          console.log("ERROR!: ", err);
        });
   
  }

  getval(val) {
    this.pname = val.First_name;
    this.pid = val.patient_id;
    console.log(this.pname, this.pid);
    this.hidesearch = false;
  }

  fileEvent(event) {
    console.log("File event");
    let file = event.target.files[0];
    this.myFile = file.name;
    console.log(this.myFile);
  }
}
