import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editrefdiscountsettings',
  templateUrl: './editrefdiscountsettings.component.html',
  styleUrls: ['./editrefdiscountsettings.component.css']
})
export class EditrefdiscountsettingsComponent implements OnInit {
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
  editrefdis: FormGroup;
  companyname = this.nullValue;
  refdiscountid:any;
  selectedtype:any;
 // select : any;
  select : string = 'Select';
  languageoption:any;
  public isPageloaderVisible = true;
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
    private meta: Meta, private router: Router,
    private MainTitle: Title,
    private fb: FormBuilder,public commonService:UserinfoService,public https: Http,
  ) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }


  ngOnInit() {
      document.title="Edit Referral Discount";
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


    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.refdiscountid = currentUrl[currentUrl.length - 1]
    console.log(this.refdiscountid);
this.bindreferaldiscountdata();

    this.type = ['test', 'test2', 'test3', 'test4'];

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
    
    ];
  //  this.getrefnames();
    this.editrefdis = this.fb.group({
     
     

      refname:['select',[Validators.required,CustomValidators.Select('select')]],
      seltype:['select',[Validators.required,CustomValidators.Select('select')]],
      rname:['select',[Validators.required,CustomValidators.Select('select')]],
      discount:['',[Validators.required]],
     
    });
    this.editrefdis.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editrefdis);
  });
  
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

  getrefnames(allvalues){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details"
      
      let params = {
        "Sno":"",
        "Clinicid":  this.userid,
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
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                 this.refnames = result.data.Table;
                 console.log(this.refnames );
                 this.editrefdis.patchValue({
                   
                 refname:allvalues.referalnameval
                  // seltype:result.data[0].Type,
                  // rname:result.data[0].Service_ID,
                //  discount:result.data[0].Disc_Per,
  
                
                  // this.gettypenames(result.data[0].Service_Name);
                  
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
  
  typechange(event){
     console.log(event.target.value);
     var str =event.target.value;
    this.typevalid  = str.split(":")[1];
    console.log(this.typevalid);
    this.gettypenames(this.typevalid,"");
  }
  gettypenames(typename,allValues){
   // alert(typename);
   //str.trim()
   this.selectedtype=typename.trim();
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details"
      let params = {
        "Sno":"",
        "Clinicid":this.userid,
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
              this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              console.log(result);
              this.typenames=[];
              if(result.status_cd === "1"){
              this.typenames = result.data.Table;
             // console.log(this.refnames );
            // alert(allValues.rnameval);
            //this.selectedtype=typename.trim();
             this.editrefdis.patchValue({
                   
              //  refname:allValues.referalnameval
               // seltype:result.data[0].Type,
                rname:allValues.rnameval
             //  discount:result.data[0].Disc_Per,

             
               // this.gettypenames(result.data[0].Service_Name);
               
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




  checkValidationErrors(group: FormGroup = this.editrefdis): void {

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

checkValidationErrorssubmit(group: FormGroup = this.editrefdis): void {

  Object.keys(group.controls).forEach((key:string) => {
    const abstractControl = group.get(key);
    this.formErrors[key] = '';

    if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
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
bindreferaldiscountdata(){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";

    let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details"
    
    let params = {
        "Sno":this.refdiscountid, 
        "Clinicid":this.userid,       
        "Branch_ID":"",      
        "Loginid":"",        
        "Referral_Dis_ID":"",
        "Referral_ID":"",    
        "Service_ID":"",     
        "Disc_Per":"",
        "Status":"",
        "Trans_Date":"",
        "pagecount":"",
        "Condition":"GetData",      
        "Type":"" 
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
              //  console.log(result.data[0].Company_Name);
               this.editrefdis.patchValue({
                 
                // refname:result.data[0].Referral_ID,
                seltype:result.data.Table[0].Type,
                // rname:result.data[0].Service_ID,
                discount:result.data.Table[0].Disc_Per,

              
                
              });
              var allValues = {
                referalnameval : result.data.Table[0].Referral_ID,
                seltypeval: result.data.Table[0].Type,
                rnameval: result.data.Table[0].Service_ID.trim(),
              }
              this.getrefnames(allValues);
              this.gettypenames(result.data.Table[0].Type,allValues);
              console.log(result.data.Table[0].Referral_ID);
              console.log(result.data.Table[0].Type);
              console.log(result.data.Table[0].Service_ID);
              console.log(result.data.Table[0].Disc_Per);
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
editrefdiscountcancle(){
  this.router.navigate(['/Referaldiscounts']);
 }
editreferaldiscountsubmit(){
    console.log(this.editrefdis.valid)
    if(this.editrefdis.valid==false){
      this.checkValidationErrorssubmit(this.editrefdis);
    }else{
      console.log(this.editrefdis.value.refname);
      console.log(this.editrefdis.value.seltype);
      console.log(this.editrefdis.value.rname);
      console.log(this.editrefdis.value.discount);
      this.isPageloaderVisible=true;
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
      console.log(accessToken);
      
      // our service calling as usual
    
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/CL_Referral_Discount_Details";
      let serviceUrl = this.commonService.commonUrl+"Account/CL_Referral_Discount_Details"
      let params = {
       
        "Sno":this.refdiscountid,
        "Clinicid":this.userid,       
        "Branch_ID":"",      
        "Loginid":this.userid,        
        "Referral_Dis_ID":"",
        "Referral_ID":this.editrefdis.value.refname,    
        "Service_ID":this.editrefdis.value.rname,     
        "Disc_Per":this.editrefdis.value.discount,
        "Status":"Active",
        "Trans_Date":"",
        "pagecount":"",
        "Condition":"Update",      
        "Type":this.editrefdis.value.seltype    
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
                    alert("Updated Successfully");
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
