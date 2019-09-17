import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
// import 'rxjs/add/operator/pluck'; 
import { Observable } from "rxjs/Rx";

// import { DateTimeAdapter } from 'ng-pick-datetime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { findSafariExecutable } from 'selenium-webdriver/safari';
// import { SpinnerComponent } from './shared/spinner.component';
@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.css']
})
export class AddinvoiceComponent implements OnInit {
  // @ViewChild('one') d1: ElementRef;

  nullValue: any;
  appointmentval = this.nullValue;
  doctnameval = this.nullValue;
  patientval = this.nullValue;
  invoicetoval = "";
  patientinfo = this.nullValue;
  dateval = this.nullValue;
  selectdrop = this.nullValue;
  addinvoicefg: FormGroup;
  submitted = false;
  elementArray: any = [];
  mydropdown: any = [];
  selval: any = "-Select-";
  select: string = 'Select';
  allInvoices: any = [];
  AllErrors: any = [];
  modalReference = null;
  @ViewChild('CreateContact') Ccontact: TemplateRef<any>;
  // productData = ['a', 'b', 'c', 'f'];
  // appointmentData = ['a', 'b', 'c', 'f', 'gfg']
  // treatmentData = ['a', 'b', 'c', 'f', 'trtr']
  // servicesData = ['a', 'b', 'c', 'f', 'ser']
  discountAmont: any = 0;
  totalAmount: any = 0;
  hideqty: boolean = false;
  userid: string;
  hiddenModel: boolean = true;

  doctorList: any = [];
  PatientsList: any = [];
  hidesearch: boolean = false;
  pnamehidden: boolean = false;
  pname: any;
  pid: any;
  finalTotalAmount: any;
  public finalsubTotal: any = 0;
  finalTax: any;
  finalInvoicetotal: any;
  productData: any = [];
  appointmentData: any = [];
  treatmentData: any = [];
  servicesData: any = [];

  public myTotal = 0;
  public mytoatalQty = 0;
  public mytotalDiscount = 0;
  public myqtys = 0;
  public totaltaxrate = 0;
  closeResult: string;
  indexCounter: number = 0;
  createPatientfg: FormGroup;
  isPageloaderVisible: boolean = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  INVquantity: any = [];
  INVentercost: any = [];
  INVSelect: any = [];
  INVenterdiscount: any = [];

  ValidationMessages = {

    'patientval': {
      'required': 'Please enter Patient Name'
    },
    'doctnameval': {
      'required': 'Please select Doctor name',
      'Select': 'Please select Doctor name'
    },
    'dateval': {
      'required': 'Please select Date'
    },

    'appointmentval': {
      'required': ''
    },
    'invoicetoval': {
      'required': ''
    },
    'patientinfo': {
      'required': ''
    },
    'selectdrop': {
      'required': "Please select Item",
      'Select': 'Please select Item'
    },
    'entercost': {
      'required': 'Please Enter Unit Price'
    },
    'enterqty': {
      'required': 'Please Enter Quantity'
    },

  }

  ArabicValidationMessages = {
    'patientval': {
      'required': 'الرجاء إدخال اسم المريض'
    },
    'doctnameval': {
      'required': 'الرجاء إدخال اسم الطبيب',
      'Select': 'الرجاء إدخال اسم الطبيب'
    },
    'dateval': {
      'required': 'الرجاء اختيار التاريخ'
    },

    'appointmentval': {
      'required': ''
    },
    'invoicetoval': {
      'required': ''
    },
    'patientinfo': {
      'required': ''
    },
    'selectdrop': {
      'required': "الرجاء اختيار العنصر/البند",
      'Select': 'الرجاء اختيار العنصر/البند'
    },
    'entercost': {
      'required': 'الرجاء ادخال سعر الوحدة'
    },
    'enterqty': {
      'required': 'الرجاء ادخال الكمية'
    },
  }


  formErrors = {

    'appointmentval': '',
    'doctnameval': '',
    'patientval': '',
    'dateval': '',
    'invoicetoval': '',
    "patientinfo": '',
    'selectdrop': '',
    'entercost': '',
    'enterqty': '',
    'enerdiscount': ""
  }

  PatientarabicValidationMessages = {
    'title': {
      'required': 'الرجاء اختيار العنوان',
      'Select': 'الرجاء اختيار العنوان'
    },
    'fname': {
      'required': 'الرجاء إدخال الاسم الأول'
    },
    'fathername': {
      'required': 'الرجاء إدخال اسم الأب'
    },
    'lname': {
      'required': 'الرجاء إدخال اسم العائلة'
    },
    'engfname': {
      'required': 'الرجاء إدخال الاسم الأول'
    },
    'engmiddlename': {
      'required': 'الرجاء إدخال الاسم الأوسط'
    },
    'englastname': {
      'required': 'الرجاء إدخال اسم العائلة'
    },
    'arabicDob': {
      'required': 'الرجاء اختيار تاريخ الميلاد'
    },
    'EnglishDob': {
      'required': 'الرجاء اختيار تاريخ الميلاد'
    },

    'gender': {
      'required': 'الرجاء تحديد الجنس',
      'Select': 'الرجاء تحديد الجنس'
    },
    'mobilenum': {
      'required': 'الرجاء إدخال رقم الجوال'
    },
    'email': {
      'required': 'الرجاء إدخال  البريد الإلكتروني',
      'pattern': "الرجاء إدخال بريد إلكتروني صحيح"
    },
    'remainder': {
      'required': 'الرجاء اختيار التنبيه',
      'Select': 'الرجاء اختيار التنبيه'
    },
    'note': {
      'required': 'الرجاء إدخال الملاحظات'
    },
  }

  PatientValidationMessages = {
    'title': {
      'required': 'Please select title',
      'Select': 'Please select title'
    },
    'fname': {
      'required': 'Please enter first name'
    },
    'fathername': {
      'required': 'Please enter Father name'
    },
    'lname': {
      'required': 'Please enter last name'
    },
    'engfname': {
      'required': 'Please enter first name'
    },
    'engmiddlename': {
      'required': 'Please enter middle name'
    },
    'englastname': {
      'required': 'Please enter last name'
    },
    'arabicDob': {
      'required': 'Please enter date of birth'
    },
    'EnglishDob': {
      'required': 'Please enter date of birth'
    },

    'gender': {
      'required': 'Please select gender',
      'Select': 'Please select gender'
    },
    'mobilenum': {
      'required': 'Please enter mobile number'
    },
    'email': {
      'required': 'Please enter email',
      'pattern': "Please enter valid email"
    },
    'remainder': {
      'required': 'Please select remainder',
      'Select': 'Please select remainder'
    },
    'note': {
      'required': 'Please enter note'
    },
  }

  
  patientformErrors = {

    'title': '',
    'fname': '',
    'fathername': "",
    'lname': '',
    'engfname': '',
    'engmiddlename': '',
    'arabicDob': '',
    'EnglishDob': '',
    "gender": '',
    'mobilenum': '',
    'remainder': '',
    'email': '',
    'note': '',
  }

