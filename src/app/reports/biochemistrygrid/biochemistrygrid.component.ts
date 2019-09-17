import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-biochemistrygrid',
  templateUrl: './biochemistrygrid.component.html',
  styleUrls: ['./biochemistrygrid.component.css']
})
export class BiochemistrygridComponent implements OnInit {
  table: any;
  showdata: any;
  nodata: any;
  dataTable: any;
  isPageloaderVisible: boolean = false;
  name: any;
  filenumber: any;
  private _date: any;
  Creatnine: any;
  AST: any;
  BUN: any;
  GGT: any;
  UricAcid: any;
  GGPhosphataseT: any;
  Phosphatase: any;
  Phosporous: any;
  TotalProtein: any;
  Cloride: any;
  Albumin: any;
  Amylase: any;
  Dai: any;
  true2: any;
  Calcium: any;
  Cholesterol: any;
  Iron: any;
  Triglycerides: any;
  Potassium: any;
  HDL: any;
  Megnesium: any;
  ALT: any;
  Preoperative: any;
  false2: any;
  pop: any;
  Ropr: any;
  Others: any;
  Others2: any;
  remarks: any;
  checkedby: any;
  StampSignature: any;
  gender:any;
  fieldnames: any = [];
  glucose: string;
  Bilirubin: string;
  StampSignature1: string;
  paramid: any;
  null: any;
  cmn: any;
  transdate: any;
  showpagenation: boolean;
  userid: any;
  public get date(): any {
    return this._date;
  }
  public set date(value: any) {
    this._date = value;
  }
  age: any;
  nationality: any;
  Routine: any;
  Urgent: any;
  ClinicalComments: any;
  Requestedby: any;
  Stampsignature: any;
  paramtext: any;
  updatebutton: boolean;
  insertbutton: boolean = true;

