import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-specialrequestfortretment',
  templateUrl: './patient-specialrequestfortretment.component.html',
  styleUrls: ['./patient-specialrequestfortretment.component.css']
})
export class PatientSpecialrequestfortretmentComponent implements OnInit {

  name: any;
  caseno: any;
  consultant: any;
  reqnebuliser: any;
  reqdressing: any;
  reqbandage: any;
  reqiminjection: any;
  reqappplaster: any;
  reqivinjection: any;
  reqrmvplaster: any;
  reqdrugs: any;
  reqwound: any;
  reqecg: any;
  reqrmvstitches: any;
  reqcrbandage: any;
  reqvitalsign: any;
  reqrbs: any;
  signature: any;
  fdate: any;
  date: any;
  month: any;
  year: any;
  userid: any;

  constructor(public http: Http,
    private router: Router,
    public commonService: UserinfoService, ) { }

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
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  myFunction() {
    window.print();
  }

  changecheckbox(event, text) {
    console.log(event.target.value,text);
    if (this.reqnebuliser == true) {
      console.log(typeof this.reqnebuliser);
      (<HTMLInputElement>document.getElementById('pnebuliser')).setAttribute('checked', 'true');
    }else if(this.reqnebuliser == false){
      this.reqnebuliser = '';
      (<HTMLInputElement>document.getElementById('pnebuliser')).removeAttribute('checked');
    }
    if (this.reqdressing == true) {
      (<HTMLInputElement>document.getElementById('pdressing')).setAttribute('checked', 'true');
    }else if(this.reqdressing == false){
      this.reqdressing = '';
      (<HTMLInputElement>document.getElementById('pdressing')).removeAttribute('checked');
    }
    if (this.reqbandage == true) {
      (<HTMLInputElement>document.getElementById('pbandage')).setAttribute('checked', 'true');
    }else if(this.reqbandage == false){
      this.reqbandage = '';
      (<HTMLInputElement>document.getElementById('pbandage')).removeAttribute('checked');
    }
    if (this.reqiminjection == true) {
      (<HTMLInputElement>document.getElementById('piminjection')).setAttribute('checked', 'true');
    }else if(this.reqiminjection == false){
      this.reqiminjection = '';
      (<HTMLInputElement>document.getElementById('piminjection')).removeAttribute('checked');
    }
    if (this.reqappplaster == true) {
      (<HTMLInputElement>document.getElementById('pappplaster')).setAttribute('checked', 'true');
    }else if(this.reqappplaster == false){
      this.reqappplaster = '';
      (<HTMLInputElement>document.getElementById('pappplaster')).removeAttribute('checked');
    }
    if (this.reqivinjection == true) {
      (<HTMLInputElement>document.getElementById('pivinjection')).setAttribute('checked', 'true');
    }else if(this.reqivinjection == false){
      this.reqivinjection = '';
      (<HTMLInputElement>document.getElementById('pivinjection')).removeAttribute('checked');
    }
    if (this.reqrmvplaster == true) {
      (<HTMLInputElement>document.getElementById('prmvplaster')).setAttribute('checked', 'true');
    }else if(this.reqrmvplaster == false){
      this.reqrmvplaster = '';
      (<HTMLInputElement>document.getElementById('prmvplaster')).removeAttribute('checked');
    }
    if (this.reqdrugs == true) {
      (<HTMLInputElement>document.getElementById('pdrugs')).setAttribute('checked', 'true');
    }else if(this.reqdrugs == false){
      this.reqdrugs = '';
      (<HTMLInputElement>document.getElementById('pdrugs')).removeAttribute('checked');
    }
    if (this.reqwound == true) {
      (<HTMLInputElement>document.getElementById('pwound')).setAttribute('checked', 'true');
    }else if(this.reqwound == false){
      this.reqwound = '';
      (<HTMLInputElement>document.getElementById('pwound')).removeAttribute('checked');
    }
    if (this.reqecg == true) {
      (<HTMLInputElement>document.getElementById('pecg')).setAttribute('checked', 'true');
    }else if(this.reqecg == false){
      this.reqecg = '';
      (<HTMLInputElement>document.getElementById('pecg')).removeAttribute('checked');
    }
    if (this.reqrmvstitches == true) {
      (<HTMLInputElement>document.getElementById('prmvstitches')).setAttribute('checked', 'true');
    }else if(this.reqrmvstitches == false){
      this.reqrmvstitches='';
      (<HTMLInputElement>document.getElementById('prmvstitches')).removeAttribute('checked');
    }
    if (this.reqcrbandage == true) {
      (<HTMLInputElement>document.getElementById('pcrbandage')).setAttribute('checked', 'true');
    }else  if(this.reqcrbandage == false){
      this.reqcrbandage = '';
      (<HTMLInputElement>document.getElementById('pcrbandage')).removeAttribute('checked');
    }
    if (this.reqvitalsign == true) {
      (<HTMLInputElement>document.getElementById('pvitalsign')).setAttribute('checked', 'true');
    }else if(this.reqvitalsign == false){
      this.reqvitalsign = '';
      (<HTMLInputElement>document.getElementById('pvitalsign')).removeAttribute('checked');
    }
    if (this.reqrbs == true) {
      (<HTMLInputElement>document.getElementById('prbs')).setAttribute('checked', 'true');
    }else if(this.reqrbs == false){
      this.reqrbs = '';
      (<HTMLInputElement>document.getElementById('prbs')).removeAttribute('checked');
    }

  }

  submit() {
    // this.fdate = this.date + '/' + this.month + '/' + this.year;
    var filedvalues = this.name + ',' + this.caseno + ',' + this.consultant + ',' + this.reqnebuliser + ',' + this.reqbandage + ','
      + this.reqappplaster + ',' + this.reqrmvplaster + ',' + this.reqwound + ',' + this.reqrmvstitches + ',' + this.reqvitalsign + ','
      + "" + ',' + this.reqdressing + ',' + this.reqiminjection + ',' + this.reqivinjection + ',' + this.reqdrugs + ',' + this.reqecg + ','
      + this.reqcrbandage + ',' + this.reqrbs + ',' + this.fdate + ',' + this.signature
    let insertvalues = "";
    var accessToken = window.localStorage.Tokenval;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
    let params =
    {
      "Sno": "107",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
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
