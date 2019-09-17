
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';



import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-editletters',
  templateUrl: './editletters.component.html',
  styleUrls: ['./editletters.component.css']
})
export class EditlettersComponent implements OnInit {
  patient: any;
  letters: FormGroup;
  //lettertype: any
  letter: any
  submitted = false;
  userid: any = ""
  sno: any;
  doctors: any
  doctor1: any
  mainPatientId: any
  patientId: any;
  public Editor = ClassicEditor;
  patient_name: any;
  docname: any;

  constructor(private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http, private meta: Meta,
    private MainTitle: Title, ) { }

  ngOnInit() {
    this.patient = localStorage.getItem('patient')
    document.title = "Edit Letters"
    this.userid = window.localStorage.getItem("userId")
    this.letters = this.fb.group({
      lettertype: ['', Validators.required],
      doctor: ['', Validators.required],
      description: [''],
    })
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    var data1 = url1[1].split('&')[0]
    console.log(data1);
    this.sno = data1.split('=')[1];
    console.log(this.sno);
    var data2 = url1[1].split('&')[1];
    console.log(data2);
    this.patientId = data2.split('=')[1];
    this.getdata();
    this.getletters();
  
    this.getdoctors()
  }
  get f() { return this.letters.controls; }

  onSubmit() {
    this.submitted = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Patient_Letters";
    let body = {
      "Sno": this.sno,
      "Clinicid": this.userid,
      "Branchid": "",
      "Loginid": this.userid,
      "LetterID": "",
      "Patientid": this.patientId,
      "Description": "",
      "Trans_date": "",
      "condition": "GetPtientLetters",
      "doctorid": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(JSON.stringify(result))
      if (result.status_cd == "1") {
        this.letters.patchValue({
          lettertype:result.data.Table[0].Letter_ID,
          doctor:result.data.Table[0].Emp_Id,
          description:result.data.Table[0].Description
        });
        console.log(this.letters)
      }
      else {
      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }

  updateletters() {
    
    let lettertype = this.letters.value.lettertype;
    let doctor = this.letters.value.doctor;
    console.log(doctor);
    let description = this.letters.value.description;
    let test = this.letters.status;
    if (test == "INVALID") {
      return
    }
    else if (description == "") {
      alert("Please Enter Description")
      return
    }
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Patient_Letters";
    let body = {
      "Sno": this.sno,
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Loginid": this.userid,
      "LetterID": "",
      "DoctorName":"",
      "LetterName": lettertype,
      "Patientid": "",
      "Description": description,
      "Trans_date": "",
      "condition": "Update",
      "doctorid": doctor
    }

    console.log(body);
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      if (res.status_cd == "1") {
        alert("Updated Successfully")
        var Refrral = this.patientId
        this.router.navigate(['/letters'], { queryParams: { Refrral } });
      }
      else {
      }
    })
    err => {
      console.log("ERROR!: ", err);
    }
  }

  cancel() {
    var Refrral = localStorage.getItem('patientId')
    console.log(Refrral)
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

  getletters() {
    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": "",
      "Loginid": "",
      "LetterID": "",
      "Patientid": "",
      "Description": "",
      "Trans_date": "",
      "condition": "GetLetters",
      "doctorid": ""
    }

    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "Account/Patient_Letters";
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      if (res.status_cd == "1") {
        this.letter = res.data.Table;
      }
    });
  }

  lettertype(val){
    console.log("value.. "+val);
    //console.log()
    for (let i = 0; i < this.letter.length; i++) {
     // console.log("enter for.. "+JSON.stringify(this.letter[i]));
      if (this.letter[i].Lettertemplate_ID == val) {
        this.letters.patchValue({
          description: this.letter[i].Description,
          //lettertype: this.letters[i].Lettertemplate_ID
        })
      }
    }
  }

  getdoctors() {
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
      if (res.status_cd == "1") {
        this.doctors = res.data.Table;
        console.log(JSON.stringify(this.doctors));
      }
    });
  }

  // doctype(val){
  //   console.log("value.. "+val);
  //   for (let i = 0; i < this.doctors.length; i++) {
  //      if (this.doctors[i].Emp_Id == val) {
  //       this.letters.patchValue({
  //         doctor: this.letter[i].First_name
  //       })
  //      }
  //    }
  //   this.docname = val;
  // }

  // patientnamebind() {
  //   var accessToken = window.localStorage.Tokenval;
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let body = {
  //     "text": "patient_name",
  //     "id": this.patientId,
  //     "param1": "",
  //     "param2": ""
  //   }
  //   let options = new RequestOptions({ headers: headers });
  //   var url = this.cmn.commonUrl + "Account/GetUser";
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //     console.log(res)
  //     if (res.status_cd == "1") {
  //       this.patient_name = res.data.Table[0].PatientName;
  //     }
  //   });
  // }
}