  constructor(public http: Http,
    public chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    public router: Router) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.getdata();
  }

   getdata() {
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Getuser";
    let params = {
      "text": "Get_printgrid_data",
      "id": "102",
      "param1": "",
      "param2": ""
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
      this.isPageloaderVisible=false;
      if (result.status_cd == "0") {
        //this.showLoader = false;
        this.showdata = false;
        this.nodata = false;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
       // this.showLoader = false;
        this.table = result.data.Table;
        this.showdata = true;
        this.nodata = true;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    }, err => {
      //console.log(err)
    })
  }

  print(id,date) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions";
    let params = {
      "Sno": "102",
      "Practitioner_Id":id,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": date,
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
        //console.log("print.. ")

        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.age = result.data.Table[0].LABELLABEL4;
        this.nationality = result.data.Table[0].LABELLABEL5;
        this.gender = result.data.Table[0].LABELLABEL6;
        this.Routine = result.data.Table[0].LABELLABEL7;
        this.Urgent = result.data.Table[0].LABELLABEL8;
        this.Preoperative = result.data.Table[0].LABELLABEL9;
        this.ClinicalComments = result.data.Table[0].LABELLABEL10;
        this.Requestedby = result.data.Table[0].LABELLABEL11;
        this.StampSignature = result.data.Table[0].LABELLABEL12;
        this.null = result.data.Table[0].LABELLABEL13;
        this.Creatnine = result.data.Table[0].LABELLABEL14;
        this.BUN = result.data.Table[0].LABELLABEL15;
        this.UricAcid = result.data.Table[0].LABELLABEL16;
        this.Phosporous = result.data.Table[0].LABELLABEL17;
        this.Cloride = result.data.Table[0].LABELLABEL18;
        this.Amylase = result.data.Table[0].LABELLABEL19;
        this.Calcium = result.data.Table[0].LABELLABEL20;
        this.Iron = result.data.Table[0].LABELLABEL21;
        this.Potassium = result.data.Table[0].LABELLABEL22;
        this.Megnesium = result.data.Table[0].LABELLABEL23;
        this.ALT = result.data.Table[0].LABELLABEL24;
        this.AST = result.data.Table[0].LABELLABEL25;
        this.GGT = result.data.Table[0].LABELLABEL26;
        this.Phosphatase = result.data.Table[0].LABELLABEL27;
        this.TotalProtein = result.data.Table[0].LABELLABEL28;
        this.Albumin = result.data.Table[0].LABELLABEL29;
        this.null = result.data.Table[0].LABELLABEL30;
        this.Cholesterol = result.data.Table[0].LABELLABEL31;
        this.Triglycerides = result.data.Table[0].LABELLABEL32;
        this.HDL = result.data.Table[0].LABELLABEL33;
        this.Others2 = result.data.Table[0].LABELLABEL34;
        this.remarks = result.data.Table[0].LABELLABEL35;
        this.checkedby = result.data.Table[0].LABELLABEL36;
        this.StampSignature1 = result.data.Table[0].LABELLABEL37;
        this.false2 = result.data.Table[0].LABELLABEL38;
        this.pop = result.data.Table[0].LABELLABEL39;
        this.Ropr = result.data.Table[0].LABELLABEL40;
        this.true2 = result.data.Table[0].LABELLABEL41;
        this.Dai = result.data.Table[0].LABELLABEL42;


        (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Female1')).removeAttribute('checked');

        if (this.gender == "Male") {
          $("#male").prop("checked", "true");
          this.gender = 'Male';

          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('male')).setAttribute('checked', 'true');
        }
        if (this.gender == "Female") {
          this.gender = 'Female'
          $("#female").prop("checked", "true");
          (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
        }

        //console.log(this.Routine);
        if (this.Routine == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
        }

        //console.log(this.Preoperative);
        if (this.Preoperative == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked');
        }

        //console.log(this.Urgent);
        if (this.Urgent == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked');
        }

        //console.log(this.Creatnine);
        if (this.Creatnine == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Creatnine1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Creatnine1')).removeAttribute('checked');
        }

        //console.log(this.AST);
        if (this.AST == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('AST1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('AST1')).removeAttribute('checked');
        }
        //console.log(this.BUN);
        if (this.BUN == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('BUN1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('BUN1')).removeAttribute('checked');
        }

        //console.log(this.GGT);
        if (this.GGT == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('GGT1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('GGT1')).removeAttribute('checked');
        }
        //console.log(this.UricAcid);
        if (this.UricAcid == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('UricAcid1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('UricAcid1')).removeAttribute('checked');
        }

        //console.log(this.Phosphatase);
        if (this.Phosphatase == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Phosphatase1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Phosphatase1')).removeAttribute('checked');
        }

        //console.log(this.Phosporous);
        if (this.Phosporous == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Phosporous1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Phosporous1')).removeAttribute('checked');
        }

        //console.log(this.TotalProtein);
        if (this.TotalProtein == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('TotalProtein1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('TotalProtein1')).removeAttribute('checked');
        }

        //console.log(this.Cloride);
        if (this.Cloride == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Cloride1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Cloride1')).removeAttribute('checked');
        }

        //console.log(this.Albumin);
        if (this.Albumin == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Albumin1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Albumin1')).removeAttribute('checked');
        }

        //console.log(this.Amylase);
        if (this.Amylase == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Amylase1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Amylase1')).removeAttribute('checked');
        }


        //console.log(this.true2);
        if (this.true2 == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('true1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('true1')).removeAttribute('checked');
        }

        //console.log(this.Dai);
        if (this.Dai == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Dai1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Dai1')).removeAttribute('checked');
        }

        //console.log(this.Calcium);
        if (this.Calcium == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Calcium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Calcium1')).removeAttribute('checked');
        }

        //console.log(this.Cholesterol);
        if (this.Cholesterol == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Cholesterol1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Cholesterol1')).removeAttribute('checked');
        }

        //console.log(this.Iron);
        if (this.Iron == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Iron1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Iron1')).removeAttribute('checked');
        }

        //console.log(this.Triglycerides);
        if (this.Triglycerides == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Triglycerides1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Triglycerides1')).removeAttribute('checked');
        }
        //console.log(this.Potassium);
        if (this.Potassium == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Potassium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Potassium1')).removeAttribute('checked');
        }

        //console.log(this.HDL);
        if (this.HDL == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('HDL1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('HDL1')).removeAttribute('checked');
        }


        //console.log(this.Megnesium);
        if (this.Megnesium == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Megnesium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Megnesium1')).removeAttribute('checked');
        }

        //console.log(this.ALT);
        if (this.ALT == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('ALT1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('ALT1')).removeAttribute('checked');
        }

        //console.log(this.false2);
        if (this.false2 == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('false1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('false1')).removeAttribute('checked');
        }
        if (this.pop == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('pop1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('pop1')).removeAttribute('checked');
        }

        //console.log(this.Ropr);
        if (this.Ropr == "true") {
          //console.log("checked");
          (<HTMLInputElement>document.getElementById('Ropr1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Ropr1')).removeAttribute('checked');
        }
        setTimeout(() => {
          this.printpage();
        }, 1000)

      } else {

      }
    }, err => {
      //console.log(err)
    })
  }

  myFunction() {
    window.print();
  }

  printpage() {
    //console.log(this.name)
    var divToPrint = document.getElementById('DivIdToPrint');
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 1000);
  }
  viewbiochemistry(id, text , date) {
    this.router.navigate(['/biochemistryview', id, text ,date]);
  }

  edit(id,text,date) {
    this.router.navigate(['/biochemistryupdate', id, text,date]);
  }
}


