import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addsmspackages',
  templateUrl: './addsmspackages.component.html',
  styleUrls: ['./addsmspackages.component.css']
})
export class AddsmspackagesComponent implements OnInit {
  nullValue: any;
  packagename = this.nullValue;
  packageprice = this.nullValue;
  qty = this.nullValue;
  paymentmode = this.nullValue;
  addsmspackage: FormGroup;
  select : string = 'Select'
  packnamearray:any=[];
  paymentmodearray:any=[];
  packnameval:any;
  packid:any;
  languageoption:any;
  public isPageloaderVisible = false;
  ValidationMessages = {
    
    'packagename': {
      'required': 'Please select package name',
      'Select':'Please select package name'
    },
    'packageprice':{
      'required':'Please enter package price' 
    },
    'qty':{
      'required':'Please enter quantity' 
    },
    'paymentmode': {
      'required': 'Please select payment mode',
      'Select':'Please select payment mode'
    },
  
    
  }
  ValidationMessagesarabic = {
    
    'packagename': {
      'required': 'الرجاء اختيار اسم الباقة',
      'Select':'الرجاء اختيار اسم الباقة'
    },
    'packageprice':{
      'required':'الرجاء إدخال سعر الباقة' 
    },
    'qty':{
      'required':'الرجاء إدخال الكمية' 
    },
    'paymentmode': {
      'required': 'الرجاء اختيار طريقة الدفع',
      'Select':'الرجاء اختيار طريقة الدفع'
    },
  
    
  }
  formErrors = {
    'packagename':'',
    'packageprice':'',
    'qty':'',
    'paymentmode':'',
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
          document.title="Add SMS package";
    this.userid =  window.localStorage.getItem("userId");
    
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
      'packagename':'',
      'packageprice':'',
      'qty':'',
      'paymentmode':'',
      }
  })

    this.addsmspackage = this.fb.group({
      packagename:['select',[Validators.required,CustomValidators.Select('select')]],
      packageprice:['',[Validators.required]],
      qty:['',[Validators.required]],
      paymentmode:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addsmspackage.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addsmspackage);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  
this.getpackagenames();
this.getpaymentmodes();
  }

  getpackagenames(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/inserPaymentDetails";
      let serviceUrl = this.commonService.commonUrl+"Account/inserPaymentDetails";
      let params = {
              "sno":this.userid,
              "PaymentId":"",       
              "PatientId":"",      
              "HICAPS":"", 
              "Creditcard":"", 
              "EFTPOS":"",
              "Cash":"", 
              "Other":"", 
              "Notes":"",
              "Total":"",
              "Trans_date":"",
              "payment_dttime":"",
              "param1":"",
              "param2":"",
              "operation":"getsmspackage"
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                 this.packnamearray = result.data.Table;
                 console.log(this.packnamearray );
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
  }

  typechange(event){
    console.log(event);
    var str =event.target.value;
    console.log(str);
   this.packid  = str.split(":")[1];
   console.log(this.packid);
   this.getpackinfo(this.packid);
 }

 getpackinfo(pid){
   console.log(pid);
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/inserPaymentDetails";
      let serviceUrl = this.commonService.commonUrl+"Account/inserPaymentDetails";
      let params = {
        "sno":"" ,
        "PaymentId":pid.trim(),       
        "PatientId":"",      
        "HICAPS":"", 
        "Creditcard":"", 
        "EFTPOS":"",
        "Cash":"", 
        "Other":"", 
        "Notes":"",
        "Total":"",
        "Trans_date":"",
        "payment_dttime":"",
        "param1":"",
        "param2":"",
        "operation":"getPricebasedonpak"
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                  this.packnameval=result.data.Table[0].PackageName;
                  console.log(this.packnameval);
                  this.addsmspackage.patchValue({
                    packageprice:result.data.Table[0].Price,
                    qty:result.data.Table[0].Qty,
                  });
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
  }
  getpaymentmodes(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/inserPaymentDetails";
      let serviceUrl = this.commonService.commonUrl+"Account/inserPaymentDetails";
      let params = {
        "sno":this.userid,
        "PaymentId":"",       
        "PatientId":"",      
        "HICAPS":"", 
        "Creditcard":"", 
        "EFTPOS":"",
        "Cash":"", 
        "Other":"", 
        "Notes":"",
        "Total":"",
        "Trans_date":"",
        "payment_dttime":"",
        "param1":this.userid,
        "param2":"",
        "operation":"getpaymodes"
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                 this.paymentmodearray = result.data.Table;
                 console.log(this.paymentmodearray );
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      // },
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
  }
  checkValidationErrors(group: FormGroup = this.addsmspackage): void {
  
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
          console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }else{
        const messages = this.ValidationMessagesarabic[key];
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
     checkValidationErrorssubmit(group: FormGroup = this.addsmspackage): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
         if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }else{
          const messages = this.ValidationMessagesarabic[key];
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



   smspackagecancle(){
    this.router.navigate(['/SMSpackages']);
   }
   smspackagesbmit(){

  console.log(this.addsmspackage.valid)
  if(this.addsmspackage.valid==false){
    this.checkValidationErrorssubmit(this.addsmspackage);
  }else{
    console.log(this.addsmspackage.value.packagename);
    console.log(this.addsmspackage.value.packageprice);
    console.log(this.addsmspackage.value.qty);
    console.log(this.addsmspackage.value.paymentmode);
    this.isPageloaderVisible=true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/inserPaymentDetails";
    let serviceUrl = this.commonService.commonUrl+"Account/inserPaymentDetails";
    let params = {
      "sno":"" ,
      "PaymentId":this.userid, 
      "PatientId":this.userid, 
      "HICAPS":"",
      "Creditcard":this.userid,
      "EFTPOS":"",
      "Cash":this.packnameval,
      "Other":this.addsmspackage.value.packageprice,
      "Notes":this.addsmspackage.value.paymentmode,
      "Total":this.addsmspackage.value.qty,
      "Trans_date":"",
      "payment_dttime":"",
      "param1":"",
      "param2":"",
      "operation":"insertClinickwisepakage"
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible=false;
                  alert("Inserted Successfully");
                  this.router.navigate(['/SMSpackages']);
              
              }else{
                this.isPageloaderVisible=false;
              // this.hideLoader=true;
                console.log(result.error_msg);
                console.log(accessToken);
              }
            },
            error=>{
              this.isPageloaderVisible=false;
           //  this.hideLoader=true;
              console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );
  
    // },
    // err=>{
    //   this.isPageloaderVisible=false;
    // console.log("Token Error:"+err);
    // }
    
    // );
  
  
  }
  }

}
