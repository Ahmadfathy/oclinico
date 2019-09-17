import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-editbranch',
  templateUrl: './editbranch.component.html',
  styleUrls: ['./editbranch.component.css']
})
export class EditbranchComponent implements OnInit {
  display_type: any;
  bid: any;
  memtype: any;
  userid: any;
  viewbranch: FormGroup;
  countries: any = [];
  mapsurl: any;
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
  nullValue: any;
  branchname = this.nullValue;
  spec = this.nullValue;
  inenglish1 = this.nullValue;
  inenglish2 = this.nullValue;
  inenglish3 = this.nullValue;
  inarabic1 = this.nullValue;
  inarabic2 = this.nullValue;
  inarabic3 = this.nullValue;
  website = this.nullValue;
  email = this.nullValue;
  comemail = this.nullValue;
  phno = this.nullValue;
  mobile = this.nullValue;
  clinicno = this.nullValue;
  address = this.nullValue;
  city = this.nullValue;
  country = this.nullValue;
  businessno = this.nullValue;
  nationalno = this.nullValue;
  muncipalno = this.nullValue;
  url = this.nullValue;
  firstapp = this.nullValue;
  standapp = this.nullValue;
  fromtime = this.nullValue;
  scheduletypeinput = this.nullValue;
  password = this.nullValue;

