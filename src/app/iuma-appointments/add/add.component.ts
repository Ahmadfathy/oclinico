import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { AllComponent } from '../all/all.component';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addappointment: FormGroup;
  public langulagetype: any = 'us';
  public isPageloaderVisible = true;
  addpatientshow:boolean=false;
  deptdata: any = [];
  roomdata: any = [];
  timearray: any = [];
  timearrayfunmrng: any = [];
  appointmentslots: any = [];
  appointmenttypesdata: any = [];
  public patientvalue: any;
  addpatientform:any;
  appntslots:any;
  startappntslots:any;
  endappntslots:any;
  formhr:any;
  tohr:any;
  appntdate :any;
  selecteddepartment: any;
  selectedstatus: any;
  selectedroom: any;
  selectedslots: any;
  selectedapptypes: any;
  available_slots = [
    '8:00 To 8:20',
    '8:20 To 8:40',
    '8:40 To 9:00',
    '9:00 To 9:20',
    '9:20 To 9:40',
    '9:40 To 10:00',
    '10:00 To 10:20',
    '10:20 To 10:40',
    '10:40 To 11:00',
    '11:00 To 11:20',
    '11:20 To 11:40',
    '11:40 To 12:00',
    '13:00 To 13:20',
    '13:20 To 13:40',
    '13:40 To 14:00',
    '14:00 To 14:20',
    '14:20 To 14:40',
    '14:40 To 15:00']
  ValidationMessages = {
    'date': {
      'required': 'Please Select Date'
    },
    'patient': {
      'required': 'Please Enter Patient Name'
    },
    'departments': {
      'required': 'Please Select Department'
    },
    'slots': {
      'required': 'Please Select Appointment Slot'
    },
    'status': {
      'required': 'Please Select Status'
    },
    'rooms': {
      'required': 'Please Select Room'
    }
  }

  ArabicValidationMessages = {
    'date': {
      'required': 'الرجاء اختيار التاريخ'
    },
    'patient': {
      'required':'الرجاء إدخال اسم المريض'
    },
    'departments': {
      'required': 'الرجاء إدخال الفئة'
    },
    'slots': {
      'required': 'الرجاء إدخال مبلغ المصروفات الإجمالي'
    },
    'status': {
      'required': 'يرجى اختيار الحالة'
    },
    'rooms': {
      'required': 'الرجاء إدخال إجمالي الضريبة'
    }
  }

  formErrors = {
    'date': '',
    'patient': '',
    'departments': '',
    'slots': '',
    'status': '',
    'rooms': ''
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.addappointment = this.fb.group({
      date: ['', [Validators.required]],
      patient: ['', [Validators.required]],
      departments: ['', [Validators.required]],
      slots: ['', [Validators.required]],
      status: ['', [Validators.required]],
      remarks: [],
      // sms: [],
      rooms: ['', [Validators.required]],
      emergency: [],
      patientname:[],
      gender:[],
      email:[],
      mobile:[],
      appointmenttypes: []
      
    })
    this.addappointment.valueChanges.subscribe((data) => {
      console.log(data)
      // this.CheckValidationErrors(this.addappointment);
    })
    this.departmentlist()
    this.appointmenttypes();
    this.selectedstatus = '';
    this.selectedroom = '';
    this.selectedslots = '';
    this.selecteddepartment = '';
    this.selectedapptypes = '';
  }

  appointmenttypes() {
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/CL_GetAppointments';

    let body = {
      "text": "GetSlots",
      "start": "",
      "end": "",
      "id": localStorage.getItem('userId'),
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res.data.Table.length)
      console.log(res)
      this.isPageloaderVisible = false;
      if (res.data.Table.length != "0") {
        this.appointmenttypesdata = res.data.Table;
      } else {

      }
    })


    err => {
      this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }
  CheckValidationErrors(group: FormGroup = this.addappointment): void {
    //console.log(Object.keys)
    console.log(this.addappointment.value.departments)
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
        if (this.langulagetype == "EN") {
          console.log(key)
          const message = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log(errorKey)
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + '';
            }
          }
        } else if (this.langulagetype == 'AR') {
          const message = this.ArabicValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log(errorKey)
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + '';
            }
          }
        }

      }
    });
  }
  departmentlist() {
    var accessToken = window.localStorage.Tokenval1;
    console.log(accessToken);
    console.log(localStorage.getItem('userId'))
    // our service calling as usual
    let url = this.commonService.commonUrl+'Account/GetUser  ';

    let body = {
      "text": "binddesignation",
      "id": "",
      "param1": localStorage.getItem('userId'),
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.data.Table.length !== 0) {
        this.deptdata = res.data.Table;
      }
    })


    err => {
      console.log("Token Error:" + err);
    }
  }
  addpatient(){
    console.log("patient adding")
    this.addpatientshow = true;
  }
  patient() {
    console.log(this.addappointment.value.patient)
    if(this.addappointment.value.patient.length >= 3){
      var accessToken = window.localStorage.Tokenval1;
      console.log(accessToken);
      console.log(localStorage.getItem('userId'))
      $('.loading-icon').show()
      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/GetUser  ';
  
      let body = {
        "text": "patientnamealldrp",
        "id": this.addappointment.value.patient,
        "param1": localStorage.getItem('userId'),
        "param2": ""
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.data.Table.length !== 0) {
          $('.loading-icon').hide()
          var patientDetails = $('.patientDetails');
          var allPatients = ''
          // res.data.Table.forEach((elem) => {
          //   allPatients += '<div class="eachPatientDetails" id=' + elem.patient_id + '>' + elem.Name + '</div>'
          // })
          res.data.Table.forEach((elem) => {
            allPatients += '<div class="eachPatientDetails" id=' + elem.patient_id + '>' + elem.Ara_firstname +' ' +elem.Ara_fathername+' '+ elem.Ara_Lastname + '</div>'
          })
          patientDetails.show()
          $('.not').hide();
          patientDetails.html(allPatients)
          $('.loading-icon').hide()
        } else {
          $('.loading-icon').hide()
          $('.not').show();
          $('.patientDetails').hide()
          $('.loading-icon').hide()
        }
  
        var self = this;
        $('.patientDetails').on('click', '.eachPatientDetails', function () {
          console.log($(this).html())
          self.addpatientshow = false;
          console.log(this.addpatientshow)
          $('#patient').val($(this).html()).attr('patientId', $(this).attr('id'))
          $('.patientDetails').hide()
          self.patientvalue = $('#patient').attr('patientid');
          console.log(self.patientvalue)
         
        })
      })
  
  
      err => {
        console.log("Token Error:" + err);
      }
    }
   

  }
  Pdetails() {
    //   var self = this;
    //   $('.patientDetails').on('click', '.eachPatientDetails', function() {
    //     console.log($(this).html())
    //     $('#patient').val($(this).html()).attr('patientId', $(this).attr('id'))
    //     $('.patientDetails').hide()
    //     self.patientvalue =  $('#patient').attr('patientid');
    //     console.log(self.patientvalue)

    // })
  }
  departmentschange() {
    var accessToken = window.localStorage.Tokenval1;
    console.log(this.addappointment.value.departments)
    $('.loading-icon1').show()
    let url = this.commonService.commonUrl+'Account/GetUser';

    let body = {
      "text": "getroomdetails",
      "id": "",
      "param1": localStorage.getItem('userId'),
      "param2": this.addappointment.value.departments
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.data.Table.length !== 0) {
        $('.loading-icon1').hide()
        this.roomdata = res.data.Table;
      }
    })


    err => {
      console.log("Token Error:" + err);
    }
  }
  datechange(event) {
    console.log(event.target.value)
    var date = event.target.value.split('-');
    var d1 = date[2];
    var m1 = date[1];
    var y1 = date[0];
    var selecteddate = m1 + '/' + d1 + '/' + y1;
    console.log(selecteddate)
    // console.log("patientvalue:"+this.patientvalue)
    console.log(this.addappointment.value.rooms)
    var accessToken = window.localStorage.Tokenval1;
    $('.loading-icon2').show()
    console.log(accessToken);
    console.log(localStorage.getItem('userId'))
    // our service calling as usual
    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": this.addappointment.value.rooms,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": selecteddate,
      "Operation": "Getavalibleslots",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": "",
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == '1') {
        console.log(res.data.Table)
        this.timearray = res.data.Table[0];
        // this.timeslots();
      }else{
        $('.loading-icon2').hide()
      }
    })


    err => {
      console.log("Token Error:" + err);
    }


  }
  timeslots() {
    console.log(this.timearray.Starttime, this.timearray.endtime)
    for (var i = 0; i < this.timearray.length; i++) {
      console.log(this.timearray[i].Starttime);
      // if(this.timearray[i].Starttime.includes('PM')){
      //   this.timearray[i].Starttime =  convert(this.timearray[i].Starttime);
      // }
    }
    this.timearray.endtime = convert(this.timearray.endtime);

    function convert(time) {

      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == "PM" && hours < 12) hours = hours + 12;
      if (AMPM == "AM" && hours == 12) hours = hours - 12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;
      console.log(sHours + ":" + sMinutes);
      return sHours + ":" + sMinutes

    }
    console.log(this.timearray.endtime)
    var t1 = parseInt(this.timearray.Starttime.split(':')[0]);
    var t1val = parseInt(this.timearray.Starttime.split(':')[1]);
    var t2 = parseInt(this.timearray.endtime.split(':')[0]);
    var t2val = parseInt(this.timearray.endtime.split(':')[1]);

    console.log(t1);
    console.log(t1val);
    console.log(t2);
    var hourHours = ["00", "20", "40"];
    if (t1 == 0 || t2 == 0) {

    } else {
      for (var i = t1; i < t2; i++) {
        for (var j = 0; j < 3; j++) {
          var time = i + ":" + hourHours[j];

          if (i >= 10) {

          } else {
            time = "0" + time;
          }
          if (i >= 12) {
            time = time + " PM"
          } else {
            time = time + " AM"
          }
          this.timearrayfunmrng.push({
            time: time
          })

        }
      }
      //  var mainTimes = this.timearrayfunmrng.pop()
    }


    //  console.log(this.timearrayfunmrng)

    for (let i = 0; i < this.timearrayfunmrng.length; i++) {
      if (i < this.timearrayfunmrng.length - 1) {
        // console.log(this.timearrayfunmrng[i].time+" To "+this.timearrayfunmrng[i+1].time);
        this.appointmentslots.push(this.timearrayfunmrng[i].time + " To " + this.timearrayfunmrng[i + 1].time)
      } else {
        if (this.timearray.endtime.split(':')[0] > 12)
          //   console.log(this.timearrayfunmrng[i].time +" To "+ this.timearray.endtime+" PM");
          this.appointmentslots.push(this.timearrayfunmrng[i].time + " To " + this.timearray.endtime + " PM")

      }
    }
    $('.loading-icon2').hide()
  }

  slotschange() {

    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();
    console.log(time)
    var accessToken = window.localStorage.Tokenval1;
    var appslot = this.addappointment.value.slots.split('To')
    // let url1 = this.commonService.commonUrl+'Account/CL_GetAppointments';

    // let body1 = {
    //   "text": "CheckClinikTimings",
    //   "start": this.addappointment.value.date + ' ' + appslot[0].split(' ')[0],
    //   "end": this.addappointment.value.date + ' ' + appslot[1].split(' ')[1],
    //   "id": localStorage.getItem('userId'),
    //   "param1": localStorage.getItem('userId'),
    //   "param2": this.addappointment.value.rooms

    // }
    // let headers1 = new Headers({
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    //   Authorization: accessToken
    // });
    // let options1 = new RequestOptions({ headers: headers1 });

    // this.http.post(url1, body1, options1).map(res => res.json()).subscribe(res => {
    //   console.log(res)
    //   // if (res.status_cd == '1') {
    //   //   console.log(res.data.Table)
    //   //   this.timearray = res.data.Table[0];
    //   //   this.timeslots();
    //   // }
    // })


    // err => {
    //   console.log("Token Error:" + err);
    // }

   
    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": this.addappointment.value.rooms,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.addappointment.value.date + ' ' + appslot[0].split(' ')[0],
      "Operation": "Checkdoctorslots",
      "clinicid": "",
      "Branchid": "",
      "Last_Updated": ""

    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      console.log(res.data.Table[0].Result)
      if (res.data.Table[0].Result == 'True') {
        console.log(this.addappointment.value.apptdate.split('-')[0],
        this.addappointment.value.apptdate.split('-')[1],
        this.addappointment.value.apptdate.split('-')[2])
      console.log(today.getDate())
      var todaydate = today.getDate();
      var todaymonth = today.getMonth() + 1;
      var todayyear = today.getFullYear();
      console.log(todayyear == this.addappointment.value.apptdate.split('-')[0])
      if ((todayyear == this.addappointment.value.apptdate.split('-')[0]) &&
        (todaymonth == this.addappointment.value.apptdate.split('-')[1]) &&
        (todaydate == this.addappointment.value.apptdate.split('-')[2])) {
        console.log('true')
        if (time > '15:00') {
          alert('Appointment Time Closed');
          return;
        } else if (time <= appslot[0]) {

        } else {
          alert("Please Select Another Time Slot");
          return;
        }
      }

      } else {
        alert("Please Select Another Slot");
        return;
      }
    },err => {
      console.log("Token Error:" + err);
    });


    
  }


  emergencyclick() {
    console.log(this.addappointment.value.emergency)
   
    this.deptdata = [];
    //console.log(this.addappointment.value.slots.disabled = true);
    // this.addappointment.value.slots.disabled = true;
    console.log(this.addappointment.get("slots"))
    // var slots = this.addappointment.get("slots");
    // slots.disabled;
    var today = new Date();
    var todaydate = today.getDate();
    var todaymonth = today.getMonth() + 1;
    var todayyear = today.getFullYear();
    console.log(todayyear + '-' + todaymonth + '-' + todaydate)
    if(todaymonth.toString().length == 1){
      var todaym = '0'+todaymonth;
    }else{
      var todaym = todaymonth.toString();
    }
    if(todaydate.toString().length == 1){
      var todayd = '0'+todaydate;
      console.log(todaydate)
    }else{
      var todayd = todaydate.toString();
    }
    this.addappointment.patchValue({
      status: 'Confirmed',
      date: todayyear + '-' + todaym + '-' + todayd,
      slots: '',
      appointmenttypes: 'First Appointment',
    })
    if (this.addappointment.value.emergency == true) {
      console.log("Checked. . .. ");
      // $("#deptid").prop("disabled", true)
      // $("#roomid").prop("disabled", true)
      $("#apttypeid").prop("disabled", true)
      $("#dateid").prop("disabled", true)
      $("#slotid").prop("disabled", true)
      $("#aptid").prop("disabled", true)
      // $("#remarksid").prop("disabled", true)
      var accessToken = window.localStorage.Tokenval1;
      console.log(accessToken);
      console.log(localStorage.getItem('userId'))
      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/GetUser  ';
  
      let body = {
           "text": "getemergencydoctor",
           "id": "",
           "param1":"",
           "param2": ""
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.data.Table.length !== 0) {
          this.deptdata = res.data.Table;
        }
      },err => {
        console.log("Token Error:" + err);
      })

    } else {
      this.departmentlist()
      $("#deptid").prop("disabled", false)
      $("#roomid").prop("disabled", false)
      $("#apttypeid").prop("disabled", false)
      $("#dateid").prop("disabled", false)
      $("#slotid").prop("disabled", false)
      $("#aptid").prop("disabled", false)
      $("#remarksid").prop("disabled", false)

    }

  }

  submit() {
    
   
    console.log(this.patientvalue)
     if(this.addappointment.value.emergency == true){
 
      //  if(this.addappointment.value.date == null || this.addappointment.value.date == undefined){
      //    return ;
      //  }
       if(this.patientvalue == "" || this.patientvalue == undefined){
        alert("Please Enter Patient Name")
         return;
       }
       this.submitfunction();
       
     }else if(this.addappointment.valid == true){
           console.log('ok')
           this.submitfunction();
     }else{
       this.CheckValidationErrors()
     }    
   }

   submitfunction(){

    let repeatstatus;
    if (window.localStorage.getItem("loginbaseId") !== '') {

      var accessToken = window.localStorage.Tokenval1;
      let url = this.commonService.commonUrl+'Account/GetUser';

      let body = {
        "text": "checkcountappointmentsbydoctors",
        "id": localStorage.getItem('userId'),
        "param1": this.addappointment.value.rooms,
        "param2": ""

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
        if (res.data.Table[0].Result == 'True') {
          this.isPageloaderVisible = false;
          console.log(res.data.Table)
          repeatstatus = ' ';
          this.addsubmit(repeatstatus);
        }
        else {
          this.isPageloaderVisible = false;
          repeatstatus = 'false';
          this.addsubmit(repeatstatus);
          alert("This Doctor has exhausted appointments by today, moving to the waitlist")
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);
        });

    } else {

      var accessToken = window.localStorage.Tokenval1;
      let url = this.commonService.commonUrl+'Account/GetUser';

      let body = {
        "text": "checkcountappointments",
        "id": localStorage.getItem('userId'),
        "param1": this.addappointment.value.rooms,
        "param2": ""

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
        if (res.data.Table[0].Result == 'True') {
          this.isPageloaderVisible = false;
          console.log(res.data.Table)
          repeatstatus = '';
          this.addsubmit(repeatstatus);
        }
        else {
          this.isPageloaderVisible = false;
          repeatstatus = 'false';
          this.addsubmit(repeatstatus);
          alert("This Doctor has exhausted appointments by today, moving to the waitlist")
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);
        });

    }




  }
   
