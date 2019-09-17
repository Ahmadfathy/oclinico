import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edittretement',
  templateUrl: './edittretement.component.html',
  styleUrls: ['./edittretement.component.css']
})
export class EdittretementComponent implements OnInit {
  treatmentnote: FormGroup;
  table: any;
  userid: any;
  patientId: string;
  apoinemets = []
  //table = []
  first: boolean = true
  first1: boolean = true
  Progress: boolean = false
  showLoader: boolean = true;
  //userid: any = ""
  mainPatientId: any
  Patientprogress: any = "";
  Cronic: any = ""
  patient: any;
  Aptype: any;
  patient_name: any;
  // patientId: string;


  constructor(private fb: FormBuilder, 
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, ) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    this.userid = window.localStorage.getItem("userId")
    this.patient_name = sessionStorage.patient_name;
    this.getdata();
    this.treatmentnote = this.fb.group({
      selecttype: [''],
      selectaponement: [''],
      tempture: [''],
      bp: [''],
      sugar: [''],
      weight: [''],
      Height: [''],
      ALLergy: [''],
      Presentcomplainet: [''],
      complainthistory: [''],
      Medicalhistory: [''],
      Medication: [''],
      Assessment: [''],
      treatmentnote: [''],
      Treatmentplan: [''],
      cronicdise: [''],
    })
  }

  firstapointment(val) {

    if (val == "First Appointment" || val == "Select") {
      this.first = true
      this.first1 = true
      this.Progress = false
    }
    else if (val == "Standard Appointment") {
      this.first = false;
      this.Progress = true
      this.first1 = true
    }
  }




  getdata() {

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    let url = this.cmn.commonUrl + 'Account/GetUser';
    let body = {
      "text": "Treat_notes",
      "id": this.patientId,
      "param1": this.userid,
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
      if (res.status_cd == "1") {
        this.table = res.data.Table;
        this.treatmentnote.controls.Assessment.patchValue(res.data.Table[0].Assessment)
        this.treatmentnote.controls.ALLergy.patchValue(res.data.Table[0].Allergy)
        this.treatmentnote.controls.complainthistory.patchValue(res.data.Table[0].Complainthistory)
        this.treatmentnote.controls.Height.patchValue(res.data.Table[0].Height)
        this.treatmentnote.controls.Medicalhistory.patchValue(res.data.Table[0].Medicalhistory)
        this.treatmentnote.controls.Medication.patchValue(res.data.Table[0].Medication)
        this.treatmentnote.controls.Presentcomplainet.patchValue(res.data.Table[0].Presentingcomplaint)
        this.treatmentnote.controls.treatmentnote.patchValue(res.data.Table[0].Treatment)
        this.treatmentnote.controls.Treatmentplan.patchValue(res.data.Table[0].TreatmentPlan)
        this.treatmentnote.controls.cronicdise.patchValue(res.data.Table[0].cronicdiseases)
        this.treatmentnote.controls.weight.patchValue(res.data.Table[0].Weight)
        this.treatmentnote.controls.tempture.patchValue(res.data.Table[0].Temperature)
        this.treatmentnote.controls.sugar.patchValue(res.data.Table[0].Sugar)
        this.treatmentnote.controls.bp.patchValue(res.data.Table[0].BP)
        this.Aptype = res.data.Table[0].AType;
        this.selectAppointment(this.Aptype);
      } else {
      }
    },
      error => {

        alert("There is an error accured, Please try after some time.");
      })
  }

  selectAppointment(apid) {
    console.log(apid);
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "getappoint_treatment",
      "id": this.patientId,
      "param1": apid,
      "param2": this.userid
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";

    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.apoinemets = res.data.Table;
        this.treatmentnote.patchValue({
          selectaponement: res.data.Table[0].Appointment_id,
          selecttype: res.data.Table[0].type,
        });
      } else {
      }
    });
  }

  createtrtement() {
    let select = $('#selecttype').val();
    let Temperature = $('#Temperature').val();
    let bp = $('#BP').val();
    let Sugar = $('#Sugar').val();
    let Weight = $('#Weight').val();
    let Height = $('#Height').val();
    let ALLergy = $('#ALLergy').val();
    let Complaintpresent = $('#Complaintpresent').val();

    let Complainthistory = $('#Complainthistory').val();
    let Medicalhistory = $('#Medicalhistory').val();
    let Medication = $('#Medication').val();
    let Assessment = $('#Assessment').val();

    let Treatment = $('#Treatment').val();
    let Treatmentplan = $('#Treatmentplan').val();
    this.Patientprogress = $('#Progress').val() == "undefined" ? "" : this.Patientprogress;
    this.Cronic = $('#Cronic').val();
    let apid = $('.apid').val();
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Treatment_operations";
    let body = {
      "Treatment_id": "",
      "Appointmentid": apid,
      "Patientid": this.patientId,
      "clinicid": this.userid,
      "AType": select,
      "Presentingcomplaint": Complaintpresent,
      "ComplaintHistory": Complainthistory,
      "MedicalHistory": Medicalhistory,
      "Medication": Medication,
      "Assessment": Assessment,
      "Treatment": Treatment,
      "Treatmentplan": Treatmentplan,
      "Updatedby": this.patientId,
      "status": "Save",
      "text": "insert",
      "branchid": "",
      "progressreport": this.Patientprogress,
      "param2": "VAL",
      "extra": "data",
      "Temperature": Temperature,
      "BP": bp,
      "Sugar": Sugar,
      "Weight": Weight,
      "Height": Height,
      "Allergy": ALLergy,
      "cronicdiseases": this.Cronic

    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd == "1") {
        alert("Successfully Insert")
        var Refrral = this.patientId
        this.router.navigate(['/treatmentnote'], { queryParams: { Refrral } });
        localStorage.setItem('cronic', this.Cronic);
      }
      else {

      }
      err => {
      }
    })
  }

  savedraft() {
    let select = $('#selecttype').val();
    let Temperature = $('#Temperature').val();
    let bp = $('#BP').val();
    let Sugar = $('#Sugar').val();
    let Weight = $('#Weight').val();
    let Height = $('#Height').val();
    let ALLergy = $('#ALLergy').val();
    let Complaintpresent = $('#Complaintpresent').val();

    let Complainthistory = $('#Complainthistory').val();
    let Medicalhistory = $('#Medicalhistory').val();
    let Medication = $('#Medication').val();
    let Assessment = $('#Assessment').val();

    let Treatment = $('#Treatment').val();
    let Treatmentplan = $('#Treatmentplan').val();
    this.Patientprogress = $('#Progress').val() == "undefined" ? "" : this.Patientprogress;
    this.Cronic = $('#Cronic').val();
    let apid = $('.apid').val();

    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Treatment_operations";
    let body = {
      "Treatment_id": "",
      "Appointmentid": apid,
      "Patientid": this.patientId,
      "clinicid": this.userid,
      "AType": select,
      "Presentingcomplaint": Complaintpresent,
      "ComplaintHistory": Complainthistory,
      "MedicalHistory": Medicalhistory,
      "Medication": Medication,
      "Assessment": Assessment,
      "Treatment": Treatment,
      "Treatmentplan": Treatmentplan,
      "Updatedby": this.patientId,
      "status": "Draft",
      "text": "insert",
      "branchid": "",
      "progressreport": this.Patientprogress,
      "param2": "VAL",
      "extra": "data",
      "Temperature": Temperature,
      "BP": bp,
      "Sugar": Sugar,
      "Weight": Weight,
      "Height": Height,
      "Allergy": ALLergy,
      "cronicdiseases": this.Cronic

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

        alert("Successfully added")
        var Refrral = this.patientId

        this.router.navigate(['/treatmentnote'], { queryParams: { Refrral } });
        localStorage.setItem('cronic', this.Cronic);
      }
      else {

      }
      err => {
        //console.log("ERROR!: ", err);
      }
    })


    //})


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
  //       console.log(res)
  //       if (res.status_cd == "1") {
  //         this.patient_name = res.data.Table[0].PatientName;
  //       }
  //     });
  // }

}
