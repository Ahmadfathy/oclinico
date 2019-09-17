import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-urinalreport',
  templateUrl: './urinalreport.component.html',
  styleUrls: ['./urinalreport.component.css']
})
export class UrinalreportComponent implements OnInit {

  name: any;
  male: any;
  famale: any;
  gender: any;
  genderstatus: boolean;
  genderstatus1: boolean;
  gender1: string;
  RChecked:any;
  UChecked:any;
  PChecked:any;
  filenumber:any;
  date:any;
  age:any;
  Nationality:any;
  clinicalcomments:any;
  requestedby:any;
  stampsignature:any;
  yellow:any;
  darky:any;
  paley:any;
  bloody:any;
  reddish:any;
  bownish:any;
  clear:any;
  turbid:any;
  sqgr:any;
  glucose:any;
  protien:any;
  ketone:any;
  bilirubin:any;
  urobilinogen:any;
  ph:any;
  other:any;
  pus1:any;
  pus2:any;
  crystals1:any;
  crystals2:any;
  rbc1:any;
  rbc2:any;
  amorphous1:any;
  amorphous2:any;
  epithcells1:any;
  epithcells2:any;
  otherME:any;
  empty:any;
  remarks:any;
  checkedby:any;
  finastampsignature:any;
  routinevalue: string;
  sqgrvalue: string;
  turbidvalue: string;
  clearvalue: string;
  bownishvalue: string;
  reddishvalue: string;
  bloodyvalue: string;
  paleyvalue: string;
  darkyvalue: string;
  yellowvalue: string;
  preoperative: string;
  urgentvalue: string;
  table:any=[];
  dataTable: any;
  showdata:boolean=false;
  nodata:boolean=false;
  userid:any;

  constructor(  private http: Http,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    private router: Router) { 
      this.userid = window.localStorage.getItem("userId");
    }

  ngOnInit() {

    this.getdata();
  }

