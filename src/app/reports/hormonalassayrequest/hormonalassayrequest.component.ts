import { Component, OnInit } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hormonalassayrequest',
  templateUrl: './hormonalassayrequest.component.html',
  styleUrls: ['./hormonalassayrequest.component.css']
})
export class HormonalassayrequestComponent implements OnInit {
  name: any;
  filenumber: any;
  date: any;
  age: any;
  nationality: any;
  t: any;
  f: any;
  routine: any;
  urgent: any;
  preoperative: any;
  clinicalcomments: any;
  requestedby: any;
  stampsignature: any;
  tsh: any;
  fta4: any;
  ferritin: any;
  antitg: any;
  vitd: any;
  antipo: any;
  vit12: any;
  fsh: any;
  toxoplasmaigm: any;
  lh: any;
  toxoplasmaigg: any;
  Porlactin: any;
  rubellaigm: any;
  bhcg: any;
  rubellaigg: any;
  estradiol: any;
  cytomeggaovirusigm: any;
  testosterone: any;
  cytomegalovirusigg: any;
  progesterone: any;
  others: any;
  remarks: any;
  checked: any;
  stamp: any;
  gender: any;
  fieldnames: any;
  paramid: any;
  paramtext: any;
  insertbutton: boolean;
  updatebutton: boolean;
  paramdate: any;
  inpatientpage: boolean;
  inreportspage: boolean;
  userid: any;


