import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-addfamilydetails',
  templateUrl: './addfamilydetails.component.html',
  styleUrls: ['./addfamilydetails.component.css']
})
export class AddfamilydetailsComponent implements OnInit {
  addfamily: FormGroup;
  selectedtype: any;
  select: string = 'Select';
  languageoption: any;
  profileimage: any;
  exppiredate: any;
  issudate: any;
  familydetails = [];
  dataTable: any = [];
  patient_name: any;
  ValidationMessages = {

    'fname': {
      'required': 'Please select family member ',
      'Select': 'Please select family member'
    },
    'nameval': {
      'required': 'Please enter name',

    },
    'doc': {
      'required': 'Please select document',
      'Select': 'Please select document'
    },
    'docnum': {
      'required': 'Please enter document number',

    },

    'expdate': {
      'required': 'Please enter expire date'
    }

  }
  ValidationMessagesarabic = {

    'fname': {
      'required': 'الرجاء اختيار فرد من العائلة ',
      'Select': 'الرجاء اختيار فرد من العائلة'
    },
    'nameval': {
      'required': 'الرجاء ادخل الاسم',

    },
    'doc': {
      'required': 'الرجاء اختيار وثيقة',
      'Select': 'الرجاء اختيار وثيقة'
    },
    'docnum': {
      'required': 'الرجاء إدخال رقم المستند',

    },
    'expdate': {
      'required': 'الرجاء إدخال تاريخ انتهاء الصلاحية'
    }

  }
  formErrors = {

    'fname': '',
    'nameval': '',
    'doc': '',
    'docnum': '',
    'issuedate': '',
    'expdate': '',
    'imagefile': '',

  }
  userid: any = "";
  addfamileyid: any;
  patientId: string;
  showLoader: boolean = false;
  constructor(
    private meta: Meta, private router: Router, public commonService: UserinfoService,
    private chRef: ChangeDetectorRef,
    private MainTitle: Title, public http: Http,
    private fb: FormBuilder
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1];
    document.title = "Add Family member";
    this.userid = window.localStorage.getItem("userId");

