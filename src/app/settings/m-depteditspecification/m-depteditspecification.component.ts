import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-depteditspecification',
  templateUrl: './m-depteditspecification.component.html',
  styleUrls: ['./m-depteditspecification.component.css']
})
export class MDepteditspecificationComponent implements OnInit {
  deptid: any;

  statustype: any = [];
  nullValue: any;
  select: string = 'Select';
  deptname = this.nullValue;
  deptnamear = this.nullValue;
  dstatus = this.nullValue;
  languageoption: any;
  editDepartment: FormGroup;
  public isPageloaderVisible = true;
  ValidationMessages = {
    'deptname': {
      'required': 'Please enter Specialization name in english',
    },
    'dstatus': {
      'required': 'Please select status',
      'Select': 'Please select status'
    },
    'deptnamear': {
      'required': 'Please enter Specialization name in arabic',
    },

  }

  ValidationMessagesarabic = {

    'deptname': {
      'required': 'Please enter Specialization name in english',
    },
    'dstatus': {
      'required': 'يرجى اختيار الحالة',
      'Select': 'يرجى اختيار الحالة'
    },
    'deptnamear': {
      'required': 'Please enter Specialization name in arabic',
    },
  }

  formErrors = {
    'deptname': '',
    'dstatus': '',
    'deptnamear':''
  }
  userid: any = "";
  constructor(
    private meta: Meta, private router: Router, public commonService: UserinfoService,
    private MainTitle: Title, public http: Http,
    private fb: FormBuilder
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
    document.title = "Edit Specialization";
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
      // console.log(message);
      this.languageoption = message.split("_")[1];
      //  console.log(this.languageoption);
      this.formErrors = {
        'deptname': '',
        'dstatus': '',
        'deptnamear':''
      }
    })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.deptid = currentUrl[currentUrl.length - 1]
    this.binddeptdata();
    this.statustype = ['Active', 'InActive'];

    this.editDepartment = this.fb.group({
      deptname: ['', [Validators.required]],
      dstatus: ['select', [Validators.required, CustomValidators.Select('select')]],
      deptnamear: ['', [Validators.required]],
    });

    this.editDepartment.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editDepartment);
    });
  }

  checkValidationErrors(group: FormGroup = this.editDepartment): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.checkValidationErrors(abstractControl)
      }
    });
  }

  checkValidationErrorssubmit(group: FormGroup = this.editDepartment): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
  }

  binddeptdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Departments_Details"
    let params = {
      "Sno": this.deptid,
      "clinicid": this.userid,
      "BranchID": "",
      "DeptID": "",
      "DeptName": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_update": "",
      "Condition": "GetspecializationData"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd === "1") {
        console.log(result)
        this.isPageloaderVisible = false;
        this.editDepartment.patchValue({
          deptname: result.data.Table[0].speName,
          dstatus: result.data.Table[0].Status,
          deptnamear:result.data.Table[0].speNameArabic

        });
      } else {
        this.isPageloaderVisible = false;
      }
    },
      error => {
        this.isPageloaderVisible = false;
      }
    );
  }

  adddeptcancle() {
    this.router.navigate(['/Specialization']);
  }

  addDeptsubmit() {
    if (this.editDepartment.valid == false) {
      this.checkValidationErrorssubmit(this.editDepartment);
    } else {
      this.isPageloaderVisible = true;
      var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Account/Departments_Details"
      let params = {
        "Sno": this.deptid,
        "clinicid": this.userid,
        "BranchID": this.editDepartment.value.deptnamear,
        "DeptID": "",
        "DeptName": this.editDepartment.value.deptname,
        "Status": this.editDepartment.value.dstatus,
        "LoginID": this.userid,
        "Trans_Date": "",
        "Last_update": "",
        "Condition": "UpdateSpecialization"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        if (result.status_cd === "1") {
          this.isPageloaderVisible = false;
          alert("Updated Successfully");
          this.router.navigate(['/Specialization']);
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
        }
      );
    }
  }

  arabic(event) {
    var arregex = /[\u0600-\u06FF]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!arregex.test(inputChar)) {
      alert("Please Enter Arabic Letters")
      event.preventDefault();
    }
  }
}
