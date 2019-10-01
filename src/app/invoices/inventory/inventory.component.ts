import { InventoryServices } from './inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  ManufactureList: any[];
  invoicedetails: any;
  total: any;
  products: any[] = [];
  ShowAuto: boolean = false;
  public langulagetype: any = 'us';
  fromsubmit: boolean;
  language: any;
  languageoption: any;
  InvoiveForm: FormGroup;
  tempApData: any;
  suggestedTexts: any[] = [];
  OldDiscount: any;
  Stores: any[] = [];

  ValidationMessages = {

    'ProdName': {
      'required': 'Please enter Product Name'
    },
    'unit_id': {
      'required': 'Please select Unit',
      'Select': 'Please select Unit'
    },
    'Store_ID': {
      'required': 'Please select Store',
      'Select': 'Please select Store'
    },
    'TrDate': {
      'required': 'Please select Date'
    },
    'Qty': {
      'required': 'Please Enter Quantity'
    }
  }

  ArabicValidationMessages = {
    'ProdName': {
      'required': 'رجاء إدخال إسم الصنف'
    },
    'unit_id': {
      'required': 'رجاء إختيار الوحدة',
      'Select': 'رجاء إختيار الوحدة'
    },
    'Store_ID': {
      'required': 'رجاء إختيار المخزن',
      'Select': 'رجاء إختيار المخزن'
    },
    'TrDate': {
      'required': 'رجاء إختيار التاريخ'
    },
    'Qty': {
      'required': 'رجاء إدخال الكمية'
    }
  }


  formErrors = {
    'Store_ID': '',
    'ProdName': '',
    'unit_id': '',
    'Qty': '',
    'TrDate': ''
  }

  constructor(
    private meta: Meta,
    public cmn: UserinfoService,
    private fb: FormBuilder, private Services: InventoryServices, private router: Router) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  createItem(): FormGroup {
    return this.fb.group({
      // start item
      Barcode: [''],
      Product_ID: [''],
      ProdName: ['', [Validators.required]],
      Qty: ['', [Validators.required]],
      unit_id: [''],
      UnitName: [''],
      Store_ID: ['']
    });
  }


  get Items(): FormArray {
    return <FormArray>this.InvoiveForm.get("StoreRequestList");
  }

  ngOnInit() {
    this.ManufactureList = [];
    this.invoicedetails = [];
    this.total = 0;

    this.InvoiveForm = this.fb.group({
      Store_ID: ['', [Validators.required]],
      TrDate: ['', [Validators.required]],
      Emp_ID: [localStorage.getItem('userId')],
      StoreRequestList: this.fb.array([this.createItem()])
    })


    this.InvoiveForm.valueChanges.subscribe((data) => {
      this.fromsubmit = false;
      this.tempApData = data.appointmentval;
      this.checkValidationErrors(this.InvoiveForm);
      this.checkValidationArrayErrors(this.Items);
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

      this.formErrors = {
        'Store_ID': '',
        'ProdName': '',
        'unit_id': '',
        'Qty': '',
        'TrDate': ''
      }
    })



    // get Stores & Manufacturers
    this.Services.getMaster(res => {
      this.Stores = res.Store;
    })
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
      this.checkValidationArrayErrors();
    }
  }

  AddItem() {
    this.Items.get("0.Store_ID").setValue(this.InvoiveForm.get('Store_ID').value);
    this.fromsubmit = true;
    if (this.InvoiveForm.invalid == true) {
      this.checkValidationErrors(this.InvoiveForm);
      this.checkValidationArrayErrors(this.Items);
    } else {
      if (this.invoicedetails.length == 0) {
        this.invoicedetails = this.InvoiveForm.value;
      }
      else {
        var oldItems = this.invoicedetails.StoreRequestList;
        oldItems.push(this.Items.value[0]);
      }

      this.Items.reset();
    }
  }

  checkValidationErrors(group: FormGroup = this.InvoiveForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else { }
        } else {
          console.log('untouched')
        }
      }
      else {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          console.log("entered.....if" + this.langulagetype);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }

          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }

  checkValidationArrayErrors(group: FormArray = this.Items): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else { }
        } else {
          console.log('untouched')
        }
      }
      else {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          console.log("entered.....if" + this.langulagetype);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }

          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }


  out() {
    if (this.Items.value[0].ProdName == "") {
      this.products = [];
      this.suggestedTexts = [];
      this.ShowAuto = false;
    }
  }

  extractSuggestedTexts() {
    let val = this.Items.value[0].ProdName;
    this.products = [];
    this.suggestedTexts = [];
    this.Services.getProduct(val, res => {
      this.products = res.Product;
      if (this.Items.value[0].ProdName !== "") {
        if (this.langulagetype == "EN") {
          this.suggestedTexts = this.products.filter(e => e.TradeNameEng.toLowerCase().indexOf(this.Items.value[0].ProdName.toLowerCase()) > -1);
        }
        else {
          this.suggestedTexts = this.products.filter(e => e.TradeNameAr.toLowerCase().indexOf(this.Items.value[0].ProdName.toLowerCase()) > -1);
        }

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
    this.Items.get('0.Product_ID').setValue(data.ID);

    if (this.langulagetype == "EN") {
      this.Items.get('0.ProdName').setValue(data.TradeNameEng);
      this.Items.get('0.UnitName').setValue(data.NameEng);
    }
    else {
      this.Items.get('0.ProdName').setValue(data.TradeNameAr);
      this.Items.get('0.UnitName').setValue(data.NameAr);
    }

    this.Items.get('0.unit_id').setValue(data.Package_type_ID);
  }

  invoicesubmit() {
    this.invoicedetails.TotalItems = this.invoicedetails.StoreRequestList.length;
    if (this.invoicedetails.StoreRequestList.length > 0) {
      this.Services.saveOrder(this.invoicedetails, () => {
        alert("Invoice Generated Succesfully");
        this.InvoiveForm.reset();
        this.invoicedetails = [];
      })
    }
  }

  FromStoresSelected(data) {
    this.InvoiveForm.get("Store_ID").setValue(data.target.value);
  }


  removerow(data) {
    var index = this.invoicedetails.StoreRequestList.findIndex(record => record.ProdName === data.ProdName);
    this.invoicedetails.StoreRequestList.splice(index, 1);
  }

  invoicecancle() {
    this.router.navigate(['/requestproduct']);
  }

  GetBarcodeData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.Services.getProductByBarCode(this.Items.get("0.Barcode").value, res => {
        this.Items.get('0.Product_ID').setValue(res.Product.ID);

        if (this.langulagetype == "EN") {
          this.Items.get('0.ProdName').setValue(res.Product.TradeNameEng);
          this.Items.get('0.UnitName').setValue(res.Product.NameEng);
        }
        else {
          this.Items.get('0.ProdName').setValue(res.Product.TradeNameAr);
          this.Items.get('0.UnitName').setValue(res.Product.NameAr);
        }

        this.Items.get('0.unit_id').setValue(res.Product.Package_type_ID);
      })
    }
  }
}
