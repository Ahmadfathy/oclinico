import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-eraddpatient',
  templateUrl: './eraddpatient.component.html',
  styleUrls: ['./eraddpatient.component.css']
})
export class EraddpatientComponent implements OnInit {
  // public dateTimeAdapter: DateTimeAdapter<any> 
  name: string;
  days: boolean = false
  titlea = ['اختار', 'السيد', 'الآنسة', 'السيدة', 'الآنسه', 'الدكتور', 'دكتور جامعى', 'المحترم'];
  matrial = ["Married", "Unmarried", "Single", "Widowed", "Divorced", "Separated ", "Registered partnership"]
  matriala = ["زوجت", "اعزب", "غير مرتبطة", "الأرامل", "مطلقة", "فصل", "شراكة مسجلة"]
  Occupationa = ['موظف', 'رجل اعمال', 'مزارع', 'طالب علم'];
  identificationa = ['بطاقة التعريف', 'رخصة قيادة', 'جواز سفر', 'الإقامة'];
  result: any = "";
  submitted = false;
  Gender: boolean;
  matrialstatus: boolean;
  both: boolean;
  countrys: any
  ocupation: any
  nullValue: any;
  RemainderSettings = {};
  title: any = [];
  communicate: any = [];
  identification: any = [];
  Nationality: any = [];
  Occupation: any = [];
  selectedItems = '';
  idType = this.nullValue;
  titleinput = this.nullValue;
  nationType = this.nullValue;
  occupType = this.nullValue;
  singledropdownSettings = {};
  fil: any;
  textbox: boolean = false;
  ptype: boolean = false;
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
  userid: any = ""
  profileimage: string = "";
  convertdate: string;
  binddate: any;
  arabicbinddate: any;
  binddateex: any;
  arabicbinddateex: any;
  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private fb: FormBuilder,
    private cmn: UserinfoService,
    private http: Http, private router: Router,
    public dateTimeAdapter: DateTimeAdapter<any>
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }


  ngOnInit() {

    //this.test()
    this.getcrete()



    document.title = "Add Patient"
    this.userid = window.localStorage.getItem("userId")
    // this.Gender = true
    //  this.both = true;
    // this.matrialstatus = true;
    this.getocupation()
    this.getcuntrys()
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
      firstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
      Afirstname: ['', Validators.required],
      Afathername: ['', Validators.required],
      Alastname: ['', Validators.required],
      gender: ['', Validators.required],
      maritalstatus: [''],
      DOB: [''],
      ADOB: [''],
      Area: ['', Validators.required],
      Block: [''],
      Building: [''],
      Street: [''],
      Floor: [''],
      City: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Home: [''],
      Work: [''],
      Emergencyphoneno: [''],
      Emergencycontact: [''],
      Notes: [''],
      idnumber: ['', Validators.required],
      iddate: [''],
      uploadidproof: [''],
      //nationType: new FormControl("", [ Validators.required ]),
      titleinput: ['', [Validators.required]],
      nationType: [''],
      occupType: [''],
      idType: ['', [Validators.required]],
      selectedItems: [''],
      arexdate: [' ']

    });

    this.patient.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.patient);
    });
  }
  get f() { return this.patient.controls; }
  onSubmit() {
    this.submitted = true;

  }
  //   // stop here if form is invalid
  //   if (this.patient.invalid) {
  //     return;
  //   }
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.patient.value))
  // }
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
        // console.log(abstractControl)
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

  getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }
  getcrete() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "Sno": "",
      "Patient_No": "100",
      "Appointment_No": "",
      "Invoice_No": "",
      "Cash_Reciept": "",
      "Expenses": "",
      "Trans_Date": "",
      "Login_Id": this.userid,
      "Clinicid": this.userid,
      "operation": "insert"
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/NumberSetting_Transactions";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //console.log(res)
      if (res.status_cd == "1") {
        this.ocupation = res.data.Table;
      }
    });
    //})
  }
  selectChangeHandler(event: any) {
    let patienttype = event.target.value;
    if (patienttype == "Student" || patienttype == "Employee" || patienttype == "OutPatient") {
      this.textbox = true
    } else {
      this.textbox = false
    }
    if (patienttype == "Select") {
      this.ptype = true;
    }
    else {
      this.ptype = false;
    }




  }



  cratepatient(op) {
    let patienttype = $("#patienttype").val();
    let registerid = $("#reg").val();
    let uploatprof = this.patient.value.uploadidproof
    //alert(this.result)
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
    let uploadidproof = this.patient.value.uploadidproof;
    //console.log(this.patient.value.DOB)

    let DOB = this.patient.value.DOB;

    //   let d=DOB.getFullYear();
    //   let e=DOB.getMonth()+1;
    //   let f=DOB.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }

    // let EnglishDob=f+"/"+e+"/"+d









    let nationType = this.patient.value.nationType;
    let occupType = this.patient.value.occupType;

    let idType = this.patient.value.idType;
    let idnumber = this.patient.value.idnumber;

    let exiddate = this.patient.value.iddate;
    //   let a=exiddate.getFullYear();
    //   let b=exiddate.getMonth()+1;
    //   let c=exiddate.getDate(); 
    //   if(b.toString().length===1){
    //     b='0'+b
    //   }

    // let idexperdate=c+"/"+b+"/"+a












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











    if (gender == "" || this.patient.invalid) {
      this.Gender = false;


      return;
    }
    else {

      this.Gender = true;

    }
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


    var accessToken = window.localStorage.Tokenval;
    let url = this.cmn.commonUrl + 'Account/Patient_operations'
    let body = {
      "sno": patienttype,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": "",
      "Title": titleinput,
      "Ara_firstname": Afirstname,
      "Ara_Lastname": Alastname,
      "Ara_fathername": Afathername,
      "First_name": firstName,
      "Last_Name": LastName,
      "Middle_name": MiddleName,
      "DOB": DOB,
      "DOB_Arabic": "",
      "Gender": gender,
      "Marital_status": maritalstatus,
      "Identification_type": idType,
      "Identification_no": idnumber,
      "Identification_attachment": this.result,
      "Identification_Expiry": "",
      "Nationality": nationType,
      "Occupation": occupType || "",
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
      "Trans_date": registerid || "",
      "Last_update": this.profileimage,
      "Condition": "Insert",
      "Par1": "",
      "Par2": exiddate,
      "Par3": ""
    }

    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //  console.log(res)
      if (res.status_cd === "1") {
        alert("Patient Successfully Added")


        //  console.log(res.data.Table[0].patient_id);
        //    this.router.navigate(['/Patientinfo']);
        if (op === 'save') {

        } else {
          localStorage.setItem('newpatientId', res.data.Table[0].patient_id);
          this.router.navigate(['/daypatientinfo']);
        }


      }
      else {
        alert("Email/Mobile number already existed.")
        // console.log("error")
      }
      err => {
        //  console.log("ERROR!: ", err);
      }
    })


    // })



  }
  focusout(val) {
    if (val == "") {
      this.Gender = false;
      return false;
    } else {
      this.Gender = true;
    }
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
    // })
  }
  addbilling() {
  }


  fileup($event) {
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
    this.http.post(url, formData, options).subscribe((res) => {
      // console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.result = body[0]

    });
    //})
  }
  validate() {

  }

  fileupload($event) {
    let uploatprof = this.patient.value.uploadidproof
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
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.profileimage = body[0]

    });
    //})
  }
  //   sample(){

  //     let Time=this.patient.value.DOB;
  //     alert(Time)
  //       let  day = Time.getDate();
  //       let month = Time.getMonth();
  //       let year = Time.getFullYear();
  //       let m = month+1;
  //       let  y = year;
  //       if(m<3) {
  //           y -= 1;
  //           m += 12;
  //       }

  //       let a = Math.floor(y/100.);
  //       let b = 2-a+Math.floor(a/4.);
  //       if(y<1583) b = 0;
  //       if(y==1582) {
  //           if(m>10)  b = -10;
  //           if(m==10) {
  //               b = 0;
  //               if(day>4) b = -10;
  //           }
  //       }

  //       let jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

  //       b = 0;
  //       if(jd>2299160){
  //           a = Math.floor((jd-1867216.25)/36524.25);
  //           b = 1+a-Math.floor(a/4.);
  //       }
  //       let bb = jd+b+1524;
  //       let  cc = Math.floor((bb-122.1)/365.25);
  //       let  dd = Math.floor(365.25*cc);
  //       let  ee = Math.floor((bb-dd)/30.6001);
  //       day =(bb-dd)-Math.floor(30.6001*ee);
  //       month = ee-1;
  //       if(ee>13) {
  //           cc += 1;
  //           month = ee-13;
  //       }
  //       year = cc-4716;




  //       let  iyear = 10631./30.;
  //       let  epochastro = 1948084;
  //       let  epochcivil = 1948085;

  //       let  shift1 = 8.01/60.;

  //       let  z = jd-epochastro;
  //       let cyc = Math.floor(z/10631.);
  //       z = z-10631*cyc;
  //       let  j = Math.floor((z-shift1)/iyear);
  //       let  iy = 30*cyc+j;
  //       z = z-Math.floor(j*iyear+shift1);
  //       let  im = Math.floor((z+28.5001)/29.5);
  //       if(im==13) im = 12;
  //       let  id = z-Math.floor(29.5001*im-29);

  //       var myRes = new Array(8);

  //     myRes[0] = day; //calculated day (CE)
  //       myRes[1] = month-1; //calculated month (CE)
  //       myRes[2] = year; //calculated year (CE)
  //       myRes[3] = jd-1; //julian day number

  //     let aday=  myRes[5] = id; //islamic date
  //     let amonth=  myRes[6] = im; //islamic month
  //     let ayear=  myRes[7] = iy; //islamic year
  //   this. convertdate =aday+"/"+amonth+"/"+ayear;
  //   alert(this.convertdate)
  //   var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  // console.log(date.toLocaleDateString('ar'));
  //       return myRes;
  //       }

  english($event) {
    let ADOB = $event.target.value;
    //console.log(ADOB)

    //alert(ADOB)
    //   let d=DOB.getFullYear();
    //   let e=DOB.getMonth()+1;
    //   let f=DOB.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }

    // let EnglishDob=d+"-"+e+"-"+f



    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


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

  englishex($event) {
    let EDOB = $event.target.value;


    //alert(ADOB)
    //   let d=DOB.getFullYear();
    //   let e=DOB.getMonth()+1;
    //   let f=DOB.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }

    // let EnglishDob=d+"-"+e+"-"+f



    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

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
      //console.log(res)
      if (res.status_cd == "1") {

        this.binddateex = res.data.Table[0].Hijridate
        // console.log(this.binddate)
      }
    });
    //})
    // this.test()
  }


  arabice($event) {
    let DOB = $event.target.value;
    // alert(DOB)
    //   let d=DOB.getFullYear();
    //   let e=DOB.getMonth()+1;
    //   let f=DOB.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }

    // let EnglishDob=d+"-"+e+"-"+f

    //   alert(EnglishDob)

    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


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
  arabicex($event) {
    let ADOB = $event.target.value;
    // alert(DOB)
    //   let d=DOB.getFullYear();
    //   let e=DOB.getMonth()+1;
    //   let f=DOB.getDate(); 
    //   if(e.toString().length===1){
    //     e='0'+e
    //   }

    // let EnglishDob=d+"-"+e+"-"+f

    //   alert(EnglishDob)

    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

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

        this.arabicbinddateex = res.data.Table[0].GregorianDate.split('T')[0]

      }
    });
    //})
    //this.test();
  }


  // test(){
  //   var isShift = false;
  //   var seperator = "/";
  //   window.onload = function () {
  //       //Reference the Table.
  //       var tblForm = document.getElementById("tblForm");

  //       //Reference all INPUT elements in the Table.
  //       var inputs = <HTMLCollection>document.getElementsByClassName("DATE");



  //       //Loop through all INPUT elements.
  //       for (var i = 0; i < inputs.length; i++) {
  //           //Check whether the INPUT element is TextBox.
  //           var input=<HTMLInputElement>inputs[i];
  //           if (input.type == "text") {
  //               //Check whether Date Format Validation is required.
  //               if (input.className.indexOf("date-format") != 1) {

  //                   //Set Max Length.
  //                   inputs[i].setAttribute("maxlength","10");

  //                   //Only allow Numeric Keys.
  //                   input.onkeydown = function (e) {
  //                       return IsNumeric(this, e.keyCode);
  //                   };

  //                   //Validate Date as User types.
  //                   input.onkeyup = function (e) {
  //                       ValidateDateFormat(this, e.keyCode);
  //                   };
  //               }
  //           }
  //       }
  //   };

  //   function IsNumeric(input, keyCode) {
  //       if (keyCode == 16) {
  //           isShift = true;
  //       }
  //       //Allow only Numeric Keys.
  //       if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {
  //           if ((input.value.length == 2 || input.value.length == 5) && keyCode != 8) {
  //               input.value += seperator;
  //           }

  //           return true;
  //       }
  //       else {
  //           return false;
  //       }
  //   };

  //   function ValidateDateFormat(input, keyCode) {
  //       var dateString = input.value;
  //       if (keyCode == 16) {
  //           isShift = false;
  //       }
  //       var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;

  //       //Check whether valid dd/MM/yyyy Date Format.
  //       if (regex.test(dateString) || dateString.length == 0) {
  //           ShowHideError(input, "none");
  //       } else {
  //           ShowHideError(input, "block");
  //       }
  //   };

  //   function ShowHideError(textbox, display) {
  //       var row = textbox.parentNode.parentNode;
  //       var errorMsg = row.getElementsByTagName("span")[0];
  //       if (errorMsg != null) {
  //           errorMsg.style.display = display;
  //       }
  //   };
  // }


}