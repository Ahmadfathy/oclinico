import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addoccupationssettings',
  templateUrl: './addoccupationssettings.component.html',
  styleUrls: ['./addoccupationssettings.component.css']
})
export class AddoccupationssettingsComponent implements OnInit {
  nullValue: any;
  occupationname = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  addoccupations: FormGroup;
  select : string = 'Select';
  languageoption: any;
  //daysarr:any=[];
  public isPageloaderVisible = false;
  ValidationMessages = {
    
    'occupationname': {
      'required': 'Please enter occupation name'
    },
    'status': {
      'required': 'Please select status',
      'Select':'Please select status'
    },
  
    
  }

  ValidationMessagesarabic = {
    'occupationname': {
      'required': 'الرجاء إدخال اسم المهنة'
    },
    'status': {
      'required': 'الرجاء اختيار الحالة',
      'Select':'الرجاء اختيار الحالة'
    },
  }

  formErrors = {
   
    'occupationname':'',
    'status':'',
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
    document.title="AddOccupations";
    this.userid =  window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
     this. formErrors = {
      'occupationname':'',
       'status':'',
      }
    })
    
    this.addoccupations = this.fb.group({
   
      occupationname:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addoccupations.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addoccupations);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  

  }

  
  checkValidationErrors(group: FormGroup = this.addoccupations): void {
  
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
       
       if(this.languageoption=="EN"|| this.languageoption==undefined||this.languageoption=="undefined"){
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
       //   console.log("errorKey :" + errorKey)
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
           console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.addoccupations): void {
   
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



   addoccupationcancle(){
    this.router.navigate(['/Occupations']);
   }
   addoccupationubmit(){

  //console.log(this.addoccupations.valid)
  if(this.addoccupations.valid==false){
    this.checkValidationErrorssubmit(this.addoccupations);
  }else{
  //  console.log(this.addoccupations.value.occupationname);
    
    //console.log(this.addoccupations.value.status);
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Occupation_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/Occupation_Transactions";
    let params = {
      "Sno":"",
      "Occupation_ID":"",       
      "Occupation_Name":this.addoccupations.value.occupationname,      
      "Trans_Date":"", 
      "Loginid":this.userid, 
      "Clinicid":this.userid,
      "status":this.addoccupations.value.status, 
      "Operation":"Insert", 
      "branchid":"" 
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
                  alert("Inserted Successfully");
                  this.router.navigate(['/Occupations']);
              
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
  
//     },
//     err=>{
//       this.isPageloaderVisible = false;
//  //   console.log("Token Error:"+err);
//     }
    
//     );
  
  
  }
  }

}
