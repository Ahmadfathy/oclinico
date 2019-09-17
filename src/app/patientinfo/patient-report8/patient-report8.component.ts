import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-patient-report8',
  templateUrl: './patient-report8.component.html',
  styleUrls: ['./patient-report8.component.css']
})
export class PatientReport8Component implements OnInit {

  p1: any;
  p2: any;
  p3: any;
  p4: any;
  p5: any;
  p6: any;
  p7: any;
  p8: any;
  p9: any;
  p10: any;
  p11: any;
  p12: any;
  lablenames: any;
  values: any;
  public isPageloaderVisible = false;

  lable1: any
  lable2: any
  lable3: any
  lable4: any
  lable5: any
  lable6: any
  userid: any;
  constructor(
    private router: Router, 
    public commonService: UserinfoService,
    public http: Http,) {
  }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
  }

  print() {

    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print2.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  submit() {

    if (this.p1 === undefined || this.p1 === null || this.p1 == "") {
      this.p1 = ""
    }
    if (this.p2 === undefined || this.p2 === null || this.p2 == "") {
      this.p2 = ""
    }
    if (this.p3 === undefined || this.p3 === null || this.p3 == "") {
      this.p3 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    if (this.p5 === undefined || this.p5 === null || this.p5 == "") {
      this.p5 = ""
    }
    if (this.p6 === undefined || this.p6 === null || this.p6 == "") {
      this.p6 = ""
    }
    if (this.p7 === undefined || this.p7 === null || this.p7 == "") {
      this.p7 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    if (this.p8 === undefined || this.p8 === null || this.p8 == "") {
      this.p8 = ""
    }
    if (this.p9 === undefined || this.p9 === null || this.p9 == "") {
      this.p9 = ""
    }
    if (this.p10 === undefined || this.p10 === null || this.p10 == "") {
      this.p10 = ""
    }
    if (this.p11 === undefined || this.p11 === null || this.p11 == "") {
      this.p11 = ""
    }
    if (this.p12 === undefined || this.p12 === null || this.p12 == "") {
      this.p12 = ""
    }


    this.lablenames = "1" + "," + "2" + "," + "3" + "," + "4" + "," + "6" + "," + "7" + "," + "5" + "," + "8" + "," + "9" + "," + "10" + "," + "11" + "," + "12"

    this.values = this.p1 + "," + this.p2 + "," + this.p3 + "," + this.p4 + "," + this.p7 + "," + this.p6 + "," + this.p5 + "," + this.p9 + "," + this.p8 + "," + this.p12 + "," + this.p11 + "," + this.p10

    console.log(this.lablenames);
    console.log(this.values);



    this.isPageloaderVisible = true;
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    // console.log(accessToken);


    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "111",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": this.lablenames,
      "status": this.values,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(params)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);

      if (result.status_cd === "1") {
        this.isPageloaderVisible = false;
        alert("Inserted Successfully");
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });

      } else {
        this.isPageloaderVisible = false;

      }
    },
      error => {
        this.isPageloaderVisible = false;

        console.log(error);

      }
    );


  }

}
