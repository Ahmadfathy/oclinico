import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-harmonalgrid',
  templateUrl: './harmonalgrid.component.html',
  styleUrls: ['./harmonalgrid.component.css']
})
export class HarmonalgridComponent implements OnInit {
  table: any;
  showdata: boolean;
  nodata: boolean;
  dataTable: any;
  cmn: any;

  //chRef: any;
  isPageloaderVisible: boolean = false;
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
  gender: string;
  fieldnames: string;
  transdate: any;
  userid: any;

  constructor(
    private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.getdata();
  }

  getdata() {
    this.isPageloaderVisible = true
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Getuser";
    let params = {
      "text": "Get_printgrid_data",
      "id": "104",
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
      this.isPageloaderVisible = false
      if (result.status_cd == '1') {
        this.showdata = true;
        this.nodata = true;
        this.table = result.data.Table;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table: any = $('#dataTable');
        this.dataTable = table.DataTable();
      } else {
        this.showdata = false;
        this.nodata = false;
        $('#dataTable_wrapper').hide();
      }
    }, err => {
      console.log(err)
    })
  }

  viewurinalreport(id, text,date) {
    this.router.navigate(['/harmonalview', id, text,date]);
  }

  edit(id, text ,date) {
    this.router.navigate(['/harmonalupdate', id, text,date]);
  }

  print(id,date) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "104",
      "Practitioner_Id": id,
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
        console.log("print.. ")
        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.age = result.data.Table[0].LABELLABEL4;
        this.nationality = result.data.Table[0].LABELLABEL5;
        this.gender = result.data.Table[0].LABELLABEL6;
        this.routine = result.data.Table[0].LABELLABEL7;
        this.urgent = result.data.Table[0].LABELLABEL8;
        this.preoperative = result.data.Table[0].LABELLABEL9;
        this.clinicalcomments = result.data.Table[0].LABELLABEL10;
        this.requestedby = result.data.Table[0].LABELLABEL11;
        this.stampsignature = result.data.Table[0].LABELLABEL12;
        this.tsh = result.data.Table[0].LABELLABEL13;
        this.fta4 = result.data.Table[0].LABELLABEL14;
        this.antitg = result.data.Table[0].LABELLABEL15;
        this.antipo = result.data.Table[0].LABELLABEL16;
        this.fsh = result.data.Table[0].LABELLABEL17;
        this.lh = result.data.Table[0].LABELLABEL18;
        this.Porlactin = result.data.Table[0].LABELLABEL19;
        this.bhcg = result.data.Table[0].LABELLABEL20;
        this.estradiol = result.data.Table[0].LABELLABEL21;
        this.testosterone = result.data.Table[0].LABELLABEL22;
        this.progesterone = result.data.Table[0].LABELLABEL23;
        this.ferritin = result.data.Table[0].LABELLABEL25;
        this.vitd = result.data.Table[0].LABELLABEL26;
        this.vit12 = result.data.Table[0].LABELLABEL27;
        this.toxoplasmaigm = result.data.Table[0].LABELLABEL28;
        this.toxoplasmaigg = result.data.Table[0].LABELLABEL29;
        this.rubellaigm = result.data.Table[0].LABELLABEL30;
        this.rubellaigg = result.data.Table[0].LABELLABEL31;
        this.cytomeggaovirusigm = result.data.Table[0].LABELLABEL32;
        this.cytomegalovirusigg = result.data.Table[0].LABELLABEL33;
        this.others = result.data.Table[0].LABELLABEL34;
        this.remarks = result.data.Table[0].LABELLABEL35;
        this.checked = result.data.Table[0].LABELLABEL36;
        this.stamp = result.data.Table[0].LABELLABEL37;
        this.t = result.data.Table[0].LABELLABEL38;
        this.f = result.data.Table[0].LABELLABEL39;
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
          (<HTMLInputElement>document.getElementById('routine1')).setAttribute('checked', 'true');
        }
        if (this.urgent == 'true') {
          (<HTMLInputElement>document.getElementById('urgent1')).setAttribute('checked', 'true');
        }
        if (this.preoperative == 'true') {
          (<HTMLInputElement>document.getElementById('preoperative1')).setAttribute('checked', 'true');
        }
        if (this.tsh) {
          (<HTMLInputElement>document.getElementById('tsh1')).setAttribute('checked', 'true');
        }
        if (this.t == 'true') {
          (<HTMLInputElement>document.getElementById('t1')).setAttribute('checked', 'true');
        }
        if (this.f == 'true') {
          (<HTMLInputElement>document.getElementById('f1')).setAttribute('checked', 'true');
        }
        if (this.fta4 == 'true') {
          (<HTMLInputElement>document.getElementById('fta41')).setAttribute('checked', 'true');
        }
        if (this.ferritin == 'true') {
          (<HTMLInputElement>document.getElementById('ferritin1')).setAttribute('checked', 'true');
        }
        if (this.antipo == 'true') {
          (<HTMLInputElement>document.getElementById('antipo1')).setAttribute('checked', 'true');
        }
        if (this.vit12 == 'true') {
          (<HTMLInputElement>document.getElementById('vit121')).setAttribute('checked', 'true');
        }
        if (this.fsh == 'true') {
          (<HTMLInputElement>document.getElementById('fsh1')).setAttribute('checked', 'true');
        }
        if (this.toxoplasmaigm == 'true') {
          (<HTMLInputElement>document.getElementById('toxoplasmaigm1')).setAttribute('checked', 'true');
        }
        if (this.lh == 'true') {
          (<HTMLInputElement>document.getElementById('lh1')).setAttribute('checked', 'true');
        }
        if (this.toxoplasmaigg == 'true') {
          (<HTMLInputElement>document.getElementById('toxoplasmaigg1')).setAttribute('checked', 'true');
        }
        if (this.Porlactin == 'true') {
          (<HTMLInputElement>document.getElementById('Porlactin1')).setAttribute('checked', 'true');
        }
        if (this.rubellaigm == 'true') {
          (<HTMLInputElement>document.getElementById('rubellaigm1')).setAttribute('checked', 'true');
        }
        if (this.bhcg == 'true') {
          (<HTMLInputElement>document.getElementById('bhcg1')).setAttribute('checked', 'true');
        }
        if (this.rubellaigg == 'true') {
          (<HTMLInputElement>document.getElementById('rubellaigg1')).setAttribute('checked', 'true');
        }
        if (this.estradiol == 'true') {
          (<HTMLInputElement>document.getElementById('estradiol1')).setAttribute('checked', 'true');
        }
        if (this.cytomeggaovirusigm == 'true') {
          (<HTMLInputElement>document.getElementById('cytomeggaovirusigm1')).setAttribute('checked', 'true');
        }
        if (this.testosterone == 'true') {
          (<HTMLInputElement>document.getElementById('testosterone1')).setAttribute('checked', 'true');
        }
        if (this.cytomegalovirusigg == 'true') {
          (<HTMLInputElement>document.getElementById('cytomegalovirusigg1')).setAttribute('checked', 'true');
        }
        if (this.progesterone == 'true') {
          (<HTMLInputElement>document.getElementById('progesterone1')).setAttribute('checked', 'true');
        }
        if (this.antitg == 'true') {
          (<HTMLInputElement>document.getElementById('antitg1')).setAttribute('checked', 'true');
        }
        if (this.vitd == 'true') {
          (<HTMLInputElement>document.getElementById('vitd1')).setAttribute('checked', 'true');
        }
        setTimeout(() => {
          this.printpage();
        }, 1000)

      } else {
      }
    }, err => {
      console.log(err)
    })
  }

  myFunction() {
    window.print();
  }

  printpage() {
    console.log(this.name)
    var divToPrint = document.getElementById('DivIdToPrint');
    // divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 1000);
  }
}