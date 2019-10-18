import { LaborataryServices } from '../laboratary.service';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubCategoryComponent implements OnInit {
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
  Labs: any[] = [];
  btnText: string = "Save";



  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private meta: Meta,
    private cmn: UserinfoService,
    private router: Router, private Services: LaborataryServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      ID: [''],
      Parent_ID: ['', Validators.required],
      NameAr: ['', Validators.required],
      NameEng: [''],
      Price: [''],
      Emp_ID: [localStorage.getItem('userId')]
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

    if (this.btnText == "Save") {
      this.productForm.get("Emp_ID").setValue(localStorage.getItem('userId'));
      this.Services.saveNewCategory(this.productForm.value, res => {
        alert('Successfully Inserted')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
      })
    }
    else{
      this.Services.updateCategory(this.productForm.value, res => {
        alert('Successfully Updated')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
        this.btnText = "Save";
      })
    }

  }

  getdata() {
    this.Services.getAllCategory(res => {
      this.table = null;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getCategoryById(id, res => {
      this.productForm.patchValue(
        {
          ID: res.data.ID,
          NameAr: res.data.NameAr,
          NameEng: res.data.NameEng,
          Price: res.data.Price
        });
        this.btnText = "Update";
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



