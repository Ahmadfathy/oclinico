import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-adddepartmentsettings',
  templateUrl: './m-adddepartmentsettings.component.html',
  styleUrls: ['./m-adddepartmentsettings.component.css']
})
export class MAdddepartmentsettingsComponent implements OnInit {
  statustype: any = [];
  nullValue: any;
  deptname = this.nullValue;
  deptnamear = this.nullValue;
  dstatus = this.nullValue;
  addDepartment: FormGroup;
  select: string = 'Select';
  languageoption: any;
  public isPageloaderVisible = false;
  ValidationMessages = {
    'deptname': {
      'required': 'Please enter department name in english',
    },
    'dstatus': {
      'required': 'Please select status',
      'Select': 'Please select status'
    },
    'deptnamear': {
      'required': 'Please enter department name in arabic',
    },
  }
  ValidationMessagesarabic = {

    'deptname': {
      'required': 'الرجاء إدخال اسم القسم',
    },
    'dstatus': {
      'required': 'يرجى اختيار الحالة',
      'Select': 'يرجى اختيار الحالة'
    },
    'deptnamear': {
      'required': 'الرجاء إدخال اسم القسم',
    },
  }


  formErrors = {
    'deptname': '',
    'dstatus': '',
    'deptnamear': ''
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
    document.title = "Add Department";
    this.userid = window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      this.formErrors = {
        'deptname': '',
        'deptnamear': '',
        'dstatus': '',
      }
    })

    this.statustype = ['Active', 'InActive'];

    this.addDepartment = this.fb.group({
      deptname: ['', [Validators.required]],
      deptnamear: ['', [Validators.required]],
      dstatus: ['select', [Validators.required, CustomValidators.Select('select')]],

    });

    this.addDepartment.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addDepartment);
    });
  }

  checkValidationErrors(group: FormGroup = this.addDepartment): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        //  alert("test");
        //  console.log("test");
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            // console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
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
        this.checkValidationErrors(abstractControl)
      }
    });
  }
  checkValidationErrorssubmit(group: FormGroup = this.addDepartment): void {
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


  adddeptcancle() {
    this.router.navigate(['/DepartmentsDetails']);
  }

  addDeptsubmit() {
    if (this.addDepartment.valid == false) {
      this.checkValidationErrorssubmit(this.addDepartment);
    } else {
      this.isPageloaderVisible = true;
      var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Account/Departments_Details"
      let params = {
        "Sno": "",
        "clinicid": this.userid,
        "BranchID": this.addDepartment.value.deptnamear,
        "DeptID": "",
        "DeptName": this.addDepartment.value.deptname,
        "Status": this.addDepartment.value.dstatus,
        "LoginID": this.userid,
        "Trans_Date": "",
        "Last_update": "",
        "Condition": "Insert"
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
          alert("Inserted Successfully");
          this.router.navigate(['/DepartmentsDetails']);

        } else {
          this.isPageloaderVisible = false;
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