  showDatapatient: boolean = false;
  nopatientname: boolean = false;
  doctempid: any;
  qtylist: string;
  pricelist: string;
  Totalpriceslist: string;
  dropdowndnameslist: any;
  discountslist: string;
  taxepercentslist: string;
  mytaxrateslist: string;
  selecteddropdownTypelist: string;
  create_patientinvoice: any;
  appointmentdate: string;
  frompagename: string = "";
  showpopup: boolean = true;
  titles: string[];
  // titlea = ['السيد', 'الآنسة', 'السيدة', 'يغيب', 'دكتور', 'دكتور جامعى', 'سيدي المحترم'];
  RemainderSettings: { singleSelection: boolean; selectAllText: string; unSelectAllText: string; allowSearchFilter: boolean; };
  communicate: string[];
  applist: any;
  Ap_ipList: any;
  listedApNames: any;
  tempApData: any = [];
  arabicbinddate: any;
  binddate: any;
  fromsubmit: boolean;
  language: any;
  languageoption: any;
  public langulagetype: any = 'us';

  constructor(
    private meta: Meta, private router: Router, public cmn: UserinfoService,
    private MainTitle: Title, public http: Http,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // public dateTimeAdapter: DateTimeAdapter<any>,
    private modalService: NgbModal,
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    this.cmn.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "us";
      }
      else {

        this.langulagetype = this.languageoption;
      }
      this.patientformErrors = {
        'title': '',
        'fname': '',
        'fathername': "",
        'lname': '',
        'engfname': '',
        'engmiddlename': '',
        'arabicDob': '',
        'EnglishDob': '',
        "gender": '',
        'mobilenum': '',
        'remainder': '',
        'email': '',
        'note': '',
      }
      this.formErrors = {
        'appointmentval': '',
        'doctnameval': '',
        'patientval': '',
        'dateval': '',
        'invoicetoval': '',
        "patientinfo": '',
        'selectdrop': '',
        'entercost': '',
        'enterqty': '',
        'enerdiscount': ""
      }
    })
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
      this.patientcheckValidationErrors();
    }
  }

  ngOnInit() {
    this.cmn.currentMessagecat.subscribe(message => {
      console.log(message);

    })
    this.userid = window.localStorage.getItem("userId")
    console.log(this.allInvoices.length);
    this.titles = ['Mr', 'Ms', 'Mrs', 'Dr', 'Professor', 'Sir'];
    this.RemainderSettings = {
      singleSelection: false,
      selectAllText: 'Both',
      unSelectAllText: 'None',
      allowSearchFilter: false
    };
    this.communicate = ['Email', 'SMS'];
    this.frompagename = this.route.snapshot.params['frompage'];

    console.log(this.frompagename);

    if (this.frompagename != "invoice") {
      var url = document.URL
      var url1 = url.split('?')
      this.create_patientinvoice = url1[1].split('=')[1]
      console.log(this.create_patientinvoice);
    }

    this.addinvoicefg = this.fb.group({
      // appointmentval:['',[Validators.required]],
      patientval: ['', [Validators.required]],
      dateval: ['', [Validators.required]],
      doctnameval: ['select', [Validators.required, CustomValidators.Select('select')]],
      invoicetoval: [],
      appointmentval: [],
      patientinfo: [],
      selectdrop: [],  //  ['select', [Validators.required, CustomValidators.Select('select')]],
      enterqty: [], //['',[Validators.required]], 
      entercost: [],// ['',[Validators.required]],
      enerdiscount: []
    });

    this.addinvoicefg.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.tempApData = data.appointmentval;
      this.checkValidationErrors(this.addinvoicefg);
    });
    // this.addinvoicefg.valueChanges.subscribe((data) => {
    //   console.log(data);
    //   this.checkValidationErrors(this.addinvoicefg);
    //   this.tempApData = data.appointmentval;
    // });

    this.addinvoicefg.patchValue({
      'dateval': new Date()
    })



    // --------------------create patient popup---------
    this.createPatientfg = this.fb.group({
      title: ['select', [Validators.required, CustomValidators.Select('select')]],
      fname: ['', [Validators.required]],
      fathername: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      engfname: ['', [Validators.required]],
      engmiddlename: ['', [Validators.required]],
      englastname: ['', [Validators.required]],
      arabicDob: ['', [Validators.required]],
      EnglishDob: ['', [Validators.required]],
      gender: ['select', [Validators.required, CustomValidators.Select('select')]],
      mobilenum: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      remainder: ['select', [Validators.required, CustomValidators.Select('select')]],
      note: ['', [Validators.required]],
    })
    this.createPatientfg.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.patientcheckValidationErrors(this.createPatientfg);
    });

    this.DoctorListdata();
    this.GetAppointmentsData();
    this.GetTreatmentsData();
    this.GetServicesData();
  }


  checkValidationErrors(group: FormGroup = this.addinvoicefg): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
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
            const messages = this.ArabicValidationMessages[key];
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
            const messages = this.ArabicValidationMessages[key];
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

  patientcheckValidationErrors(group: FormGroup = this.createPatientfg): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.patientformErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
          if (this.langulagetype == "EN") {
            const messages = this.PatientValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.patientformErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.PatientarabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.patientformErrors[key] += messages[errorKey] + '';
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
            const messages = this.PatientValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.patientformErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.PatientarabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.patientformErrors[key] += messages[errorKey] + '';
              }
            }

          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.patientcheckValidationErrors(abstractControl)
      }
    });
  }

  // --------------calculations-------

  updateInvoice(event, index, qty, uprice, discount) {
    // console.log(event)
    console.log(event)
    // console.log(index);
    // event.target.value = '2'
    if (event != "") {
      console.log("Not Empty");

      this.allInvoices[index][qty] = event.target.value;
      this.allInvoices[index][uprice] = event.target.value;
      this.allInvoices[index][discount] = event.target.value;
      // this.allInvoices[index][taxpercent] = event.target.value;
    }
    console.log(this.allInvoices)
    console.log("index :" + index);
    console.log(this.allInvoices[index].Quantity);
    if (this.allInvoices[index].Quantity == "") {
      this.AllErrors[index].quantity = false;
    } else {
      this.AllErrors[index].quantity = true;
    }
    console.log(this.allInvoices);
    this.myCalculations(index);
  }
  updateInvoice1(event, index, qty, uprice, discount) {
    // console.log(event)
    console.log(event)
    // console.log(index);
    // event.target.value = '2'
    if (event != "") {
      console.log("Not Empty");
      this.allInvoices[index][qty] = event.target.value;
      this.allInvoices[index][uprice] = event.target.value;
      this.allInvoices[index][discount] = event.target.value;
      // this.allInvoices[index][taxpercent] = event.target.value;
    }
    console.log(this.allInvoices)
    console.log("index :" + index);
    console.log(this.allInvoices[index].Uprice);
    if (this.allInvoices[index].Uprice == "") {
      this.AllErrors[index].price = false;
    } else {
      this.AllErrors[index].price = true;
    }
    console.log(this.allInvoices);
    this.myCalculations(index);
  }
  // this.updateInvoice1(index);
  // console.log(this.allInvoices[0].Quantity);
  // }
  // updateInvoice1(index){

  myCalculations(index) {
    console.log(index)
    console.log("Spliced calculations");
    console.log(this.allInvoices);
    var myqtyarray = [];
    var mypricearray = [];
    var mytotalPricearray = [];
    var myseledropdowns = [];
    var mydiscountslist = [];
    var discountedlist = [];
    var taxPercentagelist = [];
    var taxrateslist = [];
    var seleType = [];

    for (let i = 0; i < this.allInvoices.length; i++) {
      console.log(this.allInvoices);

      if (this.allInvoices[i].Quantity != "" && this.allInvoices[i].Uprice != "" && this.allInvoices[i].Discount != "") {
        var multival = parseInt(this.allInvoices[i].Quantity) * parseInt(this.allInvoices[i].Uprice);
        console.log(multival);

        this.discountAmont = (multival * this.allInvoices[i].Discount) / (100);
        console.log(this.discountAmont);

        console.log(this.allInvoices[i]["idxdiscount"]);
        this.allInvoices[i]["idxdiscount"] = this.discountAmont;

        this.totalAmount = (multival) - (this.discountAmont);
        console.log(this.totalAmount);

        this.allInvoices[i]["idxtotal"] = this.totalAmount;
        // -------------------Calculat Total Discount--------------------

        //   this.discountAmont += this.allInvoices[i].discount;

        // console.log(this.discountAmont);

      } else if (this.allInvoices[i].Quantity != "" && this.allInvoices[i].Uprice != "") {
        this.totalAmount = parseInt(this.allInvoices[i].Quantity) * parseInt(this.allInvoices[i].Uprice);
        console.log(this.totalAmount);
        this.allInvoices[i]["idxtotal"] = this.totalAmount;
        this.discountAmont = 0;
        this.allInvoices[i]["idxdiscount"] = this.discountAmont;


      } else if (this.allInvoices[i].Quantity == "") {
        this.discountAmont = 0;
        this.allInvoices[i]["idxdiscount"] = this.discountAmont;
        // this.hideqty  = true;
        // this.finalTotalAmount
        // this.finalsubTotal
        // this.finalTax
        // this.finalInvoicetotal
      } else if (this.allInvoices[i].Quantity != "" && this.allInvoices[i].Uprice == "") {
        this.allInvoices[i]["idxdiscount"] = 0;
        this.allInvoices[i]["idxtotal"] = 0;
      }

      // --------------------------Qantity List Array ---------------

      if ((this.allInvoices[i].Quantity) != "") {
        myqtyarray.push(parseFloat(this.allInvoices[i].Quantity))
        this.qtylist = myqtyarray.join(";");
        console.log(myqtyarray);
        console.log(this.qtylist);
      }
      // --------------------------Price List Array ---------------

      if ((this.allInvoices[i].Uprice) != "") {

        console.log(this.allInvoices[i].Uprice);
        mypricearray.push(parseFloat(this.allInvoices[i].Uprice));
        this.pricelist = mypricearray.join(";");
        console.log(mypricearray);
        console.log(this.pricelist);
      }
      // --------------------------TotalPrice List Array ---------------

      if (this.allInvoices[i].idxtotal != "") {
        mytotalPricearray.push(parseFloat(this.allInvoices[i].idxtotal));
        this.Totalpriceslist = mytotalPricearray.join(";");
        console.log(mytotalPricearray);
        console.log(this.Totalpriceslist);
        var totalsum = mytotalPricearray.reduce(function (a, b) { return a + b; }, 0);
        console.log(totalsum);
        this.myTotal = totalsum;
        this.finalsubTotal = this.myTotal;
      }
      //----------------------------Selected dropdowns list array -------------------

      if ((this.allInvoices[i].selectedValue) != "") {
        myseledropdowns.push((this.allInvoices[i].selectedValue));
        this.dropdowndnameslist = myseledropdowns.join(";");
        console.log(myseledropdowns);
        console.log(this.dropdowndnameslist);
      }
      // ----------------------------------discount list --------------------
      if (this.allInvoices[i].Discount != "") {
        mydiscountslist.push(parseFloat(this.allInvoices[i].Discount));
        this.discountslist = mydiscountslist.join(";");
        console.log(this.discountslist);
        console.log(mydiscountslist);
      }
      // ----------------------------------------discounted amount list----------------------
      if (this.allInvoices[i].idxdiscount != "") {
        discountedlist.push(parseFloat(this.allInvoices[i].idxdiscount));
        this.discountslist = discountedlist.join(";");
        console.log(this.discountslist);
        console.log(discountedlist);
        var totaldisc = discountedlist.reduce(function (a, b) {
          return a + b;
        }, 0);
        this.mytotalDiscount = totaldisc;
        console.log(this.mytotalDiscount);
      }
      // ---------------------Tax percentate----------- 
      // if(this.allInvoices[i].taxPercentage != ""){
      taxPercentagelist.push(parseInt(this.allInvoices[i].taxPercentage));
      this.taxepercentslist = taxPercentagelist.join(";");
      console.log(this.taxepercentslist);
      console.log(taxPercentagelist)
      // }
      // ---------------------Tax rates----------- 
      // if(this.allInvoices[i].taxrate != ""){
      taxrateslist.push(parseInt(this.allInvoices[i].taxrate));
      this.mytaxrateslist = taxrateslist.join(";");
      console.log(this.mytaxrateslist);
      console.log(taxrateslist)
      // }
      //-----------------------------selected dropdown type--------------
      seleType.push((this.allInvoices[i].selectType));
      this.selecteddropdownTypelist = seleType.join(";");
      console.log(this.selecteddropdownTypelist);
      console.log(seleType)
    }
  }

  commtablechange(evnt, index, selectType, selectArray) {
    console.log(evnt);

    this.AllErrors[index].select = true;
    this.allInvoices[index].selectedValue = (evnt.target.value);
    console.log(this.allInvoices[index].selectedValue);
    console.log(selectType);
    console.log(this.allInvoices)

    if (this.allInvoices[index].selectedValue == "") {
      this.AllErrors[index].select = false;
    } else {
      this.AllErrors[index].select = true;
    }
  }

  removerow(event, idx) {
    console.log(event, idx);
    console.log(this.allInvoices.idx);
    if (this.allInvoices.length > 1) {
      this.allInvoices.splice(idx, 1);
      this.myCalculations(idx);
    }
    console.log(this.allInvoices);
  }

  add(val) {
    console.log(this.allInvoices.length);
    if (val === "product") {
      this.allInvoices.push({
        'select': this.productData,
        'selectType': 'Product',
        'Quantity': '',
        'Uprice': '',
        'Discount': '',
        "taxPercentage": 0,
        "taxrate": 0,
        "selectedValue": '',
        "idxdiscount": '',
        "idxtotal": '',
      })

      this.AllErrors.push({
        'select': true,
        'quantity': true,
        'price': true
      });
    }
    if (val === 'app') {
      this.allInvoices.push({
        'select': this.appointmentData,
        'selectType': 'Appointment',
        'Quantity': '',
        'Uprice': '',
        'Discount': '',
        "taxPercentage": 0,
        "taxrate": 0,
        "selectedValue": '',
        "idxdiscount": '',
        "idxtotal": '',
      })

      this.AllErrors.push({
        'select': true,
        'quantity': true,
        'price': true
      });
    } else if (val === 'treat') {
      this.allInvoices.push({
        'select': this.treatmentData,
        'selectType': 'Treatments',
        'Quantity': '',
        'Uprice': '',
        'Discount': '',
        "taxPercentage": 0,
        "taxrate": 0,
        "selectedValue": '',
        "idxdiscount": '',
        "idxtotal": '',
      })

      this.AllErrors.push({
        'select': true,
        'quantity': true,
        'price': true
      });

    } else if (val === 'services') {
      this.allInvoices.push({
        'select': this.servicesData,
        'selectType': 'Services',
        'Quantity': '',
        'Uprice': '',
        'Discount': '',
        "taxPercentage": 0,
        "taxrate": 0,
        "selectedValue": '',
        "idxdiscount": '',
        "idxtotal": '',
      })

      this.AllErrors.push({
        'select': true,
        'quantity': true,
        'price': true
      });

    }
    console.log(this.allInvoices)
  }



  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  DoctorListdata() {
    // alert("Doctor");
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = true;

    var serviceUrl = this.cmn.commonUrl + "Account/GetPatients"
    var params = {
      "FirstName": "",
      "par1": "",
      "par2": this.userid,
      "par3": "",
      "condition": "GetDoctor"

    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);

      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        this.doctorList = result.data.Table;

        if (this.create_patientinvoice != "") {
          console.log(this.create_patientinvoice);
          let val = this.create_patientinvoice;
          //  this.patientkeyup();
          this.getval('', val);
          // this.doctornamechange(evnt);
        }
        console.log(this.doctorList)
        //  this.nodata;
      } else {
        this.isPageloaderVisible = true;
        console.log("No Data Found");

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }

  }


  patientkeyup(evnt: any) {
    let values = evnt.target.value;
    console.log(values);
    if (values == "") {
      this.showDatapatient = false;
      this.nopatientname = false;
    } else {

      // this.hidesearch= true;
      var val = evnt.target.value;

      console.log("Auto complete");

      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);

      this.isPageloaderVisible = true;

      // our service calling as usual
      var serviceUrl = this.cmn.commonUrl + "Account/LabDetails_Transactions"
      var params = {
        "Sno": "",
        "Patient_Id": val,
        "Report_Id": "",
        "Attachment_url": "",
        "TransDate": "",
        "Loginid": "",
        "Clinicid": this.userid,
        "branchid": "",
        "operation": "patientnameall"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      console.log(params)
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);

        this.isPageloaderVisible = true;
        if (result.status_cd === "1") {

          console.log(result.data);
          this.PatientsList = result.data.Table;
          console.log(this.PatientsList);
          this.addinvoicefg.patchValue({
            // doctnameval :  result.data.Table[0].
            // appointmentval : result.data.Table[0].
            // invoicetoval : result.data.Table[0].
            // patientinfo : result.data.Table[0].
          })

          this.showDatapatient = true;
          this.nopatientname = false;

        } else {
          this.isPageloaderVisible = true;
          console.log("No Data Found for patients");

          // this.nodata = false;
          this.addinvoicefg.patchValue({
            patientval: '',
          })
          this.showDatapatient = false;
          this.nopatientname = true;
        }
      },
      );
      error => {
        this.isPageloaderVisible = true;
        console.log(error);
        alert(error);

      }
    }
  }

  getval(evnt, val) {
    console.log(evnt);
    this.pnamehidden = false;
    console.log(val);
    if (evnt !== '') {
      this.addinvoicefg.patchValue({
        patientval: evnt.target.innerHTML,
      });
      this.INVquantity = [];
      this.INVentercost = [];
      this.INVenterdiscount = [];
      this.INVSelect = [];
    }


    this.pid = val;
    this.showDatapatient = false;
    this.nopatientname = false;

    var accessToken = window.localStorage.Tokenval;
    console.log(this.pid);
    console.log(this.userid)


    this.isPageloaderVisible = true;

    var serviceUrl = this.cmn.commonUrl + "Account/GetPatients"
    var params = {
      "FirstName": "",
      "par1": this.pid,
      "par2": this.userid,
      "par3": "",
      "condition": "GetPractitionerData"

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
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        console.log(result.data);

        console.log(result.data.Table[0].Address);

        this.addinvoicefg.patchValue({
          'doctnameval': result.data.Table1[0].Emp_Id,
          'invoicetoval': result.data.Table[0].Address,
          // 'patientval' : result.data.Table1[0].patientid,
          // patientinfo : result.data.Table[0].

        });
        if (this.create_patientinvoice != "") {
          this.GetPatientName(result.data.Table1[0].patientid);
        }

        this.doctempid = result.data.Table1[0].Emp_Id;
        console.log(this.doctempid);
        console.log(this.addinvoicefg.value.doctnameval);
        console.log(this.addinvoicefg.value.invoicetoval);
        //  this.nodata;
        var doctname = result.data.Table1[0].First_name;

        if (result.data.Table1[0].First_name == "" || result.data.Table1[0].First_name == null || result.data.Table1[0].First_name == "null") {
          console.log(result.data.Table1[0].First_name);
          console.log(this.doctempid)

        }

        var evnt = {
          target: {
            value: this.doctempid
          }
        }
        console.log(evnt)
        this.doctornamechange(evnt, doctname);
      } else {
        this.isPageloaderVisible = true;
        console.log(result.data);
        // this.DoctorListdata();
        this.addinvoicefg.patchValue({
          'doctnameval': "select"
        })
        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }
  }


  doctornamechange(evnt, val) {
    console.log("Pid:" + this.pid);
    console.log(evnt.target.value);
    var temp1 = "";
    temp1 = (evnt.target.value).split(":")[1];
    console.log(temp1);

    if (val == "changedoct") {

      temp1 = (evnt.target.value).split(":")[1].replace(" ", "");
      this.doctempid = temp1;
    }
    // this.doctempid = temp1;

    console.log(this.doctempid);
    console.log(evnt.target.value.First_name);
    var doctname = "";
    console.table(this.doctorList);
    var mydoctlistarray = JSON.stringify(this.doctorList);
    for (let i = 0; i < this.doctorList.length; i++) {

      if (this.doctempid == this.doctorList[i].Emp_Id) {
        console.log("if");
        doctname = this.doctorList[i].First_name;
        console.log(doctname);
      }

      // console.log("doctname :"+doctname)
    }

    console.log("doctname :" + doctname);
    console.log(this.addinvoicefg.value.doctnameval);

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = true;


    var serviceUrl = this.cmn.commonUrl + "Account/GetPatients"
    var params = {
      "FirstName": this.pid,
      "par1": "",
      "par2": this.userid,
      "par3": this.doctempid,
      "condition": "GetApp"

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
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        console.log(result.data);

        console.log(result.data.Table[0].dt);

        this.applist = result.data.Table;

        // var myapp ='';
        // console.log((result.data.Table).toString)
        // for(let i=0;i<result.data.Table.length;i++){
        //   myapp = result.data.Table[i].dt+','+myapp;
        // }

        // console.log(myapp);
        // this.addinvoicefg.patchValue({
        //   'appointmentval': myapp,

        // })
        // console.log(this.addinvoicefg.value.appointmentval);


      } else {
        this.isPageloaderVisible = true;
        console.log(result.data);
        this.applist = [];

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }
  }

  datechange() {
    // console.log(evnt.target.value);

    this.appointmentdate = (this.addinvoicefg.value.dateval.getMonth() + 1) + "/" + this.addinvoicefg.value.dateval.getDate() + "/" + this.addinvoicefg.value.dateval.getFullYear();
    console.log(this.appointmentdate)
    //   var seldate = evnt.target.value;
    //   var year = seldate.split("-")[0];
    //   var month = seldate.split("-")[1];
    //   var cdate = seldate.split("-")[2];
    //   console.log(year,","+ month,","+ cdate)

  }
  invoicecancle() {
    this.router.navigate(['/Maininvoice']);
  }

  GetPatientName(pid) {
    console.log(pid);

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = false;


    var serviceUrl = this.cmn.commonUrl + "Account/Invoice_transactions"
    var params = {
      "Sno": pid,
      "Clinicid": this.userid,
      "Branchid": "",
      "Invoiceno": "",
      "Issued_date": "",
      "PatientId": "",
      "Doctorid": "",
      "Appointment_info": "",
      "Invoiceto": "",
      "Extra_patient": "",
      "Note": "",
      "Tot_discount": "",
      "Sub_total": "",
      "Tax": "",
      "Invoice_tot": "",
      "Loginid": "",
      "Status": "",
      "Item_code": "",
      "bill_type": "",
      "Qty": "",
      "Price": "",
      "Tot_Qty": "",
      "TotPrice": "",
      "Taxper": "",
      "Tax_amt": "",
      "Discount": "",
      "Total": "",
      "Trans_date": "",
      "Last_Update": "",
      "condition": "getPatientname"
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
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        console.log(result.data.Table);

        this.addinvoicefg.patchValue({

          'patientval': result.data.Table[0].Name,
        })
        //  this.nodata;
      } else {
        this.isPageloaderVisible = true;
        console.log("No Data Found");

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }


  }
  // ---------------------------inserting values-------------------

  invoicesubmit() {
    console.log(this.addinvoicefg.valid)

    for (let i = 0; i < this.allInvoices.length; i++) {
      console.log(this.allInvoices[i].selectedValue);
      if (this.allInvoices[i].selectedValue == '') {
        this.AllErrors[i].select = false;
      } else {
        this.AllErrors[i].select = true;
      }

      if (this.allInvoices[i].Quantity == '') {
        this.AllErrors[i].quantity = false;
      } else {
        this.AllErrors[i].quantity = true;
      }

      if (this.allInvoices[i].Uprice == '') {
        this.AllErrors[i].price = false;
      } else {
        this.AllErrors[i].price = true;
      }
    }


    // if (this.addbankdetails.invalid == true) {
    //   this.fromsubmit = true;
    //   this.checkValidationErrors(this.addbankdetails);

    // } 

    if (this.addinvoicefg.invalid == true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.addinvoicefg);
      this.appointmentdate = this.addinvoicefg.value.dateval.getDate() + "/" + (this.addinvoicefg.value.dateval.getMonth() + 1) + "/" + this.addinvoicefg.value.dateval.getFullYear();
      console.log(this.appointmentdate)

    } else {

      if (this.addinvoicefg.value.patientinfo == "null") {
        this.addinvoicefg.value.patientinfo == "";
      }

      if (this.addinvoicefg.value.appointmentval == null) {
        this.addinvoicefg.value.appointmentval == "";
      }

      // if(this.taxepercentslist == "undefined" || this.taxepercentslist == undefined){
      //   this.taxepercentslist = "0";
      // }

      // if(this.mytaxrateslist == "undefined" || this.mytaxrateslist == undefined){
      //   this.mytaxrateslist = "0";
      // }

      console.log(this.addinvoicefg.value.appointmentval);
      console.log(this.addinvoicefg.value.doctnameval);
      console.log(this.addinvoicefg.value.patientval);
      console.log(this.addinvoicefg.value.invoicetoval);
      console.log(this.addinvoicefg.value.patientinfo);
      console.log(this.addinvoicefg.value.dateval);
      console.log(this.doctempid)
      console.log(this.pid);
      console.log("Item_code" + this.dropdowndnameslist);

      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);

      this.isPageloaderVisible = false;


      var serviceUrl = this.cmn.commonUrl + "Account/Invoice_transactions"
      var params = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branchid": this.userid,
        "Invoiceno": "",
        "Issued_date": this.appointmentdate,
        "PatientId": this.pid,
        "Doctorid": this.addinvoicefg.value.doctnameval,
        "Appointment_info": this.Ap_ipList,
        "Invoiceto": this.addinvoicefg.value.invoicetoval,
        "Extra_patient": this.addinvoicefg.value.patientinfo,
        "Note": "test",
        "Tot_discount": this.mytotalDiscount,
        "Sub_total": JSON.stringify(this.myTotal),
        "Tax": "0",
        "Invoice_tot": JSON.stringify(this.myTotal),
        "Loginid": this.userid,
        "Status": "Active",
        "Item_code": this.dropdowndnameslist + ';',
        "bill_type": this.selecteddropdownTypelist + ';',
        "Qty": this.qtylist + ';',
        "Price": this.pricelist + ';',
        "Tot_Qty": this.qtylist + ';', //this.mytoatalQty+';',
        "TotPrice": this.Totalpriceslist + ';',  //this.myTotal+';',
        "Taxper": this.taxepercentslist + ';',
        "Tax_amt": this.mytaxrateslist + ';',
        "Discount": this.discountslist + ';',
        "Total": this.Totalpriceslist + ';',
        "Trans_date": "",
        "Last_Update": "",
        "condition": "Insert"
      }
      console.log(JSON.stringify(params))

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      console.log(params);
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)
        this.isPageloaderVisible = true;
        if (result.status_cd === "1") {
          console.log(result);

          console.log(result.data.Table[0].Invoiceno)
          var cinvoicenumber = result.data.Table[0].Invoiceno;
          alert("Invoice Generated Succesfully");
          //  this.nodata;

          this.router.navigate(['/AddPayment', { "invoicenum": cinvoicenumber }]);
        } else {
          this.isPageloaderVisible = true;
          alert("Please try again");

          // this.nodata = false;
        }
      },
      );
      error => {
        this.isPageloaderVisible = true;
        console.log(error);
        alert(error);
      }
    }
  }


  // GetProductDropdown() {

  //   var accessToken = window.localStorage.Tokenval;
  //   console.log(accessToken);
  //   this.isPageloaderVisible = true;

  //   var serviceUrl = this.cmn.commonUrl + "Account/Products_transactions"
  //   var params = {
  //     "sno": "",
  //     "Clinicid": this.userid,
  //     "Branchid": "",
  //     "Category": "",
  //     "Item_code": "",
  //     "Name": "",
  //     "Serial_number": "",
  //     "Supplier": "",
  //     "Price": "",
  //     "Tax": "",
  //     "Cost_price": "",
  //     "Stock_level": "",
  //     "Notes": "",
  //     "Tax_includes": "",
  //     "Loginid": "",
  //     "Trans_date": "",
  //     "Last_updated": "",
  //     "var1": "",
  //     "var2": "",
  //     "condition": "GetProduct"

  //   }

  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let options = new RequestOptions({ headers: headers });

  //   this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
  //     console.log(result);
  //     console.log(params)
  //     this.isPageloaderVisible = true;
  //     if (result.status_cd === "1") {

  //       this.productData = result.data.Table;
  //       console.log(this.productData)

  //       this.allInvoices.push({

  //         'select': this.productData,
  //         'selectType': 'Product',
  //         'Quantity': '',
  //         'Uprice': '',
  //         'Discount': '',
  //         "taxPercentage": 0,
  //         "taxrate": 0,
  //         "selectedValue": '',
  //         "idxdiscount": '',
  //         "idxtotal": '',

  //       });

  //       this.INVquantity.push("");
  //       this.INVentercost.push("");
  //       this.INVenterdiscount.push("");
  //       this.INVSelect.push('');

  //       this.AllErrors.push({
  //         'select': true,
  //         'quantity': true,
  //         'price': true
  //       });

  //       //  this.nodata;
  //     } else {
  //       this.isPageloaderVisible = true;
  //       this.productData = "";
  //       console.log("No Products Data Available");

  //       // this.nodata = false;
  //     }
  //   },
  //   );
  //   error => {
  //     this.isPageloaderVisible = true;
  //     console.log(error);
  //     alert(error);
  //   }

  // }

  GetAppointmentsData() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = true;

    var serviceUrl = this.cmn.commonUrl + "Account/Products_transactions"
    var params = {
      "sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Category": "",
      "Item_code": "",
      "Name": "",
      "Serial_number": "",
      "Supplier": "",
      "Price": "",
      "Tax": "",
      "Cost_price": "",
      "Stock_level": "",
      "Notes": "",
      "Tax_includes": "",
      "Loginid": "",
      "Trans_date": "",
      "Last_updated": "",
      "var1": "",
      "var2": "",
      "condition": "GetAppointments"

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
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        this.appointmentData = result.data.Table;
        console.log(this.appointmentData)

        this.allInvoices.push({

          'select': this.appointmentData,
          'selectType': 'Appointment',
          'Quantity': '',
          'Uprice': '',
          'Discount': '',
          "taxPercentage": 0,
          "taxrate": 0,
          "selectedValue": '',
          "idxdiscount": '',
          "idxtotal": '',

        });

        this.INVquantity.push("");
        this.INVentercost.push("");
        this.INVenterdiscount.push("");
        this.INVSelect.push('');

        this.AllErrors.push({
          'select': true,
          'quantity': true,
          'price': true
        });

      } else {
        this.isPageloaderVisible = true;
        this.appointmentData = "";
        console.log("No Appointments Data Found");

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }

  }

  GetTreatmentsData() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = true;

    var serviceUrl = this.cmn.commonUrl + "Account/Products_transactions"
    var params = {
      "sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Category": "",
      "Item_code": "",
      "Name": "",
      "Serial_number": "",
      "Supplier": "",
      "Price": "",
      "Tax": "",
      "Cost_price": "",
      "Stock_level": "",
      "Notes": "",
      "Tax_includes": "",
      "Loginid": "",
      "Trans_date": "",
      "Last_updated": "",
      "var1": "",
      "var2": "",
      "condition": "GetTreatments"

    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);

      this.isPageloaderVisible = false;
      if (result.status_cd === "1") {

        this.treatmentData = result.data.Table;
        console.log(this.treatmentData)
        //  this.nodata;
      } else {
        this.isPageloaderVisible = true;
        this.treatmentData = "";
        console.log("No Treatments Data Found");

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }

  }
  GetServicesData() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = true;

    var serviceUrl = this.cmn.commonUrl + "Account/Products_transactions"
    var params = {
      "sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Category": "",
      "Item_code": "",
      "Name": "",
      "Serial_number": "",
      "Supplier": "",
      "Price": "",
      "Tax": "",
      "Cost_price": "",
      "Stock_level": "",
      "Notes": "",
      "Tax_includes": "",
      "Loginid": "",
      "Trans_date": "",
      "Last_updated": "",
      "var1": "",
      "var2": "",
      "condition": "GetServices"

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
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        this.servicesData = result.data.Table;
        console.log(this.servicesData)
        //  this.nodata;
      } else {
        this.isPageloaderVisible = true;
        this.servicesData = "";
        console.log("No Services Data Found");

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }

  }

  ngDestroy() {
    console.log("Destroy");
    this.frompagename = "";
  }


  createpatient() {
    console.log("create patient");
    this.showpopup = false
  }

  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
  getAppointmentMainData() {
    console.log(this.tempApData);




    if (this.tempApData.length === this.indexCounter) {
      console.log('its done')
    } else {


      // for(let i =0; i<this.tempApData.length; i++){
      //   this.Ap_ipList = (this.tempApData[i].Ap_id) +',';
      //   this.listedApNames = this.tempApData[i].dt.split("-")[1];
      // }


      this.Ap_ipList = this.tempApData[this.indexCounter].Ap_id
      this.listedApNames = this.tempApData[this.indexCounter].dt.split("-")[1]
      // console.log(mainIds)

      //servicecall success 


      // this.getAppointmentMainData()
      // for(let i =0; i<this.tempApData.length; i++){
      //   this.Ap_ipList = (this.tempApData[i].Ap_id) +',';
      //   this.listedApNames = this.tempApData[i].dt.split("-")[1];
      // }
      // console.log(this.Ap_ipList, this.listedApNames);
      console.log(this.pid);
      console.log(this.doctempid)


      console.log("Selected Appointment");
      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);

      this.isPageloaderVisible = false;


      let url = this.cmn.commonUrl + "Account/Products_transactions"
      let params = {
        "sno": "", //this.Ap_ipList,
        "Clinicid": this.userid,
        "Branchid": "",
        "Category": "",
        "Item_code": this.listedApNames,  // this.listedApNames,
        "Name": "",
        "Serial_number": "",
        "Supplier": "",
        "Price": "",
        "Tax": "",
        "Cost_price": "",
        "Stock_level": "",
        "Notes": "Appointment",
        "Tax_includes": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_updated": "",
        "var1": this.pid,  //"0000198", //patient id
        "var2": this.doctempid,  //"37148072", //doctorid
        "condition": "Get_Iteminfo"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)
        this.isPageloaderVisible = true;
        if (result.status_cd === "1") {

          console.log(result.data.Table);




          this.allInvoices.push({
            'select': this.appointmentData,
            'selectType': 'Appointment',
            'Quantity': '',
            'Uprice': '',
            'Discount': '',
            "taxPercentage": 0,
            "taxrate": 0,
            "selectedValue": '',
            "idxdiscount": '',
            "idxtotal": '',
          })
          this.INVquantity.push('');
          this.INVentercost.push('');
          this.INVenterdiscount.push('');
          this.INVSelect.push('');

          var clkdqty = "1"
          var clkduprice = result.data.Table[0].Price
          var clkddiscount = result.data.Table[0].Discount;
          var clkdtaxpercent = result.data.Table[0].Tax;
          var clkdselectedValue = result.data.Table[0].Name;
          console.log(clkduprice, clkddiscount, clkdtaxpercent, clkdselectedValue)

          console.log(this.allInvoices);
          var index = this.indexCounter;
          console.log(this.indexCounter)
          console.log(index);

          this.allInvoices[index]['Quantity'] = clkdqty;
          this.allInvoices[index]['Uprice'] = clkduprice;
          this.allInvoices[index]['Discount'] = clkddiscount;
          // this.allInvoices[index]['taxPercentage'] = clkdtaxpercent;
          this.allInvoices[index]['selectedValue'] = clkdselectedValue;

          console.log(this.allInvoices);

          this.INVquantity[index] = clkdqty;
          this.INVentercost[index] = clkduprice;
          this.INVenterdiscount[index] = clkddiscount;
          this.INVSelect[index] = clkdselectedValue;

          // console.log(this.allInvoices[ this.indexCounter].selectedValue,
          //   this.allInvoices[ this.indexCounter].Quantity,
          //   this.allInvoices[ this.indexCounter].Uprice,
          //   this.allInvoices[ this.indexCounter].Discount);

          // for(let i=0; i<this.allInvoices.length; i++){

          //   console.log(this.allInvoices[i].selectedValue,
          //     this.allInvoices[i].Quantity,
          //     this.allInvoices[i].Uprice,
          //     this.allInvoices[i].Discount);


          // this.addinvoicefg.patchValue({
          //   selectdrop: this.allInvoices[ this.indexCounter].selectedValue,
          //   enterqty: this.allInvoices[ this.indexCounter].Quantity,
          //   entercost: this.allInvoices[ this.indexCounter].Uprice,
          //   enerdiscount: this.allInvoices[ this.indexCounter].Discount,

          // })
          // }


          var qty = this.allInvoices[this.indexCounter].Quantity
          var uprice = this.allInvoices[this.indexCounter].Uprice;
          var discount = this.allInvoices[this.indexCounter].Discount
          // var taxpercent = this.allInvoices[ this.indexCounter].taxPercentage;

          // selectdrop
          // updateInvoice(event, index, qty, uprice, discount, taxpercent)
          console.log(index)
          // this.AllErrors[index];
          this.updateInvoice("", index, qty, uprice, discount);
          this.indexCounter++;
          console.log(this.indexCounter);

          this.getAppointmentMainData()

        } else {
          this.isPageloaderVisible = true;
          console.log(result.data.Table);
          console.log("No data found.");

          // this.nodata = false;
        }
      },
      );
      error => {
        this.isPageloaderVisible = true;
        console.log(error);
        alert(error);
      }

    }



  }

  // ====================================selected appointments=======================
  SelectedAppointmentData(evnt) {
    this.indexCounter = 0;
    console.log(evnt.target.value)
    console.log(this.tempApData);



    if (this.tempApData.length > 1) {
      this.getAppointmentMainData()
      this.allInvoices.splice(0, 1);
      return;
    }
    for (let i = 0; i < this.tempApData.length; i++) {
      this.Ap_ipList = (this.tempApData[i].Ap_id) + ',';
      this.listedApNames = this.tempApData[i].dt.split("-")[1];
    }
    console.log(this.Ap_ipList, this.listedApNames);
    console.log(this.pid);
    console.log(this.doctempid)
    // for(let i = 0; i<this.Ap_ipList.length; i++){
    //   var Snolist = this.Ap_ipList[i];
    // }

    // console.log(Snolist);

    console.log("Selected Appointments");
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    this.isPageloaderVisible = false;


    let url = this.cmn.commonUrl + "Account/Products_transactions"
    let params = {
      "sno": "", //this.Ap_ipList,
      "Clinicid": this.userid,
      "Branchid": "",
      "Category": "",
      "Item_code": this.listedApNames,  // this.listedApNames,
      "Name": "",
      "Serial_number": "",
      "Supplier": "",
      "Price": "",
      "Tax": "",
      "Cost_price": "",
      "Stock_level": "",
      "Notes": "Appointment",
      "Tax_includes": "",
      "Loginid": "",
      "Trans_date": "",
      "Last_updated": "",
      "var1": this.pid,  //"0000198", //patient id
      "var2": this.doctempid,  //"37148072", //doctorid
      "condition": "Get_Iteminfo"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      console.log(params)
      this.isPageloaderVisible = true;
      if (result.status_cd === "1") {

        console.log(result.data.Table);


        this.allInvoices.push({
          'select': this.appointmentData,
          'selectType': 'Appointment',
          'Quantity': '',
          'Uprice': '',
          'Discount': '',
          "taxPercentage": 0,
          "taxrate": 0,
          "selectedValue": '',
          "idxdiscount": '',
          "idxtotal": '',
        })

        this.allInvoices.splice(0, 1);
        this.allInvoices = this.allInvoices.slice(0, 1)

        var clkdqty = "1"
        var clkduprice = result.data.Table[0].Price
        var clkddiscount = result.data.Table[0].Discount;
        var clkdtaxpercent = result.data.Table[0].Tax;
        var clkdselectedValue = result.data.Table[0].Name;
        console.log(clkduprice, clkddiscount, clkdtaxpercent, clkdselectedValue)

        console.log(this.allInvoices[0]);
        // console.log(this.allInvoices.selectType.length)
        var index = 0;

        this.INVquantity[index] = clkdqty;
        this.INVentercost[index] = clkduprice;
        this.INVenterdiscount[index] = clkddiscount;
        this.INVSelect[index] = clkdselectedValue;


        this.allInvoices[index]['Quantity'] = clkdqty;
        this.allInvoices[index]['Uprice'] = clkduprice;
        this.allInvoices[index]['Discount'] = clkddiscount;
        // this.allInvoices[index]['taxPercentage'] = clkdtaxpercent;
        this.allInvoices[index]['selectedValue'] = clkdselectedValue;

        console.log(this.allInvoices);
        console.log(this.allInvoices[0].selectedValue,
          this.allInvoices[0].Quantity,
          this.allInvoices[0].Uprice,
          this.allInvoices[0].Discount);
        this.addinvoicefg.patchValue({
          selectdrop: this.allInvoices[0].selectedValue,
          enterqty: this.allInvoices[0].Quantity,
          entercost: this.allInvoices[0].Uprice,
          enerdiscount: this.allInvoices[0].Discount,

        })

        var qty = this.allInvoices[0].Quantity
        var uprice = this.allInvoices[0].Uprice;
        var discount = this.allInvoices[0].Discount
        // var taxpercent = this.allInvoices[0].taxPercentage;

        // selectdrop
        // updateInvoice(event, index, qty, uprice, discount, taxpercent)
        this.updateInvoice("", index, qty, uprice, discount)

      } else {
        this.isPageloaderVisible = true;
        console.log(result.data.Table);
        console.log("No data found.");
        var index = 0;
        this.INVquantity[index] = '';
        this.INVentercost[index] = '';
        this.INVenterdiscount[index] = '';
        this.INVSelect[index] = '-Select-';

        // this.nodata = false;
      }
    },
    );
    error => {
      this.isPageloaderVisible = true;
      console.log(error);
      alert(error);
    }

  }



  CetContact() {
    this.modalReference = this.modalService.open(this.Ccontact, { centered: true });

  }


  createPatient() {
    console.log(this.createPatientfg.valid);
    
    if (this.createPatientfg.invalid == true) {
      this.fromsubmit = true;
      this.patientcheckValidationErrors(this.createPatientfg);
    } else {

      console.log(this.createPatientfg.value.title);
      console.log(this.createPatientfg.value.fname);
      console.log(this.createPatientfg.value.fathername);
      console.log(this.createPatientfg.value.lname);
      console.log(this.createPatientfg.value.engfname);
      console.log(this.createPatientfg.value.engmiddlename);
      console.log(this.createPatientfg.value.englastname);
      console.log(this.createPatientfg.value.dob);
      console.log(this.createPatientfg.value.gender);
      console.log(this.createPatientfg.value.mobile);
      console.log(this.createPatientfg.value.email);
      console.log(this.createPatientfg.value.remainder);
      console.log(this.createPatientfg.value.note);

      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);
      this.isPageloaderVisible = false;


      var serviceUrl = this.cmn.commonUrl + "Account/Patient_operations"
      var params = {
        "sno": "",
        "clinicid": this.userid,
        "loginid": this.userid,
        "patient_id": "",
        "Title": this.createPatientfg.value.title,
        "Ara_firstname": this.createPatientfg.value.fname,
        "Ara_Lastname": this.createPatientfg.value.lname,
        "Ara_fathername": this.createPatientfg.value.fathername,
        "First_name": this.createPatientfg.value.engfname,
        "Last_Name": this.createPatientfg.value.englastname,
        "Middle_name": this.createPatientfg.value.englastname,
        "DOB": this.createPatientfg.value.arabicDob,
        "DOB_Arabic": this.createPatientfg.value.EnglishDob,
        "Gender": this.createPatientfg.value.gender,
        "Marital_status": "",
        "Identification_type": "",
        "Identification_no": "2",
        "Identification_attachment": "",
        "Identification_Expiry": "",
        "Nationality": "",
        "Occupation": "testnotes",
        "Area": "0",
        "Block": "",
        "Building": "",
        "Street": "",
        "Floor": "",
        "City": "",
        "Country": "",
        "Email": this.createPatientfg.value.email,
        "Mobileno": this.createPatientfg.value.mobilenum,
        "Home_phone": "",
        "Work_phoneno": "",
        "Emergency_contact": "",
        "Notes": "",
        "Reminder_type": this.createPatientfg.value.remainder,
        "status": "Active",
        "Trans_date": "",
        "Last_update": "",
        "Condition": "Short_Registration",
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

      console.log(params)
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);

        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {

          console.log(result.data.Table);
          alert("Patient created successfully.")

          this.modalReference.close();


        } else {
          this.isPageloaderVisible = true;
          // console.log("Please try again.");
          alert("Please try again.");

        }
      },
      );
      error => {
        this.isPageloaderVisible = true;
        console.log(error);
        alert(error);
      }
    }

  }

  private getDismissReason(reason: any): string {
    // this.formErrors ={};


    // this.patientformErrors = {

    //   'title': '',
    //   'fname':'',
    //   'fathername':"",
    //   'lname': '',
    //   'engfname': '',
    //   'engmiddlename': '',
    //   'dob': '',
    //   "gender": '',
    //   'mobilenum': '',
    //   'email': '',
    //   'note': '',
    // }

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  arabic(event) {

    var arregex = /[\u0600-\u06FF]/;
    let inputChar = String.fromCharCode(event.charCode);
    //alert(arregex.test(text));
    if (!arregex.test(inputChar)) {
      alert("Please Enter Arabic Letters")
      event.preventDefault();
    }
  }

  arabicDate($event) {
    let DOB = $event.target.value;



    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "aratoengcalender",
      "id": DOB,
      "param1": "",
      "param2": ""
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //console.log(res)
      if (res.status_cd == "1") {

        this.arabicbinddate = res.data.Table[0].GregorianDate.split('T')[0]

      }
    });
    //})
    // this.test();
  }

  english($event) {
    let ADOB = $event.target.value;



    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "engtoaracalender",
      "id": ADOB,
      "param1": "",
      "param2": ""
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {

        this.binddate = res.data.Table[0].Hijridate
        console.log(this.binddate)
      }
    });
    //})
    // this.test();
  }

  datekeyup() {
    var mydate = this.addinvoicefg.value.date;
  }
  monthkeyup() {
    var mymonth = this.addinvoicefg.value.month;
  }
  yearkeyup() {
    var myyear = this.addinvoicefg.value.year;

    this.writeIslamicDate('');
  }

  gmod(n, m) {
    return ((n % m) + m) % m;
  }

  kuwaiticalendar(adjust) {
    var today = new Date('2019-04-10');
    if (adjust) {
      var adjustmili = 1000 * 60 * 60 * 24 * adjust;
      var todaymili = today.getTime() + adjustmili;
      today = new Date(todaymili);
    }
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var m = month + 1;
    var y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    var a = Math.floor(y / 100.);
    var b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) b = 0;
    if (y == 1582) {
      if (m > 10) b = -10;
      if (m == 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    var jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4.);
    }
    var bb = jd + b + 1524;
    var cc = Math.floor((bb - 122.1) / 365.25);
    var dd = Math.floor(365.25 * cc);
    var ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    if (adjust) {
      var wd = this.gmod(jd + 1 - adjust, 7) + 1;
    } else {
      wd = this.gmod(jd + 1, 7) + 1;
    }

    var iyear = 10631. / 30.;
    var epochastro = 1948084;
    var epochcivil = 1948085;

    var shift1 = 8.01 / 60.;

    var z = jd - epochastro;
    var cyc = Math.floor(z / 10631.);
    var z = z - 10631 * cyc;
    var j = Math.floor((z - shift1) / iyear);
    var iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    var im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    var id = z - Math.floor(29.5001 * im - 29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month - 1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd - 1; //julian day number
    myRes[4] = wd - 1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im - 1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
  }
  writeIslamicDate(adjustment) {
    var wdNames = new Array("Ahad", "Ithnin", "Thulatha", "Arbaa", "Khams", "Jumuah", "Sabt");
    var iMonthNames = new Array("Muharram", "Safar", "Rabi'ul Awwal", "Rabi'ul Akhir",
      "Jumadal Ula", "Jumadal Akhira", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhul Qa'ada", "Dhul Hijja");
    var iDate = this.kuwaiticalendar(adjustment);
    console.log(iDate)
    var outputIslamicDate = iDate[5] + "-" + iMonthNames[iDate[6]] + "-" + iDate[6] + "-" + iDate[7] + " AH";
    console.log(outputIslamicDate)
    return outputIslamicDate;
  }
  // console.log(writeIslamicDate("v"))


}

