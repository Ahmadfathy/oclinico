import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.css']
})
export class WardsComponent implements OnInit {
  public dataTable:any =[];

  public patientdata:any=[
    {"bed":"1/1","department":"ENT","patientid":"12345","Name":"Rohan","Date":"02/04/2019","availability":"Non Vacant"},
    {"bed":"1/2","department":"ENT","patientid":"56789","Name":"Tchala","Date":"06/03/2019","availability":"Non Vacant"},
    {"bed":"1/3","department":"ENT","patientid":"65437","Name":"Nakia","Date":"12/04/2019","availability":"Non Vacant"},
    {"bed":"1/4","department":"ENT","patientid":"19876","Name":"Thonas","Date":"25/01/2019","availability":"Non Vacant"},
    {"bed":"1/5","department":"ENT","patientid":"19078","Name":"Thor","Date":"18/03/2019","availability":"Vacant"}
  ]


  constructor( private chRef : ChangeDetectorRef) { }

  ngOnInit() {
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable();
  }

}
