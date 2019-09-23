import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-xray',
  templateUrl: './xrayrequest.component.html',
  styleUrls: ['./xrayrequest.component.css']
})
export class XRayRequestComponent implements OnInit {
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
    private meta: Meta) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
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

  
  getdata() {
    var accessToken = window.localStorage.Tokenval;
    let url = 'https://api.oclinico.com/PharmacyAPI/api/category-ray/get-request/';
    let body = {
    }

    let headers = new Headers({ "Content-Type": "application/json", Accept: "application/json", Authorization: accessToken });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.table = res.data;
        sessionStorage.setItem('masterid', res.data[0].ID)
      } else {

      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }
  // delete(id) {
  //   var result = confirm("Are you sure you want to delete");
  //   if (result == true) {

  //     //var accessToken = window.localStorage.Tokenval;    
  //     let url = "https://api.oclinico.com/PharmacyAPI/api/product-master/delete-product/"

  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       //Authorization: accessToken
  //     });
  //     let options = new RequestOptions({ headers: headers });

  //     this.http.post(url + id, options).map(res => res.json()).subscribe((res) => {
  //       console.log(res)

  //       if (res.Result == true) {
  //         alert('Successfully Delete')
  //         console.log("success");
  //         this.getdata();
  //       } else {
  //       }
  //     }
  //       , (err) => {
  //         console.log("Token Error:" + err);
  //       });
  //   }
  // }

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



