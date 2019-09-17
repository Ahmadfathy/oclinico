import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DateTimeAdapter } from 'ng-pick-datetime';
@Component({
  selector: 'app-editvisitnote',
  templateUrl: './editvisitnote.component.html',
  styleUrls: ['./editvisitnote.component.css']
})
export class EditvisitnoteComponent implements OnInit {
  addvisitnote: FormGroup;
  apoinemets = []
  userid: any = ""
  submitted = false;
  sno: any;
  doctors: any
  doctor1: any
  patient: any;
  patientId: any;
  patient_name: any;
  constructor(private fb: FormBuilder,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http,
    public dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    var data1 = url1[1].split('&')[0]
    console.log(data1);
    this.sno = data1.split('=')[1];
    console.log(this.sno);
    var data2 = url1[1].split('&')[1];
    console.log(data2);
    this.patientId = data2.split('=')[1];
    console.log(this.patientId)
    this.patient_name = sessionStorage.patient_name;
    this.userid = window.localStorage.getItem("userId")
    this.getdata()
    this.patient = localStorage.getItem('patient')
    document.title = "Edit VisitNote"
    this.getdoctors();
    this.addvisitnote = this.fb.group({
      doctor: ['', Validators.required],
      visitdate: ['', Validators.required],
      note: ['', Validators.required],
    })
  }


  get f() { return this.addvisitnote.controls; }
  onSubmit() {
    this.submitted = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // our service calling as usual
    var url = this.cmn.commonUrl + "Account/VisitNote_Details";
    let body = {
      "Sno": this.sno,
      "Clinicid": this.userid,
      "BranchID": "",
      "VistID": "",
      "PatientID": localStorage.getItem('patientId'),
      "DoctorID": "",
      "Notes": "",
      "Status": "",
      "LoginID": this.userid,
      "Trans_Date": "",
      "Last_update": "",
      "Arrival_Datetime": "",
      "Condition": "getbysno"
    }

    console.log(body)

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "1") {
        var dateObj = result.data.Table[0].Arrival_DateTime.split('/');
        var date = dateObj[2] + "-" + dateObj[1] + "-" + dateObj[0];


        //this.Attachments.controls.uploadfile.patchValue(result.data.Table[0].Attachment)
        //this.addvisitnote.controls.doctor.patchValue(result.data.Table[0].DoctorID)
        this.addvisitnote.controls.visitdate.patchValue(date)
        this.addvisitnote.controls.note.patchValue(result.data.Table[0].Notes)
        this.addvisitnote.controls.doctor.patchValue(result.data.Table[0].DoctorID)
        this.addvisitnote.controls.apoinemets.patchValue(result.data.Table[0].dt)
        // this.doctor1=result.data.Table[0].DoctorID



        //$('#dataTable_wrapper').hide();
      }
      else {

        // this.table = result.data.Table;



      }


    })

    //},
    err => {
      console.log("Token Error:" + err);
    }

    //);
  }
  updatevisitenote() {
    let apid = $('.apid').val()
    if (apid == "" || apid == "null" || apid == "Select") {
      return
    }

    let doctor = this.addvisitnote.value.doctor;
    let visitdate = this.addvisitnote.value.visitdate;
    let note = this.addvisitnote.value.note;
    let test = this.addvisitnote.status;
    var update = visitdate.split('/');
    var date = update[2] + "-" + update[1] + "-" + update[0];
    if (test == "INVALID") {

      return
    }



    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;


    var url = this.cmn.commonUrl + "Account/VisitNote_Details";
    let body = {
      "Sno": this.sno,
      "Clinicid": this.userid,
      "BranchID": "10008",
      "VistID": apid,
      "PatientID": localStorage.getItem('newpatientId'),
      "DoctorID": doctor,
      "Notes": note,
      "Status": "Active",
      "LoginID": this.userid,
      "Trans_Date": "",
      "Last_update": "",
      "Arrival_Datetime": date,
      "Condition": "Update"
    }
    // console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      //  console.log(res)
      if (res.status_cd == "1") {
        alert("successfully Updated")

        var Refrral = this.patientId

        this.router.navigate(['/visitnote'], { queryParams: { Refrral } });
        //this.router.navigate(['/visitnote']);
      }
      else {

        console.log("error")
      }
    })

    // err => {                       
    //   console.log("ERROR!: ", err);  }
    //})
  }
  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  lab() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  getdoctors() {
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "FirstName": "",
      "par1": "",
      "par2": this.userid,
      "par3": "",
      "condition": "GetDoctor"
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetPatients";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      // console.log(res)
      if (res.status_cd == "1") {
        this.doctors = res.data.Table;
      }
    });
    //})
  }

  selectAppointment(event) {
    let doctors = (event.target.value)

    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "FirstName": "000100",
      "par1": "94524467",
      "par2": "10008",
      "par3": "",
      "condition": "visitnote"

    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetPatients";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      // console.log(res)
      if (res.status_cd == "1") {
        this.apoinemets = res.data.Table;
        // this.apointVal = res.data.Table[0].
        // this.presription.controls.apointment.patchValue(res.data.Table[0].dt)


      }
    });
    // })




  }


  // patientnamebind(){
  //   var accessToken = window.localStorage.Tokenval ;
  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken
  //     });
  //     let body={"text": "patient_name",
  //     "id": this.patientId,
  //     "param1": "",
  //     "param2": ""
  //     }
  //     let options = new RequestOptions({ headers: headers });
  //     var url = this.cmn.commonUrl + "Account/GetUser";
  //     this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //      // console.log(res)
  //       if (res.status_cd == "1") {
  //         this.patient_name = res.data.Table[0].PatientName;
  //       }
  //     });
  // }
}
