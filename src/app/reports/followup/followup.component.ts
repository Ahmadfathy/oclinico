import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {

  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public followupdetails = [];
  public showpagenation: boolean = false;
  field1:any;
  field2:any;
  field3:any;
  field4:any;
  field5:any;
  field6:any;
  field7:any;
  field8:any;
  field9:any;
  field10:any;
  field11:any;
  field12:any;
  field13:any;
  field14:any;
  field15:any;
  field16:any;
  field17:any;
  field18:any;
  field19:any;
  field20:any;
  field21:any;
  field22:any;
  field23:any;
  field24:any;
  field25:any;
  field26:any;
  field27:any;
  field28:any;
  field29:any;
  field30:any;
  field31:any;
  field32:any;
  userid: any;

  constructor(public http: Http,
    private router: Router,
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
      "text":"Get_printgrid_data_eng",
      "id":"112",
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
        this.followupdetails = result.data.Table;
        console.log(JSON.stringify(this.followupdetails));
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
    this.router.navigate(['/viewfollowup']);
  }

  getprintdata(id,tdate) {

    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "112",
      "Practitioner_Id": id,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": tdate,
      "Operation": "getprintsindividualdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
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

        this.field1 = result.data.Table[0].LABELLABEL1,
        this.field2 = parseInt(result.data.Table[0].LABELLABEL2.split('/')[0]),
        this.field3 = parseInt(result.data.Table[0].LABELLABEL2.split('/')[1]),
        this.field4 = parseInt(result.data.Table[0].LABELLABEL2.split('/')[2]),
        this.field5 = result.data.Table[0].LABELLABEL3,
        this.field6 = result.data.Table[0].LABELLABEL4,
        this.field7 = result.data.Table[0].LABELLABEL5,
        this.field8 = result.data.Table[0].LABELLABEL6,
        this.field9 = parseInt(result.data.Table[0].LABELLABEL7.split('/')[0]),
        this.field10 = parseInt(result.data.Table[0].LABELLABEL7.split('/')[1]),
        this.field11 = parseInt(result.data.Table[0].LABELLABEL7.split('/')[2]),
        this.field12 = result.data.Table[0].LABELLABEL8,
        this.field13 = parseInt(result.data.Table[0].LABELLABEL9.split('/')[0]),
        this.field14 = parseInt(result.data.Table[0].LABELLABEL9.split('/')[1]),
        this.field15 = parseInt(result.data.Table[0].LABELLABEL9.split('/')[2]),
        this.field16 = result.data.Table[0].LABELLABEL10,
        this.field17 = parseInt(result.data.Table[0].LABELLABEL11.split('/')[0]),
        this.field18 = parseInt(result.data.Table[0].LABELLABEL11.split('/')[1]),
        this.field19 = parseInt(result.data.Table[0].LABELLABEL11.split('/')[2]),
        this.field20 = result.data.Table[0].LABELLABEL12,
        this.field21 = result.data.Table[0].LABELLABEL13,
        this.field22 = result.data.Table[0].LABELLABEL14,
        this.field23 = parseInt(result.data.Table[0].LABELLABEL15.split('/')[0]),
        this.field24 = parseInt(result.data.Table[0].LABELLABEL15.split('/')[1]),
        this.field25 = parseInt(result.data.Table[0].LABELLABEL15.split('/')[2]),
        this.field26 = result.data.Table[0].LABELLABEL16,
        this.field27 = result.data.Table[0].LABELLABEL17,
        this.field28 = result.data.Table[0].LABELLABEL18,
        this.field29 = result.data.Table[0].LABELLABEL19,
        this.field30 = result.data.Table[0].LABELLABEL20,
        this.field31 = result.data.Table[0].LABELLABEL21
            setTimeout(() => {
          this.printpage();
        }, 3000)

      } else {

      }
    }, err => {
      console.log(err)
    })

  }

  printpage() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print3.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }
}
