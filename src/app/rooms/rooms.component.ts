import { RoomsServices } from './rooms.service'
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
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
    private Services: RoomsServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getdata();


    this.productForm = this.formBuilder.group({
      ID: [''],
      NameAr: ['', Validators.required],
      NameEng: [''],
      RoomType_ID: [''],
      Room_Floor: [''],
      Bed_Count: [''],
      Notes: ['']
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
      this.Services.saveNewLab(this.productForm.value, () => {
        alert('Successfully Inserted')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
      })
    }
    else {
      this.Services.updateLab(this.productForm.value, () => {
        alert('Successfully Updated')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
        this.btnText = "Save";
      })
    }

  }

  getdata() {

    this.Services.getAllLabs(res => {
      this.table = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getLabById(id, res => {
      this.productForm.patchValue(res.data);
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



