import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sickleave',
  templateUrl: './sickleave.component.html',
  styleUrls: ['./sickleave.component.css']
})
export class SickleaveComponent implements OnInit {
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
  startingcheck: any;
  fromdatecheck: any;
  endofcheck: any;
  reasonscheck: any;
  Approvalcheck: any;
  facultycheck: any;
  disabilitycheck: any;
  otherscheck: any;
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public leavedetails = [];
  public showpagenation: boolean = false;
  userid: any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService) {
      this.userid = window.localStorage.getItem("userId")
     }

  ngOnInit() {
    this.getdata()
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
      "text":"Get_printgrid_data",
      "id":"105",
      "param1":"",
      "param2":""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "0") {
        this.showLoader = false;
        this.showdata = false;
        this.nodata = true;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.leavedetails = result.data.Table;
        console.log(JSON.stringify(this.leavedetails));
        this.showdata = true;
        this.nodata = false;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    })
  }

  view(type,date,id){
    console.log(type);
    console.log(date);
    console.log(id);
    window.sessionStorage.setItem("ltype",type);
    window.sessionStorage.setItem("ldate",date);
    window.sessionStorage.setItem("lid",id)
    this.router.navigate(['/viewsickleave']);
  }

  getprintdata(id,tdate){
    var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
      let params =
      {
      "Sno":"105", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date":tdate, 
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
  //   this.pname+','+this.recordno+','+this.gender+','+this.nationality+','+this.dob+','+this.occupation+','+this.workplace+','+this.dateofvisit+','+this.admissiondate+','+this.dischargedate+','+this.startingcheck+','+this.fromdatecheck+','+this.endofcheck
  //   +','+this.reasonscheck+','+this.Approvalcheck+','+this.facultycheck+','+this.disabilitycheck+','+this.otherscheck+','+""
  //   +','+this.signature1+','+this.badge+','+this.physicianname+','+this.signature2+','+""+','+this.signature3+','+this.currentdate;
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
          setTimeout(() => {
            this.print();
          },1000)
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
    setTimeout(function () { newWin.close();divToPrint.style.display = 'none' }, 1000);
  }
  myFunction() {
    window.print();
  }
}
