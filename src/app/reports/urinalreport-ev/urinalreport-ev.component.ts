import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-urinalreport-ev',
  templateUrl: './urinalreport-ev.component.html',
  styleUrls: ['./urinalreport-ev.component.css']
})
export class UrinalreportEVComponent implements OnInit {


  name: any;
  male: any;
  famale: any;
  gender: any;
  genderstatus: boolean;
  genderstatus1: boolean;
  gender1: string;
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
  routinevalue: string;
  sqgrvalue: string;
  turbidvalue: string;
  clearvalue: string;
  bownishvalue: string;
  reddishvalue: string;
  bloodyvalue: string;
  paleyvalue: string;
  darkyvalue: string;
  yellowvalue: string;
  preoperative: string;
  urgentvalue: string;
  table: any = [];
  dataTable: any;
  paramid: any;
  paramtext: any;
  paramdate: any;
  buttonshow: boolean = false;
  trandate:any;
  userid:any;

  constructor(private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private route: ActivatedRoute,
    private router: Router) {
      this.userid = window.localStorage.getItem("userId")
     }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      console.log(params.get('id'))
      console.log(params.get('text'))
      this.paramid = params.get('id');
      this.paramtext = params.get('text');
      this.paramdate = params.get('date');
     
      if (this.paramtext == 'view') {
        $("input").attr('disabled','disabled');
        this.buttonshow = false;
      } else {
        this.buttonshow = true;
      }
    })
    this.getdata();
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "101",
      "Practitioner_Id": this.paramid,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "getprintsindividualdata",
      "clinicid": this.userid,
      "Branchid": "", "Last_Updated": ""
    }
    console.log(params)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });

    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == '1') {
        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.trandate = result.data.Table[0].tran_date;
        this.Nationality = result.data.Table[0].LABELLABEL4;
        this.gender = result.data.Table[0].LABELLABEL5;
        (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Male')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Famale')).removeAttribute('checked');
        if (this.gender.toLowerCase() == 'male') {
          $("#Male1").prop("checked", true);
          $("#Male").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
          (<HTMLInputElement>document.getElementById('Male')).setAttribute('checked', 'true');
          this.male = true;
        } else {
          this.famale = true;
          $("#Famale1").prop("checked", true);
          $("#Famale").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
          (<HTMLInputElement>document.getElementById('Famale')).setAttribute('checked', 'true');
        }

        this.routinevalue = result.data.Table[0].LABELLABEL6;
        if (this.routinevalue == 'Routine') {
          $("#Routine").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BRoutine')).setAttribute('checked', 'true');
          (<HTMLInputElement>document.getElementById('Routine')).setAttribute('checked', 'true');
        }
        this.urgentvalue = result.data.Table[0].LABELLABEL7;
        if (this.urgentvalue == 'Urgent') {
          console.log('urgnet');
          $("#Urgent").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BUrgent')).setAttribute('checked', 'true');
          (<HTMLInputElement>document.getElementById('Urgent')).setAttribute('checked', 'true');
        }
        this.preoperative = result.data.Table[0].LABELLABEL8;
        if (this.preoperative == 'Pre-operative') {
          $("#Pre-operative").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BPre-operative')).setAttribute('checked', 'true');
        }
        this.clinicalcomments = result.data.Table[0].LABELLABEL9;
        this.stampsignature = result.data.Table[0].LABELLABEL10;
        this.sqgrvalue = result.data.Table[0].LABELLABEL12;
        if (this.sqgrvalue != '') {
          $("#SqGr").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BSq.Gr')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Sq.Gr')).setAttribute('checked', 'true');
        }
        this.glucose = result.data.Table[0].LABELLABEL14;
        this.protien = result.data.Table[0].LABELLABEL15;
        this.ketone = result.data.Table[0].LABELLABEL16;
        this.bilirubin = result.data.Table[0].LABELLABEL17;
        this.urobilinogen = result.data.Table[0].LABELLABEL18;
        this.other = result.data.Table[0].LABELLABEL19;
        this.pus1 = result.data.Table[0].LABELLABEL21;
        this.crystals1 = result.data.Table[0].LABELLABEL22;
        this.rbc1 = result.data.Table[0].LABELLABEL23;
        this.amorphous1 = result.data.Table[0].LABELLABEL24;
        this.epithcells1 = result.data.Table[0].LABELLABEL25;
        this.otherME = result.data.Table[0].LABELLABEL26;
        this.remarks = result.data.Table[0].LABELLABEL27;
        this.checkedby = result.data.Table[0].LABELLABEL28;
        this.finastampsignature = result.data.Table[0].LABELLABEL29;
        this.age = result.data.Table[0].LABELLABEL30;
        this.yellowvalue = result.data.Table[0].LABELLABEL31;
        if (this.yellowvalue == 'Yellow') {
          $("#Yellow").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BYellow')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Yellow')).setAttribute('checked', 'true');
        }
        this.darkyvalue = result.data.Table[0].LABELLABEL32;
        if (this.darkyvalue == 'DarkY') {
          $("#DarkY").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BDarkY')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('DarkY')).setAttribute('checked', 'true');
        }
        this.paleyvalue = result.data.Table[0].LABELLABEL33;
        if (this.paleyvalue == 'PaleY') {
          $("#PaleY").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BPaleY')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('PaleY')).setAttribute('checked', 'true');
        }
        this.bloodyvalue = result.data.Table[0].LABELLABEL34;
        if (this.bloodyvalue == 'Bloody') {
          $("#Bloody").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BBloody')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Bloody')).setAttribute('checked', 'true');
        }
        this.reddishvalue = result.data.Table[0].LABELLABEL35;
        if (this.reddishvalue == 'Reddish') {
          $("#Reddish").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BReddish')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Reddish')).setAttribute('checked', 'true');
        }
        this.bownishvalue = result.data.Table[0].LABELLABEL36;
        if (this.bownishvalue == 'Bownish') {
          $("#Bownish").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BBownish')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Bownish')).setAttribute('checked', 'true');
        }
        this.clearvalue = result.data.Table[0].LABELLABEL37;
        if (this.clearvalue == 'Clear') {
          $("#Clear").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BClear')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Clear')).setAttribute('checked', 'true');
        }
        this.turbidvalue = result.data.Table[0].LABELLABEL38;
        if (this.turbidvalue == 'Turbid') {
          $("#Turbid").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BTurbid')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('Turbid')).setAttribute('checked', 'true');
        }
        this.pus2 = result.data.Table[0].LABELLABEL39;
        this.crystals2 = result.data.Table[0].LABELLABEL40;
        this.rbc2 = result.data.Table[0].LABELLABEL41;
        this.amorphous2 = result.data.Table[0].LABELLABEL42;
        this.epithcells2 = result.data.Table[0].LABELLABEL43;
        this.requestedby = result.data.Table[0].LABELLABEL44;
        this.ph = result.data.Table[0].LABELLABEL45;

      } else {

      }
    }, err => {
      console.log(err)
    })
  }

  // --------------------------------Radio button -----------------------------------------------

  genderchange(event) {

    (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');


    if (event.target.value == "Famale") {
      console.log('female');

      this.gender = 'Famale';
      this.gender1 = ''
      this.genderstatus1 = true;
      this.genderstatus = false;

      (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('Famale1')));

    } else {
      this.gender = 'Male'
      this.gender1 = 'Male'
      this.genderstatus = true;
      this.genderstatus1 = false;
      console.log((<HTMLInputElement>document.getElementById('Male1')));

      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');

    }
  }

  // --------------------------------Radio button -----------------------------------------------

  // --------------------------------check box -----------------------------------------------

  changecheckbox(event, text) {
    // (<HTMLInputElement>document.getElementById('BRoutine')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BUrgent')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BPre-operative')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BYellow')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BDarkY')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BPaleY')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BBloody')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BReddish')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BBownish')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BClear')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BTurbid')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('BSq.Gr')).removeAttribute('checked');
    console.log(event.target.value, text, this.RChecked, this.UChecked,this.yellow);
    if (this.RChecked == true) {
      this.routinevalue = 'Routine';
      (<HTMLInputElement>document.getElementById('BRoutine')).setAttribute('checked', 'true');
    } else if (this.RChecked == false){
      this.routinevalue = '';
      (<HTMLInputElement>document.getElementById('BRoutine')).removeAttribute('checked');
    }
    if (this.UChecked == true) {
      this.urgentvalue = 'Urgent';
      (<HTMLInputElement>document.getElementById('BUrgent')).setAttribute('checked', 'true');
    } else if (this.UChecked == false){
      this.urgentvalue = '';
      (<HTMLInputElement>document.getElementById('BUrgent')).removeAttribute('checked');
    }
    if (this.PChecked == true) {
      this.preoperative = 'Pre-operative';
      (<HTMLInputElement>document.getElementById('BPre-operative')).setAttribute('checked', 'true');
    } else if (this.PChecked == false){
      this.preoperative = '';
      (<HTMLInputElement>document.getElementById('BPre-operative')).removeAttribute('checked');
    }
    if (this.yellow == true) {
      this.yellowvalue = 'Yellow';
      (<HTMLInputElement>document.getElementById('BYellow')).setAttribute('checked', 'true');
    } else if (this.yellow == false){
      this.yellowvalue = '';
      (<HTMLInputElement>document.getElementById('BYellow')).removeAttribute('checked');
    }
    if (this.darky == true) {
      this.darkyvalue = 'DarkY';
      (<HTMLInputElement>document.getElementById('BDarkY')).setAttribute('checked', 'true');
    } else if (this.darky == false){
      this.darkyvalue = '';
      (<HTMLInputElement>document.getElementById('BDarkY')).removeAttribute('checked');
    }
    if (this.paley == true) {
      this.paleyvalue = 'PaleY';
      (<HTMLInputElement>document.getElementById('BPaleY')).setAttribute('checked', 'true');
    } else if (this.paley == false){
      this.paleyvalue = '';
      (<HTMLInputElement>document.getElementById('BPaleY')).removeAttribute('checked');
    }
    if (this.bloody == true) {
      this.bloodyvalue = 'Bloody';
      (<HTMLInputElement>document.getElementById('BBloody')).setAttribute('checked', 'true');
    } else if (this.bloody == false){
      this.bloodyvalue = '';
      (<HTMLInputElement>document.getElementById('BBloody')).removeAttribute('checked');
    }
    if (this.reddish == true) {
      this.reddishvalue = 'Reddish';
      (<HTMLInputElement>document.getElementById('BReddish')).setAttribute('checked', 'true');
    } else if (this.reddish == false){
      this.reddishvalue = '';
      (<HTMLInputElement>document.getElementById('BReddish')).removeAttribute('checked');
    }
    if (this.bownish == true) {
      this.bownishvalue = 'Bownish';
      (<HTMLInputElement>document.getElementById('BBownish')).setAttribute('checked', 'true');
    } else if (this.bownish == false){
      this.bownishvalue = '';
      (<HTMLInputElement>document.getElementById('BBownish')).removeAttribute('checked');
    }
    if (this.clear == true) {
      this.clearvalue = 'Clear';
      (<HTMLInputElement>document.getElementById('BClear')).setAttribute('checked', 'true');
    } else if (this.clear == false){
      this.clearvalue = '';
      (<HTMLInputElement>document.getElementById('BClear')).removeAttribute('checked');
    }
    if (this.turbid == true) {
      this.turbidvalue = 'Turbid';
      (<HTMLInputElement>document.getElementById('BTurbid')).setAttribute('checked', 'true');
    } else if (this.turbid == false){
      this.turbidvalue = '';
      (<HTMLInputElement>document.getElementById('BTurbid')).removeAttribute('checked');
    }
    if (this.sqgr == true) {
      this.sqgrvalue = 'Sq.Gr';
      (<HTMLInputElement>document.getElementById('BSq.Gr')).setAttribute('checked', 'true');
    } else if (this.sqgr == false){
      this.sqgrvalue = '';
      (<HTMLInputElement>document.getElementById('BSq.Gr')).removeAttribute('checked');
    }

    console.log(this.sqgrvalue,this.turbidvalue,this.clearvalue,this.bownishvalue,this.reddishvalue,
      this.bloodyvalue,this.paleyvalue,this.darkyvalue,this.yellowvalue,this.routinevalue,this.urgentvalue,this.preoperative)
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


  update() {
console.log(this.routinevalue,this.urgentvalue,this.preoperative,this.yellow,this.darky)
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
      "Sno":"101", 
      "Practitioner_Id":this.paramid, 
      "Treatment_Id":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45", 
      "status":texfields, 
      "Login_ID":"", 
      "Trans_Date":this.trandate, 
      "Operation":"UpdatePrintdata", 
      "clinicid":this.userid, 
      "Branchid":"", 
      "Last_Updated":""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)

      if (res.data.Table[0].Result == "True") {
        alert('Updated Successfully');
        this.router.navigate(['/urinalreport']);
      } else {

      }
    },
      err => {
        console.log("Token Error:" + err);
      });

  }

}
