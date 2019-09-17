import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-m-addservicemastersettings',
  templateUrl: './m-addservicemastersettings.component.html',
  styleUrls: ['./m-addservicemastersettings.component.css']
})
export class MAddservicemastersettingsComponent implements OnInit {
  statustype: any = [];
  nullValue: any;
  servcode = this.nullValue;
  servmastername = this.nullValue;
  servprice = this.nullValue;
  servstatus = this.nullValue;
  languageoption:any;
  addservicemaster: FormGroup;
  select : string = 'Select';
  public isPageloaderVisible = false;

  ValidationMessages = {
    'servcode': {
      'required': 'Please enter Service code',
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
  userid: string="";
  constructor(
    private meta: Meta,  private router: Router,public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
  ngOnInit() {
    document.title="Add Service Master";
    this.userid =  window.localStorage.getItem("userId")
  
    // this.statustype = ['Active', 'InActive'];
    this.commonService.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
        this. formErrors = {
          'servcode': '',
          'servmastername': '',
          'servprice': '',
          'servstatus': '',
          }
      })

      this.addservicemaster = this.fb.group({
        servcode:['',[Validators.required]],
        servmastername:['',[Validators.required]],
        servprice:['',[Validators.required]],
        servstatus:['select',[Validators.required,CustomValidators.Select('select')]],
       
      });

      this.addservicemaster.valueChanges.subscribe((data) => {
          this.checkValidationErrors(this.addservicemaster);
      });

     

     



  }

  checkservname(event){
    //console.log(event.target.value)
    let sername=event.target.value
     if(sername==""||sername=="undefined"||sername==undefined){
     
    }else{
    this.chsckservicename(sername);
    }
  }
  chsckservicename(servnmae){
    var accessToken=window.localStorage.Tokenval;
    //  console.log(accessToken);
      
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
                      this.addservicemaster.patchValue({
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
             //   console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
    
     
  }

  checkValidationErrors(group: FormGroup = this.addservicemaster): void {
 // console.log("sdf");
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
     // console.log(abstractControl);
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
      //  alert("test");
    //  console.log("test");
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
        this.checkValidationErrors(abstractControl)
      }
    });
}
  checkValidationErrorssubmit(group: FormGroup = this.addservicemaster): void {
 // console.log("sdf");
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      //console.log(abstractControl);
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
      //  alert("test");
      console.log("test");
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


addservmastercancle(){
 this.router.navigate(['/ServiceMasterDetails']);
}
addservmastersubmit(){
  //alert("sample");

  // if( this.addreferal.value.companyname==""){
  //   alert("sample");
  // }
console.log(this.addservicemaster.valid)
if(this.addservicemaster.valid==false){
  this.checkValidationErrorssubmit(this.addservicemaster);
}else{


  //  console.log(this.addservicemaster.value.servcode);
  //  console.log(this.addservicemaster.value.servmastername);
  //  console.log(this.addservicemaster.value.servprice);
  // console.log(this.addservicemaster.value.servstatus);

this.isPageloaderVisible=true;
var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual

    let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Service_Master_details";
    let params = {
      "Sno":"",
      "Service_ID":"",
      "Servicecode":this.addservicemaster.value.servcode, 
      "Service_Name":this.addservicemaster.value.servmastername,
      "Price":this.addservicemaster.value.servprice, 
      "Status":this.addservicemaster.value.servstatus, 
      "Trans_date":"",
      "Loginid":this.userid, 
      "Clinicid":this.userid,
      "Condition":"Insert",
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
                  alert("Inserted Successfully");
                  this.router.navigate(['/ServiceMasterDetails']);
              
              }else{
                this.isPageloaderVisible=false;
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
              }
            },
            error=>{
              this.isPageloaderVisible=false;
           //  this.hideLoader=true;
            //  console.log(error);
            //  console.log(accessToken);
           //   alert(error)
            }
            );

  


}
 
}

}
