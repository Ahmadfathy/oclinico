import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  categories = ["Cash", "Insurance", "Select"]
  Referal = ["Other", "Company", "Patient", "Select"]
  companys = ["Graylogictechnolgies", "Infotech", "Conqure", "Tcs"]
  table = []
  file: any = "";
  Insurance: boolean = false
  company: boolean = false;
  deferent: boolean = false;
  same: boolean = false
  patient: boolean = false;
  countrys: any
  other: boolean = false;
  selectedDevice: any
  submitted = false;
  radio: boolean = false;
  billing: FormGroup;
  deferente: FormGroup;
  userid: any = ""
  Insuranceno: boolean
  Insurancecard: boolean;
  Insurancecompany: boolean
  adate: boolean
  edate: boolean
  compan: boolean = false
  area: boolean
  building: boolean
  selectedDay: any;
  street: boolean
  floor: boolean
  country: boolean
  city: boolean
  patientid: any
  Area: any
  Block: any
  Buliding: any
  Street: any
  Floor: any
  Countr: any
  City: any
  Country: any
  mainpatientid: any
  getcompany = []
  getrefcompany: any;
  binddate: any;
  arabicbinddate: any;
  patient_name: any;
  constructor(private fb: FormBuilder,
    private cmn: UserinfoService,
    private http: Http,
    private router: Router) { }

  ngOnInit() {
    this.getreferalcompnys()
    this.getdata()
    this.getcompanys()
    this.userid = window.localStorage.getItem("userId")
    this.patient_name = sessionStorage.patient_name;
    localStorage.setItem('patientId', this.patientid);
    sessionStorage.setItem('patientIdNew', this.patientid)
    //alert(this.patientid)
    this.mainpatientid = sessionStorage.getItem('patientIdNew');
    this.Insuranceno = true
    this.Insurancecard = true;
    this.Insurancecompany = true
    this.adate = true;
    this.edate = true
    this.compan = true
    this.area = true
    this.building = true
    this.street = true
    this.floor = true
    this.country = true;
    this.city = true
    document.title = "Billing Details"
    console.log(this.billing)
    this.userid = window.localStorage.getItem("userId")
    this.getcuntrys()
    this.radio = true
    this.deferente = this.fb.group({
      Area: [''],
      Block: [''],
      Building: [""],
      Street: [""],
      Floor: [""],
      City: [""],
      Country: [""],
    }),
      this.billing = this.fb.group({
        paymentmode: [''],
        def: [''],
        Area: [''],
        Block: [''],
        Building: [""],
        Street: [""],
        Floor: [""],
        City: [""],
        Country: [""],
        Referral: [""],

        // insurance form fields


        Insuranceno: [""],
        Insurancecompany: [""],
        Insurancecard: [""],
        arabicdate: [""],
        englishdate: [""],
        //  referal type
        Comapny: [""],
        name: [""],
        contact: [""],
        other: [""],
      })
    // this.billing.get('paymentmode').valueChanges.subscribe(

    //   (payment: string) => {

    //       if (payment === 'Insurance') {

    //           //this.billing.setValidators([Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]);

    //           //this.billing.setValidators([Insuranceno: ["", Validators.required],])
    //           this.billing = this.fb.group({
    //             Insuranceno: ["", Validators.required],
    //             Insurancecompany: ["", Validators.required],
    //             Insurancecard: ["", Validators.required],
    //             arabicdate: ["", Validators.required],
    //             englishdate: ["", Validators.required],
    //           })

    //       }



    //     })




  }
  get f() { return this.billing.controls; }
  //onSubmit(){
  // let payment=$("#payment").val()

  // if(payment=="Cash"){
  //   this.billing = this.fb.group({
  //     Referral: ["", Validators.required],

  //   })}

  // if(payment=="Insurance"){
  //   this.billing=this.fb.group({
  //   Insuranceno: ["", Validators.required],
  //   Insurancecompany: ["", Validators.required],
  //     Insurancecard: ["", Validators.required],
  //     arabicdate: ["", Validators.required],
  //     englishdate: ["", Validators.required],
  // })
  // }

  // this.submitted=true;
  //  if(this.billing.invalid){

  //return
  // }

  //}

  //   onSubmit() {


  //     this.submitted = true
  //     let payment = $("#payment").val();
  //     let billing = this.billing.status;
  //     let selctradio = this.billing.value.def;
  //     alert(payment)
  //     // this.Insurance = true;
  //     // this.company=true;
  //     if (this.billing.invalid) {
  //       return;
  // }
  //     if (payment == 'Insurance') {

  //       this.billing = this.fb.group({
  //         Insuranceno: ["", Validators.required],
  //         Insurancecompany: ["", Validators.required],
  //         Insurancecard: ["", Validators.required],
  //         arabicdate: ["", Validators.required],
  //         englishdate: ["", Validators.required],

  //       })

  //       this.submitted = true;

  //     }
  //     else if (payment == "Cash" || payment == "Select") {
  //       this.billing = this.fb.group({
  //         Area: ['', Validators.required],
  //         Block: [''],
  //         Building: ["", Validators.required],
  //         Street: ["", Validators.required],
  //         Floor: ["", Validators.required],
  //         City: ["", Validators.required],
  //         Country: ["", Validators.required],

  //       })
  //       this.submitted = true;

  //     }

  //     this.submitted = true;




  //   }
  selectChangeHandler(event: any) {

    let selectedDay = event.target.value;
    //console.log(selectedDay)
    if (selectedDay == "Insurance") {
      this.Insurance = true
      return
    }
    else if (selectedDay == "Cash" || selectedDay == "Select") {
      this.Insurance = false
      return
    }
    else {
      this.Insurance = false;
    }


  }

  selectdef(event: any) {
    this.radio = true;
    // let selectedDay = event.target.value;
    //let selctradio=this.billing.value.def;
    let selctradio = event.target.value;
    //alert(selctradio)

    if (selctradio == "deferent") {
      this.deferent = true
      this.same = false;

    }
    else if (selctradio == "same") {
      this.same = true;
      this.deferent = false;


    }
    else {
      this.deferent = false;
      this.same = false;

    }

  }


  selectreferal(event: any) {
    let selectedDay = event.target.value;
    console.log(selectedDay)
    if (selectedDay == "Company") {
      this.company = true;
      this.patient = false;
      this.other = false;

    }
    else if (selectedDay == "Patient") {
      this.patient = true;
      this.company = false;
      this.other = false;
    }
    else if (selectedDay == "Other") {
      this.other = true;
      this.patient = false;
      this.company = false;
    }
    else if (selectedDay == "Select") {
      this.company = false;
      this.patient = false;
      this.other = false;
    }
    else {
      this.company = false;
      this.patient = false;
      this.other = false;
    }
  }
  // sample(){
  //   let def =this.billing.value.def;

  //   alert(def)
  //   if (def == ""||def==null||def=="same"){
  //     this.radio=false;
  // }
  // else{
  //   this.radio=true;
  // }
  // }
  focusout(val) {
    if (val == "") {
      this.radio = false;
      return false;
    }

    else {
      this.radio = true;
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
      console.log(res)
      if (res.status_cd == "1") {
        this.countrys = res.data.Table;
      }
    });
    //})
  }


  // sample(){
  //   let payment=$("#payment").val()

  //   if(payment=="Cash"){

  // }


  //   if(payment=="Insurance"){

  //   alert("insurence")
  //   }
  //   else{
  // alert("sucessfully")
  //   }
  // }







  getdata() {

    //service call
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    console.log(localStorage.getItem('newpatientId'))
    // our service calling as usual
    let url = this.cmn.commonUrl + 'Account/Patient_operations';
    let body = {
      "sno": localStorage.getItem('newpatientId'),
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
        console.log(res.data);
        this.table = res.data.Table;


        // this.billingAddress = res.data.Table[0].comm_address;

        this.billing.controls.Area.patchValue(res.data.Table[0].Area)
        this.billing.controls.Block.patchValue(res.data.Table[0].Block)
        this.billing.controls.Building.patchValue(res.data.Table[0].Buliding)
        this.billing.controls.Street.patchValue(res.data.Table[0].Street)
        this.billing.controls.Floor.patchValue(res.data.Table[0].Floor)
        this.billing.controls.Country.patchValue(res.data.Table[0].Country)
        this.billing.controls.City.patchValue(res.data.Table[0].City)



      } else {



      }
    })



    //}),
    err => {
      console.log("Token Error:" + err);
    }

  }


  createbilling() {
    let addrese = this.billing.value.def
    let Insuranceno = this.billing.value.Insuranceno;
    let Insurancecompany = this.billing.value.Insurancecompany;
    let Insurancecard = this.billing.value.Insurancecard;
    let arabicdate = this.billing.value.arabicdate;
    let englishdate = this.billing.value.englishdate;
    let Comapny = this.billing.value.Comapny;
    let name = this.billing.value.name;
    let contact = this.billing.value.contact;
    let other = this.billing.value.other;

    let def = this.billing.value.def
    let paymentmode = this.billing.value.paymentmode;
    let Referral = this.billing.value.Referral
    let billing = this.billing.status;
    let payment = $("#payment").val()


    if (payment == "Insurance") {
      if (Insuranceno == "" || Insurancecompany == "" || Insurancecard == "") {


        this.Insuranceno = false
        this.Insurancecard = false;
        this.Insurancecompany = false
        // this.adate=false;
        //this.edate=false
        this.compan = false
        return
      }
      else {
        this.Insuranceno = true
        this.Insurancecard = true;
        this.Insurancecompany = true
        // this.adate=true;
        // this.edate=true
        this.compan = true


      }
    }







    if (addrese == "same") {
      this.Area = this.billing.value.Area;
      this.Block = this.billing.value.Block;
      this.Buliding = this.billing.value.Building;
      this.Street = this.billing.value.Street;
      this.Floor = this.billing.value.Floor;
      this.City = this.billing.value.City;
      this.Country = this.billing.value.Country;
    }
    if (addrese == "deferent") {
      this.Area = this.deferente.value.Area;
      this.Block = this.deferente.value.Block;
      this.Buliding = this.deferente.value.Building;
      this.Street = this.deferente.value.Street;
      this.Floor = this.deferente.value.Floor;
      this.City = this.deferente.value.City;
      this.Country = this.deferente.value.Country;

    }

    let defe = this.billing.value.def;
    if (defe == "") {
      this.radio = false;
      return
    }
    else {
      this.radio = true;
    }








    //  if(Comapny==""){
    //    this.compan=false
    //  }
    //  else{
    //    this.compan=true
    //  }









    if (addrese == "deferent") {
      //  alert("defernt")
      //  let area=$('#area').val();
      //  let block=$('#block').val();
      // let building=$('#building').val();
      // let street=$('#street').val();
      // let floor=$('#floor').val();
      // let city=$('#city').val();
      // let country=$('#country').val();
      //alert(area)
      if ((this.Area == "" || this.Area == undefined) || (this.Buliding == "" || this.Buliding == undefined) || (this.Street == "" || this.Street == undefined) || (this.Floor == "" || this.Floor == undefined) || (this.Country == "" || this.Country == undefined) || (this.City == "" || this.City == undefined) || (Comapny == "" || Comapny == undefined)) {
        // alert('sasasasasas')
        // alert(this.Area)
        this.area = false
        this.building = false
        this.street = false
        this.floor = false
        this.country = false;
        this.city = false
        return

      }
      else {
        this.area = true
        this.building = true
        this.street = true
        this.floor = true
        this.country = true;
        this.city = true
      }

    }
    else { }


    // else{
    //   alert('uiuiuiu')
    //   this.building=true
    //   this.street=true
    //   this.floor=true
    //   this.country=true;
    //   this.city=true
    // }

    // alert("same")
    //     if(addrese=="same"){
    //      if((this.Area=="")||(this.Buliding=="")||(this.Street=="")||(this.Floor=="")||(this.Country=="")||(this.City=="")||(Comapny=="")){
    // alert(this.Area)

    // this.area=false
    // this.building=false
    // this.street=false
    // this.floor=false
    // this.country=false;
    // this.city=false
    // return
    //   }
    //   else{
    //     this.area=true
    //     this.building=true
    //     this.street=true
    //     this.floor=true
    //     this.country=true;
    //     this.city=true
    //   }}else{

    //   }



    // if(addrese === "same"){
    //   if(this.Area==""||this.Area==undefined){
    //     this.area=false
    //   }
    //   else{

    //   this.area=true
    //   }
    //   if(this.Buliding==""||this.Buliding==undefined){this.building=false}
    //   else{this.building=true
    //     }
    //   if((this.Street==""||this.Street==undefined)){ this.street=false}
    //   else{ 
    //     this.street=true
    //     }
    //   if(this.Floor==""||this.Floor==undefined){this.floor=false}
    //   else{

    //     this.floor=true

    //   }
    //   if(this.Country==""||this.Country==undefined){this.city=false}
    //   else{ 

    //     this.country=true;

    //   }

    //   if(this.City==""||this.City==undefined){this.city=false}
    //   else{this.city=true}














    //   else{

    // this.compan=true
    // this.Insuranceno=true
    // this.Insurancecard=true;
    // this.Insurancecompany=true
    // this.adate=true;
    // this.edate=true

    // this.building=true
    // this.street=true
    // this.floor=true
    // this.country=true;
    // this.city=true
    //   }





    // let defe =this.billing.value.def;
    //alert(billing)
    // if (def == "") {
    //   this.radio = false;
    //   return
    // }
    // if(this.billing.invalid){

    //   return
    // }
    // else {
    //   this.radio = true;
    // }

    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let url = this.cmn.commonUrl + 'Account/Cl_Billing_Details_new'
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "loginid": this.userid,
      "Patient_id": localStorage.getItem('newpatientId'),
      "Area": this.Area,
      "Block": this.Block,
      "Building": this.Buliding,
      "Street": this.Street,
      "Floor": this.Floor,
      "city": this.City,
      "Country": this.Country,
      "Trans_date": "",
      "billingid": "",
      "comm_address": def,
      "paymentmode": paymentmode,
      "cash": paymentmode,
      "referal_type": Referral,
      "name": name,
      "contact": contact,
      "Insuranceno": Insuranceno,
      "Insurancecompanyid": Comapny,
      "Ins_attachment": this.file,
      "Expiry_date": englishdate,
      "Condition": "Insert_Billing"


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
      if (res.status_cd == "1") {
        alert("Successfully Added")
        this.router.navigate(['/Patientinfo']);
      }
      else {
        //alert("allrady mobile no exit")
        console.log("error")
      }
      err => {
        console.log("ERROR!: ", err);
      }
    })


    //})

  }











  focinsureneceno(val) {
    if (val == "") {
      this.Insuranceno = false;
      return false;
    } else {
      this.Insuranceno = true;
    }
  }
  focinsurencecompany(val) {
    if (val == "") {
      this.Insurancecompany = false;
      return false;
    } else {
      this.Insurancecompany = true;
    }
  }
  focinsurencecard(val) {
    if (val == "") {
      this.Insurancecard = false;
      return false;
    } else {
      this.Insurancecard = true;
    }
  }
  focadate(val) {
    if (val == "") {
      this.adate = false;
      return false;
    } else {
      this.adate = true;
    }
  }
  focedate(val) {
    if (val == "") {
      this.edate = false;
      return false;
    } else {
      this.edate = true;
    }
  }
  foccompany(val) {
    if (val == "") {
      this.compan = false;
      return false;
    } else {
      this.compan = true;
    }
  }
  focarea(val) {
    if (val == "") {
      this.area = false;
      return false;
    } else {
      this.area = true;
    }
  }
  focbuliding(val) {
    if (val == "") {
      this.building = false;
      return false;
    } else {
      this.building = true;
    }
  }
  focsteret(val) {
    if (val == "") {
      this.street = false;
      return false;
    } else {
      this.street = true;
    }
  }

  focfllor(val) {
    if (val == "") {
      this.floor = false;
      return false;
    } else {
      this.floor = true;
    }
  }

  foccity(val) {
    if (val == "") {
      this.city = false;
      return false;
    } else {
      this.city = true;
    }
  }
  foccountry(val) {
    if (val == "Select") {
      this.country = false;
      return false;
    } else {
      this.country = true;
    }
  }
  focinsuno(val) {
    if (val == "") {
      this.Insuranceno = false;
      return false;
    } else {
      this.Insuranceno = true;
    }
  }

  getcompanys() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = { "operation": "GetInsuranceName", "value": "", "uid": this.userid }

    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/Getdata_By_Id";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {

      console.log(res);

      if (res.status_cd == "1") {
        this.getcompany = res.data.Table;

      }
    });
    //})
  }
  getreferalcompnys() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = { "text": "GetCompanys", "id": this.userid, "param1": "", "param2": "" }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {

      console.log(res);

      if (res.status_cd == "1") {
        this.getrefcompany = res.data.Table;

      }
    });
    //}) 
  }
  fileup($event) {

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
      this.file = body[0]
      console.log(this.file = body[0])
    });
    //})
  }
  edit() {
    var patientid = sessionStorage.getItem('editpatinetid')


    this.router.navigate(['/editpatient'], { queryParams: { patientid } });
  }

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
    // })
    // this.test();
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
    // })
    // this.test();
  }
}