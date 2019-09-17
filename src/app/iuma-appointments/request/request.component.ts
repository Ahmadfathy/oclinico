import { NgbModal, ModalDismissReasons, NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  closeResult: string;
  addappointment: FormGroup;
  deptdata: any = [];
  roomdata: any = [];
  appointmenttypesdata: any = [];
  public patientvalue: any;
  public patientemail: any;
  public langulagetype: any = 'us';
  // public isPageloaderVisible = true;
  selecteddepartment: any;
  selectedstatus: any;
  selectedroom: any;
  selectedslots: any;
  selectedapptypes: any;
  timearray: any = [];
  timearrayfunmrng: any = [];
  appointmentslots: any = [];
  Alldata: any = [];
  dataTable: any;
  dataTable1: any;
  dataTable2: any;
  dataTable3: any;
  dataTable4: any;
  addpatientshow: boolean = false;
  public showpagenation: boolean = false;
  addpatientform: any;
  editpatientform: any;
  appntslots: any;
  startappntslots: any;
  endappntslots: any;
  fromhr: any;
  tohr: any;
  formhr:any;
  appntdate: any;
  selectedapp_id: any;
  isPageloaderVisible: boolean = false;
  arrivedicon: any = [];
  showdata:boolean = true;
  nodata:boolean = false;
  mobilerequest:boolean = false;
  website:any;
  phoneno:any;
  email:any;
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
    'apptdate': {
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
    'apptdate': {
      'required': 'الرجاء اختيار التاريخ'
    },
    'patient': {
      'required': 'الرجاء إدخال اسم المريض'
    },
    'departments': {
      'required': 'الرجاء اختيار القسم'
    },
    'slots': {
      'required': 'الرجاء اختيار موعد'
    },
    'status': {
      'required': 'يرجى اختيار الحالة'
    },
    'rooms': {
      'required': 'الرجاء اختيار الغرفة‎'
    }
  }

  formErrors = {
    'apptdate': '',
    'patient': '',
    'departments': '',
    'slots': '',
    'status': '',
    'rooms': ''
  }
  appointmentdate: any;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private router: Router) { }

  ngOnInit() {

    this.showpagenation = true;
    this.addappointment = this.fb.group({
      apptdate: ['', [Validators.required]],
      patient: ['', [Validators.required]],
      departments: ['', [Validators.required]],
      slots: ['', [Validators.required]],
      status: ['', [Validators.required]],
      remarks: [],
      // sms: [],
      rooms: ['', [Validators.required]],
      emergency: [],
      patientname: [],
      gender: [],
      email: [],
      mobile: [],
      appointmenttypes: []
    })

    this.addappointment.valueChanges.subscribe((data) => {
      console.log(data)
      // this.CheckValidationErrors(this.addappointment);
    })
    this.departmentlist()

    this.selectedstatus = '';
    this.selectedroom = '';
    this.selectedslots = '';
    this.selecteddepartment = '';
    this.selectedapptypes = '';

    this.getrequestdata();
    this.appointmenttypes();
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


  getrequestdata() {
    var tab = $('#dataTable').DataTable();
    tab.destroy();
    this.Alldata = [];
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "bindappdata",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": window.localStorage.getItem("loginbaseId"),
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
      this.isPageloaderVisible = false;
      if (res.status_cd == "1") {
        this.showdata = true;
        this.nodata = true;
        this.Alldata = res.data.Table;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        for (let i = 0; i < this.Alldata.length; i++) {
          if (this.Alldata[i].arrivestatus === "Arrived") {
            console.log(this.Alldata[i].arrivestatus)
            this.arrivedicon[i] = true;
          }
        }
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      } else {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.isPageloaderVisible = false;
        $('#dataTable_wrapper').hide();
      }
    })


    err => {
      this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }


  mobilerequesttimeslots(event){
    console.log("entered")
    console.log(event)
    console.log(this.addappointment.value.rooms)
   
    var date = event.split('-');
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
      "Practitioner_Id": '',
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": selecteddate,
      "Operation": "Getavalibleslotsfrommobile",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": "",
      "Last_Updated": ""
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
      if (res.status_cd == '1') {
        console.log(res.data.Table)
        this.timearray = res.data.Table[0];
        this.timeslots();
        console.log(this.addappointment.value.slots)
      }else{
        alert("Slots not available")
        this.selectedslots = '';
        $('.loading-icon2').hide()
      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }

  openedit(id,content) {
    // open(content)
    console.log(id)
    console.log(localStorage.getItem('userId'))
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';

    let body = {
      "Sno": id,
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "bindall",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": "",
      "Last_Updated": ""
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
      this.isPageloaderVisible = false;
      if (res.status_cd == "1") {
        this.mobilerequesttimeslots(res.data.Table[0].appointdate.split(' ')[0])
        console.log(res.data.Table[0].appointdate.split('-'));
        let yy = res.data.Table[0].appointdate.split('-')[0];
        let mm = res.data.Table[0].appointdate.split('-')[1];
        let dd = res.data.Table[0].appointdate.split('-')[2].split(' ')[0];
       
        if(mm.length == 1){
          mm = '0'+mm;
        }
        if(dd.length == 1){
          dd = '0'+dd;
        }
       
        this.patientemail = res.data.Table[0].Email;
        this.fromhr =  res.data.Table[0].fromhr;
        this.tohr =  res.data.Table[0].tohr;
        console.log(mm+'/'+dd+'/'+yy)
        this.departmentlist();

          this.addappointment.patchValue({
            patientname:res.data.Table[0].PatientName,
            status:res.data.Table[0].arrivestatus,
            apptdate: yy+'-'+mm+'-'+dd,
            appointmenttypes:res.data.Table[0].type,
            departments:res.data.Table[0].Followup_Days,
          })
          this.patientvalue = res.data.Table[0].patientid;
          // this.datechange(res.data.Table[0].Appointment_start.split('T')[0]);
          this.appointmentdate= this.addappointment.value.apptdate
         
          this.selectedapp_id = res.data.Table[0].Appointment_id;
          this.mobilerequest = true;
          this.editdepartment( this.selectedapp_id );
         
      } else {
        
      }
    })


    err => {
      this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  
    this.editpatientform = this.modalService.open(content)
    this.editpatientform.result.then((result) => {
      console.log(result)
      if (result == "Ok click") {
      
        
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason)
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    console.log(reason)

    // const control = this.addappointment.get('sms');
    // control.setValue(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  departmentschange(event) {
    console.log(event)
    var accessToken = window.localStorage.Tokenval1;
    console.log(this.addappointment.value.departments)
    // let deprtmnt = this.addappointment.value.departments;
    $('.loading-icon1').show()
    let url = this.commonService.commonUrl+'Account/GetUser';

    let body = {
      "text": "getroomdetails",
      "id": "",
      "param1": localStorage.getItem('userId'),
      "param2": event
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.data.Table[0].Result == "True") {
        $('.loading-icon1').hide()
        this.roomdata = res.data.Table;
      } else {
        $('.loading-icon1').hide();
        this.selectedroom = '';
        this.selectedslots = '';
        this.addappointment.patchValue({
          apptdate:''
        });
        alert("Please Assign Rooms")
      }
    })


    err => {
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

  datechange(event) {
    console.log(event)
    if(event == 'room'){
console.log('room')
event = this.addappointment.value.apptdate;
var date = event.split('-');
      var d1 = date[2];
      var m1 = date[1];
      var y1 = date[0];
      var selecteddate = m1 + '/' + d1 + '/' + y1;
    }else{
      var date = event.split('-');
      var d1 = date[2];
      var m1 = date[1];
      var y1 = date[0];
      var selecteddate = m1 + '/' + d1 + '/' + y1;
    }
    console.log(this.addappointment.value.rooms)
    console.log(this.addappointment.value.apptdate)
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
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.selectedslots = '';
      if (res.status_cd == '1') {
        console.log(res.data.Table)
        this.timearray = res.data.Table[0];
        // let stime = res.data.Table[0].Starttime.split(' ')[0];
        // let etime = res.data.Table[0].endtime.split(' ')[0];
        // this.addappointment.patchValue({
        //   slots:stime + " To " + etime                
        // })
        // this.timeslots();
        console.log(this.addappointment.value.slots)
      } else {
        if(this.mobilerequest == true){
          this.mobilerequest = false;
        }else{
          // alert("Slots not available")
        }
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
    console.log(this.timearray.endtime)
    // this.timearray.endtime = "4:00 PM";
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
    var st;
    console.log(this.timearray.Starttime.split(':'))
    console.log(this.timearray.Starttime.split(':')[1].length)
    if (this.timearray.Starttime.split(':')[1].length == '4') {
      st = this.timearray.Starttime.split(':')[1].substring(0, 2)
    } else {
      st = this.timearray.Starttime.split(':')[1];
    }
    var t1 = parseInt(this.timearray.Starttime.split(':')[0]);
    var t1val = parseInt(st);
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
            time = time //+ " PM"
          } else {
            time = time //+ " AM"
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
          this.appointmentslots.push(this.timearrayfunmrng[i].time + " To " + this.timearray.endtime )

      }
    }

    let fromtime = this.fromhr + " To " + this.tohr
    console.log("formtime" + fromtime)
    this.addappointment.patchValue({
       slots:fromtime
    })
    $('.loading-icon2').hide()
  }


  slotschange() {

    var accessToken = window.localStorage.Tokenval1;
    var appslot = this.addappointment.value.slots.split('To')
    let url1 = this.commonService.commonUrl+'Account/CL_GetAppointments';

    let body1 = {
      "text": "CheckClinikTimings",
      "start": this.addappointment.value.apptdate + ' ' + appslot[0].split(' ')[0],
      "end": this.addappointment.value.apptdate + ' ' + appslot[1].split(' ')[1],
      "id": localStorage.getItem('userId'),
      "param1": localStorage.getItem('userId'),
      "param2": this.addappointment.value.rooms

    }
    let headers1 = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options1 = new RequestOptions({ headers: headers1 });

    this.http.post(url1, body1, options1).map(res => res.json()).subscribe(res => {
      console.log(res)
      // if (res.status_cd == '1') {
      //   console.log(res.data.Table)
      //   this.timearray = res.data.Table[0];
      //   this.timeslots();
      // }
    })


    err => {
      console.log("Token Error:" + err);
    }


    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": this.addappointment.value.rooms,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.addappointment.value.apptdate + ' ' + appslot[0].split(' ')[0],
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
      } else {
        alert("Please Select Another Slot");
        return;
      }
    })


    err => {
      console.log("Token Error:" + err);
    }
  }

  editdepartment(id){
    console.log(this.addappointment.value.status)
    console.log(id)
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/GetUser';

    let body = {
      "text":"bindappinfo",
      "id":id,
      "param1":"",
      "param2":""
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
        this.departmentschange(res.data.Table[0].designation);
        this.addappointment.patchValue({
        departments:res.data.Table[0].designation,
        rooms: res.data.Table[0].Emp_Id  
        })
        // this.datechange(this.appointmentdate)
       
        // this.selecteddepartment = res.data.Table[0].designation;
      }else{
        this.departmentschange(res.data.Table[0].Followup_Days);
        // this.datechange(this.appointmentdate)
      }
    })


    err => {
      console.log("Token Error:" + err);
    }
  }


  editsubmit(){
    console.log(this.addappointment.value.status)
    console.log(this.selectedapp_id)
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
          repeatstatus = '';
          this.updatesubmit(repeatstatus);
        }
        else {
          this.isPageloaderVisible = false;
          repeatstatus = 'false';
          this.updatesubmit(repeatstatus);
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
          this.updatesubmit(repeatstatus);
        }
        else {
          this.isPageloaderVisible = false;
          repeatstatus = 'false';
          this.updatesubmit(repeatstatus);
          alert("This Doctor has exhausted appointments by today, moving to the waitlist")
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);
        });

    }

   
  }

  updatesubmit(repeatstatus){
    if(this.addappointment.value.slots == ""){
      this.startappntslots = '';
      this.endappntslots = '';
      this.formhr = null;
      this.tohr = null;
      this.appntdate = this.addappointment.value.apptdate ;
     }else{
       var appntslots = this.addappointment.value.slots.split('To');
       this.startappntslots = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
       this.endappntslots = this.addappointment.value.apptdate + ' ' + appntslots[1].split(' ')[1];
       this.formhr = appntslots[0].split(' ')[0];
       this.tohr = appntslots[1].split(' ')[1];
       this.appntdate = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
     }
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/Appointment_operations';

    let body = {
      "userid":localStorage.getItem('userId'),
      "type":"",
      "patientid":this.patientvalue,
      "title":"",
      "description":this.addappointment.value.remarks,
      "event_start":this.startappntslots,
      "event_end":this.endappntslots,
      "Updateddt":"",
      "createddate":"",
      "arrivestatus":this.addappointment.value.status,
      "all_day":"",
      "Repeatstatus":repeatstatus,
      "Status":"",
      "appointdate":this.appntdate,
      "fromhr":this.formhr,
      "tohr":this.tohr,
      "text":"AppointmentUpdate",
      "login":"",
      "Clinicid":localStorage.getItem('userId'),
      "appointmentid":this.selectedapp_id,
      "practitionerid":this.addappointment.value.rooms,
      "Treatmentid ":"",
      "Branchid":"",
      "Slottype":this.addappointment.value.appointmenttypes,
      "Sittings":this.addappointment.value.departments
      
      
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.data.Table[0].Result == 'True') {
        console.log(res.data.Table)
        alert('Updated Successfully')
        if (this.addappointment.value.status == "UnConfirmed") {
          this.updateappointmentpendingemail()
        } else if (this.addappointment.value.status == "Confirmed") {
          this.updateappointmentconfirmsendmail()
        }
        this.editpatientform.close();
         this.getrequestdata();
      }
    },
    err => {
      console.log("Token Error:" + err);
    })

  }

  updateappointmentconfirmsendmail() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    // var appntslots = this.addappointment.value.slots.split('To');
  
    // this.formhr = appntslots[0].split(' ')[0];
    console.log(this.patientemail.split(' ')[2])
    let url = this.commonService.commonUrl+'Login/Confirmmail?emailid=' + this.patientemail + '&time=' + this.addappointment.value.apptdate + '' + this.addappointment.value.slots;
  
  
    this.http.get(url).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.isPageloaderVisible = false;
      console.log(res)
    })
  
  }
  
  updateappointmentpendingemail() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
  
    console.log(this.patientemail.split(' ')[2])
    let url = this.commonService.commonUrl+'Login/whileAppBooked?emailid=' + this.patientemail
  
    this.http.get(url).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.isPageloaderVisible = false;
      console.log(res)
    })
  }
   //------------------------------------------Export to Excel -------------------------------
  
  exportexcel(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Request Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
   //------------------------------------------Export to Excel -------------------------------
    // --------------------------------print -----------------------------------------------

  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------

}
