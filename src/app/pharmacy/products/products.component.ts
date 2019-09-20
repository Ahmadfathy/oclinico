import { ProductServices } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

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
  validationType: any;
  Name: string;
  suggestedTexts: any[] = [];
  ShowAuto: boolean = false;
  public langulagetype: any = 'us';
  languageoption: string;
  GenericName: any[] = [];



  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private meta: Meta,
    private cmn: UserinfoService,
    private router: Router, private Services: ProductServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      genericname: ['', Validators.required]
    });

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


    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-master/add-new-product';


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
      'StorageConditionsID': "5",//this.productForm.value.Storageconditions,
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
        this.submitted = false;
        this.getdata();
        console.log("success");

      } else {

      }
    })

    err => {
      console.log("Token Error:" + err);
    }
  }

  getdata() {

    console.log("test");
    var accessToken = window.localStorage.Tokenval;

    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-master/get-all-product/';
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
        this.table = res.data;
        sessionStorage.setItem('masterid', res.data[0].ID)
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



  public extractSuggestedTexts() {
    debugger;
    let val = this.s.genericname.value;
    this.GenericName = [];
    this.suggestedTexts = [];
    this.Services.getGeneric(val, res => {
      this.GenericName = res.GenericName;
      if (this.s.genericname.value !== "") {
        this.suggestedTexts = this.GenericName.filter(e => e.GenericName.toLowerCase().indexOf(this.s.genericname.value.toLowerCase()) > -1);
        this.ShowAuto = true;
      }
      else {
        this.suggestedTexts = [];
        this.ShowAuto = false;
      }
    })
  }

  SelectItem(data: any) {
    this.ShowAuto = false;
    this.suggestedTexts = [];
    this.productForm.get('genericname').setValue(data.GenericName);
  }












}



