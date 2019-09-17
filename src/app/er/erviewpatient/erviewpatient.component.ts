import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-erviewpatient',
  templateUrl: './erviewpatient.component.html',
  styleUrls: ['./erviewpatient.component.css']
})
export class ErviewpatientComponent implements OnInit {
  pharmacyfg : FormGroup;
  userid: string;
  
  constructor(private http: Http, private cmn: UserinfoService, public router: Router,
    private route: ActivatedRoute,
    private chRef: ChangeDetectorRef,
    public fb: FormBuilder) { }

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

