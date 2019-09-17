import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addjobtitle',
  templateUrl: './addjobtitle.component.html',
  styleUrls: ['./addjobtitle.component.css']
})
export class AddjobtitleComponent implements OnInit {
  public isPageloaderVisible:boolean=false;
  userid: string;
  addjob:FormGroup;
  fromsubmit:boolean;
  nullValue: any;
  title = this.nullValue;
  hierarchy= this.nullValue;
  status= this.nullValue;
  titlear = this.nullValue;
  select;
 
  formErrors = {
    'title': '',
    'titlear':'',
    'hierarchy':'',
    'status':''
  }

  ValidationMessages = {
    'title': {
      'required': 'Job Title is required',
      'pattern':'Please enter valid Job Title'
     },
     'titlear': {
      'required': 'Arabic Job Title is required',
      'pattern':'Please enter valid arabic Job Title'
     },
     'hierarchy': {
      'required': 'hierarchy is required',
     },
     'status': {
      'required': 'status is required'
    },
  }
  ValidationarabicMessages = {
    'title': {
      'required': 'المسمى الوظيفي مطلوب',
      'pattern':'الرجاء إدخال اسم وظيفة صحيح'
     },
     'titlear': {
      'required': 'المسمى الوظيفي مطلوب',
      'pattern':'الرجاء إدخال اسم وظيفة صحيح'
     },
     'hierarchy': {
      'required': 'التسلسل الهرمي مطلوب',
     },
     'status': {
      'required': 'الحالة مطلوبة'
    },

  }
  languageoption: string;
  langulagetype: string;
  statuscode: number;

  constructor(private formBuilder: FormBuilder,
              public http : Http, 
              public router:Router,
              public commonService:UserinfoService
  ) { 
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if(this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined" ){
            this.langulagetype="EN";
          }
          else{
           
            this.langulagetype = this.languageoption;
          }
     this. formErrors = {
      'title': '',
      'hierarchy':'',
      'status':'',
      'titlear':'',
      }
  })
    this.userid =  window.localStorage.getItem("userId");
    console.log("userid"+this.userid);
  }

  ngOnInit() {
    this.addjob = this.formBuilder.group({
      title:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      titlear:['',Validators.required],
      hierarchy:['',Validators.required],
      status:['',[Validators.required]],
    })

    this.addjob.valueChanges.subscribe((data) => {
     // console.log("change entered.....");
      this.fromsubmit = false;
      this.checkValidationErrors(this.addjob);
    });
  }

  checkValidationErrors(group: FormGroup = this.addjob): void {
     Object.keys(group.controls).forEach((key:string) => {
       const abstractControl = group.get(key);
       this.formErrors[key] = '';
       if( this.fromsubmit == true){
         console.log(this.langulagetype);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          if(this.langulagetype == "EN"){
           const messages = this.ValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
          }
          else if(this.langulagetype == "AR"){
            const messages=this.ValidationarabicMessages[key];
            for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
 
          }
          else{}
         
         }else{
           console.log('untouched')
         }
 
       }
       else{
       if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         console.log("entered.....if"+this.langulagetype);
         if(this.langulagetype == "EN"){
           const messages = this.ValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
 
         }
         else if(this.langulagetype == "AR"){
           const messages = this.ValidationarabicMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
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
  submit(){
    if (this.addjob.invalid === true) {
      this.fromsubmit=true;
        this.checkValidationErrors(this.addjob);
      }
      else{
        console.log(this.addjob.value.title+"..."+this.addjob.value.status+".."+this.addjob.value.hierarchy)
        this.isPageloaderVisible=true;
         var accessToken= window.localStorage.Tokenval
      let url= this.commonService.commonUrl+"Account/Role_Operations"
      let body={ 
        "clinicid":this.userid, 
        "branchid":this.addjob.value.titlear,
        "loginid":this.userid,
        "RoleId":"",
        "RoleName":this.addjob.value.title,
        "Status":this.addjob.value.status,
        "Organisation_ID":this.addjob.value.hierarchy,
        "OperationType":"insert"
        }
      console.log(body);
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
      let options = new RequestOptions({ headers : headers });
      this.http.post(url,body,options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if(res.status_cd == 1){
          this.isPageloaderVisible=false;
         alert("Inserted Successfully.");
         this.router.navigate(['/jobtitle']);
        
        }
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }
}

arabic(event) {
  var arregex = /[\u0600-\u06FF]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (!arregex.test(inputChar)) {
    alert("Please Enter Arabic Letters")
    event.preventDefault();
  }
}

}
