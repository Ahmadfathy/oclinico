import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  closeResult: string;
  addappointment: FormGroup;
  deptdata: any = [];
  roomdata: any = [];
  appointmenttypesdata: any = [];
  public patientvalue: any;
  public patientemail: any;
  public langulagetype: any = 'EN';
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
  requestdata: any = [];
  waitlistdata: any = [];
  emergencydata: any = [];
  dataTable: any;
  dataTable1: any;
  dataTable2: any;
  dataTable3: any;
  dataTable4: any;
  dataTable5: any;
  dataTable6: any;
  dataTable7: any;
  addpatientshow: boolean = false;
  public showpagenation: boolean = false;
  addpatientform: any;
  editpatientform: any;
  appntslots: any;
  startappntslots: any;
  endappntslots: any;
  formhr: any;
  tohr: any;
  fromhr: any;
  appntdate: any;
  selectedapp_id: any;
  isPageloaderVisible: boolean = true;
  arrivedicon: any = [];
  showdata: boolean = true;
  nodata: boolean = true;
  mobilerequest: boolean = false;
  qrcodeimg: any;
  QRcodeIMGshow: boolean = false;
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

  website: any;
  phoneno: any;
  email: any;
  viewpatientform: any;


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
  showLoader: boolean = false;
  Roleid: string;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private router: Router) { }

  ngOnInit(): void {
    // this.modalService.open(content); 
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
      appointmenttypes: [],
      p_patientname: [],
      p_patientdob: [],
      p_patientgender: [],
      p_patienttype: [],
      p_status: [],
      appointment_id: [],
      patient_id: [],
      doctor_name: [],
      doctor_designation: [],
      c_patientname: [],
      c_patientdob: [],
      c_patientgender: [],
      c_patienttype: [],
      c_status: [],
      c_appointment_id: [],
      c_patient_id: [],
      c_doctor_name: [],
      c_doctor_designation: [],
      c_clinicname: [],
      c_clinicid: [],
      c_clinicinfo_name: [],
      c_clinicinfo_email: [],
      c_clinicinfo_address: [],
      c_clinicinfo_city: [],
      c_clinicinfo_phoneno: [],
    })

    this.addappointment.valueChanges.subscribe((data) => {
      // console.log(data)
      // this.CheckValidationErrors(this.addappointment);
    })
    this.departmentlist()

    this.selectedstatus = '';
    this.selectedroom = '';
    this.selectedslots = '';
    this.selecteddepartment = '';
    this.selectedapptypes = '';

    this.getAlldata();
    this.appointmenttypes();

  }
  roomchange() {
    //console.log("Room change.  .. ")
  }
  appointmenttypes() {
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/CL_GetAppointments';

    let body = {
      "text": "GetSlots",
      "start": "",
      "end": "",
      "id": window.localStorage.getItem('userId'),
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
      //  console.log(res.data.Table.length)
      console.log(res)
      this.isPageloaderVisible = false;
      if (res.data.Table.length != 0) {
        this.appointmenttypesdata = res.data.Table;
      } else {

      }
    })


    err => {
      this.showdata = false;
      this.nodata = false;
      this.isPageloaderVisible = false;
      //console.log("Token Error:" + err);
    }
  }
  getAlldata() {
    console.log(window.localStorage.getItem('loginbaseId'))
    var tab = $('#dataTable').DataTable();
    var Role_id = window.localStorage.getItem("RoleID")
    if (Role_id == "3611") {
      this.Roleid = "";
    }
    else {
      this.Roleid = window.localStorage.getItem("loginbaseId")
    }
    tab.destroy();
    this.Alldata = [];
    this.showLoader = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "bindall",
      "clinicid": window.localStorage.getItem('userId'),
      "Branchid":this.Roleid,  //window.localStorage.getItem("loginbaseId"),
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
      console.log(res);
      this.showLoader = true;
      // this.isPageloaderVisible = true;
      if (res.data.Table[0].Result == "True") {
        this.showLoader = false;
        // this.isPageloaderVisible = false;
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
        // this.isPageloaderVisible = false;
       this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        // this.isPageloaderVisible = false;
        $('#dataTable_wrapper').hide();
      }
    })


    err => {
      this.showLoader = false;
      this.showdata = false;
      this.nodata = false;
      // this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }

  getpending() {
    this.showLoader = true;
    this.Alldata = [];
    // this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "BindPendingappointments",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log("pending data result" + res)
      this.showLoader = true;
      // this.isPageloaderVisible = false;
      if (res.data.Table[0].Result == "True") {
        this.showLoader = false;
        this.showdata = true;
        this.nodata = true;
        this.Alldata = res.data.Table;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable1');
        this.dataTable1 = table1.DataTable();
      } else {
        this.showLoader = false;
        this.showpagenation = false;
        this.showdata = false;
        this.nodata = false;
        $('#dataTable_wrapper').hide();
      }
    })


    err => {
      this.showLoader = false;
      this.showdata = false;
      this.nodata = false;
      // this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }

  getconfirmed() {
    this.showLoader = true;
    this.Alldata = [];
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "Bindconfrimappointments",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
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
      console.log("confirmed data result" + res)
      // this.isPageloaderVisible = false;
      this.showLoader = true;
      if (res.data.Table[0].Result == "True") {
        this.Alldata = res.data.Table;
        this.showLoader = false;
        this.showdata = true;
        this.nodata = true;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable2');
        this.dataTable2 = table1.DataTable();
      } else {
        this.showpagenation = false;
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        $('#dataTable_wrapper').hide();
      }
    })
    err => {
      this.showLoader = false;
      this.showdata = false;
      this.nodata = false;
      // this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }
  getarrived() {
    this.showLoader = true;
    this.Alldata = [];
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "BindArrivedappointments",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log("arrived data result" + res)
      // this.isPageloaderVisible = false;
      this.showLoader = true;
      if (res.data.Table[0].Result == "True") {
        this.Alldata = res.data.Table;
        this.showLoader = false;
        this.showdata = true;
        this.nodata = true;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable3');
        this.dataTable3 = table1.DataTable();
      } else {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
    })
    err => {
      this.showLoader = false;
      this.showdata = false;
      this.nodata = false;
      // this.isPageloaderVisible = false;
      console.log("Token Error:" + err);
    }
  }
  getcancelled() {
    this.showLoader = true;
    this.Alldata = [];
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "BindCanceledappointments",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log("cancelled data result " + res)
      // this.isPageloaderVisible = false;
      this.showLoader = true;
      if (res.data.Table[0].Result == "True") {
        this.Alldata = res.data.Table;
        this.showLoader = false;
        this.showdata = true;
        this.nodata = true;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable4');
        this.dataTable4 = table1.DataTable();
      } else {
        this.showpagenation = false;
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        $('#dataTable_wrapper').hide();
      }
    },
      err => {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        // this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })



  }

  getrequested() {
    this.showLoader = true;
    // this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "bindappdata",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log("requested data result " + res)
      // this.isPageloaderVisible = false;
      this.showLoader = true;
      if (res.data.Table[0].Result == "True") {
        this.showdata = true;
        this.showLoader = false;
        this.nodata = true;
        this.requestdata = res.data.Table;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        for (let i = 0; i < this.requestdata.length; i++) {
          if (this.requestdata[i].arrivestatus === "Arrived") {
            console.log(this.requestdata[i].arrivestatus)
            this.arrivedicon[i] = true;
          }
        }
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable5');
        this.dataTable5 = table1.DataTable();
      } else {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        // this.isPageloaderVisible = false;
        $('#dataTable_wrapper').hide();
      }
    },
      err => {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.showLoader = false;
        // this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })

  }

  getwaitlist() {
    this.showLoader = true;
    // this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "Bindwaitlistdata",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
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
      this.showLoader = true;
      // this.isPageloaderVisible = false;
      if (res.status_cd == "0") {
        this.showdata = true;
        this.showLoader = false;
        this.nodata = true;
        this.waitlistdata = res.data.Table;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        for (let i = 0; i < this.requestdata.length; i++) {
          if (this.requestdata[i].arrivestatus === "Arrived") {
            console.log(this.requestdata[i].arrivestatus)
            this.arrivedicon[i] = true;
          }
        }
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable6');
        this.dataTable6 = table1.DataTable();
      } else {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.showLoader = false;
        // this.isPageloaderVisible = false;
        $('#dataTable_wrapper').hide();
      }
    },
      err => {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.showLoader = false;
        // this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })

  }

  getemergency() {
    this.showLoader = true;
    // this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';
    let body = {
      "Sno": "",
      "Practitioner_Id": "",
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "BindEmergencyconfrimappointments",
      "clinicid": localStorage.getItem('userId'),
      "Branchid": this.Roleid, //window.localStorage.getItem("loginbaseId"),
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log("Emergency data result " + res)
      // this.isPageloaderVisible = false;
      this.showLoader = true;
      if (res.status_cd == "0" ) {
        this.showdata = true;
        this.showLoader = false;
        this.nodata = true;
        this.emergencydata = res.data.Table;
        this.website = res.data.Table1[0].Website;
        this.phoneno = res.data.Table1[0].phoneno;
        this.email = res.data.Table1[0].Email
        for (let i = 0; i < this.requestdata.length; i++) {
          if (this.requestdata[i].arrivestatus === "Arrived") {
            console.log(this.requestdata[i].arrivestatus)
            this.arrivedicon[i] = true;
          }
        }
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable7');
        this.dataTable7 = table1.DataTable();
      } else {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.showLoader = false;
        // this.isPageloaderVisible = false;
        $('#dataTable_wrapper').hide();
      }
    },
      err => {
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        this.showLoader = false;
        // this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })

  }

  open(content) {
    this.formErrors = {
      'apptdate': '',
      'patient': '',
      'departments': '',
      'slots': '',
      'status': '',
      'rooms': ''
    }
    console.log(content)
    // const control = this.addappointment.get('sms');
    // control.setValue(null)
    this.addappointment.get('patient').setValue(null)
    const control1 = this.addappointment.get('emergency');
    control1.setValue(null)
    const control3 = this.addappointment.get('apptdate');
    control3.setValue(null)
    this.selectedstatus = '';
    this.selectedroom = '';
    this.selectedslots = '';
    this.selecteddepartment = '';
    this.selectedapptypes = '';
    $('#patient').val('');
    const control2 = this.addappointment.get('remarks');
    control2.setValue(null)
    // console.log(value)
    this.addpatientform = this.modalService.open(content)
    this.addpatientform.result.then((result) => {
      console.log(result)
      if (result == "Ok click") {
        // this.delete(value,content2);

        // if(this.addappointment.valid == false){
        //   console.log(this.addappointment.valid)
        //   return false;
        // }else{
        //   this.submit()
        // }

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

  close(a) {
    console.log(a)
    // this.addpatientform.close()
  }

  patient() {
    console.log(this.addappointment.value.patient)
    if (this.addappointment.value.patient.length >= 3) {
      var accessToken = window.localStorage.Tokenval1;
      console.log(accessToken);
      console.log(localStorage.getItem('userId'))
      $('.loading-icon').show()
      // our service calling as usual
      let url = this.commonService.commonUrl + 'Account/GetUser  ';

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
          //   allPatients += '<div class="eachPatientDetails" id=' + elem.patient_id + '>' + elem.Ara_firstname +''+ elem.Ara_Lastname + '</div>'
          // })
          res.data.Table.forEach((elem) => {

            allPatients += '<div class="eachPatientDetails ' + ' ' + elem.Email + '" id=' + elem.patient_id + '>' + elem.Ara_firstname + ' ' + elem.Ara_fathername + ' ' + elem.Ara_Lastname + '</div>'
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
          alert("Please Enter Valid Patient Id")
        }

        var self = this;
        $('.patientDetails').on('click', '.eachPatientDetails', function () {
          console.log($(this).html())
          self.addpatientshow = false;
          console.log(this.addpatientshow)
          console.log($(this).val())
          console.log($('#patient').text($(this).html()).attr('patientemail', $(this).attr('class')))
          $('#patient').val($(this).html()).attr('patientId', $(this).attr('id'))
          $('.patientDetails').hide()
          self.patientvalue = $('#patient').attr('patientid');

          $('#patient').val($(this).html()).prop('patientemail', $(this).attr('class'))
          self.patientemail = $('#patient').prop('patientemail');
          console.log((self.patientemail.split(' ')))
          console.log(self.patientemail.split(' ')[2])
          console.log(self.patientvalue)

        })
      })


      err => {
        console.log("Token Error:" + err);
      }

    }

  }

  addpatient() {
    console.log("patient adding")
    this.addpatientshow = true;
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

  beforeChange($event: NgbTabChangeEvent) {
    console.log($event.nextId)
    if ($event.nextId === 'all') {
      this.getAlldata();
    }
    if ($event.nextId === 'pending') {
      this.getpending();
    }
    if ($event.nextId === 'confirmed') {
      this.getconfirmed();
    }
    if ($event.nextId === 'arrived') {
      this.getarrived();
    }
    if ($event.nextId === 'cancelled') {
      this.getcancelled();
    }
    if ($event.nextId === 'requested') {
      this.getrequested();
    }
    if ($event.nextId === 'waitlist') {
      this.getwaitlist();
    }
    if ($event.nextId === 'Emergency') {
      this.getemergency();
    }
  }


  departmentlist() {
    this.deptdata = [];
    var accessToken = window.localStorage.Tokenval1;
    console.log(accessToken);
    console.log(localStorage.getItem('userId'))
    // our service calling as usual
    let url = this.commonService.commonUrl + 'Account/GetUser  ';

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
    if (todaymonth.toString().length == 1) {
      var todaym = '0' + todaymonth;
    } else {
      var todaym = todaymonth.toString();
    }
    if (todaydate.toString().length == 1) {
      var todayd = '0' + todaydate;
      console.log(todaydate)
    } else {
      var todayd = todaydate.toString();
    }
    console.log(todayyear + '-' + todaym + '-' + todayd)
    this.addappointment.patchValue({
      status: 'Confirmed',
      apptdate: todayyear + '-' + todaym + '-' + todayd,
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
      let url = this.commonService.commonUrl + 'Account/GetUser  ';

      let body = {
        "text": "getemergencydoctor",
        "id": "",
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
        console.log(res)
        if (res.data.Table.length !== 0) {
          this.deptdata = res.data.Table;
        }
      }, err => {
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

  departmentschange(event) {
    console.log(event)
    this.roomdata = [];
    var accessToken = window.localStorage.Tokenval1;
    console.log(this.addappointment.value.departments)
    // let deprtmnt = this.addappointment.value.departments;
    $('.loading-icon1').show()
    let url = this.commonService.commonUrl + 'Account/GetUser';

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
    console.log("entered")
    console.log(event)
    var presentdate = new Date();
    var Pd = presentdate.getDate();
    var Pm = presentdate.getMonth();
    var Py = presentdate.getFullYear();
    console.log(Pd, Pm + 1, Py)

    var sdate = event.split('-');
    var sd = sdate[2];
    var sm = sdate[1];
    var sy = sdate[0];
    console.log(sd, sm, sy);
    if (Py < sy) {
      console.log('year')
      alert("Please Select Present Or Future Date")
      return false;
    } else if ((Py == sy) && (sm < Pm + 1)) {
      console.log(Pm + 1 < sy)
      console.log('month')
      alert("Please Select Present Or Future Date")
      return false;
    } else if ((Py == sy) && ((Pm + 1) == sm) && sd < Pd) {
      console.log('day')
      alert("Please Select Present Or Future Date")
      return false;
    }

    console.log(this.addappointment.value.rooms)
    if (event == "room") {
      event = this.appointmentdate;
      var date = event.split('-');
      var d1 = date[2];
      var m1 = date[1];
      var y1 = date[0];
      var selecteddate = m1 + '/' + d1 + '/' + y1;
      console.log(event)
    } else {
      var date = event.split('-');
      var d1 = date[2];
      var m1 = date[1];
      var y1 = date[0];
      var selecteddate = m1 + '/' + d1 + '/' + y1;
    }
    console.log(selecteddate)
    // console.log("patientvalue:"+this.patientvalue)
    console.log(this.addappointment.value.rooms)
    var accessToken = window.localStorage.Tokenval1;
    $('.loading-icon2').show()
    console.log(accessToken);
    console.log(localStorage.getItem('userId'))
    // our service calling as usual
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

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
        if (this.mobilerequest == true) {
          this.mobilerequest = false;
        } else {
          // alert("Slots not available");
         
        }
        $('.loading-icon2').hide()
      }
    })


    err => {
      console.log("Token Error:" + err);
    }


  }

  timeslots() {
    this.appointmentslots = [];
    console.log(this.timearray.Starttime, this.timearray.endtime)
    for (var i = 0; i < this.timearray.length; i++) {
      console.log(this.timearray[i].Starttime);
      // if(this.timearray[i].Starttime.includes('PM')){
      //   this.timearray[i].Starttime =  convert(this.timearray[i].Starttime);
      // }
    }
    console.log(this.timearray.endtime)
    // this.timearray.endtime = "4:00 PM";
    var et;
    if (this.timearray.endtime.split(':')[1].length == '4') {
      et = this.timearray.endtime.split(':')[1].substring(0, 2)
    } else {
      et = this.timearray.endtime.split(':')[1];
    }
    this.timearray.endtime = convert(this.timearray.endtime);

    function convert(time) {
      // time = "04:00 PM"
      console.log(time.match(/\s(.*)$/)[1])
      console.log(Number(time.match(/^(\d+)/)[1]))
      console.log(Number(time.match(/:(\d+)/)[1]))
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
          this.appointmentslots.push(this.timearrayfunmrng[i].time + " To " + this.timearray.endtime)

      }
    }

    let fromtime = this.fromhr + " To " + this.tohr
    this.addappointment.patchValue({
      slots: fromtime
    })
    $('.loading-icon2').hide()
  }



  slotschange() {

    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();
    console.log(time)
    var accessToken = window.localStorage.Tokenval1;
    var appslot = this.addappointment.value.slots.split('To')
    console.log(appslot)
    console.log(time == appslot[0])

    // let url1 = 'http://graylogic.net/OclinicoAPI1/Api/Account/CL_GetAppointments';

    // let body1 = {
    //   "text": "CheckClinikTimings",
    //   "start": this.addappointment.value.apptdate + ' ' + appslot[0].split(' ')[0],
    //   "end": this.addappointment.value.apptdate + ' ' + appslot[1].split(' ')[1],
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


    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

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
    },
      err => {
        console.log("Token Error:" + err);
      });

  }



  submit() {


    console.log(this.patientvalue)
    if (this.addappointment.value.emergency == true) {

      if (this.patientvalue == "" || this.patientvalue == undefined) {
        alert("Please Enter Patient Name")
        return false;
      }

      // this.EmergencySubmit();
      this.submitfunction();

    } else if (this.addappointment.valid == true) {
      console.log('ok')
      this.submitfunction();
    } else {
      this.CheckValidationErrors()
    }



  }

  submitfunction() {
    console.log(this.addappointment.value)
    let repeatstatus;
    if (window.localStorage.getItem("loginbaseId") !== '') {

      var accessToken = window.localStorage.Tokenval1;
      let url = this.commonService.commonUrl + 'Account/GetUser';

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
      let url = this.commonService.commonUrl + 'Account/GetUser';

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

  addsubmit(repeatstatus) {
    var emergencydata1;
    if (this.addappointment.value.emergency == true) {
      emergencydata1 = 'emergency';
    } else {
      emergencydata1 = '';
    }
    if (this.addappointment.value.slots == "") {
      this.startappntslots = '';
      this.endappntslots = '';
      this.formhr = '';
      this.tohr = '';
      this.appntdate = this.addappointment.value.apptdate;
    } else {
      var appntslots = this.addappointment.value.slots.split('To');
      this.startappntslots = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
      this.endappntslots = this.addappointment.value.apptdate + ' ' + appntslots[1].split(' ')[1];
      this.formhr = appntslots[0].split(' ')[0];
      this.tohr = appntslots[1].split(' ')[1];
      this.appntdate = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
    }
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    console.log(accessToken)
    let url = this.commonService.commonUrl + 'Account/Appointment_operations';

    let body = {
      "userid": "",
      "type": "",
      "patientid": this.patientvalue,
      "title": "",
      "description": this.addappointment.value.remarks,
      "event_start": this.startappntslots,
      "event_end": this.endappntslots,
      "Updateddt": "",
      "createddate": "",
      "arrivestatus": this.addappointment.value.status,
      "all_day": "",
      "Repeatstatus": repeatstatus,   //'' or false
      "Status": "",
      "appointdate": this.appntdate,
      "fromhr": this.formhr,
      "tohr": this.tohr,
      "text": "insertappointments",
      "login": localStorage.getItem('userId'),
      "Clinicid": localStorage.getItem('userId'),
      "appointmentid": "",
      "practitionerid": this.addappointment.value.rooms,
      "Treatmentid ": "",
      "Branchid": emergencydata1,
      "Slottype": this.addappointment.value.appointmenttypes,
      "Sittings": this.addappointment.value.departments
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
        this.addpatientform.close();
        console.log(this.addappointment.value.emergency)
        if (this.addappointment.value.emergency == true) {
          this.isPageloaderVisible = false;
          console.log("ER")
          // this.router.navigate(['/eraddpatient']);
          this.getAlldata();
        } else {
          this.isPageloaderVisible = false;
          //  this.getAlldata();
          alert("Appointment added successfully");
          if (this.addappointment.value.status == "UnConfirmed") {
            this.appointmentpendingemail()
          } else if (this.addappointment.value.status == "Confirmed") {
            this.appointmentconfirmsendmail()
          }

          this.getAlldata();
          // location.reload(true)
          //  this.router.navigateByUrl('AllComponent', {skipLocationChange: true}).then(()=>
          //      this.router.navigate(['/all'])

          //      ); 
        }

      }
      else {
        this.isPageloaderVisible = false;
      }
    },
      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      });
  }
  appointmentconfirmsendmail() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    // var appntslots = this.addappointment.value.slots.split('To');

    // this.formhr = appntslots[0].split(' ')[0];
    console.log(this.patientemail.split(' ')[2])
    let url = this.commonService.commonUrl + 'Login/Confirmmail?emailid=' + this.patientemail.split(' ')[2] + '&time=' + this.addappointment.value.apptdate + '' + this.addappointment.value.slots;


    this.http.get(url).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.isPageloaderVisible = false;
      console.log(res)
    })

  }

  appointmentpendingemail() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;

    console.log(this.patientemail.split(' ')[2])
    let url = this.commonService.commonUrl + 'Login/whileAppBooked?emailid=' + this.patientemail.split(' ')[2]

    this.http.get(url).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.isPageloaderVisible = false;
      console.log(res)
    })
  }
  updateappointmentconfirmsendmail() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval1;
    // var appntslots = this.addappointment.value.slots.split('To');

    // this.formhr = appntslots[0].split(' ')[0];
    console.log(this.patientemail.split(' ')[2])
    let url = this.commonService.commonUrl + 'Login/Confirmmail?emailid=' + this.patientemail + '&time=' + this.addappointment.value.apptdate + '' + this.addappointment.value.slots;


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
    let url = this.commonService.commonUrl + 'Login/whileAppBooked?emailid=' + this.patientemail

    this.http.get(url).map(res => res.json()).subscribe(res => {
      console.log(res)
      this.isPageloaderVisible = false;
      console.log(res)
    })
  }

  /***************************edit************************/

  openedit(id, content) {
    // this.departmentlist();
    this.addappointment.patchValue({
      patientname: null,
      status: null,
      apptdate: null,
      appointmenttypes: null,
    })
    // open(content)
    console.log(id)
    console.log(localStorage.getItem('userId'))
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

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
        console.log(res.data.Table[0].appointdate.split('-'));
        console.log(res.data.Table[0].appointdate.charAt(3))
        let yy = res.data.Table[0].appointdate.split('-')[0];
        let mm = res.data.Table[0].appointdate.split('-')[1];
        let dd = res.data.Table[0].appointdate.split('-')[2].split(' ')[0];

        if (mm.length == 1) {
          mm = '0' + mm;
        }
        if (dd.length == 1) {
          dd = '0' + dd;
        }

        this.patientemail = res.data.Table[0].Email;
        this.fromhr = res.data.Table[0].fromhr;
        this.tohr = res.data.Table[0].tohr;
        //   let fromtime = this.fromhr + " To " + this.tohr
        //  console.log(fromtime)
        console.log(mm + '/' + dd + '/' + yy)
        if (res.data.Table[0].Followup_Days == 'Emergency Department') {
          var accessToken = window.localStorage.Tokenval1;
          console.log(accessToken);
          console.log(localStorage.getItem('userId'))
          // our service calling as usual
          let url = this.commonService.commonUrl + 'Account/GetUser  ';

          let body = {
            "text": "getemergencydoctor",
            "id": "",
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
            console.log(res)
            if (res.data.Table.length !== 0) {
              this.deptdata = res.data.Table;
            }
          }, err => {
            console.log("Token Error:" + err);
          })

          $("#apttypeid1").prop("disabled", true)
          $("#dateid1").prop("disabled", true)
          $("#slotid1").prop("disabled", true)
          $("#aptid1").prop("disabled", true)
          // this.addappointment.value.emergency = true;
          var er = this.addappointment.get('emergency');
          er.setValue(true)
        } else {
          this.departmentlist();
        }

        let fromtime = this.fromhr + " To " + this.tohr
        console.log(fromtime)
        console.log(res.data.Table[0].Followup_Days)
        this.addappointment.patchValue({
          patientname: res.data.Table[0].PatientName,
          status: res.data.Table[0].arrivestatus,
          apptdate: yy + '-' + mm + '-' + dd,
          slots: fromtime,
          appointmenttypes: res.data.Table[0].type,
          departments: res.data.Table[0].Followup_Days,
          patient: res.data.Table[0].PatientName
        })
        this.patientvalue = res.data.Table[0].patientid;
        // this.datechange(res.data.Table[0].Appointment_start.split('T')[0]);
        this.appointmentdate = this.addappointment.value.apptdate

        this.selectedapp_id = res.data.Table[0].Appointment_id;
        console.log(res.data.Table[0].Followup_Days)
        //this.departmentschange(res.data.Table[0].designation);
        this.editdepartment(this.selectedapp_id);

      } else {

      }
    },
      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })




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

  mobilerequesttimeslots(event) {
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
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

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

        // this.timeslots();
        console.log(this.addappointment.value.slots)
      } else {
        alert("Slots not available")
        $('.loading-icon2').hide()
      }
    },
      err => {
        console.log("Token Error:" + err);
      })



  }
  openeditrequest(id, content) {

    this.addappointment.patchValue({
      patientname: null,
      status: null,
      apptdate: null,
      appointmenttypes: null,
    })
    // open(content)
    console.log(id)
    console.log(localStorage.getItem('userId'))
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

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
        console.log(res.data.Table[0].appointdate.charAt(3))
        let yy = res.data.Table[0].appointdate.split('-')[0];
        let mm = res.data.Table[0].appointdate.split('-')[1];
        let dd = res.data.Table[0].appointdate.split('-')[2].split(' ')[0];

        if (mm.length == 1) {
          mm = '0' + mm;
        }
        if (dd.length == 1) {
          dd = '0' + dd;
        }
        this.fromhr = res.data.Table[0].fromhr;
        this.tohr = res.data.Table[0].tohr;
        //   let fromtime = this.fromhr + " To " + this.tohr
        //  console.log(fromtime)
        console.log(mm + '/' + dd + '/' + yy)
        this.departmentlist();

        this.addappointment.patchValue({
          patientname: res.data.Table[0].PatientName,
          status: res.data.Table[0].arrivestatus,
          apptdate: yy + '-' + mm + '-' + dd,
          //slots:fromtime,
          appointmenttypes: res.data.Table[0].type,
          departments: res.data.Table[0].Followup_Days,
          patient: res.data.Table[0].PatientName
        })
        this.patientvalue = res.data.Table[0].patientid;

        // this.datechange(res.data.Table[0].Appointment_start.split('T')[0]);
        this.appointmentdate = this.addappointment.value.apptdate

        this.selectedapp_id = res.data.Table[0].Appointment_id;
        console.log(res.data.Table[0].Followup_Days)
        //this.departmentschange(res.data.Table[0].designation);
        this.mobilerequest = true;
        this.editdepartment(this.selectedapp_id);

      } else {

      }
    },
      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })




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

  editdepartment(id) {
    console.log(this.addappointment.value.status)
    // console.log(id.toString())
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/GetUser';

    let body = {
      "text": "bindappinfo",
      "id": id,
      "param1": '',
      "param2": ''
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
          departments: res.data.Table[0].designation,
          rooms: res.data.Table[0].Emp_Id
        })
        // this.datechange(this.appointmentdate)

        // this.selecteddepartment = res.data.Table[0].designation;
      } else {
        this.departmentschange(res.data.Table[0].Followup_Days);
        // this.datechange(this.appointmentdate)
      }
    },
      err => {
        console.log("Token Error:" + err);
      })



  }



  editsubmit() {
    console.log(this.addappointment)
    console.log(this.selectedapp_id)
    console.log(this.patientvalue)
    console.log(this.addappointment)
    let repeatstatus;
    if (this.addappointment.valid == true) {

      if (window.localStorage.getItem("loginbaseId") !== '') {

        var accessToken = window.localStorage.Tokenval1;
        let url = this.commonService.commonUrl + 'Account/GetUser';

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
        let url = this.commonService.commonUrl + 'Account/GetUser';

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
    } else {
      this.CheckValidationErrors()
    }




  }

  updatesubmit(repeatstatus) {
    var emergencydata2;
    console.log(this.patientvalue)
    console.log(this.addappointment.value.emergency)
    if (this.addappointment.value.emergency == true) {
      emergencydata2 = 'emergency';
    } else {
      emergencydata2 = '';
    }
    if (this.addappointment.value.slots == "") {
      this.startappntslots = '';
      this.endappntslots = '';
      this.formhr = '';
      this.tohr = '';
      this.appntdate = this.addappointment.value.apptdate;
    } else {
      var appntslots = this.addappointment.value.slots.split('To');
      this.startappntslots = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
      this.endappntslots = this.addappointment.value.apptdate + ' ' + appntslots[1].split(' ')[1];
      this.formhr = appntslots[0].split(' ')[0];
      this.tohr = appntslots[1].split(' ')[1];
      this.appntdate = this.addappointment.value.apptdate + ' ' + appntslots[0].split(' ')[0];
    }
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/Appointment_operations';
    console.log(url)
    let body = {
      "userid": localStorage.getItem('userId'),
      "type": "",
      "patientid": this.patientvalue,
      "title": "",
      "description": this.addappointment.value.remarks,
      "event_start": this.startappntslots,
      "event_end": this.endappntslots,
      "Updateddt": "",
      "createddate": "",
      "arrivestatus": this.addappointment.value.status,
      "all_day": "",
      "Repeatstatus": repeatstatus,
      "Status": "",
      "appointdate": this.appntdate,
      "fromhr": this.formhr,
      "tohr": this.tohr,
      "text": "AppointmentUpdate",
      "login": "",
      "Clinicid": localStorage.getItem('userId'),
      "appointmentid": this.selectedapp_id,
      "practitionerid": this.addappointment.value.rooms,
      "Treatmentid ": "",
      "Branchid": emergencydata2,
      "Slottype": this.addappointment.value.appointmenttypes,
      "Sittings": this.addappointment.value.departments


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
        console.log(res.data.Table)
        alert('Updated Successfully')
        if (this.addappointment.value.status == "UnConfirmed") {
          this.updateappointmentpendingemail()
        } else if (this.addappointment.value.status == "Confirmed") {
          this.updateappointmentconfirmsendmail()
        }
        this.editpatientform.close();
        this.getAlldata();
      }
    },
      err => {
        console.log("Token Error:" + err);
      })
  }
  EmergencySubmit() {
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/GetUser';


    let body = {
      "text": "insert_ERpatients",
      "id": this.patientvalue,
      "param1": localStorage.getItem('userId'),
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(body);
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.data.Table[0].Result == 'True') {
        this.isPageloaderVisible = false;
        this.addpatientform.close();
        this.router.navigate(['/erpatientinfo']);

      } else {
        alert("This patient existed");
        this.isPageloaderVisible = false;
      }
    },
    );
    error => {
      console.log(error);
      this.isPageloaderVisible = false;
    }

  }

  //------------------------------------------Export to Excel -------------------------------
  // Export to Excel All

  exportexcelall(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'All Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelpending(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Pending Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelconfirmed(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Confirmed Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelaarrived(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Arrived Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelcancelled(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Cancelled Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelrequested(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Requested Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelwaitlist(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'WaitingList Appointments', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  exportexcelemergency(table) {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Emergency Appointments', table: table.innerHTML }
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

  printrequest() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrintrequested');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  printwaitlist() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrintwaitlist');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  printemergency() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrintemergency');
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


  // ---------------------------------------- view -----------------------------------------------
  openview(id, pendingdata, confirmeddata) {
    console.log("appointment id" + id);
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/GetUser';

    let body = {
      "text": "getscaninfo",
      "id": id,
      "param1": "",
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
      this.isPageloaderVisible = false;
      if (res.status_cd == "0") {
        console.log(res.data.Table[0].status)
        if (res.data.Table[0].status == "Pending") {
          console.log("entered into pending")
          this.addappointment.patchValue({
            p_patientname: res.data.Table[0].Name,
            p_patientdob: res.data.Table[0].DOB,
            p_patientgender: res.data.Table[0].Gender,
            p_patienttype: res.data.Table[0].type,
            p_status: res.data.Table[0].status,
            appointment_id: res.data.Table[0].Appointment_id,
            patient_id: res.data.Table[0].patientid,
            doctor_name: res.data.Table[0].Doctor,
            doctor_designation: res.data.Table[0].DocDesignation
          })

          if (res.data.Table[0].Followup_Status == null || res.data.Table[0].Followup_Status == '') {
            this.QRcodeIMGshow = true;
          } else {
            this.QRcodeIMGshow = false;
          }
          this.qrcodeimg = res.data.Table[0].Followup_Status;
          this.viewpatientform = this.modalService.open(pendingdata)
          this.viewpatientform.result.then((result) => {
            console.log(result)
            if (result == "Ok click") {

            }
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            console.log(reason)
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

        }
        else {

        }
      } else {
        this.addappointment.patchValue({
          c_patientname: res.data.Table[0].Name,
          c_patientdob: res.data.Table[0].DOB,
          c_patientgender: res.data.Table[0].Gender,
          c_patienttype: res.data.Table[0].type,
          c_status: res.data.Table[0].arrivestatus,
          c_appointment_id: res.data.Table[0].Appointment_id,
          c_patient_id: res.data.Table[0].patientid,
          c_doctor_name: res.data.Table[0].Doctor,
          c_doctor_designation: res.data.Table[0].DocDesignation,
          c_clinicname: res.data.Table4[0].Clinic_Name,
          c_clinicid: res.data.Table4[0].Clinicid,
          c_clinicinfo_name: res.data.Table4[0].Name,
          c_clinicinfo_email: res.data.Table4[0].Email,
          c_clinicinfo_address: res.data.Table4[0].Address,
          c_clinicinfo_city: res.data.Table4[0].city,
          c_clinicinfo_phoneno: res.data.Table4[0].phoneno,

        })

        if (res.data.Table[0].Followup_Status == null || res.data.Table[0].Followup_Status == '') {
          this.QRcodeIMGshow = true;
        } else {
          this.QRcodeIMGshow = false;
        }
        this.qrcodeimg = res.data.Table[0].Followup_Status;
        this.viewpatientform = this.modalService.open(confirmeddata)
        this.viewpatientform.result.then((result) => {
          console.log(result)
          if (result == "Ok click") {

          }
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          console.log(reason)
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      }
    },
      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      })
  }
  // -----------------------------------------view--------------------------------------------
}



