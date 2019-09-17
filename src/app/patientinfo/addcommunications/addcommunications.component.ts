import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-addcommunications',
  templateUrl: './addcommunications.component.html',
  styleUrls: ['./addcommunications.component.css']
})
export class AddcommunicationsComponent implements OnInit {
  nullValue: any;
  clinicname = this.nullValue;
  smsemail = this.nullValue;
  staffpatient = this.nullValue;
  staffval = this.nullValue;
  branchname = this.nullValue;
  mobno = this.nullValue;
  msg = this.nullValue;
  msgmail = this.nullValue;
  mto = this.nullValue;
  subject=this.nullValue;
  doctreat=this.nullValue;
  avlmsg=this.nullValue;
  sendmsg=this.nullValue;
  smsemailval:any;
  msgcountval:any;
  noofmsgs:number = 0;
  staffmembers:any=[];
  branchnames:any=[];
  showstaff:boolean=false;
  showerrorpationt:boolean=false;
  showmob:boolean=false;
  showmailinfo:boolean=false;
  patientinf:boolean=false;
  public selected_qarr : any = [];
  branchnameval: any = [];
  addcommunication: FormGroup;
  select:string='select';
  ValidationMessages = {
    'clinicname': {
      'required': 'Clinic Name is required',
     },
    'smsemail': {
      'required': 'Select SMS or Email',
     },
    'staffpatient': {
      'required': 'Select Staff/Patient',
      'Select':'Select Staff/Patient'
     },
    'staffval': {
      'required': 'Select Staff',
      'Select':'Select Staff'
     },
    'mobno': {
      'required': 'Mobile No Required',
     },
    'msg': {
      'required': 'Message is Required',
     },
    'msgmail': {
      'required': 'Message is Required',
     },
    'mto': {
      'required': 'To Required',
      'email':'please enter valid email id'
     },
    'subject': {
      'required': 'Subject Required',
     },
    'doctreat': {
      'required': 'Select Doctor/Treatment',
     },
    'branchname': {
      'required': 'Select Branch',
     },
    'avlmsg': {
      'required': 'Enter Available Messages',
     },
    'sendmsg': {
      'required': 'Enter send Messages',
     }
    
    
  }
  formErrors = {
    'clinicname': '',
    'smsemail':"",
    'staffpatient':"",
    'staffval':"",
    'mobno':"",
    "msg":"",
    "msgmail":"",
    "mto":"",
    "subject":"",
    "doctreat":"",
    "branchname":"",
    "avlmsg":"",
    "sendmsg":""
   
  }
  userid: string;
  patient_name: any;
  constructor(
    private meta: Meta,  private router: Router,
    public commonService:UserinfoService,
    private MainTitle: Title,public http: Http,
    private fb: FormBuilder
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    this.userid =  window.localStorage.getItem("userId")
  // alert(window.localStorage.getItem("name"));
    // window.localStorage.setItem("name", resp.data[0].Clinic_Name);
    
//this.getstaffmem();
this.getbranches();

    this.addcommunication = this.fb.group({
      clinicname:['',[Validators.required]],
      smsemail:['',[Validators.required]],
      staffpatient:['select',[Validators.required,CustomValidators.Select('select')]],
      staffval:['select'],
      mobno:[],
      mto:[],
      subject:[],
      msg:['',[Validators.required]],
      msgmail:['',[Validators.required]],
      branchname:['',[Validators.required]],
      avlmsg:[[]],
      sendmsg:[[]],
      doctreat:[],
      // phoneno:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      // //emailid:['',[Validators.required,Validators.email]],
      // emailid:['',[Validators.required,Validators.email]],
     
    });

    this.addcommunication.valueChanges.subscribe((data) => {
        this.checkValidationErrors(this.addcommunication);
        console.log(data);
        
    });
    this.addcommunication.get('staffpatient').valueChanges.subscribe((data) =>{
      this.onchangestaffpatient(data);
      })
    this.addcommunication.get('smsemail').valueChanges.subscribe((data) =>{
      this.onchangesradio(data);
      })
this.addcommunication.patchValue({
      clinicname:window.localStorage.getItem("name")
    });
  //  console.log(clinicname);
  }




  radioselection(event){
    //console.log(event)
   // console.log(event.target.value);
   var smsemail =event.target.value;
   console.log(smsemail);
  // this.smsemailval  = str.split(":")[1];
  // console.log(this.smsemailval);
 
  }
  doctreatselection(event){
    //console.log(event)
    console.log(event.target.value);
    this.getsendingmgs(event.target.value);
  //  var smsemail =event.target.value;
  //  console.log(smsemail);
  // this.smsemailval  = str.split(":")[1];
  // console.log(this.smsemailval);
 
  }