  viewurinalreport(id,text,date){
    this.router.navigate(['/viewurinalreport',id,text,date]);
  }
  editurinalreport(id,text,date){
    this.router.navigate(['/editurinalreport',id,text,date]);
  }
  getdata(){
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Getuser";
    let params = { 
      "text":"Get_printgrid_data",
      "id":"101",
      "param1":"",
      "param2":""
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
      if(result.status_cd == '1'){
        this.showdata = true;
        this.nodata = true;
        this.table = result.data.Table;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table: any = $('#dataTable');
        this.dataTable = table.DataTable();
      }else{
        this.showdata = false;
        this.nodata = false;
        $('#dataTable_wrapper').hide();
      }
    }, err => {
      console.log(err)
    })
  }

  // --------------------------------print -----------------------------------------------

  print(id,tdate) {

    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = { 
      "Sno":"101", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date":tdate, 
      "Operation":"getprintsindividualdata", 
      "clinicid":this.userid, 
      "Branchid":"", "Last_Updated":""
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
      if(result.status_cd == '1'){
        console.log("print.. ")
        this.name = result.data.Table[0].LABELLABEL1;
        this.filenumber = result.data.Table[0].LABELLABEL2;
        this.date = result.data.Table[0].LABELLABEL3;
        this.Nationality = result.data.Table[0].LABELLABEL4;
        this.gender = result.data.Table[0].LABELLABEL5;
        (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
    (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');
        if(this.gender.toLowerCase() == 'male'){
          (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
        }else{
          (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
        }
        
        this.routinevalue = result.data.Table[0].LABELLABEL6;
        if(this.routinevalue == 'Routine'){
          (<HTMLInputElement>document.getElementById('BRoutine')).setAttribute('checked', 'true');
        }
        this.urgentvalue = result.data.Table[0].LABELLABEL7;
        if(this.urgentvalue == 'Urgent'){
        (<HTMLInputElement>document.getElementById('BUrgent')).setAttribute('checked', 'true');
        }
        this.preoperative = result.data.Table[0].LABELLABEL8;
        if(this.preoperative == 'Pre-operative'){
        (<HTMLInputElement>document.getElementById('BPre-operative')).setAttribute('checked','true');
        }
        this.clinicalcomments = result.data.Table[0].LABELLABEL9;
        this.stampsignature = result.data.Table[0].LABELLABEL10;
        this.sqgrvalue = result.data.Table[0].LABELLABEL12;
        if(this.sqgrvalue != ''){
        (<HTMLInputElement>document.getElementById('BSq.Gr')).setAttribute('checked','true');
        }
        this.glucose = result.data.Table[0].LABELLABEL14;
        this.protien = result.data.Table[0].LABELLABEL15;
        this.ketone = result.data.Table[0].LABELLABEL16;
        this.bilirubin = result.data.Table[0].LABELLABEL17;
        this.urobilinogen = result.data.Table[0].LABELLABEL18;
        this.other = result.data.Table[0].LABELLABEL19;
        this.pus1 = result.data.Table[0].LABELLABEL21;
        this.crystals1 = result.data.Table[0].LABELLABEL22;
        this.rbc1 = result.data.Table[0].LABELLABEL23;
        this.amorphous1 = result.data.Table[0].LABELLABEL24;
        this.epithcells1 = result.data.Table[0].LABELLABEL25;
        this.otherME = result.data.Table[0].LABELLABEL26;
        this.remarks = result.data.Table[0].LABELLABEL27;
        this.checkedby = result.data.Table[0].LABELLABEL28;
        this.finastampsignature = result.data.Table[0].LABELLABEL29;
        this.age = result.data.Table[0].LABELLABEL30;
        this.yellowvalue = result.data.Table[0].LABELLABEL31;
        if(this.yellowvalue == 'Yellow'){
        (<HTMLInputElement>document.getElementById('BYellow')).setAttribute('checked', 'true');
        }
        this.darkyvalue = result.data.Table[0].LABELLABEL32;
        if(this.darkyvalue == 'DarkY'){
        (<HTMLInputElement>document.getElementById('BDarkY')).setAttribute('checked', 'true');
        }
        this.paleyvalue = result.data.Table[0].LABELLABEL33;
        if(this.paleyvalue == 'PaleY'){
        (<HTMLInputElement>document.getElementById('BPaleY')).setAttribute('checked','true');
        }
        this.bloodyvalue = result.data.Table[0].LABELLABEL34;
        if(this.bloodyvalue == 'Bloody'){
        (<HTMLInputElement>document.getElementById('BBloody')).setAttribute('checked', 'true');
        }
        this.reddishvalue = result.data.Table[0].LABELLABEL35;
        if(this.reddishvalue == 'Reddish'){
        (<HTMLInputElement>document.getElementById('BReddish')).setAttribute('checked', 'true');
        }
        this.bownishvalue = result.data.Table[0].LABELLABEL36;
        if(this.bownishvalue == 'Bownish'){
        (<HTMLInputElement>document.getElementById('BBownish')).setAttribute('checked','true');
        }
        this.clearvalue = result.data.Table[0].LABELLABEL37;
        if(this.clearvalue == 'Clear'){
        (<HTMLInputElement>document.getElementById('BClear')).setAttribute('checked', 'true');
        }
        this.turbidvalue = result.data.Table[0].LABELLABEL38;
        if(this.turbidvalue == 'Turbid'){
        (<HTMLInputElement>document.getElementById('BTurbid')).setAttribute('checked', 'true');
        }
        this.pus2 = result.data.Table[0].LABELLABEL39;
        this.crystals2 = result.data.Table[0].LABELLABEL40;
        this.rbc2 = result.data.Table[0].LABELLABEL41;
        this.amorphous2 = result.data.Table[0].LABELLABEL42;
        this.epithcells2 = result.data.Table[0].LABELLABEL43;
        this.requestedby = result.data.Table[0].LABELLABEL44;
        this.ph = result.data.Table[0].LABELLABEL45;
        setTimeout(() => {
          this.printpage();
        },3000)
      
      }else{
       
      }
    }, err => {
      console.log(err)
    })


  }

  myFunction() {
    window.print();
  }

  printpage(){
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
  // --------------------------------------print----------------------------------------------


}
