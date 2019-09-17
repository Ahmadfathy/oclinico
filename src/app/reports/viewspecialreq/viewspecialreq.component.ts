import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewspecialreq',
  templateUrl: './viewspecialreq.component.html',
  styleUrls: ['./viewspecialreq.component.css']
})
export class ViewspecialreqComponent implements OnInit {
  sid: any;
  stype: any;
  sdate: any;
  userid: any = ""
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
  treatmentname:any;
  updatebutton: boolean;
  // date: any;
  // month: any;
  // year: any;
  constructor(
    public http: Http,
    private router: Router,
    private modalService: NgbModal,
    public commonService: UserinfoService,
  ) { 
    this.sid = window.sessionStorage.getItem("sid");
    this.stype = window.sessionStorage.getItem("stype");
    this.sdate = window.sessionStorage.getItem("sdate");
    this.userid = window.localStorage.getItem("userId")
    console.log("id... " + this.sid + "date... " +this.sdate +"type... " +this.stype);
  }

  ngOnInit() {
    if(this.stype == "View"){
      $("input").attr('disabled','disabled');
      this.updatebutton = false;
      this.getdata();
    }
    else{
      this.updatebutton = true;
      this.getdata();
    }
  }

  getdata(){
    var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Login/DocTreatment_Transactions";
      let params =
      { 
    	"Sno":"107", 
    	"Practitioner_Id":this.sid, 
    	"Treatment_Id":"", 
    	"status":"", 
    	"Login_ID":"", 
    	"Trans_Date":this.sdate, 
    	"Operation":"getprintsindividualdata", 
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
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(res => {
        if (res.status_cd === "1") {
          console.log(res);
            this.name = res.data.Table[0].LABELLABEL1
            this.caseno =  res.data.Table[0].LABELLABEL2;
            this.consultant =  res.data.Table[0].LABELLABEL3;
            this.reqnebuliser =  res.data.Table[0].LABELLABEL4;
            this.reqbandage =  res.data.Table[0].LABELLABEL5;
            this.reqappplaster =  res.data.Table[0].LABELLABEL6;
            this.reqrmvplaster =  res.data.Table[0].LABELLABEL7;
            this.reqwound =  res.data.Table[0].LABELLABEL8;
            this.reqrmvstitches =  res.data.Table[0].LABELLABEL9;
            this.reqvitalsign =  res.data.Table[0].LABELLABEL10;
            this.reqdressing =  res.data.Table[0].LABELLABEL12;
            this.reqiminjection =  res.data.Table[0].LABELLABEL13;
            this.reqivinjection =  res.data.Table[0].LABELLABEL14;
            this.reqdrugs =  res.data.Table[0].LABELLABEL15;
            this.reqecg =  res.data.Table[0].LABELLABEL16;
            this.reqcrbandage =  res.data.Table[0].LABELLABEL17;
            this.reqrbs = res.data.Table[0].LABELLABEL18;
            this.fdate = res.data.Table[0].LABELLABEL19;
            this.signature = res.data.Table[0].LABELLABEL20;

            if (this.reqnebuliser == 'true') {
              (<HTMLInputElement>document.getElementById('pnebuliser')).setAttribute('checked', 'true');
            }else{
              console.log("else")
              this.reqnebuliser = '';
            }
            if (this.reqdressing == 'true') {
              (<HTMLInputElement>document.getElementById('pdressing')).setAttribute('checked', 'true');
            }else{
              this.reqdressing = '';
            }
            if (this.reqbandage == 'true') {
              (<HTMLInputElement>document.getElementById('pbandage')).setAttribute('checked', 'true');
            }else{
              this.reqbandage = '';
            }
            if (this.reqiminjection == 'true') {
              (<HTMLInputElement>document.getElementById('piminjection')).setAttribute('checked', 'true');
            }else{
              this.reqiminjection = '';
            }
            if (this.reqappplaster == 'true') {
              (<HTMLInputElement>document.getElementById('pappplaster')).setAttribute('checked', 'true');
            }else{
              this.reqappplaster = '';
            }
            if (this.reqivinjection == 'true') {
              (<HTMLInputElement>document.getElementById('pivinjection')).setAttribute('checked', 'true');
            }else{
              this.reqivinjection = '';
            }
            if (this.reqrmvplaster == 'true') {
              (<HTMLInputElement>document.getElementById('prmvplaster')).setAttribute('checked', 'true');
            }else{
              this.reqrmvplaster = '';
            }
            if (this.reqdrugs == 'true') {
              (<HTMLInputElement>document.getElementById('pdrugs')).setAttribute('checked', 'true');
            }else{
              this.reqdrugs = '';
            }
            if (this.reqwound == 'true') {
              (<HTMLInputElement>document.getElementById('pwound')).setAttribute('checked', 'true');
            }else{
              this.reqwound = '';
            }
            if (this.reqecg == 'true') {
              (<HTMLInputElement>document.getElementById('pecg')).setAttribute('checked', 'true');
            }else{
              this.reqecg = '';
            }
            if (this.reqrmvstitches == 'true') {
              (<HTMLInputElement>document.getElementById('prmvstitches')).setAttribute('checked', 'true');
            }else{
              this.reqrmvstitches = '';
            }
            if (this.reqcrbandage == 'true') {
              (<HTMLInputElement>document.getElementById('pcrbandage')).setAttribute('checked', 'true');
            }else{
              this.reqcrbandage = '';
            }
            if (this.reqvitalsign == 'true') {
              (<HTMLInputElement>document.getElementById('pvitalsign')).setAttribute('checked', 'true');
            }else{
              this.reqvitalsign = '';
            }
            if (this.reqrbs == 'true') {
              (<HTMLInputElement>document.getElementById('prbs')).setAttribute('checked', 'true');
            }else{
              this.reqrbs = '';
            }
        } else {
  
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

  update() {
   // this.fdate = this.date + '/' + this.month + '/' + this.year;
    var filedvalues = this.name + ',' + this.caseno + ',' + this.consultant + ',' + this.reqnebuliser + ',' + this.reqbandage + ','
      + this.reqappplaster + ',' + this.reqrmvplaster + ',' + this.reqwound + ',' + this.reqrmvstitches + ',' + this.reqvitalsign + ','
      + "" + ',' + this.reqdressing + ',' + this.reqiminjection + ',' + this.reqivinjection + ',' + this.reqdrugs + ',' + this.reqecg + ','
      + this.reqcrbandage + ',' + this.reqrbs + ',' + this.fdate + ',' + this.signature
   
    var accessToken = window.localStorage.Tokenval;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
    let params =
    {
      "Sno": "107",
      "Practitioner_Id":this.sid,
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      "status": filedvalues,
      "Login_ID": "",
      "Trans_Date": this.sdate,
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
        this.router.navigate(['/specialrequest']);
      } else {

      }
    },
      error => {
        console.log(error);
      }
    );
  }
}
