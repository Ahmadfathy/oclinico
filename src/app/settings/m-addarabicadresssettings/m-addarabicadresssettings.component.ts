import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-addarabicadresssettings',
  templateUrl: './m-addarabicadresssettings.component.html',
  styleUrls: ['./m-addarabicadresssettings.component.css']
})
export class MAddarabicadresssettingsComponent implements OnInit {

  nullValue: any;
  companyname = this.nullValue;
  contatperson = this.nullValue;
  address = this.nullValue;
  city = this.nullValue;
  phoneno = this.nullValue;
  emailid = this.nullValue;
  addaddress: FormGroup;
  addreferalobj: any = [];
  branchnames: any=[];
  selcheckval:any;
  select : string = 'select';
  languageoption:any;
  public isPageloaderVisible = false;
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
  userid: string="";
  constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
document.title="Add Clinic Address"

    this.userid =  window.localStorage.getItem("userId");
console.log(this.userid);

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
    
      this.addaddress = this.fb.group({
       // clinicbranchname:['',[Validators.required]],
       clinicbranchname:['select',[Validators.required,CustomValidators.Select('select')]],
        arabicclbrname:['',[Validators.required]],
        spelz:['',[Validators.required]],
        address:['',[Validators.required]],
        city:['',[Validators.required]],
        country:['',[Validators.required]],
       
       
      });

      this.addaddress.valueChanges.subscribe((data) => {
          this.checkValidationErrors(this.addaddress);
      });


this.getbranchs();
  }
  checkValidationErrors(group: FormGroup = this.addaddress): void {
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
      //  console.log("errorKey :" + errorKey)
        if (errorKey) {
          this.formErrors[key] += messages[errorKey] + '';
        }
      }
    }else{
      const messages = this.ValidationMessagesarabic[key];
      for (const errorKey in abstractControl.errors) {
        //console.log("errorKey :" + errorKey)
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
  checkValidationErrorssubmit(group: FormGroup = this.addaddress): void {

    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
    
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
      //  alert("test");
      if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
        //  console.log("errorKey :" + errorKey)
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
      //  console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
}


getbranchs(){
  var accessToken=window.localStorage.Tokenval;
    //console.log(accessToken);
    
    // our service calling as usual

    let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
    let params = {
      "Sno":"",
      "clinicid":this.userid,
      "branchid":'', //need to pass branch session
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
             // console.log(result);
              
              if(result.status_cd === "1"){
               this.branchnames = result.data.Table;
             //  console.log(this.branchnames );
              
              }else{
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              }
            },
            error=>{
           //  this.hideLoader=true;
             // console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );

   
}


addaddresscancle(){
 this.router.navigate(['/ClinicAddressDetails']);
}
addaddresssubmit(){
  //alert("sample");

  // if( this.addreferal.value.companyname==""){
  //   alert("sample");
  // }
//console.log(this.addaddress.valid)
if(this.addaddress.valid==false){
  this.checkValidationErrorssubmit(this.addaddress);
}else{
  

    this.isPageloaderVisible=true;
    var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual

    let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Clinic_Address_Details";
    let params = {
       "Sno":"",
        "clinicid":this.userid,
        "branchid":this.addaddress.value.clinicbranchname, 
        "loginid":this.userid,
        "RoleType":"Branch", 
        "FirstName":this.addaddress.value.spelz, 
        "LastName":"",
        "FatherName":"", 
        "CName":this.addaddress.value.arabicclbrname,
        "Address":this.addaddress.value.address,
        "City":this.addaddress.value.city, 
        "condition":"Insert",
        "Country":this.addaddress.value.country
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
                  alert("Inserted Successfully");
                  this.router.navigate(['/ClinicAddressDetails']);
              
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
             // console.log(error);
            
            }
            );

  




}
 
}

}
