import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-letter-template-edit',
  templateUrl: './settings-letter-template-edit.component.html',
  styleUrls: ['./settings-letter-template-edit.component.css']
})
export class SettingsLetterTemplateEditComponent implements OnInit {
  public Editor = ClassicEditor;
  //queryval: any;
  userid: any;
  sno: string;
  fromsubmit: boolean;
  nullValue: any;
  tname = this.nullValue;
  editTemp_Descri = this.nullValue;
  edittemp: FormGroup;
  public isPageloaderVisible = true;
  language: any;
  displaytype: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';

  formErrors = {
    'tname': '',
    'editTemp_Descri': '',
  }

  ValidationMessages = {
    'tname': {
      'required': 'Template name is required',
    },
    'editTemp_Descri': {
      'required': 'Template Description is required'
    },
  }

  ValidationarabicMessages = {
    'tname': {
      'required': 'اسم البنك مطلوب',
    },
    'editTemp_Descri': {
      'required': 'الوضع مطلوب'
    },
  }

  constructor(public cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: Http) {
    // var currentUrl = document.URL.split('?');
    // console.log(currentUrl);
    // currentUrl = currentUrl[currentUrl.length - 1].split('=');
    // console.log(currentUrl);
    // this.queryval = currentUrl[1].split('&')[0];
    // this.sno = currentUrl[2];
    // console.log(this.queryval, this.sno);
    // console.log("Query Value... "+this.queryval);
    this.sno = window.sessionStorage.getItem("tempsno");
    this.displaytype = window.sessionStorage.getItem("temptype");
    console.log("type . . " + this.displaytype)
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
        'editTemp_Descri': '',
      }
    })
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.edittemp = this.formBuilder.group({
      tname: ['', Validators.required],
      editTemp_Descri: ['', Validators.required]
    })

    this.edittemp.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.edittemp);
    });
    this.GetTempData();
  }

  checkValidationErrors(group: FormGroup = this.edittemp): void {
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
    return this.edittemp.controls;
  }

  EditTempSubmit() {
    if (this.edittemp.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.edittemp);
    } else {
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);

        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/CL_LetterTemplate_Details"
        var params =
        {
          "Sno": this.sno,
          "ID": "",
          "Template_Name": this.edittemp.value.tname,
          "Description": this.edittemp.value.editTemp_Descri,
          "Status": "Active",
          "TransDate": "",
          "Clinicid": this.userid,
          "Branch_ID": "",
          "Loginid": "",
          "Condition": "Update",
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
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            console.log(result.data);
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
          console.log("Token Error:" + err);
        }
     
    }
  }


  // -------------------------Binding Data--------------------
  GetTempData() {
    console.log("GetTempData");
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "/Account/CL_LetterTemplate_Details"
      var params = {
        "Sno": this.sno,
        "ID": "",
        "Template_Name": "",
        "Description": "",
        "Status": "",
        "TransDate": "",
        "Clinicid": this.userid,
        "Branch_ID": "",
        "Loginid": "",
        "Condition": "GetData",
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
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.edittemp.patchValue({
            tname: result.data.Table[0].Lettertemplate_Name,
            editTemp_Descri: result.data.Table[0].Description,
          })
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

  // --------------------------------Inserting Data-------------------------

  // AddTempSubmit() {
  //   console.log(this.addTemp_Descri)
  //   console.log(this.addTemp_title);
  //   if (this.addTemp_title == "") {
  //     this.tempname = true;
  //     return false;
  //   }
  //   if (this.addTemp_Descri == "") {
  //     this.descpname = true;
  //     return false;
  //   }
  //   this.cmn.tokenFun().subscribe(tokenResult => {
  //     var accessToken = tokenResult.token_type + " " + tokenResult.access_token
  //     console.log(accessToken);
  //     // our service calling as usual
  //     var serviceUrl = this.cmn.commonUrl + "Account/CL_LetterTemplate_Details"
  //     var params = {
  //       "Sno": "",
  //       "ID": "",
  //       "Template_Name": this.addTemp_title,
  //       "Description": this.addTemp_Descri,
  //       "Status": "Active",
  //       "TransDate": "",
  //       "Clinicid": this.userid,
  //       "Branch_ID": this.userid,
  //       "Loginid": this.userid,
  //       "Condition": "Insert",
  //       "pagecount": ""
  //     }

  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken
  //     });
  //     let options = new RequestOptions({ headers: headers });

  //     this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
  //       console.log(result);
  //       console.log(params)

  //       if (result.status_cd === "1") {
  //         console.log(result.data);
  //         this.isPageloaderVisible = false;
  //         this.router.navigate(['/MainTemplate']);

  //       } else {
  //         this.isPageloaderVisible = false;
  //       }
  //     },
  //     );
  //     error => {
  //       this.isPageloaderVisible = false;
  //       console.log(error);
  //     }
  //     err => {
  //       this.isPageloaderVisible = false;
  //       console.log("Token Error:" + err);;
  //     }
  //   }
  //   );
  // }

  // addtempnamechange() {
  //   if (this.addTemp_title == "") {
  //     this.tempname = true;
  //     return false;
  //   }
  // }

  // addtempdescchange() {
  //   if (this.addTemp_Descri == "") {
  //     this.descpname = true;
  //     return false;
  //   }
  // }

  // edittempnamechange() {
  //   if (this.editTemp_title == "") {
  //     this.tempname = true;
  //   } else {
  //     this.tempname = false;
  //   }
  // }

  // edittempdescchange() {
  //   if (this.editTemp_Descri == "") {
  //     this.descpname = true;
  //     return false;
  //   }
  // }

  // cancel() {
  //   this.router.navigate(['/MainTemplate']);
  // }

}