    this.addfamileyid = localStorage.getItem('newpatientId')
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      this.formErrors = {
        'fname': '',
        'nameval': '',
        'doc': '',
        'docnum': '',
        'issuedate': '',
        'expdate': '',
        'imagefile': '',
      }
    })


    this.addfamily = this.fb.group({

      fname: ['select', [Validators.required, CustomValidators.Select('select')]],
      nameval: ['', [Validators.required]],
      doc: ['select', [Validators.required, CustomValidators.Select('select')]],
      docnum: ['', [Validators.required]],
      issuedate: [''],
      expdate: ['', [Validators.required]],
      imagefile: [],
      gender: ['', [Validators.required]],

    });

    this.addfamily.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addfamily);
    });
    this.getfamilydetails();
  }
  getfamilydetails() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    //http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations
    let serviceUrl = this.commonService.commonUrl + "Account/Patient_operations"
    let params = {
      "sno": this.patientId,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": "",
      "Title": "",
      "Ara_firstname": "",
      "Ara_Lastname": "",
      "Ara_fathername": "",
      "First_name": "",
      "Last_Name": "",
      "Middle_name": "",
      "DOB": "",
      "DOB_Arabic": "",
      "Gender": "",
      "Marital_status": "",
      "Identification_type": "",
      "Identification_no": "",
      "Identification_attachment": "",
      "Identification_Expiry": "",
      "Nationality": "",
      "Occupation": "",
      "Area": "",
      "Block": "",
      "Building": "",
      "Street": "",
      "Floor": "",
      "City": "",
      "Country": "",
      "Email": "",
      "Mobileno": "",
      "Home_phone": "",
      "Work_phoneno": "",
      "Emergency_contact": "",
      "Notes": "",
      "Reminder_type": "",
      "status": "",
      "Trans_date": "",
      "Last_update": "",
      "Condition": "FamilydetailsBIND",
      "Par1": "",
      "Par2": "",
      "Par3": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      // this.isPageloaderVisible=false;
      if (result.status_cd === "1") {

        this.familydetails = result.data.Table;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();

      } else {
        // this.hideLoader=true;
        console.log(result.error_msg);
        console.log(accessToken);
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
      }
    },
      error => {
        // this.isPageloaderVisible=false;
        //  this.hideLoader=true;
        console.log(error);
        //  console.log(accessToken);
        //   alert(error)
      }
    );

    // },
    // err=>{
    //   this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }

    // );
  }

  checkValidationErrors(group: FormGroup = this.addfamily): void {
    // console.log("sdf");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // console.log(abstractControl);
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        //  alert("test");
        //  console.log("test");
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
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
  checkValidationErrorssubmit(group: FormGroup = this.addfamily): void {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
        //  alert("test");
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
  }


  datechange() {
    // console.log(evnt.target.value);

    this.exppiredate = (this.addfamily.value.expdate.getDate() + "/" + this.addfamily.value.expdate.getMonth() + "/" + this.addfamily.value.expdate.getFullYear());
    console.log(this.exppiredate)
  }
  issuedatechange() {
    // console.log(evnt.target.value);

    this.issudate = (this.addfamily.value.issuedate.getDate() + "/" + this.addfamily.value.issuedate.getMonth() + 1) + "/" + this.addfamily.value.issuedate.getFullYear();
    console.log(this.issudate)
  }

  fileuploadfamily($event) {
    let uploatprof = this.addfamily.value.uploadidproof
    let fileSelected = $event.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    console.log(body)
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      //"Content-Type": "application/json",
      //Accept: "application/json",
      Authorization: accessToken
    });

    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.commonService.commonUrl + "account/MultipleFileUpload";
    this.showLoader=true 
    this.http.post(url, formData, options).subscribe((res) => {
      console.log(res)
      setTimeout(() => {
        let body: string = JSON.parse(res['_body']);
        this.profileimage = body[0];
        this.showLoader=false
      }, 1000);
    });
    //})
  }

  addfamilysubmit() {
    let date = this.addfamily.value.issuedate;
    let getday = date.getDate();
    let getmonth = date.getMonth() + 1;
    let getyear = date.getFullYear();

    let isuedate = getday + "/" + getmonth + "/" + getyear;


    let exdate = this.addfamily.value.expdate;
    let exday = exdate.getDate();
    let exmonth = exdate.getMonth() + 1;
    let exyear = exdate.getFullYear();

    let expirydate = exday + "/" + exmonth + "/" + exyear;


    if (this.profileimage == "" || this.profileimage == "undefined" || this.profileimage == undefined) {
      this.profileimage = "";
    }

    console.log(this.addfamily.valid)
    if (this.addfamily.valid == false) {
      this.checkValidationErrorssubmit(this.addfamily);
    } else {

      console.log(this.addfamily.value.fname);
      console.log(this.addfamily.value.nameval);
      console.log(this.addfamily.value.doc);
      console.log(this.addfamily.value.docnum);
      console.log(this.addfamily.value.issuedate);
      console.log(this.addfamily.value.expdate);
      //  if(this.issudate==""||this.issudate=="undefined"||this.issudate==undefined||this.issudate=="null"||this.issudate==null){
      //   this.issudate="";
      //  }



      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);
      console.log(this.profileimage)
      // our service calling as usual

      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations";
      let serviceUrl = this.commonService.commonUrl + "Account/Patient_operations";
      let params = {
        "sno": this.patientId,
        "clinicid": this.userid,
        "loginid": this.userid,
        "patient_id": "",
        "Title": "",
        "Ara_firstname": "",
        "Ara_Lastname": "",
        "Ara_fathername": "",
        "First_name": this.addfamily.value.fname,
        "Last_Name": this.addfamily.value.nameval,
        "Middle_name": this.addfamily.value.doc,
        "DOB": isuedate,    //this.issudate,
        "DOB_Arabic": "",
        "Gender": this.addfamily.value.gender,
        "Marital_status": "",
        "Identification_type": this.addfamily.value.docnum,
        //"Identification_no":,
        "Identification_no": this.profileimage,
        "Identification_attachment": "",
        "Identification_Expiry": expirydate,    //this.exppiredate,
        "Nationality": "",
        "Occupation": "",
        "Area": "",
        "Block": "",
        "Building": "",
        "Street": "",
        "Floor": "",
        "City": "",
        "Country": "",
        "Email": "",
        "Mobileno": "",
        "Home_phone": "",
        "Work_phoneno": "",
        "Emergency_contact": "",
        "Notes": "",
        "Reminder_type": "",
        "status": "",
        "Trans_date": "",
        "Last_update": "",
        "Condition": "Familydetailsinsert",
        "Par1": "",
        "Par2": "",
        "Par3": ""
      }
      console.log(params);
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      // this.PArray=[];
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);

        if (result.status_cd === "1") {
          // this.isPageloaderVisible=false;
          alert("Inserted Successfully");
          // $('#familymeme').val('');
          // $('#name').val('');
          // $('#doc').val('');
          // $('#docno').val('');
          // $('#isuedate').val('');
          // $('#experdate').val('');
          // $('#file').val('');




          //this.router.navigate(['/ReferralMasterDetails']);
          this.getfamilydetails();
        } else {
          // this.isPageloaderVisible=false;
          // this.hideLoader=true;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          //  this.isPageloaderVisible=false;
          //  this.hideLoader=true;
          console.log(error);
          //  console.log(accessToken);
          //   alert(error)
        }
      );


    }
  }

  cancelfamilysubmit() {
    this.router.navigate(['/viewpatient'], { queryParams: { id: this.patientId } })
  }
  refresh(): void {
    window.location.reload();
  }
}
