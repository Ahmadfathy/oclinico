import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewvisitnote',
  templateUrl: './viewvisitnote.component.html',
  styleUrls: ['./viewvisitnote.component.css']
})
export class ViewvisitnoteComponent implements OnInit {
  patient: any
  patientId: any
  sno: any;
  table = [];
  table1 = [];
  userid: any = ""
  patient_name: any;
  viewvisitnote: FormGroup;
  filenumber: any;
  pname: any;
  pmobile: any;
  dob: any;
  dname: any;
  note: any
  email: any;
  website: any;
  phoneno: any;
  constructor(private fb: FormBuilder,
    public cmn: UserinfoService,
    public http: Http) { }

  ngOnInit() {
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
    console.log(this.patientId)
    this.patient = localStorage.getItem('patient')
    this.userid = window.localStorage.getItem("userId")
    document.title = "View Visitnote"
    this.getdata();
    this.viewvisitnote = this.fb.group({
      filenumber: [],
      pname: [],
      pmobile: [],
      dob: [],
      dname: [],
      note: []
    })

  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/VisitNote_Details";
    console.log(this.patientId);
    let body = {
      "Sno": this.sno,
      "Clinicid": this.userid,
      "BranchID": "",
      "VistID": "",
      "PatientID": this.patientId,
      "DoctorID": "",
      "Notes": "",
      "Status": "",
      "LoginID": this.userid,
      "Trans_Date": "",
      "Last_update": "",
      "Arrival_Datetime": "",
      "Condition": "Getdata"
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
        this.table = result.data.Table;
        this.table1 = result.data.Table1;
        console.log("result.... " + JSON.stringify(this.table));
        console.log("result.... " + JSON.stringify(result));
        this.filenumber = result.data.Table[0].PatientID
        this.pname = result.data.Table[0].PatientName
        this.pmobile = result.data.Table[0].Mobileno
        this.dob = result.data.Table[0].DOB
        this.dname = result.data.Table[0].DoctorName
        this.note = result.data.Table[0].Notes
        this.email = result.data.Table1[0].Email
        this.website = result.data.Table1[0].Website
        this.phoneno = result.data.Table1[0].mobileno

      }
      else {
      }
    })
  }

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

}