  formErrors = {
    'branchname': '',
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
    'branchname': {
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
    //   'languageCheck': 'Please Enter only Arabic Names'
    // },
    // 'inarabic2': {
    //   'required': 'Please enter middle name in arabic',
    //   'languageCheck': 'Please Enter only Arabic Names'
    // },
    // 'inarabic3': {
    //   'required': 'Please enter last name in arabic',
    //   'languageCheck': 'Please Enter only Arabic Names'
    // },
    'email': {
      'required': 'Please enter email id',
      'pattern': 'Invalid Email ID'
    },
    'phno': {
      'required': 'Please enter phone number',
     //'max': 'Phone No should not exceed 11 digits'
    },
    'mobile': {
      'required': 'Please enter mobile number',
      // 'min': 'Mobile No should not be less than 10 digits',
      // 'max': 'Mobile No should not exceed 15 digits.'
    },
    'password': {
      'required': 'Please enter password',
      // 'pattern' : 'Password must contain'
    },
  }

  ValidationarabicMessages = {
    'branchname': {
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
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط'
    // },
    // 'inarabic2': {
    //   'required': 'الرجاء إدخال الاسم الأوسط باللغة العربية',
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط'
    // },
    // 'inarabic3': {
    //   'required': 'الرجاء إدخال الاسم الأخير باللغة العربية',
    //   'languageCheck': 'الرجاء إدخال الأسماء العربية فقط'
    // },
    'email': {
      'required': 'الرجاء إدخال معرف البريد الإلكتروني',
      'pattern': 'معرف البريد الإلكتروني غير صالح'
    },
    'phno': {
      'required': 'الرجاء إدخال رقم الهاتف',
      //'max': 'رقم هاتف المنزل لا ينبغي أن يتجاوز 11 رقما.'
    },
    'mobile': {
      'required': 'رقم الجوال مطلوب',
      //'min': 'لا يجب أن يكون رقم الهاتف المحمول أقل من 10 أرقام.',
      //'max': 'رقم الهاتف المحمول يجب ألا يتجاوز 10 رقمًا.'
    },
    'password': {
      'required': 'الرجاء إدخال كلمه المرور',
      // 'pattern' : ''
    },
    // 'comemail': {
    //   'pattern': 'معرف البريد الإلكتروني غير صالح'
    // }
  }


  fromsubmit: boolean;
  langulagetype: any = 'EN';
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  language: any;
  alertcount: any = [];
  fromvalue: any;
  // business_image: any;
  // nin_image: any;
  // muncipal_image: any;
  // imageres: any;
  // imageres1: any;
  // imageres2: any
  // finalimage: any;
  disabled: true;
  branchnames: any = [];
  business_image: any;
  national_image: any;
  muncipal_image: any;
  imageres1: any;
  imageres2: any;
  imageres3: any
  arabicname: any;
  editdiv: boolean = false;
  viewdiv: boolean = false;
  public isPageloaderVisible = true;
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
  result: any;
  nationalid: any;
  muncipalid: any;
  businessid: any;
  previous_selected_checkboxes: any = [];
  checked_Session_rows: any = [];
  indexval: any;
  starttime: any;
  endtime: any;
  day: any;
  sesstarttime: any;
  sesendtime: any;
  timingsarr: any[];
  engarray: any = [];
  arabicarray: any[];
  engerror: boolean = false;
  arabicerror: boolean = false;
  commonerror: boolean = false;

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public sanitizer:DomSanitizer,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId")
    this.display_type = window.sessionStorage.getItem("viewtype");
    this.bid = window.sessionStorage.getItem("branchid");
    this.memtype = window.sessionStorage.getItem("memtype");
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.display_type == "View") {
        this.arabicname = "عرض"
      } else {
        this.arabicname = "تحرير"
      }

      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "us";
      }
      else {
        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'branchname': '',
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
        // 'firstapp': '',
        // 'standapp': '',
        'fromtime': '',
        'scheduletypeinput': '',
        'password': '',
        'img': '',
        // 'clinicname':''
      }
    })
    console.log("user language....." + this.langulagetype);
  }

  ngOnInit() {
    this.getcountry();
    // this.getbranchnames()
    this.viewdetails();
    this.dayssession();
    for (var i = 0; i < this.weekdays.length; i++) {
      this.alertcount.push(0);
    }
    this.viewbranch = this.formBuilder.group({
      branchname: ['', Validators.required],
      spec: ['', Validators.required],
      inenglish1:[],
      inenglish2: [],
      inenglish3:[],
      inarabic1: [],
      inarabic2: [],
      inarabic3:[],
      // inenglish1: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inenglish2: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inenglish3: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // inarabic1: ['', [Validators.required, CustomValidators.languageCheck('')]],
      // inarabic2: ['', [Validators.required, CustomValidators.languageCheck('')]],
      // inarabic3: ['', [Validators.required, CustomValidators.languageCheck('')]],
      website: [],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
      comemail: [],
      phno: ['', Validators.required],
      mobile: ['',Validators.required],
      clinicno: [],
      address: [],
      city: [],
      country: [],
      businessno: [],
      nationalno: [],
      muncipalno: [],
      url: [],
      // firstapp: [],
      // standapp: [],
      fromtime: [],
      scheduletypeinput: [],
      password: ['', Validators.required],
      img: []
    })
    this.viewbranch.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.viewbranch);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }


  checkValidationErrors(group: FormGroup = this.viewbranch): void {
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

  arabicenglishhandling() {
    //..................arabic and englishnames handlings...................
    this.engarray=[];
    this.arabicarray=[];
    console.log(this.viewbranch.value.inenglish1 !== null)
    console.log(this.viewbranch.value.inenglish1 !== '')
    if (this.viewbranch.value.inenglish1 === null) {
      this.viewbranch.value.inenglish1 = ''
    }
    if (this.viewbranch.value.inenglish1 != "") {
      this.engarray.push(this.viewbranch.value.inenglish1);
      console.log(this.engarray)
    }

    if (this.viewbranch.value.inenglish2 === null) {
      this.viewbranch.value.inenglish2 = ''
    }
    if (this.viewbranch.value.inenglish2 != "") {
      this.engarray.push(this.viewbranch.value.inenglish2);
    }
    if (this.viewbranch.value.inenglish3 === null) {
      this.viewbranch.value.inenglish3 = ''
    }
    if (this.viewbranch.value.inenglish3 != "") {
      this.engarray.push(this.viewbranch.value.inenglish3);
    }
    //........................................................
    if (this.viewbranch.value.inarabic1 === null) {
      this.viewbranch.value.inarabic1 = ''
    }
    if (this.viewbranch.value.inarabic1 != "") {
      this.arabicarray.push(this.viewbranch.value.inarabic1)
    }
    if (this.viewbranch.value.inarabic2 === null) {
      this.viewbranch.value.inarabic2 = ''
    }
    if (this.viewbranch.value.inarabic2 != "") {
      this.arabicarray.push(this.viewbranch.value.inarabic2)
    }
    if (this.viewbranch.value.inarabic3 === null) {
      this.viewbranch.value.inarabic3 = ''
    }
    if (this.viewbranch.value.inarabic3 != "") {
      this.arabicarray.push(this.viewbranch.value.inarabic3)
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
      if ((evnt.target.value == "") && (this.viewbranch.value.inenglish2 == "") && (this.viewbranch.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname2") {
      if ((evnt.target.value == "") && (this.viewbranch.value.inenglish1 == "") && (this.viewbranch.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname3") {
      if ((evnt.target.value == "") && (this.viewbranch.value.inenglish2 == "") && (this.viewbranch.value.inenglish1 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }

    if ((this.viewbranch.value.inenglish1 != "") && (this.viewbranch.value.inenglish2 != "") && (this.viewbranch.value.inenglish3 != "")) {
      this.commonerror = false;
    }
    else {
      // this.commonerror=true;
    }
  }
  arb(evnt, val) {
    console.log(val)
    if (val == "arb1") {
      if ((evnt.target.value == "") && (this.viewbranch.value.inarabic2 == "") && (this.viewbranch.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb2") {
      if ((evnt.target.value == "") && (this.viewbranch.value.inarabic1 == "") && (this.viewbranch.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb3") {
      if ((evnt.target.value == "") && (this.viewbranch.value.inarabic2 == "") && (this.viewbranch.value.inarabic1 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }

    console.log(this.viewbranch.value.inarabic1)
    if ((this.viewbranch.value.inarabic1 != "") && (this.viewbranch.value.inarabic2 != "") && (this.viewbranch.value.inarabic3 != "")) {
      this.commonerror = false;
    }
  }

  viewdetails() {
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Getdata_By_Id";
      let serviceUrl = this.commonService.commonUrl + "Account/Getdata_By_Id"
      let params = {
        "operation": "getBranchDetails",
        "value": this.userid,
        "uid": this.bid
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.viewbranch.patchValue({
            branchname: result.data.Table[0].Branch_Name,
            spec: result.data.Table[0].Specialization,
            inenglish1: result.data.Table[0].First_Name,
            inenglish2: result.data.Table[0].middle_Name,
            inenglish3: result.data.Table[0].Last_Name,
            inarabic1: result.data.Table[0].Arafirst_Name,
            inarabic2: result.data.Table[0].Aralast_Name,
            inarabic3: result.data.Table[0].Ara_Fathername,
            website: result.data.Table[0].Website,
            email: result.data.Table[0].Email,
            comemail: result.data.Table[0].Communicationemailid,
            phno: result.data.Table[0].phoneno,
            mobile: result.data.Table[0].mobileno,
            clinicno: result.data.Table[0].Clinicno,
            address: result.data.Table[0].Address,
            city: result.data.Table[0].city,
            country: result.data.Table[0].Country_Name,
            businessno: result.data.Table[0].Business_Identificationno,
            nationalno: result.data.Table[0].National_Identifuicationno,
            muncipalno: result.data.Table[0].Municipal_licenceno,
            url: result.data.Table[0].Map_url,
            
            firstapp: result.data.Table[0].Slot_First,
            standapp: result.data.Table[0].Slt_standard,
            scheduletypeinput: result.data.Table[0].timetype,
            password: result.data.Table[0].Pwd,
            // this.timingsarray=result.data.Table1;
          })
          this.mapsurl=result.data.Table[0].Map_url
          this.business_image = result.data.Table[0].Business_Identification,
            this.national_image = result.data.Table[0].National_Identification,
            this.muncipal_image = result.data.Table[0].Municipal_licence,
            console.log("time type.... " + result.data.Table[0].timetype);
   
            if (this.viewbranch.value.businessid== null || this.viewbranch.value.businessid == "") {
              this.viewbranch.value.businessid = this.business_image;
            }
            if (this.viewbranch.value.nationalid == null ||this.viewbranch.value.nationalid == "") {
              this.viewbranch.value.nationalid = this.national_image;
            }
            if (this.viewbranch.value.muncipalid == null || this.viewbranch.value.muncipalid == "") {
              this.viewbranch.value.muncipalid = this.muncipal_image;
            }
            let ST = result.data.Table[0].timetype.split(',');
            console.log("type..." + ST);
            console.log("type of..." + typeof ST);
            for (let i = 0; i < ST.length; i++) {
              this.schedule.push(ST[i])
            }
    
            if (this.scheduletypeinput == "Day Wise") {
              this.daywiseif = true;
              this.sessionwiseif = false;
            }
            else if (this.scheduletypeinput == "") {
              this.sessionwiseif = false;
              this.daywiseif = false;
            }
            else if (this.scheduletypeinput == "Session Wise") {
              this.daywiseif = false;
              this.sessionwiseif = true
            }
            else {
              this.daywiseif = true;
              this.sessionwiseif = false;
            }
            for (let i = 0; i < this.weekdays.length; i++) {
              for (let j = 0; j < result.data.Table1.length; j++) {
                if (result.data.Table1[j].schduletype == "Day Wise") {
                  if (this.weekdays[i].day == result.data.Table1[j].Days) {
                    const control = this.myForm.get(['rows', i, 'checkbox_value'])
                    control.patchValue(true);
                    const control1 = this.myForm.get(['rows', i, 'fromtime'])
                    control1.patchValue(result.data.Table1[j].starttime);
                    const control2 = this.myForm.get(['rows', i, 'titleinput'])
                    control2.setValue(result.data.Table1[j].starttimeformat.replace(' ', ''));
                    const control3 = this.myForm.get(['rows', i, 'totime'])
                    control3.patchValue(result.data.Table1[j].endtime);
                    const control4 = this.myForm.get(['rows', i, 'titleinput1'])
                    control4.setValue(result.data.Table1[j].endtimeformat.replace(' ', ''))
                    console.log(control2);
                    console.log(control4);
    
                    let selecteddaytemp = {
                      "checkbox_value": true,
                      "day": result.data.Table1[j].Days,
                      "fromtime": result.data.Table1[j].starttime,
                      "titleinput": result.data.Table1[j].starttimeformat,
                      "totime": result.data.Table1[j].endtime,
                      "titleinput1": result.data.Table1[j].endtimeformat,
    
                    }
    
                    this.checkbox_validation.push(selecteddaytemp);
                    console.log(this.checkbox_validation);
                    this.previous_checkbox_value.push(i);
                    this.totaldays[i] = selecteddaytemp;
    
                  }
    
                } else if (result.data.Table1[j].schduletype == "Session Wise") {
                  console.log(this.weekdays[i].day);
                  console.log(result.data.Table1[j])
                  if (this.weekdays[i].day == result.data.Table1[j].Days) {
                    console.log("3 entered");
                    let selectedtemp = {
                      "checkbox_value": true,
                      "day": result.data.Table1[j].Days,
                      "session1start": result.data.Table1[j].starttime,
                      "sessionstart1input": result.data.Table1[j].starttimeformat,
                      "session1end": result.data.Table1[j].endtime,
                      "sessionend1input": result.data.Table1[j].endtimeformat,
                      "session2start": result.data.Table1[j].Sesstarttime,
                      "sessionstart2input": result.data.Table1[j].Sesstarttimeformat,
                      "session2end": result.data.Table1[j].Sesendtime,
                      "sessionend2input": result.data.Table1[j].Sesendtimeformat
                    }
    
                    this.checkboxsession_validation.push(selectedtemp);
                    console.log(this.checkboxsession_validation);
                    this.previous_selected_checkboxes.push(i);
                    this.sessiontotaldays[i] = selectedtemp;
    
                    console.log(this.checkboxsession_validation)
                    const control = this.mysessionForm.get(['sessionrows', i, 'checkbox_value'])
                    control.setValue(true);
                    const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
                    console.log(result.data.Table1[j].s1_starttime);
                    control1.setValue(result.data.Table1[j].starttime);
                    const control2 = this.mysessionForm.get(['sessionrows', i, 'sessionstart1input'])
                    control2.setValue(result.data.Table1[j].starttimeformat.replace(' ', ''));
                    const control3 = this.mysessionForm.get(['sessionrows', i, 'session1end'])
                    control3.setValue(result.data.Table1[j].endtime);
                    const control4 = this.mysessionForm.get(['sessionrows', i, 'sessionend1input'])
                    control4.setValue(result.data.Table1[j].endtimeformat.replace(' ', ''));
                    console.log(control4)
                    const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
                    control5.setValue(result.data.Table1[j].Sesstarttime);
                    const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
                    control6.setValue(result.data.Table1[j].Sesstarttimeformat.replace(' ', ''));
                    const control7 = this.mysessionForm.get(['sessionrows', i, 'session2end'])
                    control7.setValue(result.data.Table1[j].Sesendtime);
                    const control8 = this.mysessionForm.get(['sessionrows', i, 'sessionend2input'])
                    control8.setValue(result.data.Table1[j].Sesendtimeformat.replace(' ', ''));
                    console.log((this.mysessionForm));
                  }
                }
              }
            }
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
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
      this.viewbranch.patchValue({
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
        this.viewbranch.patchValue({
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
        this.viewbranch.patchValue({
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
        this.viewbranch.patchValue({
          session2end: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
  }

  emailcheck() {
    if (this.viewbranch.value.email != "") {
      var accessToken =  window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Getdata_By_Id";
        let serviceUrl = this.commonService.commonUrl + "Account/Getdata_By_Id"
        let params = {
          "operation": "CheckEmailID",
          "value": this.viewbranch.value.email,
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
          if (result.data[0].Result == "True") {
            alert("Email ID Already exists");
            this.viewbranch.value.email = "";
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
    }
  }

  mobilecheck() {
    if (this.viewbranch.value.mobile != "") {
      var accessToken =  window.localStorage.Tokenval;
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
          "Mobile": this.viewbranch.value.mobile,
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
          if (result.data[0].Result == "True") {
            alert("Mobile Number Already exists");
            this.viewbranch.value.mobile = "";
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

  dayssession() {
    //...........for days wise.........
    this.myForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
      // total_amount: [null, Validators.required]
    });
    this.patchValues();
    //console.log(this.myForm);
    //console.log(this.myForm.controls.value);

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
          this.schedule.push(this.viewbranch.value.scheduletypeinput);

        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Day Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      console.log(this.schedule)
      //console.log(this.schedule)
      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true) {
          //console.log(i);
          if ((this.totaldays[i].fromtime != null) && (this.totaldays[i].totime != null)) {
            if ((this.totaldays[i].fromtime + this.totaldays[i].titleinput) == (this.totaldays[i].totime + this.totaldays[i].titleinput1)) {
              alert("Start and End Time will not be Same");
              currentIndex = i;
              //console.log(currentIndex);
              var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
              var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
              var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
              //console.log(endTime);
              //console.log(endtimeselect);
              endTime.value = '';
              endtimeselect.value = '';
            }
          }
        }
        else {
          //console.log("entered into day else.....")
          currentIndex = i;
          var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
          //console.log(currentDay)
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
      //console.log(this.sessiontotaldays);
      //console.log(this.totaldays);
      for (let j = 0; j < this.sessiontotaldays.length; j++) {
        //console.log("session entered....");
        if (this.sessiontotaldays[j].checkbox_value == true && this.totaldays[j].checkbox_value == true) {
          //console.log(this.sessiontotaldays[j]);
          //console.log(this.totaldays[j]);
          // alert("Please Uncheck Selected day in another field.");
          //console.log("after alert. .. " + j);
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
      // total_amount: [null, Validators.required]
    });
    this.sessionpatchValues();
    var a = 1;
    this.mysessionForm.get('sessionrows').valueChanges.subscribe(values => {
      console.log(values);

      this.sessiontotaldays = values;

      var element = function (ele) {
        console.log(ele)
        return ele.checkbox_value == true;
      }
      console.log(this.sessiontotaldays.some(element));
      if (this.sessiontotaldays.some(element) == true) {
        if (this.schedule.includes("Session Wise") == false) {
          this.schedule.push(this.viewbranch.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Session Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      console.log(this.schedule)

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
          //console.log("ented session....");
          //console.log(this.mysessionForm);
          var index = i
          //console.log(index)
          var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
          //console.log(currentsession);
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
          //console.log(this.totaldays[j])
          //console.log(this.sessiontotaldays[j])
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
          //console.log(values);
          //console.log(this.mysessionForm);
          return false;
        }
      }
    })
  }

  checkboxchange(row, value, indx) {
    //console.log("checkbox changed. .");
    //console.log(row);
    //console.log(value);
    //console.log(indx);
    //console.log(JSON.stringify(this.totaldays));
    //console.log(JSON.stringify(this.checkbox_validation));
    //console.log(this.checkbox_validation.length);

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
      //console.log(JSON.stringify(this.checkbox_validation));
      //console.log(this.checkbox_validation[0].fromtime);
      //console.log(value);
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
        //console.log(this.checkbox_validation);
        //console.log(this.previous_checkbox_value);
      }
      else {
        //this.checkbox_validation[0] = this.totaldays[this.previous_checkbox_value[0]];
        if (value == this.checkbox_validation[0].day) {
          this.checkbox_validation = [];
          this.previous_checkbox_value = [];
          //console.log(this.checkbox_validation);
          //console.log(this.previous_checkbox_value);
        }
        else {
          this.checkbox_validation[0] = this.totaldays[this.previous_checkbox_value[0]];
          if ((this.checkbox_validation[0].fromtime == null) || (this.checkbox_validation[0].titleinput == null)
            || (this.checkbox_validation[0].totime == null) || (this.checkbox_validation[0].titleinput1 == null)) {
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
      //console.log(this.checkbox_validation);
    }
  }

  checkboxsessionchange(row, value, indx) {
    //console.log(row);
    //console.log(value);
    //console.log(indx);
    //console.log(this.checkboxsession_validation);
    //console.log(this.mysessionForm.get("sessionrows").value);
    this.checked_Session_rows = this.mysessionForm.get("sessionrows").value;
    //console.log(this.checked_Session_rows.length);

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
      //console.log("if not 0 entered........")
      //console.log(this.checkboxsession_validation);
      //console.log(this.previous_selected_checkboxes);
      var selected_status = "";
      var equalindx = 0;
      var indxpos = 0;
      for (var j = 0; j < this.checkboxsession_validation.length; j++) {
        //console.log(value + ". ." + this.checkboxsession_validation[j].day);
        if (value == this.checkboxsession_validation[j].day) {
          //console.log("bug found here. . .");
          selected_status = "true";
          indxpos = j;
          equalindx = this.previous_selected_checkboxes[j];
          break;
        } else {
          selected_status = "false";
          //console.log("No bug hee. . ");
        }
      }

      if (selected_status == "false") {
      } else {
        //console.log(this.previous_selected_checkboxes);
        const control1 = this.mysessionForm.get(['sessionrows', equalindx, 'session1start'])
        control1.setValue(null);
        const control2 = this.mysessionForm.get(['sessionrows', equalindx, 'sessionstart1input'])
        control2.setValue(null);
        const control3 = this.mysessionForm.get(['sessionrows', equalindx, 'session1end'])
        control3.setValue(null);
        const control4 = this.mysessionForm.get(['sessionrows', equalindx, 'sessionend1input'])
        control4.setValue(null);
        const control5 = this.mysessionForm.get(['sessionrows', equalindx, 'session2start'])
        control5.setValue(null);
        const control6 = this.mysessionForm.get(['sessionrows', equalindx, 'sessionstart2input'])
        control6.setValue(null);
        const control7 = this.mysessionForm.get(['sessionrows', equalindx, 'session2end'])
        control7.setValue(null);
        const control8 = this.mysessionForm.get(['sessionrows', equalindx, 'sessionend2input'])
        control8.setValue(null);
        //console.log(JSON.stringify(this.sessiontotaldays));
        //console.log(equalindx);
        for (var i = 0; i < this.sessiontotaldays.length; i++) {
          if (this.sessiontotaldays[i].day == value) {
            this.sessiontotaldays[i] = this.checked_Session_rows[equalindx];
          }
        }
        //console.log(JSON.stringify(this.sessiontotaldays));
        this.checkboxsession_validation.splice(indxpos, 1);
        this.previous_selected_checkboxes.splice(indxpos, 1);
        return false;
      }

      for (var i = 0; i < this.checked_Session_rows.length; i++) {
        for (var j = 0; j < this.checkboxsession_validation.length; j++) {
          if (this.checkboxsession_validation[j].day == this.checked_Session_rows[i].day) {
            //console.log("First for if. . ." + this.checkboxsession_validation[j].day + ". ." + this.checked_Session_rows[i].day);
            // //console.log(this.checked_Session_rows[i]);
            this.checkboxsession_validation[j] = this.checked_Session_rows[i];
            this.sessiontotaldays[i] = this.checked_Session_rows[i];
          } else {
            //console.log("First For else. . ")
          }
        }
      }

      var checked_satus = "";
      var checked_previous_index = 0;
      for (var i = 0; i < this.checkboxsession_validation.length; i++) {
        //console.log("main else. .");
        //console.log(this.checkboxsession_validation);
        //console.log(this.checked_Session_rows[indx]);
        if (this.checkboxsession_validation[i].sessionstart1input == null) {
          //console.log("hello. ..");
          //console.log(this.checkboxsession_validation[i].day);
          //console.log(this.checkboxsession_validation);
          checked_satus = "true";
          checked_previous_index = i;
          break;
        }
        else {
          //console.log("enteredakldjfkasd");
          checked_satus = "false";
        }
      }

      //console.log("checkedstatus. . ." + checked_satus);
      if (checked_satus == "true") {
        //console.log("st1. . " + checked_satus)
        alert("Please Enter Timings for " + this.checkboxsession_validation[checked_previous_index].day);
        const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
        control.setValue(null);
      } else {
        //console.log("st2. . " + checked_satus)
        this.checkboxsession_validation.push(this.checked_Session_rows[indx]);
        this.previous_selected_checkboxes.push(indx);
        this.sessiontotaldays[indx] = this.checked_Session_rows[indx];
      }
    }
    else {
      //console.log("else entered.........")
      this.checkboxsession_validation.push(this.sessiontotaldays[indx]);
      this.previous_selected_checkboxes.push(indx);
      //console.log(this.checkboxsession_validation);
    }
  }

  dayclinictimings(ind) {
    this.indexval = ind
    console.log(ind)
    console.log("am pm change entered....")
    console.log(this.indexval);
    console.log(this.myForm)
    var val = this.myForm.controls.rows.value[this.indexval]
    this.day = val.day;
    this.starttime = val.fromtime + val.titleinput;
    this.endtime = val.totime + val.titleinput1;
    console.log(val.fromtime + ' ' + val.titleinput + ' -- ' + val.totime + ' ' + val.titleinput1)
    console.log(this.day);
    console.log(this.starttime);
    console.log(this.endtime);

    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/check_clinictimings";
      let serviceUrl = this.commonService.commonUrl + "Account/check_clinictimings"
      let params = {
        "sno": "",
        "clinicid": this.userid,
        "branchid": "",
        "day": this.day,
        "S1_start": this.starttime,
        "S1_end": this.endtime,
        "s2_start": "",
        "s2_end": "",
        "condition": "CheckUserTimings"
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
          if (result.data.Table[0].Result == "False") {
            console.log(result.data.Table[0]);
            alert("You can't edit these timings as the appointments are already scheduled");
            // const control = this.myForm.get(['rows',ind,'fromtime']);
            // control.setValue(null);
            // const control2 = this.myForm.get(['rows',ind,'titleinput']);
            // control2.setValue(null);
            // const control3 = this.myForm.get(['rows',ind,'totime']);
            // control3.setValue(null);
            // const control4 = this.myForm.get(['rows',ind,'titleinput1']);
            // control4.setValue(null);
          }
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

  sesclinictimings(ind) {
    this.indexval = ind
    console.log(ind)
    console.log("am pm change entered....")
    console.log(this.indexval);
    console.log(this.mysessionForm)
    var val = this.mysessionForm.controls.sessionrows.value[this.indexval]
    this.day = val.day;
    this.starttime = val.session1start + val.sessionstart1input;
    this.endtime = val.session1end + val.sessionend1input;
    this.sesstarttime = val.session2start + val.sessionstart2input;
    this.sesendtime = val.session2end + val.sessionend2input;
    console.log(val.fromtime + ' ' + val.titleinput + ' -- ' + val.totime + ' ' + val.titleinput1)
    console.log(this.day);
    console.log(this.starttime);
    console.log(this.endtime);
    console.log(this.sesstarttime);
    console.log(this.sesendtime);

    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/check_clinictimings";
      let serviceUrl = this.commonService.commonUrl + "Account/check_clinictimings"
      let params = {
        "sno": "",
        "clinicid": this.userid,
        "branchid": "",
        "day": this.day,
        "S1_start": this.starttime,
        "S1_end": this.endtime,
        "s2_start": this.sesstarttime,
        "s2_end": this.sesendtime,
        "condition": "CheckUserTimings"
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
          if (result.data.Table[0].Result == "False") {
            console.log(result.data.Table[0]);
            alert("You can't edit these timings as the appointments are already scheduled");
            // const control = this.myForm.get(['rows',ind,'fromtime']);
            // control.setValue(null);
            // const control2 = this.myForm.get(['rows',ind,'titleinput']);
            // control2.setValue(null);
            // const control3 = this.myForm.get(['rows',ind,'totime']);
            // control3.setValue(null);
            // const control4 = this.myForm.get(['rows',ind,'titleinput1']);
            // control4.setValue(null);
          }
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
      console.log(val);
      this.daywiseif = true;
      this.sessionwiseif = false;
    }
    else if (val == "Session Wise") {
      console.log(val);
      this.daywiseif = false;
      this.sessionwiseif = true;
    }
  }

  fromtimechange() {
    console.log(this.viewbranch.value.fromtime);
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
        // if (this.totaldays[i].totime.split(":")[1] == undefined) {
        //   const control2 = this.myForm.get(['rows', i, 'totime']);
        //   console.log(". . .." + control2.value);
        //   let tempo3 = control2.value;
        //   let tempo4 = tempo3 + ":00"
        //   control2.setValue(tempo4);
        //   console.log(control2);
        // }
      }
    }
  }

  getDataDays(val) {
    console.log("days data entered.....");
    this.fromvalue = val;
    var allDays = document.querySelectorAll('.eachDay');
    allDays = Array.prototype.slice.call(allDays);
    console.log(allDays)
    var self = this;
    allDays.forEach((elem) => {
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
        console.log(individuals2EndTime.value + " " + individuals2EndMeridian.value)
        this.allCheckeds2EndTimings.push(individuals2EndTime.value + " " + individuals2EndMeridian.value)
      }
      console.log(this.allCheckedDays.toString())
      console.log(this.allCheckedStartTimings.toString());
      console.log(this.allCheckedEndTimings.toString());
      console.log(this.allCheckeds2StartTimings.toString());
      console.log(this.allCheckeds2EndTimings.toString());

    })
    this.info1commonservice(val, this.allCheckedDays.toString(), this.allCheckedStartTimings.toString(), this.allCheckedEndTimings.toString(), this.allCheckeds2StartTimings.toString(), this.allCheckeds2EndTimings.toString());
  }

  getcountry() {
    var accessToken =  window.localStorage.Tokenval;
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

  get f() {
    //  return this.subform.controls;
    return this.viewbranch.controls;
  }

  fromkey(val) {
    let timepattern = /[0-9\:]/
    let inputChar = String.fromCharCode(val.charCode);
    if (!timepattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fromenter(val, key) {
    //console.log("keycode..." + key);
    if (val.target.value.length < 3) {
      //console.log("entered..." + val.target.value);
      if (val.target.value == ":") {
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(1) == ":") {
        //console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);
      }
    }
    if (val.target.value.length == 2) {
      if (val.target.value > 12) {
        alert("Please enter valid time");
        val.target.value = "";
        return false;
      }
      else {
        val.target.value = val.target.value + ":";
      }
    }
    if (val.target.value.length > 3) {
      //console.log("entered..." + val.target.value);

      if ((val.target.value).charAt(3) == ":") {
        //console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(4) == ":") {
        //console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if (((val.target.value).charAt(3) + (val.target.value).charAt(4)) > 59) {
        alert("Please enter valid min");
        val.target.value = val.target.value.slice(0, -2);
      }
    }
    if (key == 8) {
      val.target.value = val.target.value.slice(0, -1);
      //console.log("final valueee.." + val.target.value);
    }
    if (val.target.value.length > 5) {
      val.target.value = val.target.value.slice(0, -1);
    }
  }

  submit() {
    this.allCheckedDays=[]
    this.allCheckedStartTimings=[]
    this.allCheckedEndTimings=[]
    this.allCheckeds2StartTimings=[]
    this.allCheckeds2EndTimings=[]
    console.log(this.viewbranch.invalid);
   // this.arabicenglishhandling();
    this.commonvalidationcheck();
    if (this.viewbranch.invalid === true) {
      this.fromsubmit = true;
      this.arabicenglishhandling();
      this.checkValidationErrors(this.viewbranch);
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
    this.arabicenglishhandling();
    if (this.viewbranch.value.comemail == null || this.viewbranch.value.comemail == "") {
      this.viewbranch.value.comemail = "";
    }
    if (this.viewbranch.value.clinicno == null || this.viewbranch.value.clinicno == "") {
      this.viewbranch.value.clinicno = "";
    }
    if (this.viewbranch.value.address == null || this.viewbranch.value.address == "") {
      this.viewbranch.value.address = "";
    }
    if (this.viewbranch.value.website == null || this.viewbranch.value.website == "") {
      this.viewbranch.value.website = "";
    }
    if (this.viewbranch.value.city == null || this.viewbranch.value.city == "") {
      this.viewbranch.value.city = "";
    }
    if (this.viewbranch.value.country == null || this.viewbranch.value.country == "") {
      this.viewbranch.value.country = "";
    }
    if (this.viewbranch.value.businessno == null || this.viewbranch.value.businessno == "") {
      this.viewbranch.value.businessno = "";
    }
    if (this.viewbranch.value.nationalno == null || this.viewbranch.value.nationalno == "") {
      this.viewbranch.value.nationalno = "";
    }
    if (this.viewbranch.value.muncipalno == null || this.viewbranch.value.muncipalno == "") {
      this.viewbranch.value.muncipalno = "";
    }
    if (this.viewbranch.value.url == null || this.viewbranch.value.url == "") {
      this.viewbranch.value.url = "";
    }
       
    if (this.viewbranch.value.businessid== null || this.viewbranch.value.businessid == "") {
      this.businessid = this.business_image;
    }
    if (this.viewbranch.value.nationalid == null ||this.viewbranch.value.nationalid == "") {
      this.viewbranch.value.nationalid = this.national_image;
    }
    if (this.viewbranch.value.muncipalid == null || this.viewbranch.value.muncipalid == "") {
      this.viewbranch.value.muncipalid = this.muncipal_image;
    }

    // -------------------- Timings checking ----------------------//
    // if(){

    // }
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
    var accessToken =  window.localStorage.Tokenval;
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
          this.viewbranch.value.nationalid = body[0];
          const control1 = this.viewbranch.controls.nationalid;
          console.log(control1);
          control1.setValue(this.viewbranch.value.nationalid);
          console.log(control1);
        } else if (name == "muncipalid") {
          this.viewbranch.value.muncipalid = body[0];
          const control3 = this.viewbranch.controls.muncipalid;
          control3.setValue(this.viewbranch.value.muncipalid);
        } else if (name == "businessid") {
          this.viewbranch.value.businessid = body[0];
          const control2 = this.viewbranch.controls.businessid;
          control2.setValue(this.viewbranch.value.businessid);
        }
      });
    //})
  }

  info1commonservice(val, days, startTime, EndTime, s2start, s2end) {
    if(this.engerror == true || this.arabicerror == true || this.commonerror == true){
      return false;
    }
    console.log("service entered....." + this.viewbranch.value.scheduletypeinput);
    console.log(days)
    console.log(startTime)
    console.log(EndTime)
    console.log(s2start)
    console.log(s2end)
    // http://graylogic.net/OclinicoAPI/Api/Account/Registrations_Transactions
    var accessToken =  window.localStorage.Tokenval;
      let url = this.commonService.commonUrl + "Account/Registrations_Transactions"
      let body = {
        "sno": "",
        "Clinicid": this.userid,
        "Clinic_Name": this.viewbranch.value.branchname,
        "First_Name": this.viewbranch.value.inenglish1,
        "middle_Name": this.viewbranch.value.inenglish2,
        "Last_Name": this.viewbranch.value.inenglish3,
        "Arafirst_Name": this.viewbranch.value.inarabic1,
        "Aralast_Name": this.viewbranch.value.inarabic2,
        "Ara_Fathername": this.viewbranch.value.inarabic3,
        "Email": this.viewbranch.value.email,
        "Pwd": this.viewbranch.value.password,
        "Communicationemailid": this.viewbranch.value.comemail,
        "Mail_trans": this.viewbranch.value.spec,
        "mailpwd": "",
        "phoneno": this.viewbranch.value.phno,
        "mobileno": this.viewbranch.value.mobile,
        "Clinicno": this.viewbranch.value.clinicno,
        "Address": this.viewbranch.value.address,
        "city": this.viewbranch.value.city,
        "country": this.viewbranch.value.country,
        "Bus_Idno": this.viewbranch.value.businessno,
        "Bus_Idimg": this.viewbranch.value.businessid,
        "National_Idno": this.viewbranch.value.nationalno,
        "National_Idimg": this.viewbranch.value.nationalid,
        "Mun_licno": this.viewbranch.value.muncipalno,
        "Mun_licimg": this.viewbranch.value.muncipalid,
        "Website": this.viewbranch.value.website,
        "Map_url": this.viewbranch.value.url,
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
        "Operation": "BranchUpdate",
        "branchId": this.bid
      }
      console.log("submit ..." + JSON.stringify(body));
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
            alert("Updated Successfully");
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
  }
}
