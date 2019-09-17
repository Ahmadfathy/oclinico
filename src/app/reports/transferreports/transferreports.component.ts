import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-transferreports',
  templateUrl: './transferreports.component.html',
  styleUrls: ['./transferreports.component.css']
})
export class TransferreportsComponent implements OnInit {
  firsthval: any;
  secondhval: any;
  thirdhval: any;
  seconddivone: any;
  seconddivtwo: any;
  seconddivthree: any;
  seconddivfour: any;
  seconddivfive: any;
  cof: any;
  history: any;
  clinicalexamination: any;
  investigation: any;
  diagnosis: any;
  lastdivone: any;
  lastdivtwo: any;
  lastdivthree: any;
  lastdivfour: any;
  transferdetails: any=[];
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public showpagenation: boolean = false;
  userid: any;

  constructor(public http: Http,
    private router: Router,
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
    setTimeout(function () { newWin.close();divToPrint.style.display = 'none' }, 1000);
  }
  
  myFunction() {
    window.print();
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
        "text":"Get_printgrid_data_eng",
        "id":"109",
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
        this.transferdetails = result.data.Table;
        console.log(JSON.stringify(this.transferdetails));
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

  getprintdata(id,date) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params =
    {
      "Sno":"109", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date":date, 
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
        this.firsthval = result.data.Table[0].LABELLABEL6;
        this.secondhval =  result.data.Table[0].LABELLABEL7;
        this.thirdhval =  result.data.Table[0].LABELLABEL8;
        this.seconddivone =  result.data.Table[0].LABELLABEL9;
        this.seconddivtwo = result.data.Table[0].LABELLABEL10;
        this.seconddivthree = result.data.Table[0].LABELLABEL11;
        this.seconddivfour =  result.data.Table[0].LABELLABEL12;
        this.seconddivfive =  result.data.Table[0].LABELLABEL13;
        this.cof = result.data.Table[0].LABELLABEL1;
        this.history =  result.data.Table[0].LABELLABEL2;
        this.clinicalexamination =  result.data.Table[0].LABELLABEL3;
        this.investigation =  result.data.Table[0].LABELLABEL4;
        this.diagnosis =  result.data.Table[0].LABELLABEL5;
        this.lastdivone =  result.data.Table[0].LABELLABEL14;
        this.lastdivtwo =  result.data.Table[0].LABELLABEL15;
        this.lastdivthree = result.data.Table[0].LABELLABEL16;
        this.lastdivfour  = result.data.Table[0].LABELLABEL17;
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

  view(type,date,id){
    console.log(type);
    console.log(date);
    console.log(id);
    window.sessionStorage.setItem("ttype",type);
    window.sessionStorage.setItem("tdate",date);
    window.sessionStorage.setItem("tid",id)
    this.router.navigate(['/viewtransfer']);
  }
}
