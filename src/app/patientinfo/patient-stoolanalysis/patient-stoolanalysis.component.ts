import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-stoolanalysis',
  templateUrl: './patient-stoolanalysis.component.html',
  styleUrls: ['./patient-stoolanalysis.component.css']
})
export class PatientStoolanalysisComponent implements OnInit {
  male: any;
  female: any;
  gender: any;
  stoolanalysisreport:any;
  Routinecheck: any;
  Urgentcheck: any;
  Preoperativecheck: any;
  browncheck: any;
  blackcheck: any;
  yellowcheck: any;
  greencheck: any;
  reddishcheck: any;
  Formedcheck: any;
  Softcheck: any;
  Sliquidcheck: any;
  liquidcheck: any;
  Hardcheck: any;
  Mucuscheck: any;
  name:any;
  fileno:any;
  date:any;
  age:any;
  nationality:any;
  clinicalcomment:any;
  requestedby:any;
  stampandsign:any;
  mucusval:any;
  mucusval1:any;
  pus:any;
  pushpf:any;
  rbc:any;
  rbchpf:any;
  otherexamination:any;
  Undigestedfood:any;
  ova:any;
  Pilori:any;
  Occultblood:any;
  other:any;
  remarks:any;
  checked:any;
  signedby:any;
  Giardia: any;
  Histolytica: any;
  status: any;
  occultstatus: any;
  userid: any;
  constructor(public commonService: UserinfoService,
              public http: Http,
              private router: Router) { }

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
    setTimeout(function () { newWin.close();divToPrint.style.display = 'none' }, 1000);
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
      this.gender = 'Male';
      console.log((<HTMLInputElement>document.getElementById('Male1')));
      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
    }
  }

  statuscheckbox(event) {
    (<HTMLInputElement>document.getElementById('negative1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('positive1')).removeAttribute('checked');
    if (event.target.value == "negative") {
      console.log(event.target.value)
      this.status = 'negative';
      (<HTMLInputElement>document.getElementById('negative1')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('negative1')));
    } else {
      console.log(event.target.value)
      this.status = 'positive';
      console.log((<HTMLInputElement>document.getElementById('positive1')));
      (<HTMLInputElement>document.getElementById('positive1')).setAttribute('checked', 'true');
    }
  }

  occultstatuscheckbox(event) {
    (<HTMLInputElement>document.getElementById('negative2')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('positive2')).removeAttribute('checked');
    if (event.target.value == "negative") {
      console.log(event.target.value)
      this.occultstatus = 'negative';
      (<HTMLInputElement>document.getElementById('negative2')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('negative2')));
    } else {
      console.log(event.target.value)
      this.occultstatus = 'positive';
      console.log((<HTMLInputElement>document.getElementById('positive2')));
      (<HTMLInputElement>document.getElementById('positive2')).setAttribute('checked', 'true');
    }
  }

  changecheckbox(event){
    (<HTMLInputElement>document.getElementById('pRoutinecheck')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('pUrgentcheck')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('pPreoperativecheck')).removeAttribute('checked');
    if (event.target.value == "Routine") {
      console.log('female');
      this.stoolanalysisreport = 'Routine';
      (<HTMLInputElement>document.getElementById('pRoutinecheck')).setAttribute('checked', 'true');
      console.log((<HTMLInputElement>document.getElementById('pRoutinecheck')));
    } else if(event.target.value == "Urgent") {
      this.stoolanalysisreport = 'Urgent';
      console.log((<HTMLInputElement>document.getElementById('pUrgentcheck')));
      (<HTMLInputElement>document.getElementById('pUrgentcheck')).setAttribute('checked', 'true');
    }else{
      this.stoolanalysisreport = 'Preoperative';
      console.log((<HTMLInputElement>document.getElementById('pPreoperativecheck')));
      (<HTMLInputElement>document.getElementById('pPreoperativecheck')).setAttribute('checked', 'true');
    }
  }

  custcheckbox(event,text){
    console.log(event.target.value,text);
    if(this.Giardia == true){
      (<HTMLInputElement>document.getElementById('pGiardia')).setAttribute('checked', 'true');
    }else if(this.Giardia == false){
      this.Giardia = '';
      (<HTMLInputElement>document.getElementById('pGiardia')).removeAttribute('checked');
    }
    if(this.Histolytica == true){
      (<HTMLInputElement>document.getElementById('pHistolytica')).setAttribute('checked', 'true');
    }else if(this.Histolytica == false){
      this.Histolytica = '';
      (<HTMLInputElement>document.getElementById('pHistolytica')).removeAttribute('checked');
    }
  }

  colorcheckbox(event,text){
    console.log(event.target.value,text);
    if(this.browncheck == true){
      (<HTMLInputElement>document.getElementById('pbrowncheck')).setAttribute('checked', 'true');
    }else if(this.browncheck == false){
      this.browncheck = '';
      (<HTMLInputElement>document.getElementById('pbrowncheck')).removeAttribute('checked');
    }
    if(this.blackcheck == true){
      (<HTMLInputElement>document.getElementById('pblackcheck')).setAttribute('checked', 'true');
    }else if(this.blackcheck == false){
      this.blackcheck = '';
      (<HTMLInputElement>document.getElementById('pblackcheck')).removeAttribute('checked');
    }
    if(this.yellowcheck == true){
      (<HTMLInputElement>document.getElementById('pyellowcheck')).setAttribute('checked', 'true');
    }else if(this.yellowcheck == false){
      this.yellowcheck = '';
      (<HTMLInputElement>document.getElementById('pyellowcheck')).removeAttribute('checked');
    }
    if(this.greencheck  == true){
      (<HTMLInputElement>document.getElementById('pgreencheck')).setAttribute('checked', 'true');
    }else if(this.greencheck == false){
      this.greencheck = '';
      (<HTMLInputElement>document.getElementById('pgreencheck')).removeAttribute('checked');
    }
    if(this.reddishcheck == true){
      (<HTMLInputElement>document.getElementById('preddishcheck')).setAttribute('checked', 'true');
    }else if(this.reddishcheck == false){
      this.reddishcheck = '';
      (<HTMLInputElement>document.getElementById('preddishcheck')).removeAttribute('checked');
    }
    if(this.Formedcheck == true){
      (<HTMLInputElement>document.getElementById('pFormedcheck')).setAttribute('checked', 'true');
    }else if(this.Formedcheck == false){
      this.Formedcheck = '';
      (<HTMLInputElement>document.getElementById('pFormedcheck')).removeAttribute('checked');
    }
    if(this.Softcheck == true){
      (<HTMLInputElement>document.getElementById('pSoftcheck')).setAttribute('checked', 'true');
    }else if(this.Softcheck == false){
      this.Softcheck = '';
      (<HTMLInputElement>document.getElementById('pSoftcheck')).removeAttribute('checked');
    }
    if(this.Sliquidcheck == true){
      (<HTMLInputElement>document.getElementById('pSliquidcheck')).setAttribute('checked', 'true');
    }else if(this.Sliquidcheck == false){
      this.Sliquidcheck = '';
      (<HTMLInputElement>document.getElementById('pSliquidcheck')).removeAttribute('checked');
    }
    if(this.liquidcheck == true){
      (<HTMLInputElement>document.getElementById('pliquidcheck')).setAttribute('checked', 'true');
    }else if(this.liquidcheck == false){
      this.liquidcheck = '';
      (<HTMLInputElement>document.getElementById('pliquidcheck')).removeAttribute('checked');
    }
    if(this.Hardcheck == true){
      (<HTMLInputElement>document.getElementById('pHardcheck')).setAttribute('checked', 'true');
    }else if(this.Hardcheck == false){
      this.Hardcheck = '';
      (<HTMLInputElement>document.getElementById('pHardcheck')).removeAttribute('checked');
    }
    if(this.Mucuscheck == true){
      (<HTMLInputElement>document.getElementById('pMucuscheck')).setAttribute('checked', 'true');
    }else if(this.Mucuscheck == false){
      this.Mucuscheck = '';
      (<HTMLInputElement>document.getElementById('pMucuscheck')).removeAttribute('checked');
    }
  }

  submit() {
    var filedvalues = this.name + ',' + this.fileno + ',' + this.date + ',' + this.age + ',' + this.nationality + ','
      + this.gender + ',' + this.stoolanalysisreport + ',' + this.clinicalcomment + ',' + this.requestedby + ',' + this.stampandsign + ','
      + "" + ',' + "" + ',' + this.pus + ',' + this.Giardia + ',' + this.Histolytica + ',' + this.rbc + ','
      + this.other + ',' + this.Undigestedfood + ',' + this.ova + ',' + this.Pilori + ',' +this.Occultblood +','
      + this.otherexamination + ',' +this.remarks + ',' +this.checked + ',' +this.signedby  + ',' +this.status + ',' +this.occultstatus+','
      + this.browncheck +','+this.blackcheck + ',' +this.yellowcheck + ',' + this.greencheck + ',' + this.reddishcheck + ',' + this.Formedcheck+','
      + this.Softcheck + ',' + this.Sliquidcheck + ',' + this.liquidcheck + ',' + this.Hardcheck + ',' + this.Mucuscheck + ','
      + this.pushpf + ',' + this.rbchpf
    var accessToken = window.localStorage.Tokenval;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
    let params =
    {
      "Sno": "106",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40",
      "status": filedvalues,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }

    console.log(params);


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
  }
}

