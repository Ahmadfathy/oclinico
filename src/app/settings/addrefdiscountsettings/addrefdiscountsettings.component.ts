import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addrefdiscountsettings',
  templateUrl: './addrefdiscountsettings.component.html',
  styleUrls: ['./addrefdiscountsettings.component.css']
})
export class AddrefdiscountsettingsComponent implements OnInit {
  type: any = [];
  rdtype: any = [];
  refnames: any = [];
  typenames: any = [];
  typevalid:any;
  nullValue: any;
  refname = this.nullValue;
  seltype = this.nullValue;
  rname = this.nullValue;
  discount = this.nullValue;
  addrefdis: FormGroup;
  companyname = this.nullValue;
  selectedtype:any;
  select : string = 'Select';
  languageoption:any;
  public isPageloaderVisible = false;
  ValidationMessages = {
    
    'refname': {
      'required': 'Please select referral name',
      'Select':'Please select referral name'
    },
    'seltype': {
      'required': 'Please select type',
      'Select':'Please select type'
    },
    'rname': {
      'required': 'Please select name',
      'Select':'Please select name'
    },
    'discount': {
      'required': 'Please enter descount percentage'
    }
    
  }
  ValidationMessagesarabic = {
    
    'refname': {
      'required': 'الرجاء اختيار اسم الإحالة',
      'Select':'الرجاء اختيار اسم الإحالة'
    },
    'seltype': {
      'required': 'الرجاء اختيار النوع',
      'Select':'الرجاء اختيار النوع'
    },
    'rname': {
      'required': 'الرجاء اختيار الاسم',
      'Select':'الرجاء اختيار الاسم'
    },
    'discount': {
      'required': 'الرجاء إدخال نسبة الخصم'
    }
    
  }
  formErrors = {
   
    'refname':'',
    'seltype':'',
    'rname':'',
    'discount':'',
    
   }
  userid: any = "";

  constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
    document.title="Add Referral Discount";
    this.userid =  window.localStorage.getItem("userId");


    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
          'refname':'',
          'seltype':'',
          'rname':'',
          'discount':'',
      }
    })


    this.addrefdis = this.fb.group({
   
      // refname:['',[Validators.required]],
     // seltype:['',[Validators.required]],
     // rname:['',[Validators.required]],
     
      refname:['select',[Validators.required,CustomValidators.Select('select')]],
      seltype:['select',[Validators.required,CustomValidators.Select('select')]],
      rname:['select',[Validators.required,CustomValidators.Select('select')]],
      discount:['',[Validators.required]],
     
    });
    
    this.addrefdis.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addrefdis);
  });


  this.rdtype = [
    {
      typeval: "Appointment",
      typename: "Appointment",
    },
    {
      typeval: "Treatment",
      typename: "Treatment",
    },
    {
      typeval: "Service",
      typename: "Service",
    },
    {
      typeval: "Product",
      typename: "Product",
    }
    // 'test', 'test2', 'test3', 'test4'
  ];
  this.getrefnames();



  }

  keyPresspercent(event: any) {
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

  checkValidationErrors(group: FormGroup = this.addrefdis): void {
 // console.log("sdf");
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
     // console.log(abstractControl);
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
  checkValidationErrorssubmit(group: FormGroup = this.addrefdis): void {

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


getrefnames(){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details";
    let params = {
      "Sno":"",
      "Clinicid": this.userid ,
      "Branch_ID":"", 
      "Loginid":"", 
      "Referral_Dis_ID":"", 
      "Referral_ID":"", 
      "Service_ID":"",
      "Disc_Per":"",
      "Status":"", 
      "Trans_Date":"", 
      "pagecount":"", 
      "Condition":"GetReferrals",
      "Type":"" 
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              console.log(result);
              
              if(result.status_cd === "1"){
               this.refnames = result.data.Table;
               console.log(this.refnames );
              
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
   console.log(event.target.value);
   var str =event.target.value;
  this.typevalid  = str.split(":")[1];
  console.log(this.typevalid);
  this.gettypenames(this.typevalid);
}
gettypenames(typename){
 // alert(typename);
 //str.trim()
 this.selectedtype=typename.trim();
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details";
    let params = {
      "Sno":"",
      "Clinicid": this.userid ,
      "Branch_ID":"", 
      "Loginid":"", 
      "Referral_Dis_ID":"", 
      "Referral_ID":"", 
      "Service_ID":"",
      "Disc_Per":"",
      "Status":"", 
      "Trans_Date":"", 
      "pagecount":"", 
      "Condition":"GetTypes",
      "Type":this.selectedtype
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
            Accept : "application/json",
            Authorization : accessToken});
  
            let options = new RequestOptions({ headers : headers });
            // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            console.log(result);
            this.typenames=[];
            if(result.status_cd === "1"){
            this.typenames = result.data.Table;
           // console.log(this.refnames );

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
addrefdiscountcancle(){
  this.router.navigate(['/Referaldiscounts']);
 }
 addreferaldiscountsubmit(){
  //alert("sample");

  // if( this.addreferal.value.companyname==""){
  //   alert("sample");
  // }
console.log(this.addrefdis.valid)
if(this.addrefdis.valid==false){
  this.checkValidationErrorssubmit(this.addrefdis);
}else{
  console.log(this.addrefdis.value.refname);
  console.log(this.addrefdis.value.seltype);
  console.log(this.addrefdis.value.rname);
  console.log(this.addrefdis.value.discount);

this.isPageloaderVisible=true;

// this.commonService.tokenFun().subscribe(tokenResult =>{
//   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
var accessToken=window.localStorage.Tokenval;
//  console.log(accessToken);
  
  // our service calling as usual

  // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
  let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details";
  let params = {
    "Sno":"",
    "Clinicid": this.userid ,       
    "Branch_ID":"",      
    "Loginid":this.userid,        
    "Referral_Dis_ID":"",
    "Referral_ID":this.addrefdis.value.refname,    
    "Service_ID":this.addrefdis.value.rname,     
    "Disc_Per":this.addrefdis.value.discount,
    "Status":"Active",
    "Trans_Date":"",
    "pagecount":"",
    "Condition":"Insert",      
    "Type":this.addrefdis.value.seltype    
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
                this.router.navigate(['/Referaldiscounts']);
            
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