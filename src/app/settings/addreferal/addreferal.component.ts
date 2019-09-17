import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-addreferal',
  templateUrl: './addreferal.component.html',
  styleUrls: ['./addreferal.component.css']
})

export class AddreferalComponent implements OnInit {
  nullValue: any;
  companyname = this.nullValue;
  contatperson = this.nullValue;
  address = this.nullValue;
  city = this.nullValue;
   phoneno = this.nullValue;
  emailid = this.nullValue;
  addreferal: FormGroup;
  addreferalobj: any = [];
  selcheckval:any;
  languageoption:any;
  public isPageloaderVisible = false;

  ValidationMessages = {
    'companyname': {
      'required': 'Please enter company name',
     },
    'contatperson': {
      'required': 'Please enter contact Person',
     },
    'address': {
      'required': 'Please enter address',
     },
    'city': {
      'required': 'Please enter city',
     },
    'phoneno': {
      'required': 'Please enter phone no',
        'minlength':'Phone no should not be less than 10 digits',
        'maxlength':'Phone no should not exceed 15 digits.'
     },
    'emailid': {
      'required': 'Please enter email id',
      'email':'please enter valid email id'
     }
   
    
  }
  ValidationMessagesarabic = {
    'companyname': {
      'required': 'الرجاء إدخال اسم الشركة',
     },
    'contatperson': {
      'required': 'الرجاء إدخال شخص للتواصل',
     },
    'address': {
      'required': 'الرجاء ادخال العنوان',
     },
    'city': {
      'required': 'الرجاء ادخال المدينة',
     },
    'phoneno': {
      'required':  'الرجاء إدخال رقم الهاتف',
      'minlength':'رقم الجوال يجب ألا يقل عن 10 أرقام',
      'maxlength':'رقم الجوال يجب ألا يتجاوز 15 رقمًا'
     },
    'emailid': {
      'required': 'الرجاء إدخال  البريد الإلكتروني',
      'email':'الرجاء إدخال بريد إلكتروني صحيح'
     }
   
    
  }
  formErrors = {
    'companyname': '',
    'contatperson': '',
    'address': '',
    'city': '',
    'phoneno': '',
    'emailid': '',
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
       document.title="Add Referal"
       
    this.userid =  window.localStorage.getItem("userId")
    
    this.commonService.currentMessagecat.subscribe(message => {
        console.log(message);
        this.languageoption = message.split("_")[1];
        console.log(this.languageoption);
       this. formErrors = {
          'companyname': '',
          'contatperson': '',
          'address': '',
          'city': '',
          'phoneno': '',
          'emailid': '',
        }
    })
   

      this.addreferal = this.fb.group({
        companyname:['',[Validators.required]],
        contatperson:['',[Validators.required]],
        address:['',[Validators.required]],
        city:['',[Validators.required]],
        phoneno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
        //emailid:['',[Validators.required,Validators.email]],
        emailid:['',[Validators.required,Validators.email]],
       
      });

      this.addreferal.valueChanges.subscribe((data) => {
          this.checkValidationErrors(this.addreferal);
      });



  }
  keyPressphoneno(event: any) {
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

  checkValidationErrors(group: FormGroup = this.addreferal): void {
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
  checkValidationErrorssubmit(group: FormGroup = this.addreferal): void {

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





addrefcancle(){
 this.router.navigate(['/ReferralMasterDetails']);
}
addreferalsubmit(){
  //alert("sample");

  // if( this.addreferal.value.companyname==""){
  //   alert("sample");
  // }
console.log(this.addreferal.valid)
if(this.addreferal.valid==false){
  this.checkValidationErrorssubmit(this.addreferal);
}else{
   console.log(this.addreferal.value.companyname);
  console.log(this.addreferal.value.contatperson);
  console.log(this.addreferal.value.address);
  console.log(this.addreferal.value.city);
  console.log(this.addreferal.value.phoneno);
  console.log(this.addreferal.value.emailid);
    this.isPageloaderVisible=true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Master_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Master_Details";
    let params = {
      "Sno":"", 
      "Referral_ID":"",
      "Company_Name":this.addreferal.value.companyname,
      "Address":this.addreferal.value.address,
      "City":this.addreferal.value.city,
      "PhoneNo":this.addreferal.value.phoneno,
      "EmailID":this.addreferal.value.emailid,
      "TransDate":"",
      "Loginid":this.userid,
      "Clinicid":this.userid,
      "Condition":"Insert",
      "Contact_person":this.addreferal.value.contatperson,
      "Status":"Active",
      "Branch_ID":"",
      "pagecount":""
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
                  this.router.navigate(['/ReferralMasterDetails']);
              
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
  // console.log(this.addreferal.value.companyname);
  // console.log(this.addreferal.value.contatperson);
  // console.log(this.addreferal.value.address);
  // console.log(this.addreferal.value.city);
  // console.log(this.addreferal.value.phoneno);
  // console.log(this.addreferal.value.emailid);
  // var obj = {
  //   companyname: this.addreferal.value.companyname, 
  //   contactperson: this.addreferal.value.contatperson, 
  //   address: this.addreferal.value.address, 
  //   city: this.addreferal.value.city,
  //   phoneno:this.addreferal.value.phoneno,
  //   emailid: this.addreferal.value.emailid, 
  // };
  // this.addreferalobj.push(obj);
  // console.log(this.addreferalobj);

 // this.checkValidationErrors(this.addreferal);
}

}
