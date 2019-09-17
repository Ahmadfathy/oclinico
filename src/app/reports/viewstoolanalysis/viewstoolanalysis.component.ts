import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewstoolanalysis',
  templateUrl: './viewstoolanalysis.component.html',
  styleUrls: ['./viewstoolanalysis.component.css']
})
export class ViewstoolanalysisComponent implements OnInit {
  aid: any;
  atype: any;
  adate: any;
  userid: any = "";
   male: any;
  female: any;
  gender: any;
  stoolanalysisreport:any;
  Routinecheck: boolean;
  Urgentcheck: boolean;
  Preoperativecheck: boolean;
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
  negativecheck:boolean;
  positivecheck:boolean;
  negativecheck1:boolean;
  positivecheck1:boolean;
  updatebutton: boolean;
  constructor(public commonService: UserinfoService,
    public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef) { 
      this.aid = window.sessionStorage.getItem("aid");
      this.atype = window.sessionStorage.getItem("atype");
      this.adate = window.sessionStorage.getItem("adate");
      this.userid = window.localStorage.getItem("userId")
      console.log("id... " + this.aid + "date... " +this.adate +"type... " +this.atype);
    }

  ngOnInit() {
    if(this.atype == "View"){
      $("input").attr('disabled','disabled');
      this.updatebutton = false;
      this.getdata();
    }
    else{
      this.updatebutton = true;
      this.getdata();
    }
  }

    getdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params =
    {
      "Sno":"106", 
      "Practitioner_Id":this.aid, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date": this.adate, 
      "Operation":"getprintsindividualdata", 
      "clinicid":this.userid, 
      "Branchid":"", 
      "Last_Updated":"" 
    }

