import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-viewletters',
  templateUrl: './viewletters.component.html',
  styleUrls: ['./viewletters.component.css']
})
export class ViewlettersComponent implements OnInit {
  patient: any
  sno: any;
  userid: any = ""
  Address: any;
  clincname: any
  table1: any = [];
  table: any = [];
  mainPatientId: any
  patientId: string;
  patient_name: any;
  val: any;
  myemail : any;
  mycontact: any;
  mywebsite: any;
  description: any;
  constructor(private fb: FormBuilder, private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    document.title = "View Letters"
    this.userid = window.localStorage.getItem("userId")
    var url = document.URL
    var url1 = url.split('?')
    var data1 = url1[1].split('&')[0]
    console.log(data1);
    this. sno = data1.split('=')[1];
    console.log(this.sno);
    var data2 = url1[1].split('&')[1];
    console.log(data2);
    this.patientId = data2.split('=')[1];
    console.log("patient id... " + this.patientId)
    this.getdata();
    
  }

  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }

  lab() {
    var Refrral = localStorage.getItem('patientId')
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Patient_Letters";
    let body = {
      "Sno":this.sno,
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Loginid": this.userid,
      "LetterID": this.userid,
      "Patientid": this.patientId,
      "Description": "",
      "Trans_date": "",
      "condition": "GetPtientLetters",
      "doctorid": ""
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
        this.table1 = result.data.Table1;
        this.table = result.data.Table;
        for(var i=0;i<this.table.length;i++){
          if( this.table[i].Sno == this.sno){
            this.description = this.table[i].Description;
          }
        }
        // for(var i=0;i<this.table1.length;i++){
        //   if( this.table1[i].Sno == this.sno){
        //     this.description = this.table[i].Description;
        //   }
        // }
        this.myemail = result.data.Table1[0].Email;
        this.mywebsite = result.data.Table1[0].Website;
        this.mycontact = result.data.Table1[0].phoneno;
      }
      else {
      }
    })
  }

  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display='block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
   setTimeout(function () { newWin.close();divToPrint.style.display='none'}, 1000);
  }

  myFunction() {
    window.print();
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
  //     "id": this.patient,
  //     "param1": "",
  //     "param2": ""
  //   }
  //   let options = new RequestOptions({ headers: headers });
  //   var url = this.cmn.commonUrl + "Account/GetUser";
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //     if (res.status_cd == "1") {
  //       this.patient_name = res.data.Table[0].PatientName;
  //     }
  //   });
  // }
}
