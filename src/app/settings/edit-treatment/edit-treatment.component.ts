import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http,Headers, RequestOptions } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.css']
})


export class EditTreatmentComponent implements OnInit {
  nullValue: any;
  treatname = this.nullValue;
  treatcode= this.nullValue;
  slottype=this.nullValue;
  sel_color = this.nullValue;
  treat_duration =this.nullValue;
  treat_color =this.nullValue;
  treat_cost =this.nullValue;
  treat_status=this.nullValue;
  treat_colorval=this.nullValue;
  treat_name: any="";
  //treat_code: any="";
  colorcode:any;
  repeatval:any;
  select : string = 'select'
  treatslot :any="";
  userid: string ="";
  selectedValue : any ="";
  tnamehide: boolean=true;
  tcodehide: boolean = true;
  statushide: boolean = true;
  myToastMsg: string;
  slothide: boolean = true;
  durhide: boolean = true;
  colorhide: boolean=true;
  costhide: boolean = true;
  valdurhide: boolean = true;
  languageoption:any;
  showsitings:boolean=false;
  public isPageloaderVisible = true;
  addtreatment: FormGroup;
  treatid:any;

  ValidationMessages = {
    
    'treatname': {
      'required': 'Please enter treatment name'
    },
    'treatcode':{
      'required': 'Please enter treatment code'
    },
    'slottype':{
      'required':'Please select slot type',
      'Select':'Please select slot type'
    },
    'treat_duration':{
      'required': 'Please enter the duration'
    },
    'treat_color':{
      'required': 'Please choose the color'
    },
    'treat_cost':{
      'required': 'Please enter the cost'
    },
  
   'treat_status':{
    'required':'Please select status',
    'Select':'Please select status'
  }, 'nsittings':{
    'required':'Please enter no.of sittings'
  },
  'repeat':{
    'required':'Please select repeat',
    'Select':'Please select repeat'
  }
  
    
  }

  ValidationMessagesarabic = {
      'treatname': {
        'required': 'الرجاء إدخال اسم العلاج'
      },
      'treatcode':{
        'required': 'الرجاء إدخال رمز العلاج'
      },
      'slottype':{
        'required':'الرجاء اختيار نوع الخانة',
        'Select':'الرجاء اختيار نوع الخانة'
      },
      'treat_duration':{
        'required': 'الرجاء إدخال المدة'
      },
      'treat_color':{
        'required': 'الرجاء اختيار اللون'
      },
      'treat_cost':{
        'required': 'الرجاء إدخال التكلفة'
      },
    
    'treat_status':{
      'required':'يرجى اختيار الحالة',
      'Select':'يرجى اختيار الحالة'
    }, 'nsittings':{
      'required':'الرجاء إدخال عدد جلسات '
    },
    'repeat':{
      'required':'الرجاء اختيار تكرار',
      'Select':'الرجاء اختيار تكرار'
    }
  }

  formErrors = {
   
    'treatname':'',
    'treatcode':'',
    'slottype':'',
    'nsittings':'',
    'repeat':'',
    'treat_duration':'',
    'treat_color':'',
    'treat_cost':'',
    'treat_status':''
    
   }
  // sel_color: any;
  constructor(public cmn: UserinfoService,private MainTitle: Title,private meta: Meta, 
    private fb: FormBuilder,
  private router: Router,
  public http: Http) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
document.title="Edittreatment"

    this.userid =  window.localStorage.getItem("userId");