    console.log(params);


    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd === "1") {
        this.name= result.data.Table[0].LABELLABEL1;
        this.fileno = result.data.Table[0].LABELLABEL2 ;
        this.date=result.data.Table[0].LABELLABEL3;
        this.age = result.data.Table[0].LABELLABEL4 ;
        this.nationality = result.data.Table[0].LABELLABEL5 ;
        this.gender= result.data.Table[0].LABELLABEL6;
        this.stoolanalysisreport = result.data.Table[0].LABELLABEL7 ;
        this.clinicalcomment =result.data.Table[0].LABELLABEL8;
        this.requestedby =result.data.Table[0].LABELLABEL9 ;
        this.stampandsign = result.data.Table[0].LABELLABEL10 ;
        this.pus = result.data.Table[0].LABELLABEL13;
        this.Giardia = result.data.Table[0].LABELLABEL14;
        this.Histolytica = result.data.Table[0].LABELLABEL15 ;
        this.rbc = result.data.Table[0].LABELLABEL16 ;
        this.other =result.data.Table[0].LABELLABEL17 ;
        this.Undigestedfood = result.data.Table[0].LABELLABEL18 ;
        this.ova = result.data.Table[0].LABELLABEL19 ;
        this.Pilori = result.data.Table[0].LABELLABEL20;
        this.Occultblood = result.data.Table[0].LABELLABEL21;
        this.otherexamination = result.data.Table[0].LABELLABEL22;
        this.remarks = result.data.Table[0].LABELLABEL23;
        this.checked= result.data.Table[0].LABELLABEL24 ;
        this.signedby  = result.data.Table[0].LABELLABEL25;
        this.status = result.data.Table[0].LABELLABEL26;
        this.occultstatus= result.data.Table[0].LABELLABEL27;
        this.browncheck = result.data.Table[0].LABELLABEL28;
        this.blackcheck = result.data.Table[0].LABELLABEL29;
        this.yellowcheck = result.data.Table[0].LABELLABEL30; 
        this.greencheck = result.data.Table[0].LABELLABEL31;
        this.reddishcheck = result.data.Table[0].LABELLABEL32 ;
        this.Formedcheck= result.data.Table[0].LABELLABEL33;
        this.Softcheck = result.data.Table[0].LABELLABEL34;
        this.Sliquidcheck = result.data.Table[0].LABELLABEL35;
        this.liquidcheck = result.data.Table[0].LABELLABEL36;
        this.Hardcheck = result.data.Table[0].LABELLABEL37;
        this.Mucuscheck = result.data.Table[0].LABELLABEL38;
        this.pushpf = result.data.Table[0].LABELLABEL39;
        this.rbchpf = result.data.Table[0].LABELLABEL40;

        if (this.gender == "Female") {
          $("#Female").prop("checked", true);
          this.gender = 'Female';
          (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
          } else {
            $("#Male").prop("checked", true);
          this.gender = 'Male';
          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
        }

       if (this.stoolanalysisreport == "Routine") {
        $("#Routine").prop("checked", true);
        console.log('Routine');
        this.stoolanalysisreport = 'Routine';
        (<HTMLInputElement>document.getElementById('pRoutinecheck')).setAttribute('checked', 'true');
        console.log((<HTMLInputElement>document.getElementById('pRoutinecheck')));
      } else if(this.stoolanalysisreport == "Urgent") {
        $("#Urgent").prop("checked", true);
        this.stoolanalysisreport = 'Urgent';
        console.log((<HTMLInputElement>document.getElementById('pUrgentcheck')));
        (<HTMLInputElement>document.getElementById('pUrgentcheck')).setAttribute('checked', 'true');
      }else{
        $("#Preoperative").prop("checked", true);
        this.stoolanalysisreport = 'Preoperative';
        console.log((<HTMLInputElement>document.getElementById('pPreoperativecheck')));
        (<HTMLInputElement>document.getElementById('pPreoperativecheck')).setAttribute('checked', 'true');
      }

      if (this.occultstatus == "negative") {
        $("#onegative").prop("checked", true);
        this.occultstatus = 'negative';
        (<HTMLInputElement>document.getElementById('negative2')).setAttribute('checked', 'true');
        console.log((<HTMLInputElement>document.getElementById('negative2')));
      } else {
        $("#opositive").prop("checked", true);
        this.occultstatus = 'positive';
        console.log((<HTMLInputElement>document.getElementById('positive2')));
        (<HTMLInputElement>document.getElementById('positive2')).setAttribute('checked', 'true');
      }

      if (this.status == "negative") {
        $("#negative").prop("checked", true);
        this.status = 'negative';
        (<HTMLInputElement>document.getElementById('negative1')).setAttribute('checked', 'true');
        console.log((<HTMLInputElement>document.getElementById('negative1')));
      } else {
        $("#positive").prop("checked", true);
        this.status = 'positive';
        console.log((<HTMLInputElement>document.getElementById('positive1')));
        (<HTMLInputElement>document.getElementById('positive1')).setAttribute('checked', 'true');
      }

      if(this.Giardia == 'true'){
        (<HTMLInputElement>document.getElementById('pGiardia')).setAttribute('checked', 'true');
      }else{
        this.Giardia = '';
      }
      if(this.Histolytica == 'true'){
        (<HTMLInputElement>document.getElementById('pHistolytica')).setAttribute('checked', 'true');
      }else{
        this.Histolytica = '';
      }

      if(this.browncheck == 'true'){
        (<HTMLInputElement>document.getElementById('pbrowncheck')).setAttribute('checked', 'true');
      }else {
        this.browncheck = ''
      }
      if(this.blackcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pblackcheck')).setAttribute('checked', 'true');
      }else {
        this.blackcheck = ''
      }
      if(this.yellowcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pyellowcheck')).setAttribute('checked', 'true');
      }else {
        this.yellowcheck = ''
      }
      if(this.greencheck  == 'true'){
        (<HTMLInputElement>document.getElementById('pgreencheck')).setAttribute('checked', 'true');
      }else {
        this.greencheck = ''
      }
      if(this.reddishcheck == 'true'){
        (<HTMLInputElement>document.getElementById('preddishcheck')).setAttribute('checked', 'true');
      }else {
        this.reddishcheck = ''
      }
      if(this.Formedcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pFormedcheck')).setAttribute('checked', 'true');
      }else {
        this.Formedcheck = ''
      }
      if(this.Softcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pSoftcheck')).setAttribute('checked', 'true');
      }else {
        this.Softcheck = ''
      }
      if(this.Sliquidcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pSliquidcheck')).setAttribute('checked', 'true');
      }else {
        this.Sliquidcheck = ''
      }
      if(this.liquidcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pliquidcheck')).setAttribute('checked', 'true');
      }else {
        this.liquidcheck = ''
      }
      if(this.Hardcheck == 'true'){
        (<HTMLInputElement>document.getElementById('pHardcheck')).setAttribute('checked', 'true');
      }else {
        this.Hardcheck = ''
      }
      if(this.Mucuscheck == 'true'){
        (<HTMLInputElement>document.getElementById('pMucuscheck')).setAttribute('checked', 'true');
      }else {
        this.Mucuscheck = ''
      }
      } else {
          console.log("else entered")
      }
   },
      error => {
        console.log(error);
      }
   );
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
    console.log(event.target.value);
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
    console.log(event.target.value);
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
    console.log(event.target.value);
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

  update() {
    var filedvalues = this.name + ',' + this.fileno + ',' + this.date + ',' + this.age + ',' + this.nationality + ','
      + this.gender + ',' + this.stoolanalysisreport + ',' + this.clinicalcomment + ',' + this.requestedby + ',' + this.stampandsign + ','
      + "" + ',' + "" + ',' + this.pus + ',' + this.Giardia + ',' + this.Histolytica + ',' + this.rbc + ','
      + this.other + ',' + this.Undigestedfood + ',' + this.ova + ',' + this.Pilori + ',' +this.Occultblood +','
      + this.otherexamination + ',' +this.remarks + ',' +this.checked + ',' +this.signedby  + ',' +this.status + ',' +this.occultstatus+','
      + this.browncheck +','+this.blackcheck + ',' +this.yellowcheck + ',' + this.greencheck + ',' + this.reddishcheck + ',' + this.Formedcheck+','
      + this.Softcheck + ',' + this.Sliquidcheck + ',' + this.liquidcheck + ',' + this.Hardcheck + ',' + this.Mucuscheck + ','
      + this.pushpf + ',' + this.rbchpf
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params =
    {
      "Sno": "106",
      "Practitioner_Id": this.aid,
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40",
      "status": filedvalues,
      "Login_ID": "",
      "Trans_Date": this.adate,
      "Operation": "UpdatePrintdata",
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
        alert("Updated Successfully");
        this.router.navigate(['/stoolanalysis']);
      } else {

      }
   },
      error => {
        console.log(error);
      }
   );
  }
}
