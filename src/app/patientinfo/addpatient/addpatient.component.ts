
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
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  name: string;
  days: boolean = false
  titlea = ['اختار', 'السيد', 'الآنسة', 'السيدة', 'الآنسه', 'الدكتور', 'دكتور جامعى', 'المحترم'];
  matrial = ["Married", "Unmarried", "Single", "Widowed", "Divorced", "Separated "]
  matriala = ["زوجت", "اعزب", "غير مرتبطة", "الأرامل", "مطلقة", "فصل"]
  Occupationa = ['موظف', 'رجل اعمال', 'مزارع', 'طالب علم'];
  identificationa = ['بطاقة التعريف', 'رخصة قيادة', 'جواز سفر', 'الإقامة'];
  result: any = "";
  submitted = false;
  Gender: boolean;
  matrialstatus: boolean;
  regid:boolean=false;
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
  is_edit: boolean = false;
  mydate:any;
  showLoader :boolean=false; 
  

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
  Roletype: string;
  patintlist: any;
  mydateAr: string;
  mydateenglishex: string;
  mydateARex: string;
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
    this.userid = window.localStorage.getItem("userId")
    this.Roletype = window.localStorage.getItem("Roletype");
    this.getcrete()
    document.title = "Add Patient"
  
    //this.patienttype()
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
      titleinput: ['', [Validators.required]],
      nationType: [''],
      occupType: [''],
      idType: ['', [Validators.required]],
      selectedItems: [''],
      arexdate: [' '],
      Patientlist: ['']

    });

    this.patient.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.patient);
    });
  }
  get f() { return this.patient.controls; }

  onSubmit() {
    this.submitted = true;
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
   // alert(patienttype)
    if (patienttype == "Student" || patienttype == "Employee"||patienttype== "UniversityFaculty") {
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
    let patienttype = this.patient.value.Patientlist;
    let registerid = $("#reg").val();

    if(patienttype=="Student"){
      if(registerid==""){
       this.regid=true
      }
else{
  this.regid=false
}
    }


    if(patienttype=="Employee"){
      if(registerid==""){
        this.regid=true
      }
else{
  this.regid=false;
}
    }


    if(patienttype=="UniversityFaculty"){
      if(registerid==""){
        this.regid=true
      }
else{
  this.regid=false
}
    }


    // else if(patienttype=="Employee"||registerid==""){
    //   alert("plase enter register id")
    // }
    // else if(patienttype=="UniversityFaculty"||registerid==""){
    //   alert("plase enter register id")
    // }
    // else{
    //   alert("sucess")
    // }
   
  
    let uploatprof = this.patient.value.uploadidproof
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

    let DOB = this.patient.value.DOB;
    let nationType = this.patient.value.nationType;
    let occupType = this.patient.value.occupType;

    let idType = this.patient.value.idType;
    let idnumber = this.patient.value.idnumber;

    let exiddate = this.patient.value.iddate;
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
      console.log(res)
      if (res.status_cd === "1") {
        alert("Patient Added Successfully ")
        this.router.navigate(['/autocomplate']);
        if (op === 'save') {
        } else {
          //localStorage.setItem('newpatientId', res.data.Table[0].patient_id);
let patient_id=res.data.Table[0].patient_id
          this.router.navigate(['/Addfamilydetails'], { queryParams: { patientid: patient_id } });
         // this.router.navigate(['/Addfamilydetails']);
        }
      }
      else {
        alert("Email/Mobile number already existed.")
      }
      err => {
      }
    })
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
    if (!arregex.test(inputChar)) {
      alert("Please Enter Arabic Letters")
      event.preventDefault();
    }
  }

  getcuntrys() {
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
      if (res.status_cd == "1") {
        this.countrys = res.data.Table;
      }
    });
  }

  getocupation() {
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
      if (res.status_cd == "1") {
        this.ocupation = res.data.Table;
      }
    });
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
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      Authorization: accessToken
    });

    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      setTimeout(() => {
        let body: string = JSON.parse(res['_body']);
        this.profileimage = body[0];
        this.showLoader=false
      }, 1000);
    });
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
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      Authorization: accessToken
    });

    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.showLoader = true;
    this.http.post(url, formData, options).subscribe((res) => {
      console.log(res)
      setTimeout(() => {
        let body: string = JSON.parse(res['_body']);
        this.profileimage = body[0];
        this.showLoader=false
      }, 1000);

    });
  }

  english($event) {

    let ADOB = $event.target.value;
if(ADOB.length==""){
  $('#clear').val('')
}

if(ADOB.length==10){

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

        $("#clear").val(res.data.Table[0].Hijridate);
        this.binddate = res.data.Table[0].Hijridate
        console.log(this.binddate)
      }
    });
  }
  }

  englishex(event) {
   
    let EDOB = event.target.value;
if(EDOB.length==""){
  $('#clearexper').val('')
}
if(EDOB.length==10){

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
      console.log(res)
      if (res.status_cd == "1") {

    $("#clearexper").val(res.data.Table[0].Hijridate);
        this.binddateex = res.data.Table[0].Hijridate
        console.log(this.binddate)
      }
    });
  }
  }


  arabice($event) {
    let DOB = $event.target.value;
    if(DOB.length==""){
      $('#cleara').val('')
    }
    if(DOB.length==10){
    

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
        console.log(this.arabicbinddate)
      }
    });
  }
  }

  arabicex($event) {
    let ADOB = $event.target.value;
    if(ADOB.length==""){
      $('#englishexper').val('')
    }
    if(ADOB.length==10){
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
      if (res.status_cd == "1") {
        $("#englishexper").val(res.data.Table[0].GregorianDate.split('T')[0]);
        this.arabicbinddateex = res.data.Table[0].GregorianDate.split('T')[0]
      }
    });
  }
  }

  // patienttype() {
    
  //   var accessToken = window.localStorage.Tokenval;
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let body = {
  //     "text": "bindmembertype",
  //     "id": "",
  //     "param1": "",
  //     "param2":this.Roletype
  //   }
  //   console.log(body)
  //   let options = new RequestOptions({ headers: headers });
  //   var url = this.cmn.commonUrl + "Account/GetUser";
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //     console.log(res)
  //     if (res.status_cd == "1") {
  //       this.patintlist = res.data.Table
  //       // this.patintlist= res.data.Table[0].typename;
  //       if (this.Roletype == "Asst Director") {
  //         this.is_edit = true;
  //         this.patintlist = res.data.Table
  //         this.patient.patchValue({
  //           Patientlist: res.data.Table[0].typename
  //         })
  //       }
  //       else if (this.Roletype == "Outpatient Receptionist") {
  //         this.patintlist = res.data.Table
  //         this.is_edit = true;
  //         this.patient.patchValue({
  //           Patientlist: res.data.Table[0].typename
  //         })
  //       }
  //       else {
  //         this.is_edit = false;
  //         this.patintlist = res.data.Table
  //       }
  //     }
  //     else {
  //       console.log("Error")
  //     }
  //   });
  // }

  
  

    dateslash(val){
      if (val == 2){
        this.mydate += '/';
      }else if(val== 5){
       this.mydate += '/';
      }
      
      }
  
      dateslasharabic(val){
        if (val == 2){
          this.mydateAr += '/';
        }else if(val== 5){
         this.mydateAr += '/';
        }
        
        }

        dateslashenglishex(val){
          
          
          if (val == 2){
            this.mydateenglishex += '/';
          }else if(val== 5){
           this.mydateenglishex += '/';
          }
          
          }

          dateslashArex(val){
            if (val == 2){
              this.mydateARex += '/';
            }else if(val== 5){
             this.mydateARex += '/';
            }
            
            }

}



