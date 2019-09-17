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
  selector: 'app-stoolanalysis',
  templateUrl: './stoolanalysis.component.html',
  styleUrls: ['./stoolanalysis.component.css']
})
export class StoolanalysisComponent implements OnInit {
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

  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public analysisdetails = [];
  public showpagenation: boolean = false;
  userid:any;

  constructor(public commonService: UserinfoService,
              public http: Http,
              private router: Router,
              private modalService: NgbModal,
              private chRef: ChangeDetectorRef) { 
    this.userid = window.localStorage.getItem("userId")
              }

  ngOnInit() {
    this.getdata()
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
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

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
      "text":"Get_printgrid_data",
      "id":"106",
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
        this.analysisdetails = result.data.Table;
        console.log(JSON.stringify(this.analysisdetails));
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
    window.sessionStorage.setItem("atype",type);
    window.sessionStorage.setItem("adate",date);
    window.sessionStorage.setItem("aid",id)
    this.router.navigate(['/viewstoolanalysis']);
  }

  getprintdata(id,tdate) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params =
    {
      "Sno":"106", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date": tdate, 
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
        this.rbchpf = result.data.Table[0].LABELLABEL140;

        if (this.gender == "Female") {
          $("#female").prop("checked", true);
          this.gender = 'Female';
          (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
          } else {
            $("#male").prop("checked", true);
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
}
