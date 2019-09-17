import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
class Person {
  patient_id: string;
  name: string;
  dob1: string;
  Gender: string;
  MobileNo: string;
  Email: string;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {
  patient: any
  userid: any = "";
  table1 = [];
  table = []
  patientid: any = ""
  showdata: boolean = false;
  showLoader: boolean = true;
  isPageloaderVisible: boolean = false;
  nodata: boolean = false;
  dataTable: any;
  dtElement: DataTableDirective; 
  persons: Person[];
  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router,
    private https: HttpClient
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
    document.title = "Patient Details"
    this.userid = window.localStorage.getItem("userId")
    this.patientid = localStorage.getItem('patientId');
    this.showdata = false;   
    this.showdata = true;
    this.nodata = false;
    this.chRef.detectChanges();
    $('#dataTable_wrapper').show();
    const table1: any = $('#dataTable');
    this.showLoader = false;
    this.dataTable = table1.DataTable({
      paging: true,
      destroy: true,
      serverSide: true,
      lengthChange: true,
      pageLength: 25,
      lengthMenu: [25, 50, 100, 500, 1000],
      pagingType: "full_numbers", 
      searching: true,
      searchable: true,
      ordering: false,
      deferRender:true,    
      responsive:true, 
      
      dom: 'lfrtip',
      processing: true,
      "language": {
        "emptyTable": "No data available in table",
        "processing": "Loading Please Wait........",
        "zeroRecords": "No records to display"
      }, 
      ajax: (dataTablesParameters: any,callback) => {
        //this.isPageloaderVisible = true;
        var accessToken = window.localStorage.Tokenval;             
      var body = { clinicid: this.userid, loginid: this.userid};                
        this.https
          .post<DataTablesResponse>(
            this.cmn.commonUrl+'/Account/Patient_operations_serverside',
          Object.assign(dataTablesParameters, body)                                 
            , {
              headers: new HttpHeaders().set('Authorization',accessToken)
            }
          ).subscribe(resp => {
            //this.isPageloaderVisible = false;
            this.table = resp.data;
            this.persons = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'patient_id' }, { data: 'name' }, { data: 'dob1' }, { data: 'Gender' }, { data: 'MobileNo' }, { data: 'Email' }],     
    });
  } 
  goToViewPatient(val) {  
    let referal = val
    this.router.navigate(['viewpatient'], { queryParams: { referal } });
  }
}