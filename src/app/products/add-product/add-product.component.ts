import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public isPageloaderVisible = true;
  mon: any; currentdt: any; yr: any; selday: any; selyear: any; public years = [];
  selectedmonth: any; selectedyear: any; monthname: any; dayname: any;
  selectedday: any; DivTax: any; selected = "all"; Yes: any; No: any;
  year: any; nullValue: any; ItemCode = this.nullValue;
  Name = this.nullValue; SerialNumber = this.nullValue; Tax = this.nullValue;
  Supplier = this.nullValue; Price = this.nullValue; CostPrice = this.nullValue;
  StockLevel = this.nullValue; Notes = this.nullValue; addproduct: FormGroup;
  addproductobj: any = []; selcheckval: any; dates: any; months: any;
  Tax_Includes: any; RadioButton: any; Tax_value: any; Expire_date: any; radioModel: any;
  isSpecial: any; userid: string;
  submit_update: boolean;
  public langulagetype: any = 'us';
  languageoption: any;

  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    public http: Http,

  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "us";
      }
      else {

        this.langulagetype = this.languageoption;
      }
    });
  }

  
  Dayes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  ValidationMessages = {
    'ItemCode': {
      'required': 'Item Code is required',
    },
    'Name': {
      'required': 'Name is required',
    },
    'SerialNumber': {
      'required': 'Serial Number is required',
    },
    'Supplier': {
      'required': 'Supplier is required',
    },
    'Price': {
      'required': 'Price is required',
    },
    'CostPrice': {
      'required': 'Cost Price is required',
    },
    'StockLevel': {
      'required': 'StockLevel is required',
    },
    'Notes': {
      'required': 'Notes is required',
    },
  }
  ArabicValidationMessages = {
    'ItemCode': {
      'required': 'رمز البند مطلوب',
    },
    'Name': {
      'required': 'مطلوب اسم',
    },
    'SerialNumber': {
      'required': 'الرقم التسلسلي مطلوب',
    },
    'Supplier': {
      'required': 'المورد مطلوب',
    },
    'Price': {
      'required': 'السعر مطلوب',
    },
    'CostPrice': {
      'required': 'سعر التكلفة مطلوب',
    },
    'StockLevel': {
      'required': 'مستوى المخزون مطلوب',
    },
    'Notes': {
      'required': 'الملاحظات مطلوبة',
    },
  }
  formErrors = {
    'ItemCode': '',
    'Name': '',
    'SerialNumber': '',
    'Supplier': '',
    'Price': '',
    'CostPrice': '',
    'StockLevel': '',
    'Notes': '',
  }
  ngOnInit() {
    this.isPageloaderVisible = false;
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
      //console.log(this.languageoption);
     this.formErrors = {
      'ItemCode': '',
      'Name': '',
      'SerialNumber': '',
      'Supplier': '',
      'Price': '',
      'CostPrice': '',
      'StockLevel': '',
      'Notes': '',
      }
  })


    this.addproduct = this.fb.group({
      ItemCode: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      SerialNumber: ['', [Validators.required]],
      Supplier: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      CostPrice: ['', [Validators.required]],
      StockLevel: ['', [Validators.required]],
      Notes: ['', [Validators.required]],
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      Yes: new FormControl(''),
      No: new FormControl(''),
      Tax: new FormControl(''),
      radioModel: new FormControl(''),
    });

    this.addproduct.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addproduct);
    });


    this.currentdt = new Date();
    this.mon = this.currentdt.getMonth() + 1;
    if (this.mon < 10) {
      this.mon = "0" + this.mon;
    }

    this.yr = this.currentdt.getFullYear();
    this.getDates();
    this.selday = this.mon;
    this.selyear = this.yr;

    this.RadioButton = "No";
  }

  FieldsChange(values: any) {
    if (values.currentTarget.checked === true) {
     this.Tax_Includes=true;

    }
    else {
      this.Tax_Includes=false;
    }
  }
  onSelectionChangeYes(values: any) {
    if (values.currentTarget.checked === true) {
      this.RadioButton = "Yes";
    }
    else {
      this.RadioButton = "No";
    }
  }
  onSelectionChangeNo(values: any) {
    if (values.currentTarget.checked === true) {
      this.RadioButton = "No";
    }
    else {
      this.RadioButton = "Yes";
    }
  }
  getDates() {
    var date = new Date();
    var currentYear = new Date().getFullYear() - 1;

    var todayTime = new Date();
    this.dates = (todayTime.getDate());

    for (var i = 0; i <= 10; i++) {
      this.years.push(currentYear + i);
    }

    this.months = [{ "name": "January", "id": "01" },
    { "name": "February", "id": "02" },
    { "name": "March", "id": "03" },
    { "name": "April", "id": "04" },
    { "name": "May", "id": "05" },
    { "name": "June", "id": "06" },
    { "name": "July", "id": "07" },
    { "name": "August", "id": "08" },
    { "name": "September", "id": "09" },
    { "name": "October", "id": "10" },
    { "name": "November", "id": "11" },
    { "name": "December", "id": "12" }];

    //this.selectedday=this.dates; //('0'+date.getMinutes()).slice(-2)
    this.selectedday = ('0' + this.dates).slice(-2);
    this.selectedmonth = this.mon;
    this.selectedyear = this.yr;

    for (var i = 0; i < this.Dayes.length; i++) {
      if (this.selectedday == this.Dayes[i]) {
        this.dayname = this.Dayes[i];
      }
    }
    for (var i = 0; i < this.months.length; i++) {
      if (this.selectedmonth == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }

  myday(day) {
    this.selectedday = day;
    for (var i = 0; i < this.Dayes.length; i++) {
      if (this.selectedday == this.Dayes[i]) {
        this.dayname = this.Dayes[i];
      }
    }
  }

  mymonth(day) {
    this.selday = day;
    for (var i = 0; i < this.months.length; i++) {
      if (this.selday == this.months[i].id) {
        this.monthname = this.months[i].name;
      }
    }
  }

  myyear(year) {
    this.selyear = year;
  }
  onChangeItemCode() {
    let values = this.addproduct.value.ItemCode;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.ItemCode.patchValue('')
      return false;
    }
  };
  onChangeSerialNumber() {
    let values = this.addproduct.value.SerialNumber;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.SerialNumber.patchValue('')
      return false;
    }
  };
  onChangePrice() {
    let values = this.addproduct.value.Price;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.Price.patchValue('')
      return false;
    }
  };
  onChangeCostPrice() {
    let values = this.addproduct.value.CostPrice;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.CostPrice.patchValue('')
      return false;
    }
  };
  onChangeStockLevel() {
    let values = this.addproduct.value.StockLevel;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.StockLevel.patchValue('')
      return false;
    }
  };
  onChangeTax() {
    let values = this.addproduct.value.Tax;
    var regex = /^[0-9]+$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Numeric Only");
      this.addproduct.controls.Tax.patchValue('')
      return false;
    }
  };
  onChangeName() {
    let values = this.addproduct.value.Name;
    var regex = /^[a-zA-Z ]*$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Alphabets Only");
      this.addproduct.controls.Name.patchValue('')
      return false;
    }
  };
  onChangeSupplier() {
    let values = this.addproduct.value.Supplier;
    var regex = /^[a-zA-Z ]*$/;
    if (regex.test(values)) {
      return true;
    }
    else {
      alert("Enter Alphabets Only");
      this.addproduct.controls.Supplier.patchValue('')
      return false;
    }
  };
  checkValidationErrors(group: FormGroup = this.addproduct): void {
    // console.log("sdf");
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       //alert(this.languageoption);
       if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
         const messages = this.ValidationMessages[key];
         for (const errorKey in abstractControl.errors) {
           console.log("errorKey :" + errorKey)
           if (errorKey) {
             this.formErrors[key] += messages[errorKey] + '';
           }
         }
       }else{
         const messages = this.ArabicValidationMessages[key];
         for (const errorKey in abstractControl.errors) {
           console.log("errorKey :" + errorKey)
           if (errorKey) {
             this.formErrors[key] += messages[errorKey] + '';
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
     checkValidationErrorssubmit(group: FormGroup = this.addproduct): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
   
         if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
           const messages = this.ValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
         }else{
           const messages = this.ArabicValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
         }
         }
   
         if (abstractControl instanceof FormGroup) {
           console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }
  addproductsubmit() {
    if (this.addproduct.valid == false) {
      this.checkValidationErrorssubmit(this.addproduct);
    } else {
      if (this.addproduct.value.Tax != "") {
        this.Tax_value = this.addproduct.value.Tax;
        this.Tax_Includes = "Yes";
      } else {
        this.Tax_value = "0";
        this.Tax_Includes = "No";
      }

      this.Expire_date = this.addproduct.value.year + '/' + this.addproduct.value.month + '/' + ('0' + this.addproduct.value.day).slice(-2);
      var accessToken = window.localStorage.Tokenval ;
     // this.commonService.tokenFun().subscribe(tokenResult => {
       // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
        //console.log(accessToken);

        // our service calling as usual

        //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
        let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
        let params = {
          "Sno": "",
          "Clinicid": this.userid,
          "Branchid": this.userid,
          "Category": "Product",
          "Item_code": this.addproduct.value.ItemCode,
          "Name": this.addproduct.value.Name,
          "Serial_number": this.addproduct.value.SerialNumber,
          "Supplier": this.addproduct.value.Supplier,
          "Price": this.addproduct.value.Price,
          "Tax": this.Tax_value,
          "Cost_price": this.addproduct.value.CostPrice,
          "Stock_level": this.addproduct.value.StockLevel,
          "Notes": this.addproduct.value.Notes,
          "Tax_includes": this.userid, // UserID pass
          "Loginid": this.userid,
          "Trans_date": this.Expire_date,
          "Last_updated": "",
          "var1": this.RadioButton,
          "var2": this.Tax_Includes,
          "condition": "insert"
        }

        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });

        let options = new RequestOptions({ headers: headers });
        this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
          this.isPageloaderVisible = false;
          if (result.status_cd === "1" || result.data.Table[0].result == "True") {

            alert('Inserted Successfully');
            // this.router.navigate(['/product']);
            this.router.navigateByUrl('/product');
          } else {
            console.log(result.error_msg);
            console.log(accessToken);
          }
        },
          error => {
            console.log(error);
          }
        );
      // },
      //   err => {
      //     this.isPageloaderVisible = false;
      //     console.log("Token Error:" + err);
      //   }
      // );
    }
  }
}

