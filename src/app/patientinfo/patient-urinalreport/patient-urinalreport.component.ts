import { Component, OnInit} from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-patient-urinalreport',
  templateUrl: './patient-urinalreport.component.html',
  styleUrls: ['./patient-urinalreport.component.css']
})
export class PatientUrinalreportComponent implements OnInit {

  name: any;
  male: any;
  famale: any;
  gender: any;
  RChecked: any;
  UChecked: any;
  PChecked: any;
  filenumber: any;
  date: any;
  age: any;
  Nationality: any;
  clinicalcomments: any;
  requestedby: any;
  stampsignature: any;
  yellow: any;
  darky: any;
  paley: any;
  bloody: any;
  reddish: any;
  bownish: any;
  clear: any;
  turbid: any;
  sqgr: any;
  glucose: any;
  protien: any;
  ketone: any;
  bilirubin: any;
  urobilinogen: any;
  ph: any;
  other: any;
  pus1: any;
  pus2: any;
  crystals1: any;
  crystals2: any;
  rbc1: any;
  rbc2: any;
  amorphous1: any;
  amorphous2: any;
  epithcells1: any;
  epithcells2: any;
  otherME: any;
  empty: any;
  remarks: any;
  checkedby: any;
  finastampsignature: any;
  routinevalue: any;
  sqgrvalue: any;
  turbidvalue: any;
  clearvalue: any;
  bownishvalue: any;
  reddishvalue: any;
  bloodyvalue: any;
  paleyvalue: any;
  darkyvalue: any;
  yellowvalue: any;
  preoperative: any;
  urgentvalue: any;
  userid: any;

  constructor(private http: Http,
    public commonService: UserinfoService,
    private router: Router) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
  }

  // --------------------------------Radio button -----------------------------------------------

  genderchange(event) {
    (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');
    if (event.target.value == "Famale") {
      console.log('female');
      this.gender = 'Famale';
      (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('Famale1')));

    } else {
      this.gender = 'Male'
      console.log((<HTMLInputElement>document.getElementById('Male1')));
      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
    }
  }

  // --------------------------------Radio button -----------------------------------------------

  // --------------------------------check box -----------------------------------------------

  changecheckbox(event, text) {
    (<HTMLInputElement>document.getElementById('BRoutine')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BUrgent')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BPre-operative')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BYellow')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BDarkY')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BPaleY')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BBloody')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BReddish')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BBownish')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BClear')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BTurbid')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('BSq.Gr')).removeAttribute('checked');
    console.log(event.target.value, text, this.RChecked);
    if (this.RChecked == true) {
      this.routinevalue = 'Routine';
      (<HTMLInputElement>document.getElementById('BRoutine')).setAttribute('checked', 'true');
    } else {
      this.routinevalue = '';
    }
    if (this.UChecked == true) {
      this.urgentvalue = 'Urgent';
      (<HTMLInputElement>document.getElementById('BUrgent')).setAttribute('checked', 'true');
    } else {
      this.urgentvalue = '';
    }
    if (this.PChecked == true) {
      this.preoperative = 'Pre-operative';
      (<HTMLInputElement>document.getElementById('BPre-operative')).setAttribute('checked', 'true');
    } else {
      this.preoperative = '';
    }
    if (this.yellow == true) {
      this.yellowvalue = 'Yellow';
      (<HTMLInputElement>document.getElementById('BYellow')).setAttribute('checked', 'true');
    } else {
      this.yellowvalue = '';
    }
    if (this.darky == true) {
      this.darkyvalue = 'DarkY';
      (<HTMLInputElement>document.getElementById('BDarkY')).setAttribute('checked', 'true');
    } else {
      this.darkyvalue = '';
    }
    if (this.paley == true) {
      this.paleyvalue = 'PaleY';
      (<HTMLInputElement>document.getElementById('BPaleY')).setAttribute('checked', 'true');
    } else {
      this.paleyvalue = '';
    }
    if (this.bloody == true) {
      this.bloodyvalue = 'Bloody';
      (<HTMLInputElement>document.getElementById('BBloody')).setAttribute('checked', 'true');
    } else {
      this.bloodyvalue = '';
    }
    if (this.reddish == true) {
      this.reddishvalue = 'Reddish';
      (<HTMLInputElement>document.getElementById('BReddish')).setAttribute('checked', 'true');
    } else {
      this.reddishvalue = '';
    }
    if (this.bownish == true) {
      this.bownishvalue = 'Bownish';
      (<HTMLInputElement>document.getElementById('BBownish')).setAttribute('checked', 'true');
    } else {
      this.bownishvalue = '';
    }
    if (this.clear == true) {
      this.clearvalue = 'Clear';
      (<HTMLInputElement>document.getElementById('BClear')).setAttribute('checked', 'true');
    } else {
      this.clearvalue = '';
    }
    if (this.turbid == true) {
      this.turbidvalue = 'Turbid';
      (<HTMLInputElement>document.getElementById('BTurbid')).setAttribute('checked', 'true');
    } else {
      this.turbidvalue = '';
    }
    if (this.sqgr == true) {
      // this.sqgrvalue = 'Sq.Gr';
      (<HTMLInputElement>document.getElementById('BSq.Gr')).setAttribute('checked', 'true');
    } else {
      this.sqgrvalue = '';
    }
  }
  // --------------------------------check box -----------------------------------------------

  // --------------------------------print -----------------------------------------------

  print() {

    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    // divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 1000);
  }

  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------

  submit() {
    var texfields = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.Nationality + ',' + this.gender + ',' +
      this.routinevalue + ',' + this.urgentvalue + ',' + this.preoperative + ',' + this.clinicalcomments + ',' + this.stampsignature + ',' +
      '' + ',' + this.sqgrvalue + ',' + '' + ',' + this.glucose + ',' + this.protien + ',' + this.ketone + ',' + this.bilirubin + ',' +
      this.urobilinogen + ',' + this.other + ',' + '' + ',' + this.pus1 + ',' + this.crystals1 + ',' + this.rbc1 + ',' + this.amorphous1 + ',' +
      this.epithcells1 + ',' + this.otherME + ',' + this.remarks + ',' + this.checkedby + ',' + this.finastampsignature + ',' + this.age + ',' +
      this.yellowvalue + ',' + this.darkyvalue + ',' + this.paleyvalue + ',' + this.bloodyvalue + ',' + this.reddishvalue + ',' +
      this.bownishvalue + ',' + this.clearvalue + ',' + this.turbidvalue + ',' + this.pus2 + ',' + this.crystals2 + ',' + this.rbc2 + ',' +
      this.amorphous2 + ',' + this.epithcells2 + ',' + this.requestedby + ',' + this.ph

    console.log(texfields)
    console.log(window.localStorage.getItem('loginbaseId'))

    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl + 'Account/DocTreatment_Transactions';

    let body = {
      "Sno": "101",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45",
      "status": texfields,
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

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)

      if (res.status_cd == "1") {
        alert('Inserted Successfully');
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      } else {

      }
    },
      err => {
        console.log("Token Error:" + err);
      });
  }
}
