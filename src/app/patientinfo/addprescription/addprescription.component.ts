import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addprescription',
  templateUrl: './addprescription.component.html',
  styleUrls: ['./addprescription.component.css']
})
export class AddprescriptionComponent implements OnInit {
  fieldArray: Array<any> = [];
  showDatapatient: any = [];
  showtradenames: any = [];
  newAttribute: any = {};
  presription: FormGroup;
  submitted = false;
  doctors: any
  apoinment: boolean;
  medicene = []
  new = [];
  data1: string = ""
  patientid: any
  userid: any
  patient: any
  days: boolean;
  quanity: boolean;
  selectmedicene: boolean;
  apoinemets = []
  geniricnames: any = [];
  tradenames: any = [];
  apdt: any
  Ap_id;
  months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  apointVal: any;
  patientId: string;
  tradename: any;
  patient_name: any;
  genericname: any;
  tradenamearray: any = [];
  id: any;

  constructor(private fb: FormBuilder, 
    private cmn: UserinfoService,
    private http: Http,
    private router: Router) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    this.genricname()
    let temp = {
      "index": 0,
      "tradename": []
    }
    this.tradenamearray.push(temp);
    var url = document.URL
    var url1 = url.split('?')
    var getids = url1[1].split('=')[1]
    this.patientId = getids.split(":")[0].split("&")[0]
    this.Ap_id = window.sessionStorage.getItem("Clicked_Apid")
    this.userid = window.localStorage.getItem("userId")
    this.getdoctors();
    this.patient = localStorage.getItem('patient')
    this.aponementdata()
    this.days = true
    this.quanity = true
    this.selectmedicene = true
    this.patientid = (localStorage.getItem('patientId'));
    document.title = "Add Prescription"
    this.apoinment = true
    this.fieldArray.length = 1;
    this.presription = this.fb.group({
      doctor: ['', Validators.required],
      apointment: ['', Validators.required],
      medicine: [''],
      quanity: [''],
      days: [''],
      note: [''],
    })
  }

  get f() { return this.presription.controls; }

  onSubmit() {
    this.submitted = true;
  }

  addFieldValue(val) {
    if (val == "add") {
      let temp = {
        "index": 0,
        "tradename": []
      }
      this.tradenamearray.push(temp);
      this.fieldArray.length++
    }
  }

  getval(evnt, indx) {
    if (evnt !== '') {
      this.geniricnames[indx] = (evnt.target.innerHTML)
    }
    this.showDatapatient[indx] = false;
  }

  gettradeval(evnt, indx) {
    if (evnt !== '') {
      this.tradenames[indx] = (evnt.target.innerHTML)
    }
    this.showtradenames[indx] = false;
  }

  deleteFieldValue(i) {
    if (i != '0') {
      this.fieldArray.splice(i, 1);
      this.geniricnames[i] = "";
      this.tradenames[i] = "";
      var quanity = []
      $('.eachdata').each(function (index) {
        quanity.push('')
      })
      var finalquanity = []
      $('.eachdata').each(function (index) {
        finalquanity.push('')
      })
      var nodays = []
      $('.eachdata').each(function (index) {
        nodays.push('')
      })
      var note = []
      $('.eachdata').each(function (index) {
        note.push('')
      })
    }
  }

  cratepriscription() {
    var alltradeSelect = []
    quanity
    $('.eachdata').each(function (index) {
      alltradeSelect.push($(this).find('.tradeSelect ').val())
    })
    var allmedicineSelect = []
    quanity
    $('.eachdata').each(function (index) {
      allmedicineSelect.push($(this).find('.medicineSelect ').val())
    })
    var quanity = []
    $('.eachdata').each(function (index) {
      quanity.push($(this).find('.quanity').val())
    })
    var finalquanity = []
    $('.eachdata').each(function (index) {
      finalquanity.push($(this).find('.quanityy').val())
    })
    var nodays = []
    $('.eachdata').each(function (index) {
      nodays.push($(this).find('.nodays').val())
    })
    var note = []
    $('.eachdata').each(function (index) {
      note.push($(this).find('.note').val())
    })
    var tradio = []
    $('.eachdata').each(function (index) {
      tradio.push($("input[name='optradioval1" + index + "']:checked").val())
    })
    var month = []
    $('.eachdata').each(function (index) {
      month.push($(this).find('.month').val())
    })
    let medicine = allmedicineSelect.join(';')
    let trade = alltradeSelect.join(';')
    let Quanity = quanity.join(';')
    let fquan = finalquanity.join(';')
    let Nodays = nodays.join(';')
    let Tnote = note.join(';')
    let Tradio = tradio.join(';')
    let Month = month.join(';')
    let preload = $("#pradio").val()
    let notes = $('.notesPrescription').val()
    let test = this.presription.status;
    let apid = $('.apoint').val()
    let finalnotes = $('.notesPrescription').val()
    if (apid == "" || apid == "null" || apid == "Select") {
      this.apoinment = false
      return
    }
    else {
      this.apoinment = true
    }
    if (medicine == "select;" || Quanity == ";" || Nodays == ";") {
      this.days = false
      this.quanity = false
      this.selectmedicene = false
      return
    }
    else {
      this.days = true
      this.quanity = true
      this.selectmedicene = true
    }
    var accessToken = window.localStorage.Tokenval;
    let url = this.cmn.commonUrl + 'Account/Prescription_Details';
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": Quanity,
      "PrescriptionID": "",
      "PatientID": this.patientId,
      "AppointmentID": apid,
      "Medicine": medicine || "",
      "Dosage": fquan,
      "NoOfDays": Nodays,
      "Refill": "",
      "Notes": finalnotes,
      "Status": "Active",
      "LoginID": this.userid,
      "mnotes": Tnote,
      "Last_update": trade,
      "Condition": "Insert",
      "par1": this.presription.value.doctor,
      "refillproduct": Tradio
    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      if (res.status_cd == "1") {
        alert("Added Successfully")
        var Refrral = this.patientId
        this.router.navigate(['/prescription'], { queryParams: { Refrral } });
      }
      else {
      }
    })
    err => {
    }
  }

  tableradio(i) {
    $('.eachdata').each(function () {
      let tablevalue = $("input[name='optradioval1" + i + "']:checked").val();
      if (tablevalue == "Yes") {
        $("#deptid" + i + "").prop("disabled", false)
      }
      else {
        $("#deptid" + i + "").prop("disabled", true)
      }
    })
  }

  cancel() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  getdoctors() {
    var Role_id = window.localStorage.getItem("RoleID")
    if (Role_id == "3607") {
      this.id = window.localStorage.getItem("loginbaseId");
    }
    else {
      this.id = ""
    }
    // window.localStorage.getItem("loginbaseId")
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "FirstName": "",
      "par1": this.id,
      "par2": this.userid,
      "par3": "",
      "condition": "GetDoctor"
    }
    console.log(body);
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetPatients";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.doctors = res.data.Table;
      }
    });
  }

  genricname() {
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var url = 'https://api.oclinico.com/PharmacyAPI/api/product-master/get-product-dosage-form/'
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.Result == true) {
        this.genericname = res.data;
      }
    })
  }

  tradenamelatest(event, i) {
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    var url = 'https://api.oclinico.com/PharmacyAPI/api/product-details/get-product-by-master-id/' + event

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.Result == true) {
        this.tradename = res.data;
        this.tradenamearray[i].tradename = this.tradename;
      }
    })
  }

  selectAppointment(event) {
    let doctors = (event.target.value)
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": "",
      "PrescriptionID": doctors,
      "PatientID": this.patientId,
      "AppointmentID": "",
      "Medicine": "",
      "Dosage": "",
      "NoOfDays": "",
      "Refill": "",
      "Notes": "",
      "Status": "",
      "LoginID": "",
      "mnotes": "",
      "Last_update": "",
      "Condition": "GetApp1",
      "par1": "",
      "refillproduct": ""

    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/Prescription_Details";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.apoinemets = res.data.Table;
        this.presription.controls.apointment.patchValue(res.data.Table[0].Ap_id)
      }
    });
  }

  focmedicene(val) {
    if (val == "select;") {
      this.selectmedicene = false;
      return false;
    }
    else {
      this.selectmedicene = true;
    }
  }

  focqty(val) {
    if (val == ";") {
      this.quanity = false;
      return false;
    }
    else {
      this.quanity = true;
    }
  }

  focdays(val) {
    if (val == ";") {
      this.days = false;
      return false;
    }
    else {
      this.days = true;
    }
  }

  aponementdata() {
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "id": this.patientId,
      "param1": this.Ap_id,
      "param2": "",
      "text": "doctorbind"
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser"
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.medicene = res.data.Table;
        this.presription.controls.doctor.patchValue(res.data.Table[0].Emp_Id)
        this.presription.controls.apointment.patchValue(res.data.Table[0].dt)
        var event = {
          target: {
            value: res.data.Table[0].Emp_Id
          }
        }
        this.selectAppointment(event);
      }
      else { }
    });
  }
}