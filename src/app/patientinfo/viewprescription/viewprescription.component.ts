import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewprescription',
  templateUrl: './viewprescription.component.html',
  styleUrls: ['./viewprescription.component.css']
})
export class ViewprescriptionComponent implements OnInit {
  @ViewChild('CreateContact') Ccontact: TemplateRef<any>;
  userid: any = "";
  table = [];
  showdata: boolean = false;
  showLoader: boolean = true;
  nodata: boolean;
  dataTable: any;
  PrescriptionID: any;
  Trans_date: any
  Name: any;
  phoneno: any;
  Medicine: any;
  Dosage: any;
  NoOfDays: any;
  Notes: any;
  refill: any;
  patient: any
  public showpagenation: boolean = false;
  patientid: any;
  patientidnew: any;
  sno: any;
  website: any;
  email: any;
  Address: any;
  Doctor: any;
  city: any;
  Ara_Address: any;
  Ara_City: any;
  note: any;
  ifPharmasist: any;
  patient_name: any;
  prescriptionid: any;
  appointid: any;
  dob: any;
  age: number;
  tabledata: any = [];
  frompage: any;
  public isPageloaderVisible = true;
  slno: any = "";
  action: any;
  newArray: any = [];
  alldata:any=[];
  check:any =[];
  
  constructor(private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private modalService: NgbModal,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.ifPharmasist = window.localStorage.getItem("RoleID");
    this.patient = localStorage.getItem('patient')
    document.title = "View Prescription"
    this.userid = window.localStorage.getItem("userId")
    this.patientid = localStorage.getItem('patientId')
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    // var sno = url1[1].split('&')[0];
    // this.sno = sno.split('=')[1];
    var aptid = url1[1].split('&')[0];
    this.appointid = aptid.split('=')[1];
    var prescid = url1[1].split('&')[1];
    this.prescriptionid = prescid.split('=')[1];
    var pagename = url1[1].split('&')[2];
    this.frompage = pagename.split('=')[1];
    // console.log(this.sno)
    console.log(this.prescriptionid);
    console.log(this.appointid)
    console.log(this.frompage)
    this.getdata();
    this.gettabledata();
    this.showdata = false;
    this.showpagenation = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Prescription_Details"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": "",
      "PrescriptionID": "",
      "PatientID": "",
      "AppointmentID": "",
      "Medicine": "",
      "Dosage": "",
      "NoOfDays": "",
      "Refill": "",
      "Notes": "",
      "Status": "",
      "LoginID": this.userid,
      "mnotes": "",
      "Last_update": "",
      "Condition": "GetDataInvoice",
      "par1": "",
      "refillproduct": ""

    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "0") {
        $('#dataTable_wrapper').hide();
      }
      else {
        this.table = result.data.Table2;
        this.PrescriptionID = result.data.Table[0].PatientID;
        this.Trans_date = result.data.Table[0].dt;
        this.Name = result.data.Table[0].PatientName;
        this.phoneno = result.data.Table1[0].phoneno;
        this.dob = result.data.Table[0].DOB;
        console.log(this.table)
        var dd = this.dob.split('/')[0];
        var mm = this.dob.split('/')[1];
        var yy = this.dob.split('/')[2];
        var dob = yy + dd + mm;
        var year = Number(dob.substr(0, 4));
        var month = Number(dob.substr(4, 2)) - 1;
        var day = Number(dob.substr(6, 2));
        var today = new Date();
        this.age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
          this.age--;
        }
        this.refill = result.data.Table[0].Refill;
        this.website = result.data.Table1[0].Website;
        this.phoneno = result.data.Table1[0].phoneno;
        this.email = result.data.Table1[0].Email;
        this.Address = result.data.Table1[0].Address;
        this.Doctor = result.data.Table[0].Doctor;
        this.city = result.data.Table1[0].city;
        this.Ara_Address = result.data.Table1[0].Ara_Address;
        this.Ara_City = result.data.Table1[0].Ara_City;
        this.note = result.data.Table[0].Notes;
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

  /////////////////////////////////////// getting table data //////////////////////////////////
  gettabledata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Prescription_Details"
    let body = {
      "Sno": "",
      "Clinicid": this.userid,
      "BranchID": "",
      "PrescriptionID": "",
      "PatientID": this.prescriptionid,
      "AppointmentID": this.appointid,
      "Medicine": "",
      "Dosage": "",
      "NoOfDays": "",
      "Refill": "",
      "Notes": "",
      "Status": "",
      "LoginID": "",
      "mnotes": "",
      "Last_update": "",
      "Condition": "Getprescreptiondata",
      "par1": "",
      "refillproduct": ""

    }
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "0") {
        $('#dataTable_wrapper').hide();
      }
      else {
        this.tabledata = result.data.Table;
        for(var i=0;i<this.tabledata.length;i++){
          this.check.push(this.tabledata[i].CHECKSTATUS);
          if(this.tabledata[i].CHECKSTATUS == 'True'){
            this.newArray.push(this.tabledata[i].Sno)
          }else{
            this.newArray.push('');
          }
        }
        // this.getcheckeditems(this.alldata);
         window.sessionStorage.setItem("action", result.data.Table[0].Action);
      }
    })
  }

 

  checkboxchange(id) {
    
    if(this.check[id] == true || this.check[id] == "True"){
      this.newArray[id]=(this.tabledata[id].Sno)
    } else{
      this.newArray[id]='';
    }
    console.log(this.newArray)
  }

  submit() {
    this.slno = this.newArray.filter(function(el) {
      return el != ''
    })
    console.log(this.slno.toString());
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/Products_transactions";
    let params = {
      "Sno": this.slno.toString(),
      "Clinicid": this.userid,
      "Branchid": "",
      "Category": "",
      "Item_code": "",
      "Name": "",
      "Serial_number": "",
      "Supplier": "",
      "Cost_price": "",
      "Stock_level": "",
      "Notes": "",
      "Tax_includes": "",
      "Loginid": "",
      "Trans_date": "",
      "Last_updated": "",
      "var1": "",
      "var2": "",
      "condition": "UpdatePatientStatus"
    }

    console.log(params);

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      this.isPageloaderVisible = false;
      if (result.status_cd === "1") {
        alert("Prescription Details Updated Successfully");
        this.router.navigate(['/patientsummery']);
        this.gettabledata();
      } else {
        console.log(result.error_msg);
        alert("Please try again.")
      }
    },
      error => {
        console.log(error);
      }
    );
  }
}









