import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { laborataryTestServices } from '../../laborataryTest.service';
import { LaborataryServices } from '../../laboratary.service';
declare var $: any;

@Component({
  selector: 'app-testcategory',
  templateUrl: './testcategory.component.html',
  styleUrls: ['./testcategory.component.css']
})
export class TestCategoriesComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  maincategory = [];
  tests = [];
  table: any[] = [];
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
  subcategory = [];



  constructor(private formBuilder: FormBuilder,
    private meta: Meta,
    private Services: laborataryTestServices,
    private _service: LaborataryServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.getmainCategory();
    this.getTest();
    this.productForm = this.formBuilder.group({
      ID: [''],
      Test_ID: ['', Validators.required],
      MainCategory_ID: ['', Validators.required],
      Category_ID: ['', Validators.required],
      MainCategoryName: [''],
      SubCategoryName: [''],
      TestName: ['']
    });
  }

  get s() { return this.productForm.controls; }


  Savedata() {
    this.Services.saveNewTestCategory(this.table, () => {
      alert('Successfully Inserted')
      this.table = [];
    })
  }

  insertdata() {
    this.submitted = true;
    if (this.productForm.status == "INVALID") {
      this.validateAllFormFields(this.productForm);
      return
    }
    else {
      if (this.btnText == "Save") {
        this.productForm.get("ID").setValue(0);
        this.table.push(this.productForm.value);
        this.submitted = false;
        this.productForm.reset();
      }
    }
  }

  getmainCategory() {
    this._service.getAllCategory(res => {
      this.maincategory = res.data;
    })
  }

  getTest() {
    this.Services.getAllTests(res => {
      this.tests = res.data;
    })
  }

  getdataById(id) {
    this.Services.getTestById(id, res => {
      // this.productForm.patchValue(
      //   {
      //     ID: res.data.ID,
      //     NameAr: res.data.NameAr,
      //     NameEng: res.data.NameEng,
      //     Category_ID: res.data.Category_ID
      //   });
      this.btnText = "Update";
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  selectMain(e) {
    this.productForm.get("MainCategoryName").setValue(e.target.options[e.target.options.selectedIndex].text)
    this._service.getSubCategory(e.target.value, res => {
      this.subcategory = res.data;
    })
  }

  selectSub(e) {
    this.productForm.get("SubCategoryName").setValue(e.target.options[e.target.options.selectedIndex].text)
  }

  selectTest(e) {
    this.productForm.get("TestName").setValue(e.target.options[e.target.options.selectedIndex].text)
  }
}



