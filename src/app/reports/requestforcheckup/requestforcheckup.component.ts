import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-requestforcheckup',
  templateUrl: './requestforcheckup.component.html',
  styleUrls: ['./requestforcheckup.component.css']
})
export class RequestforcheckupComponent implements OnInit {
  p1: any;
  p2: any;
  p3: any;
  p4: any;
  // p5: any;
  p6: any;
  p7: any;
  p8: any;
  p9: any;
  p10: any;
  p11: any;
  p12: any = "14";
  p13: any;
  p14: any;
  checkval;
  checkval2;
  checkval3;
  checkval4;
  checkval5;
  dateval: any;
  genderstatus1: any;
  checkedval: any = "false";
  lablenames: any;
  values: any;
  table: any = [];
  dataTable: any;
  showdata: boolean = false;
  nodata: boolean = false;
  userid:any;

  public isPageloaderVisible = false;
  constructor(
    private meta: Meta,
    private router: Router,
    public commonService: UserinfoService,
    private chRef: ChangeDetectorRef,
    public http: Http,
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    this.userid = window.localStorage.getItem("userId");
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/Getuser";
    let params = {
      "text": "Get_printgrid_data_eng",
      "id": "113",
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


  viewreport(id, text,tdate) {
    this.router.navigate(['/viewrequestreport', id, text,tdate]);
  }
  editreport(id, text,tdate) {
    this.router.navigate(['/editrequestreport', id, text,tdate]);
  }

  print(id,tdate) {

    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "113",
      "Practitioner_Id": id,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": tdate,
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

        this.p1  = result.data.Table[0].LABELLABEL1;
        this.p2  = result.data.Table[0].LABELLABEL2;
        this.p3  = result.data.Table[0].LABELLABEL3;
        this.p4  = result.data.Table[0].LABELLABEL4;
        // this.p5  = result.data.Table[0].LABELLABEL5;
        this.p6  = result.data.Table[0].LABELLABEL6;
        this.p7  = result.data.Table[0].LABELLABEL7;
        if(result.data.Table[0].LABELLABEL7 != '' || result.data.Table[0].LABELLABEL7 != null){
          (<HTMLInputElement>document.getElementById('checkup11')).setAttribute('checked','true');
        }else{
          (<HTMLInputElement>document.getElementById('checkup11')).removeAttribute('checked');        
        }
        this.p8  = result.data.Table[0].LABELLABEL8;
        if(result.data.Table[0].LABELLABEL8 != '' || result.data.Table[0].LABELLABEL8 != null){
          (<HTMLInputElement>document.getElementById('checkup12')).setAttribute('checked','true');
        }else{
          (<HTMLInputElement>document.getElementById('checkup12')).removeAttribute('checked');        
        }
        this.p9  = result.data.Table[0].LABELLABEL9;
        if(result.data.Table[0].LABELLABEL9 != '' || result.data.Table[0].LABELLABEL9 != null){
          (<HTMLInputElement>document.getElementById('checkup13')).setAttribute('checked','true');
        }else{
          (<HTMLInputElement>document.getElementById('checkup13')).removeAttribute('checked');        
        }
        console.log(result.data.Table[0].LABELLABEL10.split('/'))
        if(result.data.Table[0].LABELLABEL10 != '' || result.data.Table[0].LABELLABEL10 != null){
          (<HTMLInputElement>document.getElementById('checkup14')).setAttribute('checked','true');
        }else{
          (<HTMLInputElement>document.getElementById('checkup14')).removeAttribute('checked');        
        }
        this.p10  = result.data.Table[0].LABELLABEL10.split('/')[1];
        this.p11  = result.data.Table[0].LABELLABEL10.split('/')[2];
        this.p13  = result.data.Table[0].LABELLABEL12;
        this.p14  = result.data.Table[0].LABELLABEL10.split('/')[0];
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
