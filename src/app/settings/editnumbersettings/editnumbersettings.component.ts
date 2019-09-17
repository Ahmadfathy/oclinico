import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editnumbersettings',
  templateUrl: './editnumbersettings.component.html',
  styleUrls: ['./editnumbersettings.component.css']
})
export class EditnumbersettingsComponent implements OnInit {
  nullValue: any;
  patientnum = this.nullValue;
  appnum = this.nullValue;
  invnum = this.nullValue;
  cashrecpt = this.nullValue;
  expences = this.nullValue;
  numbersettingid:any;
  editnumbersettings: FormGroup;
  select : string = 'Select';
  languageoption: any;
  //daysarr:any=[];
  public isPageloaderVisible = true;
  ValidationMessages = {
    
    'patientnum': {
      'required': 'Please enter patient number'
    },
    'appnum': {
      'required': 'Please enter appointment number'
    },
    'invnum': {
      'required': 'Please enter invoice number'
    },
    'cashrecpt': {
      'required': 'Please enter cash reciept'
    },
    'expences': {
      'required': 'Please enter expences'
    },
  
    
  }

  ValidationMessagesarabic = {
    'patientnum': {
      'required': 'الرجاء إدخال رقم المريض'
    },
    'appnum': {
      'required': 'الرجاء إدخال رقم الموعد'
    },
    'invnum': {
      'required': 'الرجاء إدخال رقم الفاتورة'
    },
    'cashrecpt': {
      'required': 'الرجاء إدخال الاستلام النقدي'
    },
    'expences': {
      'required': 'الرجاء إدخال المصروفات'
    },
  }

  formErrors = {
   
    'patientnum':'',
    'appnum':'',
    'invnum':'',
    'cashrecpt':'',
    'expences':'',
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
         document.title="EditNumberSettings"
    this.userid =  window.localStorage.getItem("userId");


    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
     this. formErrors = {
      'patientnum':'',
      'appnum':'',
      'invnum':'',
      'cashrecpt':'',
      'expences':'',
      }
    })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.numbersettingid = currentUrl[currentUrl.length - 1]
    //console.log(this.numbersettingid);

    this.editnumbersettings = this.fb.group({
      
      patientnum:['',[Validators.required]],
      appnum:['',[Validators.required]],
      invnum:['',[Validators.required]],
      cashrecpt:['',[Validators.required]],
      expences:['',[Validators.required]],
    });
    
    this.editnumbersettings.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editnumbersettings);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  this.bindnumsettinsdata();

  }

  bindnumsettinsdata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      
      // our service calling as usual
    
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/NumberSetting_Transactions";
      let serviceUrl = this.commonService.commonUrl+"Account/NumberSetting_Transactions";
      let params = {
        "Sno":this.numbersettingid,
        "Patient_No":"",       
        "Appointment_No":"",      
        "Invoice_No":"", 
        "Cash_Reciept":"", 
        "Expenses":"",
        "Trans_Date":"", 
        "Login_Id":"", 
        "Clinicid":"",
        "operation":"GetNoSettingsEdit"
          }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
               // console.log(result);
                
                if(result.status_cd === "1"){
                   // alert("Inserted Successfully");
                  //  this.router.navigate(['/Referaldiscounts']);
               // this.docoterid=result.data.Table[0].Practitioner_Id
               this.isPageloaderVisible = false;
               this.editnumbersettings.patchValue({
                patientnum:result.data.Table[0].Patient_No,
                appnum:result.data.Table[0].Appointment_No,
                invnum:result.data.Table[0].Invoice_No,
                cashrecpt:result.data.Table[0].Cash_Reciept,
                expences:result.data.Table[0].Expenses,
              });
                }else{
                  this.isPageloaderVisible = false;
                //  alert("Please enter valid doctorname")
                // this.hideLoader=true;
                  // console.log(result.error_msg);
                  // console.log(accessToken);
                }
              },
              error=>{
                this.isPageloaderVisible = false;
             //  this.hideLoader=true;
               // console.log(error);
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
  checkValidationErrors(group: FormGroup = this.editnumbersettings): void {
  
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
          //console.log("errorKey :" + errorKey)
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
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.editnumbersettings): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
         if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
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
          //  console.log("errorKey :" + errorKey)
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



editnumbersettingscancle(){
    this.router.navigate(['/Occupations']);
   }
editnumbersettingsubmit(){

  //console.log(this.editnumbersettings.valid)
  if(this.editnumbersettings.valid==false){
    this.checkValidationErrorssubmit(this.editnumbersettings);
  }else{
    // console.log(this.editnumbersettings.value.patientnum);
    // console.log(this.editnumbersettings.value.appnum);
    // console.log(this.editnumbersettings.value.invnum);
    // console.log(this.editnumbersettings.value.cashrecpt);
    // console.log(this.editnumbersettings.value.expences);
    
 
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/NumberSetting_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/NumberSetting_Transactions";
    let params = {
        "Sno":this.numbersettingid,
        "Patient_No":this.editnumbersettings.value.patientnum,       
        "Appointment_No":this.editnumbersettings.value.appnum,      
        "Invoice_No":this.editnumbersettings.value.invnum, 
        "Cash_Reciept":this.editnumbersettings.value.cashrecpt, 
        "Expenses":this.editnumbersettings.value.expences,
        "Trans_Date":this.userid, 
        "Clinicid":this.userid,
        "operation":"Update"
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            //  console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                  alert("Updated Successfully");
                  this.router.navigate(['/NumberSettings']);
              
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
