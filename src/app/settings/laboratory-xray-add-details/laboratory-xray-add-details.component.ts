import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-laboratory-xray-add-details',
  templateUrl: './laboratory-xray-add-details.component.html',
  styleUrls: ['./laboratory-xray-add-details.component.css']
})
export class LaboratoryXrayAddDetailsComponent implements OnInit {
  addlabxraydetails: FormGroup;
  // reportid: any;
  myFile: any = "";
  myToastMsg: string;
  xray_patient: any = "";
  searcharray: any = [];
  hidesearch: boolean = false;
  pid: any = "";
  rephide: boolean = true;
  userid: any;
  nullValue: any;
  xray_reportid = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  // public displayimg: any;
  // public imgres: any;
  fromsubmit: boolean;

  formErrors = {
    'xray_patient': '',
    'xray_reportid': '',
    'myFile': ''
  }

  ValidationMessages = {
    'xray_patient': {
      'required': 'Patient name is required',
    },
    'xray_reportid': {
      'required': 'Report id is required'
    },
    'myFile': {
      'required': 'File attachment is required'
    }
  }

  ValidationarabicMessages = {
    'xray_patient': {
      'required': 'اسم المريض مطلوب',
    },
    'xray_reportid': {
      'required': 'معرف التقرير مطلوب'
    },
    'myFile': {
      'required': 'ملف مرفق مطلوب'
    }
  }
  xraypid: any;
  filehidden: boolean = false;
  pnamehidden: boolean;
  public isPageloaderVisible = true;

  constructor(public cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: Http) {
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
        'xray_patient': '',
        'xray_reportid': '',
        'myFile': '',
      }
    })
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.addlabxraydetails = this.formBuilder.group({
      xray_patient: ['', Validators.required],
      xray_reportid: ['', Validators.required],
      myFile: ['', Validators.required]
    })

    this.addlabxraydetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addlabxraydetails);
    });
  }

  checkValidationErrors(group: FormGroup = this.addlabxraydetails): void {
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
    return this.addlabxraydetails.controls;
  }

  AddxraySubmit() {
    if (this.addlabxraydetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addlabxraydetails);
    } else {
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);

        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/Laboratory_Xray_transactions"
        var params = {
          "Sno": "",
          "Patient_Id": this.xraypid,
          "Report_Id": this.addlabxraydetails.value.xray_reportid,
          "Attachment_url": this.myFile,
          "Trans_Date": "",
          "Loginid": this.userid,
          "Clinicid": this.userid,
          "param1": "",
          "param2": "",
          "condition": "Insertxray"
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
            this.isPageloaderVisible = false;
            console.log(result.data.Table);
            console.log(result.data.Table[0].output)
            alert("Added Successfully");
            this.router.navigate(['/MainLaboratoryXray']);
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
          console.log("Token Error:" + err);
        }
      
    }
  }


  fileEvent(event) {
    console.log("File event");
    let file = event.target.files[0];
    this.myFile = file.name;
    this.filehidden = false;
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
        }
      },
      );
      error => {
        console.log(error);
      }
      err => {
        console.log("Token Error:" + err);
      }
   
  }

  getval(val) {
    this.pnamehidden = false;
    this.xray_patient = val.First_name;
    this.xraypid = val.patient_id;
    console.log(this.xray_patient, this.xraypid);
    this.hidesearch = false;
  }

}
