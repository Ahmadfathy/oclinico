import { Component, OnInit } from '@angular/core';
// import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { store } from '@angular/core/src/render3';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';

import { Router } from '@angular/router';

import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { timeHours } from 'd3';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  table = [];
  names: any;
  names1: any;
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
  validationType:any;
  Name: string;



  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private meta: Meta,

    private cmn: UserinfoService,
    private router: Router) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      genericname: ['', Validators.required],
      Routeofadministration: ['', Validators.required],
      shelflife: ['', Validators.required],
      Countryofmanufacture: ['', Validators.required],
      Mah: ['', Validators.required],
      Unitofstrength: ['', Validators.required],
      Legalstatus: ['', Validators.required],
      Storageconditions: ['', Validators.required],
      Marketingcompany: ['', Validators.required],
      Authorizationstatus: ['', Validators.required],
      Dosageform: ['', Validators.required],
      productcontrol: ['', Validators.required],
      Manucfacturename: ['', Validators.required],
      Nationality: ['', Validators.required],
      Marketingstatus: ['', Validators.required],


    });
    this.unitstrength();
    this.dosageform();
    this.productcontrol();
    this.manufacturename();
    this.nationality();
    this.markitingstatus();
    this.routeofadmin();
    this.countryofmanufacture();
    this.mah();
    this.legalstatus();
    this.storagecondition();
    this.markitingcompany();
    this.authorazationstatus();

  }
  get s() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    console.log(this.productForm.value)
  }
  insertdata() {
    if (this.productForm.status == "INVALID") {
      return
    }

    var accessToken = window.localStorage.Tokenval;


    let url = 'http://iumcpharma.oclinico.com/api/product-master/add-new-product';


    let body = {
      // 'GenericName':"test3",
      // 'UnitOfStrengthID':"1",
      // 'DosageFormID':"2",
      // 'RouteOfAdministrationID':"3",
      // 'LegalStatusID':"4", 
      // 'ProductControlID':"5",
      // 'ShelfLife':"6",
      // 'StorageConditionsID':"7",
      // 'ManufactureID':"8",
      // 'CountryOfManufacturerID':"9",
      // 'MarketingCompanyID':"10",
      // 'NationalityID':"11",
      // 'AgentID':"12", 
      // 'AuthorizationStatusID':"13",
      // 'MarketingStatusID':"14",     


      'GenericName': this.productForm.value.genericname,
      'UnitOfStrengthID': this.productForm.value.Unitofstrength,
      'DosageFormID': this.productForm.value.Dosageform,
      'RouteOfAdministrationID': this.productForm.value.Routeofadministration,
      'LegalStatusID': this.productForm.value.Legalstatus,
      'ProductControlID': this.productForm.value.productcontrol,
      'ShelfLife': "1",
      'StorageConditionsID': this.productForm.value.Storageconditions,
      'ManufactureID': this.productForm.value.Manucfacturename,
      'CountryOfManufacturerID': this.productForm.value.Countryofmanufacture,
      'MarketingCompanyID': this.productForm.value.Marketingcompany,
      'NationalityID': this.productForm.value.Nationality,
      'AgentID': this.productForm.value.Mah,
      'AuthorizationStatusID': this.productForm.value.Authorizationstatus,
      'MarketingStatusID': this.productForm.value.Marketingstatus,

    }
    console.log(body)


    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)


      //  this.isPageloaderVisible = false;
      console.log(res.Result);
      if (res.Result == true) {
        alert('Successfully Inserted')
        this.productForm.reset();
        this.submitted=false;
        this.getdata();
        console.log("success");
     
      } else {

      }
    })

    err => {
      console.log("Token Error:" + err);
    }
  }

  //   getdata() {

  //     //service call
  // console.log("test");


  //   }

  getdata() {

    console.log("test");
    var accessToken = window.localStorage.Tokenval;

    let url = 'http://iumcpharma.oclinico.com/api/product-master/get-all-product/';
    let body = {

    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)

      console.log(res.Result);
      if (res.Result == true) {
        console.log("success")
          ; this.table = res.data;
        console.log(this.table);

      } else {

      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }



  delete(id) {
    var result = confirm("Are you sure you want to delete");
    if (result == true) {

      //var accessToken = window.localStorage.Tokenval;    
      let url = "https://api.oclinico.com/PharmacyAPI/api/product-master/delete-product/"

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url + id, options).map(res => res.json()).subscribe((res) => {
        console.log(res)

        if (res.Result == true) {
          alert('Successfully Delete')
          console.log("success");
          this.getdata();
        } else {
        }
      }
        , (err) => {
          console.log("Token Error:" + err);
        });
    }
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

  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  public addValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).setValidators(this.validationType[key]);
      form.get(key).updateValueAndValidity();
    }
  }












}