addsubmit(repeatstatus){

  console.log(this.addappointment.value)
    
  var emergencydata1;
  if(this.addappointment.value.emergency == true){
    emergencydata1 = 'emergency';
  }else{
    emergencydata1 = '';
  }

  if(this.addappointment.value.slots == ""){
   this.startappntslots = '';
   this.endappntslots = '';
   this.formhr = null;
   this.tohr = null;
   this.appntdate = this.addappointment.value.date ;
  }else{
    var appntslots = this.addappointment.value.slots.split('To');
    this.startappntslots = this.addappointment.value.date + ' ' + appntslots[0].split(' ')[0];
    this.endappntslots = this.addappointment.value.date + ' ' + appntslots[1].split(' ')[1];
    this.formhr = appntslots[0].split(' ')[0];
    this.tohr = appntslots[1].split(' ')[1];
    this.appntdate = this.addappointment.value.date + ' ' + appntslots[0].split(' ')[0];
  }
  var accessToken = window.localStorage.Tokenval1;
  let url = this.commonService.commonUrl+'Account/Appointment_operations';

  let body = {
    "userid": "",
    "type": "",
    "patientid": this.patientvalue,
    "title": "",
    "description": this.addappointment.value.remarks,
    "event_start":this.startappntslots,
    "event_end": this.endappntslots,
    "Updateddt": "",
    "createddate": "",
    "arrivestatus": this.addappointment.value.status,
    "all_day": "",
    "Repeatstatus":  repeatstatus,
    "Status": "",
    "appointdate": this.appntdate,
    "fromhr":this.formhr,
    "tohr": this.tohr,
    "text": "insertappointments",
    "login": localStorage.getItem('userId'),
    "Clinicid": localStorage.getItem('userId'),
    "appointmentid": "",
    "practitionerid": this.addappointment.value.rooms,
    "Treatmentid ": "",
    "Branchid": emergencydata1,
    "Slottype":this.addappointment.value.appointmenttypes,
    "Sittings": this.addappointment.value.departments
  }
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: accessToken
  });
  let options = new RequestOptions({ headers: headers });

  this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
    console.log(res)
    // if (res.status_cd == '1') {
      if (res.data.Table[0].Result == 'True') {
      console.log(res.data.Table)
      alert("Appointment Added Successfully.");
      this.router.navigate(["/all"]);
     
    }
  })


  err => {
    console.log("Token Error:" + err);
  }
}
}
