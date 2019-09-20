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

@Component({
  selector: 'app-productsgrid',
  templateUrl: './productsgrid.component.html',
  styleUrls: ['./productsgrid.component.css']
})
export class ProductsgridComponent implements OnInit {
  productsviewForm: FormGroup;
  submitted = false;
  table = [];
  result: any;
  id: any;
  routerid: any;

  constructor(
    private http: Http,
    private meta: Meta,
    private chRef: ChangeDetectorRef,
    private cmn: UserinfoService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    let url = document.URL;
    this.id = url.split('=')[1];
    this.getdata();

    this.productsviewForm = this.formBuilder.group({
      genericname: ['']
    });
  }

  getdata() {
    let url = 'http://iumcpharma.oclinico.com/api/product-master/get-product-by-id/'
    let body = {};

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",

    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url + this.id, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      console.log(res.Result)
      if (res.Result == true) {



        this.productsviewForm.patchValue(
          {
            genericname: res.data.GenericName
          })

        console.log("success");

      }
      else {
      }
    }
      , err => {
        console.log("Token Error:" + err);
      });
  }

  updatedata() {
    if (this.productsviewForm.status == "INVALID") {
      return
    }

    var accessToken = window.localStorage.Tokenval;

    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-master/update-product';

    let body = {
      'ID': this.id,
      'genericname': this.productsviewForm.value.genericname
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
        this.productsviewForm.reset();
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

}

