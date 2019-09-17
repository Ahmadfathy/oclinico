import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-treatment-machine-details-add',
  templateUrl: './treatment-machine-details-add.component.html',
  styleUrls: ['./treatment-machine-details-add.component.css']
})
export class TreatmentMachineDetailsAddComponent implements OnInit {
  nullValue: any;
  treatmantname = this.nullValue;
  machinename = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  addtremtmachine: FormGroup;
  select : string = 'Select'
  treatmantnamearr:any=[];
  machinenamearr:any=[];
  languageoption:any;
  public isPageloaderVisible = false;

  ValidationMessages = {
    
    'treatmantname': {
      'required': 'Please select treatment name',
      'Select':'Please select treatment name'
    },
    'machinename': {
      'required': 'Please select machine name',
      'Select':'Please select machine name'
    },
    'status': {
      'required': 'Please select status',
      'Select':'Please select status'
    },
  
    
  }

  ValidationMessagesarabic = {
    'treatmantname': {
      'required': 'الرجاء إدخال اسم العلاج',
      'Select':'الرجاء إدخال اسم العلاج'
    },
    'machinename': {
      'required': 'Please select machine name',
      'Select':'Please select machine name'
    },
    'status': {
      'required': 'يرجى اختيار الحالة',
      'Select':'يرجى اختيار الحالة'
    },
  }

  formErrors = {
    'treatmantname':'',
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

    document.title="Add Treatment Machine"
    this.userid =  window.localStorage.getItem("userId");
    
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
     this. formErrors = {
      'treatmantname':'',
      'machinename':'',
      'status':'',
      }
  })


    this.addtremtmachine = this.fb.group({
   
     
      treatmantname:['select',[Validators.required,CustomValidators.Select('select')]],
      machinename:['select',[Validators.required,CustomValidators.Select('select')]],
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addtremtmachine.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addtremtmachine);
    //  console.log(data);
  });

this.gettreatmentnames();
  this.getmachinenames();

  }

  gettreatmentnames(){
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Machine_operations";
      let serviceUrl = this.commonService.commonUrl+"Account/Treatment_Machine_operations";
      let params = {
                "Sno":"",
                "Treatment_ID":"",       
                "Machine_ID":"",      
                "Trans_date":"", 
                "LoginId":"", 
                "ClinicId":this.userid,
                "Condition":"Get_TreatmentID", 
                "Par1":"", 
                "Par2":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                //console.log(result);
                
                if(result.status_cd === "1"){
                 this.treatmantnamearr = result.data.Table;
                // console.log(this.treatmantnamearr );
                
                }else{
                // this.hideLoader=true;
                  // console.log(result.error_msg);
                  // console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
     
  }
  getmachinenames(){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Machine_operations";
      let serviceUrl = this.commonService.commonUrl+"Account/Treatment_Machine_operations";
      let params = {
                "Sno":"",
                "Treatment_ID":"",       
                "Machine_ID":"",      
                "Trans_date":"", 
                "LoginId":"", 
                "ClinicId":this.userid,
                "Condition":"Get_MachineID", 
                "Par1":"", 
                "Par2":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
               // console.log(result);
                
                if(result.status_cd === "1"){
                 this.machinenamearr = result.data.Table;
               //  console.log(this.machinenamearr );
                
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
  checkValidationErrors(group: FormGroup = this.addtremtmachine): void {
  
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
      //   console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
       
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
         //  console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }
     checkValidationErrorssubmit(group: FormGroup = this.addtremtmachine): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
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
           this.checkValidationErrorssubmit(abstractControl)
         }
       });
   }



   addtreatmentmachinecancle(){
    this.router.navigate(['/Treat_MachineDetails']);
   }
addtreatmentmachinesbmit(){

 // console.log(this.addtremtmachine.valid)
  if(this.addtremtmachine.valid==false){
    this.checkValidationErrorssubmit(this.addtremtmachine);
  }else{
    // console.log(this.addtremtmachine.value.treatmantname);
    // console.log(this.addtremtmachine.value.machinename);
    
    // console.log(this.addtremtmachine.value.status);
    this.isPageloaderVisible = true;
    var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Machine_operations";
    let serviceUrl = this.commonService.commonUrl+"Account/Treatment_Machine_operations";
    let params = {
            "Sno":"",
            "Treatment_ID":this.addtremtmachine.value.treatmantname,       
            "Machine_ID":this.addtremtmachine.value.machinename,      
            "Trans_date":"", 
            "LoginId":this.userid, 
            "ClinicId":this.userid,
            "Condition":"Insert", 
            "Par1":this.userid, 
            "Par2":this.addtremtmachine.value.status
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
                  this.router.navigate(['/Treat_MachineDetails']);
              
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
