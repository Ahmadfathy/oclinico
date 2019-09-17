import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';



@Component({
  selector: 'app-addtreatment',
  templateUrl: './addtreatment.component.html',
  styleUrls: ['./addtreatment.component.css']
})
export class AddtreatmentComponent implements OnInit {
  treatmentnote: FormGroup;
  apoinemets = []
  table = []
  first: boolean = true
  first1: boolean = true
  Progress: boolean = false
  showLoader: boolean = false;
  userid: any = ""
  mainPatientId: any
  Patientprogress: any = "";
  Cronic: any = ""
  patient: any;
  patientId: string;
  tablegrid: any;
  patient_name: any;
  m: any;
  noap: boolean = false;
  table3: any;
  table2: any;
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.treatmentnote = this.fb.group({
      selecttype: [''],
      selectaponement: ['']
    })

    document.title = "Add Treatment Note"

    var url = document.URL
    var url1 = url.split('?')
    var getid = url1[1].split('=')[1];
    this.patientId = getid.split(":")[0]
    //alert(this.patientId)
    this.userid = window.localStorage.getItem("userId")
    sessionStorage.setItem('patientId', this.patientId)
    this.patient_name = sessionStorage.patient_name;
    // this.mainPatientId = sessionStorage.getItem('patientIdNew')
    this.patient = localStorage.getItem('patient')
    this.getdatatrement()


    // this.selectAppointment(event)
  }

  firstapointment(val) {
console.log(val)
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
    //alert(apid)
    // alert(select)
    // alert(this.Cronic)
    //alert(Patientprogress)
    if (select == "First Appointment") {
      if (Temperature == "" || bp == "" || Sugar == "" || Weight == "" || Height == "" || ALLergy == "" || Complaintpresent == "" || Complainthistory == "" || Medicalhistory == "" ||
        Medication == "" || Assessment == "" || Treatment == "" || Treatmentplan == "" || apid == null || apid == undefined) {
        alert("plase enter data...")
        return
      }
    }


    //  if(select=="Standard Appointment"){

    // }
    //   else if(Temperature==""||bp==""||Sugar==""||Weight==""||Height==""||ALLergy==""||Complaintpresent==""||Complainthistory==""||Medicalhistory==""||
    // Medication==""||Assessment==""||Treatment==""||Treatmentplan==""){
    //   alert("plase enter data...")
    //   return
    // }

    if (select == "Standard Appointment") {
      if (Temperature == "" || bp == "" || Sugar == "" || Weight == "" || Height == "" || ALLergy == "" || this.Patientprogress == "" || apid == null || apid == undefined) {
        alert("plase enter data...")
        return
      }
    }


    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

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
      //console.log(result)
      if (result.status_cd == "1") {

        alert("Successfully Insert")
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

  getSelectedApid(evnt) {

    console.log(evnt.target.value);
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
    //alert(apid)
    // alert(select)
    // alert(this.Cronic)
    //alert(Patientprogress)

    // if (select == "First Appointment") {
    //   if (Temperature == "" || bp == "" || Sugar == "" || Weight == "" || Height == "" || ALLergy == "" || Complaintpresent == "" || Complainthistory == "" || Medicalhistory == "" ||
    //     Medication == "" || Assessment == "" || Treatment == "" || Treatmentplan == "" || apid == null || apid == undefined) {
    //     alert("plase enter data...")
    //     return
    //   }
    // }


    //  if(select=="Standard Appointment"){

    // }
    //   else if(Temperature==""||bp==""||Sugar==""||Weight==""||Height==""||ALLergy==""||Complaintpresent==""||Complainthistory==""||Medicalhistory==""||
    // Medication==""||Assessment==""||Treatment==""||Treatmentplan==""){
    //   alert("plase enter data...")
    //   return
    // }


    //r
    // if (select == "Standard Appointment") {
    //   if (Temperature == "" || bp == "" || Sugar == "" || Weight == "" || Height == "" || ALLergy == "" || this.Patientprogress == "" || apid == null || apid == undefined) {
    //     alert("plase enter data...")
    //     return
    //   }
    // }


    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Treatment_operations";
    let body = {
      "Treatment_id": "",
      "Appointmentid": apid,
      "Patientid": this.patientId,
      "clinicid": this.userid,
      "AType": select,
      "Presentingcomplaint": Complaintpresent || "",
      "ComplaintHistory": Complainthistory || "",
      "MedicalHistory": Medicalhistory || "",
      "Medication": Medication || "",
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
      "cronicdiseases": this.Cronic || ""

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


  selectAppointment(event) {
    let aptype = (event)

    if (event == "First Appointment" || event == "Select") {
      this.first = true
      this.first1 = true
      this.Progress = false
    }
    else if (event == "Standard Appointment") {
      this.first = false;
      this.Progress = true
      this.first1 = true
    }
    console.log(aptype);

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "text": "getappoint_treatment",
      "id": this.patientId,
      "param1": aptype,
      "param2": this.userid
    }
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/GetUser";

    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        this.apoinemets = res.data.Table;
        // this.treatmentnote.controls.selectaponement.patchValue(res.data.Table[0].Appointment_id)
      } else {
        this.apoinemets = [];
      }
    });
    
  }



  getdatatrement() {


    let d = new Date();
    let d1 = d.getDate();
    this.m = d.getMonth() + 1;
    let y = d.getFullYear();

    if (this.m.toString().length === 1) {
      this.m = '0' + this.m
    }
    let date = d1 + "/" + this.m + "/" + y;



    this.showLoader = true;
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    // our service calling as usual
    let url = this.cmn.commonUrl + 'Account/GetUser';
    let body = {
      "text": "Treat_notes",
      "id": this.patientId,
      "param1": this.userid,
      "param2": date
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
      //this.presentcomplainet=res.data.Table[0].Presenting complaint;

      this.showLoader = false;

      if (res.status_cd == "1") {
        this.tablegrid = res.data.Table;
        this.table3 = res.data.Table3;
        this.selectAppointment(res.data.Table[0].AType);
        this.treatmentnote.patchValue({

          selectaponement: res.data.Table[0].Appointmentid,
          selecttype: res.data.Table[0].AType,

        });
        // if (res.data.Table2.length == 0) {
        //   this.noap = true;
        // } else {
        //   this.noap = false;
        //   this.table2 = res.data.Table2
        // }

        var event = {
          target: {
            value: res.data.Table[0].AType
          }
        }
       

      } else {
        //this.showLoader = false;


      }






      error => {
        // this.showLoader = false;
        alert("There is an error accured, Please try after some time.");
      }
    })

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
