import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { of } from 'rxjs';
import * as $ from 'jQuery';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { timeMonday } from 'd3';
// import { CustomValidators } from 'src/app/shared/customvalidation/custom.validator';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
import { Router } from '@angular/router';
import { WikipediaService } from 'src/app/component/typehead/typehead.component';
//import { FORMERR } from 'dns';





@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {
  @ViewChild('tabs')
  public tabs: NgbTabset;

  currentJustify = 'start';
  currentOrientation = 'horizontal';
  patient: FormGroup;
  myForm: FormGroup;
  mysessionForm: FormGroup;
  public isPageloaderVisible: boolean = false;
  public departments: any = [];
  public banknames: any = [];
  public documenttypes: any = [];
  public countries: any = [];
  public date: any;
  public jobtitles: any;
  public branchnames: any = [];
  public hiredatefor: any;
  public daynames: any = [];
  public sesion1starttimes: any = [];
  public sesion1endtimes: any = [];
  public hicompanyname: any = [];
  public basicinfo1saveddata: any = [];
  public daysorsessionsdata: any = [];
  public basic2infosaveddata: any = [];
  public documetsdata: any = [];
  public healthinsusaveddata: any = [];
  public vehiclesaveddata: any = [];
  public truepushed: any = [];
  public titles: any = ["Mr", "Ms", "Mrs", "Miss", "Dr", "Professor", "Sir"];
  public titles1: any = ["السيد", "السيدة", "الآنسة", "الآنسة", "استاذ جامعى", "الدكتور/ة"];
  public genders: any = [{ "name": "Male" }, { "name": "Female" }];
  public genders1:any=[{"name":"ذكر"},{"name":"أنثى"}];
  public statusarr: any = ["Active", "Inactive"];
  public statusarr1: any = ["نشط", "غير نشط"];
  public days: any = [{ "id": "day1", "day": "Sunday" }, { "id": "day2", "day": "Monday" }, { "id": "day3", "day": "Tuesday" }, { "id": "day4", "day": "Wednesday" }, { "id": "day5", "day": "Thursday" }, { "id": "day6", "day": "Friday" }, { "id": "day7", "day": "Saturday" }];
  public sessiondays: any = [{ "id": "sday1", "day": "Sunday" }, { "id": "sday2", "day": "Monday" }, { "id": "sday3", "day": "Tuesday" }, { "id": "sday4", "day": "Wednesday" }, { "id": "sday5", "day": "Thursday" }, { "id": "sday6", "day": "Friday" }, { "id": "sday7", "day": "Saturday" }]
  public amorpm: any = ["AM", "PM"];
  public maritalstatus: any = ["Unmarried", "Married"];
  public nationality: any = ["Indian"];
  public jobtypes: any = ["Permanent", "Contract", "PartTime"];
  public positions: any = ["Senior", "Junior", "Other"];
  public salary: any = ["Cash", "Bank Account"];
  public insurancetype: any = ["Open", "Fixed", "ذلك. لا تمانع"];
  public formArrayLength: number = 0;
  public emailpattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  weekdays = [
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

  title = ['AM', 'PM'];
  public english1: any;
  public english2: any;
  public english3: any;
  public arabic1: any;
  public arabic2: any;
  public arabic3: any;
  public docno: any;
  public daywiseif: boolean = false;
  public sessionwiseif: boolean = false;
  public nostatus: boolean = false;
  public submitted = false;
  public daysdata: any = [];
  public sessiondata: any = [];
  public totaldays: any = [];
  public sessiontotaldays: any = [];
  public healthinsurance: any = [];
  public hierarchy: any = [];
  fields: any;
  professiono: any;
  sponser: any;
  hiredat: any;
  startdate: any;
  dateofbirth: any;
  placeofbirth: any;
  dateofissue: any;
  expiredate: any;
  dateofgraduation: any;
  nameofcourse: any;
  placeofissue: any;
  docstartdate: any;
  docenddate: any;
  coursecertificate: any;
  healthinsurace: any = "";
  hicompany: any = "";
  insurance: any;
  hiexpirydate: any;
  insuranceno: any;
  insurancecopy: any;
  hiinsurancetype: any = "";
  dateofreg: any;
  licenceexdate: any;
  vehicleexdate: any;
  assigndate: any;
  returndate: any;
  vehexdate: any;
  starttime: any;
  endtime: any;
  starttimeidx: any;
  currentTab: any;
  nextTab: any;
  nextTabId: string = '';
  activeTabId: string = '';
  fromsubmit: boolean;
  activeId: any;
  firsttitle: any;
  gender: any;
  document: any;
  department: any;
  jobtitle: any;
  reporting: any;
  status: any;
  startdatefor: string;
  dayorsessionval: any;
  dateofregformat: string;
  issuedate: any;
  issuedateformat: string;
  expirydateformat: string;
  docissuedateformat: string;
  docexpiredateformat: string;
  docgraduationformat: string;
  docstartformat: string;
  docendformat: string;
  plate_no: any;
  licenceexdateformat: string;
  vehivleexdateformat: string;
  vehicleassigndateformat: string;
  vehiclereturndateformat: string;
  fromvalue: any;
  public langulagetype: any = 'us';
  public currentlangualge: any;
  dateofbirthformat: string;
  sceduletype: string;
  hdformat: string;
  sdformat: string;
  empid: any;
  b2dobformat: string;
  languageoption: any;
  userid: any;
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
  alldocnames: any = [];
  allenddates: any = [];
  allchoosefiles: any = [];
  result: string;
  uploaddoc: string;
  degreecertificate: string;
  coursecerti: string;
  uploadinsurancecopy: string;
  uploadlicenceatt: string;
  uploadinsuraceatt: string;
  ampmIndex: any;
  chkfrmtime: string;
  chktotime: string;
  chkday: any;
  session2start: string;
  session2end: string;
  reportingname: any;
  employ_id: any;
  password: any;
  previousfields: boolean = true;
  colorhide: boolean = true;
  doccode: string;
  jobtitlename: any;
  colorcode: any;
  randompassword: string;
  engarray: any = [];
  arabicarray: any = [];
  arabicerror: boolean = false;
  engerror: boolean = false;
  commonerror: boolean = false;
  colorchoose: boolean = false;
  doctorcode_previousfields: boolean = true;
  docarray: any = [];
  country: any = "Saudi Arabia"
  addchoosefile: string;
  docaddclickhide: boolean = true;
  public addarrayitems: any = [];
  public addcount: any = 0;
  docenddatevar: any;
  docaddenddateformat: string;
  public enddateaaray: any = [];
  public choosefilearray: any = [];
  public tabclick: boolean = false;
  public listofspecialization: any = [];
  public specializationrowhide: boolean = true;
  public arbspecialization: boolean = false;
  public engspecialization: boolean = false;
  public timingsarr: any = [];
  s1end: string;
  s1start: string;
  dayname: any;
  value_M1: boolean = false;


  beforeChange($event: NgbTabChangeEvent) {
    console.log($event.nextId)
    if ($event.nextId === 'basic1') {
      if (this.patient.value.jobinput == "Doctor") {
        this.doctorcode_previousfields = false;
        this.previousfields = false;
      }
      else {
        this.previousfields = false;
        this.doctorcode_previousfields = true;
      }
    }
    if ($event.nextId === 'basic2') {

      if (this.patient.invalid === true) {
        this.fromsubmit = true;
        this.checkValidationErrors(this.patient);
        this.arabicenglishhandling();
        $event.preventDefault();
      }
      else {
        if (this.tabclick == false) {
          $event.preventDefault();
        }
      }

    }
    if ($event.nextId === 'document') {

      if (this.patient.invalid === true) {
        this.fromsubmit = true;
        this.checkValidationErrors(this.patient);
        $event.preventDefault();
      }
      else {
        if (this.tabclick == false) {
          $event.preventDefault();
        }
      }
    }
    if ($event.nextId === 'healthinsurance') {
      // $event.preventDefault();
      if (this.patient.invalid === true) {
        this.fromsubmit = true;
        this.checkValidationErrors(this.patient);
        $event.preventDefault();
      }
      else {
        if (this.tabclick == false) {
          $event.preventDefault();
        }
      }
    }
    if ($event.nextId === 'vehicle') {
      //$event.preventDefault();
      if (this.patient.invalid === true) {
        this.fromsubmit = true;
        this.checkValidationErrors(this.patient);
        $event.preventDefault();
      }
      else {
        if (this.tabclick == false) {
          $event.preventDefault();
        }
      }
    }


  }
  nullValue: any;
  titleinput = this.nullValue;
  tinput1 = this.nullValue;
  titleinput2 = this.nullValue;
  Statusinput = this.nullValue;
  tinput = this.nullValue;
  Englishinput = this.nullValue;
  Englishinput1 = this.nullValue;
  Englishinput2 = this.nullValue;
  sponserinput = this.nullValue;
  reportinginput = this.nullValue;
  professionofres = this.nullValue;
  genderinput = this.nullValue;
  docinput = this.nullValue;
  docnoinput = this.nullValue;
  departmentinput = this.nullValue;
  jobinput = this.nullValue;
  hireinput = this.nullValue;
  Startdateinput = this.nullValue;
  mobileinput = this.nullValue;
  hierachyinput = this.nullValue;
  homephoneinput = this.nullValue;
  salaryinput = this.nullValue;
  scheduletypeinput = this.nullValue;
  doctorcode = this.nullValue;
  pwd = this.nullValue;
  colorinput = this.nullValue;
  // speciatization=this.nullValue;
  // spearabicinput=this.nullValue;
  //.........................basic 2 formcontrol names.........
  laborofficeinput = this.nullValue;
  dateofbirthinput = this.nullValue;
  placeofbirthinput = this.nullValue;
  religioninput = this.nullValue;
  nationinput = this.nullValue;
  maritalinput = this.nullValue;
  emailidinput = this.nullValue;
  jobtypeinput = this.nullValue;
  positionlevelinput = this.nullValue;
  salarypayableinput = this.nullValue;
  banknameinput = this.nullValue;
  branchnameinput = this.nullValue;
  accountnoinput = this.nullValue;
  areainput = this.nullValue;
  blockinput = this.nullValue;
  buildinginput = this.nullValue;
  streetinput = this.nullValue;
  floorinput = this.nullValue;
  cityinput = this.nullValue;
  countryinput = this.nullValue;
  //..............document.............
  documentypeinput = this.nullValue;
  adddocname = "";
  addenddateinput = "";
  choosefileinput = "";
  //...........health..........
  healthinsuranceinput = this.nullValue;
  healthincompanyinput = this.nullValue;
  insurancetypeinput = this.nullValue;
  //........vehicle.....
  insurancecomptinput = this.nullValue;

  language: any;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};

  formErrors = {
    'titleinput': '',
    'tinput1': '',
    'titleinput2': '',
    'Statusinput': '',
    'tinput': '',
    'Englishinput': '',
    'Englishinput1': '',
    'Englishinput2': '',
    'professionofres': '',
    'genderinput': '',
    'docinput': '',
    'docnoinput': '',
    'departmentinput': '',
    'jobinput': '',
    'hireinput': '',
    'Startdateinput': '',
    'mobileinput': '',
    'emailidinput': '',
    'sponserinput': '',
    'fromtime': '',
    'accountnoinput': '',
    'documentypeinput': '',
    'healthinsuranceinput': '',
    'healthincompanyinput': '',
    'insurancetypeinput': '',
    'insurancecomptinput': '',
    'doctorcode': '',
    'pwd': '',
    'colorinput': '',
    // 'speciatization':'',
    // 'spearabicinput':''
    // 'adddocname':'',
    // 'addenddateinput':'',
    // 'choosefileinput':'',
  }
  ValidationMessages = {
    // 'titleinput': {
    //   'required': 'Arabic Names are required',
    //   'languageCheck':'Please Enter only  Arabic Names'

    //  },
    //  'tinput1': {
    //   'required': 'Please Enter Father Name',
    //   'languageCheck':'Please Enter only  Arabic Names'

    //  },
    //  'titleinput2': {
    //   'required': 'Please Enter Arabic Last Name',
    //   'languageCheck':'Please Enter only  Arabic Names'

    //  },
    'Statusinput': {
      'required': 'Status is required'
    },
    'tinput': {
      'required': 'Title is required',
    },
    // 'Englishinput': {
    //   'required': 'English Names are required',
    //   'pattern':'Please Enter Valid Name'
    // },
    // 'Englishinput1':{
    //   'required': 'Please Enter Middle Name',
    //   'pattern':'Please Enter Valid Name'
    // },
    // 'Englishinput2':{
    //   'required': 'Please Enter Last Name',
    //   'pattern':'Please Enter Valid Name'
    // },
    'genderinput': {
      'required': 'Gender is required'
    },
    'docinput': {
      'required': 'Document Type is required'
    },
    'docnoinput': {
      'required': 'Doc Number is required',
      'maxlength': 'Doc Number should not exceed 10 digits.',
      'pattern': 'Please enter valid Doc Number'
      //'minlength':'minimuikm 10'
    },
    'departmentinput': {
      'required': ' Department is required'
    },
    // 'speciatization':{
    //  'required':'Specialization is required'
    // },
    // 'spearabicinput':{
    //     'required':'Specialization is required'
    // },
    'jobinput': {
      'required': 'Job Title is required'
    },
    'hireinput': {
      'required': 'Hire Date is required'
    },
    'Startdateinput': {
      'required': 'Start Date is required'
    },
    'sponserinput': {
      'pattern': 'Please Enter Valid Sponser'
    },
    'professionofres': {
      'pattern': 'Please Enter Valid Profession of Residence'
    },

    'mobileinput': {
      'required': 'Mobile No is required',
      'minlength': 'Mobile No should not be less than 10 digits',
      'maxlength': 'Mobile No should not exceed 15 digits.'
    },
    'emailidinput': {
      'pattern': 'Invalid Email ID'
    },
    'numberinput': {
      'maxlength': 'Number should not exceed 15 digits',
      'pattern': 'Please enter valid Number'
    },
    'homephoneinput': {
      'max': 'Home Phone No should not exceed 11 digits'
    },
    'laborofficeinput': {
      'maxlength': 'Labour Office No should not exceed 11 digits',
      'pattern': 'Please enter valid Labour Office No'
    },
    'placeofbirthinput': {
      'pattern': 'Please Enter Valid Place'
    },

    'religioninput': {
      'pattern': 'Please Enter Valid Religion'
    },

    'cityinput': {
      'pattern': 'Please Enter Valid City'
    },
    'accountnoinput': {
      'max': 'Account Number should not exceed 20 digits',
      'min': 'Account Number should not be less than 16 digits'
    },
    'nameofcourseinput': {
      'pattern': 'Please Enter Valid Name'
    },
    'placeofissueinput': {
      'pattern': 'Please Enter Valid Place'
    },
    'gpainput': {
      'max': 'GPA should not exceed 4 digits'
    },
    'socialsecurityinput': {
      'maxlength': 'Social Security Number should not exceed 20 digits',
      'pattern': 'Please enter valid social security number'
    },

    'insurancenoinput': {
      'maxlength': 'Insurance Number should not exceed 10 digits',
      'pattern': 'Please enter valid Insurance Number'
    },
    'modelyearinput': {
      'max': 'Model Year should not exceed 4 digits '
    },
    'vinnoinput': {
      'maxlength': 'VIN Number should not exceed 13 digits',
      'pattern': 'Please enter valid VIN Number'
    },
    'platenoinput': {
      'maxlength': 'Plate Number should not exceed 20 digits',
      'pattern': 'Please enter valid Plate Number'
    },
    'licencenoinput': {
      'maxlength': 'Licence Number should not exceed 15 digits',
      'pattern': 'Please enter valid Licence Number'
    },
    'plicynoinput': {
      'maxlength': 'Policy Number should not exceed 10 digits',
      'pattern': 'Please enter valid Policy Number'
    },
    'fromtime': {
      'pattern': 'Please enter valid Time'
    },
    // 'colorinput':{
    //   'required': 'Color is required'
    // }

  }
  ValidationarabicMessages = {
    // 'titleinput': {
    //   'required': 'عربالأسماء مطلو',
    //   'languageCheck':'الرجاء إدخال الأسماء العربية فقط'

    //  },
    //  'tinput1': {
    //   'required': 'الرجاء إدخال اسم الأب',
    //   'languageCheck':'الرجاء إدخال الأسماء العربية فقط'

    //  },
    //  'titleinput2': {
    //   'required': 'الرجاء إدخال الاسم العائلة باللغة العربية',
    //   'languageCheck':'الرجاء إدخال الأسماء العربية فقط'

    //  },
    'Statusinput': {
      'required': 'الحالة مطلوبة'
    },
    'tinput': {
      'required': 'اللقب مطلوب',
    },
    // 'Englishinput': {
    //   'required': 'الأسماء الإنجليزية مطلوبة',
    //   'pattern':'الرجاء إدخال اسم صحيح'
    // },
    // 'Englishinput1':{
    //   'required': 'الرجاء إدخال الاسم الأوسط',
    //   'pattern':'الرجاء إدخال اسم صحيح'
    // },
    // 'Englishinput2':{
    //   'required': 'الرجاء إدخال اسم العائلة',
    //   'pattern':'الرجاء إدخال اسم صحيح'
    // },
    'genderinput': {
      'required': 'مطلوب اضافة الجنس'
    },
    'docinput': {
      'required': 'نوع المستند مطلوب'
    },
    'docnoinput': {
      'required': 'رقم الوثيقة/المستند مطلوب',
      'maxlength': 'يجب ألا يتجاوز رقم الوثيقة /المستند 10 أرقام',
      'pattern': 'الرجاء إدخال رقم وثيقة/مستند صحيح'
    },
    'departmentinput': {
      'required': 'القسم مطلوب'
    },
    //   'speciatization':{
    //     'required':'التخصص مطلوب'
    //    },
    //    'spearabicinput':{
    //     'required':'التخصص مطلوب'
    // },
    'jobinput': {
      'required': 'المسمى الوظيفي مطلوب'
    },
    'hireinput': {
      'required': 'تاريخ الالتحاق بالعمل مطلوب'
    },
    'Startdateinput': {
      'required': 'تاريخ بدء العمل مطلوب'
    },
    'sponserinput': {
      'pattern': 'الرجاء إدخال كفيل صحيح'
    },

    'professionofres': {
      'pattern': 'الرجاء إدخال مهنة إقامة صحيحة'
    },

    'mobileinput': {
      'required': 'رقم الجوال مطلوب',
      'minlength': 'رقم الجوال يجب ألا يقل عن 10 أرقام',
      'maxlength': 'رقم الجوال يجب ألا يتجاوز 15 رقمًا'
    },
    'emailidinput': {
      'pattern': 'البريد الإلكتروني غير صحيح'
    },
    'numberinput': {
      'maxlength': 'يجب ألا يتجاوز الرقم, 15 رقمًا',
      'pattern': 'الرجاء إدخال رقم صحيح'

    },
    'homephoneinput': {
      'max': 'رقم هاتف المنزل يجب أن لا يتجاوز 11 رقما'
    },
    'laborofficeinput': {
      'maxlength': 'رقم مكتب العمل يجب ألا يتجاوز 11 رقمًا',
      'pattern': 'الرجاء إدخال رقم مكتب عمل صحيح '
    },
    'placeofbirthinput': {
      'pattern': 'الرجاء إدخال مكان صحيح'
    },
    'religioninput': {
      'pattern': 'الرجاء إدخال ديانة صحيحة'
    },
    'cityinput': {
      'pattern': 'الرجاء إدخال مدينة صحيحة'
    },
    'accountnoinput': {
      'max': 'يجب ألا يتجاوز رقم الحساب 20 رقمًا',
      'min': 'يجب ألا يقل رقم الحساب عن 16 رقمًا'
    },
    'nameofcourseinput': {
      'pattern': 'الرجاء إدخال اسم صحيح'
    },
    'placeofissueinput': {
      'pattern': 'الرجاء إدخال مكان صحيح'
    },
    'gpainput': {
      'max': 'يجب ألا يتجاوز المعدل التراكمي 4 أرقام'
    },
    'socialsecurityinput': {
      'maxlength': 'يجب ألا يتجاوز رقم الضمان الاجتماعي 20 رقمًا',
      'pattern': 'الرجاء إدخال رقم ضمان اجتماعي صحيح'
    },
    'insurancenoinput': {
      'maxlength': 'يجب ألا يتجاوز رقم التأمين 10 أرقام',
      'pattern': 'الرجاء إدخال رقم تأمين صحيح'
    },
    'modelyearinput': {
      'max': 'يجب ألا تتجاوز سنة الصنع 4 أرقام '
    },
    'vinnoinput': {
      'maxlength': 'يجب ألا يتجاوز الرقم التسلسلي 13 رقمًا',
      'pattern': 'الرجاء إدخال رقم تسلسلي صحيح'
    },
    'platenoinput': {
      'maxlength': 'يجب ألا يتجاوز رقم اللوحة 20 رقمًا',
      'pattern': 'الرجاء إدخال رقم لوحة صحيحة'
    },
    'licencenoinput': {
      'maxlength': 'يجب ألا يتجاوز رقم الرخصة 15 رقمًا',
      'pattern': 'الرجاء إدخال رقم رخصة صحيحة'
    },
    'plicynoinput': {
      'maxlength': 'يجب ألا يتجاوز رقم البوليصة  10 أرقام',
      'pattern': 'الرجاء إدخال رقم بوليصة صحيحة'
    },
    'fromtime': {
      'pattern': 'نرجو ادخال توقيت صحيح'
    },
    // 'colorinput':{
    //   'required': 'رنگ مورد نیاز است'
    // }

  }
  alertcount: any = [];
  loopcount: number = 0;

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    private datePipe: DatePipe,
    public commonService: UserinfoService,
  ) {


    this.userid = window.localStorage.getItem("userId");
    console.log("empid" + this.userid);
    console.log("empid1" + window.localStorage.getItem("userId"));
    let currentdate = new Date();
    let latest_date = this.datePipe.transform(currentdate, 'yyyy-MM-dd');
    let latest_time = this.datePipe.transform(currentdate, 'HH:mm:ss');
    this.date = latest_date + " " + latest_time;
    console.log("current date......" + this.date);
    //...................event subscribe..........
    console.log("user language....." + this.langulagetype);
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
        'titleinput': '',
        'tinput1': '',
        'titleinput2': '',
        'tinput': '',
        'Englishinput': '',
        'Englishinput1': '',
        'Englishinput2': '',
        'professionofres': '',
        'genderinput': '',
        'docinput': '',
        'docnoinput': '',
        'departmentinput': '',
        'jobinput': '',
        'hireinput': '',
        'Startdateinput': '',
        'mobileinput': '',
        'emailidinput': '',
        'sponserinput': '',
        'Statusinput': '',
        'fromtime': '',
        'accountnoinput': '',
        'documentypeinput': '',
        'healthinsuranceinput': '',
        'healthincompanyinput': '',
        'insurancetypeinput': '',
        'insurancecomptinput': '',
        'doctorcode': '',
        'pwd': '',
        'colorinput': '',
        // 'speciatization':'',
        // 'spearabicinput':''
        // 'adddocname':'',
        // 'addenddateinput':'',
        // 'choosefileinput':'',
      }
    })

    console.log("user language....." + this.langulagetype);
  }


  ngOnInit() {


    this.dayssession()
    this.getdepartments();
    this.getspecializations();
    this.getbanknames();
    this.getdocumenttypes();
    this.getcountries();
    this.getjobtitles_reporting();
    this.gethelthinsurancecat();
    this.gethealthinscompanynames();
    // this.getheirarchy();
    this.truepushed = [];


    for (var i = 0; i < this.weekdays.length; i++) {
      this.alertcount.push(0);
    }

    //  alert(this.alertcount);

    //eng else 
    this.patient = this.formBuilder.group({
      // Englishinput:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      // Englishinput1:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      // Englishinput2:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      // titleinput:['',[Validators.required,CustomValidators.languageCheck('')]],
      // tinput1:['',[Validators.required,CustomValidators.languageCheck('')]],
      // titleinput2:['',[Validators.required,CustomValidators.languageCheck('')]],
      Englishinput: [],
      Englishinput1: [],
      Englishinput2: [],
      titleinput: ['', [CustomValidators.languageCheck('')]],
      tinput1: ['', [CustomValidators.languageCheck('')]],
      titleinput2: ['', [CustomValidators.languageCheck('')]],
      docnoinput: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.maxLength(10)]],
      // docnoinput:['',[Validators.required, Validators.maxLength(10),Validators.minLength(5)]],
      sponserinput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      professionofres: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      Statusinput: ['', [Validators.required]],
      tinput: ['', [Validators.required]],
      genderinput: ['', [Validators.required]],
      docinput: ['', [Validators.required]],
      departmentinput: ['', [Validators.required]],
      jobinput: ['', [Validators.required]],
      hireinput: ['', [Validators.required]],
      Startdateinput: ['', [Validators.required]],
      mobileinput: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      homephoneinput: ['', [Validators.max(100000000000)]],
      salaryinput: [],
      starttimeinput: [],
      endtimeinput: [],
      days: [],
      scheduletypeinput: [],
      hierachyinput: [],
      reportinginput: [],
      doctorcode: [],
      pwd: [],
      colorinput: [],
      fromtime: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      speciatization: [],
      spearabicinput: [],
      skills: this.formBuilder.array([
        // this.addingformgroupskill()
      ]),
      //..........for basic info 2........
      laborofficeinput: ['', [Validators.maxLength(11), Validators.pattern('^[a-zA-Z0-9]+$')]],
      placeofbirthinput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      religioninput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      dateofbirthinput: [],
      emailidinput: ['', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
      accountnoinput: ['', [Validators.max(100000000000000000000), Validators.min(1000000000000000)]],
      areainput: [],
      blockinput: [],
      buildinginput: [],
      streetinput: [],
      floorinput: [],
      cityinput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      nationinput: [],
      maritalinput: [],
      jobtypeinput: [],
      positionlevelinput: [],
      salarypayableinput: [],
      banknameinput: [],
      branchnameinput: [],
      countryinput: [],

      //..........for document............
      documentypeinput: [],
      numberinput: ['', [Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      uploaddocinput: [],
      dateofissueinput: [],
      expiredateinput: [],
      degreeinput: [],
      universityinput: [],
      gpainput: ['', [Validators.max(10000)]],
      dateofgraduationinput: [],
      degreecertificateinput: [],
      nameofcourseinput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      placeofissueinput: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
      startdate_input: [],
      enddateinput: [],
      coursecertificateinput: [],
      // adddocname:[],
      // addenddateinput:[],
      // choosefileinput:[],
      docadd: this.formBuilder.array([
        // this.addingdoc()
      ]),

      //........for health insurace.....
      socialsecurityinput: ['', [Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      dateofreginput: [],
      placeofreginput: [],
      issueddateinput: [],
      expirydateinput: [],
      insurancenoinput: ['', [Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      insurancecopyinput: [],
      healthinsuranceinput: [],
      healthincompanyinput: [],
      insurancetypeinput: [],
      //......for vehicle....

      modelyearinput: ['', [Validators.max(10000)]],
      makeinput: [],
      modelinput: [],
      vinnoinput: ['', [Validators.maxLength(13), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      milesinput: [],
      platenoinput: ['', [Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      licencenoinput: ['', [Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      licenceexdateinput: [],
      licenceattachementinput: [],
      plicynoinput: ['', [Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      exdateinput: [],
      insuranceattachmentinput: [],
      assigndateinput: [],
      returndateinput: [],
      notesinput: [],
      insurancecomptinput: []

    });

    this.patient.valueChanges.subscribe((data) => {
      // console.log(data)
      this.fromsubmit = false;
      this.checkValidationErrors(this.patient);
    });
    this.patient.patchValue({
      countryinput: this.country
    })

  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }
  checkValidationErrors(group: FormGroup = this.patient): void {
    // console.log("entered.....");
    Object.keys(group.controls).forEach((key: string) => {

      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // console.log(abstractControl);
      // console.log(this.langulagetype);
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        console.log(abstractControl)
        console.log(abstractControl.valid)
        console.log(abstractControl.touched)
        console.log(abstractControl.dirty)
        console.log(abstractControl.pristine)
        console.log(this.patient);
        if (!abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
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

  dayssession() {
    //...........for days wise.........
    this.myForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
      // total_amount: [null, Validators.required]
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
      //................To remove daywise&sessionwise If these fields exist ...............
      var even = function (ele) {
        console.log(ele)
        return ele.checkbox_value == true;
      }
      console.log(this.totaldays.some(even));
      if (this.totaldays.some(even) == true) {
        console.log(this.schedule.includes("Day Wise"))
        if (this.schedule.includes("Day Wise") == false) {
          this.schedule.push(this.patient.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Day Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      console.log(this.schedule)
      ////////////////////////////////////////////////////////

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
      console.log(this.sessiontotaldays);
      for (let j = 0; j < this.sessiontotaldays.length; j++) {
        console.log("session entered....");
        if (this.sessiontotaldays[j].checkbox_value == true && this.totaldays[j].checkbox_value == true) {
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
          const control = this.mysessionForm.get(['sessionrows', j, 'checkbox_value']);
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
      ////...............To remove daywise&sessionwise If these fields exist..................
      var element = function (ele) {
        console.log(ele)
        return ele.checkbox_value == true;
      }
      console.log(this.sessiontotaldays.some(element));
      if (this.sessiontotaldays.some(element) == true) {
        if (this.schedule.includes("Session Wise") == false) {
          this.schedule.push(this.patient.value.scheduletypeinput);
        }
      } else {
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i] == 'Session Wise') {
            this.schedule.splice(i, 1);
          }
        }
      }
      console.log(this.schedule)
      ///////////////////////////////////////

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


        }
        else {
          console.log("ented session....");
          console.log(this.mysessionForm);
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
      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true && this.sessiontotaldays[i].checkbox_value == true) {
          alert("Please Uncheck Selected day in another field.");
          console.log("Please Uncheck Selected day in another field.");
          console.log("selected here. .");

          var index = i
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
          $(".sessioninput").eq(i).prop("checked", false);

          const control = this.mysessionForm.get(['sessionrows', i, 'checkbox_value']);
          control.setValue(null);

          console.log(values);
          console.log(this.mysessionForm);

          return false;
        }


      }



    })

  }
  checkboxchange(row, value, indx) {
    console.log("checkbox changed. .");
    console.log(row);
    console.log(value);
    console.log(indx);
    console.log(JSON.stringify(this.totaldays));
    console.log(JSON.stringify(this.checkbox_validation));
    console.log(this.checkbox_validation.length);
    //......................based on clinic timings....................
    this.checkclinictimings(value, 'daywise');

    //................clinic timings end...........................


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
          console.log(this.checkbox_validation);
          console.log(this.totaldays[this.previous_checkbox_value]);
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
      console.log(this.checkbox_validation);
    }
  }
  checkclinictimings(val, typewise) {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/check_clinictimings"

    let body = {
      "sno": "",
      "clinicid": this.userid,
      "branchid": "",
      "day": val,
      "S1_start": "",
      "S1_end": "",
      "s2_start": "",
      "s2_end": "",
      "condition": "Checkday"
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
        // this.isPageloaderVisible=false;
        if (res.status_cd == 1) {
          console.log(res.data.Table[0].Result);
          if (res.data.Table[0].Result == "False") {
            alert(val + " is not exists.");
            console.log(this.totaldays);
            if (typewise == 'daywise') {
              for (let i = 0; i < this.totaldays.length; i++) {
                if (this.totaldays[i].checkbox_value == true) {
                  if (this.totaldays[i].day == val) {
                    const control = this.myForm.get(['rows', i, 'checkbox_value']);
                    control.setValue(null);
                    this.checkbox_validation = [];
                    this.previous_checkbox_value = [];

                  }
                }
              }
            }
            if (typewise == 'sessionwise') {
              for (let i = 0; i < this.sessiontotaldays.length; i++) {
                if (this.sessiontotaldays[i].checkbox_value == true) {
                  if (this.sessiontotaldays[i].day == val) {
                    const control = this.mysessionForm.get(['sessionrows', i, 'checkbox_value']);
                    control.setValue(null);
                    this.checkbox_validation = [];
                    this.previous_checkbox_value = [];

                  }
                }
              }
            }
          }
          else {
            // this.isPageloaderVisible=false;
            console.log(val + " is exist");
          }

        }
      },
        err => {
          // this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
  }
  // err=>{
  //  // this.isPageloaderVisible=false;
  // console.log("Token Error:"+err);
  //  }

  // );
  //}
  //......................... checking timings based on clinic timings in day wise.........
  daywisestarttimechange(index) {
    this.ampmIndex = index
    console.log(index)
    console.log("am pm change entered....")
    console.log(this.ampmIndex);
    console.log(this.myForm)
    var exactIndexValue = this.myForm.controls.rows.value[this.ampmIndex]
    this.chkday = exactIndexValue.day;
    this.chkfrmtime = exactIndexValue.fromtime + ' ' + exactIndexValue.titleinput;
    // this.chktotime=exactIndexValue.totime + ' ' + exactIndexValue.titleinput1;
    this.chktotime = "";
    this.session2start = "";
    this.session2end = "";

    console.log(this.chkday);
    console.log(this.chkfrmtime);
    console.log(this.chktotime);
    //this.servicetochecktimings(index, 'daywise');
  }
  daywiseendtimechange(index) {
    var exactIndexValue = this.myForm.controls.rows.value[index]
    this.dayname = exactIndexValue.day;
    this.s1start = exactIndexValue.fromtime + ' ' + exactIndexValue.titleinput;
    this.s1end = exactIndexValue.totime + ' ' + exactIndexValue.titleinput1;
     //this.betweenservice(index, 'daywise')
  }
  //..................checking timings based on clinic timings in session wise
  sessionwiss1starttimechange(indx) {
    console.log("entered into s1")
    var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[indx]
    console.log(exactIndexsessionValue)
    this.chkday = exactIndexsessionValue.day;
    this.chkfrmtime = exactIndexsessionValue.session1start + ' ' + exactIndexsessionValue.sessionstart1input;
    this.chktotime = "";
    this.session2start = "";
    this.session2end = "";
    console.log(this.chkday);
    console.log(this.chkfrmtime);
    console.log(this.chktotime);
    console.log(this.session2start);
    console.log(this.session2end);
   // //this.servicetochecktimings(indx, 'sessionwisestart1');
  }
  sessionwiss1endtimechange(indx) {
    var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[indx]
    this.dayname = exactIndexsessionValue.day;
    this.s1start = exactIndexsessionValue.session1start + ' ' + exactIndexsessionValue.sessionstart1input;
    this.s1end = exactIndexsessionValue.session1end + ' ' + exactIndexsessionValue.sessionend1input;
   //  //this.betweenservice(indx, 'session1end')

  }
  sessionwiss2starttimechange(indx) {
    console.log("entered into s1")
    var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[indx]
    console.log(exactIndexsessionValue)
    this.chkday = exactIndexsessionValue.day;
    this.chkfrmtime = exactIndexsessionValue.session2start + ' ' + exactIndexsessionValue.sessionstart2input;
    this.chktotime = "";
    this.session2start = "";
    this.session2end = "";
    console.log(this.chkday);
    console.log(this.chkfrmtime);
    console.log(this.chktotime);
    console.log(this.session2start);
    console.log(this.session2end);
   // //this.servicetochecktimings(indx, 'sessionwisestart2');
  }
  sessionwiss2endtimechange(indx) {
    var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[indx]
    this.dayname = exactIndexsessionValue.day;
    this.s1start = exactIndexsessionValue.session2start + ' ' + exactIndexsessionValue.sessionstart2input;
    this.s1end = exactIndexsessionValue.session2end + ' ' + exactIndexsessionValue.sessionend2input;
   //  //this.betweenservice(indx, 'session2end')

  }

  // servicetochecktimings(index, type) {
  //   var accessToken = window.localStorage.Tokenval
  //   let url = this.commonService.commonUrl + "Account/check_clinictimings"

  //   let body = {
  //     "sno": "",
  //     "clinicid": this.userid,
  //     "branchid": "",
  //     "day": this.chkday,
  //     "S1_start": this.chkfrmtime,
  //     "S1_end": this.chktotime,
  //     "s2_start": this.session2start,
  //     "s2_end": this.session2end,
  //     "condition": "checkstarttime1"
  //   }
  //   console.log("checkclinic url..." + JSON.stringify(body));
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   this.http.post(url, body, options)
  //     .map(res => res.json()).subscribe(res => {
  //       // this.isPageloaderVisible=false;
  //       if (res.status_cd == 1) {
  //         console.log(res.data.Table[0]);
  //         if (res.data.Table[0].Result == "False") {
  //           // alert("Please choose timings in between " + res.data.Table[0].validtime);
  //           if (type == "daywise") {
  //             const control = this.myForm.get(['rows', index, 'fromtime']);
  //             control.setValue(null);
  //             const control2 = this.myForm.get(['rows', index, 'titleinput']);
  //             control2.setValue(null);
  //           }
  //           if (type == "sessionwisestart1") {
  //             const controls1t = this.mysessionForm.get(['sessionrows', index, 'session1start']);
  //             controls1t.setValue(null);
  //             const controls1a = this.mysessionForm.get(['sessionrows', index, 'sessionstart1input']);
  //             controls1a.setValue(null);

  //           }
  //           if (type == "sessionwisestart2") {
  //             const controls2t = this.mysessionForm.get(['sessionrows', index, 'session2start']);
  //             controls2t.setValue(null);
  //             const controls2a = this.mysessionForm.get(['sessionrows', index, 'sessionstart2input']);
  //             controls2a.setValue(null);
  //           }

  //         }
  //         else { }
  //       }
  //       else {
  //         // this.isPageloaderVisible=false;
  //       }

  //     },
  //       err => {
  //         // this.isPageloaderVisible=false;
  //         console.log("ERROR!: ", err);
  //       });
  //   // },
  //   // err=>{
  //   //  // this.isPageloaderVisible=false;
  //   // console.log("Token Error:"+err);
  //   //  }

  //   // );

  // }
  // betweenservice(index, type) {
  //   var accessToken = window.localStorage.Tokenval
  //   let url = this.commonService.commonUrl + "Account/check_clinictimings"

  //   let body = {
  //     "sno": "",
  //     "clinicid": this.userid,
  //     "branchid": "",
  //     "day": this.dayname,
  //     "S1_start": this.s1start,
  //     "S1_end": this.s1end,
  //     "s2_start": "",
  //     "s2_end": "",
  //     "condition": "checkbetweentimeNew"
  //   }
  //   console.log("checkclinic url..." + JSON.stringify(body));
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   this.http.post(url, body, options)
  //     .map(res => res.json()).subscribe(res => {
  //       // this.isPageloaderVisible=false;
  //       if (res.status_cd == 1) {
  //         console.log(res.data.Table[0]);
  //         if (res.data.Table[0].Result == "False") {
  //           // alert("Please choose timings in between " + res.data.Table[0].validtime);
  //           if (type == "daywise") {
  //             const control3 = this.myForm.get(['rows', index, 'totime']);
  //             control3.setValue(null);
  //             const control4 = this.myForm.get(['rows', index, 'titleinput1']);
  //             control4.setValue(null);
  //           }
  //           if (type == "session1end") {
  //             const controls1et = this.mysessionForm.get(['sessionrows', index, 'session1end']);
  //             controls1et.setValue(null);
  //             const controls1ea = this.mysessionForm.get(['sessionrows', index, 'sessionend1input']);
  //             controls1ea.setValue(null);
  //           }
  //           if (type == "session2end") {
  //             const controls2et = this.mysessionForm.get(['sessionrows', index, 'session2end']);
  //             controls2et.setValue(null);
  //             const controls2ea = this.mysessionForm.get(['sessionrows', index, 'sessionend2input']);
  //             controls2ea.setValue(null);
  //           }


  //         }
  //         else { }
  //       }
  //       else {
  //         // this.isPageloaderVisible=false;
  //       }

  //     },
  //       err => {
  //         // this.isPageloaderVisible=false;
  //         console.log("ERROR!: ", err);
  //       });


  // }

  checkboxsessionchange(row, value, indx) {

    console.log(row);
    console.log(value);
    console.log(indx);
    //.................checking day based on clinic timings........
    this.checkclinictimings(value, 'sessionwise');
    //..........end...............
    console.log(this.checkboxsession_validation);
    console.log(this.checkboxsession_validation.length);
    // if(this.value_M1 == true){
    // this.checkboxsession_validation.length=this.checkboxsession_validation.length+1
    // }
    console.log(this.checkboxsession_validation.length)
    if (this.checkboxsession_validation.length != 0) {
      console.log(JSON.stringify(this.checkboxsession_validation));
      console.log(this.checkboxsession_validation[0].day);
      console.log(value);
      if (value == this.checkboxsession_validation[0].day) {
        console.log("entered into same value")
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
        console.log(this.mysessionForm.get(['sessionrows']))

      }
      else {
        console.log(this.checkboxsession_validation[0].checkbox_value)
        console.log(this.checkboxsession_validation[0].session1start);
        console.log(this.checkboxsession_validation[0].session1end);
        console.log(this.checkboxsession_validation[0].session2start);
        console.log(this.checkboxsession_validation[0].session2end);

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
            || (this.checkboxsession_validation[0].session2end == null) || (this.checkboxsession_validation[0].sessionend2input == null ||
              this.checkboxsession_validation[0].session1start == "") || (this.checkboxsession_validation[0].sessionstart1input == "")
            || (this.checkboxsession_validation[0].session1end == "") || (this.checkboxsession_validation[0].sessionend1input == "")
            || (this.checkboxsession_validation[0].session2start == "") || (this.checkboxsession_validation[0].sessionstart2input == "")
            || (this.checkboxsession_validation[0].session2end == "") || (this.checkboxsession_validation[0].sessionend2input == "")) {


            alert("Please Enter Timings for " + this.checkboxsession_validation[0].day);
            const control = this.mysessionForm.get(["sessionrows", indx, "checkbox_value"]);
            control.setValue(null);
            console.log(this.checkboxsession_validation)

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
      console.log("else entered.......")


      this.checkboxsession_validation.push(this.sessiontotaldays[indx]);
      console.log(this.checkboxsession_validation);
      this.previoussession_checkbox_value.push(indx);
      console.log(this.checkboxsession_validation);

      // for(let i=0;i< this.sessiontotaldays.length;i++){
      //   if((this.checkboxsession_validation[0].day != this.sessiontotaldays[i].day)
      //   && (this.sessiontotaldays[i].checkbox_value == true)){
      //     console.log(this.sessiontotaldays[i])
      //   if(this.sessiontotaldays[i].session1start == ""||this.sessiontotaldays[i].session1end == "" ||
      //   this.sessiontotaldays[i].session2start == ""||this.sessiontotaldays[i].session2end == "" ||
      //   this.sessiontotaldays[i].session1start == null ||this.sessiontotaldays[i].session1end == null ||
      //   this.sessiontotaldays[i].session2start == null ||this.sessiontotaldays[i].session2end == null){
      //   alert('please enter timings for'+this.sessiontotaldays[i].day)
      //  // this.value_M1=true;
      //   for(let j=0;j<this.sessiontotaldays.length;j++){
      //   console.log("same day")
      //   if((this.checkboxsession_validation[0].day == this.sessiontotaldays[j].day)
      //   && (this.sessiontotaldays[j].checkbox_value == true)){
      //   const control = this.mysessionForm.get(["sessionrows", j, "checkbox_value"]);
      //   console.log(control)
      //   control.setValue(null);
      //   console.log(this.checkboxsession_validation);
      //  // this.checkboxsession_validation =[];
      //   }
      //   }
      //   }
      //   }
      //   }
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
      this.patient.patchValue({
        totime: ""
      })
      return false;
    } else {
      console.log("entered else");
    }
  }

  fromtimechange() {
    console.log(this.patient.value.fromtime);
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].fromtime.split(":")[0].length < 2) {
        const control3 = this.myForm.get(['rows', i, 'fromtime']);
        console.log("if here. .");
        console.log(". . .." + control3.value);
        let tempo1 = control3.value;
        let tempo2 = "0" + tempo1;
        control3.setValue(tempo2);
        console.log(control3);
      }
      if ((this.totaldays[i].fromtime.split(":")[0].length == 2)) {
        const control4 = this.myForm.get(['rows', i, 'fromtime']);
        console.log(". . .." + control4.value);
        let tempo7 = control4.value;
        // let tempo8 = tempo7 + "00";
        control4.setValue(tempo7);
        console.log(control4);
      }
      if (this.totaldays[i].checkbox_value == true) {
        console.log(this.totaldays[i].fromtime);
        if (this.totaldays[i].fromtime.split(":")[1] == undefined) {
          const control1 = this.myForm.get(['rows', i, 'fromtime']);
          console.log(". . .." + control1.value);
          let tempo1 = control1.value;
          let tempo2 = tempo1 + ":00";
          control1.setValue(tempo2);
          console.log(control1);
        }
        if (this.totaldays[i].totime.split(":")[0].length < 2) {
          const control5 = this.myForm.get(['rows', i, 'totime']);
          console.log("if here. .");
          console.log(". . .." + control5.value);
          let tempo1 = control5.value;
          let tempo2 = "0" + tempo1;
          control5.setValue(tempo2);
          console.log(control5);
        }
        if ((this.totaldays[i].totime.split(":")[0].length == 2)) {
          const control6 = this.myForm.get(['rows', i, 'totime']);
          console.log(". . .." + control6.value);
          let tempo7 = control6.value;
          // let tempo8 = tempo7 + "00";
          control6.setValue(tempo7);
          console.log(control6);
        }
        if (this.totaldays[i].totime.split(":")[1] == undefined) {
          const control2 = this.myForm.get(['rows', i, 'totime']);
          console.log(". . .." + control2.value);
          let tempo3 = control2.value;
          let tempo4 = tempo3 + ":00"
          control2.setValue(tempo4);
          console.log(control2);
        }
      }
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
        this.patient.patchValue({
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
        this.patient.patchValue({
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
        this.patient.patchValue({
          session2end: ""
        })
        return false;
      }
      else {
        console.log("entered else");
      }
    }
  }
  sessionclick(clickname) {
    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
        //console.log(this.sessiontotaldays[i]);
        if (clickname == 's1start') {
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
        }
        if (clickname == 's1end') {
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
        }
        if (clickname == 's2start') {
          console.log("entered into s2start......" + this.sessiontotaldays[i].session2start)
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
        }
        if (clickname == 's2end') {
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
  getdepartments() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    // this.isPageloaderVisible=true;
    var accessToken = window.localStorage.Tokenval
    let getdepartmentsurl = this.commonService.commonUrl + "Account/Departments_Details"
    let body = {
      "sno": "",
      "clinicid": this.userid,
      "BranchID": "",
      "DeptID": "",
      "DeptName": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_update": "",
      "Condition": "GetDataDropdown"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(getdepartmentsurl, body, options)
      .map(res => res.json()).subscribe(res => {

        if (res.status_cd == 1) {
          console.log(res)
          this.departments = res.data.Table;
          // console.log("department ..."+JSON.stringify(this.departments));
        }



      },
        err => {

          console.log("ERROR!: ", err);
        });
    // },
    // err=>{

    // console.log("Token Error:"+err);
    // }

    // );

  }

  getspecializations() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    // this.isPageloaderVisible=true;
    var accessToken = window.localStorage.Tokenval
    let getdepartmentsurl = this.commonService.commonUrl + "Account/Departments_Details"
    let body = {
      "Sno": "",
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
    this.http.post(getdepartmentsurl, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == 1) {
          console.log(res)
          this.listofspecialization = res.data.Table;
          // console.log("department ..."+JSON.stringify(this.departments));
        }



      },
        err => {

          console.log("ERROR!: ", err);
        });
    // },
    // err=>{

    // console.log("Token Error:"+err);
    // }

    // );

  }
  getbanknames() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    // this.isPageloaderVisible=true;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Bank_Master_Details"
    let body = {
      "Sno": "",
      "Clinic_ID": this.userid,
      "Branchid": "",
      "Bank_ID": "",
      "Bank_Name": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_Updated": "",
      "Condition": "GetDropdown"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.banknames = res.data.Table;
          this.getbranchnames();
          // console.log("banknames url..."+JSON.stringify(this.banknames));
        }



      },
        err => {

          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    // console.log("Token Error:"+err);
    // }

    // );

  }
  getbranchnames() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Bank_Branch_Master_Details"
    let body = {
      "Sno": "",
      "Clinic_ID": this.userid,
      "Branchid": "",
      "Bank_ID": this.patient.value.banknameinput,
      "Bank_Branch_ID": "",
      "Bank_Branch_Name": "",
      "Swift_Code": "",
      "Country": "",
      "City": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_Updated": "",
      "Condition": "getBranchdataBybankname"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.branchnames = res.data.Table;
          //console.log("banknames url..."+JSON.stringify(this.banknames));
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }

  getdocumenttypes() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval
    let docurl = this.commonService.commonUrl + "Account/Getdata_By_Id"
    let body = {
      "operation": "Documents",
      "value": "",
      "uid": this.userid
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(docurl, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.documenttypes = res.data.Table;
        }
      },
        err => {
          console.log("ERROR!: ", err);
        });
  }
  getcountries() {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval
    let countriesurl = this.commonService.commonUrl + "Account/Get_Countries"
    let body = {

    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(countriesurl, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.countries = res.data.Table;
          // console.log("countries url..."+JSON.stringify(this.countries));
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }

  getjobtitles_reporting() {
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Role_Operations"
    let body = {
      "clinicid": this.userid,
      "branchid": "",
      "loginid": "",
      "RoleId": "",
      "RoleName": "",
      "Status": "",
      "Organisation_ID": "",
      "OperationType": "GetExistroles"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.jobtitles = res.data.Table;
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }

  gethelthinsurancecat() {
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Insurance_transactions"
    let body = {
      "sno": "",
      "Insurance_Category": "",
      "Insurance_CompanyID": "",
      "Insurance_CompanyName": "",
      "Insurance_PhoneNo": "",
      "Insurance_EmailID": "",
      "Insurance_Type": "",
      "Trans_date": "",
      "LoginId": "",
      "clinicid": this.userid,
      "status": "",
      "Condition": "GetIns_dropdown",
      "BranchId": "",
      "pagecount": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.healthinsurance = res.data.Table;
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }
  gethealthinscompanynames() {
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Insurance_transactions"
    let body = {
      "sno": "",
      "Insurance_Category": "",
      "Insurance_CompanyID": "",
      "Insurance_CompanyName": "",
      "Insurance_PhoneNo": "",
      "Insurance_EmailID": "",
      "Insurance_Type": "",
      "Trans_date": "",
      "LoginId": "",
      "clinicid": this.userid,
      "status": "",
      "Condition": "GetInsName",
      "BranchId": "",
      "pagecount": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          this.hicompanyname = res.data.Table;
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }

  reportingtochange(val) {
    this.reportingname = val;
    console.log("reporting to ...." + this.reportingname);
    this.getheirarchy();
  }

  getheirarchy() {
    this.hierarchy = [];
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/DocTreatment_Transactions"
    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": this.reportingname,
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "getHirerachy",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        if (res.status_cd == 1) {
          console.log(res)
          console.log(res.data.Table)
          this.hierarchy = res.data.Table;
        }
      },
        err => {

          console.log("ERROR!: ", err);
        });
  }


  get f() {
    return this.patient.controls;
  }

  //...............health insurance clicks........
  healthinsurancechange(val) {
    this.healthinsurace = val;
    console.log("healthinsurace..." + this.healthinsurace);
  }
  hicompanychange(val) {
    this.hicompany = val;
    console.log("hicompany..." + this.hicompany);
  }
  insurancetypechange(val) {
    this.hiinsurancetype = val;
    console.log("hiinsurancetype..." + this.hiinsurancetype);
  }
  //............vehicle click.........

  fromkey(val) {
    let timepattern = /[0-9\:]/
    let inputChar = String.fromCharCode(val.charCode);
    if (!timepattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fromenter(val, key, index, timetype) {
    console.log("keycode..." + key);
    if (val.target.value.length < 3) {
      console.log("entered..." + val.target.value);
      if (val.target.value == ":") {
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(1) == ":") {
        console.log("entered 2...");
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
      console.log("entered..." + val.target.value);

      if ((val.target.value).charAt(3) == ":") {
        console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if ((val.target.value).charAt(4) == ":") {
        console.log("entered 2...");
        val.target.value = val.target.value.slice(0, -1);
      }
      if (((val.target.value).charAt(3) + (val.target.value).charAt(4)) > 59) {
        alert("Please enter valid min");
        val.target.value = val.target.value.slice(0, -2);
      }

    }
    if (key == 8) {
      val.target.value = val.target.value.slice(0, -1);
      console.log("final valueee.." + val.target.value);
    }
    if (val.target.value.length > 5) {
      val.target.value = val.target.value.slice(0, -1);
    }
    if (val.target.value.length > 3) {
      if (timetype == 'fromtime') {
        var exactIndexValue = this.myForm.controls.rows.value[index]
        this.dayname = exactIndexValue.day;
        var amorpm = exactIndexValue.titleinput;

        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {

        }
        else {
          console.log("entered.......")
          this.chkfrmtime = exactIndexValue.fromtime + ' ' + exactIndexValue.titleinput;

          this.chktotime = "";
          this.session2start = "";
          this.session2end = "";
          //this.servicetochecktimings(index, 'daywise');
        }
      }
      if (timetype == 'totime') {
        var exactIndexValue = this.myForm.controls.rows.value[index]
        this.dayname = exactIndexValue.day;
        var amorpm = exactIndexValue.titleinput1;
        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {
        }
        else {
          this.s1start = exactIndexValue.fromtime + ' ' + exactIndexValue.titleinput;
          this.s1end = exactIndexValue.totime + ' ' + exactIndexValue.titleinput1;
           //this.betweenservice(index, 'daywise')
        }
      }
      if (timetype == 's1start') {
        var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[index]
        this.chkday = exactIndexsessionValue.day;
        var amorpm = exactIndexsessionValue.sessionstart1input;
        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {
        }
        else {
          this.chkfrmtime = exactIndexsessionValue.session1start + ' ' + exactIndexsessionValue.sessionstart1input;
          this.chktotime = "";
          this.session2start = "";
          this.session2end = "";
          //this.servicetochecktimings(index, 'sessionwisestart1');
        }
      }
      if (timetype == 's1end') {
        var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[index]
        this.dayname = exactIndexsessionValue.day;
        var amorpm = exactIndexsessionValue.sessionend1input;
        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {
        }
        else {
          this.s1start = exactIndexsessionValue.session1start + ' ' + exactIndexsessionValue.sessionstart1input;
          this.s1end = exactIndexsessionValue.session1end + ' ' + exactIndexsessionValue.sessionend1input;
           //this.betweenservice(index, 'session1end')
        }
      }
      if (timetype == 's2start') {
        var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[index]
        this.chkday = exactIndexsessionValue.day;
        var amorpm = exactIndexsessionValue.sessionstart2input;
        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {
        }
        else {
          this.chkfrmtime = exactIndexsessionValue.session2start + ' ' + exactIndexsessionValue.sessionstart2input;
          this.chktotime = "";
          this.session2start = "";
          this.session2end = "";
          //this.servicetochecktimings(index, 'sessionwisestart2');
        }
      }
      if (timetype == 's2end') {
        var exactIndexsessionValue = this.mysessionForm.controls.sessionrows.value[index]
        this.dayname = exactIndexsessionValue.day;
        var amorpm = exactIndexsessionValue.sessionend2input;
        console.log(val.target.value + " " + amorpm);
        if ((amorpm == "") || (amorpm == null) || (amorpm == null)) {
        }
        else {
          this.s1start = exactIndexsessionValue.session2start + ' ' + exactIndexsessionValue.sessionstart2input;
          this.s1end = exactIndexsessionValue.session2end + ' ' + exactIndexsessionValue.sessionend2input;
           //this.betweenservice(index, 'session2end')
        }
      }
    }
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


  checkmobileexist() {
    if (this.patient.value.mobileinput != "") {
      // this.commonService.tokenFun().subscribe(tokenResult =>{
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
      var accessToken = window.localStorage.Tokenval
      let getdepartmentsurl = this.commonService.commonUrl + "Account/user_transactions"
      let body =
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
        "Mobile": this.patient.value.mobileinput,
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
      console.log(body)
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(getdepartmentsurl, body, options)
        .map(res => res.json()).subscribe(res => {
          console.log(res);
          if (res.data.Table[0].Result == "True") {
            console.log("entered.......");
            alert("Mobile No Already Exist.");
            this.patient.value.mobileinput = "";
            return false;
            //console.log("department url..."+JSON.stringify(this.departments));
          }
          else {

          }
        },
          err => {

            console.log("ERROR!: ", err);
          });
      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }

      // );
    }

  }
  jobtitlechange(val) {
    console.log("jobtitle name......" + val);
    if (val == "Doctor" || val == "Resident doctor" || val == "Emergency doctor") {
      this.jobtitlename = val;
      this.colorhide = false;
      this.specializationrowhide = false;
    }
    // else if(val == "Nurse"){
    //   this.specializationrowhide=false;
    //   this.colorhide=true;
    // }
    else {
      this.colorhide = true;
      this.specializationrowhide = true;
    }
  }

  startdatechange() {
    this.hiredat = this.patient.value.hireinput;
    this.startdate = this.patient.value.Startdateinput;
    this.hiredat = this.datePipe.transform(this.hiredat, 'yyyy-MM-dd');
    this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');
    if (this.startdate < this.hiredat) {
      alert("Please choose valid date.");
      this.patient.patchValue({
        Startdateinput: ""
      })
    }
  }


  bsic1save() {
    // this.getDataDays('');
    this.info1common();
    //this.getDataDays('fromsave');
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
      this.checkmobileexist();
    }
    else {
      this.allCheckedDays = [];
      this.allCheckedStartTimings = [];
      this.allCheckedEndTimings = [];
      this.allCheckeds2StartTimings = [];
      this.allCheckeds2EndTimings = [];
      this.getDataDays('fromsave');
      // if(this.patient.value.scheduletypeinput == "Day Wise"){
      //   this.getDataDays('fromsave');
      // }
      // else{
      //   this.getsessiondata('fromsave');
      // } 
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
    console.log("entered into submit...");
    console.log(this.patient.invalid);

    this.info1common();
    //this.getDataDays();
    // this.getDataDays('fromsubmit');

    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
      this.checkmobileexist();
    }
    else {
      this.getDataDays('fromsubmit');
    }

  }
  info1common() {
    this.makeid(6);
    this.arabicenglishhandling();
    if (this.patient.value.jobinput == "Doctor") {
      if (this.colorcode == "" || this.colorcode == undefined || this.colorcode == null) {
        this.colorchoose = true;
      }
      if (this.patient.value.speciatization == "" || this.patient.value.speciatization == undefined || this.patient.value.speciatization == null) {
        this.engspecialization = true;
      }
      if (this.patient.value.spearabicinput == "" || this.patient.value.spearabicinput == undefined || this.patient.value.spearabicinput == null) {
        this.arbspecialization = true;
      }
    }
    // else if(this.patient.value.jobinput == "Nurse"){
    //   if(this.patient.value.speciatization == "" || this.patient.value.speciatization==undefined || this.patient.value.speciatization==null){
    //     this.engspecialization=true;
    //   }
    //   if(this.patient.value.spearabicinput == "" || this.patient.value.spearabicinput==undefined || this.patient.value.spearabicinput==null){
    //     this.arbspecialization=true;
    //   }
    // }

    else {
      this.colorcode = "";
      this.patient.value.speciatization = "";
      this.patient.value.spearabicinput = "";
    }
    if (this.patient.value.professionofres == null) {
      this.patient.value.professionofres = " ";
    }
    if (this.patient.value.sponserinput == null) {
      this.patient.value.sponserinput = "";
    }
    if (this.patient.value.reportinginput == null) {
      this.patient.value.reportinginput = "";
    }
    if (this.patient.value.hierachyinput == null) {
      this.patient.value.hierachyinput = "";
    }
    if (this.patient.value.hireinput == "") {

    } else {
      this.hiredat = this.patient.value.hireinput;
      this.hiredat = this.datePipe.transform(this.hiredat, 'yyyy-MM-dd');
      let res = this.hiredat.split("-")[0];
      let res1 = this.hiredat.split("-")[1];
      let res2 = this.hiredat.split("-")[2];
      this.hiredatefor = res2 + "/" + res1 + "/" + res;
    }
    if (this.patient.value.Startdateinput == "") {

    } else {
      this.startdate = this.patient.value.Startdateinput;
      this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');
      console.log("hire date..." + this.hiredat + "start date...." + this.startdate);
      let res3 = this.startdate.split("-")[0];
      let res4 = this.startdate.split("-")[1];
      let res5 = this.startdate.split("-")[2];
      this.startdatefor = res5 + "/" + res4 + "/" + res3;
    }
    console.log("hiredate format...." + this.hiredatefor);
    console.log("startdatefor format...." + this.startdatefor);

    if (this.patient.value.salaryinput == null) {
      this.patient.value.salaryinput = " ";
    }
    if (this.patient.value.scheduletypeinput == null) {
      this.patient.value.scheduletypeinput = " ";
    }

    if (this.patient.value.salaryinput == undefined) {
      this.patient.value.salaryinput = ""
    }
    if (this.jobtitlename == "Doctor") {
      this.doccode = this.patient.value.Englishinput + ' ' + this.patient.value.Englishinput2 + '/' + this.patient.value.mobileinput
    }
    else {
      this.doccode = "";
    }
    console.log("doc code " + this.doccode);
  }
  arabicenglishhandling() {
    //..................arabic and englishnames handlings...................
    this.engarray = [];
    this.arabicarray = [];

    console.log(this.patient.value.Englishinput !== null)
    console.log(this.patient.value.Englishinput !== '')
    if (this.patient.value.Englishinput === null) {
      this.patient.value.Englishinput = ''
    }
    if (this.patient.value.Englishinput != "") {
      this.engarray.push(this.patient.value.Englishinput);
      console.log(this.engarray)
    }

    if (this.patient.value.Englishinput1 === null) {
      this.patient.value.Englishinput1 = ''
    }
    if (this.patient.value.Englishinput1 != "") {
      this.engarray.push(this.patient.value.Englishinput1);
    }
    if (this.patient.value.Englishinput2 === null) {
      this.patient.value.Englishinput2 = ''
    }
    if (this.patient.value.Englishinput2 != "") {
      this.engarray.push(this.patient.value.Englishinput2);
    }
    //........................................................
    if (this.patient.value.titleinput === null) {
      this.patient.value.titleinput = ''
    }
    if (this.patient.value.titleinput != "") {
      this.arabicarray.push(this.patient.value.titleinput)
    }
    if (this.patient.value.tinput1 === null) {
      this.patient.value.tinput1 = ''
    }
    if (this.patient.value.tinput1 != "") {
      this.arabicarray.push(this.patient.value.tinput1)
    }
    if (this.patient.value.titleinput2 === null) {
      this.patient.value.titleinput2 = ''
    }
    if (this.patient.value.titleinput2 != "") {
      this.arabicarray.push(this.patient.value.titleinput2)
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
  //................do not allow to enter englishnames for arabic...........
  arabic(event) {
    var arregex = /[\u0600-\u06FF]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!arregex.test(inputChar)) {
      alert("Please Enter Arabic Letters")
      event.preventDefault();
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
        console.log(individualStartTime.value + " " + individualStartMeridian.value)
        console.log(individualEndTime.value + " " + individualEndMeridian.value)
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
    this.info1commonservice(val, this.allCheckedDays.toString(), this.allCheckedStartTimings.toString(), this.allCheckedEndTimings.toString(), this.allCheckeds2StartTimings.toString(), this.allCheckeds2EndTimings.toString());

  }
  changeColor() {
    this.colorcode = this.patient.value.colorinput;
    this.colorchoose = false;

  }
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numberCharatcers = '1234567890'
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // return result;
    this.randompassword = result;
    console.log("random password" + result);
  }

  eng1(evnt, val) {
    console.log(evnt.target.value);
    if (val == "engname1") {
      if ((evnt.target.value == "") && (this.patient.value.Englishinput1 == "") && (this.patient.value.Englishinput2 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname2") {
      if ((evnt.target.value == "") && (this.patient.value.Englishinput == "") && (this.patient.value.Englishinput2 == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }
    if (val == "engname3") {
      if ((evnt.target.value == "") && (this.patient.value.Englishinput1 == "") && (this.patient.value.Englishinput == "")) {
        this.engerror = true;
      }
      else {
        this.engerror = false;
      }
    }

    if ((this.patient.value.Englishinput != "") && (this.patient.value.Englishinput1 != "") && (this.patient.value.Englishinput2 != "")) {
      this.commonerror = false;
    }
    else {
      // this.commonerror=true;
    }
  }
  arb(evnt, val) {
    console.log(val)
    if (val == "arb1") {
      if ((evnt.target.value == "") && (this.patient.value.tinput1 == "") && (this.patient.value.titleinput2 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb2") {
      if ((evnt.target.value == "") && (this.patient.value.titleinput == "") && (this.patient.value.titleinput2 == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }
    if (val == "arb3") {
      if ((evnt.target.value == "") && (this.patient.value.tinput1 == "") && (this.patient.value.titleinput == "")) {
        this.arabicerror = true;
      }
      else {
        this.arabicerror = false;
      }
    }

    console.log(this.patient.value.titleinput)
    if ((this.patient.value.titleinput != "") && (this.patient.value.tinput1 != "") && (this.patient.value.titleinput2 != "")) {
      this.commonerror = false;
    }
  }


  // console.log(makeid(5));


  info1commonservice(val, days, startTime, EndTime, s2start, s2end) {
    console.log(val)
    console.log(this.patient.value.jobinput)
    console.log(this.colorcode)
    console.log(this.engerror + "..." + this.arabicerror + "..." + this.commonerror)
    if (this.engerror == true || this.arabicerror == true || this.commonerror == true) {
      return false;
    }

    if ((days == "") || (startTime == "") || (EndTime == "")) {
      alert("Please choose your timings.")
    }
    else {

      console.log("service entered....." + this.schedule);
      console.log("color code......" + this.colorcode);
      console.log("doc code......" + this.doccode);

      console.log(days)
      console.log(startTime)
      console.log(EndTime)
      console.log(s2start)
      console.log(s2end)
      console.log(this.patient.value.genderinput)
      //  this.commonService.tokenFun().subscribe(tokenResult =>{
      //  //// this.isPageloaderVisible=true;
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
      this.isPageloaderVisible = true;
      var accessToken = window.localStorage.Tokenval
      let url = this.commonService.commonUrl + "Account/user_transactions"

      let body = {
        "Clinic_ID": this.userid,
        "Branchid": this.userid,
        "Emp_Id": "",
        "Pwd": this.randompassword,
        "Title": this.patient.value.tinput,
        "First_name": this.patient.value.Englishinput,
        "Middle_name": this.patient.value.Englishinput1,
        "Last_name": this.patient.value.Englishinput2,
        "ARA_Fname": this.patient.value.titleinput,
        "ARA_Lname": this.patient.value.titleinput2,
        "ARA_FatherName": this.patient.value.tinput1,
        "Gender": this.patient.value.genderinput,
        "Marital_status": this.colorcode,
        "Identification_type": this.patient.value.docinput,
        "Identification_cardno": this.patient.value.docnoinput,
        "Identification_attach": "",
        "Expiry_date": "",
        "Nationality": "",
        "occupation": this.patient.value.hierachyinput,
        "jobtitle": this.patient.value.jobinput,
        "Department": this.patient.value.departmentinput,
        "Residence_card": this.patient.value.professionofres,
        "Hire_date": this.hiredatefor,
        "Mobile": this.patient.value.mobileinput,
        "Homeno": this.patient.value.homephoneinput,
        "start_date": this.startdatefor,
        "Salary": this.patient.value.salaryinput,
        "Sponsersname": this.patient.value.sponserinput,
        "status": this.patient.value.Statusinput,
        "schedule_type": this.schedule.toString(),
        "Loginid": this.userid,
        "days": days,
        "start_session": startTime,
        "end_session": EndTime,
        "start_session2": s2start,
        "end_session2": s2end,
        "start_session3": this.patient.value.speciatization,
        "end_session3": this.patient.value.spearabicinput,
        "param1": this.patient.value.reportinginput,
        "param2": this.doccode,
        "condition": "Insertstaff"
        //this.patient.value.hierachyinput
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
          this.isPageloaderVisible = false;
          if (res.status_cd == 1) {
            console.log(res);
            // this.employ_id=res.data.Table[0].Emp_Id;
            // this.password=res.data.Table[0].pwd;
            if (res.data.Table[0].Result == "False") {
              // alert("Mobile no already exists.")
              console.log("result false")
            }
            else {
              console.log("ur id is...." + res.data.Table[0].Emp_Id);
              alert("Inserted Successfully");
              // this.router.navigate(['/usercreate'])
              console.log("result true")
              this.empid = res.data.Table[0].Emp_Id;
              this.tabclick = true;
              this.patient.patchValue({
                pwd: this.randompassword,
                doctorcode: this.doccode
              })
              if (val == "fromsubmit") {
                this.tabs.select('basic2');
              }else if (val == "fromsave"){
                this.router.navigate(['/usercreate'])
              }
            }
          }
        },
          err => {
            this.isPageloaderVisible = false;
            console.log("ERROR!: ", err);
          });
    }
  }
  info2_previous() {
    console.log(this.totaldays)
    console.log(this.sessiontotaldays)
    this.tabs.select('basic1');
    if (this.patient.value.jobinput == "Doctor") {
      this.doctorcode_previousfields = false;
      this.previousfields = false;
    }
    else {
      this.previousfields = false;
      this.doctorcode_previousfields = true;
    }


  }
  info2save() {
    this.info2common();
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.info2savecommonservice('fromsave');
    }

  }

  ifo2submit() {
    this.info2common();
    console.log(this.patient)
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.info2savecommonservice('fromsubmit');
      // this.tabs.select('document');
    }

  }
  info2common() {
    if (this.patient.value.dateofbirthinput == null) {
      this.dateofbirthformat = "";
    } else {
      this.dateofbirth = this.patient.value.dateofbirthinput;
      this.dateofbirth = this.datePipe.transform(this.dateofbirth, 'yyyy-MM-dd');
      var res = this.dateofbirth.split('-')[0];
      var res1 = this.dateofbirth.split('-')[1];
      var res2 = this.dateofbirth.split('-')[2];
      this.dateofbirthformat = res2 + "/" + res1 + "/" + res;
    }
    //1994-01-01 00:00:00.000

    if (this.patient.value.areainput == null) {
      this.patient.value.areainput = "";
    }
    if (this.patient.value.nationinput == null) {
      this.patient.value.nationinput = "";
    }
    if (this.patient.value.maritalinput == null) {
      this.patient.value.maritalinput = "";
    }
    if (this.patient.value.jobtypeinput == null) {
      this.patient.value.jobtypeinput = "";
    }
    if (this.patient.value.positionlevelinput == null) {
      this.patient.value.positionlevelinput = "";
    }
    if (this.patient.value.salarypayableinput == null) {
      this.patient.value.salarypayableinput = "";
    }
    if (this.patient.value.banknameinput == null) {
      this.patient.value.banknameinput = "";
    }
    if (this.patient.value.branchnameinput == null) {
      this.patient.value.branchnameinput = "";
    }
    if (this.patient.value.countryinput == null) {
      this.patient.value.countryinput = "";
    }

    if (this.patient.value.blockinput == null) {
      this.patient.value.blockinput = "";
    }

    if (this.patient.value.buildinginput == null) {
      this.patient.value.buildinginput = "";
    }

    if (this.patient.value.streetinput == null) {
      this.patient.value.streetinput = "";
    }
    if (this.patient.value.floorinput == null) {
      this.patient.value.floorinput = "";
    }

    //   console.log("lobourofficeno..."+  this.lobourofficeno+"dateofbirth..."+  this.dateofbirthformat+"placeofbirth..."+  this.placeofbirth);
    //   console.log("religion..."+  this.religion+"emailid..."+  this.emailid+"accountno..."+  this.accountno);
    //   console.log("area..."+  this.area+"block..."+  this.block+"building..."+  this.building);
    //   console.log("street..."+  this.street+"floor..."+  this.floor+"city..."+  this.city);
    // console.log("nationval......."+this.nationval);
  }
  info2savecommonservice(val) {
    console.log("entered into service...." + this.empid);
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //  // this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    let getdepartmentsurl = this.commonService.commonUrl + "Account/User_basicinformation1"

    let body = {
      "Emp_Id": this.empid,
      "Labour_offno": this.patient.value.laborofficeinput,
      "DOB": this.dateofbirthformat,
      "Ara_DOB": "",
      "Place_OB": this.patient.value.placeofbirthinput,
      "Religion": this.patient.value.religioninput,
      "Nationality": this.patient.value.nationinput,
      "Marital_status": this.patient.value.maritalinput,
      "Emailid": this.patient.value.emailidinput,
      "join_type": this.patient.value.jobtypeinput,
      "position": this.patient.value.positionlevelinput,
      "paymeny_by": this.patient.value.salarypayableinput,
      "Accountno": this.patient.value.accountnoinput,
      "Address": this.patient.value.areainput,
      "Block": this.patient.value.blockinput,
      "Building": this.patient.value.buildinginput,
      "streeet": this.patient.value.streetinput,
      "floor ": this.patient.value.floorinput,
      "city": this.patient.value.cityinput,
      "country": this.patient.value.countryinput,
      "Trans_date": this.date,
      "Last_updated": this.date,
      "param1": this.patient.value.banknameinput,
      "param2": this.userid,
      "condition": "Updatebisicinfo1",
      "Branchname": this.patient.value.branchnameinput
    }
    console.log("info2 url..." + JSON.stringify(body));
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(getdepartmentsurl, body, options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible = false;
        console.log(res);

        if (res.status_cd == 1) {

          alert("Inserted Successfully.")
          if (val == "fromsubmit") {
            this.tabs.select('document');
          }else if (val == "fromsave"){
            this.router.navigate(['/usercreate'])
          }
        }

      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    //  // this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }

    // );

  }
  document_previous() {
    this.tabs.select('basic2');
  }
  documentsave() {
    this.documentcommon();
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.doccommonservice('fromsave');
    }
  }
  documentsubmit() {
    this.documentcommon();
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.doccommonservice('fromsubmit');
    }
  }
  documentcommon() {
    if (this.patient.value.documentypeinput == null) {
      this.patient.value.documentypeinput = "";
    }

    if (this.patient.value.uploaddocinput == null || this.patient.value.uploaddocinput == undefined) {
      this.patient.value.uploaddocinput = "";
    }

    if (this.patient.value.dateofissueinput == undefined) {
      console.log("dateof issue entered...");
      this.docissuedateformat = "";
    }
    else {
      this.dateofissue = this.patient.value.dateofissueinput;
      this.dateofissue = this.datePipe.transform(this.dateofissue, 'yyyy-MM-dd');
      let res = this.dateofissue.split("-")[0];
      let res1 = this.dateofissue.split("-")[1];
      let res2 = this.dateofissue.split("-")[2];
      this.docissuedateformat = res2 + "/" + res1 + "/" + res;
    }
    console.log("docissuedateformat......" + this.docissuedateformat);
    if (this.patient.value.expiredateinput == undefined) {
      this.docexpiredateformat = "";
    }
    else {
      this.expiredate = this.patient.value.expiredateinput;
      this.expiredate = this.datePipe.transform(this.expiredate, 'yyyy-MM-dd');
      let r = this.expiredate.split("-")[0];
      let r1 = this.expiredate.split("-")[1];
      let r2 = this.expiredate.split("-")[2];
      this.docexpiredateformat = r2 + "/" + r1 + "/" + r;
    }
    console.log("docexpiredateformat......" + this.docexpiredateformat);
    if (this.patient.value.degreeinput == null || this.patient.value.degreeinput == undefined) {
      this.patient.value.degreeinput = "";
    }

    if (this.patient.value.universityinput == null) {
      this.patient.value.universityinput = "";
    }

    if (this.patient.value.dateofgraduationinput == undefined) {
      this.docgraduationformat = "";
    }
    else {
      this.dateofgraduation = this.patient.value.dateofgraduationinput;
      this.dateofgraduation = this.datePipe.transform(this.dateofgraduation, 'yyyy-MM-dd');
      let re = this.dateofgraduation.split("-")[0];
      let re1 = this.dateofgraduation.split("-")[1];
      let re2 = this.dateofgraduation.split("-")[2];
      this.docgraduationformat = re2 + "/" + re1 + "/" + re;
    }
    console.log("docgraduationformat......" + this.docgraduationformat);
    if (this.patient.value.degreecertificateinput == null) {
      this.patient.value.degreecertificateinput = "";
    }

    if (this.patient.value.nameofcourseinput == null) {
      this.patient.value.nameofcourseinput = "";
    }

    if (this.patient.value.placeofissueinput == null) {
      this.placeofissue = "";
    }
    else {
      this.placeofissue = this.patient.value.placeofissueinput;
    }
    if (this.patient.value.startdate_input == null) {
      this.docstartformat = "";
    }
    else {
      this.docstartdate = this.patient.value.startdate_input;
      this.docstartdate = this.datePipe.transform(this.docstartdate, 'yyyy-MM-dd');
      let le = this.docstartdate.split("-")[0];
      let le1 = this.docstartdate.split("-")[1];
      let le2 = this.docstartdate.split("-")[2];
      this.docstartformat = le2 + "/" + le1 + "/" + le;
    }
    console.log("docstartformat......" + this.docstartformat);
    if (this.patient.value.enddateinput == null) {
      this.docendformat = "";
    }
    else {
      this.docenddate = this.patient.value.enddateinput;
      this.docenddate = this.datePipe.transform(this.docenddate, 'yyyy-MM-dd');
      let l = this.docenddate.split("-")[0];
      let l1 = this.docenddate.split("-")[1];
      let l2 = this.docenddate.split("-")[2];
      this.docendformat = l2 + "/" + l1 + "/" + l;
    }
    console.log("docendformat......" + this.docendformat);

    if (this.patient.value.coursecertificateinput == null) {
      this.patient.value.coursecertificateinput = "";
    }
  }

  addclickdocuments() {
    if (this.addcount == 0) {
      let rows = <FormArray>this.patient.get('docadd');
      rows.push(this.formBuilder.group({
        adddocname: [],
        addenddateinput: [],
        choosefileinput: []
      }));
      this.docaddclickhide = false;
      this.addcount = this.addcount + 1
      console.log(this.addcount)
      return false;
    }
    else {
      console.log(this.addcount)

      console.log(this.patient.get('docadd').value[this.addcount - 1].adddocname)
      console.log(this.patient.get('docadd').value[this.addcount - 1].choosefileinput)
      console.log(this.patient.get('docadd').value[this.addcount - 1].addenddateinput)
      if ((this.patient.get('docadd').value[this.addcount - 1].adddocname == null) || (this.patient.get('docadd').value[this.addcount - 1].addenddateinput == null) || (this.patient.get('docadd').value[this.addcount - 1].choosefileinput == null)) {
        alert("please enter previously added fields.")
      }
      else {
        console.log("if....")
        let rows = <FormArray>this.patient.get('docadd');
        rows.push(this.formBuilder.group({
          adddocname: [],
          addenddateinput: [],
          choosefileinput: []
        }));
        this.docaddclickhide = false;
        this.addcount = this.addcount + 1
        console.log(this.addcount)
      }


    }

  }
  docdeleteclick(index: number): void {
    (<FormArray>this.patient.get('docadd')).removeAt(index);
    console.log(this.patient.get('docadd').value.length);
    if (this.patient.get('docadd').value.length == 0) {
      this.docaddclickhide = true;
    }
    else {
      this.docaddclickhide = false;
    }

  }

  doccommonservice(val) {
    // if(this.patient.value.addenddateinput == null){
    //   this.docaddenddateformat="";
    // }
    // else{
    // this.docenddatevar=this.patient.value.addenddateinput;
    // this.docenddatevar =this.datePipe.transform(this.docenddatevar , 'yyyy-MM-dd');
    // let le=this.docenddatevar.split("-")[0];
    // let le1=this.docenddatevar.split("-")[1];
    // let le2=this.docenddatevar.split("-")[2];
    // this.docaddenddateformat= le2+"/"+le1+"/"+le;
    // }

    // this.enddateaaray.push(this.docaddenddateformat);
    // console.log(this.enddateaaray)
    //................add button click......................
    var allData = document.querySelectorAll('.docaddrowcls');

    allData = Array.prototype.slice.call(allData);
    allData.forEach((elem) => {

      var docname = <HTMLInputElement>elem.querySelector('.docnamecls');
      var enddate = <HTMLInputElement>elem.querySelector('.addenddatecls');
      var choosefiles = <HTMLSelectElement>elem.querySelector('.addchoosefilecls');

      this.alldocnames.push(docname.value);
      this.allenddates.push(enddate.value);
      // this.allchoosefiles.push(choosefiles.value);
    })
    console.log(this.alldocnames.toString());
    console.log(this.allenddates.toString())
    //console.log(this.allchoosefiles.toString())

    console.log(this.choosefilearray.toString());
    //.................................................
    console.log(this.uploaddoc)
    if (this.uploaddoc == undefined) {
      this.uploaddoc = "";
    }
    if (this.degreecertificate == undefined) {
      this.degreecertificate = "";
    }
    if (this.coursecerti == undefined) {
      this.coursecerti = "";
    }
    if (this.addchoosefile == undefined) {
      this.addchoosefile = "";
    }



    console.log("entered into service....");
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //  // this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/user_basicinformation2"
    let body = {
      //documentypeinput
      "Emp_Id": this.empid,
      "Id_proof": this.patient.value.documentypeinput,
      "Idproof_number": this.patient.value.numberinput,
      "Idproof_Attachemnt": this.uploaddoc,
      "Issued_date": this.docissuedateformat,
      "Expire_date": this.docexpiredateformat,
      "Education": this.patient.value.degreeinput,
      "University": this.patient.value.universityinput,
      "GPA": this.patient.value.gpainput,
      "Edu_enddate": this.docgraduationformat,
      "certificate": this.degreecertificate,
      "course": this.patient.value.nameofcourseinput,
      "couse_type": this.patient.value.placeofissueinput,
      "startdate": this.docstartformat,
      "endsate": this.docendformat,
      "course_certificate": this.coursecerti,
      "trans_date": this.allenddates.toString(),
      "Last_updated": "",
      "parm1": this.alldocnames.toString(),
      "param2": this.choosefilearray.toString(),
      "condition": "Updatebasicinfo2"
    }
    console.log("document url..." + JSON.stringify(body));
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res);
        this.isPageloaderVisible = false;
        if (res.status_cd == 1) {
          alert("Inserted Successfully");
          if (val == "fromsubmit") {
            this.tabs.select('healthinsurance');
          }
          else if (val == "fromsave"){
            this.router.navigate(['/usercreate'])
          }

        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    //  // this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }

    //);

  }
  health_previous() {
    this.tabs.select('document');
  }
  insurancesave() {
    this.healthincommon();
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.healthinsusaveservice('fromsave');
    }

  }
  insurancesubmit() {
    this.healthincommon();
    if (this.patient.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.patient);
    }
    else {
      this.healthinsusaveservice('fromsubmit');
    }



  }
  healthincommon() {
    if (this.patient.value.healthinsuranceinput == null) {
      this.patient.value.healthinsuranceinput = "";
    }
    if (this.patient.value.healthincompanyinput == null) {
      this.patient.value.healthincompanyinput = "";
    }
    if (this.patient.value.insurancetypeinput == null) {
      this.patient.value.insurancetypeinput = "";
    }

    if (this.patient.value.dateofreginput == undefined) {
      this.dateofregformat = "";
    }
    else {
      this.dateofreg = this.patient.value.dateofreginput;
      this.dateofreg = this.datePipe.transform(this.dateofreg, 'yyyy-MM-dd');
      let res = this.dateofreg.split("-")[0];
      let res1 = this.dateofreg.split("-")[1];
      let res2 = this.dateofreg.split("-")[2];
      this.dateofregformat = res2 + "/" + res1 + "/" + res;
    }
    console.log("date of reg......" + this.dateofregformat);
    console.log("place of reg" + this.patient.value.placeofreginput);
    if (this.patient.value.placeofreginput == null) {
      this.patient.value.placeofreginput = "";
    }

    if (this.patient.value.issueddateinput == undefined) {
      this.issuedateformat = "";
    }
    else {
      this.issuedate = this.patient.value.issueddateinput;
      this.issuedate = this.datePipe.transform(this.issuedate, 'yyyy-MM-dd');
      let r = this.issuedate.split("-")[0];
      let r1 = this.issuedate.split("-")[1];
      let r2 = this.issuedate.split("-")[2];
      this.issuedateformat = r2 + "/" + r1 + "/" + r;
    }
    console.log("issuedateformat....." + this.issuedateformat);
    if (this.patient.value.expirydateinput == undefined) {
      this.expirydateformat = "";
    }
    else {
      this.hiexpirydate = this.patient.value.expirydateinput;
      this.hiexpirydate = this.datePipe.transform(this.hiexpirydate, 'yyyy-MM-dd');
      let re = this.hiexpirydate.split("-")[0];
      let re1 = this.hiexpirydate.split("-")[1];
      let re2 = this.hiexpirydate.split("-")[2];
      this.expirydateformat = re2 + "/" + re1 + "/" + re;
    }
    console.log("expirydateformat......" + this.expirydateformat);
    // this.insuranceno=this.patient.value.insurancenoinput;
    if (this.patient.value.insurancecopyinput == null || this.patient.value.insurancecopyinput == undefined) {
      this.patient.value.insurancecopyinput = "";
    }

    //   console.log("socialsecurityno..."+  this.socialsecurityno+"dateofreg..."+  this.dateofregformat+"placeofreg..."+  this.placeofreg);
    //   console.log("issuedateformat.."+this.issuedateformat+"...."+"expirydateformat..."+this.expirydateformat)
    //   console.log("insuranceno..."+  this.insuranceno+"insurancecopy..."+this.insurancecopy); 
    // console.log("healthinsurace"+this.healthinsurace);
  }
  healthinsusaveservice(val) {
    if (this.uploadinsurancecopy == undefined) {
      this.uploadinsurancecopy = "";
    }
    //  this.commonService.tokenFun().subscribe(tokenResult =>{
    //  // this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/basicinformation4"

    let body = {
      "Emp_Id": this.empid,
      "security_no": this.patient.value.socialsecurityinput,
      "reg_date": this.dateofregformat,
      "Place": this.patient.value.placeofreginput,
      "Ins_category": this.patient.value.healthinsuranceinput,
      "Company": "" + this.patient.value.healthincompanyinput,
      "Issued_date": this.issuedateformat,
      "Expiry_date": this.expirydateformat,
      "Type": this.patient.value.insurancetypeinput,
      "Ins_copy": this.uploadinsurancecopy,
      "Trans_date": this.date,
      "Last_updated": this.date,
      "parm1": this.userid,
      "param2": this.patient.value.insurancenoinput,
      "condition": "Updateinfo4"
    }

    console.log("health url..." + JSON.stringify(body));
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
          alert("Inserted Successfully.");
          if (val == "fromsubmit") {
            this.tabs.select('vehicle');
          }
          else {

          }

        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    //  },
    // err=>{
    //  // this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }

    // );

  }
  vehicle_previous() {
    this.tabs.select('healthinsurance');
  }
  vehiclesave() {
    this.vehivlecommon();
    this.vehiclecommonservice();
  }
  vehiclesubmit() {
    this.vehivlecommon();
    this.vehiclecommonservice();
  }
  vehivlecommon() {
    if (this.patient.value.insurancecomptinput == null) {
      this.patient.value.insurancecomptinput = "";
    }
    if (this.patient.value.makeinput == null) {
      this.patient.value.makeinput = "";
    }
    if (this.patient.value.modelinput == null) {
      this.patient.value.modelinput = "";
    }

    if (this.patient.value.milesinput == null) {
      this.patient.value.milesinput = "";
    }

    if (this.patient.value.licenceexdateinput == undefined) {
      this.licenceexdateformat = ""
    }
    else {
      this.licenceexdate = this.patient.value.licenceexdateinput;
      this.licenceexdate = this.datePipe.transform(this.licenceexdate, 'yyyy-MM-dd');
      let res = this.licenceexdate.split("-")[0];
      let res1 = this.licenceexdate.split("-")[1];
      let res2 = this.licenceexdate.split("-")[2];
      this.licenceexdateformat = res2 + "/" + res1 + "/" + res;
    }
    console.log("licenceexdateformat......" + this.licenceexdateformat);
    if (this.patient.value.licenceattachementinput == null || this.patient.value.licenceattachementinput == undefined) {
      this.patient.value.licenceattachementinput = "";
    }

    if (this.patient.value.exdateinput == undefined) {
      this.vehivleexdateformat = ""
    }
    else {
      this.vehexdate = this.patient.value.exdateinput;
      this.vehexdate = this.datePipe.transform(this.vehexdate, 'yyyy-MM-dd');
      let r = this.vehexdate.split("-")[0];
      let r1 = this.vehexdate.split("-")[1];
      let r2 = this.vehexdate.split("-")[2];
      this.vehivleexdateformat = r2 + "/" + r1 + "/" + r;
    }
    console.log("vehivleexdateformat......" + this.vehivleexdateformat);
    if (this.patient.value.insuranceattachmentinput == null || this.patient.value.insuranceattachmentinput == undefined) {
      this.patient.value.insuranceattachmentinput = "";
    }

    if (this.patient.value.assigndateinput == undefined) {
      this.vehicleassigndateformat = ""
    }
    else {
      this.assigndate = this.patient.value.assigndateinput;
      this.assigndate = this.datePipe.transform(this.assigndate, 'yyyy-MM-dd');
      let l = this.assigndate.split("-")[0];
      let l1 = this.assigndate.split("-")[1];
      let l2 = this.assigndate.split("-")[2];
      this.vehicleassigndateformat = l2 + "/" + l1 + "/" + l;
    }
    console.log("vehicleassigndateformat......" + this.vehicleassigndateformat);
    if (this.patient.value.returndateinput == undefined) {
      this.vehiclereturndateformat = ""
    }
    else {
      this.returndate = this.patient.value.returndateinput;
      this.returndate = this.datePipe.transform(this.returndate, 'yyyy-MM-dd');
      let le = this.returndate.split("-")[0];
      let le1 = this.returndate.split("-")[1];
      let le2 = this.returndate.split("-")[2];
      this.vehiclereturndateformat = le2 + "/" + le1 + "/" + le;
    }
    console.log("vehiclereturndateformat......" + this.vehiclereturndateformat);
    if (this.patient.value.notesinput == null) {
      this.patient.value.notesinput = "";
    }

    // console.log("modelyear..."+  this.modelyear+"make..."+  this.make+"model..."+  this.model);
    // console.log("vinno..."+  this.vinno+"miles..."+  this.miles+"licenceno..."+  this.licenceno+"licenceexdate..."+this.licenceexdateformat); 
    // console.log("licenceaatachment..."+  this.licenceaatachment+"policyno..."+  this.policyno+"vehexdate....."+this.vehivleexdateformat+"insuranceattachment..."+  this.insuranceattachment);
    // console.log("assigndate..."+  this.vehicleassigndateformat+"returndate..."+  this.vehiclereturndateformat+"notes..."+  this.notes); 
  }
  vehiclecommonservice() {
    if (this.uploadlicenceatt == undefined) {
      this.uploadlicenceatt = "";
    }
    if (this.uploadinsuraceatt == undefined) {
      this.uploadinsuraceatt = "";
    }
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //  // this.isPageloaderVisible=true;
    // var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/Vehicles_transactions"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Emp_id": this.empid,
      "Model_Year": this.patient.value.modelyearinput,
      "Make": this.patient.value.makeinput,
      "Model_type": this.patient.value.modelinput,
      "VIN_number": this.patient.value.vinnoinput,
      "Miles": this.patient.value.milesinput,
      "Plate_Number": this.patient.value.platenoinput,
      "Licence_number": this.patient.value.licencenoinput,
      "Lic_Exp_date": this.licenceexdateformat,
      "Licence_attachment": this.uploadlicenceatt,
      "Ins_company": "" + this.patient.value.insurancecomptinput,
      "Policy_num": this.patient.value.plicynoinput,
      "Ins_Exp_date": this.vehivleexdateformat,
      "ins_attachment": this.uploadinsuraceatt,
      "Taking_date": this.vehicleassigndateformat,
      "Returning_date": this.vehiclereturndateformat,
      "Notes": this.patient.value.notesinput,
      "Trans_date": "",
      "Last_Updated": "",
      "param1": "",
      "parm2": "",
      "condition": "Updatevehicle"
    }
    console.log("vehivle url..." + JSON.stringify(body));
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
          alert("Inserted Successfully.");
          this.router.navigate(['/usercreate']);
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    //  // this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }

    // );

  }
  fileupload(evnt, name) {
    console.log(evnt);
    console.log(name);
    let uploatprof = this.patient.value.uploadidproof
    let fileSelected = evnt.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    console.log(body)
    // this.commonService.tokenFun().subscribe(tokenResult => {
    // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken = window.localStorage.Tokenval
    let headers = new Headers({
      Authorization: accessToken
    });
    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.commonService.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.result = body[0];
      console.log(this.result);
      if (name == "uploaddocument") {
        console.log(this.patient.value.uploaddocinput)
        this.uploaddoc = body[0];

      } else if (name == "degreecertificate") {
        this.degreecertificate = body[0];

      } else if (name == "coursecertificate") {
        this.coursecerti = body[0];

      } else if (name == "insurancecopy") {
        this.uploadinsurancecopy = body[0];

      } else if (name == "licenceattachment") {
        this.uploadlicenceatt = body[0];

      } else if (name == "insuranceattachment") {
        this.uploadinsuraceatt = body[0];
      }
      else if (name == "choosefile") {
        // this.addchoosefile=body[0];
        this.choosefilearray.push(body[0]);
      }


      // });
    })
  }
}
