import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions, JsonpModule } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  @Output() language = new EventEmitter();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  register : FormGroup;
  submitted = false;
  loginvalid: boolean;
  emailexist : boolean= false;
  bnameexist : boolean = false;
  regFailed: boolean = false;
  flag = 'us';
  langenglish: boolean;
  langarabic: boolean;
  SelectedLang :any = "English";

  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              public cmn : UserinfoService,
              public http : Http
            ) 
  {
    this.register = this.formBuilder.group({
      businessname : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      // updateOn: 'change'
  });
   }


   ngOnInit() {
    this.langenglish = true;
    this.SelectedLang = "English";
    }
    changelag = (lang) => {
    this.langenglish = false;
    this.langarabic = false;
    if(lang === 'English') {
    this.flag = 'us';
    this.langenglish = true;
    this.SelectedLang = "English";
    } else {
    this.flag = 'sa';
    this.langarabic = true;
    this.SelectedLang = "عربى";
    }
    }

  get f() { 
  
    return this.register.controls;
   }

  RegisterSubmit(){
    this.submitted = true;
    console.log("register submit");
    console.log(this.register.invalid);
    if (this.register.invalid) {
              return;
          }else{
          this.loginvalid = true;
    var url = this.cmn.commonUrl+"Login/Registrations_Transactions"
    console.log(url);
    var params =   { 
      "sno":"",
      "Clinicid":"",
      "Clinic_Name":"",
      "First_Name":"",
      "middle_Name":"",
      "Last_Name":"",     
      "Arafirst_Name":"",
      "Aralast_Name":"",
      "Ara_Fathername":"",
      "Email":this.register.value.email,
      "Pwd":this.register.value.password,
      "Communicationemailid":"",
      "Mail_trans":"",
      "mailpwd":"",
      "phoneno":"",
      "mobileno":"",
      "Clinicno":"",
      "Address":"",
      "city":"",
      "country":"",
      "Bus_Idno":"",
      "Bus_Idimg":"",
      "National_Idno":"",
      "National_Idimg":"",
      "Mun_licno":"",
      "Mun_licimg":"",
      "Website":"",
      "Map_url":"",
      "SlotType":"",
      "Slot_First":"",
      "Slot_standard":"",
      "timetype":"",
      "Trans_Date":"",
      "Last_updated":"",
      "Status":"",
      "LoginId":"",
      "ClinicStarttiming":"",
      "ClinicEndtiming":"",
      "ClinicSess2Start":"",
      "ClinicSess2end":"",
      "day":"",
      "Operation":"Insert",
      "branchId":this.register.value.businessname 
      
       }
  
                let headers = new Headers({"Content-Type" : "application/json",
                                                        Accept : "application/json",
                                                     });
                                                    
               let options = new RequestOptions({ headers : headers });
               console.log(params);
      this.http.post(url, params, options).map(res=>res.json()).subscribe(resp =>{
          console.log(resp)
  
          if(resp.status_cd === "1"  ){
            
            this.regFailed =false;

            console.log(resp.data);
            var regiArray = resp.data;
  
            window.localStorage.setItem("username",regiArray.Table[0].Email)
            window.localStorage.setItem("name", resp.data.Table[0].Clinic_Name );
            window.localStorage.setItem("userId", resp.data.Table[0].Clinicid);
            window.localStorage.setItem("oclinicologinStatus", resp.data.Table[0].Status)

           this.cmn.currentusername(resp.data.Table[0].Clinic_Name )
  
            this.cmn.currentemail( resp.data.Table[0].Email);
            this.cmn.currentLoginStatus(resp.data.Table[0].Status);
            
            console.log(resp.data.Table[0].Pwd);
          var mydata =resp.data.Table[0].Pwd

           this.convertPassword(mydata);
          var setlocal = this.convertPassword(mydata);
               console.log(setlocal);
         window.localStorage.setItem("pval", setlocal);

            // this.router.navigate(['/dashboard']);
            alert("Registered successfully with 'Oclinico'. ");
            if( window.localStorage.getItem("oclinicologinStatus") == "Active"){
              this.router.navigate(['/dashboard']);
            }else{
              this.router.navigate(['/settings']);
            }
  
          }else{
          
           this.loginvalid = false;
           this.regFailed =true;

           alert("Registration failed, try again.")
          //  this.login.get('Username').setValue('');
          //  this.login.get('password').setValue('');
            console.log("Registration Failed")
          }
      },
      err =>{
        console.log("err");
      }
      );
  
    
    }
  }

  // =========================Email  check==========================

  emailku(){
    this.emailexist =false;
  }
  emailCheck(){
    console.log("emailcheck");

    console.log(this.register.value.email)

    if(this.register.value.email != ""){

    
    var url = this.cmn.commonUrl+"Login/Getdata_By_Id"
    var params = { 
      "operation":"CheckEmailID",
      "value":this.register.value.email,
      "uid":""
      }
  let headers = new Headers ({ "Content-Type" : "Application/json",
                                Accept : "Application/json"});
                
        let options = new RequestOptions({headers : headers});

      this.http.post(url, params, options).map(res=>res.json()).subscribe(resp=>{
        console.log(resp);
console.log(params);
        if(resp.status_cd === "1"){
          console.log(resp.data[0].output);
          // setTimeout(
            this.emailexist =true
          // , 1000)
          
        }else{
          console.log("email not existed.")
          this.emailexist =false;
        }
        error =>{
          this.emailexist =false;
          console.log(error);
        }
      },);
    }
  }
// =========================Business name check==========================

businesku(){
  this.bnameexist =false;
}
  bnamecheck(){
    console.log("bname check");

    console.log(this.register.value.businessname)
    if(this.register.value.businessname != ""){
    var url = this.cmn.commonUrl+"Login/Getdata_By_Id"
    var params = { 
      "operation":"CheckUsername",
      "value":this.register.value.businessname,
      "uid":""
      }
  let headers = new Headers ({ "Content-Type" : "Application/json",
                                Accept : "Application/json"});
                
        let options = new RequestOptions({headers : headers});

      this.http.post(url, params, options).map(res=>res.json()).subscribe(resp=>{
        console.log(resp);
console.log(params);
        if(resp.status_cd === "1"){
          console.log(resp.data[0].output);
          this.bnameexist =true;
        }else{
          console.log("business name not existed.")
          this.bnameexist =false;
        }
        error =>{
          console.log(error);
        }
      },);
    }
  }

    randomText(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
  
    convertPassword(password) {
         password = password.split('').reverse().join('') + this.randomText(6);
        return password
    }
}

