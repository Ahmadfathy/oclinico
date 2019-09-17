import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-machine-details-edit',
  templateUrl: './machine-details-edit.component.html',
  styleUrls: ['./machine-details-edit.component.css']
})
export class MachineDetailsEditComponent implements OnInit {
  nullValue: any;
  machinecode = this.nullValue;
  machinename = this.nullValue;
  status = this.nullValue;
  machineid:any;
  edimachine: FormGroup;
  select : string = 'Select'
  //daysarr:any=[];
  languageoption:any;
  public isPageloaderVisible = true;
  ValidationMessages = {
    
    'machinecode': {
      'required': 'Please enter Machine Code'
    },
    'machinename': {
      'required': 'Please enter Machine Name'
    },
    'status': {
      'required': 'Please select Status',
      'Select':'Please select Status'
    },
  
    
  }

  ValidationMessagesarabic = {
    'machinecode': {
      'required': 'الرجاء إدخال رمز الجهاز'
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
   
    document.title="Edit_MachineDetails"
    this.userid =  window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
     this. formErrors = {
      'machinecode':'',
      'machinename':'',
      'status':'',
      }
  })


    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.machineid = currentUrl[currentUrl.length - 1]
   // console.log(this.machineid);

    this.getmachinedata();
    this.edimachine = this.fb.group({
   
      machinecode:['',[Validators.required]],
      machinename:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.edimachine.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.edimachine);
    //  console.log(data);
  });
  }

 


  getmachinedata(){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
      // our service calling as usual
  
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Machine_Master_operations";
      let serviceUrl = this.commonService.commonUrl+"Account/Machine_Master_operations"
      let params = {
                "Sno":this.machineid,
                "Machine_ID":"",       
                "Machine_Code":"",      
                "Machine_Name":"",
                "Trans_date":"", 
                "LoginId":"", 
                "ClinicId":this.userid,
                "Condition":"GetData", 
                "status":"", 
                "branchid":"",
                "pagecount":""
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                // console.log(result);
                // console.log(result.data.Table);
                if(result.status_cd === "1"){
                  this.isPageloaderVisible = false;
                  // this.mechineData = result.data.Table;
                  this.edimachine.patchValue({
                    machinecode:result.data.Table[0].Machine_Code,
                    machinename:result.data.Table[0].Machine_Name,
                    status:result.data.Table[0].Status,
                   
                  });
                
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
  
  checkValidationErrors(group: FormGroup = this.edimachine): void {
  
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
     checkValidationErrorssubmit(group: FormGroup = this.edimachine): void {
   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
       
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
         //  alert("test");
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
          //  console.log("errorKey :" + errorKey)
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



   editmachinecancle(){
    this.router.navigate(['/MachineDetails']);
   }
editmachinesubmit(){

  console.log(this.edimachine.valid)
  if(this.edimachine.valid==false){
    this.checkValidationErrorssubmit(this.edimachine);
  }else{
    // console.log(this.edimachine.value.machinecode);
    // console.log(this.edimachine.value.machinename);
    
    // console.log(this.edimachine.value.status);
    this.isPageloaderVisible = true;
    var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Machine_Master_operations";
    let serviceUrl = this.commonService.commonUrl+"Account/Machine_Master_operations";
    let params = {
            "Sno":this.machineid,
            "Machine_ID":"",       
            "Machine_Code":this.edimachine.value.machinecode,      
            "Machine_Name":this.edimachine.value.machinename,
            "Trans_date":"", 
            "LoginId":this.userid, 
            "ClinicId":this.userid,
            "Condition":"Update", 
            "status":this.edimachine.value.status, 
            "branchid":"",
            "pagecount":""
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
              console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );
  
   
  
  
  }
  }
}
