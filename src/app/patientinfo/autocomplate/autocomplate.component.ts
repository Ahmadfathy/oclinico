import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-autocomplate',
  templateUrl: './autocomplate.component.html',
  styleUrls: ['./autocomplate.component.css']
})
export class AutocomplateComponent implements OnInit {
  userid: string;
  table: any;
  showdata: boolean;
  showLoader: boolean = true;
  constructor(public cmn: UserinfoService, public http: Http) { }

  ngOnInit() {
    this.showLoader = false;
    this.userid = window.localStorage.getItem("userId")
  }

  autocomplate() {
    this.showLoader = true;
    let petientid = $('#pid').val();
    let email = $('#Email').val();
    let fname = $('#fname').val();
    let maname = $('#mname').val();
    let lname = $('#lname').val();
    let afname = $('#afname').val();
    let patienttype=$('#patienttype').val()
    let afathername = $('#afathername').val();
    let alname = $('#alname').val();
    let mobileno = $('#mobileno').val();
    // let city = $('#city').val();
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    var url = this.cmn.commonUrl + "Account/getdata";
    let body = {
      "sno": "",
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": petientid,
      "Ara_firstname": afname,
      "Ara_Lastname": alname,
      "Ara_fathername": afathername,
      "First_name": fname,
      "Last_Name": lname,
      "Middle_name": maname,
      "DOB": "",
      "DOB_Arabic": "",
      "Country": "",
      "Email": email,
      "Mobileno": mobileno,
      "City": patienttype,
      "Condition": "patientdetailsearch"
    }
    console.log("body" +JSON.stringify(body));
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "1") {
        this.table = result.data.Table;
        this.showdata = true;
        this.showLoader = false;
      } else {
        this.showdata = false;
        this.showLoader = false;
        alert("No records found");
      }

    })
  }

}
