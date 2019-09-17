import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-stockadjustment',
  templateUrl: './stockadjustment.component.html',
  styleUrls: ['./stockadjustment.component.css']
})
export class StockadjustmentComponent implements OnInit {
  userid: string;
  ItemCode: string; selected = "true";
  Name: any; Stocktype: any; Stock: any; Notes: any;
  public langulagetype: any = 'us';
  languageoption: any; radioModel: any; Increasing: any; Decreasing: any;
  addStocklevel: any; Stocklevel: any; isSpecial:any;
  RadioButton: string;
  isPageloaderVisible: boolean;

  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService,
    public http: Http,
    private route: ActivatedRoute
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

  ValidationMessages = {
    'Stocktype': {
      'required': 'Stock type is required',
    },
    'Stock': {
      'required': 'Stock is required',
    },
    'Notes': {
      'required': 'Notes is required',
    },
  }
  ArabicValidationMessages = {
    'Stocktype': {
      'required': 'نوع المخزون مطلوب',
    },
    'Stock': {
      'required': 'الأسهم المطلوبة',
    },
    'Notes': {
      'required': 'الملاحظات مطلوبة',
    },
  }
  formErrors = {
    'Stocktype': '',
    'Stock': '',
    'Notes': '',
  }
  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.ItemCode = currentUrl[currentUrl.length - 1]

    this.addStocklevel = this.fb.group({
      Stocktype: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
      Notes: ['', [Validators.required]],
      Increasing: new FormControl(''),
      Decreasing: new FormControl(''),
      radioModel: new FormControl(''),
    });
    this.commonService.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
      //console.log(this.languageoption);
     this. formErrors = {
      'Stocktype': '',
      'Stock': '',
      'Notes': '',
      }
  })
  this.addStocklevel.valueChanges.subscribe((data) => {
    this.checkValidationErrors(this.addStocklevel);
  });

    //this.RadioButton = "Increasing";
    this.radioModel.selected = "Increasing"
    var accessToken = window.localStorage.Tokenval ;
   // this.commonService.tokenFun().subscribe(tokenResult => {
     // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
      let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
      let params = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branchid": this.userid,
        "Category": "",
        "Item_code": this.ItemCode,
        "Name": "",
        "Serial_number": "",
        "Supplier": "",
        "Price": "",
        "Tax": "",
        "Cost_price": "",
        "Stock_level": "",
        "Notes": "",
        "Tax_includes": "", // UserID pass
        "Loginid": this.userid,
        "Trans_date": "",
        "Last_updated": "",
        "var1": "",
        "var2": "",
        "condition": "getwithstockinfo"
      }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          // this.Supplier=result.data.Table[0].Supplier,
          this.ItemCode = result.data.Table[0].Item_code,
            this.Name = result.data.Table[0].Name
        } else {
     alert('No Item Code')
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
  checkValidationErrors(group: FormGroup = this.addStocklevel): void {

       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
       
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
     checkValidationErrorssubmit(group: FormGroup = this.addStocklevel): void {
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
   
    if (this.addStocklevel.valid == false) {
      this.checkValidationErrorssubmit(this.addStocklevel);
    } else {
      var accessToken = window.localStorage.Tokenval ;
      //this.commonService.tokenFun().subscribe(tokenResult => {
       // var accessToken = tokenResult.token_type + " " + tokenResult.access_token
        let serviceUrl = this.commonService.commonUrl + "Account/Products_transactions";
        if (this.addStocklevel.value.radioModel === "true") {
          this.Stocklevel = "Increasing"
        } else {
          this.Stocklevel = "Decreasing"
        }
        let params = {
          "Sno": "",
          "Clinicid": this.userid,
          "Branchid": this.userid,
          "Category": "",
          "Item_code": this.ItemCode,
          "Name": "",
          "Serial_number": "",
          "Supplier": "",
          "Price": "",
          "Tax": "",
          "Cost_price": "",
          "Stock_level": "",
          "Notes": this.addStocklevel.value.Notes,
          "Tax_includes": this.addStocklevel.value.Stock,
          "Loginid": this.userid,
          "Trans_date": "",
          "Last_updated": "",
          "var1": this.Stocklevel,
          "var2": this.addStocklevel.value.Stocktype,
          "condition": "InsertAdjustment"
        }

        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });

        let options = new RequestOptions({ headers: headers });
        this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
          debugger;
          console.log(result)
          if (result.status_cd === "1" || result.data.Table[0].result == "True") {
            alert('Inserted Successfully');
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
      //     console.log("Token Error:" + err);
      //   }
      // );
    }
  }
  onSelectionChangeYes(values: any) {
    if (values.currentTarget.checked === true) {
      this.RadioButton = "Increasing";
    }
    else {
      this.RadioButton = "Decreasing";
    }
  }
  onSelectionChangeNo(values: any) {
    if (values.currentTarget.checked === true) {
      this.RadioButton = "Decreasing";
    }
    else {
      this.RadioButton = "Increasing";
    }
  }

}
