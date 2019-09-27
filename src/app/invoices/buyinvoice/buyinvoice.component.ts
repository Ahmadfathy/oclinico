import { BuyinvoiceServices } from './buyinvoice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-buyinvoice',
  templateUrl: './buyinvoice.component.html',
  styleUrls: ['./buyinvoice.component.css']
})
export class BuyinvoiceComponent implements OnInit {
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
  Manufacturers: any[] = [];

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
    'Price': {
      'required': 'Please Enter Price'
    },
    'ExpireDate': {
      'required': 'Please select Expire Date'
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
    'Price': {
      'required': 'رجاء إدخال السعر'
    },

    'ExpireDate': {
      'required': 'رجاء إختيار تاريخ الإنتهاء'
    },
    'Qty': {
      'required': 'رجاء إدخال الكمية'
    }
  }


  formErrors = {
    'Store_ID': '',
    'TrDate': '',
    'ProdName': '',
    'unit_id': '',
    'Price': '',
    'ExpireDate': '',
    'Qty': ''
  }

  constructor(
    private meta: Meta,
    public cmn: UserinfoService,
    private fb: FormBuilder, private Services: BuyinvoiceServices, private router: Router) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  createItem(): FormGroup {
    return this.fb.group({
      // start item
      Barcode: [''],
      Item_ID: [''],
      ProdName: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Qty: ['', [Validators.required]],
      ExpireDate: ['', [Validators.required]],
      Discount: ['0.00'],
      unit_id: ['', [Validators.required]],
      UnitName: [''],
      Bonus: ['0'],
      InvoiceNO: ['0'],
      ItemProfit: ['0'],
      ItemBalance: ['0'],
      Invoice_tot: ['0']
      // end item
    });
  }


  get Items(): FormArray {
    return <FormArray>this.InvoiveForm.get("BuyInvoiceDetailsList");
  }

  ngOnInit() {
    this.ManufactureList = [];
    this.invoicedetails = [];
    this.total = 0;

    this.InvoiveForm = this.fb.group({
      Code: [''],
      Store_ID: ['', [Validators.required]],
      CS_ID: [''],
      TrDate: ['', [Validators.required]],
      Notes: [''],
      InvoiceDiscount: ['0.00'],
      InvNet: ['0.00'],
      Paid: ['0.00'],
      Remain: ['0.00'],
      TotalItems: [''],

      BuyInvoiceDetailsList: this.fb.array([this.createItem()])
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
        'TrDate': '',
        'ProdName': '',
        'unit_id': '',
        'Price': '',
        'ExpireDate': '',
        'Qty': ''
      }
    })



    // get Stores & Manufacturers
    this.Services.getMaster(res => {
      this.Stores = res.Store;
      this.Manufacturers = res.Manufacturer;
    })
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
      this.checkValidationArrayErrors();
    }
  }

  AddItem() {
    this.fromsubmit = true;
    if (this.InvoiveForm.invalid == true) {
      this.checkValidationErrors(this.InvoiveForm);
      this.checkValidationArrayErrors(this.Items);
    } else {

      if (this.Items.get('0.Discount').value == "" || this.Items.get('0.Discount').value == null) {
        this.Items.get('0.Discount').setValue("0");
      }
      var itemTotal = this.Items.get('0.Price').value * this.Items.get('0.Qty').value;
      var itemDiscount = this.Items.get('0.Discount').value;
      this.Items.get('0.Invoice_tot').setValue(itemTotal - itemDiscount);

      this.total = this.InvoiveForm.get("InvNet").value;
      this.InvoiveForm.get("InvNet").setValue(parseFloat(this.total) + (itemTotal - itemDiscount));

      this.OldDiscount = this.InvoiveForm.get("InvoiceDiscount").value;
      this.InvoiveForm.get("InvoiceDiscount").setValue(parseFloat(this.OldDiscount) + parseFloat(itemDiscount));

      debugger;
      if (this.invoicedetails.length == 0) {
        this.invoicedetails = this.InvoiveForm.value;
      }
      else {
        var oldItems = this.invoicedetails.BuyInvoiceDetailsList;
        oldItems.push(this.Items.value[0]);
      }

      this.Items.reset();
      this.Items.get("0.Discount").setValue('0.00');
      this.Items.get("0.Bonus").setValue('0');
      this.Items.get("0.InvoiceNO").setValue('0');
      this.Items.get("0.ItemProfit").setValue('0');
      this.Items.get("0.ItemBalance").setValue('0');
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
    this.Items.get('0.Item_ID').setValue(data.ID);

    if (this.langulagetype == "EN") {
      this.Items.get('0.ProdName').setValue(data.TradeNameEng);
      this.Items.get('0.UnitName').setValue(data.NameEng);
    }
    else {
      this.Items.get('0.ProdName').setValue(data.TradeNameAr);
      this.Items.get('0.UnitName').setValue(data.NameAr);
    }

    this.Items.get('0.unit_id').setValue(data.Package_type_ID);
    this.Items.get('0.Price').setValue(data.Public_price_SAR != null ? data.Public_price_SAR : '0.00');
  }

  invoicesubmit() {
    this.invoicedetails.TotalItems = this.invoicedetails.BuyInvoiceDetailsList.length;
    if (this.invoicedetails.BuyInvoiceDetailsList.length > 0) {
      this.Services.saveOrder(this.invoicedetails, res => {
        alert("Invoice Generated Succesfully");
        this.InvoiveForm.reset();
        this.invoicedetails = [];
        this.Items.get("0.Discount").setValue('0.00');
        this.Items.get("0.Bonus").setValue('0');
        this.Items.get("0.InvoiceNO").setValue('0');
        this.Items.get("0.ItemProfit").setValue('0');
        this.Items.get("0.ItemBalance").setValue('0');
      })
    }
  }

  StoresSelected(data) {
    this.InvoiveForm.get("Store_ID").setValue(data.target.value);
  }

  ManufacturersSelected(data) {
    // var xxx = data.target.value;
    this.InvoiveForm.get("CS_ID").setValue(data.target.value);
  }

  removerow(data) {
    var index = this.invoicedetails.BuyInvoiceDetailsList.findIndex(record => record.ProdName === data.ProdName);
    this.invoicedetails.BuyInvoiceDetailsList.splice(index, 1);

    let Oldtotal = this.InvoiveForm.get("InvNet").value;
    this.InvoiveForm.get("InvNet").setValue(parseFloat(Oldtotal) - data.Invoice_tot);

    let OldDiscount = this.InvoiveForm.get("InvoiceDiscount").value;
    this.InvoiveForm.get("InvoiceDiscount").setValue(parseFloat(OldDiscount) - parseFloat(data.Discount));
  }

  invoicecancle() {
    this.router.navigate(['/Maininvoice']);
  }

  GetBarcodeData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.Services.getProductByBarCode(this.Items.get("0.Barcode").value, res => {
        this.Items.get('0.Item_ID').setValue(res.Product.ID);

        if (this.langulagetype == "EN") {
          this.Items.get('0.ProdName').setValue(res.Product.TradeNameEng);
          this.Items.get('0.UnitName').setValue(res.Product.NameEng);
        }
        else {
          this.Items.get('0.ProdName').setValue(res.Product.TradeNameAr);
          this.Items.get('0.UnitName').setValue(res.Product.NameAr);
        }
    
        this.Items.get('0.unit_id').setValue(res.Product.Package_type_ID);
        this.Items.get('0.Price').setValue(res.Product.Public_price_SAR != null ? res.Product.Public_price_SAR : '0.00');

      })
    }
  }

}
