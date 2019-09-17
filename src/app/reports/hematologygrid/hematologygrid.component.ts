import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';


@Component({
  selector: 'app-hematologygrid',
  templateUrl: './hematologygrid.component.html',
  styleUrls: ['./hematologygrid.component.css']
})
export class HematologygridComponent implements OnInit {
  table: any;
  showdata: boolean;
  nodata: boolean;
  isPageloaderVisible : boolean = false;
  gender:any=""
  name:any;
  filenumber:any;
  date:any;
  nationality:any
  age:any;
  CBC:any;
  Routine:any;
  Urgent:any;
  Preoperative:any;
  clinicalcoment:any;
  requestedby:any;
  stamp:any;
  ESR:any;
  HbA1c:any;
  PT:any;
  BIGrop:any;
  Malaria:any;
  PTT:any;
  BItime:any;
  CItime:any;
  Others:any;
  remarks:any;
  checkedby:any;
  stampsinature:any;
  dataTable:any
  transdate: any;
  showpagenation: boolean;
  userid: any;
  constructor( private http: Http,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
    this.getdata()
  }
  getdata(){
    this.isPageloaderVisible=true
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/Getuser";
    let params = { 
      "text":"Get_printgrid_data",
      "id":"103",
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
        this.transdate= result.data.Table[0].tran_date;
         sessionStorage.setItem('transdate',this.transdate)
        console.log(JSON.stringify(this.table));
        this.showdata = true;
        this.nodata = true;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    }, err => {
      console.log(err)
    })
  }


  print(id,date) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/DocTreatment_Transactions";
    let params = { 
      "Sno":"103", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date":date, 
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
        this.age = result.data.Table[0].LABELLABEL4;
        this.nationality = result.data.Table[0].LABELLABEL5;
        this.gender = result.data.Table[0].LABELLABEL6;
        this.Routine = result.data.Table[0].LABELLABEL7;
        this.Urgent = result.data.Table[0].LABELLABEL8;
        this.Preoperative = result.data.Table[0].LABELLABEL9;
        this.clinicalcoment=result.data.Table[0].LABELLABEL10;
        this.requestedby=result.data.Table[0].LABELLABEL11;
        this.stamp=result.data.Table[0].LABELLABEL12;
        this.CBC=result.data.Table[0].LABELLABEL13;
        this.HbA1c=result.data.Table[0].LABELLABEL14;
        this.BIGrop=result.data.Table[0].LABELLABEL15;
        this.Malaria=result.data.Table[0].LABELLABEL16;
        this.BItime=result.data.Table[0].LABELLABEL17;
        this.ESR=result.data.Table[0].LABELLABEL18;
        this.PT=result.data.Table[0].LABELLABEL19;
        this.PTT=result.data.Table[0].LABELLABEL20;
        this.CItime=result.data.Table[0].LABELLABEL21;
        this.Others=result.data.Table[0].LABELLABEL22;
        this.remarks=result.data.Table[0].LABELLABEL23;
        this.checkedby=result.data.Table[0].LABELLABEL24;
        this.stampsinature=result.data.Table[0].LABELLABEL25;

        (<HTMLInputElement>document.getElementById('CBC1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Routine1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Urgent1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Preoperative1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('ESR1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('HbA1c1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('PT1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('BIGrop1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Malaria1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('PTT1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('BItime1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('CItime1')).removeAttribute('checked');

        (<HTMLInputElement>document.getElementById('Male1')).removeAttribute('checked');
        (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');
        if (this.gender == "Female") {
        
        this.gender = 'Female';
       
        (<HTMLInputElement>document.getElementById('Famale1')).setAttribute('checked', 'true');
        
        } else {
        this.gender = 'Male';
        
        (<HTMLInputElement>document.getElementById('Male1')).setAttribute('checked', 'true');
        
        }

        if(this.CBC == 'true'){
          (<HTMLInputElement>document.getElementById('CBC1')).setAttribute('checked', 'true');
          }
            if(this.Routine=='true'){
            (<HTMLInputElement>document.getElementById('Routine1')).setAttribute('checked','true');
          }
           if(this.Urgent=='true'){
            (<HTMLInputElement>document.getElementById('Urgent1')).setAttribute('checked','true')
          }
           if(this.Preoperative=='true'){
            (<HTMLInputElement>document.getElementById('Preoperative1')).setAttribute('checked','true')
          }
           if(this.ESR=='true'){
            (<HTMLInputElement>document.getElementById('ESR1')).setAttribute('checked','true')
          }
            if(this.HbA1c=='true'){
            (<HTMLInputElement>document.getElementById('HbA1c1')).setAttribute('checked','true')
          }
           if(this.PT=='true'){
      (<HTMLInputElement>document.getElementById('PT1')).setAttribute('checked','true')
          }
           if(this.BIGrop=='true'){
      (<HTMLInputElement>document.getElementById('BIGrop1')).setAttribute('checked','teue')
          }
       if(this.Malaria=='true'){
        (<HTMLInputElement>document.getElementById('Malaria1')).setAttribute('checked','true')
      }
       if(this.PTT=='true'){
        (<HTMLInputElement>document.getElementById('PTT1')).setAttribute('checked','true')
      }
        if(this.BItime=='true'){
        (<HTMLInputElement>document.getElementById('BItime1')).setAttribute('checked','true')
      }
       if(this.CItime=='true'){
      (<HTMLInputElement>document.getElementById('CItime1')).setAttribute('checked','true')
      }
        setTimeout(() => {
          this.printpage();
        },1000)
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

  viewurinalreport(id,text,date){
    this.router.navigate(['/hematologyview',id,text,date]);
  }

  edit(id,text,date){
    this.router.navigate(['/hematologyupdate',id,text,date]);
  }
}
