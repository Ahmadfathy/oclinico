

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit {
  matrial = ["Married", "Unmarried", "Single", "Widowed", "Divorced", "Separated "];
  titlea = ['السيد', 'الآنسة', 'السيدة', 'يغيب', 'دكتور', 'دكتور جامعى', 'سيدي المحترم'];
  matriala = ["زوجت", "اعزب", "غير مرتبطة", "الأرامل", "مطلقة", "فصل"];
  identificationa = ['بطاقة التعريف', 'رخصة قيادة', 'جواز سفر', 'الإقامة'];
  countrys = []
  file: any = ""
  ocupation = []
  name: string;
  submitted = false;
  Gender: boolean;
  matrialstatus: boolean;
  both: boolean;
  patientid: any;
  nullValue: any;
  RemainderSettings = {};
  title: any = [];
  communicate: any = [];
  identification: any = [];
  Nationality: any = [];
  Occupation: any = [];
  selectedItems = '';
  idType: any
  titleinput: any
  nationType: any = ""
  occupType: string = '';
  textbox: boolean = false;
  singledropdownSettings = {};
  reminder = ["None", "SMS", "Email", "Both"]
  patient: FormGroup;

  ValidationMessages = {
    'titleinput': {
      'required': 'Title is required',
    },
    'nationType': {
      'required': 'Nationality is required'
    },
    'occupType': {
      'required': 'Occupation is required'
    },
    'idType': {
      'required': 'Identification is required'
    },
    'firstname': {
      'required': 'Firstname is required'
    }

  }

  formErrors = {
    'titleinput': '',
    'nationType': '',
    'occupType': '',
    'idType': '',
    'firstname': ''
  }
  firstName: any
  MiddleName: any
  LastName: any
  Afirstname: any
  Afathername: any
  Alastname: any
  idnumber: any
  iddate: any
  gender: any
  maritalstatus: any
  DOB: any
  ADOB: any
  Area: any
  Block: any
  Building: any
  Street: any
  Floor: any
  City: any
  Email: any
  Mobile: any
  Home: any
  Work: any
  Emergencyphoneno: any
  Emergencycontact: any
  Notes: any
  uploadidproof: any
  days: boolean = false
  // titleinput: any
  // nationType: any
  // occupType: any
  // idType: any
  // selectedItems: any
  userid: any
  imageVal: any;
  profileimage: string = "";
  profil: any;
  arabicbinddateex: any;
  arabicbinddate: any;
  binddateex: any;
  binddate: any;
  ptype: boolean = false;
  mydate: string;
  mydateAr: string;
  mydateenglishex: string;
  mydateARex: string;
  Dobdate: any;
  Dobdateex: void;
  showLoader: boolean;
  patient_name: any;

  constructor(private MainTitle: Title,
    private fb: FormBuilder,
    private cmn: UserinfoService,
    private http: Http,
    private router: Router,
    public dateTimeAdapter: DateTimeAdapter<any>
  ) { }


  ngOnInit() {
    //this.test();
    document.title = "Edit Patient"
    this.userid = window.localStorage.getItem("userId")
    this.getocupation()
    this.getcuntrys()
    var url = document.URL
    var url1 = url.split('?')
    this.patientid = url1[1].split('=')[1]
    this.getdata()
    sessionStorage.setItem('editpatinetid', this.patientid);
    this.patient_name = sessionStorage.patient_name;
    this.Gender = true
    this.both = true;
    this.matrialstatus = true
    this.MainTitle.setTitle('Patient Details | Oclinico');
    this.title = ['Mr', 'Ms', 'Mrs', 'Miss', 'Dr', 'Professor', 'Sir'];
    this.communicate = ['Email', 'SMS'];
    this.identification = ['ID Card', 'Driving Licence', 'Passport', 'Iqama'];
    this.Nationality = ['Indian'];
    this.Occupation = ['Employee', 'Business Man', 'Farmer', 'Student'];
    this.RemainderSettings = {
      singleSelection: false,
      selectAllText: 'Both',
      unSelectAllText: 'None',
      allowSearchFilter: false
    };

    this.patient = this.fb.group({
      firstName: ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Afirstname: ['', [Validators.required]],
      Afathername: ['', [Validators.required]],
      Alastname: ['', [Validators.required]],
      idnumber: ['', [Validators.required]],
      iddate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      maritalstatus: [''],
      DOB: [''],
      ADOB: [''],
      Area: ['', [Validators.required]],
      Block: [''],
      Building: [''],
      Street: [''],
      Floor: [''],
      City: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Home: [''],
      Work: [''],
      rege: [''],
      Emergencyphoneno: [''],
      Emergencycontact: [''],
      Notes: [''],
      uploadidproof: [''],
      //nationType: new FormControl("", [ Validators.required ]),
      titleinput: ['', [Validators.required]],
      nationType: [''],
      occupType: [''],
      arexdate: [''],
      idType: ['', [Validators.required]],
      selectedItems: [''],


    });

    // this.patient.valueChanges.subscribe((data) => {
    //   this.checkValidationErrors(this.patient);
    // });
  }




  val(val: any) {
    throw new Error("Method not implemented.");
  }
  get f() { return this.patient.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.patient.invalid) {
      return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.patient.value))
  }
  checkValidationErrors(group: FormGroup = this.patient): void {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
          // console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        //console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }




  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  // onEmpCreate(){

  // this.initialData.push.apply(this.name,this.empoloyeeID);
  // this.name ="";
  // this.empoloyeeID = 0;
  // }

  // selectChangeHandler(event: any) {
  //   let patienttype=event.target.value;
  // if(patienttype=="Student"||patienttype=="Employee"||patienttype=="OutPatient"){
  //  this.textbox=true
  // }else{
  //   this.textbox=false
  // }
  // if(patienttype=="Select"){
  //  this.ptype=true;
  // }
  // else{
  //   this.ptype=false;
  // }




  // }


  sample() {
    let genderValue = this.patient.value.gender;
    let maritalstatus = this.patient.value.maritalstatus;
    let both = this.patient.value.selectedItems;


    if (genderValue == "" || maritalstatus == "" || both == "") {
      this.Gender = false;
      this.matrialstatus = false;
      this.both = false;


    }
    else {

      this.Gender = true;
      this.matrialstatus = true;
      this.both = true
    }


  }
  getdata() {

    //service call
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


    var accessToken = window.localStorage.Tokenval;
    //console.log(accessToken);

    // our service calling as usual
    let url = this.cmn.commonUrl + "Account/Patient_operations"
    let body = {
      "sno": this.patientid,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": this.patientid,
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
      "Condition": "GetDate",
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

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {

      console.log(res)
      if (res.status_cd == "1") {




        //alert(this.patient.controls.titleinput.patchValue(res.data.Table[0].Title)) 
        this.patient.controls.titleinput.patchValue(res.data.Table[0].Title)
        this.patient.controls.firstName.patchValue(res.data.Table[0].First_name)
        this.patient.controls.LastName.patchValue(res.data.Table[0].Last_Name)
        this.patient.controls.MiddleName.patchValue(res.data.Table[0].Middle_name)
        this.patient.controls.Afirstname.patchValue(res.data.Table[0].Ara_firstname)
        this.patient.controls.Afathername.patchValue(res.data.Table[0].Ara_fathername)
        this.patient.controls.Alastname.patchValue(res.data.Table[0].Ara_Lastname)
        // this.patient.controls.uploadidproof.patchValue(res.data.Table[0].filepath)
        this.imageVal = res.data.Table[0].Identification_attachment;
        this.profil = res.data.Table[0].filepath;
        this.patient.controls.gender.patchValue(res.data.Table[0].Gender)
        this.patient.controls.maritalstatus.patchValue(res.data.Table[0].Marital_status);


        // var DOB = res.data.Table[0].DOB.split('/');

        // var b = DOB[2] + '-' + DOB[1] + '-' + DOB[0]
        // b.toString()


        this.patient.controls.DOB.patchValue(res.data.Table[0].DOB)
        //.split('T')[0])







        //var date = res.data.Table[0].DOB_Arabic.split('/');

        // var arMonth = date[1]
        // var arDay = date[0]
        // if(arMonth.length === 1) {
        //   arMonth = '0' + arMonth
        // }

        // if(arDay.length === 1) {
        //   arDay = '0' + arDay
        // }

        // console.log(date[2] + '-' + arMonth + '-' + arDay)
        // var arad = date[2] + '-' + arMonth + '-' + arDay
        // arad.toString()
        // this.patient.controls.ADOB.patchValue(arad)
        // if (date[0].length === 1) {

        //   date[0] = '0' + date[0];

        // }

        // if (date[1].length === 1) {

        //   date[1] = '0' + date[1];

        // }


        // var dateComplete = date[2] + '-' + date[1] + '-' + date[0]
        // console.log(dateComplete)


        // this.patient.controls.ADOB.patchValue(dateComplete)
        this.patient.controls.idType.patchValue(res.data.Table[0].Identification_type)
        this.patient.controls.idnumber.patchValue(res.data.Table[0].Identification_no)


        //var date1 = res.data.Table[0].Expiry1.split('/');
        // var Expirdate = date1[2] + '-' + date1[1] + '-' + date1[0]
        // Expirdate.toString()
        // if (date[0].length === 1) {

        //   date[0] = '0' + date[0];

        // }

        // if (date[1].length === 1) {

        //   date[1] = '0' + date[1];

        // }










        this.patient.controls.iddate.patchValue(res.data.Table[0].Expiry)
        //.split('T')[0])










        this.patient.controls.nationType.patchValue(res.data.Table[0].Nationality)

        this.patient.controls.occupType.patchValue(res.data.Table[0].Occupation_Name)
        //this.patient.controls.uploadidproof.patchValue(res.data.Table[0].Identification_attachment)
        //console.log(this.patient.controls)
        this.patient.controls.Area.patchValue(res.data.Table[0].Area)
        this.patient.controls.Block.patchValue(res.data.Table[0].Block)
        this.patient.controls.Building.patchValue(res.data.Table[0].Building)
        this.patient.controls.Street.patchValue(res.data.Table[0].Street)
        this.patient.controls.Floor.patchValue(res.data.Table[0].Floor)
        this.patient.controls.City.patchValue(res.data.Table[0].City)
        this.patient.controls.Email.patchValue(res.data.Table[0].Email)
        //this.patient.controls.Mobile.patchValue(res.data.Table[0].Mobileno)
        // alert(res.data.Table[0].Mobileno)
        this.patient.controls.Mobile.patchValue(res.data.Table[0].Mobileno)
        this.patient.controls.Home.patchValue(res.data.Table[0].Home_phone)
        this.patient.controls.Work.patchValue(res.data.Table[0].Work_phoneno)
        this.patient.controls.Emergencycontact.patchValue(res.data.Table[0].Emergency_Name)
        this.patient.controls.Emergencyphoneno.patchValue(res.data.Table[0].Emergency_contact)
        this.patient.controls.Notes.patchValue(res.data.Table[0].Notes)
        this.patient.controls.rege.patchValue(res.data.Table[0].sno)
        this.patient.controls.selectedItems.patchValue(res.data.Table[0].Reminder_type)
        this.Dobdate = (res.data.Table[0].DOB)
        this.Dobdateex = (res.data.Table[0].Expiry)
        this.englishbinddate()
        this.englishbindateexper()
      } else {

      }
    })




    //}),
    err => {
      console.log("Token Error:" + err);
    }

  }


  // getDateFormatService(date){
  // date = date.split('-');
  // return date[2] + '/' + date[1] + '/' + date[0];
  // }

  getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }

  updatepatient(op) {
    //alert(this.profileimage)
    // let fi = $('.f').val()
    // if (fi == undefined || fi == null || fi == "") {
    //   this.days = true
    //   return
    // }
    // else { this.days = false }

    var url = document.URL
    var url1 = url.split('?')
    var patientid = url1[1].split('=')[1]
    // alert(patientid)
    // let genderValue = this.patient.value.gender;
    let maritalstatus = this.patient.value.maritalstatus;
    let both = this.patient.value.selectedItems;
    let titleinput = this.patient.value.titleinput;
    let firstName = this.patient.value.firstName

    let LastName = this.patient.value.LastName;
    let MiddleName = this.patient.value.MiddleName;
    let Afirstname = this.patient.value.Afirstname;
    let Afathername = this.patient.value.Afathername;
    let Alastname = this.patient.value.Alastname;


    let gender = this.patient.value.gender;
    //let uploadidproof = this.patient.value.uploadidproof;

    //let DOB = this.patient.value.DOB;
    //console.log( this.patient.value.DOB)
    // let mainDobSend = this.patient.value.DOB.toDateString();


    //  let mainDobSend = this.patient.value.DOB;
    //   let dob = mainDobSend.split('-')
    //   //let dobe=this.getMonthFromString(dob[1])
    //   let maindob = dob[2] + '/' + dob[1] +  '/' +dob[0]
    //    console.log(maindob)
    //   let sendDob = mainDobSend.split(' ');
    //   let mainMonth = this.getMonthFromString(sendDob[1])
    //   let entireDob = sendDob[2] + '/' + mainMonth + '/' + sendDob[3]
    //console.log(entireDob)




    // let ADOB = this.patient.value.ADOB.toDateString();
    //  let ADOB = this.patient.value.ADOB;
    //   let ad = ADOB.split(' ')
    //   //let admonth=this.getMonthFromString(ad[1])
    //   let adob = ad[2] + '/' +ad[1] + '/' + ad[0]






    //   let mainEnglishDob = this.patient.value.DOB;
    //   let a=mainEnglishDob.getFullYear();
    //   let b=mainEnglishDob.getMonth()+1;
    //   let c=mainEnglishDob.getDate()+1; 
    //   if(b.toString().length===1){
    //     b='0'+b
    //   }
    //   if(c.toString().length===1){
    //     c='0'+c
    //   }
    // let englishdob=c+"/"+b+"/"+a;

    //if(this.patient.value.DOB.toString().includes('India Standard Time')) {

    let englishdob = this.patient.value.DOB
    //   let a=englishdob.getFullYear();
    //   let b=englishdob.getMonth()+1;
    //   let c=englishdob.getDate(); 
    //   if(b.toString().length===1){
    //     b='0'+b
    //   }

    //   var EnglisDob=c+"/"+b+"/"+a;

    // } else {
    //   var EnglisDob = this.patient.value.DOB.split('-')[2] + '/' + this.patient.value.DOB.split('-')[1] + '/' + this.patient.value.DOB.split('-')[0]
    // }
    //console.log(EnglisDob)











    //if(this.patient.value.iddate.toString().includes('India Standard Time')) {

    let mainExpiryId = this.patient.value.iddate
    //   let d=mainExpiryId.getFullYear();
    //   let e=mainExpiryId.getMonth()+1;
    //   let f=mainExpiryId.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }
    //   if(f.toString().length===1){
    //     f='0'+f
    //   }
    //   var idexpirdate=f+"/"+e+"/"+d;

    // } else {
    //   var idexpirdate = this.patient.value.iddate.split('-')[2] + '/' + this.patient.value.iddate.split('-')[1] + '/' + this.patient.value.iddate.split('-')[0]
    // }

    // console.log(idexpirdate)



    //     let sendExpiryDate;
    //     console.log(this.patient.value.iddate)
    // if(this.patient.value.iddate.toString().includes('India Standard Time')) {

    //   var mainExMonth = (new Date(mainExpiryId).getMonth() + 1).toString();
    //   var mainExDay = (new Date(mainExpiryId).getDate()).toString();
    //   if(mainExMonth.toString().length === 1) {
    //     mainExMonth = '0' + mainExMonth.toString()
    //   }

    //   if(mainExDay.toString().length === 1) {
    //     mainExDay = '0' + mainExDay.toString()
    //   }
    //   //sendExpiryDate = new Date(mainExpiryId).getFullYear() + '-' + mainExMonth + '-' + mainExDay;
    //    sendExpiryDate=mainExDay+'/'+mainExMonth +'/'+ new Date(mainExpiryId).getFullYear() 
    //   mainExpiryId = sendExpiryDate
    // } else {

    // }
    //   alert(sendExpiryDate)
    //     console.log(mainExpiryId)




    let nationType = this.patient.value.nationType;
    this.occupType = this.patient.value.occupType;

    let idType = this.patient.value.idType;
    let idnumber = this.patient.value.idnumber;









    let Area = this.patient.value.Area;
    let Block = this.patient.value.Block;
    let Building = this.patient.value.Building;
    let Street = this.patient.value.Street;
    let Floor = this.patient.value.Floor;
    let City = this.patient.value.City;
    let Email = this.patient.value.Email;

    let Mobile = this.patient.value.Mobile;
    let Home = this.patient.value.Home;
    let Work = this.patient.value.Work;
    let Emergencyphoneno = this.patient.value.Emergencyphoneno;
    let Emergencycontact = this.patient.value.Emergencycontact;
    let Notes = this.patient.value.Notes;
    let selectedItems = this.patient.value.selectedItems;


    let reg = this.patient.value.rege;

    if (gender == "" || this.patient.invalid) {
      this.Gender = false;
      console.log(this.patient)

      return;
    }
    else {

      this.Gender = true;

    }

    if (this.profileimage == "" || this.profileimage == undefined) {
      this.profileimage = this.profil;
    }
    if (this.file == "" || this.file == undefined) {
      this.file = this.imageVal;
    }
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let urL = this.cmn.commonUrl + 'Account/Patient_operations';
    let body = {
      "sno": patientid,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": reg,
      "Title": titleinput,
      "Ara_firstname": Afirstname,
      "Ara_Lastname": Alastname,
      "Ara_fathername": Afathername,
      "First_name": firstName,
      "Last_Name": LastName,
      "Middle_name": MiddleName,
      "DOB": englishdob,
      "DOB_Arabic": '',
      "Gender": gender,
      "Marital_status": maritalstatus,
      "Identification_type": idType,
      "Identification_no": idnumber,
      "Identification_attachment": this.file,
      "Identification_Expiry": mainExpiryId,
      "Nationality": nationType,
      "Occupation": this.occupType || '',
      "Area": Area,
      "Block": Block,
      "Building": Building,
      "Street": Street,
      "Floor": Floor,
      "City": City,
      "Country": nationType,
      "Email": Email,
      "Mobileno": Mobile,
      "Home_phone": Home,
      "Work_phoneno": Work,
      "Emergency_contact": Emergencyphoneno,
      "Notes": Notes,
      "Reminder_type": selectedItems,
      "status": "Active",
      "Trans_date": "",
      "Last_update": this.profileimage,
      "Condition": "Update",
      "Par1": "",
      "Par2": "Sagar",
      "Par3": "16/05/1444"

    }

    // console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(urL, body, options).map(res => res.json()).subscribe(res => {
      // console.log(res)
      if (res.status_cd === "1") {
        alert("Successfully Updated")
        //this.router.navigate(['/Patientinfo']);
        if (op === 'save') {

        } else {
          localStorage.setItem('newpatientId', res.data.Table[0].patient_id);
          this.router.navigate(['/billing']);
        }


      }
      else {
        alert(" mobile no  OR Email id existed")
        // console.log("error")
      }

    })
    err => {
      console.log("ERROR!: ", err);
    }

    //})



  }


  focusout(val) {
    if (val == "") {
      this.Gender = false;
      return false;
    } else {
      this.Gender = true;
    }
  }
  getcuntrys() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {}
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/Get_Countries";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //console.log(res)
      if (res.status_cd == "1") {
        this.countrys = res.data.Table;
      }
    });
    //})
  }

  getocupation() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "GetOccupation",
      "id": this.userid,
      "param1": "",
      "param2": ""
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //console.log(res)
      if (res.status_cd == "1") {
        this.ocupation = res.data.Table;
      }
    });
    //})
  }
  cancel() {
    // var Refrral = localStorage.getItem('patientId')
    // alert(this.patientid)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral: this.patientid } });
  }
  fileup($event) {

    let fileSelected = $event.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    //console.log(body)
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
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      // console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.file = body[0]
      // console.log(this.file = body[0])
    });
    // })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  alpha(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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
  fileupload($event) {
    let uploatprof = this.patient.value.uploadidproof
    let fileSelected = $event.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    //console.log(body)
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
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.showLoader = true;
    this.http.post(url, formData, options).subscribe((res) => {
      // console.log(res)
      setTimeout(() => {
        let body: string = JSON.parse(res['_body']);
        this.profileimage = body[0];
        this.showLoader = false
      }, 1000);

    });
    //})
  }
  arabice($event) {
    let DOB = $event.target.value;
    if (DOB.length == "") {
      $('#cleara').val('')
    }
    if (DOB.length == 10) {

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
          $("#cleara").val(res.data.Table[0].GregorianDate.split('T')[0]);
          this.arabicbinddate = res.data.Table[0].GregorianDate.split('T')[0]

        }
      });
    }
    //})
    //this.test()
  }
  arabicex($event) {
    let ADOB = $event.target.value;
    if (ADOB.length == "") {
      $('#englishexper').val('')
    }
    if (ADOB.length == 10) {



      var accessToken = window.localStorage.Tokenval;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let body = {
        "text": "aratoengcalender",
        "id": ADOB,
        "param1": "",
        "param2": ""
      }
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl + "Account/GetUser";
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        // console.log(res)
        if (res.status_cd == "1") {
          $("#englishexper").val(res.data.Table[0].GregorianDate.split('T')[0]);
          this.arabicbinddateex = res.data.Table[0].GregorianDate.split('T')[0]

        }
      });
    }
    //})
    //this.test()
  }

  //onload purpuse
  englishbinddate() {

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "engtoaracalender",
      "id": this.Dobdate,
      "param1": "",
      "param2": ""
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //console.log(res)
      if (res.status_cd == "1") {
        this.patient.controls.ADOB.patchValue(res.data.Table[0].Hijridate)
        // console.log(this.binddate)
      }
    });


    //})
    // this.test()
  }
  englishbindateexper() {



    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "engtoaracalender",
      "id": this.Dobdateex,
      "param1": "",
      "param2": ""
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      // console.log(res)
      if (res.status_cd == "1") {

        this.patient.controls.arexdate.patchValue(res.data.Table[0].Hijridate)
      }
    });

    // })
    // this.test()
  }
  //onload end date bind

  english(event) {

    let ADOB = event.target.value;
    if (ADOB.length == "") {
      $('#clear').val('')
    }

    if (ADOB.length == 10) {

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
        //console.log(res)
        if (res.status_cd == "1") {
          let time = res.data.Table;
          $("#clear").val(res.data.Table[0].Hijridate);
          this.binddate = res.data.Table[0].Hijridate
          //this.patient.controls.ADOB.patchValue(res.data.Table[0].Hijridate)
          // console.log(this.binddate)
        }
      });

    }
    //})
    // this.test()
  }

  englishex(event) {
    let EDOB = event.target.value;


    if (EDOB.length == "") {
      $('#clearexper').val('')
    }
    if (EDOB.length == 10) {


      var accessToken = window.localStorage.Tokenval;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let body = {
        "text": "engtoaracalender",
        "id": EDOB,
        "param1": "",
        "param2": ""
      }
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl + "Account/GetUser";
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        // console.log(res)
        if (res.status_cd == "1") {
          $("#clearexper").val(res.data.Table[0].Hijridate);
          this.binddateex = res.data.Table[0].Hijridate
          //this.patient.controls.arexdate.patchValue(res.data.Table[0].Hijridate)
        }
      });
    }
    // })
    // this.test()
  }

  dateslash(val) {
    if (val == 2) {
      this.mydate += '/';
    } else if (val == 5) {
      this.mydate += '/';
    }

  }



  dateslasharabic(val) {
    if (val == 2) {
      this.mydateAr += '/';
    } else if (val == 5) {
      this.mydateAr += '/';
    }

  }

  dateslashenglishex(val) {
    if (val == 2) {
      this.mydateenglishex += '/';
    } else if (val == 5) {
      this.mydateenglishex += '/';
    }

  }

  dateslashArex(val) {
    if (val == 2) {
      this.mydateARex += '/';
    } else if (val == 5) {
      this.mydateARex += '/';
    }

  }


}
