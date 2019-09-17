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
  selector: 'app-specialrequest',
  templateUrl: './specialrequest.component.html',
  styleUrls: ['./specialrequest.component.css']
})
export class SpecialrequestComponent implements OnInit {
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
  date: any;
  month: any;
  year: any;
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public reqdetails = [];
  public showpagenation: boolean = false;
  userid: any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService, ) {
      this.userid = window.localStorage.getItem("userId")
     }

  ngOnInit() {
    this.getdata();
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
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  myFunction() {
    window.print();
  }

  getdata(){
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
      "text":"Get_printgrid_data",
      "id":"107",
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
        this.reqdetails = result.data.Table;
        console.log(JSON.stringify(this.reqdetails));
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
    window.sessionStorage.setItem("stype",type);
    window.sessionStorage.setItem("sdate",date);
    window.sessionStorage.setItem("sid",id)
    this.router.navigate(['/viewspecialrequest']);
  }

  getprintdata(id,tdate){
    var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Login/DocTreatment_Transactions";
      let params =
      { 
    	"Sno":"107", 
    	"Practitioner_Id":id, 
    	"Treatment_Id":"", 
    	"status":"", 
    	"Login_ID":"", 
    	"Trans_Date":tdate, 
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
          console.log(res)
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
