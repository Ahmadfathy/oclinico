import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';

@Component({
  selector: 'app-addclinicinformation',
  templateUrl: './addclinicinformation.component.html',
  styleUrls: ['./addclinicinformation.component.css']
})
export class AddclinicinformationComponent implements OnInit {
  userid: any;
  addclinic: FormGroup;
  branchnames: any = [];
  fromsubmit: boolean;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  language: any;
  alertcount: any = [];
  fromvalue: any;
  public langulagetype: any = 'EN';
  myForm: FormGroup;
  mysessionForm: FormGroup;
  public daywiseif: boolean = false;
  public sessionwiseif: boolean = false;
  public formArrayLength: number = 0;
  public weekdays: any = [
    {
      "day": "Sunday",
      "id": 1,
    },
    {
      "day": "Monday",
      "id": 2,
    },
    {
      "day": "Tuesday",
      "id": 3,
    },
    {
      "day": "Wednesday",
      "id": 4,
    }
    ,
    {
      "day": "Thursday",
      "id": 5,
    },
    {
      "day": "Friday",
      "id": 6,
    },
    {
      "day": "Saturday",
      "id": 7,
    }
  ]

  public days: any = [{ "id": "day1", "day": "Sunday" }, { "id": "day2", "day": "Monday" }, { "id": "day3", "day": "Tuesday" }, { "id": "day4", "day": "Wednesday" }, { "id": "day5", "day": "Thursday" }, { "id": "day6", "day": "Friday" }, { "id": "day7", "day": "Saturday" }];
  public sessiondays: any = [{ "id": "sday1", "day": "Sunday" }, { "id": "sday2", "day": "Monday" }, { "id": "sday3", "day": "Tuesday" }, { "id": "sday4", "day": "Wednesday" }, { "id": "sday5", "day": "Thursday" }, { "id": "sday6", "day": "Friday" }, { "id": "sday7", "day": "Saturday" }]
  public title: any = ["AM", "PM"];
  public daysdata: any = [];
  public sessiondata: any = [];
  public totaldays: any = [];
  public sessiontotaldays: any = [];
  dayorsessionval: any;

  formErrors = {
    'branch': '',
    'spec': '',
    'inenglish1': '',
    'inenglish2': '',
    'inenglish3': '',
    'inarabic1': '',
    'inarabic2': '',
    'inarabic3': '',
    'website': '',
    'email': '',
    'comemail': '',
    'phno': '',
    'mobile': '',
    'clinicno': '',
    'address': '',
    'city': '',
    'country': '',
    'businessno': '',
    'nationalno': '',
    'muncipalno': '',
    'url': '',
    'fromtime': '',
    'scheduletypeinput': '',
    'password': '',
    'img': '',
  }

  ValidationMessages = {
    'branch': {
      'required': 'Please enter branch name'
    },
    'spec': {
      'required': 'Please enter specialization'
    },
    // 'inenglish1': {
    //   'required': 'Please enter first name',
    //   'pattern': 'Please Enter Valid Name'
    // },
    // 'inenglish2': {
    //   'required': 'Please enter middle name',
    //   'pattern': 'Please Enter Valid Name'
    // },
    // 'inenglish3': {
    //   'required': 'Please enter last name',
    //   'pattern': 'Please Enter Valid Name'
    // },
    // 'inarabic1': {
    //   'required': 'Please enter first name in arabic',
    //   'languageCheck': 'Please enter only Arabic Names',
    //   'minLength': 'Please enter minimum 3 arabic letters'
    // },
    // 'inarabic2': {
    //   'required': 'Please enter middle name in arabic',
    //   'languageCheck': 'Please enter only Arabic Names',
    //   'minLength': 'Please enter minimum 3 arabic letters'
    // },
    // 'inarabic3': {
    //   'required': 'Please enter father name in arabic',
    //   'languageCheck': 'Please enter only Arabic Names',
    //   'minLength': 'Please enter minimum 3 arabic letters'
    // },
    'email': {
      'required': 'Please enter email id',
      'pattern': 'Invalid Email ID'
    },
    'phno': {
      'required': 'Please enter phone number',
    },
    'mobile': {
      'required': 'Please enter mobile number',
    },
    'password': {
      'required': 'Please enter password',
    },
  }

