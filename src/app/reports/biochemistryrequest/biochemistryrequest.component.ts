import { Component, OnInit } from '@angular/core';
import { Alert, AlertPromise } from 'selenium-webdriver';
import { RequestOptions, Http, Headers } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-biochemistryrequest',
  templateUrl: './biochemistryrequest.component.html',
  styleUrls: ['./biochemistryrequest.component.css']
})
export class BiochemistryrequestComponent implements OnInit {
  patient:boolean;
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
  glucose: any;
  Bilirubin: any;
  StampSignature1: any;
  paramid: any;
  null: any;
  fieldnames: any;
  getdata: any;
  paramdate: any;
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
  inreportspage: boolean;
  inpatientpage: boolean;
  insertbutton: boolean = true;

  constructor(public http: Http, 
    public cmn: UserinfoService, 
    public route: ActivatedRoute,
    public router:Router) { 
      this.userid = window.localStorage.getItem("userId");
    }

  ngOnInit() {
    this.patient=true
    this.route.paramMap.subscribe(params => {
    console.log(params)
    console.log(params.get('id'))
    console.log(params.get('text'))
    this.paramdate = params.get('date');
    this.paramid = params.get('id');
    this.paramtext = params.get('text');

    if (this.paramtext == 'View') {
      $("input").attr('disabled', 'disabled');
      this.view();
      this.inpatientpage = false;
      this.inreportspage = true;
      this.insertbutton = false;
      this.updatebutton = false;
      this.patient = false;
    }
    else if (this.paramtext == 'Edit') {
      this.inpatientpage = false;
      this.inreportspage = true;
      this.updatebutton = true;
      this.insertbutton = false;
      this.patient = false;
      this.view();
    } else {
      this.inpatientpage = true;
      this.inreportspage = false;
      this.insertbutton = true;
      this.patient = true
    }
    })
  }

