import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-editreferralsettings',
  templateUrl: './editreferralsettings.component.html',
  styleUrls: ['./editreferralsettings.component.css']
})
export class EditreferralsettingsComponent implements OnInit {
  nullValue: any;
  companyname = this.nullValue;
  contatperson = this.nullValue;
  address = this.nullValue;
  city = this.nullValue;
  phoneno = this.nullValue;
  emailid = this.nullValue;
  editreferal: FormGroup;
  referalid:any;
  referaldetails = [];
  languageoption:any;
  public isPageloaderVisible = true;
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
      'required': 'الرجاء إدخال رقم الهاتف',
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
  userid: any ="";
  constructor(
    private meta: Meta,  private router: Router,
    private MainTitle: Title,
    private fb: FormBuilder,public commonService:UserinfoService,public https: Http,
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    document.title="Edit Referal"
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
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.referalid = currentUrl[currentUrl.length - 1]
    console.log(this.referalid);
this.bindreferaldata();
    this.editreferal = this.fb.group({
      companyname:['',[Validators.required]],
      contatperson:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      phoneno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
      //emailid:['',[Validators.required,Validators.email]],
      emailid:['',[Validators.required,Validators.email]],
     
    });

    this.editreferal.valueChanges.subscribe((data) => {
        this.checkValidationErrors(this.editreferal);
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

  checkValidationErrors(group: FormGroup = this.editreferal): void {
    //aler("test");
        Object.keys(group.controls).forEach((key:string) => {
          const abstractControl = group.get(key);
          this.formErrors[key] = '';
    
          if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
            if(this.languageoption=="EN"||this.languageoption==undefined||this.languageoption=="undefined"){
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
  checkValidationErrorssubmit(group: FormGroup = this.editreferal): void {
    //aler("test");
        Object.keys(group.controls).forEach((key:string) => {
          const abstractControl = group.get(key);
          this.formErrors[key] = '';
    
          if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
            
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



    bindreferaldata(){
      // this.commonService.tokenFun().subscribe(tokenResult =>{
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        
        // our service calling as usual
    
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Master_Details";

        let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Master_Details"

        let params = {
          "Sno":this.referalid, 
          "Referral_ID":"",
          "Company_Name":"",
          "Address":"",
          "City":"",
          "PhoneNo":"",
          "EmailID":"",
          "TransDate":"",
          "Loginid":"",
          "Clinicid": this.userid ,
          "Condition":"GetData",
          "Contact_person":"",
          "Status":"",
          "Branch_ID":"",
          "pagecount":""
                }
          
                let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken});
                                      
                let options = new RequestOptions({ headers : headers });
               // this.PArray=[];
                this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                  console.log(result);
                  
                  if(result.status_cd === "1"){
                    this.isPageloaderVisible=false;
                   // this.referaldetails = result.data;
                   console.log(result.data.Table[0].Company_Name);
                   this.editreferal.patchValue({
                     
                    companyname:result.data.Table[0].Company_Name,
                    contatperson:result.data.Table[0].Contact_person,
                    address:result.data.Table[0].Address,
                    city:result.data.Table[0].City,
                    phoneno:result.data.Table[0].PhoneNo,
                    emailid:result.data.Table[0].EmailID,



                  });
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


editreferalcancle(){
  this.router.navigate(['/ReferralMasterDetails'])
}


    editreferalsubmit(){
      //alert("sample");
    
      // if( this.addreferal.value.companyname==""){
      //   alert("sample");
      // }
    console.log(this.editreferal.valid)
    if(this.editreferal.valid==false){
      this.checkValidationErrorssubmit(this.editreferal);
    }else{
      console.log(this.editreferal.value.companyname);
      console.log(this.editreferal.value.contatperson);
      console.log(this.editreferal.value.address);
      console.log(this.editreferal.value.city);
      console.log(this.editreferal.value.phoneno);
      console.log(this.editreferal.value.emailid);
      this.isPageloaderVisible=true;
      // this.commonService.tokenFun().subscribe(tokenResult =>{
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
      var accessToken=window.localStorage.Tokenval;
        console.log(accessToken);
        
        // our service calling as usual
    
        // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Master_Details";
        let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Master_Details"
        let params = {
          "Sno":this.referalid, 
          "Referral_ID":"",
          "Company_Name":this.editreferal.value.companyname,
          "Address":this.editreferal.value.address,
          "City":this.editreferal.value.city,
          "PhoneNo":this.editreferal.value.phoneno,
          "EmailID":this.editreferal.value.emailid,
          "TransDate":"",
          "Loginid": this.userid,
          "Clinicid": this.userid,
          "Condition":"Update",
          "Contact_person":this.editreferal.value.contatperson,
          "Status":"Active",
          "Branch_ID":"",
          "pagecount":""
                }
          
                let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken});
                                      
                let options = new RequestOptions({ headers : headers });
               // this.PArray=[];
                this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                  console.log(result);
                  
                  if(result.status_cd === "1"){
                    this.isPageloaderVisible=false;
                      alert("Updated successfully");
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
    
    
     // this.checkValidationErrors(this.addreferal);
    }
 
    
    

}
