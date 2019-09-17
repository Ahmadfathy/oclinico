import { Component, AfterViewInit ,OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';


import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-clinicinfo',
  templateUrl: './clinicinfo.component.html',
  styleUrls: ['./clinicinfo.component.css']
})
export class ClinicinfoComponent implements OnInit {

  closeResult: string;
  isPageloaderVisible : boolean =  false;

  registerForm:FormGroup;
  submitted=false;
  showform:boolean=false;
  ExpirityDate : any;
  //closed form errors
  mnth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  ValidationMessages = {
    'Subject': {
      'required': 'Subject is required',
     },
    'Message': {
      'required': 'Message is required',
     },
    'ExpirityDate': {
      'required': 'Expirity Date is required',
     }    
  }
  formErrors = {
    'Subject': '',
    'Message': '',
    'ExpirityDate': ''  
  }
  userid: string;
  msgDetails: any = [];
  draftTreatDetails: any =[];
  datechanged: boolean=false;
  

  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private formbuilder: FormBuilder,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http,
    private modalService: NgbModal,
    
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
ngAfterViewInit(){
  

}
  ngOnInit() {
    this.userid =  window.localStorage.getItem("userId");
    
   this.registerForm=this.formbuilder.group({
     Subject :['',Validators.required],
     Message:['',Validators.required],
     ExpirityDate:['',Validators.required]
   });    

   this.registerForm.valueChanges.subscribe((data) => {
    this.checkValidationErrors(this.registerForm);
});


this.GetMessageData();

//MODAL CODE



  }




checkValidationErrors(group: FormGroup = this.registerForm): void {   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
     
           const messages = this.ValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
         }
   
         if (abstractControl instanceof FormGroup) {
           console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }

  //closed on init event
  
  //
  checkValidationErrorssubmit(group: FormGroup = this.registerForm): void {

    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
    
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
      //  alert("test");
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
          console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
}
  


  onSubmit(){
  
 
console.log(this.registerForm.valid)
if(this.registerForm.valid==false){
 this.checkValidationErrorssubmit(this.registerForm);
}else{
  console.log(this.registerForm.value.Subject);
 console.log(this.registerForm.value.Message);
 console.log(this.registerForm.value.ExpirityDate); 

 console.log(this.registerForm.value.ExpirityDate.getDate())
 console.log(this.registerForm.value.ExpirityDate.getMonth())
 console.log(this.registerForm.value.ExpirityDate.getFullYear())
 let mn = this.registerForm.value.ExpirityDate.getMonth();
 console.log(this.mnth[mn])
 if (this.registerForm.valid == true) {
  //  this.submit_update = false;
   // let y = this.expenses.value.ExpirityDate.split("/")[0];
   // let m = this.expenses.value.ExpirityDate.split("/")[1];
   // let d = this.expenses.value.ExpirityDate.split("/")[2];
   this.ExpirityDate = this.registerForm.value.ExpirityDate.getDate() + "/" + (this.registerForm.value.ExpirityDate.getMonth()+1) + "/" + this.registerForm.value.ExpirityDate.getFullYear();
   console.log(this.ExpirityDate)


this.isPageloaderVisible = true;

var accessToken=  window.localStorage.Tokenval;
  console.log(accessToken);
     
  let serviceUrl = this.cmn.commonUrl+"Account/messagestopost";
  let params = 
              { 
                "msg_subject":this.registerForm.value.Subject,
                "Message":this.registerForm.value.Message,
                "Expiry_Date":  this.ExpirityDate, //"26/10/2019",
                "Trans_Date":"",
                "LoginId":this.userid,
                "Clinicid":this.userid,
                "condition":"Insert",
                "Branch":this.userid //"000104"
                }
    
          let headers = new Headers({"Content-Type" : "application/json",
                                    Accept : "application/json",
                                    Authorization : accessToken});
                                
          let options = new RequestOptions({ headers : headers });
         // this.PArray=[];
          this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            console.log(result);
            
            this.isPageloaderVisible = false;
            if(result.status_cd === "1"){
           alert("Message posted succussfully");
           this.GetMessageData();
           this.showform=false;
            }else{
            // this.hideLoader=true;
            alert("Pleae try again.");
            // this.showform=false;
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

  
  
  
   }
   else {
     console.log("Check date else.");
    // this.submit_update = true;
    // this.isPageloaderVisible = false;
    // this.CheckValidationErrors(this.expenses);
  }
}
  
 }
 datechange() {
  console.log('date changed');
  // this.datechanged = true;
}

 show(){
      this.showform=true;
   }
//  Cancel(){
//    this.showform=false;
// this.formErrors.ExpirityDate='';
// this.formErrors.Subject='';
// this.formErrors.Message='';
// }

Cancel() { 
  this.registerForm.patchValue({
  Subject: "",
  Message: "",
  ExpirityDate: ""
  })
  
  this.showform = false;
  this.formErrors = {
  'Subject': '',
  'Message': '',
  'ExpirityDate': ''
  }
  }

GetMessageData(){

  var accessToken=  window.localStorage.Tokenval;
    console.log(accessToken);
  
    var serviceUrl = this.cmn.commonUrl+"Account/messagestopost"
    var params  = { 
                "msg_subject":"",
                "Message":"",
                "Expiry_Date":"",
                "Trans_Date":"",
                "LoginId":this.userid,
                "Clinicid":this.userid,
                "condition":"Getpost",
                "Branch":""
                }
              
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
  
    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
     
  
      if(result.status_cd === "1"){
  
      console.log(result.data);
      this.msgDetails = result.data.Table
      this.draftTreatDetails= result.data.Table1
    
      }else{
          alert("No Data Found");
          
          // this.nodata = false;
      }
    },
    );
    error =>{
      console.log(error);
      alert(error);
      
    }
    
}

deletemsg(subject){
  // alert("delete message");
  // this.open("");
  console.log(subject);
  var accessToken=  window.localStorage.Tokenval;
    console.log(accessToken);
  
    
    var serviceUrl = this.cmn.commonUrl+"Account/messagestopost"
    var params  = { 
                "msg_subject":subject,
                "Message":"",
                "Expiry_Date":"",
                "Trans_Date":"",
                "LoginId":"",
                "Clinicid":this.userid,
                "condition":"msgDelete",
                "Branch":this.userid //"000104"
                }
              
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
  
    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
     
  
      if(result.status_cd === "1"){
  
      console.log(result.data);
      this.msgDetails = result.data.Table
      this.draftTreatDetails= result.data.Table1
      this.GetMessageData();
      }else{
          alert("Please try again.");
          
          // this.nodata = false;
      }
    },
    );
    error =>{
      console.log(error);
      alert(error);
      
    }
      


}

inactivemsg(subject){
  console.log(subject);
  var accessToken=  window.localStorage.Tokenval;
    console.log(accessToken);
  
    
    var serviceUrl = this.cmn.commonUrl+"Account/messagestopost"
    var params  = { 
                "msg_subject":subject,
                "Message":"",
                "Expiry_Date":"",
                "Trans_Date":"",
                "LoginId":"",
                "Clinicid":this.userid,
                "condition":"msgDelete",
                "Branch":this.userid //"000104"
                }
              
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
  
    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
     
  
      if(result.status_cd === "1"){
  
      console.log(result.data);
      this.msgDetails = result.data.Table
      this.draftTreatDetails= result.data.Table1
    
      this.GetMessageData();
      }else{
          alert("Please try again.");
          
          // this.nodata = false;
      }
    },
    );
    error =>{
      console.log(error);
      alert(error);
      
    }
   
 
}
// ------------------------------------------------------------------------------------
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
}