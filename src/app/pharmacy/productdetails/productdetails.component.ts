import { ProductServices } from './../products.service';
import { productsRoutes } from './../../products/products.routing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  productdetailsForm: FormGroup;
  submitted = false;
  table = [];
  result: any;
  id: any;
  prid: any;
  name: any;
  name1: any;
  name2: any;
  packagtypeid: any;
  Name: string;
  nameval: any;
  masterid: string;

  // New Section
  productForm: FormGroup;
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
  suggestedTexts: any[] = [];
  ShowAuto: boolean = false;
  public langulagetype: any = 'us';
  languageoption: string;
  GenericName: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private meta: Meta,

    private cmn: UserinfoService,
    private router: Router, private Services: ProductServices) {


    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    // let url =document.URL;
    // this.Name=url.split('=')[1];

    // var url = document.URL
    // var url1 = url.split('?')
    // var getids = url1[1].split('=')[1]
    // //console.log(getids);
    // this.nameval = getids.split(":")[0].split("&")[0]
    // //console.log(name)


    // var currentUrl = document.URL.split('?');
    // currentUrl = currentUrl[currentUrl.length - 1].split('=');
    // this.masterid = currentUrl[currentUrl.length - 1]



    this.tablegrid();

    $('#update').hide();
    this.tablegrid();
    this.productdetailsForm = this.formBuilder.group({
      genericname: ['', Validators.required],
      TradeNameAr: ['', Validators.required],
      TradeNameEng: ['', Validators.required],
      Public_price_SAR: ['', Validators.required],
      Package_type_ID: ['', Validators.required],
      Registrationno: [''],

      Strength_value: [''],
      Volume: [''],
      Package_size: [''],
      barcode: ['', Validators.required],
      ATC_Code_1: [''],
      Unit_of_volume_ID: [''],
      Alertquantity: [''],
      ATC_Code_2: [''],
      Remarks: [''],
      Routeofadministration: [''],
      Shelf_life_mon_ID: [''],
      Countryofmanufacture: [''],
      Mah: [''],
      Unitofstrength: [''],
      Legalstatus: [''],
      Storageconditions: [''],
      Marketingcompany: [''],
      Authorizationstatus: [''],
      Dosageform: [''],
      productcontrol: [''],
      Manucfacturename: [''],
      Nationality: [''],
      Marketingstatus: [''],
      // public int SMPackageType_ID { get; set; }
      // public int SMPackageType_Count { get; set; }
      // public int MDPackageType_ID { get; set; }
      // public int MDPackageType_Count { get; set; }
      // public int BGPackageType_ID { get; set; }
      // public int BGPackageType_Count { get; set; }
    });

    $('#update').hide();
    this.tablegrid();
    this.Volume();
    this.Unit_of_volume_ID();
    this.Package_type_ID();

    // New
    // this.unitstrength();
    // this.dosageform();
    // this.productcontrol();
    this.manufacturename();
    this.nationality();
    this.markitingstatus();
    this.routeofadmin();
    this.countryofmanufacture();
    this.mah();
    this.legalstatus();
    this.storagecondition();
    this.markitingcompany();
    this.authorazationstatus();
  }
  // unitstrength() {
  //   throw new Error("Method not implemented.");
  // }
  // dosageform() {
  //   throw new Error("Method not implemented.");
  // }
  // productcontrol() {
  //   throw new Error("Method not implemented.");
  // }

  get s() { return this.productdetailsForm.controls; }

  alertMsg(msg: any) {
    alert(msg);
  }

  onSubmit() {
    this.submitted = true;
    if (this.productdetailsForm.invalid) {
      return;
    }
    console.log(this.productdetailsForm.value)
  }

  insertdata() {
    var accessToken = window.localStorage.Tokenval;
    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-details/add-new-product';

    let body =
    {
      'MasterID': this.masterid,
      'RegistrationNo': this.productdetailsForm.value.Registrationno,
      'TradeNameAr': this.productdetailsForm.value.TradeNameAr,
      'TradeNameEng': this.productdetailsForm.value.TradeNameEng,
      'Strength_value': this.productdetailsForm.value.Strength_value,
      'ATC_Code_1': this.productdetailsForm.value.ATC_Code_1,
      'ATC_Code_2': this.productdetailsForm.value.ATC_Code_2,
      'Volume': '0', // this.productdetailsForm.value.Volume,
      'Unit_of_volume_ID': this.productdetailsForm.value.Unit_of_volume_ID,
      'Package_type_ID': this.productdetailsForm.value.Package_type_ID,
      'Package_size': this.productdetailsForm.value.Package_size,
      'Public_price_SAR': this.productdetailsForm.value.Public_price_SAR,
      'BarCode': this.productdetailsForm.value.barcode,
      'Remarks': this.productdetailsForm.value.Remarks,
      'Aler_Qty': '5',// this.productdetailsForm.value.Alertquantity,
      'GenericName': this.productdetailsForm.value.genericname,
      'Unit_of_strength_ID': this.productdetailsForm.value.Unitofstrength,
      'Dosage_Form_ID': this.productdetailsForm.value.Dosageform,
      'Route_of_Administration_ID': this.productdetailsForm.value.Routeofadministration,
      'Legal_status_ID': this.productdetailsForm.value.Legalstatus,
      'Product_control_ID': this.productdetailsForm.value.productcontrol,
      'Shelf_life_mon_ID': "1",
      'Storage_conditions_ID': "5",
      'Manufacturer_name_ID': this.productdetailsForm.value.Manucfacturename,
      'Country_of_Manufacturer_ID': this.productdetailsForm.value.Countryofmanufacture,
      'Marketing_Company_ID': this.productdetailsForm.value.Marketingcompany,
      'Nationality_ID': this.productdetailsForm.value.Nationality,
      'MAH_Agent_name_ID': this.productdetailsForm.value.Mah,
      'Authorization_status_ID': this.productdetailsForm.value.Authorizationstatus,
      'Marketing_status_ID': this.productdetailsForm.value.Marketingstatus,
      // public int SMPackageType_ID { get; set; }
      // public int SMPackageType_Count { get; set; }
      // public int MDPackageType_ID { get; set; }
      // public int MDPackageType_Count { get; set; }
      // public int BGPackageType_ID { get; set; }
      // public int BGPackageType_Count { get; set; }
    }

    let headers = new Headers({ "Content-Type": "application/json", Accept: "application/json", Authorization: accessToken });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      console.log(res.Result); // true or false
      if (res.Result == true) {
        alert('Successfully Inserted')
        this.tablegrid();
        this.productdetailsForm.reset();
        console.log("successfully insert");
        this.submitted = false;
      } else {
        console.log("error")
      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }

  tablegrid() {

    // console.log("test");
    var accessToken = window.localStorage.Tokenval;

    let url = "https://api.oclinico.com/PharmacyAPI/api/product-details/get-all-product/"

    let body = {

    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      //Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      console.log(res)

      console.log(res.Result);
      if (res.Result == true) {
        console.log("success")
          ;
        this.table = res.data;
      } else {

      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }


  edit(id: any) {
    this.prid = id

    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-details/get-product-by-id/';

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",

    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url + this.prid, options).map(res => res.json()).subscribe(res => {
      console.log(res)

      debugger;
      this.id = this.prid;
      if (res.Result == true) {
        //console.log("success")

        // this.table=res.data;
        $('#update').show();
        $('#save').hide();

        this.productdetailsForm.patchValue(
          {
            Registrationno: res.data.RegistrationNo,
            Strength_value: res.data.Strength_value,
            Volume: res.data.Volume,
            Package_size: res.data.Package_size,
            barcode: res.data.BarCode,
            TradeNameAr: res.data.TradeNameAr,
            ATC_Code_1: res.data.ATC_Code_1,
            Unit_of_volume_ID: res.data.Unit_of_volume_ID,
            Public_price_SAR: res.data.Public_price_SAR,
            Alertquantity: res.data.AlerQty,
            TradeNameEng: res.data.TradeNameEng,
            ATC_Code_2: res.data.ATC_Code_2,
            Package_type_ID: res.data.Package_type_ID,
            Remarks: res.data.Remarks,
            AlerQty: res.data.Alertquantity,
            genericname: res.data.genericname,
            Unit_of_strength_ID: res.data.Unit_of_strength_ID,
            Dosage_Form_ID: res.data.Dosage_Form_ID,
            Route_of_Administration_ID: res.data.Route_of_Administration_ID,
            Legal_status_ID: res.data.Legal_status_ID,
            Product_control_ID: res.data.Product_control_ID,
            Shelf_life_mon_ID: "1",
            Storage_conditions_ID: res.data.Storage_conditions_ID,
            Manucfacturename: res.data.Manufacturer_name_ID,
            Countryofmanufacture: res.data.Country_of_Manufacturer_ID,
            Marketingcompany: res.data.Marketing_Company_ID,
            Nationality: res.data.Nationality_ID,
            MAH_Agent_name_ID: res.data.MAH_Agent_name_ID,
            Authorizationstatus: res.data.Authorization_status_ID,
            Marketingstatus: res.data.Marketing_status_ID,

          }
        );
      }
      else {
        console.log("Load Failed:" + this.result.message)
      }
    }),
      (err) => {
        console.log("Token Error:" + err);

      }

  }


  update() {
    if (this.productdetailsForm, status == "Invalid") {
      return
    }

    let body = {
      'ID': this.prid,
      'MasterID': "1",
      'RegistrationNo': this.productdetailsForm.value.Registrationno,
      'TradeNameAr': this.productdetailsForm.value.TradeNameAr,
      'TradeNameEng': this.productdetailsForm.value.TradeNameEng,
      'Strength_value': this.productdetailsForm.value.Strength_value,
      'ATC_Code_1': this.productdetailsForm.value.ATC_Code_1,
      'ATC_Code_2': this.productdetailsForm.value.ATC_Code_2,
      'VolumeID': this.productdetailsForm.value.Volume,
      'Unit_of_volume_IDID': this.productdetailsForm.value.Unit_of_volume_ID,
      'Package_type_IDID': this.productdetailsForm.value.Package_type_ID,
      'Package_size': this.productdetailsForm.value.Package_size,
      'price': this.productdetailsForm.value.Public_price_SAR,
      'BarCode': this.productdetailsForm.value.barcode,
      'Remarks': this.productdetailsForm.value.Remarks,
      'AlerQty': this.productdetailsForm.value.Alertquantity,
      'GenericName': this.productdetailsForm.value.genericname,
      'Unit_of_strength_ID': this.productdetailsForm.value.Unitofstrength,
      'Dosage_Form_ID': this.productdetailsForm.value.Dosageform,
      'Route_of_Administration_ID': this.productdetailsForm.value.Routeofadministration,
      'Legal_status_ID': this.productdetailsForm.value.Legalstatus,
      'Product_control_ID': this.productdetailsForm.value.productcontrol,
      'Shelf_life_mon_ID': "1",
      'Storage_conditions_ID': "5",//this.productForm.value.Storageconditions,
      'Manufacturer_name_ID': this.productdetailsForm.value.Manucfacturename,
      'Country_of_Manufacturer_ID': this.productdetailsForm.value.Countryofmanufacture,
      'Marketing_Company_ID': this.productdetailsForm.value.Marketingcompany,
      'Nationality_ID': this.productdetailsForm.value.Nationality,
      'MAH_Agent_name_ID': this.productdetailsForm.value.Mah,
      'Authorization_status_ID': this.productdetailsForm.value.Authorizationstatus,
      'Marketing_status_ID': this.productdetailsForm.value.Marketingstatus,
    }
    console.log(body);

    let url = "https://api.oclinico.com/PharmacyAPI/api/product-details/update-product"

    this.http.post(url, body).map(res => res.json()).subscribe(res => {
      this.result = res;

      if (this.result.Result == true) {
        console.log("Success");

        // this.id=null;

        this.alertMsg("Updated Successfully");
        this.submitted = false;
        this.productdetailsForm.reset();
        $('#update').hide();
        $('#save').show();
        this.tablegrid();
      } else {
        if (res.status_cd == "1")
          console.log("Update Failed :" + this.result.message)
      }
    }
      , (err) => { console.log("Error: " + err); }
    );
  }


  delete(id: any) {
    var result = confirm(" Are you sure you want to delete");
    if (result == true) {


      let url = 'https://api.oclinico.com/PharmacyAPI/api/product-details/delete-product/'
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      let options = new RequestOptions({ headers: headers });


      this.http.post(url + id, options).map(res => res.json()).subscribe(res => {
        if (res.Result == true) {
          alert('Successfully delete')

          this.tablegrid();

        }
        else {
          console.log('error delete')
        }
      })

    }

  }


  Volume() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/4"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name = res.data;
      }
    })

  }
  Unit_of_volume_ID() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/4"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name1 = res.data;
      }
    })

  }


  Package_type_ID() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/5"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name2 = res.data;
      }
    })

  }




  manufacturename() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/manufacturer/get-all-Manufacturers/"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name3 = res.data;
      }
    })

  }
  nationality() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/13"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name4 = res.data;
      }
    })

  }
  markitingstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/16"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name5 = res.data;
      }
    })

  }
  routeofadmin() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/3"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name6 = res.data;
      }
    })

  }
  countryofmanufacture() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/11"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name7 = res.data;
      }
    })

  }
  mah() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/14"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name8 = res.data;
      }
    })

  }
  legalstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/6"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name9 = res.data;
      }
    })

  }
  storagecondition() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/9"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name10 = res.data;
      }
    })

  }
  markitingcompany() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/12"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name11 = res.data;
      }
    })

  }
  authorazationstatus() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/16"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name12 = res.data;
      }
    })
  }

  public extractSuggestedTexts() {
    let val = this.s.genericname.value;
    this.GenericName = [];
    this.suggestedTexts = [];
    this.Services.getGeneric(val, res => {
      this.GenericName = res.GenericName;
      if (this.s.genericname.value !== "") {
        this.suggestedTexts = this.GenericName.filter(e => e.GenericName.toLowerCase().indexOf(this.s.genericname.value.toLowerCase()) > -1);
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
    this.productdetailsForm.get('genericname').setValue(data.GenericName);
  }
}
