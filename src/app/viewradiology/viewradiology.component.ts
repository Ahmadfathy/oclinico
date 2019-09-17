import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-viewradiology',
  templateUrl: './viewradiology.component.html',
  styleUrls: ['./viewradiology.component.css']
})
export class ViewradiologyComponent implements OnInit {
    pharmacyfg : FormGroup;
    userid: string;
    
    constructor(private router: Router,
              public cmn:UserinfoService,
              public http: Http,
              private fb: FormBuilder) { }
  
    ngOnInit() {

      document.title = "View Radiology";
      this.userid =  window.localStorage.getItem("userId");
      this.pharmacyfg = this.fb.group({
  
        regval:[],
        genname:[],
        tradename:[],
        strengthval : [],
        unitstrengthval:[],
        dosage:[],
        routeadmin:[],
        atccode1:[],
        atccode2:[],
        volume:[],
        unitvolume:[],
        packagetype:[],
        packagesize:[],
        legalstatus:[],
        productcontrol:[],
        publicprice:[],
        shelflife:[],
        storageconditions:[],
        manufacturername:[],
        countryofmanufacturer:[],
        marketingcompany:[],
        nationality:[],
        mah:[],
        authorizationstatus:[],
        marketingstatus:[],
        remarks:[],
      })
  
  
      this.pharmacyfg.patchValue({
        regval : "000100",
        genname:"Rahul Kumar",
        tradename : "Male",
        strengthval:"12/08/2000",
        unitstrengthval:"25/8/2016",
        dosage:"28/8/2016",
        routeadmin:"Right Ankle",
        atccode1:"8788885522",
        atccode2:"",
        volume:"500",
        unitvolume:"ml",
        packagetype:"Bottle",
        packagesize:"1",
        legalstatus:"Prescription",
        productcontrol:"Uncontrolled",
        publicprice:"4.65",
        shelflife:"24",
        storageconditions:"Store below 25°C",
        manufacturername:"QATAR PHARMA",
        countryofmanufacturer:"QATAR",
        marketingcompany:"QATAR PHARMA",
        nationality:"QATAR",
        mah:"Saudi Import Company - BANAJA",
        authorizationstatus:"Valid",
        marketingstatus:"Marketed",
        remarks:"",
      })
    }
  
  }