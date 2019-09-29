import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestProductListServices } from './requestproductlist.service';

@Component({
  selector: 'app-requestproductlist',
  templateUrl: './requestproductlist.component.html',
  styleUrls: ['./requestproductlist.component.css']
})
export class RequestProductListComponent implements OnInit {
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
    private router: Router, private Services: RequestProductListServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    // For Lang
    this.cmn.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "us";
      }
      else {

        this.langulagetype = this.languageoption;
      }
    })

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
    this.Services.getData(res => {
      console.log("success")
      this.table = res.StoreRequest;
      sessionStorage.setItem('masterid', res.StoreRequest[0].ID)
      console.log(this.table);
    });
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



