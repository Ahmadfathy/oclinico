import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';

import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { id } from '@swimlane/ngx-charts/release/utils';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-productsgrid',
  templateUrl: './productsgrid.component.html',
  styleUrls: ['./productsgrid.component.css']
})
export class ProductsgridComponent implements OnInit {
  productsviewForm:FormGroup;
  submitted= false;
  table=[];
  result : any;
  id:any;
  routerid: any;
  name: any;
  names: any;
  name2: any;
  name3: any;
  name4: any;
  name5: any;
  name6: any;
  name7: any;
  name8: any;
  name9: any;
  name10: any;
  name11: any;
  name12: any;
  names1: any;

  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router,
    private formBuilder:FormBuilder

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit()
   {

    let url =document.URL;
    this.id=url.split('=')[1];
    this.getdata();

    this.productsviewForm=this.formBuilder.group({
      genericname:[''],
      Routeofadministration:[''],
      shelflife:[''],
      Countryofmanufacture:[''],
      Mah:[''],
      Unitofstrength:[''],
      Legalstatus:[''],
      Storageconditions:[''],
      Marketingcompany:[''],
      Authorizationstatus:[''],
      Dosageform:[''],
      productcontrol:[''],
      Manucfacturename:[''],
      Nationality:[''],
      Marketingstatus:[''],


  });
  
  this.unitstrength() ,
  this.dosageform(),
  this.productcontrol(),
  this.manufacturename(),
  this.nationality() ,
  this.markitingcompany(),
  this.markitingstatus(),
  this.routeofadmin() ,
  this.countryofmanufacture(),
  this.mah(),
  this.authorazationstatus(),
  this.storagecondition(),
  this.legalstatus()

  }

  getdata() {   

 
    let url = 'http://iumcpharma.oclinico.com/api/product-master/get-product-by-id/'
    let body = {};

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
     
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url+this.id,options).map(res => res.json()).subscribe(res => {  
      console.log(res) 
      console.log(res.Result) 
      if (res.Result == true){
        
    

this.productsviewForm.patchValue(
  {
  genericname:res.data.GenericName,
  Routeofadministration:res.data.RouteOfAdministrationID,
  shelflife:res.data.ShelfLife,
  Countryofmanufacture:res.data.CountryOfManufacturerID,
  Mah:res.data.AgentID,
  Unitofstrength:res.data.UnitOfStrengthID,
  Legalstatus:res.data.LegalStatusID,
  Storageconditions:res.data.StorageConditionsID,
  Marketingcompany:res.data.MarketingCompanyID,
  Authorizationstatus:res.data.AuthorizationStatusID,
  Dosageform:res.data.DosageFormID,
  productcontrol:res.data.ProductControlID,
  Manucfacturename:res.data.ManufactureID,
  Nationality:res.data.NationalityID,
  Marketingstatus:res.data.MarketingStatusID

})

        console.log("success");   
     
      } 
      else {
      }
    }
    ,err => {
      console.log("Token Error:" + err);
    });
  }
 
  unitstrength() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = 'https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/1'
    this.http.post(url, options).map(res => res.json()).subscribe
      (res => {
        console.log(res)
        if (res.Result == true) {
          this.names = res.data;
        }
      })
  }

  dosageform() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/2"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.names1 = res.data;
      }
    })

  }

  productcontrol() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/14"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name2 = res.data;
      }
    })

  }



  manufacturename() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/manufacturer/get-all-Manufacturers/"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name3 = res.data;
      }
    })

  }
  nationality() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/11"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name4 = res.data;
      }
    })

  }

  markitingstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/10"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name5 = res.data;
      }
    })

  }

  routeofadmin() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/3"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name6 = res.data;
      }
    })

  }

  countryofmanufacture() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/9"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name7 = res.data;
      }
    })

  }
  mah() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/12"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name8 = res.data;
      }
    })

  }

  legalstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/13"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name9 = res.data;
      }
    })

  }

  storagecondition() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/7"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name10 = res.data;
      }
    })

  }

  markitingcompany() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/10"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name11 = res.data;
      }
    })

  }


  authorazationstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/15"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name12 = res.data;
      }
    })

  }










  
  }