  genderchange(event) {
    (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Female1')).removeAttribute('checked');
    if (event.target.value == "Female") {
      this.gender = 'Female';
      (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
    } else {
      this.gender = 'Male';
      (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
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

  checkboxchange() {
    console.log(this.Routine);
    if (this.Routine == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
    }
    console.log(this.Preoperative);
    if (this.Preoperative == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked');
    }
    console.log(this.Urgent);
    if (this.Urgent == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked');
    }
    console.log(this.Creatnine);
    if (this.Creatnine == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Creatnine1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Creatnine1')).removeAttribute('checked');
    }
    console.log(this.AST);
    if (this.AST == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('AST1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('AST1')).removeAttribute('checked');
    }
    console.log(this.BUN);
    if (this.BUN == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('BUN1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('BUN1')).removeAttribute('checked');
    }
    console.log(this.GGT);
    if (this.GGT == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('GGT1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('GGT1')).removeAttribute('checked');
    }
    console.log(this.UricAcid);
    if (this.UricAcid == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('UricAcid1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('UricAcid1')).removeAttribute('checked');
    }
    console.log(this.Phosphatase);
    if (this.Phosphatase == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Phosphatase1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Phosphatase1')).removeAttribute('checked');
    }
    console.log(this.Phosporous);
    if (this.Phosporous == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Phosporous1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Phosporous1')).removeAttribute('checked');
    }
    console.log(this.TotalProtein);
    if (this.TotalProtein == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('TotalProtein1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('TotalProtein1')).removeAttribute('checked');
    }
    console.log(this.Cloride);
    if (this.Cloride == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Cloride1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Cloride1')).removeAttribute('checked');
    }
    console.log(this.Albumin);
    if (this.Albumin == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Albumin1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Albumin1')).removeAttribute('checked');
    }
    console.log(this.Amylase);
    if (this.Amylase == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Amylase1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Amylase1')).removeAttribute('checked');
    }
    console.log(this.true2);
    if (this.true2 == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('true1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('true1')).removeAttribute('checked');
    }
    console.log(this.Dai);
    if (this.Dai == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Dai1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Dai1')).removeAttribute('checked');
    }
    console.log(this.Calcium);
    if (this.Calcium == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Calcium1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Calcium1')).removeAttribute('checked');
    }
    console.log(this.Cholesterol);
    if (this.Cholesterol == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Cholesterol1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Cholesterol1')).removeAttribute('checked');
    }
    console.log(this.Iron);
    if (this.Iron == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Iron1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Iron1')).removeAttribute('checked');
    }
    console.log(this.Triglycerides);
    if (this.Triglycerides == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Triglycerides1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Triglycerides1')).removeAttribute('checked');
    }
    console.log(this.Potassium);
    if (this.Potassium == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Potassium1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Potassium1')).removeAttribute('checked');
    }
    console.log(this.HDL);
    if (this.HDL == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HDL1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('HDL1')).removeAttribute('checked');
    }
    console.log(this.Megnesium);
    if (this.Megnesium == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Megnesium1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Megnesium1')).removeAttribute('checked');
    }
    console.log(this.ALT);
    if (this.ALT == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ALT1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('ALT1')).removeAttribute('checked');
    }
    console.log(this.false2);
    if (this.false2 == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('false1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('false1')).removeAttribute('checked');
    }
    console.log(this.pop);
    if (this.pop == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('pop1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('pop1')).removeAttribute('checked');
    }
    console.log(this.Ropr);
    if (this.Ropr == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Ropr1')).setAttribute('checked', 'true');
    }
    else {
      (<HTMLInputElement>document.getElementById('Ropr1')).removeAttribute('checked');
    }
  }

  insert() {
    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality + ',' + this.gender + ',' + this.Routine + ',' + this.Urgent + ',' + this.Preoperative + ',' + this.ClinicalComments + ',' + this.Requestedby + ','
      + this.StampSignature + ',' + null + ',' + this.Creatnine + ',' + this.BUN + ',' + this.UricAcid + ',' + this.Phosporous + ',' + this.Cloride + ',' + this.Amylase + ',' + this.Calcium + ',' + this.Iron + ',' + this.Potassium + ',' + this.Megnesium + ',' + this.ALT + ',' + this.AST + ','
      + this.GGT + ',' + this.Phosphatase + ',' + this.TotalProtein + ',' + this.Albumin + ',' + null + ',' + this.Cholesterol + ',' + this.Triglycerides + ',' + this.HDL + ',' + this.Others2 + ',' + this.remarks + ',' + this.checkedby + ',' + this.StampSignature1 + ','
      + this.false2 + ',' + this.pop + ',' + this.Ropr + ',' + this.true2 + ',' + this.Dai;
    console.log(this.fieldnames)
    console.log('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42')

    let body =
    {
      "Sno": "102",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    let url = this.cmn.commonUrl + 'Account/DocTreatment_Transactions'

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == 1) {
        alert('Successfully Inserted')

        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
       
      }
      else {
        console.log('error')
      }
    })
  }

  update() {
    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality + ',' + this.gender + ',' + this.Routine + ',' + this.Urgent + ',' + this.Preoperative + ',' + this.ClinicalComments + ',' + this.Requestedby + ','
      + this.StampSignature + ',' + null + ',' + this.Creatnine + ',' + this.BUN + ',' + this.UricAcid + ',' + this.Phosporous + ',' + this.Cloride + ',' + this.Amylase + ',' + this.Calcium + ',' + this.Iron + ',' + this.Potassium + ',' + this.Megnesium + ',' + this.ALT + ',' + this.AST + ','
      + this.GGT + ',' + this.Phosphatase + ',' + this.TotalProtein + ',' + this.Albumin + ',' + null + ',' + this.Cholesterol + ',' + this.Triglycerides + ',' + this.HDL + ',' + this.Others2 + ',' + this.remarks + ',' + this.checkedby + ',' + this.StampSignature1 + ','
      + this.false2 + ',' + this.pop + ',' + this.Ropr + ',' + this.true2 + ',' + this.Dai;
    let body =
    {
      "Sno": "102",
      "Practitioner_Id":this.paramid,
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date":this.paramdate,
      "Operation": "UpdatePrintdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    let url = this.cmn.commonUrl +'Account/DocTreatment_Transactions'
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == 1) {
        alert('Updated Successfully')
        this.router.navigate(['/biochemistrygrid']);
      }
      else {
        console.log('error')
      }
    })
  }

  view() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "102",
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
        console.log("print.. ")
        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.age = result.data.Table[0].LABELLABEL4;
        this.nationality = result.data.Table[0].LABELLABEL5;
        this.gender = result.data.Table[0].LABELLABEL6;
        let Routine = result.data.Table[0].LABELLABEL7;
        let Urgent = result.data.Table[0].LABELLABEL8;
        let Preoperative = result.data.Table[0].LABELLABEL9;
        this.ClinicalComments = result.data.Table[0].LABELLABEL10;
        this.Requestedby = result.data.Table[0].LABELLABEL11;
        this.StampSignature = result.data.Table[0].LABELLABEL12;
        this.null = result.data.Table[0].LABELLABEL13;
        let Creatnine = result.data.Table[0].LABELLABEL14;
        let BUN = result.data.Table[0].LABELLABEL15;
        let UricAcid = result.data.Table[0].LABELLABEL16;
        let Phosporous = result.data.Table[0].LABELLABEL17;
        let Cloride = result.data.Table[0].LABELLABEL18;
        let Amylase = result.data.Table[0].LABELLABEL19;
        let Calcium = result.data.Table[0].LABELLABEL20;
        let Iron = result.data.Table[0].LABELLABEL21;
        let Potassium = result.data.Table[0].LABELLABEL22;
        let Megnesium = result.data.Table[0].LABELLABEL23;
        let ALT = result.data.Table[0].LABELLABEL24;
        let AST = result.data.Table[0].LABELLABEL25;
        let GGT = result.data.Table[0].LABELLABEL26;
        let Phosphatase = result.data.Table[0].LABELLABEL27;
        let TotalProtein = result.data.Table[0].LABELLABEL28;
        let Albumin = result.data.Table[0].LABELLABEL29;
        this.null = result.data.Table[0].LABELLABEL30;
        let Cholesterol = result.data.Table[0].LABELLABEL31;
        let Triglycerides = result.data.Table[0].LABELLABEL32;
        let HDL = result.data.Table[0].LABELLABEL33;
        this.Others2 = result.data.Table[0].LABELLABEL34;
        this.remarks = result.data.Table[0].LABELLABEL35;
        this.checkedby = result.data.Table[0].LABELLABEL36;
        this.StampSignature1 = result.data.Table[0].LABELLABEL37;
        let false2 = result.data.Table[0].LABELLABEL38;
        let pop = result.data.Table[0].LABELLABEL39;
        let Ropr = result.data.Table[0].LABELLABEL40;
        let true2 = result.data.Table[0].LABELLABEL41;
        let Dai = result.data.Table[0].LABELLABEL42;


        (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Female1')).removeAttribute('checked');

        if (this.gender == "Male") {
          $("#male").prop("checked", true);
          this.gender = 'Male';

          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
          // (<HTMLInputElement>document.getElementById('male')).setAttribute('checked', 'true');
        }
        if (this.gender == "Female") {
          this.gender = 'Female'
          $("#female").prop("checked", true);
         
          (<HTMLInputElement>document.getElementById('Female1')).setAttribute('checked', 'true');
        }
        if (Routine == "true") {
          this.Routine=Routine;
          $("#Routine").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked', 'true');
        }
        else{
          (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
        }
      
        if (Preoperative == "true") {
          this.Preoperative=Preoperative;
          $("#Preoperative").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked');
        }
      
        if (Urgent == "true") {
          this.Urgent=Urgent;
        
          $("#Urgent").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked');
        }
       
        if (Creatnine == "true") {
          this.Creatnine=Creatnine;
          $("#Creatnine").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Creatnine1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Creatnine1')).removeAttribute('checked');
        }
        
        if (AST == "true") {
          this.AST=AST;
          $("#AST").prop("checked", true);
          (<HTMLInputElement>document.getElementById('AST1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('AST1')).removeAttribute('checked');
        }
      
        if (BUN == "true") {
          this.BUN=BUN;
          $("#BUN").prop("checked", true);
          (<HTMLInputElement>document.getElementById('BUN1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('BUN1')).removeAttribute('checked');
        }
      
        if (GGT == "true") {
          this.GGT=GGT;
          $("#GGT").prop("checked", true);
          (<HTMLInputElement>document.getElementById('GGT1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('GGT1')).removeAttribute('checked');
        }
       
        if (UricAcid == "true") {
          this.UricAcid=UricAcid;
          $("#UricAcid").prop("checked", true);
          (<HTMLInputElement>document.getElementById('UricAcid1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('UricAcid1')).removeAttribute('checked');
        }
      
        if (Phosphatase == "true") {
          this.Phosphatase=Phosphatase;
          $("#Phosphatase").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Phosphatase1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Phosphatase1')).removeAttribute('checked');
        }
       
        if (Phosporous == "true") {
          this.Phosporous=Phosporous;
          $("#Phosporous").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Phosporous1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Phosporous1')).removeAttribute('checked');
        }
      
        if (TotalProtein == "true") {
          this.TotalProtein=TotalProtein;
          $("#TotalProtein").prop("checked", true);
          (<HTMLInputElement>document.getElementById('TotalProtein1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('TotalProtein1')).removeAttribute('checked');
        }
      
        if (Cloride == "true") {
          this.Cloride=Cloride;
          $("#Cloride").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Cloride1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Cloride1')).removeAttribute('checked');
        }
      
        if (Albumin == "true") {
          this.Albumin=Albumin;
          $("#Albumin").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Albumin1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Albumin1')).removeAttribute('checked');
        }
       
        if (Amylase == "true") {
          this.Amylase=Amylase;
          $("#Amylase").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Amylase1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Amylase1')).removeAttribute('checked');
        }
       
        if (true2 == "true") {
          this.true2=true2;
          $("#true2").prop("checked", true);
          (<HTMLInputElement>document.getElementById('true1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('true1')).removeAttribute('checked');
        }
       
        if (Dai == "true") {
          this.Dai=Dai;
          $("#Dai").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Dai1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Dai1')).removeAttribute('checked');
        }
      
        if (Calcium == "true") {
          this.Calcium=Calcium;
          $("#Calcium").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Calcium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Calcium1')).removeAttribute('checked');        
        }
       
        if (Cholesterol == "true") {
          this.Cholesterol=Cholesterol;
          $("#Cholesterol").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Cholesterol1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Cholesterol1')).removeAttribute('checked');         
        }
      
        if (Iron == "true") {
          this.Iron=Iron;
          $("#Iron").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Iron1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Iron1')).removeAttribute('checked');        
        }
      
        if (Triglycerides == "true") {
          this.Triglycerides=Triglycerides;
          $("#Triglycerides").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Triglycerides1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Triglycerides1')).removeAttribute('checked');
        }
       
        if (Potassium == "true") {
          this.Potassium=Potassium;
          $("#Potassium").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Potassium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Potassium1')).removeAttribute('checked');
        }
      
        if (HDL == "true") {
          this.HDL=HDL;
          $("#HDL").prop("checked", true);
          (<HTMLInputElement>document.getElementById('HDL1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('HDL1')).removeAttribute('checked');
        }
      
        if (Megnesium == "true") {
          this.Megnesium=Megnesium;
          $("#Megnesium").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Megnesium1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Megnesium1')).removeAttribute('checked');
        }
       
        if (ALT == "true") {
          this.ALT=ALT;
          $("#ALT").prop("checked", true);
          (<HTMLInputElement>document.getElementById('ALT1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('ALT1')).removeAttribute('checked');
        }
      
        if (false2 == "true") {
          this.false2=false2;
          $("#false2").prop("checked", true);
          (<HTMLInputElement>document.getElementById('false1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('false1')).removeAttribute('checked');
        }
       
        if (pop == "true") {
          this.pop=pop;
          $("#pop").prop("checked", true);
          (<HTMLInputElement>document.getElementById('pop1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('pop1')).removeAttribute('checked');
        }
    
        if (Ropr == "true") {
          this.Ropr=Ropr;
          $("#Ropr").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Ropr1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Ropr1')).removeAttribute('checked');
        }
      } else {
      }
    }, err => {
      console.log(err)
    })
  }
}
