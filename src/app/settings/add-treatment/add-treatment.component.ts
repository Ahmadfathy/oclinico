import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import { Http,Headers, RequestOptions } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {
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
  languageoption:any;
  treat_name: any="";
  //treat_code: any="";
  repeatval:any;
  colorcode:any;
  
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
  public isPageloaderVisible = false;

  showsitings:boolean=false;
  addtreatment: FormGroup;


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
  },
  'nsittings':{
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
    },
    'nsittings':{
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
    public commonService:UserinfoService,
    private fb: FormBuilder,
  private router: Router,
  public http: Http) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {

    document.title="Add Treatment";
    this.userid =  window.localStorage.getItem("userId")


    this.cmn.currentMessagecat.subscribe(message => {
     // console.log(message);
      this.languageoption = message.split("_")[1];
    //  console.log(this.languageoption);
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

  }
  onchangeslot(selectedValue:string){
   // console.log(selectedValue);
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
  colorclick(event){
   // console.log(event);
  }
  checkValidationErrors(group: FormGroup = this.addtreatment): void {
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
        //   console.log(abstractControl)
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
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
}
changeColor(){
 // console.log(this.addtreatment.value.treat_color);
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
//  console.log(this.addtreatment.valid)
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
          //  console.log(accessToken);
          var accessToken=window.localStorage.Tokenval;
            // our service calling as usual
            var serviceUrl = this.cmn.commonUrl+"Account/Treatment_Transactions"
            var params  = {
                          "Sno":"",
                          "Treatment_Id":"",
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
                          "Operation":"Insert",
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
                    alert("Inserted Successfully");
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
             // console.log(error);
            //  this.showToastMsg();
            }
              err => {
                this.isPageloaderVisible = false;
             //   console.log("Token Error:" + err);
                //this.showToastMsg();
              }
            // }
            // );
  }  

 } 


  cancel(){
this.router.navigate(['/Treatment']);
  }

}