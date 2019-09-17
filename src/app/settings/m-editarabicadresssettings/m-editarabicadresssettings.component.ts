import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-editarabicadresssettings',
  templateUrl: './m-editarabicadresssettings.component.html',
  styleUrls: ['./m-editarabicadresssettings.component.css']
})
export class MEditarabicadresssettingsComponent implements OnInit {

  nullValue: any;
  companyname = this.nullValue;
  contatperson = this.nullValue;
  address = this.nullValue;
  city = this.nullValue;
  phoneno = this.nullValue;
  emailid = this.nullValue;
  editaddress: FormGroup;
  addreferalobj: any = [];
  branchnames: any = [];
  selcheckval:any;
  addrid:any;
  languageoption:any;
  public isPageloaderVisible = true;
  select : string = 'select'
  ValidationMessages = {
    'clinicbranchname': {
      'required': 'Please select Clinic/Branch name ',
      'Select': 'Please select Clinic/Branch name '
     },
    'arabicclbrname': {
      'required': 'Please enter Clinic/Branch Name(In Arabic) ',
     },
    'spelz': {
      'required': 'Please enter Specialization',
     },
    'address': {
      'required': 'Please enter Address ',
     },
    'city': {
      'required': 'Please enter City',
     
     },
    'country': {
      'required': 'Please enter Country',
    
     }
   
    
  }

  ValidationMessagesarabic = {
   
    'clinicbranchname': {
      'required': 'الرجاء اختيار اسم العيادة / الفرع ',
      'Select': 'الرجاء اختيار اسم العيادة / الفرع '
     },
    'arabicclbrname': {
      'required': 'الرجاء إدخال اسم العيادة / الفرع (باللغة العربية)',
     },
    'spelz': {
      'required': 'الرجاء إدخال التخصص',
     },
    'address': {
      'required': 'الرجاء إدخال العنوان',
     },
    'city': {
      'required': 'الرجاء إدخال المدينة',
     
     },
    'country': {
      'required': 'الرجاء إدخال الدولة',
    
     }
  }


  formErrors = {
    'clinicbranchname': '',
    'arabicclbrname': '',
    'spelz': '',
    'address': '',
    'city': '',
    'country': '',
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
       document.title="Edit Clinic Address";
    this.userid =  window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
        this. formErrors = {
          'clinicbranchname': '',
          'arabicclbrname': '',
          'spelz': '',
          'address': '',
          'city': '',
          'country': '',
          }
      })
    
    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.addrid = currentUrl[currentUrl.length - 1]
  //  console.log(this.addrid);

      this.editaddress = this.fb.group({
       // clinicbranchname:['',[Validators.required]],
        clinicbranchname:['select',[Validators.required,CustomValidators.Select('select')]],
        arabicclbrname:['',[Validators.required]],
        spelz:['',[Validators.required]],
        address:['',[Validators.required]],
        city:['',[Validators.required]],
        country:['',[Validators.required]],
       
       
      });

      this.editaddress.valueChanges.subscribe((data) => {
          this.checkValidationErrors(this.editaddress);
      });


this.getdclinicaddressdetails();

  }
  checkValidationErrors(group: FormGroup = this.editaddress): void {
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
       // console.log("errorKey :" + errorKey)
        if (errorKey) {
          this.formErrors[key] += messages[errorKey] + '';
        }
      }
    }else{
      const messages = this.ValidationMessagesarabic[key];
      for (const errorKey in abstractControl.errors) {
     //   console.log("errorKey :" + errorKey)
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
  checkValidationErrorssubmit(group: FormGroup = this.editaddress): void {

    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
    
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
      //  alert("test");
      if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
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


getbranchs(alval){
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/Clinic_Address_Details"
    let params = {
      "Sno":"",
      "clinicid":this.userid,
      "branchid":this.userid, //need to pass branch session
      "loginid":this.userid,
      "RoleType":"Branch", 
      "FirstName":"", 
      "LastName":"",
      "FatherName":"", 
      "CName":"",
      "Address":"",
      "City":"", 
      "condition":"getBranchDetails",
      "Country":"" 
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              //console.log(result);
              
              if(result.status_cd === "1"){
               this.branchnames = result.data.Table;
              // console.log(this.branchnames );
               this.editaddress.patchValue({
               
                clinicbranchname:alval.clinicbranchname
                
              });
              }else{
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              }
            },
            error=>{
           //  this.hideLoader=true;
           //   console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );

   
}


getdclinicaddressdetails(){
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/Clinic_Address_Details"
    let params = {
      "Sno":this.addrid,
      "clinicid":this.userid,
      "branchid":this.userid, 
      "loginid":"",
      "RoleType":"", 
      "FirstName":"", 
      "LastName":"",
      "FatherName":"", 
      "CName":"",
      "Address":"",
      "City":"", 
      "condition":"Getdata",
      "Country":""
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
             // console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible=false;
              //  this.clinicaddress = result.data;
              // console.log( result.data.Table[0].clinic_name);
              // console.log( result.data.Table[0].specialization);
              // console.log( result.data.Table[0].Address);
              // console.log( result.data.Table[0].city);
              // console.log( result.data.Table[0].country);
              
              this.editaddress.patchValue({
                arabicclbrname : result.data.Table[0].clinic_name,
                spelz: result.data.Table[0].specialization,
                address: result.data.Table[0].Address,
                city: result.data.Table[0].city,
                country: result.data.Table[0].country,
                
                
              });
              var allValues = {
                clinicbranchname : result.data.Table[0].branchid,
              
              }
              this.getbranchs(allValues);
              
              }else{
                this.isPageloaderVisible=false;
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              
              }
            },
            error=>{
              this.isPageloaderVisible=false;
           //  this.hideLoader=true;
              //console.log(error);
           
            }
            );

    
}

editaddresscancle(){
 this.router.navigate(['/ClinicAddressDetails']);
}
editaddresssubmit(){
  //alert("sample");

  // if( this.addreferal.value.companyname==""){
  //   alert("sample");
  // }
console.log(this.editaddress.valid)
if(this.editaddress.valid==false){
  this.checkValidationErrorssubmit(this.editaddress);
}else{
  

  //  console.log(this.editaddress.value.clinicbranchname);
  // console.log(this.editaddress.value.arabicclbrname);
  // console.log(this.editaddress.value.spelz);
  // console.log(this.editaddress.value.address);
  // console.log(this.editaddress.value.city);
  // console.log(this.editaddress.value.country);
  this.isPageloaderVisible=true;
  var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
    let serviceUrl = this.commonService.commonUrl+"Account/Clinic_Address_Details"
    let params = {
            "Sno":this.addrid,
            "clinicid":this.userid,
            "branchid":this.editaddress.value.clinicbranchname, 
            "loginid":this.userid,
            "RoleType":"Branch", 
            "FirstName":this.editaddress.value.spelz, 
            "LastName":"",
            "FatherName":"", 
            "CName":this.editaddress.value.arabicclbrname,
            "Address":this.editaddress.value.address,
            "City":this.editaddress.value.city, 
            "condition":"Update",
            "Country":this.editaddress.value.country
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            //  console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible=false;
                  alert("Updated Successfully");
                  this.router.navigate(['/ClinicAddressDetails']);
              
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
            //  console.log(error);
            
            }
            );

   




}
 
}

}
