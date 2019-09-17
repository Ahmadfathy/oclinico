import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-add-doct-treatment',
  templateUrl: './add-doct-treatment.component.html',
  styleUrls: ['./add-doct-treatment.component.css']
})
export class AddDoctTreatmentComponent implements OnInit {
  nullValue: any;
  showDatadocname:boolean=false;
  noDatadocname:boolean=false;
  showDatatreatname:boolean=false;
  noDatatreatname:boolean=false;
  docname = this.nullValue;
  treatment = this.nullValue;
  status = this.nullValue;
  adddoctreatment: FormGroup;
  select : string = 'Select'
  table:any=[];
  languageoption:any;
  treatmentnames:any=[];
  docnameid:any;
  treatmentnameid:any;
  userid:any;
  public isPageloaderVisible = false;

  ValidationMessages = {
    
    'docname': {
      'required': 'Please enter doctor name'
    },
    'treatment': {
      'required': 'Please enter treatment'
    },
    'status': {
      'required': 'Please select status',
      'Select':'Please select status'
    },
  
    
  }

  ValidationMessagesarabic = {
    'docname': {
      'required': 'الرجاء إدخال اسم الطبيب'
    },
    'treatment': {
      'required': 'الرجاء إدخال العلاج'
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
      'Select':'يرجى اختيار الحالة'
    },
  }

  formErrors = {
   
    'docname':'',
    'treatment':'',
    'status':'',
   }
  //userid: string;
 
   constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    document.title="Add_doctor_treatment"
    this.userid =  window.localStorage.getItem("userId");
    
    this.commonService.currentMessagecat.subscribe(message => {
    //  console.log(message);
      this.languageoption = message.split("_")[1];
   //   console.log(this.languageoption);
     this. formErrors = {
      'docname':'',
      'treatment':'',
      'status':'',
      }
  })


    this.adddoctreatment = this.fb.group({
   
      docname:['',[Validators.required]],
      treatment:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.adddoctreatment.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.adddoctreatment);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  

  }

  getdocnames(event: any) { // without type info
    let values = event.target.value ;
  //  console.log(values);
    if(values==""){
      this.showDatadocname=false;
      this.noDatadocname=false;
    }else{
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/DocTreatment_Transactions";

      let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions"

      let params = {
        "Sno":"",
        "Practitioner_Id":this.adddoctreatment.value.docname,       
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
               // console.log(result);
                
                if(result.status_cd === "1"){
                  this.showDatadocname=true;
                  this.noDatadocname=false;
                 this.table = result.data.Table;
               
                }else{
                // this.hideLoader=true;
            //    alert("test");
                this.adddoctreatment.patchValue({
                  docname:'',
                });
                this.noDatadocname=true;
                this.showDatadocname=false;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
              //  console.log(error);
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
    
  }
  onSelectdocname(event,docnameval){
  //  console.log(event);
    // console.log(docnameval);
    // console.log(event.target.innerHTML);
    this.adddoctreatment.patchValue({
      docname:event.target.innerHTML,
    });
    this.docnameid=docnameval;
    this.showDatadocname=false;
    this.noDatadocname=false;
  }
  
  gettreatnames(event: any) { // without type info
    let values = event.target.value ;
   // console.log(values);
    if(values==""){
      this.showDatatreatname=false;
      this.noDatatreatname=false;
    }else{
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/DocTreatment_Transactions";

      let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions"

      let params = {
            "Sno":"",
            "Practitioner_Id":"",       
            "Treatment_Id":event.target.value,      
            "status":"",
            "Login_ID":"", 
            "Trans_Date":"", 
            "Operation":"Get_Treatments",
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
               // console.log(result);
                
                if(result.status_cd === "1"){
                  this.showDatatreatname=true;
                  this.noDatatreatname=false;
                 this.treatmentnames = result.data.Table;
               
                }else{
                // this.hideLoader=true;
                this.adddoctreatment.patchValue({
                  treatment:'',
                });
                this.showDatatreatname=false;
                  this.noDatatreatname=true;
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
  
    //   },
    //   err=>{
    //  // console.log("Token Error:"+err);
    //   }
      
    //   );



    }
    
  }
  onSelecttreatname(event,teatnameval){
    //  console.log(event);
      // console.log(teatnameval);
      // console.log(event.target.innerHTML);
      this.adddoctreatment.patchValue({
        treatment:event.target.innerHTML,
      });
      this.treatmentnameid=teatnameval;
      this.showDatatreatname=false;
      this.noDatatreatname=false;
    }
  checkValidationErrors(group: FormGroup = this.adddoctreatment): void {
  
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
          // console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.adddoctreatment): void {
   
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



adddoctreatmentcancle(){
    this.router.navigate(['/DoctorTreatment']);
   }
adddoctreatmentsubmit(){

  console.log(this.adddoctreatment.valid)
  if(this.adddoctreatment.valid==false){
    this.checkValidationErrorssubmit(this.adddoctreatment);
  }else{
    // console.log(this.docnameid);
    // console.log(this.treatmentnameid);
    
    console.log(this.adddoctreatment.value.status);
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/DocTreatment_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/DocTreatment_Transactions";
    let params = {
          "Sno":"",
          "Practitioner_Id":this.docnameid,       
          "Treatment_Id":this.treatmentnameid,      
          "status":this.adddoctreatment.value.status,
          "Login_ID":this.userid, 
          "Trans_Date":"", 
          "Operation":"Insert",
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
             // console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                  alert("Inserted Successfully");
                  this.router.navigate(['/DoctorTreatment']);
              
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
  
  //   },
  //   err=>{
  //     this.isPageloaderVisible = false;
  //  // console.log("Token Error:"+err);
  //   }
    
  //   );
  
  
  }
  }
}
