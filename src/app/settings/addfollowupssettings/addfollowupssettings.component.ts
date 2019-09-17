import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-addfollowupssettings',
  templateUrl: './addfollowupssettings.component.html',
  styleUrls: ['./addfollowupssettings.component.css']
})
export class AddfollowupssettingsComponent implements OnInit {
  nullValue: any;
  docname = this.nullValue;
  docoterid:any;
  days = this.nullValue;
  addfollowup: FormGroup;
  select : string = 'Select'
  daysarr:any=[];
  languageoption: any;

  public isPageloaderVisible = false;
  ValidationMessages = {
    
    'docname': {
      'required': 'Please enter doctor name'
    },
    'days': {
      'required': 'Please select days',
      'Select':'Please select days'
    },
  
    
  }
  ValidationMessagesarabic = {
    'docname': {
      'required': 'الرجاء إدخال اسم الطبيب'
    },
    'days': {
      'required': 'الرجاء اختيار الأيام',
      'Select':'الرجاء اختيار الأيام'
    },
   
    
  }


  formErrors = {
   
    'docname':'',
    'days':'',
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
    document.title="Add FollowUps";

    this.userid =  window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
     this. formErrors = {
      'docname':'',
      'days':'',
      }
  })
    
    this.addfollowup = this.fb.group({
   
      docname:['',[Validators.required]],
    
      days:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addfollowup.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addfollowup);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  this.daysarr = [
    { daysval:"1"}, { daysval:"2"}, { daysval:"3"}, { daysval:"4"}, { daysval:"5"}, { daysval:"6"}, { daysval:"7"},
     { daysval:"8"}, { daysval:"9"}, { daysval:"10"}, { daysval:"11"}, { daysval:"12"}, { daysval:"13"}, { daysval:"14"},
    { daysval:"15"}, { daysval:"16"}, { daysval:"17"}, { daysval:"18"}, { daysval:"19"}, { daysval:"20"}, { daysval:"21"},
     { daysval:"22"}, { daysval:"23"}, { daysval:"24"}, { daysval:"25"}, { daysval:"26"}, { daysval:"27"}, { daysval:"28"},
     { daysval:"29"}, { daysval:"30"},
  
  ];

  }

  // checkdoctorname(docname:string){
  //        console.log(docname);
  // }
  focusOutFunction(event){
    console.log(event.target.value)
    let docnameval=event.target.value
     if(docnameval==""||docnameval=="undefined"||docnameval==undefined){
     
    }else{
    this.chsckdocname(docnameval);
    }
  }
  checkValidationErrors(group: FormGroup = this.addfollowup): void {
    // console.log("sdf");
  //  console.log(this.addfollowup.value.docname);
    // if(this.addfollowup.value.docname==""||this.addfollowup.value.docname=="undefined"||this.addfollowup.value.docname==undefined){
    
    // }else{
    // this.chsckdocname(this.addfollowup.value.docname);
    // }
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
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.addfollowup): void {
   
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
         //   console.log("errorKey :" + errorKey)
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

chsckdocname(docname){
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/DocTreatment_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions";
    let params = {
      "Sno":"",
      "Practitioner_Id":docname,       
      "Treatment_Id":"",      
      "status":"",
      "Login_ID":"", 
      "Trans_Date":"", 
      "Operation":"Get_Practitioner",
      "clinicid":this.userid, 
      "Branchid":"", 
      "Last_Updated":"" 
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            //  console.log(result);
              
              if(result.status_cd === "1"){
                 // alert("Inserted Successfully");
                //  this.router.navigate(['/Referaldiscounts']);
              this.docoterid=result.data.Table[0].Practitioner_Id
              }else{
                this.addfollowup.patchValue({
                  docname:'',
                });
                alert("Please enter valid doctorname")
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              }
            },
            error=>{
           //  this.hideLoader=true;
         //     console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );
  
  //   },
  //   err=>{
  //  // console.log("Token Error:"+err);
  //   }
    
  //   );
}

   addfollowupcancle(){
    this.router.navigate(['/FollowUps']);
   }
addfollowupsubmit(){
  // console.log(this.docoterid);
  // console.log(this.addfollowup.valid)
  if(this.addfollowup.valid==false){
    this.checkValidationErrorssubmit(this.addfollowup);
  }else{
   // console.log(this.addfollowup.value.docname);
    
  //  console.log(this.addfollowup.value.days);
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Followups";
    let serviceUrl = this.commonService.commonUrl+"Account/Followups";
    let params = {
      "Sno":"",
      "Doctorid":this.docoterid,       
      "count":this.addfollowup.value.days,      
      "Repeat_type":"", 
      "Trans_date":"", 
      "loginid":this.userid,
      "clinicid":this.userid, 
      "param1":"", 
      "param2":"",
      "Condition":"Insert"  
        }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
             // console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                  alert("Inserted Successfully");
                  this.router.navigate(['/FollowUps']);
              
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
             // console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );
  
    // },
    // err=>{
    //   this.isPageloaderVisible = false;
    // //console.log("Token Error:"+err);
    // }
    
    // );
  
  
  }
  }

}
