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
      'GenericName': this.productForm.value.genericname
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



