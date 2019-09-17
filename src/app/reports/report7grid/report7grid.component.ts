import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-report7grid',
  templateUrl: './report7grid.component.html',
  styleUrls: ['./report7grid.component.css']
})
export class Report7gridComponent implements OnInit {
  showdata: boolean;
  nodata: boolean;
  table: any;
  dataTable: any;
  isPageloaderVisible:boolean;
  field1:any;
  field2:any;
  field3:any;
  field4:any;
  field5:any;
  field6:any;
  field7:any;
  field8:any;
  field9:any;
  transdate: any;
  showpagenation: boolean;
  userid: any;

  constructor(private http: Http,
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
    let serviceUrl = this.cmn.commonUrl+"Account/Getuser";
    let params = {
        "text":"Get_printgrid_data_eng",
        "id":"110",
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

  viewurinalreport(id,text,date){
    this.router.navigate(['/report7view',id,text,date]);
  }

  edit(id,text,date){
    this.router.navigate(['/report7update',id,text,date]);
  }

  print(id,tdate) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/DocTreatment_Transactions";
    let params = { 
      "Sno":"110", 
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
        this.field1 = result.data.Table[0].LABELLABEL1;
        this.field2 = result.data.Table[0].LABELLABEL2;
        this.field3 = result.data.Table[0].LABELLABEL3;
        this.field4 = result.data.Table[0].LABELLABEL4;
        this.field5 = result.data.Table[0].LABELLABEL5;
        this.field6 = result.data.Table[0].LABELLABEL6;
        this.field7 = result.data.Table[0].LABELLABEL7;
        this.field8 = result.data.Table[0].LABELLABEL8;
        this.field9 = result.data.Table[0].LABELLABEL9;
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
