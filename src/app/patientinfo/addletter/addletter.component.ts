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
  selector: 'app-addletter',
  templateUrl: './addletter.component.html',
  styleUrls: ['./addletter.component.css']
})
export class AddletterComponent implements OnInit {
  letters: FormGroup;
  letter: any;
  submitted = false;
  userid: any = ""
  mainPatientId: any
  doctors: any
  patient: any
  data:any;
  public Editor = ClassicEditor;
  patientId: string;
  patient_name: any;
  //description: any;
  // public onChange({ editor }: ChangeEvent) {
  //   this.data = editor.getData();
  //   console.log(this.data);
  // }
  constructor(private fb: FormBuilder, private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    this.patient = localStorage.getItem('patient')
    document.title = "Add Letters";
    this.mainPatientId = localStorage.getItem('patientId')
    this.userid = window.localStorage.getItem("userId")
    this.patient_name = sessionStorage.patient_name;
    this.getletters()
    this.getdoctors()
   
    this.letters = this.fb.group({
      lettertype: ['', Validators.required],
      doctor: ['', Validators.required],
      description: [''],
    })
  }
  get f() { 
    return this.letters.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  createletters() {

    console.log( this.letters.value.description);

    let lettertype = this.letters.value.lettertype;
    let doctor = this.letters.value.doctor;
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
      "Sno": "",
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Loginid": this.userid,
      "LetterID": lettertype,
      "Patientid": this.patientId,
      "Description":description,
      "Trans_date": "",
      "condition": "Insert",
      "doctorid": doctor
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
        alert("Letter Added Successfully")
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
    var Refrral = this.patientId
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  viewpatient() {
    var Refrral = this.patientId
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = this.patientId
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
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
      }
    });
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
      "Patientid": this.patientId,
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
        console.log("letter.." +JSON.stringify(this.letter))
      }
    });
  }

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

  lettertype(val){
    console.log("value.. "+val);
    //console.log()
    for (let i = 0; i < this.letter.length; i++) {
      console.log("enter for.. "+JSON.stringify(this.letter[i]));
      if (this.letter[i].Lettertemplate_ID == val) {
        //this.description = this.letter[i].Description
        this.letters.patchValue({
          description: this.letter[i].Description,
        })
        // console.log("enter if.. "+this.letter[i])
        // console.log("enter if.. "+val)
        // this.description = this.letter[i].Description;
      }
    }
  }
}
