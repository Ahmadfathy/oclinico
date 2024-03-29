import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { laborataryTestServices } from '../../laborataryTest.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestsComponent implements OnInit {
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
    private meta: Meta,
    private Services: laborataryTestServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();

    this.productForm = this.formBuilder.group({
      ID: [''],
      NameAr: ['', Validators.required],
      NameEng: [''],
      Category_ID: ['']
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
      this.productForm.get("ID").setValue(0);
      this.Services.saveNewTest(this.productForm.value, () => {
        alert('Successfully Inserted')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
      })
    }
    else{
      this.Services.updateTest(this.productForm.value, () => {
        alert('Successfully Updated')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
        this.btnText = "Save";
      })
    }

  }

  getdata() {
    this.Services.getAllTests(res => {
      this.table = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getTestById(id, res => {
      this.productForm.patchValue(
        {
          ID: res.data.ID,
          NameAr: res.data.NameAr,
          NameEng: res.data.NameEng,
          Category_ID: res.data.Category_ID
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