  getsendingmgs(staffid){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval ;
      console.log(accessToken);
      
      // our service calling as usual
  
     // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl+"Account/GetUser";
      let params = {
             "text":"getdetailsbyJobtitle",
              "id":this.userid,
              "param1":"",
               "param2":staffid
              }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                  this.addcommunication.patchValue({
                    sendmsg:result.data.Table[0].mbilcnt,
                  });
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      
      err=>{
      console.log("Token Error:"+err);
      }
      
      
  }
  meslength(){
    console.log(this.addcommunication.value.msg.length);
  //  this.addcommunication.patchValue({
      this.msgcountval=this.addcommunication.value.msg.length;
   // });

  if(this.addcommunication.value.msg.length % 160 === 0){
    this.noofmsgs++;
  }
  }
  getbranches(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;
      console.log(accessToken);
      
      // our service calling as usual
  
   //  let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl+"Account/GetUser";
      let params = {
            "text":"getallBranchesbyClinicid",
            "id":  this.userid,
            "param1":  this.userid,
            "param2":""
          }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                 this.branchnames = result.data.Table;
                // console.log(this.refnames );
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
      
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      
  }
  getsmsavliablecount(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;

      console.log(accessToken);
      
      // our service calling as usual
  
     // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl+"Account/GetUser";
      let params = {
        "text":"getSmsAvailcnt",
        "id":  this.userid,
        "param1":"",
        "param2":""
          }
        
              let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken});
                                    
              let options = new RequestOptions({ headers : headers });
             // this.PArray=[];
              this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                console.log(result);
                
                if(result.status_cd === "1"){
                  this.addcommunication.patchValue({
                    avlmsg:result.data.Table[0].qtycnt,
                  });
                //  this.branchnames = result.data.Table;
                // // console.log(this.refnames );
                
                }else{
                // this.hideLoader=true;
                  console.log(result.error_msg);
                  console.log(accessToken);
                }
              },
              error=>{
             //  this.hideLoader=true;
                console.log(error);
              //  console.log(accessToken);
             //   alert(error)
              }
              );
  
    
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      
  }

  selcatvalue(catid){
    console.log(catid);
    let temp = {
      "Qid" : catid,
      "Qstatus" : true,
                    
 }
 console.log(this.selected_qarr)
console.log(this.selected_qarr.length);

let Qstatus = "";
if(this.selected_qarr.length == 0){
  temp = {
        "Qid" : catid,
        "Qstatus" : true,
        }    
  this.selected_qarr.push(temp);
 
}else{
            for(var i=0;i<this.selected_qarr.length;i++){
              console.log("new"+ temp.Qid);
              console.log("old"+ this.selected_qarr[i].Qid);
              if(temp.Qid == this.selected_qarr[i].Qid){
               // alert("in");
                console.log("if. .");
                Qstatus = "true";
                this.selected_qarr.splice(i,1);
                break;
                //this.selected_qarr[i].Qstatus = temp.Qstatus;
              }else{
                //alert("out");
                console.log("else. .");
                Qstatus = "false";
              }
            }
            if( Qstatus == "true"){
              // alert(Qstatus);
                  
            }else{
             // alert("false");
              temp = {
                "Qid" : catid,
                "Qstatus" : true,    
                          
                }    
              this.selected_qarr.push(temp);
          
              
            }
           
      }
        console.log(this.selected_qarr);
        let Qids;
        this.branchnameval=[];
        for(var i=0;i<this.selected_qarr.length;i++){
          //Qids =   this.selected_qarr[i].Qid+","+Qids;
        this.branchnameval.push(this.selected_qarr[i].Qid);

            
        }
        
        // this.addcommunication.patchValue({
        //   branchname:this.branchnameval
        // });
 console.log(this.branchnameval.join(","));
//  this.addcommunication.value.staffval
 //console.log(this.addcommunication.value.branchname.join(","));
  }
  // changestaffpatient(eventval){
  //   //console.log(eventval);
  //   this.staffpatient=eventval.target.value;
  //   console.log(this.staffpatient);
  //   if(this.staffpatient=="Staff"){
  //     this.showstaff=true;
  //   //  this.staffval.setValidators(['',[Validators.required]]);
  //   }else{
  //     this.staffval.clearValidators();
  //     this.staffval="select";
  //     this.showstaff=false;
  //   }
  // }
  staffchange(eventval){
        console.log(eventval.target.value);
        this.getsendingmgs(eventval.target.value);
  }
  onchangestaffpatient(selectedValue:string){
          const phoneControl = this.addcommunication.get('staffval');
          const phoneControldoc = this.addcommunication.get('doctreat');
          console.log(selectedValue)
          if(selectedValue == 'Staff'){
            this.showerrorpationt=false;
            console.log(selectedValue)
             this.showstaff=true;
            phoneControl.setValidators((Validators.required,CustomValidators.Select('select')));
              
            this.addcommunication.patchValue({
              doctreat:""
            });
            this.patientinf=false;
            phoneControldoc.clearValidators();
          } else {
            this.showerrorpationt=false;
             this.showstaff=false;
             phoneControl.clearValidators();


             this.addcommunication.patchValue({
              staffval:"select"
            });
            this.patientinf=true;
             phoneControldoc.setValidators(Validators.required);
          }
          phoneControl.updateValueAndValidity();
          phoneControldoc.updateValueAndValidity();
    }
    onchangesradio(selectedValue:string){
          const phoneControl = this.addcommunication.get('mobno');
          const phoneControlTo = this.addcommunication.get('mto');
          const phoneControlsubject = this.addcommunication.get('subject');
          const phoneControlmailmsg = this.addcommunication.get('msgmail');
          const phoneControlmobilemsg = this.addcommunication.get('msg');
          console.log(selectedValue)
          if(selectedValue == 'sms'){
            this.getsmsavliablecount();
       // console.log(selectedValue)
          this.showmob=true;
          
          phoneControl.setValidators(Validators.required);
          phoneControlmobilemsg.setValidators(Validators.required);
  

          this.addcommunication.patchValue({
            mto:"",
            subject:"",
            msgmail:""
          });
          this.showmailinfo=false;
          phoneControlTo.clearValidators();
          phoneControlsubject.clearValidators();
          phoneControlmailmsg.clearValidators();
          } else {
          //  this.addcommunication.value.mobno=="";
           /// alert(this.addcommunication.value.mobno);

           this.addcommunication.patchValue({
              mobno:"",
              msg:"",
            });

            this.showmob=false;
            
            phoneControl.clearValidators();
            phoneControlmobilemsg.clearValidators();
       
            this.showmailinfo=true;
            phoneControlTo.setValidators(Validators.required);
            phoneControlsubject.setValidators(Validators.required);
            phoneControlmailmsg.setValidators(Validators.required);
          }
          phoneControl.updateValueAndValidity();
          phoneControlTo.updateValueAndValidity();
          phoneControlsubject.updateValueAndValidity();
          phoneControlmailmsg.updateValueAndValidity();
          phoneControlmobilemsg.updateValueAndValidity();
    }

  checkValidationErrors(group: FormGroup = this.addcommunication): void {
    // console.log("sdf");
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        // console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
         //  alert("test");
       //  console.log("test");
       //alert(this.languageoption);
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

   checkValidationErrorssubmit(group: FormGroup = this.addcommunication): void {

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
   addcommunicationcancle(){
    this.router.navigate(['/Communication']);
   }

addcommunicationsubmit(){
    console.log(this.addcommunication.valid)
    // if(this.addcommunication.value.staffpatient=="select"){
    //   this.showerrorpationt=true;
    //  }else{
    //   this.showerrorpationt=false;
    //  }

    if(this.addcommunication.valid==false){
      this.checkValidationErrorssubmit(this.addcommunication);
     
    }else {
      
      console.log(this.addcommunication.value.clinicname);
      console.log(this.addcommunication.value.smsemail);
      console.log(this.addcommunication.value.staffpatient);
      
    if(this.addcommunication.value.staffval=="select"){
      this.addcommunication.value.staffval="";
    }
    console.log(this.addcommunication.value.staffval);
      console.log(this.addcommunication.value.doctreat);
      console.log(this.branchnameval.join(","));

      console.log(this.addcommunication.value.mto);
      console.log(this.addcommunication.value.subject);
      console.log(this.addcommunication.value.mobno);
      console.log(this.addcommunication.value.msg);
      console.log(this.addcommunication.value.msgmail);
      console.log(this.addcommunication.value.avlmsg);
      console.log(this.addcommunication.value.sendmsg);
     


      // this.commonService.tokenFun().subscribe(tokenResult =>{
      //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

      var accessToken = window.localStorage.Tokenval ;
        console.log(accessToken);
        
        // our service calling as usual
    
      //  let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Cl_Communication";
        let serviceUrl = this.commonService.commonUrl+"Account/Cl_Communication";
        let params = {
                "sno":"",
                "clinicid":this.userid, 
                "Branchid":this.branchnameval.join(","),
                "LoginId":this.userid,
                "jobtitle":this.addcommunication.value.staffpatient,
                "jobrole":"Doctor",
                "docortreat":this.addcommunication.value.doctreat,
                "DocId":this.addcommunication.value.doctreat,
                "fromdt":"",
                "todt":"",
                "Msgtype":this.addcommunication.value.smsemail,
                "MobileNo":this.addcommunication.value.mobno,
                "Msgtext":this.addcommunication.value.msg,
                "Availblemsgcnt":this.addcommunication.value.avlmsg,
                "sendingmsgcnt":this.addcommunication.value.sendmsg,
                "totalmbilnum":"1",
                "transdt":"",
                "Condition":"SmsTransInsertion",
                "ToEmail":this.addcommunication.value.mto,
                "mailSub":this.addcommunication.value.subject,
                "EmailMsg":this.addcommunication.value.msgmail
                }
          
                let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken});
                                      
                let options = new RequestOptions({ headers : headers });
               // this.PArray=[];
                this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
                  console.log(result);
                  
                  if(result.status_cd === "1"){
                      alert("Inserted Successfully");
                      this.router.navigate(['/Communication']);
                  
                  }else{
                  // this.hideLoader=true;
                    console.log(result.error_msg);
                    console.log(accessToken);
                  }
                },
                error=>{
               //  this.hideLoader=true;
                  //console.log(error);
                //  console.log(accessToken);
               //   alert(error)
                }
                );
    
        
        err=>{
        console.log("Token Error:"+err);
        }
        
      



      }

}
}
