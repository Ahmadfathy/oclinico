import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addcashreceiptsettings',
  templateUrl: './addcashreceiptsettings.component.html',
  styleUrls: ['./addcashreceiptsettings.component.css']
})
export class AddcashreceiptsettingsComponent implements OnInit {
  nullValue: any;
  empname = this.nullValue;
  recptno = this.nullValue;
  cashtype = this.nullValue;
  amount = this.nullValue;
  notes = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  addcashreceipt: FormGroup;
  select : string = 'Select';
  languageoption:any;
  public isPageloaderVisible = false;
  //daysarr:any=[];
  ValidationMessages = {
    
    'empname': {
      'required': 'Please enter employee name'
    },
    'recptno': {
      'required': 'Please enter receipt number'
    },
    'cashtype': {
      'required': 'Please select cash type',
      'Select':'Please select cash type'
    },
    'amount': {
      'required': 'Please enter amount'
    },
    'notes': {
      'required': 'Please enter notes'
    },
  
    
  }

  ValidationMessagesarabic = {
    'empname': {
      'required': 'الرجاء إدخال اسم الموظف'
    },
    'recptno': {
      'required': 'الرجاء إدخال رقم الإيصال'
    },
    'cashtype': {
      'required': 'يرجى اختيار نوع المبلغ النقدي',
      'Select':'يرجى اختيار نوع المبلغ النقدي'
    },
    'amount': {
      'required': 'الرجاء إدخال المبلغ'
    },
    'notes': {
      'required': 'الرجاء إدخال الملاحظات'
    },
   
    
  }

  formErrors = {
   
    'empname':'',
    'recptno':'',
    'cashtype':'',
    'amount':'',
    'notes':'',
   }
  userid: string;
 
   constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    document.title ="Add CashReceipt";
    this.userid =  window.localStorage.getItem("userId");


    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
     this. formErrors = {
      'empname':'',
      'recptno':'',
      'cashtype':'',
      'amount':'',
      'notes':'',
      }
  })
    
    this.addcashreceipt = this.fb.group({
   
      empname:['',[Validators.required]],
      recptno:['',[Validators.required]],
      cashtype:['select',[Validators.required,CustomValidators.Select('select')]],
      amount:['',[Validators.required]],
      notes:['',[Validators.required]],
     
    });
    
    this.addcashreceipt.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addcashreceipt);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  

  }

  keyPressamnt(event: any) {
    console.log(event.keyCode)
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if(event.keyCode == 45 || event.keyCOde == 43){
      event.preventDefault();
    }
  }
  checkValidationErrors(group: FormGroup = this.addcashreceipt): void {
  
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
         // console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }else{
        const messages = this.ValidationMessagesarabic[key];
        for (const errorKey in abstractControl.errors) {
        //  console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }
         }
   
         if (abstractControl instanceof FormGroup) {
          // console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.addcashreceipt): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
         if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
           // console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }else{
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
           // console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
         }
   
         if (abstractControl instanceof FormGroup) {
          // console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }



   addcashreceiptcancle(){
    this.router.navigate(['/CashReceipts']);
   }
   addcashreceiptbmit(){

  console.log(this.addcashreceipt.valid)
  if(this.addcashreceipt.valid==false){
    this.checkValidationErrorssubmit(this.addcashreceipt);
  }else{

    // console.log(this.addcashreceipt.value.empname);
    // console.log(this.addcashreceipt.value.recptno);
    // console.log(this.addcashreceipt.value.cashtype);
    // console.log(this.addcashreceipt.value.amount);
    // console.log(this.addcashreceipt.value.notes);
    
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Laboratory_Cashreceipts_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/Laboratory_Cashreceipts_Details";
    let params = {
      "Sno":"",
      "Clinicid":this.userid,       
      "Branchid":"",      
      "Loginid":this.userid, 
      "ReceiptID":"", 
      "EmployeeID":this.addcashreceipt.value.empname,
      "ReceiptNo":this.addcashreceipt.value.recptno, 
      "Cash_type":this.addcashreceipt.value.cashtype, 
      "Amount":this.addcashreceipt.value.amount,
      "Notes":this.addcashreceipt.value.notes,
      "Trans_Date":"",
      "Status":"Active",
      "Condition":"Insert"
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              //console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                  alert("Inserted Successfully");
                  this.router.navigate(['/CashReceipts']);
              
              }else{
                this.isPageloaderVisible = false;
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              }
            },
            error=>{
              this.isPageloaderVisible = false;
           //  this.hideLoader=true;
              console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );
  
  //   },
  //   err=>{
  //     this.isPageloaderVisible = false;
  //  // console.log("Token Error:"+err);
  //   }
    
  //   );
  
  
  }
  }

}
