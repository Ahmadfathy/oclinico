import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-laboratory-xray-edit-details',
  templateUrl: './laboratory-xray-edit-details.component.html',
  styleUrls: ['./laboratory-xray-edit-details.component.css']
})
export class LaboratoryXrayEditDetailsComponent implements OnInit {
  editlabxraydetails: FormGroup;
  hidesearch: boolean = false;
  userid: any;
  nullValue: any;
  xray_reportid = this.nullValue;
  xray_patient = this.nullValue;
  myfile = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  fromsubmit: boolean;
  xraypid: any;
  filehidden: boolean = false;
  pnamehidden: boolean;
  public isPageloaderVisible = true;
  sno: any;
  searcharray = [];
  formErrors = {
    'xray_patient': '',
    'xray_reportid': '',
    'myfile': ''
  }

  ValidationMessages = {
    'xray_patient': {
      'required': 'Patient name is required',
    },
    'xray_reportid': {
      'required': 'Report id is required'
    },
    'myfile': {
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
    'myfile': {
      'required': 'ملف مرفق مطلوب'
    }
  }

  constructor(public cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: Http) {
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.sno = currentUrl[1];
    this.cmn.currentMessagecat.subscribe(message => {
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
        'myfile': '',
      }
    })
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId")
    this.editlabxraydetails = this.formBuilder.group({
      xray_patient: ['', Validators.required],
      xray_reportid: ['', Validators.required],
      myfile: ['', Validators.required]
    })

    this.editlabxraydetails.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.editlabxraydetails);
    });
    this.GetXrayData();
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.editlabxraydetails): void {
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
    return this.editlabxraydetails.controls;
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



  GetXrayData() {
    console.log("GetLabXraydata");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/Laboratory_Xray_transactions"
      var params = {
        "Sno": this.sno,
        "Patient_Id": "",
        "Report_Id": "",
        "Attachment_url": "",
        "Trans_Date": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "param1": "",
        "param2": "",
        "condition": "Getaxayinfobyid"
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
          this.editlabxraydetails.patchValue({
            xray_patient:result.data.Table[0]. Patientname,
            xray_reportid: result.data.Table[0].Report_Id,
            xraypid :result.data.Table[0].Patient_Id
          })
          this.myfile = result.data.Table[0].Attachment_url;
        } else {
          this.isPageloaderVisible = false;
        }
      },
      );
      error => {
        this.isPageloaderVisible = false;
      }
      err => {
        this.isPageloaderVisible = false;
      }
   
  }

  commonvalidationcheck(){
    if (this.myfile == undefined || this.myfile == "") {
      this.myfile  = this.myfile ;
    }
    // if (this.myfile == undefined || this.myfile == "") {
    //   this.myfile  = this.myfile ;
    // }
    // if (this.myfile == undefined || this.myfile == "") {
    //   this.myfile  = this.myfile ;
    // }
  }

  // -------------------------------------Update data-----------------------------
  XraySubmit() {
    this.commonvalidationcheck();
    console.log(this.editlabxraydetails.valid)
    if (this.editlabxraydetails.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editlabxraydetails);
    } else {
      console.log(this.xraypid);
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/Laboratory_Xray_transactions"
        var params = {
          "Sno": this.sno,
          "Patient_Id": this.xraypid,
          "Report_Id": this.editlabxraydetails.value.xray_reportid,
          "Attachment_url": this.myfile,
          "Trans_Date": "",
          "Loginid": this.userid,//"10171"
          "Clinicid": this.userid,  //"10190",
          "param1": "",
          "param2": "",
          "condition": "Updatexray"
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
            // this.LaboratoryXrayEditData = result.data.Table;
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            this.router.navigate(['MainLaboratoryXray']);
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
    this.myfile = file.name;
  }

}
