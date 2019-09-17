import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-sickleavereport',
  templateUrl: './patient-sickleavereport.component.html',
  styleUrls: ['./patient-sickleavereport.component.css']
})
export class PatientSickleavereportComponent implements OnInit {

  recordno: any;
  pname: any;
  nationality: any;
  dob: any
  occupation: any
  workplace: any
  dateofvisit: any
  admissiondate: any
  dischargedate: any
  signature1: any
  badge: any
  physicianname: any
  signature2: any
  signature3: any
  currentdate: any
  male: any;
  female: any;
  gender: any;
  startingcheck: any;
  fromdatecheck: any;
  endofcheck: any;
  reasonscheck: any;
  Approvalcheck: any;
  facultycheck: any;
  disabilitycheck: any;
  otherscheck: any;
  userid: any;


  constructor(public http: Http,
    private router: Router,
    public commonService: UserinfoService) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
  }

  print() {
    console.log(this.pname)
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

  genderchange(event) {
    (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Female1')).removeAttribute('checked');
    if (event.target.value == "Female") {
      console.log('female');
      this.gender = 'Female';
      (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('Female1')));
    } else {
      this.gender = 'Male'
      console.log((<HTMLInputElement>document.getElementById('Male1')));
      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
    }
  }


  changecheckbox(event, text) {
    console.log(event.target.value,text);
    if(this.startingcheck == true){
      (<HTMLInputElement>document.getElementById('pstarting')).setAttribute('checked', 'true');
    }else if(this.startingcheck == false){
      this.startingcheck = '';
      (<HTMLInputElement>document.getElementById('pstarting')).removeAttribute('checked');
    }
    if(this.fromdatecheck == true){
      (<HTMLInputElement>document.getElementById('pfromdate')).setAttribute('checked', 'true');
    }else if(this.fromdatecheck == false){
      this.fromdatecheck = '';
      (<HTMLInputElement>document.getElementById('pfromdate')).removeAttribute('checked');
    }
    if(this.endofcheck == true){
      (<HTMLInputElement>document.getElementById('pendof')).setAttribute('checked', 'true');
    }else if(this.endofcheck == false){
      this.endofcheck = '';
      (<HTMLInputElement>document.getElementById('pendof')).removeAttribute('checked');
    }
    if(this.reasonscheck == true){
      (<HTMLInputElement>document.getElementById('preasons')).setAttribute('checked', 'true');
    }else if(this.reasonscheck == false){
      this.reasonscheck = '';
      (<HTMLInputElement>document.getElementById('preasons')).removeAttribute('checked');
    }
    if(this.Approvalcheck == true){
      (<HTMLInputElement>document.getElementById('pApproval')).setAttribute('checked', 'true');
    }else if(this.Approvalcheck == false){
      this.Approvalcheck = '';
      (<HTMLInputElement>document.getElementById('pApproval')).removeAttribute('checked');
    }
    if(this.facultycheck == true){
      (<HTMLInputElement>document.getElementById('pfaculty')).setAttribute('checked', 'true');
    }else if(this.facultycheck == false){
      this.facultycheck = '';
      (<HTMLInputElement>document.getElementById('pfaculty')).removeAttribute('checked');
    }
    if(this.disabilitycheck == true){
      (<HTMLInputElement>document.getElementById('pdisability')).setAttribute('checked', 'true');
    }else if(this.disabilitycheck == false){
      this.disabilitycheck = '';
      (<HTMLInputElement>document.getElementById('pdisability')).removeAttribute('checked');
    }
    if(this.otherscheck == true){
      (<HTMLInputElement>document.getElementById('pothers')).setAttribute('checked', 'true');
    }else if(this.otherscheck == false){
      this.otherscheck = '';
      (<HTMLInputElement>document.getElementById('pothers')).removeAttribute('checked');
    }
  }
  submit() {
    var filedvalues = this.pname + ',' + this.recordno + ',' + this.gender + ',' + this.nationality + ',' + this.dob + ',' + this.occupation + ',' + this.workplace + ',' + this.dateofvisit + ',' + this.admissiondate + ',' + this.dischargedate + ',' + this.startingcheck + ',' + this.fromdatecheck + ',' + this.endofcheck
      + ',' + this.reasonscheck + ',' + this.Approvalcheck + ',' + this.facultycheck + ',' + this.disabilitycheck + ',' + this.otherscheck + ',' + ""
      + ',' + this.signature1 + ',' + this.badge + ',' + this.physicianname + ',' + this.signature2 + ',' + "" + ',' + this.signature3 + ',' + this.currentdate;

    var accessToken = window.localStorage.Tokenval;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
    let params =
    {
      "Sno": "105",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26",
      "status": filedvalues,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }


    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd === "1") {
        alert("Inserted Successfully");
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      } else {

      }
    },
      error => {
        console.log(error);
      }
    );
    // },
    //   err => {
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

}
