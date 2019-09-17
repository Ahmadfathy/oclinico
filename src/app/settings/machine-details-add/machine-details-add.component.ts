import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-machine-details-add',
  templateUrl: './machine-details-add.component.html',
  styleUrls: ['./machine-details-add.component.css']
})
export class MachineDetailsAddComponent implements OnInit {
  nullValue: any;
  machinecode = this.nullValue;
  machinename = this.nullValue;
  status = this.nullValue;
  languageoption:any;
  addmachine: FormGroup;
  select : string = 'Select'
  //daysarr:any=[];
  public isPageloaderVisible = false;

  ValidationMessages = {
    
    'machinecode': {
      'required': 'Please enter machine code',
      'minlength':'machine code should not be less than 5 characters',
    },
    'machinename': {
      'required': 'Please enter machine name'
    },
    'status': {
      'required': 'Please select status',
      'Select':'Please select status'
    },
  
    
  }
  ValidationMessagesarabic = {
    'machinecode': {
      'required': 'الرجاء إدخال رمز الجهاز',
      'minlength':'machine code should not be less than 5 characters',
    },
    'machinename': {
      'required': 'الرجاء إدخال اسم الجهاز'
    },
    'status': {
      'required': 'الرجاء اختيار الحالة',
      'Select':'الرجاء اختيار الحالة'
    },
  }

  formErrors = {
   
    'machinecode':'',
    'machinename':'',
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
     document.title="Add_MachineDetails";
    this.userid =  window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
      'machinecode':'',
    'machinename':'',
    'status':'',
      }
  })

    
    this.addmachine = this.fb.group({
   
    //  machinecode:['',[Validators.required]],
      machinecode:['',[Validators.required,Validators.minLength(5)]],
      machinename:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addmachine.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addmachine);
    //  console.log(data);
  });
 

  

  }
// keyPressphoneno(event: any) {
//     console.log(event.keyCode)
//     const pattern = /[0-9]/;
//     let inputChar = String.fromCharCode(event.charCode);
//     if (event.keyCode != 8 && !pattern.test(inputChar)) {
//       event.preventDefault();
//     }
//     if(event.keyCode == 45 || event.keyCOde == 43){
//       event.preventDefault();
//     }
//   }

  //event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 || (event.charCode >= 48 && event.charCode <= 57
  //<input class="form-control" onkeypress="return ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 || (event.charCode >= 48 && event.charCode <= 57));" id="name" formControlName="name" type="text" autocomplete="off" value="">
  checkValidationErrors(group: FormGroup = this.addmachine): void {
  
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        
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
          //console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }
         }
   
         if (abstractControl instanceof FormGroup) {
         //  console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.addmachine): void {
   
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



   addmachinecancle(){
    this.router.navigate(['/MachineDetails']);
   }
addmachinesubmit(){

  console.log(this.addmachine.valid)
  if(this.addmachine.valid==false){
    this.checkValidationErrorssubmit(this.addmachine);
  }else{
    // console.log(this.addmachine.value.machinecode);
    // console.log(this.addmachine.value.machinename);
    
    console.log(this.addmachine.value.status);
    this.isPageloaderVisible = true;
    var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Machine_Master_operations";
    let serviceUrl = this.commonService.commonUrl+"Account/Machine_Master_operations";
    let params = {
            "Sno":"",
            "Machine_ID":"",       
            "Machine_Code":this.addmachine.value.machinecode,      
            "Machine_Name":this.addmachine.value.machinename,
            "Trans_date":"", 
            "LoginId":this.userid, 
            "ClinicId":this.userid,
            "Condition":"Insert", 
            "status":this.addmachine.value.status, 
            "branchid":"",
            "pagecount":""
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
                  this.router.navigate(['/MachineDetails']);
              
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
            //  console.log(error);
            
            }
            );
  
   
  
  
  }
  }
}
