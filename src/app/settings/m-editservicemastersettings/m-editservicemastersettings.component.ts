import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-editservicemastersettings',
  templateUrl: './m-editservicemastersettings.component.html',
  styleUrls: ['./m-editservicemastersettings.component.css']
})
export class MEditservicemastersettingsComponent implements OnInit {
  servtid:any;
  statustype: any = [];
  nullValue: any;
  select : string = 'Select';
  servcode = this.nullValue;
  servmastername = this.nullValue;
  servprice = this.nullValue;
  servstatus = this.nullValue;
  languageoption:any;
  public isPageloaderVisible = true;
  editservicemaster: FormGroup;
  ValidationMessages = {
  
     'servcode': {
      'required': 'Please enter service Code',
     },
    'servmastername': {
      'required': 'Please enter service master name',
     },
    'servprice': {
      'required': 'Please enter service price',
     },
    'servstatus': {
      'required': 'Please select status',
      'Select':'Please select status'
     }
    
  }

  ValidationMessagesarabic = {
    'servcode': {
      'required': 'الرجاء إدخال رمز الخدمة',
     },
    'servmastername': {
      'required': 'الرجاء إدخال اسم ادارة الخدمة',
     },
    'servprice': {
      'required': 'الرجاء إدخال سعر الخدمة',
     },
    'servstatus': {
      'required': 'يرجى اختيار الحالة',
      'Select':'يرجى اختيار الحالة'
     }
  }

  formErrors = {
    'servcode': '',
    'servmastername': '',
    'servprice': '',
    'servstatus': '',
   
  }
  userid: any ="";
  constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
     document.title="Edit Service Master";
    this.userid =  window.localStorage.getItem("userId");

    this.commonService.currentMessagecat.subscribe(message => {
      //console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
        this. formErrors = {
          'servcode': '',
          'servmastername': '',
          'servprice': '',
          'servstatus': '',
          }
      })
  
   // this.statustype = ['Active', 'InActive'];
   var currentUrl = document.URL.split('?');
      currentUrl = currentUrl[currentUrl.length -1 ].split('=');
      this.servtid = currentUrl[currentUrl.length - 1]
     // console.log(this.servtid);
     
this.bindservmasterdata();
      this.editservicemaster = this.fb.group({
        servcode:['',[Validators.required]],
        servmastername:['',[Validators.required]],
        servprice:['',[Validators.required]],
        servstatus:['select',[Validators.required,CustomValidators.Select('select')]],
       
      });

      this.editservicemaster.valueChanges.subscribe((data) => {
          this.checkValidationErrors(this.editservicemaster);
      });
   
     



  }

  checkservname(event){
   // console.log(event.target.value)
    let sername=event.target.value
     if(sername==""||sername=="undefined"||sername==undefined){
     
    }else{
    this.chsckservicename(sername);
    }
  }
  chsckservicename(servnmae){
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);
      
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Service_Master_details";
      let serviceUrl = this.commonService.commonUrl+"Account/Service_Master_details";
      let params = {
        "Sno":"",
        "Service_ID":"",
        "Servicecode":"", 
        "Service_Name":servnmae,
        "Price":"", 
        "Status":"", 
        "Trans_date":"",
        "Loginid":"", 
        "Clinicid":this.userid,
        "Condition":"checkservice",
        "BranchId":"", 
        "pagecount":""
          }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
             //   console.log(result);
                
                if(result.status_cd === "1"){
                    if(result.data.Table[0].result=="True"){

                    }else{
                      alert("service master name already exist")
                      this.editservicemaster.patchValue({
                        servmastername:'',
                      });
                    }
                 
                }else{
                 
                
                // this.hideLoader=true;
                  // console.log(result.error_msg);
                  // console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
              //  console.log(error);
              
              }
              );
    
      
  }



  checkValidationErrors(group: FormGroup = this.editservicemaster): void {
 // console.log("sdf");
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
     // console.log(abstractControl);
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
  checkValidationErrorssubmit(group: FormGroup = this.editservicemaster): void {
 // console.log("sdf");
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      //console.log(abstractControl);
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
     
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
          console.log("errorKey :" + errorKey)
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
bindservmasterdata(){
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Service_Master_details";

    let serviceUrl = this.commonService.commonUrl+"Account/Service_Master_details"

    let params = {
      "Sno":this.servtid,
      "Service_ID":"",
      "Servicecode":"", 
      "Service_Name":"",
      "Price":"", 
      "Status":"", 
      "Trans_date":"",
      "Loginid":"", 
      "Clinicid":this.userid,
      "Condition":"GetData",
      "BranchId":"", 
      "pagecount":""
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
           // this.PArray=[];
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
           //   console.log(result);
              
              if(result.status_cd === "1"){
                this.isPageloaderVisible=false;
               // this.referaldetails = result.data;
            //   console.log(result.data.Table[0].Company_Name);
               this.editservicemaster.patchValue({
                 
                servcode:result.data.Table[0].Service_Code,
                servmastername:result.data.Table[0].Service_Name,
                servprice:result.data.Table[0].Service_Price,
                servstatus:result.data.Table[0].Status,

              });
              }else{
                this.isPageloaderVisible=false;
              // this.hideLoader=true;
               
              }
            },
            error=>{
              this.isPageloaderVisible=false;
           //  this.hideLoader=true;
            //  console.log(error);
           
            }
            );

    
}

editservmastercancle(){
 this.router.navigate(['/ServiceMasterDetails']);
}
editservmastersubmit(){

//console.log(this.editservicemaster.valid)
if(this.editservicemaster.valid==false){
  this.checkValidationErrorssubmit(this.editservicemaster);
}else{


  //  console.log(this.editservicemaster.value.servcode);
  //  console.log(this.editservicemaster.value.servmastername);
  //  console.log(this.editservicemaster.value.servprice);
  // console.log(this.editservicemaster.value.servstatus);

  this.isPageloaderVisible=true;
  var accessToken=window.localStorage.Tokenval;
  //  console.log(accessToken);
    

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Service_Master_details";
    let serviceUrl = this.commonService.commonUrl+"Account/Service_Master_details"

    let params = {
          "Sno":this.servtid,
          "Service_ID":"",
          "Servicecode":this.editservicemaster.value.servcode, 
          "Service_Name":this.editservicemaster.value.servmastername,
          "Price":this.editservicemaster.value.servprice, 
          "Status":this.editservicemaster.value.servstatus, 
          "Trans_date":"",
          "Loginid":this.userid, 
          "Clinicid":this.userid,
          "Condition":"Update",
          "BranchId":"", 
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
                this.isPageloaderVisible=false;
                  alert("Updated Successfully");
                  this.router.navigate(['/ServiceMasterDetails']);
              
              }else{
                this.isPageloaderVisible=false;
              // this.hideLoader=true;
               // console.log(result.error_msg);
              //  console.log(accessToken);
              }
            },
            error=>{
              this.isPageloaderVisible=false;
           //  this.hideLoader=true;
           //   console.log(error);
           
            }
            );

   


}
 
}

}