  ValidationarabicMessages = {
    'branch': {
      'required': 'الرجاء إدخال اسم  الفرع'
    },
    'spec': {
      'required': 'الرجاء إدخال التخصص'
    },
    // 'inenglish1': {
    //   'required': 'الرجاء إدخال الاسم الأول',
    //   'pattern': 'الرجاء إدخال اسم صحيح'
    // },
    // 'inenglish2': {
    //   'required': 'الرجاء إدخال الاسم الأوسط',
    //   'pattern': 'الرجاء إدخال اسم صحيح'
    // },
    // 'inenglish3': {
    //   'required': 'الرجاء إدخال الاسم الأخير',
    //   'pattern': 'الرجاء إدخال اسم صحيح'
    // },
    // 'inarabic1': {
    //   'required': 'الرجاء إدخال الاسم الأول باللغة العربية',
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط',
    //   'minLength': 'Please enter minimum 3 arabic letters',
    // },
    // 'inarabic2': {
    //   'required': 'الرجاء إدخال الاسم الأوسط باللغة العربية',
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط',
    //   'minLength': 'Please enter minimum 3 arabic letters',
    // },
    // 'inarabic3': {
    //   'required': 'الرجاء إدخال الاسم الأخير باللغة العربية',
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط',
    //   'minLength': 'Please enter minimum 3 arabic letters',
    // },
    'email': {
      'required': 'الرجاء إدخال معرف البريد الإلكتروني',
      'pattern': 'معرف البريد الإلكتروني غير صالح'
    },
    'phno': {
      'required': 'الرجاء إدخال رقم الهاتف',
    },
    'mobile': {
      'required': 'رقم الجوال مطلوب',
    },
    'password': {
      'required': 'الرجاء إدخال كلمه المرور',
    },
  }
  countries: any = [];
  public displayimg: any;
  public imgres: any;
  public displayimg1: any;
  public imgres1: any;
  public displayimg2: any;
  public imgres2: any;
  checkedboxesValidate: any = [];
  checkbox_validation: any = [];
  previous_checkbox_value: any = [];
  checkboxsession_validation = [];
  previoussession_checkbox_value = [];
  schedule: any = [];
  allCheckedDays: any = [];
  allCheckedStartTimings: any = [];
  allCheckedEndTimings: any = [];
  allCheckeds2StartTimings: any = [];
  allCheckeds2EndTimings: any = [];
  public isPageloaderVisible = true;
  result: any;
  nationalid: any;
  muncipalid: any;
  businessid: any;
  pwdgen: any;
  timingsarr: any;
  engarray: any = [];
  arabicarray: any[];
  engerror: boolean = false;
  arabicerror: boolean = false;
  commonerror: boolean = false;

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId");
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
        'branch': '',
        'spec': '',
        'inenglish1': '',
        'inenglish2': '',
        'inenglish3': '',
        'inarabic1': '',
        'inarabic2': '',
        'inarabic3': '',
        'website': '',
        'email': '',
        'comemail': '',
        'phno': '',
        'mobile': '',
        'clinicno': '',
        'address': '',
        'city': '',
        'country': '',
        'businessno': '',
        'nationalno': '',
        'muncipalno': '',
        'url': '',
        'fromtime': '',
        'scheduletypeinput': '',
        'password': '',
        'img': '',
      }
    })
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.getcountry();
    this.dayssession();
    for (var i = 0; i < this.weekdays.length; i++) {
      this.alertcount.push(0);
    }
    this.addclinic = this.formBuilder.group({
      branch: ['', Validators.required],
      spec: ['', Validators.required],
      // inenglish1: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inenglish2: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inenglish3: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inarabic1: ['', [Validators.required, CustomValidators.languageCheck(''), Validators.minLength(3)]],
      // inarabic2: ['', [Validators.required, CustomValidators.languageCheck(''), Validators.minLength(3)]],
      // inarabic3: ['', [Validators.required, CustomValidators.languageCheck(''), Validators.minLength(3)]],
      inenglish1: [],
      inenglish2: [],
      inenglish3: [],
      inarabic1: [],
      inarabic2: [],
      inarabic3: [],
      website: [],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
      comemail: [],
      phno: ['', Validators.required],
      mobile: ['', Validators.required],
      clinicno: [],
      address: [],
      city: [],
      country: [],
      businessno: [],
      nationalno: [],
      muncipalno: [],
      url: [],
      fromtime: [],
      scheduletypeinput: [],
      password: ['', [Validators.required]],
      img: []
    });
    //this.setUserCategoryValidators();
    this.addclinic.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.addclinic);
    });
  }

  arabicenglishhandling() {
    //..................arabic and englishnames handlings...................
    this.engarray=[];
    this.arabicarray=[];
    console.log(this.addclinic.value.inenglish1 !== null)
    console.log(this.addclinic.value.inenglish1 !== '')
    if (this.addclinic.value.inenglish1 === null) {
      this.addclinic.value.inenglish1 = ''
    }
    if (this.addclinic.value.inenglish1 != "") {
      this.engarray.push(this.addclinic.value.inenglish1);
      console.log(this.engarray)
    }

    if (this.addclinic.value.inenglish2 === null) {
      this.addclinic.value.inenglish2 = ''
    }
    if (this.addclinic.value.inenglish2 != "") {
      this.engarray.push(this.addclinic.value.inenglish2);
    }
    if (this.addclinic.value.inenglish3 === null) {
      this.addclinic.value.inenglish3 = ''
    }
    if (this.addclinic.value.inenglish3 != "") {
      this.engarray.push(this.addclinic.value.inenglish3);
    }
    //........................................................
    if (this.addclinic.value.inarabic1 === null) {
      this.addclinic.value.inarabic1 = ''
    }
    if (this.addclinic.value.inarabic1 != "") {
      this.arabicarray.push(this.addclinic.value.inarabic1)
    }
    if (this.addclinic.value.inarabic2 === null) {
      this.addclinic.value.inarabic2 = ''
    }
    if (this.addclinic.value.inarabic2 != "") {
      this.arabicarray.push(this.addclinic.value.inarabic2)
    }
    if (this.addclinic.value.inarabic3 === null) {
      this.addclinic.value.inarabic3 = ''
    }
    if (this.addclinic.value.inarabic3 != "") {
      this.arabicarray.push(this.addclinic.value.inarabic3)
    }
    console.log(this.engarray + "...." + this.engarray.length)
    console.log(this.arabicarray + "...." + this.arabicarray.length)
    if (this.engarray.length == 0) {
      console.log("entered into eng")
      // alert("please enter english names");
      this.engerror = true;
      return false;
    }
    else {
      this.engerror = false;
    }
    if (this.arabicarray.length == 0) {
      this.arabicerror = true;
      return false;
      // alert("please enter arabic names");
    }
    else {
      this.arabicerror = false;
    }

    if (this.engarray.length != 0 && this.arabicarray.length != 0) {
      console.log("entered  if");
      if ((this.engarray.length < 3) && (this.arabicarray.length < 3)) {
        console.log("entered into two if");
        // alert("please enter english/arabic names fully.");
        this.commonerror = true;
        this.arabicerror = false;
        this.engerror = false;
        return false;
      }
      else {
        this.commonerror = false;
        this.arabicerror = false;
        this.engerror = false;
      }
    }
    else {
    }
  }

  eng1(evnt, val) {
    console.log(evnt.target.value);
    if (val == "engname1") {
      if ((evnt.target.value == "") && (this.addclinic.value.inenglish2 == "") && (this.addclinic.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname2") {
      if ((evnt.target.value == "") && (this.addclinic.value.inenglish1 == "") && (this.addclinic.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname3") {
      if ((evnt.target.value == "") && (this.addclinic.value.inenglish2 == "") && (this.addclinic.value.inenglish1 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }

    if ((this.addclinic.value.inenglish1 != "") && (this.addclinic.value.inenglish2 != "") && (this.addclinic.value.inenglish3 != "")) {
      this.commonerror = false;
    }
    else {
      // this.commonerror=true;
    }
  }
  arb(evnt, val) {
    console.log(val)
    if (val == "arb1") {
      if ((evnt.target.value == "") && (this.addclinic.value.inarabic2 == "") && (this.addclinic.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb2") {
      if ((evnt.target.value == "") && (this.addclinic.value.inarabic1 == "") && (this.addclinic.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb3") {
      if ((evnt.target.value == "") && (this.addclinic.value.inarabic2 == "") && (this.addclinic.value.inarabic1 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }

    console.log(this.addclinic.value.inarabic1)
    if ((this.addclinic.value.inarabic1 != "") && (this.addclinic.value.inarabic2 != "") && (this.addclinic.value.inarabic3 != "")) {
      this.commonerror = false;
    }
  }


  fromkey(val) {
    let timepattern = /[0-9\:]/
    let inputChar = String.fromCharCode(val.charCode);
    if (!timepattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  emailcheck() {
    // if (this.addclinic.value.email != "") {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Getdata_By_Id";
    let serviceUrl = this.commonService.commonUrl + "Account/Getdata_By_Id"
    let params = {
      "operation": "CheckEmailID",
      "value": this.addclinic.value.email,
      "uid": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(params);
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.data.Table[0].Result == "True") {
        alert("Email ID Already exists");
        this.addclinic.patchValue({
          email: ""
        })
        return false;
      } else {
        console.log(result.error_msg);
        console.log(accessToken);
      }
    },
      error => {
        console.log(error);
      }
    );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
    // }
  }

  mobilecheck() {
    // if (this.addclinic.value.mobile != "") {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/user_transactions";
    let serviceUrl = this.commonService.commonUrl + "Account/user_transactions"
    let params =
    {
      "Clinic_ID": this.userid,
      "Branchid": "",
      "Emp_Id": "",
      "Pwd": "",
      "Title": "",
      "First_name": "",
      "Middle_name": "",
      "Last_name": "",
      "ARA_Fname": "",
      "ARA_Lname": "",
      "ARA_FatherName": "",
      "Gender": "",
      "Marital_status": "",
      "Identification_type": "",
      "Identification_cardno": "",
      "Identification_attach": "",
      "Expiry_date": "",
      "Nationality": "",
      "occupation": "",
      "jobtitle": "",
      "Department": "",
      "Residence_card": "",
      "Hire_date": "",
      "Mobile": this.addclinic.value.mobile,
      "Homeno": "",
      "start_date": "",
      "Salary": "",
      "Sponsersname": "",
      "status": "",
      "schedule_type": "",
      "Loginid": "",
      "days": "",
      "start_session": "",
      "end_session": "",
      "start_session2": "",
      "end_session2": "",
      "start_session3": "",
      "end_session3": "",
      "param1": "",
      "param2": "",
      "condition": "Checkmobile"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(params);
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.data.Table[0].Result == "True") {
        alert("Mobile Number Already exists");
        this.addclinic.patchValue({
          mobile: ""
        })
        return false;
      } else {
        console.log(result.error_msg);
        console.log(accessToken);
      }
    },
      error => {
        console.log(error);
      }
    );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
    // }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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

  dayampmchange(ind) {
    console.log("index.. " + ind);
    console.log("ampm change entered... ");
    const controlnew = this.myForm.get(['rows', ind, 'titleinput'])
    console.log(controlnew.value);
    if (controlnew.value == "" || controlnew.value == null) {
      console.log("entered if");
      alert("Please select am/pm");
      this.addclinic.patchValue({
        totime: ""
      })
      return false;
    } else {
      console.log("entered else");
    }
  }

  sessionampmchange(ind, name) {
    console.log("index.. " + ind);
    console.log("name... " + name);
    console.log("ampm change entered... ");
    const controlA = this.mysessionForm.get(['sessionrows', ind, 'sessionstart1input'])
    const controlB = this.mysessionForm.get(['sessionrows', ind, 'sessionend1input'])
    const controlC = this.mysessionForm.get(['sessionrows', ind, 'sessionstart2input'])
    console.log(controlA.value);
    if (name == "ses1end") {
      if (controlA.value == "" || controlA.value == null) {
        console.log("entered if");
        alert("Please select am/pm");
        this.addclinic.patchValue({
          session1end: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
    if (name == "ses2start") {
      if (controlB.value == "" || controlB.value == null) {
        console.log("entered if");
        alert("Please select am/pm");
        this.addclinic.patchValue({
          session2start: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
    if (name == "ses2end") {
      if (controlC.value == "" || controlC.value == null) {
        console.log("entered if");
        alert("Please select am/pm");
        this.addclinic.patchValue({
          session2end: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
  }

  dayssession() {
    this.myForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
    this.patchValues();
    console.log(this.myForm);
    console.log(this.myForm.controls.value);

    var b = 1
    this.myForm.get('rows').valueChanges.subscribe(values => {
      console.log(values);
      this.totaldays = values;
      var currentIndex;
      console.log(this.totaldays);

      var even = function (ele) {
        console.log(ele)
        return ele.checkbox_value == true;
      }
      console.log(this.totaldays.some(even));
      if (this.totaldays.some(even) == true) {
        console.log(this.schedule.includes("Day Wise"))
        if (this.schedule.includes("Day Wise") == false) {
          this.schedule.push(this.addclinic.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Day Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      console.log(this.schedule)
      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true) {
          console.log(i);
          if ((this.totaldays[i].fromtime != null) && (this.totaldays[i].totime != null)) {
            if ((this.totaldays[i].fromtime + this.totaldays[i].titleinput) == (this.totaldays[i].totime + this.totaldays[i].titleinput1)) {
              alert("Start and End Time will not be Same");
              currentIndex = i;
              console.log(currentIndex);
              var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
              var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
              var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
              console.log(endTime);
              console.log(endtimeselect);
              endTime.value = '';
              endtimeselect.value = '';
            }
          }
        }
        else {
          // console.log("entered into day else.....")
          currentIndex = i;
          var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
          //  console.log(currentDay)
          var startTime = (<HTMLInputElement>currentDay.querySelector('.startTime'));
          var starttimeselect = (<HTMLInputElement>currentDay.querySelector('.starttimeselect'));
          var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
          var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
          startTime.value = '';
          starttimeselect.value = '';
          endTime.value = '';
          endtimeselect.value = '';
        }
      }

      /////////////// Checking Day wise selected and Session wise //////////
      console.log(this.sessiontotaldays);
      console.log(this.totaldays);
      for (let j = 0; j < this.sessiontotaldays.length; j++) {
        console.log("session entered....");
        if (this.sessiontotaldays[j].checkbox_value == true && this.totaldays[j].checkbox_value == true) {
          console.log(this.sessiontotaldays[j]);
          console.log(this.totaldays[j]);
          // alert("Please Uncheck Selected day in another field.");
          console.log("after alert. .. " + j);
          currentIndex = j;
          var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
          var day = (<HTMLInputElement>currentDay.querySelector('.dayName'));
          var startTime = (<HTMLInputElement>currentDay.querySelector('.startTime'));
          var starttimeselect = (<HTMLInputElement>currentDay.querySelector('.starttimeselect'));
          var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
          var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
          day.value = 'false';
          startTime.value = '';
          starttimeselect.value = '';
          endTime.value = '';
          endtimeselect.value = '';
          $(".dayName").eq(j).prop("checked", false);
          const control = this.myForm.get(['rows', j, 'checkbox_value']);
          control.setValue(null);
        }
      }
    })

    //...........for session wise............
    this.mysessionForm = this.formBuilder.group({
      sessionrows: this.formBuilder.array([]),
    });
    this.sessionpatchValues();
    var a = 1;
    this.mysessionForm.get('sessionrows').valueChanges.subscribe(values => {
      // console.log(values);
      this.sessiontotaldays = values;
      var element = function (ele) {
        // console.log(ele)
        return ele.checkbox_value == true;
      }
      // console.log(this.sessiontotaldays.some(element));
      if (this.sessiontotaldays.some(element) == true) {
        if (this.schedule.includes("Session Wise") == false) {
          this.schedule.push(this.addclinic.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Session Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      // console.log(this.schedule)

      for (let i = 0; i < this.sessiontotaldays.length; i++) {
        if (this.sessiontotaldays[i].checkbox_value == true) {
          if ((this.sessiontotaldays[i].session1start != null) && (this.sessiontotaldays[i].session1end != null)) {
            if ((this.sessiontotaldays[i].session1start + this.sessiontotaldays[i].sessionstart1input) == (this.sessiontotaldays[i].session1end + this.sessiontotaldays[i].sessionend1input)) {
              alert("Start and End Time will not be Same");
              var index = i
              var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
              var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
              var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
              session1endtime.value = '';
              session1endselect.value = '';
            }
          }
          if ((this.sessiontotaldays[i].session2start != null) && (this.sessiontotaldays[i].session2end != null)) {
            if ((this.sessiontotaldays[i].session2start + this.sessiontotaldays[i].sessionstart2input) == (this.sessiontotaldays[i].session2end + this.sessiontotaldays[i].sessionend2input)) {
              alert("Start and End Time will not be Same");
              var index = i
              var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
              var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
              var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
              session2endtime.value = '';
              session2endselect.value = '';
            }
          }
          //// Mywork Start ////

          if ((this.sessiontotaldays[i].session1end != null) && (this.sessiontotaldays[i].session2start != null) && (this.sessiontotaldays[i].sessionstart2input != null)) {
            console.log("first if condtion. . .");
            console.log(this.sessiontotaldays[i].session1end + ". .. " + this.sessiontotaldays[i].session2start);
            if ((this.sessiontotaldays[i].session1end + this.sessiontotaldays[i].sessionend1input) == (this.sessiontotaldays[i].session2start + this.sessiontotaldays[i].sessionstart2input)) {
              alert("Session1 End Time & Session2 Start Timings will not be Same");
              const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
              control5.setValue(null);
              const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
              control6.setValue(null);
            }

            //console.log(this.sessiontotaldays[i].session1end + ". . ." +this.sessiontotaldays[i].sessionend1input);
            let S1endhrs = ((this.sessiontotaldays[i].session1end).split(":")[0]);
            let S1endmins = ((this.sessiontotaldays[i].session1end).split(":")[1]);
            let S1endzone = this.sessiontotaldays[i].sessionend1input;
            let S2Starthrs = ((this.sessiontotaldays[i].session2start).split(":")[0]);
            let S2Startmins = ((this.sessiontotaldays[i].session2start).split(":")[1]);
            let S2Startzone = this.sessiontotaldays[i].sessionstart2input;

            let s1tm = S1endhrs + S1endzone;
            let s2tm = S2Starthrs + S2Startzone;
            console.log(s1tm + ". . " + s2tm);
            this.timingsarr = [];
            this.timingsarr.push("12AM");
            for (var ti = 1; ti <= 12; ti++) {

              let ti1: string;
              if (ti < 10) {
                ti1 = '0' + ti;
              } else {
                ti1 = ti.toString();
              }

              if (ti1 == "12") {
                this.timingsarr.push(ti1 + "PM");
              } else {
                this.timingsarr.push(ti1 + "AM");
              }
            }

            for (let tj = 1; tj <= 11; tj++) {
              let tj1: string;
              if (tj < 10) {
                tj1 = '0' + tj;
              } else {
                tj1 = tj.toString();
              }
              this.timingsarr.push(tj1 + "PM")
            }

            console.log(this.timingsarr)
            let s1pos = 0;
            let s2pos = 0;
            for (let s = 0; s < this.timingsarr.length; s++) {
              if (s1tm == this.timingsarr[s]) {
                s1pos = s;
              }

              if (s2tm == this.timingsarr[s]) {
                s2pos = s;
              }
            }

            console.log(s1pos + ". . ." + s2pos);

            if (s1pos > s2pos) {
              alert("Session2 Start Time is after Session1 End Time");
              const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
              control5.setValue(null);
              const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
              control6.setValue(null);
            }

          }

          //// MyWrk ENd ///
        }
        else {
          // console.log("ented session....");
          // console.log(this.mysessionForm);
          var index = i
          console.log(index)
          var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
          // console.log(currentsession);
          var session1starttime = (<HTMLInputElement>currentsession.querySelector('.session1starttime'));
          var session1startselect = (<HTMLInputElement>currentsession.querySelector('.session1startselect'));
          var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
          var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
          var session2starttime = (<HTMLInputElement>currentsession.querySelector('.session2starttime'));
          var session2startselect = (<HTMLInputElement>currentsession.querySelector('.session2startselect'));
          var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
          var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
          session1starttime.value = '';
          session1startselect.value = '';
          session1endtime.value = '';
          session1endselect.value = '';
          session2starttime.value = '';
          session2startselect.value = '';
          session2endtime.value = '';
          session2endselect.value = '';
        }
      }
      for (let j = 0; j < this.totaldays.length; j++) {
        if (this.totaldays[j].checkbox_value == true && this.sessiontotaldays[j].checkbox_value == true) {
          // console.log(this.totaldays[j])
          // console.log(this.sessiontotaldays[j])
          var index = j
          var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
          var dayname = (<HTMLInputElement>currentsession.querySelector('.sessioninput'));
          var session1starttime = (<HTMLInputElement>currentsession.querySelector('.session1starttime'));
          var session1startselect = (<HTMLInputElement>currentsession.querySelector('.session1startselect'));
          var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
          var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
          var session2starttime = (<HTMLInputElement>currentsession.querySelector('.session2starttime'));
          var session2startselect = (<HTMLInputElement>currentsession.querySelector('.session2startselect'));
          var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
          var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
          dayname.value = 'false';
          session1starttime.value = '';
          session1startselect.value = '';
          session1endtime.value = '';
          session1endselect.value = '';
          session2starttime.value = '';
          session2startselect.value = '';
          session2endtime.value = '';
          session2endselect.value = '';
          $(".sessioninput").eq(j).prop("checked", false);
          const control = this.mysessionForm.get(['sessionrows', j, 'checkbox_value']);
          control.setValue(null);
          console.log(values);
          console.log(this.mysessionForm);
          return false;
        }
      }
    })
  }

  sessionclick() {
    //console.log(this.sessiontotaldays);
    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
        //console.log(this.sessiontotaldays[i]);
        if (this.sessiontotaldays[i].session1start.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.sessiontotaldays[i].session1start.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.sessiontotaldays[i].session1start.split(":")[1] == undefined) || (this.sessiontotaldays[i].session1start.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
        if (this.sessiontotaldays[i].session1end.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.sessiontotaldays[i].session1end.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.sessiontotaldays[i].session1end.split(":")[1] == undefined) || (this.sessiontotaldays[i].session1end.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
        if (this.sessiontotaldays[i].session2start.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.sessiontotaldays[i].session2start.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.sessiontotaldays[i].session2start.split(":")[1] == undefined) || (this.sessiontotaldays[i].session2start.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
        if (this.sessiontotaldays[i].session2end.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.sessiontotaldays[i].session2end.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.sessiontotaldays[i].session2end.split(":")[1] == undefined) || (this.sessiontotaldays[i].session2end.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
      }
    }
  }

  checkboxchange(row, value, indx) {
    console.log("checkbox changed. .");
    console.log(row);
    console.log(value);
    console.log(indx);
    console.log(JSON.stringify(this.totaldays));
    console.log(JSON.stringify(this.checkbox_validation));
    console.log(this.checkbox_validation.length);
    for (var i = 0; i < this.sessiontotaldays.length; i++) {
      if (value == this.sessiontotaldays[i].day) {
        if (this.sessiontotaldays[i].checkbox_value == true) {
          //break;
          $(".dayName").eq(indx).prop("checked", false);
          alert("Please uncheck " + this.sessiontotaldays[i].day + " in session wise");
          const control = this.myForm.get(["rows", indx, "checkbox_value"]);
          control.setValue(null);
          return false;
        }
      }
    }

    if (this.checkbox_validation.length != 0) {
      console.log(JSON.stringify(this.checkbox_validation));
      console.log(this.checkbox_validation[0].fromtime);
      console.log(value);
      if (value == this.checkbox_validation[0].day) {
        const control1 = this.myForm.get(['rows', this.previous_checkbox_value[0], 'fromtime'])
        control1.setValue(null);
        const control2 = this.myForm.get(['rows', this.previous_checkbox_value[0], 'titleinput'])
        control2.setValue(null);
        const control3 = this.myForm.get(['rows', this.previous_checkbox_value[0], 'totime'])
        control3.setValue(null);
        const control4 = this.myForm.get(['rows', this.previous_checkbox_value[0], 'titleinput1'])
        control4.setValue(null);
        this.checkbox_validation = [];
        this.previous_checkbox_value = [];
        console.log(this.checkbox_validation);
        console.log(this.previous_checkbox_value);
      }
      else {
        //this.checkbox_validation[0] = this.totaldays[this.previous_checkbox_value[0]];
        if (value == this.checkbox_validation[0].day) {
          this.checkbox_validation = [];
          this.previous_checkbox_value = [];
          console.log(this.checkbox_validation);
          console.log(this.previous_checkbox_value);
        }
        else {
          this.checkbox_validation[0] = this.totaldays[this.previous_checkbox_value[0]];
          if ((this.checkbox_validation[0].fromtime == null) || (this.checkbox_validation[0].titleinput == null)
            || (this.checkbox_validation[0].totime == null) || (this.checkbox_validation[0].titleinput1 == null)
            ||(this.checkbox_validation[0].fromtime == "") || (this.checkbox_validation[0].titleinput == "")
            || (this.checkbox_validation[0].totime == "") || (this.checkbox_validation[0].titleinput1 == "")) {
            alert("Please Enter Timings for " + this.checkbox_validation[0].day);
            const control = this.myForm.get(["rows", indx, "checkbox_value"]);
            control.setValue(null);
          } else {
            this.checkbox_validation = [];
            this.previous_checkbox_value = [];
            this.checkbox_validation.push(this.totaldays[indx])
            this.previous_checkbox_value.push(indx);
          }
        }
      }
    }
    else {
      // this.checkbox_validation.push(row.value);
      this.checkbox_validation.push(this.totaldays[indx]);
      this.previous_checkbox_value.push(indx);
      console.log(this.checkbox_validation);
      for (let i = 0; i < this.totaldays.length; i++) {
        console.log("entered for..");
        if ((this.checkbox_validation[0].day != this.totaldays[i].day)
          && (this.totaldays[i].checkbox_value == true)) {
            console.log("entered if 1..");
            console.log("end... "+this.totaldays[i].totime);
          if ((this.totaldays[i].fromtime == "")
              ||(this.totaldays[i].totime == "")) {
            console.log("end... "+this.totaldays[i].totime);
            alert('Please enter timings for ' + this.totaldays[i].day)
            for (let j = 0; j < this.totaldays.length; j++) {
              console.log(this.checkbox_validation[0].day)
              console.log(this.totaldays[j].day);
              if ((this.checkbox_validation[0].day == this.totaldays[j].day)
                && (this.totaldays[j].checkbox_value == true)) {
                const control = this.myForm.get(["rows", j, "checkbox_value"]);
                console.log(control)
                control.setValue(null);
              }
            }
          }
        }
      }
      this.checkbox_validation = [];
    }
  }

  checkboxsessionchange(row, value, indx) {
    console.log(row);
    console.log(value);
    console.log(indx);

    for (var i = 0; i < this.totaldays.length; i++) {
      if (value == this.totaldays[i].day) {
        if (this.totaldays[i].checkbox_value == true) {
          //break;
          $(".sessioninput").eq(indx).prop("checked", false);
          alert("Please uncheck " + this.totaldays[i].day + " in day wise");
          const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
          control.setValue(null);
          return false;
        }
      }
    }

    if (this.checkboxsession_validation.length != 0) {
      console.log(JSON.stringify(this.checkboxsession_validation));
      console.log(this.checkboxsession_validation[0].day);
      console.log(value);
      if (value == this.checkboxsession_validation[0].day) {
        const control1 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'session1start'])
        control1.setValue(null);
        const control2 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'sessionstart1input'])
        control2.setValue(null);
        const control3 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'session1end'])
        control3.setValue(null);
        const control4 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'sessionend1input'])
        control4.setValue(null);
        const control5 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'session2start'])
        control5.setValue(null);
        const control6 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'sessionstart2input'])
        control6.setValue(null);
        const control7 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'session2end'])
        control7.setValue(null);
        const control8 = this.mysessionForm.get(['sessionrows', this.previoussession_checkbox_value[0], 'sessionend2input'])
        control8.setValue(null);
        this.checkboxsession_validation = [];
        this.previoussession_checkbox_value = [];
        console.log(this.checkboxsession_validation);
        console.log(this.previoussession_checkbox_value);

      }
      else {
        if (this.checkboxsession_validation[0].checkbox_value == null) {
          // alert("else first if. .");
          this.checkboxsession_validation = [];
          this.previoussession_checkbox_value = [];
          this.checkboxsession_validation.push(this.sessiontotaldays[indx])
          this.previoussession_checkbox_value.push(indx);
        } else {
          this.checkboxsession_validation[0] = this.sessiontotaldays[this.previoussession_checkbox_value[0]];
          console.log(this.checkboxsession_validation[0]);
          if ((this.checkboxsession_validation[0].session1start == null) || (this.checkboxsession_validation[0].sessionstart1input == null)
            || (this.checkboxsession_validation[0].session1end == null) || (this.checkboxsession_validation[0].sessionend1input == null)
            || (this.checkboxsession_validation[0].session2start == null) || (this.checkboxsession_validation[0].sessionstart2input == null)
            || (this.checkboxsession_validation[0].session2end == null) || (this.checkboxsession_validation[0].sessionend2input == null)
            || (this.checkboxsession_validation[0].session1start == "") || (this.checkboxsession_validation[0].sessionstart1input == "")
            || (this.checkboxsession_validation[0].session1end == "") || (this.checkboxsession_validation[0].sessionend1input == "")
            || (this.checkboxsession_validation[0].session2start == "") || (this.checkboxsession_validation[0].sessionstart2input == "")
            || (this.checkboxsession_validation[0].session2end == "") || (this.checkboxsession_validation[0].sessionend2input == "")) {

            alert("Please Enter Timings for " + this.checkboxsession_validation[0].day);
            const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
            control.setValue(null);

          } else {
            this.checkboxsession_validation = [];
            this.previoussession_checkbox_value = [];
            this.checkboxsession_validation.push(this.sessiontotaldays[indx])
            this.previoussession_checkbox_value.push(indx);
          }
        }
      }
    }
    else {
      // this.checkbox_validation.push(row.value);
      this.checkboxsession_validation.push(this.sessiontotaldays[indx]);
      console.log(this.checkboxsession_validation);
      this.previoussession_checkbox_value.push(indx);
      console.log(this.checkboxsession_validation);
      // for (let i = 0; i < this.sessiontotaldays.length; i++) {
      //   console.log("entered for..");
      //   if ((this.checkboxsession_validation[0].day != this.sessiontotaldays[i].day)
      //     && (this.sessiontotaldays[i].checkbox_value == true)) {
      //       console.log("entered if 1..");
      //       console.log("end... "+this.sessiontotaldays[i].session2end);
      //     if ((this.sessiontotaldays[i].session2end == "")
      //         ||(this.sessiontotaldays[i].session2start == "")
      //         ||(this.sessiontotaldays[i].session1start == "")
      //         ||(this.sessiontotaldays[i].session1end == "" )) {
      //       console.log("end... "+this.sessiontotaldays[i].session2end);
      //       alert('Please enter timings for ' + this.sessiontotaldays[i].day)
      //       for (let j = 0; j < this.sessiontotaldays.length; j++) {
      //         console.log(this.checkboxsession_validation[0].day)
      //         console.log(this.sessiontotaldays[j].day);
      //         if ((this.checkboxsession_validation[0].day == this.sessiontotaldays[j].day)
      //           && (this.sessiontotaldays[j].checkbox_value == true)) {
      //           const control = this.mysessionForm.get(["sessionrows", j, "checkbox_value"]);
      //           console.log(control)
      //           control.setValue(null);
                
      //         }
      //       }
      //     }
      //   }
      //    this.checkboxsession_validation = [];
      // }
    }
  
  }

  fromenter(val, key, indx) {
    if (val.target.value.length < 3) {
      console.log("entered..." + val.target.value);
      if (val.target.value == ":") {
        console.log("if : "+val.target.value);
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(1) == ":") {
        console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);

        const control4 = this.myForm.get(['rows', indx, 'fromtime']);
        console.log(". . .." + control4.value);

        control4.setValue(val.target.value);

        this.totaldays[indx].fromtime.slice(0, -1);

      }
    }
    if (val.target.value.length == 2) {
      if (val.target.value > 12) {
        alert("Please enter valid time");
        val.target.value = "";
        return false;
      }
      else {
        console.log(":")
        if (key == 8) {
            val.target.value = val.target.value.slice(0, -1);
            console.log("final valueee.." + val.target.value);
          }else{
            val.target.value = val.target.value + ":";

          }
      }
    }
    if (val.target.value.length > 3) {
      console.log("entered..." + val.target.value);

      if ((val.target.value).charAt(3) == ":") {
        console.log("entered INTO 3...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(4) == ":") {
        console.log("entered into 4...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if (((val.target.value).charAt(3) + (val.target.value).charAt(4)) > 59) {
        alert("Please enter valid min");
        val.target.value = val.target.value.slice(0, -2);
      }
    }
    // if (key == 8) {
    //   val.target.value = val.target.value.slice(0, -1);
    //   console.log("final valueee.." + val.target.value);
    // }
    if (val.target.value.length > 5) {
      val.target.value = val.target.value.slice(0, -1);
    }
    // }
    console.log("keycode..." + key);

  }

  fromtimechange() {
    console.log(this.addclinic.value.fromtime);
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].checkbox_value == true) {
        console.log(this.totaldays[i].fromtime);
        console.log(this.totaldays[i].fromtime.split(":")[0]);
        console.log(this.totaldays[i].fromtime.split(":")[0].length);
        console.log(this.totaldays[i].fromtime.split(":")[1]);

        if (this.totaldays[i].fromtime.split(":")[0].length < 2) {
          const control1 = this.myForm.get(['rows', i, 'fromtime']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.totaldays[i].fromtime.split(":")[0].length == 2)) {
          const control4 = this.myForm.get(['rows', i, 'fromtime']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.totaldays[i].fromtime.split(":")[1] == undefined) || (this.totaldays[i].fromtime.split(":")[1] == "")) {
          const control1 = this.myForm.get(['rows', i, 'fromtime']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
        if (this.totaldays[i].totime.split(":")[0].length < 2) {
          const control1 = this.myForm.get(['rows', i, 'totime']);
          console.log("if here. .");
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
          console.log(control1);
        }
        if ((this.totaldays[i].totime.split(":")[0].length == 2)) {
          const control4 = this.myForm.get(['rows', i, 'totime']);
          console.log(". . .." + control4.value);
          let tempo7 = control4.value;
          // let tempo8 = tempo7 + "00";
          control4.setValue(tempo7);
          console.log(control4);
        }
        if ((this.totaldays[i].totime.split(":")[1] == undefined) || (this.totaldays[i].totime.split(":")[1] == "")) {
          const control1 = this.myForm.get(['rows', i, 'totime']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
      }
    }
  }


  patchValues() {
    let rows = this.myForm.get('rows') as FormArray;
    this.weekdays.forEach(material => {
      rows.push(this.formBuilder.group({
        checkbox_value: [null],
        id: new FormControl({ value: material.id, disabled: true }, Validators.required),
        day: material.day,
        fromtime: [null],
        titleinput: [null],
        totime: [null],
        titleinput1: [null]
      }));
      this.formArrayLength++;
    });
  }

  sessionpatchValues() {
    let sessionrows = this.mysessionForm.get('sessionrows') as FormArray;
    this.weekdays.forEach(material => {

      sessionrows.push(this.formBuilder.group({
        checkbox_value: [null],
        id: new FormControl({ value: material.id, disabled: true }, Validators.required),
        day: material.day,
        session1start: [null],
        sessionstart1input: [null],
        session1end: [null],
        sessionend1input: [null],
        session2start: [null],
        sessionstart2input: [null],
        session2end: [null],
        sessionend2input: [null]
      }));
      this.formArrayLength++;
    });
  }

  selectwise(val) {
    console.log(this.totaldays)
    this.dayorsessionval = val;
    if (val == "Day Wise") {
      this.daywiseif = true;
      this.sessionwiseif = false;
    }
    else if (val == "Session Wise") {
      this.daywiseif = false;
      this.sessionwiseif = true;
    }
  }

  getcountry() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Get_Countries";
    let serviceUrl = this.commonService.commonUrl + "Account/Get_Countries"
    let params = {

    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(params);
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.status_cd == "1") {
        this.countries = result.data.Table;
      } else {
        console.log(result.error_msg);
        console.log(accessToken);
      }
    },
      error => {
        console.log(error);
      }
    );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.addclinic): void {
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
    return this.addclinic.controls;
  }

  getDataDays(val) {
    console.log("days data entered.....");
    this.fromvalue = val;
    var allDays = document.querySelectorAll('.eachDay');

    allDays = Array.prototype.slice.call(allDays);
    console.log(allDays)
    var self = this;
    allDays.forEach((elem) => {
      // console.log(elem);
      var eachDayName = <HTMLInputElement>elem.querySelector('.dayName');

      if (eachDayName.checked === true) {
        console.log(eachDayName);
        console.log(eachDayName.id);

        this.allCheckedDays.push(eachDayName.id);


        var individualStartTime = <HTMLInputElement>elem.querySelector('.startTime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.starttimeselect');
        console.log(individualStartTime.value);
        console.log(individualStartMeridian.value)
        this.allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);

        var individualEndTime = <HTMLInputElement>elem.querySelector('.endTime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.endtimeselect');

        this.allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
        this.allCheckeds2StartTimings.push("");
        this.allCheckeds2EndTimings.push("");
      }

    })
    // ...........session Wise..........................
    var sessionallDays = document.querySelectorAll('.eachsession');
    console.log(sessionallDays);
    sessionallDays.forEach((elem) => {

      var eachDayName = <HTMLInputElement>elem.querySelector('.sessioninput');
      console.log(eachDayName.checked)
      if (eachDayName.checked === true) {
        console.log(eachDayName);

        this.allCheckedDays.push(eachDayName.id);
        //.......................session1 start and end..............
        var individualStartTime = <HTMLInputElement>elem.querySelector('.session1starttime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.session1startselect');
        console.log(individualStartTime.value);
        console.log(individualStartMeridian.value)

        this.allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);

        var individualEndTime = <HTMLInputElement>elem.querySelector('.session1endtime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.session1endselect');

        this.allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
        //..............session 2 start and end.......

        var individuals2StartTime = <HTMLInputElement>elem.querySelector('.session2starttime');
        var individuals2StartMeridian = <HTMLSelectElement>elem.querySelector('.session2startselect');
        console.log(individuals2StartTime.value);
        console.log(individuals2StartMeridian.value)

        this.allCheckeds2StartTimings.push(individuals2StartTime.value + " " + individuals2StartMeridian.value);

        var individuals2EndTime = <HTMLInputElement>elem.querySelector('.session2endtime');
        var individuals2EndMeridian = <HTMLSelectElement>elem.querySelector('.session2endselect');

        this.allCheckeds2EndTimings.push(individuals2EndTime.value + " " + individuals2EndMeridian.value)
      }
      console.log(this.allCheckedDays.toString())
      console.log(this.allCheckedStartTimings.toString());
      console.log(this.allCheckedEndTimings.toString());
      console.log(this.allCheckeds2StartTimings.toString());
      console.log(this.allCheckeds2EndTimings.toString());

    })

    this.finalsubmit(val, this.allCheckedDays.toString(), this.allCheckedStartTimings.toString(), this.allCheckedEndTimings.toString(), this.allCheckeds2StartTimings.toString(), this.allCheckeds2EndTimings.toString());
  }

  submit() {
    this.allCheckedDays = []
    this.allCheckedStartTimings = []
    this.allCheckedEndTimings = []
    this.allCheckeds2StartTimings = []
    this.allCheckeds2EndTimings = []
    this.commonvalidationcheck();
    this.arabicenglishhandling();
    if (this.addclinic.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addclinic);
    }
    else {
      this.getDataDays('fromsubmit');
    }
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].checkbox_value == true) {
        console.log("checked days..." + JSON.stringify(this.totaldays[i]));
      }
    }

    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
        console.log("checked session days..." + JSON.stringify(this.sessiontotaldays[i]));
      }
    }
  }

  commonvalidationcheck() {
    if (this.addclinic.value.comemail == null || this.addclinic.value.comemail == "") {
      this.addclinic.value.comemail = "";
    }
    if (this.addclinic.value.clinicno == null || this.addclinic.value.clinicno == "") {
      this.addclinic.value.clinicno = "";
    }
    if (this.addclinic.value.address == null || this.addclinic.value.address == "") {
      this.addclinic.value.address = "";
    }
    if (this.addclinic.value.website == null || this.addclinic.value.website == "") {
      this.addclinic.value.website = "";
    }
    if (this.addclinic.value.city == null || this.addclinic.value.city == "") {
      this.addclinic.value.city = "";
    }
    if (this.addclinic.value.country == null || this.addclinic.value.country == "") {
      this.addclinic.value.country = "";
    }
    if (this.addclinic.value.businessno == null || this.addclinic.value.businessno == "") {
      this.addclinic.value.businessno = "";
    }
    if (this.addclinic.value.nationalno == null || this.addclinic.value.nationalno == "") {
      this.addclinic.value.nationalno = "";
    }
    if (this.addclinic.value.muncipalno == null || this.addclinic.value.muncipalno == "") {
      this.addclinic.value.muncipalno = "";
    }
    if (this.addclinic.value.url == null || this.addclinic.value.url == "") {
      this.addclinic.value.url = "";
    }
  }

  finalsubmit(val, days, startTime, EndTime, s2start, s2end) {
    if(this.engerror == true || this.arabicerror == true || this.commonerror == true){
      return false;
    }
    console.log("service entered....." + this.addclinic.value.scheduletypeinput);
    console.log(days)
    console.log(startTime)
    console.log(EndTime)
    console.log(s2start)
    console.log(s2end)
    var accessToken = window.localStorage.Tokenval;
    let url = this.commonService.commonUrl + "Account/Registrations_Transactions"
    let body = {
      "sno": "",
      "Clinicid": this.userid,
      "Clinic_Name": this.addclinic.value.branch,
      "First_Name": this.addclinic.value.inenglish1,
      "middle_Name": this.addclinic.value.inenglish2,
      "Last_Name": this.addclinic.value.inenglish3,
      "Arafirst_Name": this.addclinic.value.inarabic1,
      "Aralast_Name": this.addclinic.value.inarabic2,
      "Ara_Fathername": this.addclinic.value.inarabic3,
      "Email": this.addclinic.value.email,
      "Pwd": this.addclinic.value.password,
      "Communicationemailid": this.addclinic.value.comemail,
      "Mail_trans": this.addclinic.value.spec,
      "mailpwd": "",
      "phoneno": this.addclinic.value.phno,
      "mobileno": this.addclinic.value.mobile,
      "Clinicno": this.addclinic.value.clinicno,
      "Address": this.addclinic.value.address,
      "city": this.addclinic.value.city,
      "country": this.addclinic.value.country,
      "Bus_Idno": this.addclinic.value.businessno,
      "Bus_Idimg": this.businessid,
      "National_Idno": this.addclinic.value.nationalno,
      "National_Idimg": this.nationalid,
      "Mun_licno": this.addclinic.value.muncipalno,
      "Mun_licimg": this.muncipalid,
      "Website": this.addclinic.value.website,
      "Map_url": this.addclinic.value.url,
      "SlotType": "",
      "Slot_First": "00:30",
      "Slot_standard": "00:30",
      "timetype": this.schedule.toString(),
      "Trans_Date": "",
      "Last_updated": "",
      "Status": "True",
      "LoginId": this.userid,
      "ClinicStarttiming": startTime,
      "ClinicEndtiming": EndTime,
      "ClinicSess2Start": s2start,
      "ClinicSess2end": s2end,
      "day": days,
      "Operation": "BranchInsrtion",
      "branchId": ""
    }
    console.log("final submit data..." + JSON.stringify(body));
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          this.isPageloaderVisible = false;
          alert("Added Successfully");
          this.router.navigate(['/clinicinformation']);
        } else {
          this.isPageloaderVisible = false;
          console.log("Please try again later");
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

  fileupload(evnt, name) {
    console.log(evnt);
    console.log(name);
    let fileSelected = evnt.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    console.log(body)
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      //"Content-Type": "application/json",
      //Accept: "application/json",
      Authorization: accessToken
    });
    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = "http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.result = body[0];
      console.log(this.result);
      if (name == "nationalid") {
        this.nationalid = body[0];
        // const control1 = this.addclinic.controls.nationalid;
        // console.log(control1);
        // control1.setValue(this.addclinic.value.nationalid);
        // console.log(control1);
      } else if (name == "muncipalid") {
        this.muncipalid = body[0];
        // const control3 = this.addclinic.controls.muncipalid;
        // control3.setValue(this.addclinic.value.muncipalid);
      } else if (name == "businessid") {
        this.businessid = body[0];
        // const control2 = this.addclinic.controls.businessid;
        // control2.setValue(this.addclinic.value.businessid);
      }
    });
    // })
  }
}
