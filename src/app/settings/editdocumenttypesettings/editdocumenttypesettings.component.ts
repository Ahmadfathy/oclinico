import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editdocumenttypesettings',
  templateUrl: './editdocumenttypesettings.component.html',
  styleUrls: ['./editdocumenttypesettings.component.css']
})
export class EditdocumenttypesettingsComponent implements OnInit {
  nullValue: any;
  documenttype = this.nullValue;
  //docoterid:any;
  status = this.nullValue;
  documentid:any;
  editdoctype: FormGroup;
  select : string = 'Select';
  languageoption:any;
  //daysarr:any=[];
  public isPageloaderVisible = true;
  ValidationMessages = {
    
    'documenttype': {
      'required': 'Please enter Document Type'
    },
    'status': {
      'required': 'Please select Status',
      'Select':'Please select Status'
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
       document.title="EditDocumentType";
    this.userid =  window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
     this. formErrors = {
      'documenttype':'',
      'status':'',
      }
  })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.documentid = currentUrl[currentUrl.length - 1]
    //console.log(this.documentid);

    this.editdoctype = this.fb.group({
   
      documenttype:['',[Validators.required]],
    
      status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.editdoctype.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editdoctype);
    //  console.log(data);
  });
  // this.addfollowup.get('docname').valueChanges.subscribe((data) =>{
  //   this.checkdoctorname(data);
  //   })

  this.binddoctypedata();

  }

  binddoctypedata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      
      // our service calling as usual
    
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Documenttype_Master_details";
      let serviceUrl = this.commonService.commonUrl+"Account/Documenttype_Master_details";
      let params = {
        "Sno":this.documentid,
        "Paymodetype_ID":"",       
        "DocumentType":"",      
        "Status":"", 
        "Trans_Date":"", 
        "Loginid":"",
        "Clinicid": this.userid ,
        "Condition":"GetData"
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
                   // alert("Inserted Successfully");
                  //  this.router.navigate(['/Referaldiscounts']);
               // this.docoterid=result.data.Table[0].Practitioner_Id
               this.editdoctype.patchValue({
                documenttype:result.data.Table[0].DocumentType,
                status:result.data.Table[0].Status,
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
              //  console.log(error);
              
              }
              );
    
      // },
      // err=>{
      //   this.isPageloaderVisible = false;
      // console.log("Token Error:"+err);
      // }
      
      // );
  }
  checkValidationErrors(group: FormGroup = this.editdoctype): void {
  
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
     checkValidationErrorssubmit(group: FormGroup = this.editdoctype): void {
   
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



   editdoctypecancle(){
    this.router.navigate(['/DocumentType']);
   }
   editoctypebmit(){

 // console.log(this.editdoctype.valid)
  if(this.editdoctype.valid==false){
    this.checkValidationErrorssubmit(this.editdoctype);
  }else{
   // console.log(this.editdoctype.value.documenttype);
    
   // console.log(this.editdoctype.value.status);
    this.isPageloaderVisible = true;
  // this.commonService.tokenFun().subscribe(tokenResult =>{
  //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
  var accessToken=window.localStorage.Tokenval;
    //console.log(accessToken);
    
    // our service calling as usual
  
    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Documenttype_Master_details";
    let serviceUrl = this.commonService.commonUrl+"Account/Documenttype_Master_details";
    let params = {
          "Sno":this.documentid,
          "Paymodetype_ID":"",       
          "DocumentType":this.editdoctype.value.documenttype,      
          "Status":this.editdoctype.value.status, 
          "Trans_Date":"", 
          "Loginid":this.userid,
          "Clinicid":this.userid,
          "Condition":"Update"
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
                  this.router.navigate(['/DocumentType']);
              
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
  
  //   },
  //   err=>{
  //     this.isPageloaderVisible = false;
  // //  console.log("Token Error:"+err);
  //   }
    
  //   );
  
  
  }
  }

}
