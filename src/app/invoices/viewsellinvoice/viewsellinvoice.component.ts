import { ViewSellinvoiceServices } from './viewsellinvoice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsellinvoice',
  templateUrl: './viewsellinvoice.component.html',
  styleUrls: ['./viewsellinvoice.component.css']
})
export class ViewSellinvoiceComponent implements OnInit {
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
  Patients: any[] = [];

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
    'Qty': ''
  }

  constructor(
    private meta: Meta,
    public cmn: UserinfoService,
    private fb: FormBuilder, private Services: ViewSellinvoiceServices, private router: Router) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  createItem(): FormGroup {
    return this.fb.group({
      // start item
      BarCode: [''],
      Item_ID: [''],
      ProdName: [''],
      Price: [''],
      Qty: [''],
      Discount: ['0.00'],
      unit_id: [''],
      UnitName: [''],
      Bonus: ['0'],
      InvoiceNO: ['0'],
      ItemProfit: ['0'],
      ItemBalance: ['0'],
      Invoice_tot: ['0'],
      NoOfDays: [''],
      Dosage: [''],
      IsChecked: [false]
      // end item
    });
  }


  get Items(): FormArray {
    return <FormArray>this.InvoiveForm.get("BuyInvoiceDetailsList");
  }

  ngOnInit() {
    this.invoicedetails = [];
    this.total = 0;

    this.InvoiveForm = this.fb.group({
      FindID: [''],
      Code: [''],
      Store_ID: [''],
      CS_ID: [''],
      TrDate: [''],
      Notes: [''],
      InvoiceDiscount: ['0.00'],
      InvNet: ['0.00'],
      Paid: ['0.00'],
      Remain: ['0.00'],
      TotalItems: [''],
      BarCode: [''],
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
        'Qty': ''
      }
    })

    this.Services.getMaster(res => {
      this.Stores = res.Store;
    })

    this.Services.getPT(res => {
      this.Patients = res.Patients;
    })
  }

  ngAfterViewInit() {
    if (this.language == 'us') {
      this.checkValidationErrors();
      this.checkValidationArrayErrors();
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


  invoicesubmit() {
    if (this.invoicedetails.length != 0) {
      if (this.invoicedetails.BuyInvoiceDetailsList.length > 0) {
        this.invoicedetails.TotalItems = this.invoicedetails.BuyInvoiceDetailsList.length;

        this.invoicedetails.BuyInvoiceDetailsList = this.invoicedetails.BuyInvoiceDetailsList.filter(function (obj) {
          return obj.IsChecked !== false;
        });
      }

      console.log(this.invoicedetails);

      this.Services.saveOrder(this.invoicedetails, () => {
        alert("Invoice Generated Succesfully");
        this.InvoiveForm.reset();
        this.invoicedetails = [];
        this.Items.get("0.Discount").setValue('0.00');
        this.Items.get("0.Bonus").setValue('0');
        this.Items.get("0.InvoiceNO").setValue('0');
        this.Items.get("0.ItemProfit").setValue('0');
        this.Items.get("0.ItemBalance").setValue('0');

        this.InvoiveForm.get("InvNet").setValue('0.00');
        this.InvoiveForm.get("Paid").setValue('0.00');
        this.InvoiveForm.get("Remain").setValue('0.00');
        this.InvoiveForm.get("InvoiceDiscount").setValue('0.00');
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

  invoicecancle() {
    this.router.navigate(['/Maininvoice']);
  }

  GetCodeData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.Services.getInvData(this.InvoiveForm.get('FindID').value, res => {
        this.InvoiveForm.get('Store_ID').setValue('1');
        this.InvoiveForm.get('TrDate').setValue(new Date());
        this.InvoiveForm.get('CS_ID').setValue(res.PatientData.MS_ID + " " + res.PatientData.Obj_Name);

        res.data.forEach(e => {
          this.InvoiveForm.get('Code').setValue(e.Master_ID);
          this.Items.get('0.BarCode').setValue(e.BarCode);
          this.Items.get('0.Item_ID').setValue(e.Produsct_ID);
          this.Items.get('0.ProdName').setValue(e.TradeNameEng);
          this.Items.get('0.Price').setValue(e.Public_price_SAR);
          this.Items.get('0.unit_id').setValue(e.Package_type_ID);
          this.Items.get('0.UnitName').setValue(e.Package_typeNameEng);
          this.Items.get('0.NoOfDays').setValue(e.NoOfDays);
          this.Items.get('0.Dosage').setValue(e.Dosage);
          this.Items.get('0.Qty').setValue(parseFloat(this.Items.get('0.NoOfDays').value) * parseFloat(this.Items.get('0.Dosage').value));
          this.Items.get('0.Discount').setValue('0.00');
          this.Items.get('0.Bonus').setValue('0.00');
          this.Items.get('0.InvoiceNO').setValue('0.00');
          this.Items.get('0.ItemProfit').setValue('0.00');
          this.Items.get('0.ItemBalance').setValue('0.00');
          this.Items.get('0.Invoice_tot').setValue(parseFloat(this.Items.get('0.NoOfDays').value) * parseFloat(this.Items.get('0.Price').value));
          this.Items.get('0.IsChecked').setValue(false);

          this.CalcTotals();

          if (this.invoicedetails.length == 0) {
            debugger;
            this.invoicedetails = this.InvoiveForm.value;
          }
          else {
            var oldItems = this.invoicedetails.BuyInvoiceDetailsList;
            oldItems.push(this.Items.value[0]);
          }

          this.Items.reset();
        });
      });
    }
  }

  Mark(e, data) {
    if (e.target.checked) {
      this.invoicedetails.BuyInvoiceDetailsList.find(i => i.Item_ID == data.Item_ID).IsChecked = true;
    }
    else {
      this.invoicedetails.BuyInvoiceDetailsList.find(i => i.Item_ID == data.Item_ID).IsChecked = true;
    }
  }

  GetBarcodeData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.invoicedetails.BuyInvoiceDetailsList.find(i => i.BarCode == this.InvoiveForm.get('BarCode').value).IsChecked = true;
      $("#Bar_" + this.InvoiveForm.get('BarCode').value).attr('checked','checked');
    }
  }

  CalcTotals() {
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
  }
}
