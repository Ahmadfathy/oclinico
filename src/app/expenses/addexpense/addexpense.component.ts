import { Component, OnInit, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {

  expenses: FormGroup;
  public titles: any = [{ 'value': '0', 'text': 'N/A' }, { 'value': '10', 'text': '10.0' }];
  table: any;
  tableexpenses: boolean = false;
  productsdata: any;
  editexpense: boolean = false;
  addexpense: boolean = false;
  ExpenseDate: string;
  expenseid: any;
  mnth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  itemcode1: any;
  unitcost1: any;
  quantity1: any;
  languageoption: any;
  submit_update: boolean = false;
  public langulagetype: any = 'us';
  public isPageloaderVisible = true;
  sample: any;
  datechanged:boolean = false;
  nodata:boolean = true;
  show:boolean = false;
  closeResult : string;
  ValidationMessages = {
    'expensedate': {
      'required': 'Please Select Expense Day'
    },
    'Vendor': {
      'required': 'Please Enter Vendor'
    },
    'Category': {
      'required': 'Please Enter Category'
    },
    'totalexpamount': {
      'required': 'Please Enter Total Expense Amount'
    },
    'tax': {
      'required': 'Please Select Tax'
    },
    'taxtotal': {
      'required': 'Please Enter Tax total'
    }
  }
  ArabicValidationMessages = {
    'expensedate': {
      'required': 'يرجى اختيار يوم حساب'
    },
    'Vendor': {
      'required': 'الرجاء إدخال البائع'
    },
    'Category': {
      'required': 'الرجاء إدخال الفئة'
    },
    'totalexpamount': {
      'required': 'الرجاء إدخال مبلغ المصروفات الإجمالي'
    },
    'tax': {
      'required': 'يرجى اختيار الضريبة'
    },
    'taxtotal': {
      'required': 'الرجاء إدخال إجمالي الضريبة'
    }
  }

  formErrors = {
    'expensedate': '',
    'Vendor': '',
    'Category': '',
    'totalexpamount': '',
    'tax': '',
    'taxtotal': ''
  }

  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private fb: FormBuilder,
    private commonService: UserinfoService,
    private http: Http, private router: Router,
    private route: ActivatedRoute,
    private cmn: UserinfoService,
    public dateTimeAdapter: DateTimeAdapter<any>,
    private modalService: NgbModal
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
      //   this.formErrors = {
      //   'expensedate':'',
      //   'Vendor':'',
      //   'Category':'',
      //   'totalexpamount':'',
      //   'tax':'',
      //   'taxtotal':''
      // }
    });

  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    // console.log(event.key)
    // console.log(event.keyCode)
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      // console.log(event)
      // event.preventDefault();
      // let val = event.key
      // val = (event.key.substring(0,event.key.length - 1))
      // console.log(val)
      // this.expenses.patchValue({
      //   Vendor:val
      // })
    }
  }
  ngOnInit() {
    // console.log(new Date())
    this.cmn.currentMessagecat.subscribe(message => {
      console.log(message);
      if(message == 'uid_sa'){
      this.dateTimeAdapter.setLocale('ar-AE');
      }else{
      this.dateTimeAdapter.setLocale('en-US');
      }
      })

    this.expenses = this.fb.group({
      expensedate: ['', [Validators.required]],
      Vendor: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      totalexpamount: ['', [Validators.required]],
      tax: ['Select', [this.dropdowncnd()]],
      taxtotal: ['', [Validators.required]],
      notes: [],
      expenseEdit: this.fb.array([]),
    });

    this.expenses.valueChanges.subscribe((data) => {
      this.CheckValidationErrors(this.expenses);

      let len = this.expenses.value.totalexpamount;
      // console.log(len)
      // console.log(this.expenses)

    });

    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'))
      this.expenseid = params.get('id');
      if (this.expenseid) {
        this.get_expense_data(this.expenseid);
        this.editexpense = true;
        this.addexpense = false;
      } else {
        this.isPageloaderVisible = false;
        this.addexpense = true;
        this.editexpense = false;
        this.expenses.patchValue({
          'expensedate': new Date()
        })
      }
    })
  }

  eventhandler(event) {
    // console.log(event.srcElement.id)
    if (event.srcElement.id == 'vendor') {
      console.log(event.keyCode)
      let val = event.target.value
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        event.preventDefault();
      }
      if((event.keyCode < 106 && event.keyCode > 95)){
        event.preventDefault();
      }else{
       
      }
      if (event.keyCode == 8) {
        val = (val.substring(0, val.length - 1))
        this.expenses.patchValue({
          Vendor: val
        })
      }
    }
    if (event.srcElement.id == 'category') {
      let val = event.target.value
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        event.preventDefault();
      }
      if((event.keyCode < 106 && event.keyCode > 95)){
        event.preventDefault();
      }else{
       
      }
      if (event.keyCode == 8) {
        val = (val.substring(0, val.length - 1))
        this.expenses.patchValue({
          Category: val
        })
      }
    }
    if (event.srcElement.id == 'totalexpense') {
       console.log(event.keyCode)
      let val = event.target.value
      if ((val.length >= 5) || (event.keyCode < 48 || event.keyCode > 57) ) {
        // console.log('prevent')
        if ( event.keyCode == 190 || event.keyCode == 110 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) {

        } else {
          console.log('prevent')
          if((event.keyCode < 106 && event.keyCode > 95 && val.length < 5)){

          }else{
            event.preventDefault();
          }
        }

      }
      if (event.keyCode == 8 && (val.length <= 5)) {
        val = (val.substring(0, val.length - 1))
        this.expenses.patchValue({
          totalexpamount: val
        })
      }

    }
    if (event.srcElement.id == 'taxTotal') {
      let val = event.target.value
      if ((val.length >= 5) || (event.keyCode < 48 || event.keyCode > 57)) {
        if (event.keyCode == 190 || event.keyCode == 110 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) {

        } else {
          if((event.keyCode < 106 && event.keyCode > 95 && val.length < 5)){

          }else{
            event.preventDefault();
          }
        }

      }
      if (event.keyCode == 8 && (val.length <= 5)) {
        val = (val.substring(0, val.length - 1))
        this.expenses.patchValue({
          taxtotal: val
        })
      }
    }
   
  }

  eventhandler1(event,index){
    if((event.srcElement.id == 'unitCost')){
      console.log(index)
      let val = event.target.value
      if((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || (event.keyCode < 106 && event.keyCode > 95)){

      }else{
        event.preventDefault();
      }
      if(event.keyCode == 8) {
        val = (val.substring(0, val.length - 1))
       console.log(((this.expenses.get('expenseEdit') as FormArray).at(index) as FormGroup).get('unitcost').patchValue(val));
       ((this.expenses.get('expenseEdit') as FormArray).at(index) as FormGroup).get('unitcost').patchValue(val)
      }
       

    }
    if(event.srcElement.id == 'Quantity'){
      console.log(event.keyCode)
      let val = event.target.value;
      if((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || (event.keyCode < 106 && event.keyCode > 95)){

      }else{
        event.preventDefault();
      }
      if(event.keyCode == 8){
        val = val.substring(0,val.length - 1);
        ((this.expenses.get('expenseEdit') as FormArray).at(index) as FormGroup).get('quantity').patchValue(val);
      }
    }
  }
  // taxamount(event) {
  //   // console.log(event.target.value)
  //   this.expenses.patchValue({
  //     'taxtotal': event.target.value * this.expenses.value.tax
  //   })
  // }
  // taxamountselect(event) {
  //    console.log(event.target.value)
  //    if(event.target.value == 0){
  //     this.expenses.patchValue({
  //       'taxtotal': this.expenses.value.totalexpamount
  //     })
  //    }else{
  //      let total = (event.target.value/100) * this.expenses.value.totalexpamount;
  //     this.expenses.patchValue({
  //       'taxtotal': total + this.expenses.value.totalexpamount
  //     })
  //    }
  
  // }
  taxamount(event) {
    if (this.expenses.value.tax == 0) {
    this.expenses.patchValue({
    'taxtotal': 0
    })
    } else {
    let total = (this.expenses.value.tax / 100) * event.target.value;
    total = parseFloat(total.toFixed(2)) ;
    this.expenses.patchValue({
    'taxtotal': total
    })
    }
    }
    taxamountselect(event) {
    if (event.target.value == 0) {
    this.expenses.patchValue({
    'taxtotal': 0
    })
    } else {
    let total = (event.target.value / 100) * this.expenses.value.totalexpamount;
    total = parseFloat(total.toFixed(2)); 
    this.expenses.patchValue({
    'taxtotal': total
    })
    }
    }

  dropdowncnd() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // console.log(control.value)
      const t = control.value;
      if ((t == 'Select')) {
        return { 'required': true };
      } else {
        return null;
      }
    }
  }

  addproducts() {
    // console.log("adding")
    let rows = <FormArray>this.expenses.get('expenseEdit');
    rows.push(this.fb.group({
      products: 'Select',
      unitcost: [],
      quantity: []
    }));
  }
  //or7721mn-011a
  removeproducts(selectedindex: number): void {
    (<FormArray>this.expenses.get('expenseEdit')).removeAt(selectedindex);
  }

  get_expense_data(id) {

    console.log(id)
    var accessToken=  window.localStorage.Tokenval;
      // console.log(accessToken);

      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/Expense_Operations';

      let body = {
        "Clinicid": window.localStorage.getItem("userId"),
        "Branchid": "",
        "Expense_Id": id,
        "Expense_date": "",
        "Vendor": "",
        "Category": "",
        "Sub_total": "",
        "Tax": "",
        "Total_Expense_Amount": "",
        "Notes": "",
        "expense_products": "",
        "Status": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_Updated": "",
        "Item_code": "",
        "Unitcost": "",
        "Qty": "",
        "Flag": "",
        "Condtion": "Get_Data"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        this.isPageloaderVisible = false;
        if (res.status_cd == '1') {
          this.nodata = true;
          this.show = false;
          if (res.data.Table[0].ExpenseDate != "") {
            let r1 = res.data.Table[0].ExpenseDate.split("/")[0];
            let r2 = res.data.Table[0].ExpenseDate.split("/")[1];
            let r3 = res.data.Table[0].ExpenseDate.split("/")[2];
            this.ExpenseDate = r3 + "-" + r2 + "-" + r1;
          }

          this.expenses.patchValue({
            'Vendor': res.data.Table[0].Vendor,
            'Category': res.data.Table[0].Category,
            'totalexpamount': res.data.Table[0].Amount,
            'tax': res.data.Table[0].Tax,
            'taxtotal': res.data.Table[0].Sub_total,
            'notes': res.data.Table[0].Notes,
            'expensedate': this.ExpenseDate
          });
        }else{
          this.nodata = false;
          this.show = true;
        }
        if (res.data.Table1.length !== 0) {
          if ((res.status_cd == '1')) {
            this.getproducts_data();
            this.tableexpenses = true;
            this.table = res.data.Table1;
            let rows = <FormArray>this.expenses.get('expenseEdit');
            this.table.forEach(data => {
              rows.push(this.fb.group({
                products: data.Products,
                unitcost: data.Unitcost,
                quantity: data.Quantity
              }));
            })
          } else {
            this.tableexpenses = false;
          }
        }


      })

      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      }
    
  }

  getproducts_data() {
    var accessToken=  window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/Expense_Operations';

      let body = {
        "Clinicid": window.localStorage.getItem("userId"),
        "Branchid": "",
        "Expense_Id": "",
        "Expense_date": "",
        "Vendor": "",
        "Category": "",
        "Sub_total": "",
        "Tax": "",
        "Total_Expense_Amount": "",
        "Notes": "",
        "expense_products": "",
        "Status": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_Updated": "",
        "Item_code": "",
        "Unitcost": "",
        "Qty": "",
        "Flag": "",
        "Condtion": "Get_Products"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == '1') {
          this.productsdata = res.data.Table;
        }
      })

      err => {
        console.log("Token Error:" + err);
      }
  
  }

  CheckValidationErrors(group: FormGroup = this.expenses): void {
    //console.log(Object.keys)

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.submit_update === true) {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          if (this.langulagetype == "EN") {
            const message = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += message[errorKey] + '';
              }
            }
          } else if (this.langulagetype == 'AR') {
            const message = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += message[errorKey] + '';
              }
            }
          }

        }
      } else {

        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          if (this.langulagetype == "EN") {
            console.log(key)
            const message = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log(errorKey)
              if (errorKey) {
                this.formErrors[key] += message[errorKey] + '';
              }
            }
          } else if (this.langulagetype == 'AR') {
            const message = this.ArabicValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log(errorKey)
              if (errorKey) {
                this.formErrors[key] += message[errorKey] + '';
              }
            }
          }

        }
      }

    });

  }

  cancle() {
    this.router.navigate(['/expenses'])
  }

  datechange() {
    console.log('date changed')
    this.datechanged = true;
  }

  update(content1) {
    let itemcode = [];
    let unitcost = [];
    let quantity = [];
    console.log(this.expenses.value.expensedate)
    if (this.expenses.valid == true) {
      this.submit_update = false;
      for (let i = 0; i < this.expenses.value.expenseEdit.length; i++) {
        itemcode.push(this.expenses.value.expenseEdit[i].products);
        unitcost.push(this.expenses.value.expenseEdit[i].unitcost);
        quantity.push(this.expenses.value.expenseEdit[i].quantity);
      }

      this.itemcode1 = itemcode.toString();
      this.unitcost1 = unitcost.toString();
      this.quantity1 = quantity.toString();

      // if (this.expenses.value.expensedate.search('-') != '-1') {
        
      // } else {
      
      // }

      if(this.datechanged == true){
        this.datechanged = false;
        let mn = this.expenses.value.expensedate.getMonth();
        console.log(this.mnth[mn])
        this.ExpenseDate = this.expenses.value.expensedate.getDate() + "/" + this.mnth[mn] + "/" + this.expenses.value.expensedate.getFullYear();
      }else{
        let y = this.expenses.value.expensedate.split("-")[0];
        let m = this.expenses.value.expensedate.split("-")[1];
        let d = this.expenses.value.expensedate.split("-")[2];
       
        if(m.charAt(0) == '0'){
          m = m.substr(1)-1;
        }else{
          m = m-1;
        }
        // console.log(m )
        // console.log(this.mnth[m])
        this.ExpenseDate = d + "/" +this.mnth[m] + "/" + y;
      }


      console.log(this.ExpenseDate)
      var accessToken=  window.localStorage.Tokenval;

        // our service calling as usual
        let url = this.commonService.commonUrl+'Account/Expense_Operations';
        console.log(this.itemcode1, this.unitcost1, this.quantity1)
        let body = {
          "Clinicid": window.localStorage.getItem("userId"),
          "Branchid": window.localStorage.getItem("userId"),
          "Expense_Id": this.expenseid,
          "Expense_date": this.ExpenseDate,
          "Vendor": this.expenses.value.Vendor,
          "Category": this.expenses.value.Category,
          "Sub_total": this.expenses.value.taxtotal,
          "Tax": this.expenses.value.tax,
          "Total_Expense_Amount": this.expenses.value.totalexpamount,
          "Notes": this.expenses.value.notes,
          "expense_products": "",
          "Status": "Active",
          "Loginid": window.localStorage.getItem("userId"),
          "Trans_date": "",
          "Last_Updated": "",
          "Item_code": this.itemcode1,
          "Unitcost": this.unitcost1,
          "Qty": this.quantity1,
          "Flag": "",
          "Condtion": "UpdateExpense"
        }
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
          console.log(res)
          this.isPageloaderVisible = false;
          if (res.status_cd == '1') {
            this.modalService.open(content1);
            this.router.navigate(['/expenses'])
          }
        })

        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);
        }
     

    } else {
      this.submit_update = true;
      this.isPageloaderVisible = false;
      this.CheckValidationErrors(this.expenses);
    }


  }
  submit(content) {
    console.log(this.expenses.value.expensedate)
    console.log(this.expenses.value.expensedate.getDate())
    console.log(this.expenses.value.expensedate.getMonth())
    console.log(this.expenses.value.expensedate.getFullYear())
    let mn = this.expenses.value.expensedate.getMonth();
    console.log(this.mnth[mn])
    console.log(this.expenses.valid)
    if (this.expenses.valid == true) {
      this.submit_update = false;
      // let y = this.expenses.value.expensedate.split("/")[0];
      // let m = this.expenses.value.expensedate.split("/")[1];
      // let d = this.expenses.value.expensedate.split("/")[2];
      this.ExpenseDate = this.expenses.value.expensedate.getDate() + "/" + this.mnth[mn] + "/" + this.expenses.value.expensedate.getFullYear();
      console.log(this.ExpenseDate)
    
      var accessToken=  window.localStorage.Tokenval;
        console.log(accessToken);

        // our service calling as usual
        let url = this.commonService.commonUrl+'Account/Expense_Operations';

        let body = {
          "Clinicid": window.localStorage.getItem("userId"),
          "Branchid": window.localStorage.getItem("userId"),
          "Expense_Id": "",
          "Expense_date": this.ExpenseDate,
          "Vendor": this.expenses.value.Vendor,
          "Category": this.expenses.value.Category,
          "Sub_total": this.expenses.value.taxtotal,
          "Tax": this.expenses.value.tax,
          "Total_Expense_Amount": this.expenses.value.totalexpamount,
          "Notes": this.expenses.value.notes,
          "expense_products": "",
          "Status": "Active",
          "Loginid": window.localStorage.getItem("userId"),
          "Trans_date": "",
          "Last_Updated": "",
          "Item_code": "",
          "Unitcost": "",
          "Qty": "",
          "Flag": "",
          "Condtion": "Insert"
        }
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
          console.log(res)
          this.isPageloaderVisible = false;
          if (res.status_cd == '1') {
            this.modalService.open(content);
            this.router.navigate(['/expenses'])
          }
        });

        err => {
          this.isPageloaderVisible = false;
          console.log("Token Error:" + err);
        }
  
    } else {
      this.submit_update = true;
      this.isPageloaderVisible = false;
      this.CheckValidationErrors(this.expenses);
    }

  }

  open(content) {
    console.log(content)
    
    this.modalService.open(content).result.then((result) => {
    console.log(result)
    if (result == "Ok click") {
    console.log("ok")
    }
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    }
    
    private getDismissReason(reason: any): string {
    console.log(reason)
    if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
    } else {
    return `with: ${reason}`;
    }
    }
}
