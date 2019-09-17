import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewsickleave',
  templateUrl: './viewsickleave.component.html',
  styleUrls: ['./viewsickleave.component.css']
})
export class ViewsickleaveComponent implements OnInit {
  pid:any;
  ptype:any;
  pdate:any;
 recordno:any;
  pname:any;
  nationality:any;
  dob:any
  occupation:any
  workplace:any
  dateofvisit:any
  admissiondate:any
  dischargedate:any
  signature1:any
  badge:any
  physicianname:any
  signature2:any
  signature3:any
  currentdate:any
  male: any;
  female: any;
  gender: any;
  genderstatus: boolean;
  genderstatus1: boolean;
  gender1: any;
  startingcheck: any;
  fromdatecheck: any;
  endofcheck: any;
  reasonscheck: any;
  Approvalcheck: any;
  facultycheck: any;
  disabilitycheck: any;
  otherscheck: any;
  userid: any;
  updatebutton: boolean;
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService) {
      this.pid = window.sessionStorage.getItem("lid");
      this.ptype = window.sessionStorage.getItem("ltype");
      this.pdate = window.sessionStorage.getItem("ldate");
      this.userid = window.localStorage.getItem("userId")
      console.log("id... " + this.pid + "date... " +this.pdate +"type... " +this.ptype);
   }

  ngOnInit() {
    if(this.ptype == "View"){
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
      let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
      let params =
      {
      "Sno":"105", 
      "Practitioner_Id":this.pid, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date":this.pdate, 
      "Operation":"getprintsindividualdata", 
      "clinicid": this.userid, 
      "Branchid":"", 
      "Last_Updated":"" 
      }
  
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        if (result.status_cd === "1") {
          console.log(result);
          this.pname = result.data.Table[0].LABELLABEL1;
          this.recordno = result.data.Table[0].LABELLABEL2;
          this.gender= result.data.Table[0].LABELLABEL3;
          this.nationality= result.data.Table[0].LABELLABEL4;
          this.dob= result.data.Table[0].LABELLABEL5;
          this.occupation= result.data.Table[0].LABELLABEL6;
          this.workplace= result.data.Table[0].LABELLABEL7;
          this.dateofvisit= result.data.Table[0].LABELLABEL8;
          this.admissiondate= result.data.Table[0].LABELLABEL9;
          this.dischargedate= result.data.Table[0].LABELLABEL10;
          this.startingcheck= result.data.Table[0].LABELLABEL11;
          this.fromdatecheck= result.data.Table[0].LABELLABEL12;
          this.endofcheck= result.data.Table[0].LABELLABEL13;
          this.reasonscheck= result.data.Table[0].LABELLABEL14;
          this.Approvalcheck= result.data.Table[0].LABELLABEL15;
          this.facultycheck= result.data.Table[0].LABELLABEL16;
          this.disabilitycheck= result.data.Table[0].LABELLABEL17;
          this.otherscheck= result.data.Table[0].LABELLABEL18;
          this.signature1= result.data.Table[0].LABELLABEL20;
          this.badge= result.data.Table[0].LABELLABEL21;
          this.physicianname= result.data.Table[0].LABELLABEL22;
          this.signature2= result.data.Table[0].LABELLABEL23;
          this.signature3= result.data.Table[0].LABELLABEL25;
          this.currentdate= result.data.Table[0].LABELLABEL26;

          if (this.gender == "Female") {
            $("#female").prop("checked", true);
            this.gender = 'Female';
            (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
            } else {
              $("#male").prop("checked", true);
            this.gender = 'Male';
            (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
          }
          (<HTMLInputElement>document.getElementById('pstarting')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pfromdate')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pendof')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('preasons')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pApproval')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pfaculty')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pdisability')).removeAttribute('checked');
          (<HTMLInputElement>document.getElementById('pothers')).removeAttribute('checked');
          
          if(this.startingcheck == 'true'){
            (<HTMLInputElement>document.getElementById('pstarting')).setAttribute('checked', 'true');
          }else{
            this.startingcheck = '';
          }
          if(this.fromdatecheck == 'true'){
            (<HTMLInputElement>document.getElementById('pfromdate')).setAttribute('checked', 'true');
          }else{
            this.fromdatecheck = '';
          }
          if(this.endofcheck == 'true'){
            (<HTMLInputElement>document.getElementById('pendof')).setAttribute('checked', 'true');
          }else{
            this.endofcheck = '';
          }
          if(this.reasonscheck == 'true'){
            (<HTMLInputElement>document.getElementById('preasons')).setAttribute('checked', 'true');
          }else{
            this.reasonscheck = '';
          }
          if(this.Approvalcheck == 'true'){
            (<HTMLInputElement>document.getElementById('pApproval')).setAttribute('checked', 'true');
          }else{
            this.Approvalcheck = '';
          }
          if(this.facultycheck == 'true'){
            (<HTMLInputElement>document.getElementById('pfaculty')).setAttribute('checked', 'true');
          }else{
            this.facultycheck = '';
          }
          if(this.disabilitycheck == 'true'){
            (<HTMLInputElement>document.getElementById('pdisability')).setAttribute('checked', 'true');
          }else{
            this.disabilitycheck = '';
          }
          if(this.otherscheck == 'true'){
            (<HTMLInputElement>document.getElementById('pothers')).setAttribute('checked', 'true');
          }else{
            this.otherscheck = '';
          }
        } else {
  
        }
      },
        error => {
          console.log(error);
        }
      );
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

  checkboxchange(event,text){
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

  update() {
    var filedvalues = this.pname + ',' + this.recordno + ',' + this.gender + ',' + this.nationality + ',' + this.dob 
      + ',' + this.occupation + ',' + this.workplace + ',' + this.dateofvisit + ',' + this.admissiondate + ','+ this.dischargedate 
      + ',' + this.startingcheck + ',' + this.fromdatecheck + ',' + this.endofcheck
      + ',' + this.reasonscheck + ',' + this.Approvalcheck + ',' + this.facultycheck + ',' + this.disabilitycheck + ',' + this.otherscheck + ',' + ""
      + ',' + this.signature1 + ',' + this.badge + ',' + this.physicianname + ',' + this.signature2 + ',' + "" + ',' + this.signature3 + ',' + this.currentdate;

    var accessToken = window.localStorage.Tokenval;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
    let params =
    {
      "Sno":"105", 
      "Practitioner_Id":this.pid,
      "Treatment_Id":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26",
      "status":filedvalues,
      "Login_ID":"",
      "Trans_Date":this.pdate,
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
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd === "1") {
        alert("Updated Successfully");
        this.router.navigate(['/sickleave']);
      } else {

      }
    },
      error => {
        console.log(error);
      }
    );
  }
    
}
