import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-laboratory-edit-details',
  templateUrl: './settings-laboratory-edit-details.component.html',
  styleUrls: ['./settings-laboratory-edit-details.component.css']
})
export class SettingsLaboratoryEditDetailsComponent implements OnInit {
  sno: any;
  editlabdetails: FormGroup;
  pnamehidden: boolean = false;
  rephide: boolean = true;
  pid: any = "";
  userid: any;
  fromsubmit: boolean;
  nullValue: any;
  pname = this.nullValue;
  reportid = this.nullValue;
  myFile = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
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
      'required': 'اسم البنك مطلوب',
    },
    'reportid': {
      'required': 'الوضع مطلوب'
    },
    'myFile': {
      'required': 'ملف مرفق مطلوب'
    }
  }
  searcharray: any=[];
  hidesearch: boolean = false;

  constructor(public cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: Http) {

    var currentUrl = document.URL.split('?');
    console.log(currentUrl);
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    console.log(currentUrl);
    this.sno = currentUrl[1];
    console.log(this.sno);
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
        'pname': '',
        'reportid': '',
        'myFile': '',
      }
    })
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



  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.editlabdetails = this.formBuilder.group({
      pname: ['', Validators.required],
      reportid: ['', Validators.required],
      myFile: ['', Validators.required]
    })

    this.editlabdetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.editlabdetails);
    });
    this.GetLabData();
  }

  checkValidationErrors(group: FormGroup = this.editlabdetails): void {
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
    return this.editlabdetails.controls;
  }

  AddLabSubmit() {
    console.log(this.pid);
    if (this.editlabdetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editlabdetails);
    } else {
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
        var params = {
          "Sno": this.sno,
          "Patient_Id": this.pid,
          "Report_Id": this.reportid,
          "Attachment_url": this.myFile,
          "TransDate": "",
          "Loginid": this.userid,
          "Clinicid": this.userid,
          "branchid": "",
          "operation": "Update"
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
            console.log(result.data);
           alert("Updated Successfully");
            this.router.navigate(['/MainLaboratory']);
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

  GetLabData() {
    console.log("GetLabdata");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
      var params = {
        "Sno": this.sno,
        "Patient_Id": "",
        "Report_Id": "",
        "Attachment_url": "",
        "TransDate": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "branchid": "",
        "operation": "GetlabdetailsEdit"
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
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.editlabdetails.patchValue({
              pname :result.data.Table[0].Patientname,
              reportid :result.data.Table[0].Report_Id,
              pid : result.data.Table[0].Patient_Id
          })
         this.myFile = result.data.Table[0].Attachment_url
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

  fileEvent(event) {
    console.log("File event");
    let file = event.target.files[0];
    this.myFile = file.name;
    console.log(this.myFile);
  }
}
