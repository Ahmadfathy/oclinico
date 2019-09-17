import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';


@Component({
  selector: 'app-viewpharmacydetails',
  templateUrl: './viewpharmacydetails.component.html',
  styleUrls: ['./viewpharmacydetails.component.css']
})
export class ViewpharmacydetailsComponent implements OnInit {
  pharmacyfg : FormGroup;
  userid: string;
  
  constructor(private router: Router,
            public cmn:UserinfoService,
            public http: Http,
            private fb: FormBuilder) { }

  ngOnInit() {
    
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
      regval : "48-803-12",
      genname:"SODIUM CHLORIDE",
      tradename : "0.225% W/V SODIUM CHLORIDE (1/4 NORMAL SALINE)  INTRAVENOUS INFUSION BP (500ML BOTTLE)",
      strengthval:"0.225",
      unitstrengthval:"%",
      dosage:"Solution for infusion",
      routeadmin:"Intravenous (not otherwise specified)",
      atccode1:"",
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