    this.cmn.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
     // console.log(this.languageoption);
     this. formErrors = {
      'treatname':'',
      'treatcode':'',
      'slottype':'',
      'nsittings':'',
      'repeat':'',
      'treat_duration':'',
      'treat_color':'',
      'treat_cost':'',
      'treat_status':''

      
      }
  })

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.treatid = currentUrl[currentUrl.length - 1]
 //   console.log(this.treatid);
    this.addtreatment = this.fb.group({
   
      treatname:['',[Validators.required]],
      treatcode:['',[Validators.required]],
     // slottype:['select',[Validators.required]],
      slottype:['select',[Validators.required,CustomValidators.Select('select')]],
      nsittings:[],
      repeat:['select'],
      treat_duration:['',[Validators.required]],
      treat_color:['',[Validators.required]],
      treat_cost:['',[Validators.required]],
    //  treat_status:['select',[Validators.required]], 
      treat_status:['select',[Validators.required,CustomValidators.Select('select')]],
     
    });
    
    this.addtreatment.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.addtreatment);
  });
  this.addtreatment.patchValue({
    treat_color:this.addtreatment.value.treat_colorval
  });

  this.addtreatment.get('slottype').valueChanges.subscribe((data) =>{
    this.onchangeslot(data);
    })


this.gettreatmentdata();

  }

  onchangeslot(selectedValue:string){
  //  console.log(selectedValue);
   // const phoneControl = this.addtreatment.get('slottype');
    const phoneControlsittings = this.addtreatment.get('nsittings');
    const phoneControlrepeat = this.addtreatment.get('repeat');
    if(selectedValue == 'FixedSlot'){
      this.showsitings=true;
      phoneControlsittings.setValidators(Validators.required);
      phoneControlrepeat.setValidators((Validators.required,CustomValidators.Select('select')));


     
    } else {
      this.showsitings=false;
      this.addtreatment.patchValue({
        nsittings:"",
        repeat:"select"
      });
      phoneControlsittings.clearValidators();
      phoneControlrepeat.clearValidators();
    }
    phoneControlsittings.updateValueAndValidity();
    phoneControlrepeat.updateValueAndValidity();
  }

  gettreatmentdata(){
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
     // console.log(accessToken);

      // our service calling as usual
   
     //  let serviceUrl = "http://graylogic.net/OclinicoAPI/Api/Account/Treatment_Transactions"
      let serviceUrl = this.cmn.commonUrl+"Account/Treatment_Transactions"
      let params  = {
        "Sno":"",
        "Treatment_Id":this.treatid,
        "Treatment_Name":"", 
        "Treatmentcode":"",
        "Default_Duration":"", 
        "Login_Id":"", 
        "status":"",
        "Trans_Date":"", 
        "SlotType":"",
        "Noof_Sittings":"",
        "Repeats":"", 
        "Color":"",
        "Cost":"",
        "clinicid":"",
        "branchid":"",
        "Operation":"gettreatmentdetails",
        "pagecount":""
                     }

      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      // console.log(params);
      // console.log(serviceUrl);
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
       // console.log(result);
        this.isPageloaderVisible = false;

        if(result.status_cd === "1"){
          this.colorcode=result.data.Table[0].Color
            // if(result.data.Table[0].SlotType==="Fixed Slot"){
            //     this.showsitings=true;
            // }
           // console.log(result.data.Table[0].SlotType);
           if(result.data.Table[0].SlotType==="FixedSlot"){
             //  alert("test");
            this.showsitings=true;
            this.addtreatment.patchValue({
              nsittings:result.data.Table[0].Noof_Sittings,
              repeat:result.data.Table[0].Repeates
            })
           }else{
            this.showsitings=false;
            this.addtreatment.patchValue({
              nsittings:"",
              repeat:"select"
            })
           }
               this.addtreatment.patchValue({
                treatname:result.data.Table[0].Treatment_Name,
                treatcode:result.data.Table[0].Treatmentcode,
                slottype:result.data.Table[0].SlotType,
                treat_duration:result.data.Table[0].Default_Duration,
                treat_color:result.data.Table[0].Color,
                
                treat_cost:result.data.Table[0].Cost,
                treat_status:result.data.Table[0].Status,
               })   
      
        }else{
          this.isPageloaderVisible = false;
            this.myToastMsg = "No Data Found";
          
        }
      },
      );
      error =>{
        this.isPageloaderVisible = false;
      //  console.log(error);
      //  this.showToastMsg();
      }
        err => {
          this.isPageloaderVisible = false;
       //   console.log("Token Error:" + err);
        //  this.showToastMsg();
        }
      // }
      // );
  }
  colorclick(event){
  //  console.log(event);
  }
  checkValidationErrors(group: FormGroup = this.addtreatment): void {
    // console.log("sdf");
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
       
       //  console.log("test");
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
   checkValidationErrorssubmit(group: FormGroup = this.addtreatment): void {

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
changeColor(){
  console.log(this.addtreatment.value.treat_color);
  this.colorcode=this.addtreatment.value.treat_color;
  // this.sel_color = this.addtreatment.value.treat_color;
  // console.log(  this.sel_color);
  // this.addtreatment.patchValue({
  //   treat_cost: this.addtreatment.value.treat_colorval
    
  // });
}
treatmentcancle(){
  this.router.navigate(['/Treatment']);
}
  

 treatmentsubmit(){
  console.log(this.addtreatment.valid)
  if(this.addtreatment.valid==false){
    this.checkValidationErrorssubmit(this.addtreatment);
  }else{


    if(this.addtreatment.value.repeat=="select"||this.addtreatment.value.repeat=="undefined"||this.addtreatment.value.repeat==undefined){
      // alert("test");
       //this.addtreatment.value.repeat=="";
       this.repeatval="";
     }else{
       this.repeatval=this.addtreatment.value.repeat
     }
    //  console.log(this.addtreatment.value.treatname);
    //  console.log(this.addtreatment.value.treatcode);
    //  console.log(this.addtreatment.value.slottype);
    //  console.log(this.addtreatment.value.nsittings);
    //  console.log(this.repeatval);
    //  console.log(this.addtreatment.value.treat_color);
    //  console.log(this.colorcode);
    //  console.log(this.addtreatment.value.treat_duration); 
    //  console.log(this.addtreatment.value.treat_cost);   
     this.isPageloaderVisible = true;
    //  this.cmn.tokenFun().subscribe(tokenResult => {
    //         var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken=window.localStorage.Tokenval;
          //  console.log(accessToken);
        
            // our service calling as usual
            var serviceUrl = this.cmn.commonUrl+"Account/Treatment_Transactions"
            var params  = {
                          "Sno":"",
                          "Treatment_Id":this.treatid,
                          "Treatment_Name":this.addtreatment.value.treatname, 
                          "Treatmentcode":this.addtreatment.value.treatcode,
                          "Default_Duration":this.addtreatment.value.treat_duration, 
                          "Login_Id":"", 
                          "status":this.addtreatment.value.treat_status,
                          "Trans_Date":"", 
                          "SlotType":this.addtreatment.value.slottype,
                          "Noof_Sittings":this.addtreatment.value.nsittings,
                          "Repeats":this.repeatval, 
                          "Color":this.addtreatment.value.treat_color,
                          "Cost":this.addtreatment.value.treat_cost,
                          "clinicid":this.userid,
                          "branchid":"",
                          "Operation":"update",
                          "pagecount":""
                          }
            let headers = new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: accessToken
            });
            let options = new RequestOptions({ headers: headers });
        
            this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
              // console.log(result);
              // console.log(params)
        
              if(result.status_cd === "1"){
                this.isPageloaderVisible = false;
                    alert("Updated Successfully");
               // console.log(result.data.Table[0].output)
                this.router.navigate(['/Treatment']);
              }else{
                this.isPageloaderVisible = false;
                  this.myToastMsg = "Insertion failed, try again.";
                 // this.ToastFun();
                  // this.nodata = false;
              }
            },
            );
            error =>{
              this.isPageloaderVisible = false;
              //console.log(error);
             // this.showToastMsg();
            }
              err => {
                this.isPageloaderVisible = false;
               // console.log("Token Error:" + err);
              
              }
            // }
            // );
  }  

 } 



  cancel(){
this.router.navigate(['/Treatment']);
  }

 
}