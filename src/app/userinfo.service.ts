import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  private userdetails = new BehaviorSubject("0");
  myuname = this.userdetails.asObservable();
  
  private userdetails1 = new BehaviorSubject<any>([]);
  myuser = this.userdetails.asObservable();

  private loginemail = new BehaviorSubject("0");
  myemail = this.loginemail.asObservable();


  private loginType = new BehaviorSubject("0");
  myloginType = this.loginType.asObservable()

  private loginRoleid = new BehaviorSubject("0");
  myRoleId = this.loginRoleid.asObservable()

  private loginlang = new BehaviorSubject("");
  loginselected_lang = this.loginlang.asObservable()


  private loginUid = new BehaviorSubject("0");
  myloginuid = this.loginUid.asObservable()
  
  username =  'User name' ;
  useremail = 'user@mail.com';
  userimgpath = 'assets/images/user.jpg';
  public  commonUrl : any ="";
  public commonToken : any;

  // ----------anji----------------------
  
  private messageSourcecat = new BehaviorSubject('');
  currentMessagecat = this.messageSourcecat.asObservable();
  

  constructor( public http : Http) { 
    
   // this.commonUrl = "http://23.92.209.46/OclinicoAPI/Api/";
    //  this.commonUrl = "http://graylogic.net/OclinicoAPI1/Api/";
     this.commonUrl =  "https://api.oclinico.com/oclinicoapi/api/" ;
    
  }
  ngOnInIt(){}
  currentusername(message: string) {
    this.userdetails.next(message)
  }

  currentemail(message: string){
    this.loginemail.next(message)
  }
  currentuserlanguage(message: string) {
    this.userdetails1.next(message)
    }

  currentLoginStatus(message : string){
    this.loginType.next(message)
  }

// ----------anji----------------------
changeMessagecat(message: string) {
  this.messageSourcecat.next(message)
}
//------------- Role id--------------

currentRole(message: string){
  this.loginRoleid.next(message);
}


currentUid(message : string){
  this.loginUid.next(message);
}

currentSel_Lang(message : string){
  this.loginlang.next(message)
}
// -------------------------------Token Function -------------------------


tokenFun(){
  console.warn('Token Called.');
  var tokenuname = window.localStorage.getItem("username");
  var psw = window.localStorage.getItem("pval")
  var dpsw = this.decryptPassword(psw);
   console.log(dpsw);

 // this.commonToken = "http://23.92.209.46/OclinicoAPI/token"
//  this.commonToken= "http://graylogic.net/OclinicoAPI1/token"
  this.commonToken = "https://api.oclinico.com/oclinicoapi/token"

  var params = `username=${tokenuname}&password=${dpsw}&grant_type=${"password"}`

  this.http.post(this.commonToken, params).map(res=>res.json())
 .subscribe(tokenResult=>{
  
  console.log(tokenResult);

  var accessToken = tokenResult.token_type + " " + tokenResult.access_token
  window.localStorage.Tokenval = accessToken;
  window.localStorage.Tokenval1 = accessToken;
},
);

};




// setTimeout(tokenFun()=>{ 
//      //<<<---    using ()=> syntax
//   this.messageSuccess = false;
// }, 3000);

// -------------------------------Decrypt Password -------------------------
decryptPassword(password){
   
  return  password.slice(0,-6).split('').reverse().join('')
  
  }

}