  constructor(public http: Http,
    public cmn: UserinfoService,
    public route: ActivatedRoute,
    public router: Router) { 
      this.userid = window.localStorage.getItem("userId");
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      console.log(params.get('id'))
      console.log(params.get('text'))
      this.paramdate = params.get('date');
      this.paramid = params.get('id');
      this.paramtext = params.get('text');
      if (this.paramtext == 'View') {
        $("input").attr('disabled', 'disabled');
        this.getdata();
        this.inpatientpage = false;
        this.inreportspage = true;
        this.insertbutton = false;
        this.updatebutton = false;
      }
      else if (this.paramtext == 'Edit') {
        this.inpatientpage = false;
        this.inreportspage = true;
        this.updatebutton = true;
        this.insertbutton = false;
        this.getdata();
      } else {
        this.inpatientpage = true;
        this.inreportspage = false;
        this.insertbutton = true;
      }
    })
  }

  genderchange(event) {
    (<HTMLInputElement>document.getElementById('male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('female1')).removeAttribute('checked');
    if (event.target.value == "Female") {
      this.gender = 'Female';
      (<HTMLInputElement>document.getElementById('female1')).setAttribute('checked', 'true');
    } else {
      this.gender = 'Male';
      (<HTMLInputElement>document.getElementById('male1')).setAttribute('checked', 'true');
    }
  }

  checkbox() {
    (<HTMLInputElement>document.getElementById('routine1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('urgent1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('preoperative1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('tsh1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('t1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('f1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('fta41')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('ferritin1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('antipo1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('vit121')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('fsh1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('toxoplasmaigm1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('lh1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('toxoplasmaigg1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Porlactin1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('rubellaigm1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('bhcg1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('rubellaigg1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('estradiol1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('cytomeggaovirusigm1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('testosterone1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('cytomegalovirusigg1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('progesterone1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('antitg1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('vitd1')).removeAttribute('checked');

    if (this.routine == true) {
      (<HTMLInputElement>document.getElementById('routine1')).setAttribute('checked', 'true');
    }
    if (this.urgent == true) {
      (<HTMLInputElement>document.getElementById('urgent1')).setAttribute('checked', 'true');
    }
    if (this.preoperative == true) {
      (<HTMLInputElement>document.getElementById('preoperative1')).setAttribute('checked', 'true');
    }
    if (this.tsh) {
      (<HTMLInputElement>document.getElementById('tsh1')).setAttribute('checked', 'true');
    }
    if (this.t == true) {
      (<HTMLInputElement>document.getElementById('t1')).setAttribute('checked', 'true');
    }
    if (this.f == true) {
      (<HTMLInputElement>document.getElementById('f1')).setAttribute('checked', 'true');
    }
    if (this.fta4 == true) {
      (<HTMLInputElement>document.getElementById('fta41')).setAttribute('checked', 'true');
    }
    if (this.ferritin == true) {
      (<HTMLInputElement>document.getElementById('ferritin1')).setAttribute('checked', 'true');
    }
    if (this.antipo == true) {
      (<HTMLInputElement>document.getElementById('antipo1')).setAttribute('checked', 'true');
    }
    if (this.vit12 == true) {
      (<HTMLInputElement>document.getElementById('vit121')).setAttribute('checked', 'true');
    }

    if (this.fsh == true) {
      (<HTMLInputElement>document.getElementById('fsh1')).setAttribute('checked', 'true');
    }
    if (this.toxoplasmaigm == true) {
      (<HTMLInputElement>document.getElementById('toxoplasmaigm1')).setAttribute('checked', 'true');
    }
    if (this.lh == true) {
      (<HTMLInputElement>document.getElementById('lh1')).setAttribute('checked', 'true');
    }
    if (this.toxoplasmaigg == true) {
      (<HTMLInputElement>document.getElementById('toxoplasmaigg1')).setAttribute('checked', 'true');
    }
    if (this.Porlactin == true) {
      (<HTMLInputElement>document.getElementById('Porlactin1')).setAttribute('checked', 'true');
    }
    if (this.rubellaigm == true) {
      (<HTMLInputElement>document.getElementById('rubellaigm1')).setAttribute('checked', 'true');
    }
    if (this.bhcg == true) {
      (<HTMLInputElement>document.getElementById('bhcg1')).setAttribute('checked', 'true');
    }
    if (this.rubellaigg == true) {
      (<HTMLInputElement>document.getElementById('rubellaigg1')).setAttribute('checked', 'true');
    }
    if (this.estradiol == true) {
      (<HTMLInputElement>document.getElementById('estradiol1')).setAttribute('checked', 'true');
    }
    if (this.cytomeggaovirusigm == true) {
      (<HTMLInputElement>document.getElementById('cytomeggaovirusigm1')).setAttribute('checked', 'true');
    }
    if (this.testosterone == true) {
      (<HTMLInputElement>document.getElementById('testosterone1')).setAttribute('checked', 'true');
    }
    if (this.cytomegalovirusigg == true) {
      (<HTMLInputElement>document.getElementById('cytomegalovirusigg1')).setAttribute('checked', 'true');
    }
    if (this.progesterone == true) {
      (<HTMLInputElement>document.getElementById('progesterone1')).setAttribute('checked', 'true');
    }
    if (this.antitg == true) {
      (<HTMLInputElement>document.getElementById('antitg1')).setAttribute('checked', 'true');
    }
    if (this.vitd == true) {
      (<HTMLInputElement>document.getElementById('vitd1')).setAttribute('checked', 'true');
    }
  }

  insertdata() {
    var accessToken = window.localStorage.Tokenval;
    this.fieldnames = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality + ',' + this.gender + ','
      + this.routine + ',' + this.urgent + ',' + this.preoperative + ',' + this.clinicalcomments + ',' + this.requestedby + ','
      + this.stampsignature + ',' + this.tsh + ',' + this.fta4 + ',' + this.antitg + ',' + this.antipo + ',' + this.fsh + ',' + this.lh + ','
      + this.Porlactin + ',' + this.bhcg + ',' + this.estradiol + ',' + this.testosterone + ',' + this.progesterone + ',' + null + ',' + this.ferritin + ','
      + this.vitd + ',' + this.vit12 + ',' + this.toxoplasmaigm + ',' + this.toxoplasmaigg + ',' + this.rubellaigm + ',' + this.rubellaigg
      + ',' + this.cytomeggaovirusigm + ',' + this.cytomegalovirusigg + ',' + this.others + ',' + this.remarks + ',' + this.checked + ',' + this.stamp + ',' + this.t + ',' + this.f;
    let body =
    {
      "Sno": "104",
      "Practitioner_Id":window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": this.paramdate,
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
        alert('Inserted Successfully')
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      }
      else {
        console.log('error')
      }
    })
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "104",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
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
    // this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality + ',' + this.gender + ','
    // + this.routine + ',' + this.urgent + ',' + this.preoperative + ',' + this.clinicalcomments + ',' + this.requestedby + ','
    // + this.stampsignature + ',' + this.tsh + ',' + this.fta4 + ',' + this.antitg + ',' + this.antipo + ',' + this.fsh + ',' + this.lh + ','
    // + this.Porlactin + ',' + this.bhcg + ',' + this.estradiol + ',' + this.testosterone + ',' + this.progesterone + ',' + null + ',' + this.ferritin + ','
    // + this.vitd + ',' + this.vit12 + ',' + this.toxoplasmaigm + ',' + this.toxoplasmaigg + ',' + this.rubellaigm + ',' + this.rubellaigg
    // + ',' + this.cytomeggaovirusigm + ',' + this.cytomegalovirusigg + ',' + this.others + ',' + this.remarks + ',' + this.checked + ',' + this.stamp + ',' + this.t + ',' + this.f;
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
        let routine = result.data.Table[0].LABELLABEL7;
        let urgent = result.data.Table[0].LABELLABEL8;
        let preoperative = result.data.Table[0].LABELLABEL9;
        this.clinicalcomments = result.data.Table[0].LABELLABEL10;
        this.requestedby = result.data.Table[0].LABELLABEL11;
        this.stampsignature = result.data.Table[0].LABELLABEL12;
        let tsh = result.data.Table[0].LABELLABEL13;
        let fta4 = result.data.Table[0].LABELLABEL14;
        let antitg = result.data.Table[0].LABELLABEL15;
        let antipo = result.data.Table[0].LABELLABEL16;
        let fsh = result.data.Table[0].LABELLABEL17;
        let lh = result.data.Table[0].LABELLABEL18;
        let Porlactin = result.data.Table[0].LABELLABEL19;
        let bhcg = result.data.Table[0].LABELLABEL20;
        let estradiol = result.data.Table[0].LABELLABEL21;
        let testosterone = result.data.Table[0].LABELLABEL22;
        let progesterone = result.data.Table[0].LABELLABEL23;
        let ferritin = result.data.Table[0].LABELLABEL25;
        let vitd = result.data.Table[0].LABELLABEL26;
        let vit12 = result.data.Table[0].LABELLABEL27;
        let toxoplasmaigm = result.data.Table[0].LABELLABEL28;
        let toxoplasmaigg = result.data.Table[0].LABELLABEL29;
        let rubellaigm = result.data.Table[0].LABELLABEL30;
        let rubellaigg = result.data.Table[0].LABELLABEL31;
        let cytomeggaovirusigm = result.data.Table[0].LABELLABEL32;
        let cytomegalovirusigg = result.data.Table[0].LABELLABEL33;
        this.others = result.data.Table[0].LABELLABEL34;
        this.remarks = result.data.Table[0].LABELLABEL35;
        this.checked = result.data.Table[0].LABELLABEL36;
        this.stamp = result.data.Table[0].LABELLABEL37;
        let t = result.data.Table[0].LABELLABEL38;
        let f = result.data.Table[0].LABELLABEL39;
        if (this.gender == "Female") {
          $("#female").prop("checked", true);
          this.gender = 'Female';
          (<HTMLInputElement>document.getElementById('female1')).setAttribute('checked', 'true');
        }
        if (this.gender == "Male") {
          $("#male").prop("checked", true);
          this.gender = 'Male';
          (<HTMLInputElement>document.getElementById('male1')).setAttribute('checked', 'true');
        }
        if (this.routine == 'true') {
          this.routine = routine
          $("#routine").prop("checked", true);
          (<HTMLInputElement>document.getElementById('routine1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('routine1')).removeAttribute('checked');
        }
        if (urgent == 'true') {
          this.urgent = urgent
          $("#urgent").prop("checked", true);
          (<HTMLInputElement>document.getElementById('urgent1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('urgent1')).removeAttribute('checked');
        }

        if (preoperative == 'true') {
          this.preoperative = preoperative
          $("#preoperative").prop("checked", true);
          (<HTMLInputElement>document.getElementById('preoperative1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('preoperative1')).removeAttribute('checked');
        }


        if (tsh == 'true') {
          this.tsh = tsh
          $("#tsh").prop("checked", true);
          (<HTMLInputElement>document.getElementById('tsh1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('tsh1')).removeAttribute('checked');
        }

        if (t == 'true') {
          this.t = t;
          $("#t").prop("checked", true);
          (<HTMLInputElement>document.getElementById('t1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('t1')).removeAttribute('checked');
        }

        if (f == 'true') {
          this.f = f
          $("#f").prop("checked", true);
          (<HTMLInputElement>document.getElementById('f1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('f1')).removeAttribute('checked');
        }

        if (fta4 == 'true') {
          this.fta4 = fta4;
          $("#fta4").prop("checked", true);
            (<HTMLInputElement>document.getElementById('fta41')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('fta41')).removeAttribute('checked');
        }

        if (this.ferritin == 'true') {
          $("#ferritin").prop("checked", true);
          this.ferritin = ferritin
            (<HTMLInputElement>document.getElementById('ferritin1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('ferritin1')).removeAttribute('checked');
        }
        if (antipo == 'true') {
          this.antipo = antipo;
          $("#antipo").prop("checked", true);
          (<HTMLInputElement>document.getElementById('antipo1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('antipo1')).removeAttribute('checked');
        }

        if (vit12 == 'true') {
          this.vit12 = vit12;
          $("#vit12").prop("checked", true);
          (<HTMLInputElement>document.getElementById('vit121')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('vit121')).removeAttribute('checked');
        }

        if (fsh == 'true') {
          this.fsh = fsh;
          $("#fsh").prop("checked", true);
          (<HTMLInputElement>document.getElementById('fsh1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('fsh1')).removeAttribute('checked');
        }

        if (toxoplasmaigm == 'true') {
          this.toxoplasmaigm = toxoplasmaigm;
          $("#fsh").prop("checked", true);
          (<HTMLInputElement>document.getElementById('toxoplasmaigm1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('toxoplasmaigm1')).removeAttribute('checked');
        }

        if (lh == 'true') {
          this.lh = lh;
          $("#lh").prop("checked", true);
          (<HTMLInputElement>document.getElementById('lh1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('lh1')).removeAttribute('checked');
        }

        if (toxoplasmaigg == 'true') {
          this.toxoplasmaigg = toxoplasmaigg;
          $("#toxoplasmaigg").prop("checked", true);
          (<HTMLInputElement>document.getElementById('toxoplasmaigg1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('toxoplasmaigg1')).removeAttribute('checked');
        }
        if (Porlactin == 'true') {
          this.Porlactin = Porlactin;
          $("#Porlactin").prop("checked", true);
          (<HTMLInputElement>document.getElementById('Porlactin1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('Porlactin1')).removeAttribute('checked');
        }

        if (rubellaigm == 'true') {
          this.rubellaigm = rubellaigm;
          $("#rubellaigm").prop("checked", true);
          (<HTMLInputElement>document.getElementById('rubellaigm1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('rubellaigm1')).removeAttribute('checked');
        }
        if (bhcg == 'true') {
          this.bhcg = bhcg;
          $("#bhcg").prop("checked", true);
          (<HTMLInputElement>document.getElementById('bhcg1')).setAttribute('checked', 'true');
        } else {
          (<HTMLInputElement>document.getElementById('bhcg1')).removeAttribute('checked');
        }

        if (rubellaigg == 'true') {
          this.rubellaigg = rubellaigg;
          $("#rubellaigg").prop("checked", true);
          (<HTMLInputElement>document.getElementById('rubellaigg1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('rubellaigg1')).removeAttribute('checked');
        }


        if (estradiol == 'true') {
          this.estradiol = estradiol;
          $("#estradiol1").prop("checked", true);
          (<HTMLInputElement>document.getElementById('estradiol1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('estradiol1')).removeAttribute('checked');
        }
        if (cytomeggaovirusigm == 'true') {
          this.cytomeggaovirusigm = cytomeggaovirusigm;
          $("#cytomeggaovirusigm").prop("checked", true);
          (<HTMLInputElement>document.getElementById('cytomeggaovirusigm1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('cytomeggaovirusigm1')).removeAttribute('checked');
        }
        if (testosterone == 'true') {
          this.testosterone = testosterone;
          $("#testosterone").prop("checked", true);
          (<HTMLInputElement>document.getElementById('testosterone1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('testosterone1')).removeAttribute('checked');
        }
        if (cytomegalovirusigg == 'true') {
          this.cytomegalovirusigg = cytomegalovirusigg;
          $("#cytomegalovirusigg").prop("checked", true);
          (<HTMLInputElement>document.getElementById('cytomegalovirusigg1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('cytomegalovirusigg1')).removeAttribute('checked');
        }
        if (progesterone == 'true') {
          this.progesterone = progesterone;
          $("#progesterone").prop("checked", true);
          (<HTMLInputElement>document.getElementById('progesterone1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('progesterone1')).removeAttribute('checked');
        }
        if (antitg == 'true') {
          this.antitg = antitg;
          $("#antitg").prop("checked", true);
          (<HTMLInputElement>document.getElementById('antitg1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('antitg1')).removeAttribute('checked');
        }
        if (vitd == 'true') {
          this.vitd = vitd;
          $("#vitd").prop("checked", true);
          (<HTMLInputElement>document.getElementById('vitd1')).setAttribute('checked', 'true');
        }
        else {
          (<HTMLInputElement>document.getElementById('vitd1')).removeAttribute('checked');
        }
      } else {
      }
    }, err => {
      console.log(err)
    })

  }

  update() {
    var accessToken = window.localStorage.Tokenval;

    this.fieldnames = this.name + ',' + this.filenumber + ',' + this.date + ',' + this.age + ',' + this.nationality + ',' + this.gender + ','
      + this.routine + ',' + this.urgent + ',' + this.preoperative + ',' + this.clinicalcomments + ',' + this.requestedby + ','
      + this.stampsignature + ',' + this.tsh + ',' + this.fta4 + ',' + this.antitg + ',' + this.antipo + ',' + this.fsh + ',' + this.lh + ','
      + this.Porlactin + ',' + this.bhcg + ',' + this.estradiol + ',' + this.testosterone + ',' + this.progesterone + ',' + null + ',' + this.ferritin + ','
      + this.vitd + ',' + this.vit12 + ',' + this.toxoplasmaigm + ',' + this.toxoplasmaigg + ',' + this.rubellaigm + ',' + this.rubellaigg
      + ',' + this.cytomeggaovirusigm + ',' + this.cytomegalovirusigg + ',' + this.others + ',' + this.remarks + ',' + this.checked + ',' + this.stamp + ',' + this.t + ',' + this.f;
    let body =
    {
      "Sno": "104",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39",
      "status": this.fieldnames,
      "Login_ID": "",
      "Trans_Date": this.paramdate,
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
    let url = this.cmn.commonUrl + 'Account/DocTreatment_Transactions'

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == 1) {
        alert('Updated Successfully')
        this.router.navigate(['/harmonalgrid']);
      }
      else {
        console.log('error')
      }
    })
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
}



