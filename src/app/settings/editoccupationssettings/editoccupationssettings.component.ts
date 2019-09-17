import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editoccupationssettings',
  templateUrl: './editoccupationssettings.component.html',
  styleUrls: ['./editoccupationssettings.component.css']
})
export class EditoccupationssettingsComponent implements OnInit {
  nullValue: any;
  occupationname = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  occupationid:any;
  editoccupations: FormGroup;
  select : string = 'Select';
  languageoption: any;
  //daysarr:any=[];
  public isPageloaderVisible = true;
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
    document.title="EditOccupations";
    this.userid =  window.localStorage.getItem("userId");


    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
     this. formErrors = {
      'occupationname':'',
      'status':'',
      }
    })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.occupationid = currentUrl[currentUrl.length - 1]
    console.log(this.occupationid);

    this.editoccupations = this.fb.group({
   
      occupationname:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.editoccupations.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editoccupations);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  this.bindoccupationdata();

  }

  bindoccupationdata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
    
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Occupation_Transactions";
      let serviceUrl = this.commonService.commonUrl+"Account/Occupation_Transactions";
      let params = {
        "Sno":"",
        "Occupation_ID":this.occupationid,       
        "Occupation_Name":"",      
        "Trans_Date":"", 
        "Loginid":"", 
        "Clinicid":"",
        "status":"", 
        "Operation":"getOccupationdetails", 
        "branchid":""
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
                   // alert("Inserted Successfully");
                  //  this.router.navigate(['/Referaldiscounts']);
               // this.docoterid=result.data.Table[0].Practitioner_Id
               this.editoccupations.patchValue({
                occupationname:result.data.Table[0].Occupation_Name,
                status:result.data.Table[0].status,
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
  checkValidationErrors(group: FormGroup = this.editoccupations): void {
  
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
         // console.log("errorKey :" + errorKey)
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
     checkValidationErrorssubmit(group: FormGroup = this.editoccupations): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
         if(this.languageoption=="EN" ||this.languageoption==undefined||this.languageoption=="undefined"){
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
         //  console.log(abstractControl)
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }



   editoccupationcancle(){
    this.router.navigate(['/Occupations']);
   }
   editoccupationubmit(){

  //console.log(this.editoccupations.valid)
  if(this.editoccupations.valid==false){
    this.checkValidationErrorssubmit(this.editoccupations);
  }else{
   // console.log(this.editoccupations.value.occupationname);
    
   // console.log(this.editoccupations.value.status);
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Occupation_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/Occupation_Transactions";
    let params = {
      "Sno":"",
      "Occupation_ID":this.occupationid,       
      "Occupation_Name":this.editoccupations.value.occupationname,      
      "Trans_Date":"", 
      "Loginid":this.userid, 
      "Clinicid":this.userid,
      "status":this.editoccupations.value.status, 
      "Operation":"Update", 
      "branchid":""
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
                  alert("Updated Successfully");
                 
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
             // console.log(error);
           
            }
            );
  
  //   },
  //   err=>{
  //     this.isPageloaderVisible = false;
  // //  console.log("Token Error:"+err);
  //   }
    
  //   );
  
  
  }
  }

}
