import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-bs4'
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-editjobtitle',
  templateUrl: './editjobtitle.component.html',
  styleUrls: ['./editjobtitle.component.css']
})
export class EditjobtitleComponent implements OnInit {
  public isPageloaderVisible: boolean = true;
  editjob: FormGroup;
  fromsubmit: boolean;
  public userid: any;
  public selectedroleid: any;
  nullValue: any;
  title = this.nullValue;
  hierarchy = this.nullValue;
  status = this.nullValue;
  formErrors = {
    'title': '',
    'titlear': '',
    'hierarchy': '',
    'rolestatus': ''
  }

  ValidationMessages = {
    'title': {
      'required': 'Job Title in english is required',
      'pattern': 'Please enter valid english Job Title'
    },
    'titlear': {
      'required': 'Job Title in arabic is required',
      'pattern': 'Please enter valid arabic Job Title'
    },
    'hierarchy': {
      'required': 'hierarchy is required',
    },
    'rolestatus': {
      'required': 'status is required'
    },
  }
  ValidationarabicMessages = {
    'title': {
      'required': 'المسمى الوظيفي مطلوب',
      'pattern': 'الرجاء إدخال اسم وظيفة صحيح'
    },
    'titlear': {
      'required': 'المسمى الوظيفي مطلوب',
      'pattern': 'الرجاء إدخال اسم وظيفة صحيح'
    },
    'hierarchy': {
      'required': 'التسلسل الهرمي مطلوب',
    },
    'status': {
      'required': 'الحالة مطلوبة'
    },

  }
  languageoption: string;
  langulagetype: string;



  constructor(public http: Http,
    public router: Router,
    private formBuilder: FormBuilder,
    public commonService: UserinfoService) {
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
        'title': '',
        'titlear': '',
        'hierarchy': '',
        'rolestatus': ''
      }
    })
    this.userid = window.localStorage.getItem("userId");
    console.log("userid" + this.userid);
    this.selectedroleid = window.localStorage.getItem("eachroleid");
  }

  ngOnInit() {
    this.editjob = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      hierarchy: ['', Validators.required],
      rolestatus: ['', [Validators.required]],
      titlear:['',[Validators.required]]
    })

    this.editjob.valueChanges.subscribe((data) => {
      // console.log("change entered.....");
      this.fromsubmit = false;
      this.checkValidationErrors(this.editjob);
    });

    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Role_Operations"
    let body = {
      "clinicid": this.userid,
      "branchid": this.userid,
      "loginid": this.userid,
      "RoleId": window.localStorage.getItem("eachroleid"),
      "RoleName": "",
      "Status": "",
      "Organisation_ID": "",
      "OperationType": "Getroles"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible = false;
        if (res.status_cd == 1) {
          console.log(res);
          this.editjob.patchValue({
            title: res.data.Table[0].role_name,
            titlear: res.data.Table[0].Arabicnames,
            hierarchy: res.data.Table[0].Role_Hierarchy,
            rolestatus: res.data.Table[0].role_status,
          })
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
  }
  // err=>{
  // console.log("Token Error:"+err);
  // } 
  // );
  //   }
  // }
  checkValidationErrors(group: FormGroup = this.editjob): void {
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
  Update() {
    if (this.editjob.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editjob);
    }
    else {
      console.log(this.editjob.value.title + "..." + this.editjob.value.rolestatus + ".." + this.editjob.value.hierarchy)

      // this.commonService.tokenFun().subscribe(tokenResult =>{
      //   this.isPageloaderVisible=true;
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
      this.isPageloaderVisible = true;
      var accessToken = window.localStorage.Tokenval
      let url = this.commonService.commonUrl + "Account/Role_Operations"
      let body = {
        "clinicid": this.userid,
        "branchid": this.editjob.value.titlear,
        "loginid": this.userid,
        "RoleId": window.localStorage.getItem("eachroleid"),
        "RoleName": this.editjob.value.title,
        "Status": this.editjob.value.rolestatus,
        "Organisation_ID": this.editjob.value.hierarchy,
        "OperationType": "Update"
      }
      console.log(body);
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options)
        .map(res => res.json()).subscribe(res => {
          this.isPageloaderVisible = false;
          if (res.status_cd == 1) {
            alert("Updated Successfully.");
            this.router.navigate(['/jobtitle']);
          }
        },
          err => {
            this.isPageloaderVisible = false;
            console.log("ERROR!: ", err);
          });
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
