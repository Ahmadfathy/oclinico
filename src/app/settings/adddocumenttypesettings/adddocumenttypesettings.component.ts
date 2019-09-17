import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-adddocumenttypesettings',
  templateUrl: './adddocumenttypesettings.component.html',
  styleUrls: ['./adddocumenttypesettings.component.css']
})
export class AdddocumenttypesettingsComponent implements OnInit {
  nullValue: any;
  documenttype = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  adddoctype: FormGroup;
  select : string = 'Select';
  languageoption:any;
  public isPageloaderVisible = false;
  //daysarr:any=[];
  ValidationMessages = {
    
    'documenttype': {
      'required': 'Please enter document type'
    },
    'status': {
      'required': 'Please select status',
      'Select':'Please select status'
    },
  
    
  }

  ValidationMessagesarabic = {
    'documenttype': {
      'required': 'الرجاء إدخال نوع المستند'
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
      'Select':'يرجى اختيار الحالة'
    },
   
    
  }

  formErrors = {
   
    'documenttype':'',
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
    document.title="Add DocumentType";
    this.userid =  window.localStorage.getItem("userId");
    
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
      'documenttype':'',
      'status':'',
      }
  })

    this.adddoctype = this.fb.group({
   
      documenttype:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.adddoctype.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.adddoctype);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  

  }

  
  checkValidationErrors(group: FormGroup = this.adddoctype): void {
  
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
     checkValidationErrorssubmit(group: FormGroup = this.adddoctype): void {
   
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



   adddoctypecancle(){
    this.router.navigate(['/DocumentType']);
   }
   adddoctypebmit(){

  console.log(this.adddoctype.valid)
  if(this.adddoctype.valid==false){
    this.checkValidationErrorssubmit(this.adddoctype);
  }else{
    console.log(this.adddoctype.value.documenttype);
    
    console.log(this.adddoctype.value.status);
    this.isPageloaderVisible = true;
    var accessToken=window.localStorage.Tokenval;
    console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Documenttype_Master_details";
    let serviceUrl = this.commonService.commonUrl+"Account/Documenttype_Master_details";
    let params = {
          "Sno":"",
          "Paymodetype_ID":"",       
          "DocumentType":this.adddoctype.value.documenttype,      
          "Status":this.adddoctype.value.status, 
          "Trans_Date":"", 
          "Loginid": this.userid ,
          "Clinicid": this.userid ,
          "Condition":"Insert"
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                  alert("Inserted Successfully");
                  this.router.navigate(['/DocumentType']);
              
              }else{
                this.isPageloaderVisible = false;
              // this.hideLoader=true;
                console.log(result.error_msg);
                console.log(accessToken);
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
  
   
  
  
  }
  }

}
