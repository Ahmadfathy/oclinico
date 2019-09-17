import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-taxes',
  templateUrl: './add-taxes.component.html',
  styleUrls: ['./add-taxes.component.css']
})
export class AddTaxesComponent implements OnInit {

  addtax: FormGroup;
  fromsubmit: boolean;
  userid: any;
  pertax: any;
  nullValue: any;
  taxname = this.nullValue;
  status = this.nullValue;
  taxper = this.nullValue;
  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  public langulagetype: any = 'EN';
  checkvalidation: boolean = true;
  public isPageloaderVisible = true;
  formErrors = {
    'taxname': '',
    'status': '',
    'taxper': '',
  }

  ValidationMessages = {
    'taxname': {
      'required': 'Tax name is required',
    },
    'status': {
      'required': 'Status is required'
    },
    'taxper': {
      'required': 'Tax name is required'
    },
  }

  ValidationarabicMessages = {
    'taxname': {
      'required': 'اسم البنك مطلوب',
    },
    'status': {
      'required': 'الوضع مطلوب'
    },
    'taxper': {
      'required': 'اسم البنك مطلوب'
    },
  }

  constructor(public cmn: UserinfoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public http: Http) {
    this.userid = window.localStorage.getItem("userId");
    
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
        'taxname': '',
        'status': '',
        'taxper': '',
      }
    })
  }

  ngOnInit() {

    document.title="Add Taxes"

    this.isPageloaderVisible = false;
    this.addtax = this.formBuilder.group({
      taxname: ['', Validators.required],
      status: ['', [Validators.required]],
      taxper: ['', [Validators.required]],
    })

    this.addtax.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addtax);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.addtax): void {
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


  Submit() {
    if (this.addtax.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addtax);
      //return;
    } else {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        var serviceUrl = this.cmn.commonUrl + "Account/Taxes_Details"
        var params = {
          "Sno": "",
          "ClinicID": this.userid,
          "Branchid": "",
          "TaxID": "",
          "TaxName": this.addtax.value.taxname,
          "TaxPer": this.pertax,
          "Status": this.addtax.value.status,
          "LoginID": this.userid,
          "Trans_date": "",
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
          console.log(params)

          if (result.status_cd === "1") {
            console.log(result.data.Table[0].output);
            this.isPageloaderVisible = false;
            alert("Added Successfully");
            this.router.navigate(['/Taxes']);
          } else {
            this.isPageloaderVisible = false;
          }
        },
        );
        error => {
          this.isPageloaderVisible = false;
        }
    }
  }

  entertaxper(event) {
    console.log(event.target.value.toLowerCase());
    console.log(typeof this.addtax.value.taxper)
    var value = this.addtax.value.taxper;
    console.log("jfsdjs" + this.pertax.length);
    console.log("length. . " + this.addtax.value.taxper.length);
    if (this.pertax == "" || this.pertax == null || this.pertax == "null") {
      console.log("if. . .");
      console.log(typeof this.pertax)
      this.checkvalidation = true;
    }
    else if (this.pertax > 100) {
      console.log('more than 100 .dont accept and clear value');
      console.log(typeof this.pertax)
      this.checkvalidation = false;
      //this.pertax = '';
    } else if (this.pertax < 100) {
      this.checkvalidation = true;

    } else if (this.pertax.length > 2) {
      this.pertax = this.pertax.slice(0, -1);
    }
  }
}
