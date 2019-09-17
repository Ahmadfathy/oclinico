import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editgeneralsettings',
  templateUrl: './editgeneralsettings.component.html',
  styleUrls: ['./editgeneralsettings.component.css']
})
export class EditgeneralsettingsComponent implements OnInit {
  editsettings: FormGroup;
  display_type: any;
  timingsarr: any = [];
  bid: any;
  memtype: any;
  userid: any;
  countries: any = [];
  mapsurl: any;
  myForm: FormGroup;
  mysessionForm: FormGroup;
  public daywiseif: boolean = false;
  public sessionwiseif: boolean = false;
  public formArrayLength: number = 0;
  daysarray: any = [];
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
    },
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
  nullValue: any;
  clinicname = this.nullValue;
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
  vatno = this.nullValue;
  standapp = this.nullValue;
  fromtime = this.nullValue;
  scheduletypeinput = this.nullValue;

  formErrors = {
    'clinicname': '',
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
    'businessid': '',
    'nationalid': '',
    'muncipalid': '',
    'url': '',
    'fromtime': '',
    'scheduletypeinput': '',
    'vatno': '',
    'img': '',
  }
  ValidationMessages = {
    'clinicname': {
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
      // 'max': 'Phone No should not exceed 11 digits'
    },
    'mobile': {
      'required': 'Mobile No is required',
      'minlength': 'Mobile No should not be less than 10 digits',
      'maxlength': 'Mobile No should not exceed 15 digits.'
    },
    // 'muncipalid': {
    //   'required': 'Please Upload Muncipal License ID'
    // },
    // 'nationalid': {
    //   'required': 'Please Upload National Identification ID'
    // },
    // 'businessid': {
    //   'required': 'Please Upload Business ID'
    // },
    'muncipalno': {
      'required': 'Please Enter Muncipal License Number'
    },
    'nationalno': {
      'required': 'Please Enter National Identification Number'
    },
    'businessno': {
      'required': 'Please Enter Business ID Number'
    },
    'city': {
      'required': 'Please Enter City',
    },
    'address': {
      'required': 'Please Enter Address',
    },
    'country': {
      'required': 'Please Select Country',
    },
  }

  ValidationarabicMessages = {
    'clinicname': {
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
    'city': {
      'required': 'الرجاء ادخال المدينة',
    },
    'address': {
      'required': 'الرجاء ادخال العنوان',
    },
    'country': {
      'required': 'الرجاء تحديد الدولة',
    },
    'phno': {
      'required': 'الرجاء إدخال رقم الهاتف',
      // 'max': 'رقم هاتف المنزل لا ينبغي أن يتجاوز 11 رقما.'
    },
    'mobile': {
      'required': 'رقم الجوال مطلوب',
      'minlength': 'رقم الجوال يجب ألا يقل عن 10 أرقام',
      'maxlength': 'رقم الجوال يجب ألا يتجاوز 15 رقمًا'
    },
    // 'muncipalid': {
    //   'required': 'يرجي تحميل البلدي الترخيص معرف'
    // },
    // 'nationalid': {
    //   'required': 'يرجي تحميل الهوية الوطني معرف'
    // },
    // 'businessid': {
    //   'required': 'يرجي تحميل الاعمال معرف'
    // },
    'muncipalno': {
      'required': 'يرجي ادخال الاعمال معرف'
    },
    'nationalno': {
      'required': 'يرجي ادخال الهوية الوطني معرف'
    },
    'businessno': {
      'required': 'يرجي ادخال البلدي الترخيص معرف'
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
  disabled: true;
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
  dayorsessionval: any;
  previous_selected_checkboxes: any = [];
  checked_Session_rows: any = [];
  public invalidbusinessid: boolean = false;
  public invalidnationalid: boolean = false;
  public invalidmuncipalid: boolean = false;
  engarray: any = [];
  arabicarray: any[];
  engerror: boolean = false;
  arabicerror: boolean = false;
  commonerror: boolean = false;
  indexval: any;
  day: any;
  starttime: any;
  endtime: any;
  checkdisabled: boolean
  timetype: any;
  s1starttime: any;
  s1endtime: any;
  s2starttime: any;
  s2endtime: any;
  sesday: any;
  checkval: any;
  imagePreview: any;
  boxtype: any;
  newarr: any[];


  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public sanitizer: DomSanitizer,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId")
    this.bid = window.sessionStorage.getItem("branchid");
    this.commonService.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];
      if (this.display_type == "View") {
        this.arabicname = "عرض"
      } else {
        this.arabicname = "تحرير"
      }

      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {
        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'clinicname': '',
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
        'businessid': '',
        'nationalid': '',
        'muncipalid': '',
        'url': '',
        'fromtime': '',
        'scheduletypeinput': '',
        'vatno': '',
        'img': '',
      }
    })
  }

  ngOnInit() {
    this.getcountry();
    this.getdata();
    this.dayssession();
    for (var i = 0; i < this.weekdays.length; i++) {
      this.alertcount.push(0);
    }
    this.editsettings = this.formBuilder.group({
      clinicname: ['', Validators.required],
      spec: ['', Validators.required],
      inenglish1: [],
      inenglish2: [],
      inenglish3: [],
      inarabic1: [],
      inarabic2: [],
      inarabic3: [],
      website: [],
      email: [],
      comemail: [],
      phno: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      clinicno: [],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      businessno: ['', Validators.required],
      nationalno: ['', Validators.required],
      muncipalno: ['', Validators.required],
      businessid: [],
      nationalid: [],
      muncipalid: [],
      url: [],
      fromtime: [],
      vatno: [],
      scheduletypeinput: [],
      img: []
    })
    this.editsettings.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.checkValidationErrors(this.editsettings);
    });
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  checkValidationErrors(group: FormGroup = this.editsettings): void {
    console.log("entered.....");
    Object.keys(group.controls).forEach((key: string) => {

      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(abstractControl.touched);
        console.log(abstractControl)
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              console.log(key);
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
    this.engarray = [];
    this.arabicarray = [];
    console.log(this.editsettings.value.inenglish1 !== null)
    console.log(this.editsettings.value.inenglish1 !== '')
    if (this.editsettings.value.inenglish1 === null) {
      this.editsettings.value.inenglish1 = ''
    }
    if (this.editsettings.value.inenglish1 != "") {
      this.engarray.push(this.editsettings.value.inenglish1);
      console.log(this.engarray)
    }
    if (this.editsettings.value.inenglish2 === null) {
      this.editsettings.value.inenglish2 = ''
    }
    if (this.editsettings.value.inenglish2 != "") {
      this.engarray.push(this.editsettings.value.inenglish2);
    }
    if (this.editsettings.value.inenglish3 === null) {
      this.editsettings.value.inenglish3 = ''
    }
    if (this.editsettings.value.inenglish3 != "") {
      this.engarray.push(this.editsettings.value.inenglish3);
    }
    //..................... Arabic ...................................
    if (this.editsettings.value.inarabic1 === null) {
      this.editsettings.value.inarabic1 = ''
    }
    if (this.editsettings.value.inarabic1 != "") {
      this.arabicarray.push(this.editsettings.value.inarabic1)
    }
    if (this.editsettings.value.inarabic2 === null) {
      this.editsettings.value.inarabic2 = ''
    }
    if (this.editsettings.value.inarabic2 != "") {
      this.arabicarray.push(this.editsettings.value.inarabic2)
    }
    if (this.editsettings.value.inarabic3 === null) {
      this.editsettings.value.inarabic3 = ''
    }
    if (this.editsettings.value.inarabic3 != "") {
      this.arabicarray.push(this.editsettings.value.inarabic3)
    }
    console.log(this.engarray + "...." + this.engarray.length)
    console.log(this.arabicarray + "...." + this.arabicarray.length)
    if (this.engarray.length == 0) {
      console.log("entered into eng")
      this.engerror = true;
      return false;
    }
    else {
      this.engerror = false;
    }
    if (this.arabicarray.length == 0) {
      this.arabicerror = true;
      return false;
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
      if ((evnt.target.value == "") && (this.editsettings.value.inenglish2 == "") && (this.editsettings.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname2") {
      if ((evnt.target.value == "") && (this.editsettings.value.inenglish1 == "") && (this.editsettings.value.inenglish3 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname3") {
      if ((evnt.target.value == "") && (this.editsettings.value.inenglish2 == "") && (this.editsettings.value.inenglish1 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }

    if ((this.editsettings.value.inenglish1 != "") && (this.editsettings.value.inenglish2 != "") && (this.editsettings.value.inenglish3 != "")) {
      this.commonerror = false;
    }
    else {
    }
  }

  arb(evnt, val) {
    console.log(val)
    if (val == "arb1") {
      if ((evnt.target.value == "") && (this.editsettings.value.inarabic2 == "") && (this.editsettings.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb2") {
      if ((evnt.target.value == "") && (this.editsettings.value.inarabic1 == "") && (this.editsettings.value.inarabic3 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb3") {
      if ((evnt.target.value == "") && (this.editsettings.value.inarabic2 == "") && (this.editsettings.value.inarabic1 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }

    console.log(this.editsettings.value.inarabic1)
    if ((this.editsettings.value.inarabic1 != "") && (this.editsettings.value.inarabic2 != "") && (this.editsettings.value.inarabic3 != "")) {
      this.commonerror = false;
    }
  }

  keyPress(event: any) {
    console.log(event.keyCode)
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.keyCode == 45 || event.keyCOde == 43) {
      event.preventDefault();
    }
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
    let serviceUrl = this.commonService.commonUrl + "Account/GetUser"
    let params = {
      "text": "getClinicDetails",
      "id": this.userid,
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.status_cd == "1") {
        this.isPageloaderVisible = false;
        this.editsettings.patchValue({
          clinicname: result.data.Table[0].Clinic_Name,
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
          vatno: result.data.Table[0].VAT_No,
          country: result.data.Table[0].Country_Name,
          businessno: result.data.Table[0].Business_Identificationno,
          nationalno: result.data.Table[0].National_Identifuicationno,
          muncipalno: result.data.Table[0].Municipal_licenceno,
          url: result.data.Table[0].Map_url,
          firstapp: result.data.Table[0].Slot_First,
          standapp: result.data.Table[0].Slt_standard,
          scheduletypeinput: result.data.Table[0].timetype,
        })
        this.mapsurl = result.data.Table[0].Map_url;
        this.business_image = result.data.Table[0].Business_Identification;
        this.national_image = result.data.Table[0].National_Identification;
        this.muncipal_image = result.data.Table[0].Municipal_licence;

        if (this.editsettings.value.businessid == null || this.editsettings.value.businessid == "") {
          this.editsettings.value.businessid = this.business_image;
        }
        if (this.editsettings.value.nationalid == null || this.editsettings.value.nationalid == "") {
          this.editsettings.value.nationalid = this.national_image;
        }
        if (this.editsettings.value.muncipalid == null || this.editsettings.value.muncipalid == "") {
          this.editsettings.value.muncipalid = this.muncipal_image;
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

        this.daysarray = result.data.Table1;
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
                console.log(control.value)

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
                console.log(this.totaldays[i].checkbox_value);
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
                this.previous_selected_checkboxes.push(i);
                this.sessiontotaldays[i] = selectedtemp;

                const control = this.mysessionForm.get(['sessionrows', i, 'checkbox_value'])
                control.setValue(true);
                const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
                control1.setValue(result.data.Table1[j].starttime);
                const control2 = this.mysessionForm.get(['sessionrows', i, 'sessionstart1input'])
                control2.setValue(result.data.Table1[j].starttimeformat.replace(' ', ''));
                const control3 = this.mysessionForm.get(['sessionrows', i, 'session1end'])
                control3.setValue(result.data.Table1[j].endtime);
                const control4 = this.mysessionForm.get(['sessionrows', i, 'sessionend1input'])
                control4.setValue(result.data.Table1[j].endtimeformat.replace(' ', ''));
                const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
                control5.setValue(result.data.Table1[j].Sesstarttime);
                const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
                control6.setValue(result.data.Table1[j].Sesstarttimeformat.replace(' ', ''));
                const control7 = this.mysessionForm.get(['sessionrows', i, 'session2end'])
                control7.setValue(result.data.Table1[j].Sesendtime);
                const control8 = this.mysessionForm.get(['sessionrows', i, 'sessionend2input'])
                control8.setValue(result.data.Table1[j].Sesendtimeformat.replace(' ', ''));
              }
            }
          }
        }
      }
      else {
        this.isPageloaderVisible = false;
      }
    },
      error => {
        this.isPageloaderVisible = false;
      }
    );
  }

  dayampmchange(ind) {
    console.log("index.. " + ind);
    console.log("ampm change entered... ");
    const controlnew = this.myForm.get(['rows', ind, 'titleinput'])
    console.log(controlnew.value);
    if (controlnew.value == "" || controlnew.value == null) {
      console.log("entered if");
      alert("Please select am/pm");
      this.editsettings.patchValue({
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
        this.editsettings.patchValue({
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
        this.editsettings.patchValue({
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
        this.editsettings.patchValue({
          session2end: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
  }

  sessionclick() {
    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
        if (this.sessiontotaldays[i].session1start.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.sessiontotaldays[i].session1start.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.sessiontotaldays[i].session1start.split(":")[1] == undefined) || (this.sessiontotaldays[i].session1start.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1start']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
        if (this.sessiontotaldays[i].session1end.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.sessiontotaldays[i].session1end.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.sessiontotaldays[i].session1end.split(":")[1] == undefined) || (this.sessiontotaldays[i].session1end.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session1end']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
        if (this.sessiontotaldays[i].session2start.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.sessiontotaldays[i].session2start.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.sessiontotaldays[i].session2start.split(":")[1] == undefined) || (this.sessiontotaldays[i].session2start.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2start']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
        if (this.sessiontotaldays[i].session2end.split(":")[0].length < 2) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.sessiontotaldays[i].session2end.split(":")[0].length == 2)) {
          const control4 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.sessiontotaldays[i].session2end.split(":")[1] == undefined) || (this.sessiontotaldays[i].session2end.split(":")[1] == "")) {
          const control1 = this.mysessionForm.get(['sessionrows', i, 'session2end']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
      }
    }
  }

  dayssession() {
    //...........for days wise.........
    this.myForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
    this.patchValues();
    var b = 1
    this.myForm.get('rows').valueChanges.subscribe(values => {
      this.totaldays = values;
      var currentIndex;
      var even = function (ele) {
        return ele.checkbox_value == true;
      }
      if (this.totaldays.some(even) == true) {
        if (this.schedule.includes("Day Wise") == false) {
          this.schedule.push(this.editsettings.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Day Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true) {
          if ((this.totaldays[i].fromtime != null) && (this.totaldays[i].totime != null)) {
            if ((this.totaldays[i].fromtime + this.totaldays[i].titleinput) == (this.totaldays[i].totime + this.totaldays[i].titleinput1)) {
              alert("Start and End Time will not be Same");
              currentIndex = i;
              var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
              var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
              var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
              endTime.value = '';
              endtimeselect.value = '';

            }
            // -------------------- New add-on --------------------------- //

            //   let daystarthrs = ((this.totaldays[i].fromtime).split(":")[0]);
            //   let daystartmins = ((this.totaldays[i].fromtime).split(":")[1]);
            //   let daystartzone = this.totaldays[i].titleinput;
            //   let dayendhrs = ((this.totaldays[i].totime).split(":")[0]);
            //   let dayendmins = ((this.totaldays[i].totime).split(":")[1]);
            //   let dayendzone = this.totaldays[i].titleinput1;

            //   let s1tm = daystarthrs + daystartzone;
            //   let s2tm = dayendhrs + dayendzone;
            //   this.newarr = [];
            //   for (var ti = 1; ti <= 12; ti++) {
            //     let ti1: string;
            //     if (ti < 10) {
            //       ti1 = '0' + ti;
            //     } else {
            //       ti1 = ti.toString();
            //     }
            //     if (ti1 == "12") {
            //       this.newarr.push(ti1 + "PM");
            //     } else {
            //       this.newarr.push(ti1 + "AM");
            //     }
            //   }

            //   for (let tj = 1; tj <= 11; tj++) {
            //     let tj1: string;
            //     if (tj < 10) {
            //       tj1 = '0' + tj;
            //     } else {
            //       tj1 = tj.toString();
            //     }
            //     this.newarr.push(tj1 + "PM")
            //   }

            //   let s1pos = 0;
            //   let s2pos = 0;
            //   for (let s = 0; s < this.newarr.length; s++) {
            //     if (s1tm == this.newarr[s]) {
            //       s1pos = s;
            //     }

            //     if (s2tm == this.newarr[s]) {
            //       s2pos = s;
            //     }
            //   }

            //   if (s1pos > s2pos) {
            //     alert("Start Time must be before End Time");
            //     const control5 = this.myForm.get(['rows', i, 'totime'])
            //     control5.setValue(null);
            //     const control6 = this.myForm.get(['rows', i, 'titleinput1'])
            //     control6.setValue(null);
            //   }

            // -------------------- End ----------------------------------//
          }
        }
        else {
          currentIndex = i;
          var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
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
      for (let j = 0; j < this.sessiontotaldays.length; j++) {
        if (this.sessiontotaldays[j].checkbox_value == true && this.totaldays[j].checkbox_value == true) {
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
      this.sessiontotaldays = values;
      var element = function (ele) {
        return ele.checkbox_value == true;
      }
      if (this.sessiontotaldays.some(element) == true) {
        if (this.schedule.includes("Session Wise") == false) {
          this.schedule.push(this.editsettings.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Session Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
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
            if ((this.sessiontotaldays[i].session1end + this.sessiontotaldays[i].sessionend1input) == (this.sessiontotaldays[i].session2start + this.sessiontotaldays[i].sessionstart2input)) {
              alert("Session1 End Time & Session2 Start Timings will not be Same");
              const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
              control5.setValue(null);
              const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
              control6.setValue(null);
            }
            let S1endhrs = ((this.sessiontotaldays[i].session1end).split(":")[0]);
            let S1endmins = ((this.sessiontotaldays[i].session1end).split(":")[1]);
            let S1endzone = this.sessiontotaldays[i].sessionend1input;
            let S2Starthrs = ((this.sessiontotaldays[i].session2start).split(":")[0]);
            let S2Startmins = ((this.sessiontotaldays[i].session2start).split(":")[1]);
            let S2Startzone = this.sessiontotaldays[i].sessionstart2input;

            let s1tm = S1endhrs + S1endzone;
            let s2tm = S2Starthrs + S2Startzone;
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

            if (s1pos > s2pos) {
              alert("Session2 Start Time must be after Session1 End Time");
              const control5 = this.mysessionForm.get(['sessionrows', i, 'session2start'])
              control5.setValue(null);
              const control6 = this.mysessionForm.get(['sessionrows', i, 'sessionstart2input'])
              control6.setValue(null);
            }

          }

          //// MyWrk ENd ///

        }
        else {
          var index = i
          var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
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
          return false;
        }
      }
    })
  }

  checkboxchange(row, value, indx, boxtype) {
    console.log("indexvalue... " + indx);
    this.newchange(value, indx, boxtype);
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
      }
      else {
        if (value == this.checkbox_validation[0].day) {
          this.checkbox_validation = [];
          this.previous_checkbox_value = [];
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

      this.checkbox_validation.push(this.totaldays[indx]);
      this.previous_checkbox_value.push(indx);
    }
  }

  checkboxsessionchange(row, value, indx, boxtype) {
    this.checked_Session_rows = this.mysessionForm.get("sessionrows").value;
    this.newchange(value, indx, boxtype);
    for (var i = 0; i < this.totaldays.length; i++) {
      if (value == this.totaldays[i].day) {
        if (this.totaldays[i].checkbox_value == true) {
          $(".sessioninput").eq(indx).prop("checked", false);
          alert("Please uncheck " + this.totaldays[i].day + " in day wise");
          const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
          control.setValue(null);
          return false;
        }
      }
    }

    if (this.checkboxsession_validation.length != 0) {
      var selected_status = "";
      var equalindx = 0;
      var indxpos = 0;
      for (var j = 0; j < this.checkboxsession_validation.length; j++) {
        if (value == this.checkboxsession_validation[j].day) {
          selected_status = "true";
          indxpos = j;
          equalindx = this.previous_selected_checkboxes[j];
          break;
        } else {
          selected_status = "false";
        }
      }

      if (selected_status == "false") {
      } else {
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
        for (var i = 0; i < this.sessiontotaldays.length; i++) {
          if (this.sessiontotaldays[i].day == value) {
            this.sessiontotaldays[i] = this.checked_Session_rows[equalindx];
          }
        }
        this.checkboxsession_validation.splice(indxpos, 1);
        this.previous_selected_checkboxes.splice(indxpos, 1);
        return false;
      }

      for (var i = 0; i < this.checked_Session_rows.length; i++) {
        for (var j = 0; j < this.checkboxsession_validation.length; j++) {
          if (this.checkboxsession_validation[j].day == this.checked_Session_rows[i].day) {
            this.checkboxsession_validation[j] = this.checked_Session_rows[i];
            this.sessiontotaldays[i] = this.checked_Session_rows[i];
          } else {
          }
        }
      }

      var checked_satus = "";
      var checked_previous_index = 0;
      for (var i = 0; i < this.checkboxsession_validation.length; i++) {
        if (this.checkboxsession_validation[i].sessionstart1input == null) {
          checked_satus = "true";
          checked_previous_index = i;
          break;
        }
        else {
          checked_satus = "false";
        }
      }
      if (checked_satus == "true") {
        alert("Please Enter Timings for " + this.checkboxsession_validation[checked_previous_index].day);
        const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
        control.setValue(null);
      } else {
        this.checkboxsession_validation.push(this.checked_Session_rows[indx]);
        this.previous_selected_checkboxes.push(indx);
        this.sessiontotaldays[indx] = this.checked_Session_rows[indx];
      }
    }
    else {
      this.checkboxsession_validation.push(this.sessiontotaldays[indx]);
      this.previous_selected_checkboxes.push(indx);
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

  fromtimechange() {
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].checkbox_value == true) {
        if (this.totaldays[i].fromtime.split(":")[0].length < 2) {
          const control1 = this.myForm.get(['rows', i, 'fromtime']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.totaldays[i].fromtime.split(":")[0].length == 2)) {
          const control4 = this.myForm.get(['rows', i, 'fromtime']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.totaldays[i].fromtime.split(":")[1] == undefined) || (this.totaldays[i].fromtime.split(":")[1] == "")) {
          const control1 = this.myForm.get(['rows', i, 'fromtime']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
        if (this.totaldays[i].totime.split(":")[0].length < 2) {
          const control1 = this.myForm.get(['rows', i, 'totime']);
          let tempo1 = control1.value;
          let tempo2 = "0" + tempo1;
          control1.setValue(tempo2);
        }
        if ((this.totaldays[i].totime.split(":")[0].length == 2)) {
          const control4 = this.myForm.get(['rows', i, 'totime']);
          let tempo7 = control4.value;
          control4.setValue(tempo7);
        }
        if ((this.totaldays[i].totime.split(":")[1] == undefined) || (this.totaldays[i].totime.split(":")[1] == "")) {
          const control1 = this.myForm.get(['rows', i, 'totime']);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
        }
      }
    }
  }

  getDataDays(val) {
    //console.log("days data entered.....");
    this.allCheckeds2EndTimings = [];
    this.allCheckeds2StartTimings = [];
    this.fromvalue = val;
    var allDays = document.querySelectorAll('.eachDay');
    allDays = Array.prototype.slice.call(allDays);
    //console.log(allDays)
    var self = this;
    allDays.forEach((elem) => {
      var eachDayName = <HTMLInputElement>elem.querySelector('.dayName');
      if (eachDayName.checked === true) {
        this.allCheckedDays.push(eachDayName.id);
        var individualStartTime = <HTMLInputElement>elem.querySelector('.startTime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.starttimeselect');
        this.allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);
        var individualEndTime = <HTMLInputElement>elem.querySelector('.endTime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.endtimeselect');
        this.allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
        this.allCheckeds2StartTimings.push("");
        this.allCheckeds2EndTimings.push("");
      }
    })

    var sessionallDays = document.querySelectorAll('.eachsession');
    sessionallDays.forEach((elem) => {
      var eachDayName = <HTMLInputElement>elem.querySelector('.sessioninput');
      if (eachDayName.checked === true) {
        this.allCheckedDays.push(eachDayName.id);
        //.......................session1 start and end..............
        var individualStartTime = <HTMLInputElement>elem.querySelector('.session1starttime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.session1startselect');

        this.allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);

        var individualEndTime = <HTMLInputElement>elem.querySelector('.session1endtime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.session1endselect');

        this.allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
        //..............session 2 start and end.......

        var individuals2StartTime = <HTMLInputElement>elem.querySelector('.session2starttime');
        var individuals2StartMeridian = <HTMLSelectElement>elem.querySelector('.session2startselect');

        this.allCheckeds2StartTimings.push(individuals2StartTime.value + " " + individuals2StartMeridian.value);

        var individuals2EndTime = <HTMLInputElement>elem.querySelector('.session2endtime');
        var individuals2EndMeridian = <HTMLSelectElement>elem.querySelector('.session2endselect');

        this.allCheckeds2EndTimings.push(individuals2EndTime.value + " " + individuals2EndMeridian.value)
        console.log(this.allCheckeds2EndTimings);
      }
    })
    this.update(val, this.allCheckedDays.toString(), this.allCheckedStartTimings.toString(), this.allCheckedEndTimings.toString(), this.allCheckeds2StartTimings.toString(), this.allCheckeds2EndTimings.toString());
  }

  getcountry() {
    // this.commonService.tokenFun().subscribe(tokenResult => {
    var accessToken = window.localStorage.Tokenval
    //console.log(accessToken);
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
    //console.log(params);
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //console.log(result);
      if (result.status_cd == "1") {
        this.countries = result.data.Table;
      } else {
        //console.log(result.error_msg);
        //console.log(accessToken);
      }
    },
      error => {
        //console.log(error);
      }
    );
  }

  get f() {
    return this.editsettings.controls;
  }

  fromkey(val) {
    let timepattern = /[0-9\:]/
    let inputChar = String.fromCharCode(val.charCode);
    if (!timepattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fromenter(val, key, i, type, boxtype) {
    console.log(boxtype);
    if (val.target.value.length < 3) {
      if (val.target.value == ":") {
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(1) == ":") {
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

      if ((val.target.value).charAt(3) == ":") {
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(4) == ":") {
        val.target.value = val.target.value.slice(0, -1);
      }
      if (((val.target.value).charAt(3) + (val.target.value).charAt(4)) > 59) {
        alert("Please enter valid min");
        val.target.value = val.target.value.slice(0, -2);
      }
    }
    if (key == 8) {
      val.target.value = val.target.value.slice(0, -1);
    }
    if (val.target.value.length > 5) {
      val.target.value = val.target.value.slice(0, -1);
    }

    if (val.target.value.length == 5) {
      if (boxtype == "daywise") {
        this.dayclinictimings(i, type, boxtype);
      }
      else {
        this.sesclinictimings(i, type, boxtype);
      }

    }
  }

  mobilecheck() {
    if (this.editsettings.value.mobile != "") {
      var accessToken = window.localStorage.Tokenval;
      //console.log(accessToken);
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
        "Mobile": this.editsettings.value.mobile,
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
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        if (result.data.Table[0].Result == "True") {
          alert("Mobile Number Already exists");
          this.editsettings.value.mobile = "";
          return false;
        } else {

        }
      },
        error => {
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

  english(event) {
    console.log("entered english event")
    var arregex = /[A-Za-z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!arregex.test(inputChar)) {
      alert("Please Enter English Letters")
      event.preventDefault();
    }
  }

  submit() {
    this.allCheckedDays = []
    this.allCheckedStartTimings = []
    this.allCheckedEndTimings = []
    this.allCheckeds2StartTimings = []
    this.allCheckeds2EndTimings = []

    console.log(this.editsettings.invalid);
    this.commonvalidationcheck();
    if (this.editsettings.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.editsettings);
      this.arabicenglishhandling();
      this.mobilecheck();
    }
    else {
      this.getDataDays('fromsubmit');
    }
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].checkbox_value == true) {
      }
    }
    console.log("hello. .");
    // if(this.sessiontotaldays.length!= 0){
    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
      }
    }
    console.log("final. . ");
  }

  commonvalidationcheck() {
    this.arabicenglishhandling();
    if (this.editsettings.value.comemail == null || this.editsettings.value.comemail == "") {
      this.editsettings.value.comemail = "";
    }
    if (this.editsettings.value.clinicno == null || this.editsettings.value.clinicno == "") {
      this.editsettings.value.clinicno = "";
    }
    if (this.editsettings.value.website == null || this.editsettings.value.website == "") {
      this.editsettings.value.website = "";
    }
    if (this.editsettings.value.url == null || this.editsettings.value.url == "") {
      this.editsettings.value.url = "";
    }
    if (this.editsettings.value.vatno == null || this.editsettings.value.vatno == "") {
      this.editsettings.value.vatno = "";
    }
    if (this.editsettings.value.businessid == null || this.editsettings.value.businessid == "") {
      this.editsettings.value.businessid = this.business_image;
    }
    if (this.editsettings.value.nationalid == null || this.editsettings.value.nationalid == "") {
      this.editsettings.value.nationalid = this.national_image;
    }
    if (this.editsettings.value.muncipalid == null || this.editsettings.value.muncipalid == "") {
      this.editsettings.value.muncipalid = this.muncipal_image;
    }
  }

  fileupload(evnt, name) {
    console.log(name);
    let fileSelected = evnt.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    // this.imagePreview = reader.result;
    // };    
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    console.log(body)
    var accessToken = window.localStorage.Tokenval
    let headers = new Headers({
      //"Content-Type": "application/json",
      //Accept: "application/json",
      Authorization: accessToken
    });

    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.commonService.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      //console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.result = body[0];
      console.log(this.result);
      console.log(name);
      if (name == "nationalid") {
        this.editsettings.value.nationalid = body[0];
        const control1 = this.editsettings.controls.nationalid;
        console.log(control1);
        control1.setValue(this.editsettings.value.nationalid);
        console.log(control1);
      } else if (name == "muncipalid") {
        this.editsettings.value.muncipalid = body[0];
        const control3 = this.editsettings.controls.muncipalid;
        control3.setValue(this.editsettings.value.muncipalid);
      } else if (name == "businessid") {
        this.editsettings.value.businessid = body[0];
        const control2 = this.editsettings.controls.businessid;
        control2.setValue(this.editsettings.value.businessid);
      }
    });
    // })
  }

  update(val, days, startTime, EndTime, s2start, s2end) {
    if (this.engerror == true || this.arabicerror == true || this.commonerror == true) {
      return false;
    }
    if ((days == "") || (startTime == "") || (EndTime == "")) {
      alert("Please choose your timings.")
    } else {
      // http://graylogic.net/OclinicoAPI/Api/Account/Registrations_Transactions
      var accessToken = window.localStorage.Tokenval
      let url = this.commonService.commonUrl + "Account/Registrations_Transactions"
      let body = {
        "sno": "",
        "Clinicid": this.userid,
        "Clinic_Name": this.editsettings.value.clinicname,
        "First_Name": this.editsettings.value.inenglish1,
        "middle_Name": this.editsettings.value.inenglish2,
        "Last_Name": this.editsettings.value.inenglish3,
        "Arafirst_Name": this.editsettings.value.inarabic1,
        "Aralast_Name": this.editsettings.value.inarabic2,
        "Ara_Fathername": this.editsettings.value.inarabic3,
        "Email": this.editsettings.value.email,
        "Pwd": "",
        "Communicationemailid": this.editsettings.value.comemail,
        "Mail_trans": this.editsettings.value.spec,
        "mailpwd": "",
        "phoneno": this.editsettings.value.phno,
        "mobileno": this.editsettings.value.mobile,
        "Clinicno": this.editsettings.value.clinicno,
        "Address": this.editsettings.value.address,
        "city": this.editsettings.value.city,
        "country": this.editsettings.value.country,
        "Bus_Idno": this.editsettings.value.businessno,
        "Bus_Idimg": this.editsettings.value.businessid,
        "National_Idno": this.editsettings.value.nationalno,
        "National_Idimg": this.editsettings.value.nationalid,
        "Mun_licno": this.editsettings.value.muncipalno,
        "Mun_licimg": this.editsettings.value.muncipalid,
        "Website": this.editsettings.value.website,
        "Map_url": this.editsettings.value.url,
        "SlotType": this.editsettings.value.vatno,
        "Slot_First": "00:30",
        "Slot_standard": "00:30",
        "timetype": this.schedule.toString(),
        "Trans_Date": "",
        "Last_updated": "",
        "Status": "True",
        "LoginId": this.userid,
        "ClinicStarttiming": startTime + ",",
        "ClinicEndtiming": EndTime + ",",
        "ClinicSess2Start": s2start + ",",
        "ClinicSess2end": s2end + ",",
        "day": days + ",",
        "Operation": "PflUpdate",
        "branchId": ""
      }
      console.log("info1 url..." + JSON.stringify(body));
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options)
        .map(res => res.json()).subscribe(res => {
          if (res.status_cd == 1) {
            console.log(res);
            this.isPageloaderVisible = false;
            alert("Updated Successfully");
            this.router.navigate(['/generalsettings']);
          } else {
            this.isPageloaderVisible = false;
            //console.log("Please try again later");
          }
        },
          err => {
            this.isPageloaderVisible = false;
            //console.log("ERROR!: ", err);
          });
    }
  }


  dayclinictimings(ind, type, boxtype) {
    this.indexval = ind
    this.timetype = type
    console.log(ind)
    console.log(type);
    console.log(boxtype);
    console.log("am pm change entered....")
    console.log(this.indexval);
    console.log(this.myForm);
    console.log(this.mysessionForm);
    //---------- For daywise --------------//
    var val = this.myForm.controls.rows.value[this.indexval]
    this.day = val.day;
    this.starttime = val.fromtime + '' + val.titleinput;
    this.endtime = val.totime + '' + val.titleinput1;

    let starttime;
    let endtime;
    let sesstarttime;
    let sesendtime;
    let day;
    let bid;

    if (this.timetype == "daystart") {
      bid="";
      starttime = this.starttime;
      day = this.day;
      endtime = "";
      sesstarttime = "";
      sesendtime = "";
    } else if (this.timetype == "dayend") {
      bid="";
      starttime = this.starttime;
      day = this.day;
      endtime = this.endtime;
      sesstarttime = "";
      sesendtime = "session1end";
    }
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/check_clinictimings";
    let serviceUrl = this.commonService.commonUrl + "Account/check_clinictimings"
    let params = {
      "sno": "",
      "clinicid": this.userid,
      "branchid": bid,
      "day": day,
      "S1_start": starttime,
      "S1_end": endtime,
      "s2_start": sesstarttime,
      "s2_end": sesendtime,
      "condition": "CheckUserTimings1"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(JSON.stringify(params));
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.status_cd == "1") {
        if (result.data.Table[0].Result == "False") {
          console.log(result.data.Table[0]);
          alert("You can't edit these timings as the appointments are already scheduled");
          console.log(JSON.stringify(this.daysarray));
          for (var a = 0; a < this.daysarray.length; a++) {
            if (this.day == this.daysarray[a].Days) {
              const control1 = this.myForm.get(['rows', ind, 'fromtime'])
              control1.setValue(this.daysarray[a].starttime);
              const control2 = this.myForm.get(['rows', ind, 'titleinput'])
              control2.setValue(this.daysarray[a].starttimeformat.replace(' ', ''));
              const control3 = this.myForm.get(['rows', ind, 'totime'])
              control3.setValue(this.daysarray[a].endtime);
              const control4 = this.myForm.get(['rows', ind, 'titleinput1'])
              control4.setValue(this.daysarray[a].endtimeformat.replace(' ', ''));
            }
          }
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
  }

  sesclinictimings(ind, type, boxtype) {
    this.indexval = ind
    this.timetype = type
    console.log(ind);
    console.log(boxtype)
    console.log(type);
    console.log("am pm change entered....")
    console.log(this.indexval);
    console.log(this.myForm);
    console.log(this.mysessionForm);
    var val1 = this.mysessionForm.controls.sessionrows.value[this.indexval];
    this.sesday = val1.day;
    this.s1starttime = val1.session1start + '' + val1.sessionstart1input;
    this.s1endtime = val1.session1end + '' + val1.sessionend1input;
    this.s2starttime = val1.session2start + '' + val1.sessionstart2input;
    this.s2endtime = val1.session2end + '' + val1.sessionend2input;

    let starttime;
    let endtime;
    let sesstarttime;
    let sesendtime;
    let day;
    let bid;

    if (this.timetype == "ses1start") {
      bid="";
      starttime = this.s1starttime;
      day = this.sesday;
      endtime = "";
      sesstarttime = "";
      sesendtime = "";
    } else if (this.timetype == "ses1end") {
      bid="";
      starttime = this.s1starttime;
      day = this.sesday;
      endtime = this.s1endtime;
      sesstarttime = "";
      sesendtime = "session1end";
    } else if (this.timetype == "ses2start") {
      bid="";
      starttime = this.s1starttime;
      day = this.sesday;
      endtime = this.s1endtime;
      sesstarttime = this.s2starttime;
      sesendtime = "session2start";
    } else if (this.timetype == "ses2end") {
      bid="session2end"
      starttime = this.s1starttime;
      day = this.sesday;
      endtime = this.s1endtime;
      sesstarttime = this.s2starttime;
      sesendtime =  this.s2endtime;
    }

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/check_clinictimings";
    let serviceUrl = this.commonService.commonUrl + "Account/check_clinictimings"
    let params = {
      "sno": "",
      "clinicid": this.userid,
      "branchid": bid,
      "day": day,
      "S1_start": starttime,
      "S1_end": endtime,
      "s2_start": sesstarttime,
      "s2_end": sesendtime,
      "condition": "CheckUserTimings1"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(JSON.stringify(params));
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      if (result.status_cd == "1") {
        if (result.data.Table[0].Result == "False") {
          console.log(result.data.Table[0]);
          alert("You can't edit these timings as the appointments are already scheduled");
          console.log(JSON.stringify(this.daysarray));
          for (var a = 0; a < this.daysarray.length; a++) {
            if (this.day == this.daysarray[a].Days) {
              const control5 = this.mysessionForm.get(['sessionrows', ind, 'session1start'])
              control5.setValue(this.daysarray[a].starttime);
              const control6 = this.mysessionForm.get(['sessionrows', ind, 'sessionstart1input'])
              control6.setValue(this.daysarray[a].starttimeformat.replace(' ', ''));
              const control7 = this.mysessionForm.get(['sessionrows', ind, 'session1end'])
              control7.setValue(this.daysarray[a].endtime);
              const control8 = this.mysessionForm.get(['sessionrows', ind, 'session1endinput'])
              control8.setValue(this.daysarray[a].endtimeformat.replace(' ', ''));
            }
          }
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
  }

  newchange(value, idx, boxtype) {
    console.log(value);
    console.log(idx);
    console.log(boxtype);
    this.day = value;
    this.checkval = idx;
    this.boxtype = boxtype;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/check_clinictimings"
    let body = {
      "sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "day": this.day,
      "S1_start": "",
      "S1_end": "",
      "s2_start": "",
      "s2_end": "",
      "condition": "checkstaffdays"
    }

    console.log("checkclinic url..." + JSON.stringify(body));
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
          console.log(res.data.Table[0].Result);
          if (res.data.Table[0].Result == "True") {
            alert("You can't edit these timings as the appointments are already scheduled");
            console.log(res);
            console.log(JSON.stringify(this.daysarray));
            if (this.boxtype == 'daywise') {
              for (var a = 0; a < this.daysarray.length; a++) {
                if (this.day == this.daysarray[a].Days) {
                  const control = this.myForm.get(['rows', idx, 'checkbox_value'])
                  control.setValue(true);
                  const control1 = this.myForm.get(['rows', idx, 'fromtime'])
                  control1.setValue(this.daysarray[a].starttime);
                  const control2 = this.myForm.get(['rows', idx, 'titleinput'])
                  control2.setValue(this.daysarray[a].starttimeformat.replace(' ', ''));
                  const control3 = this.myForm.get(['rows', idx, 'totime'])
                  control3.setValue(this.daysarray[a].endtime);
                  const control4 = this.myForm.get(['rows', idx, 'titleinput1'])
                  control4.setValue(this.daysarray[a].endtimeformat.replace(' ', ''));
                }
              }
            } else {
              for (var a = 0; a < this.daysarray.length; a++) {
                if (this.day == this.daysarray[a].Days) {
                  const control5 = this.mysessionForm.get(['sessionrows', idx, 'session1start'])
                  control5.setValue(this.daysarray[idx].starttime);
                  const control6 = this.mysessionForm.get(['sessionrows', idx, 'sessionstart1input'])
                  control6.setValue(this.daysarray[idx].starttimeformat.replace(' ', ''));
                  const control7 = this.mysessionForm.get(['sessionrows', idx, 'session1end'])
                  control7.setValue(this.daysarray[idx].endtime);
                  const control8 = this.mysessionForm.get(['sessionrows', idx, 'session1endinput'])
                  control8.setValue(this.daysarray[idx].endtimeformat.replace(' ', ''));
                  const control9 = this.mysessionForm.get(['sessionrows', idx, 'session2start'])
                  control9.setValue(this.daysarray[idx].Sesstarttime);
                  const control10 = this.mysessionForm.get(['sessionrows', idx, 'sessionstart2input'])
                  control10.setValue(this.daysarray[idx].Sesstarttimeformat.replace(' ', ''));
                  const control11 = this.mysessionForm.get(['sessionrows', idx, 'session2end'])
                  control11.setValue(this.daysarray[idx].Sesendtime);
                  const control12 = this.mysessionForm.get(['sessionrows', idx, 'session2endinput'])
                  control12.setValue(this.daysarray[idx].Sesendtimeformat.replace(' ', ''));
                }
              }
            }
          }
          else {
            this.isPageloaderVisible = false;
            console.log("No appointments on this day");
          }
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
  }
}