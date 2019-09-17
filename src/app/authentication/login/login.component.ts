import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Output() language = new EventEmitter();

  loginvalid: boolean;
  fpasswordvalid: boolean;
  wrongCred: boolean = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  login: FormGroup;
  langenglish: boolean;
  langarabic: boolean;
  flag = "us";

  forgotPswFG: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public cmn: UserinfoService,
    public http: Http
  ) {
    this.login = this.formBuilder.group({
      Username: ['', [Validators.required]],
      // , Validators.pattern(this.emailPattern)
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


    this.forgotPswFG = this.formBuilder.group({
      recoveryemail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    })
    //   this.flag = 'EN';
    // this.cmn.changeMessagecat("uid_" + this.flag);
  }



  //   updateFlag = (flag) => {
  //     if (flag === 'eng') {
  //       this.flag = 'us';
  //       this.cmn.changeMessagecat("uid_" + this.flag);
  //     } else {
  //       this.flag = 'sa';
  //       this.cmn.changeMessagecat("uid_" + this.flag);
  //     }
  //     this.cmn.currentuserlanguage(this.flag);
  // }



  loginform = true;
  recoverform = false;

  // private login: FormGroup;
  submitted = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;

  }
  ngOnInit() {
    this.langenglish = true;
    this.flag = 'EN';
  }
  changelag = (lang) => {
    this.langenglish = false;
    this.langarabic = false;
    if (lang === 'English') {
      this.flag = 'EN';
      this.langenglish = true;
    } else {
      this.flag = 'AR';
      this.langarabic = true;
    }
    console.log(this.flag);
  }
  // changelag = (lang) => {
  //   this.langenglish = false;
  //   this.langarabic = false;
  //   if(lang === 'English') {
  //   this.flag = 'EN';
  //   this.cmn.changeMessagecat("uid_" + this.flag);
  //   this.langenglish = true;
  //   } else {
  //   this.flag = 'AR';
  //   this.cmn.changeMessagecat("uid_" + this.flag);
  //   this.langarabic = true;
  //   }
  //   }


  get f() {
    // this.wrongCred = true;
    return this.login.controls;
  }

  get fgt() {
    return this.forgotPswFG.controls;
  }
  inputkeyups() {
    this.wrongCred = true;
  }
  onSubmit() {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    } else {
      this.loginvalid = true;
      var url = this.cmn.commonUrl + "Login/Login"
      var params = {
        "Email": this.login.value.Username,
        "Pwd": this.login.value.password,
        "Operation": "ChckLogin"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(url, params, options).map(res => res.json()).subscribe(resp => {

        console.log(resp);
        if (resp.status_cd === "1") {
          this.wrongCred = true;
          localStorage.setItem('isLoggedin', 'true');
          window.localStorage.setItem("username", resp.data[0].Email)
          window.localStorage.setItem("name", resp.data[0].Uname);
          window.localStorage.setItem("userId", resp.data[0].Clinicid);
          // userid: 
          window.localStorage.setItem("LoginUId", resp.data[0].userid);
          window.localStorage.setItem('loginbaseId', resp.data[0].userid1);
          this.cmn.currentUid(resp.data[0].userid);
          window.localStorage.setItem("oclinicologinStatus", resp.data[0].Status)
          this.cmn.currentusername(resp.data[0].Uname)
          this.cmn.currentemail(resp.data[0].Email);
          this.cmn.currentLoginStatus(resp.data[0].Status);
          var mydata = resp.data[0].Pwd
          this.convertPassword(mydata);
          var setlocal = this.convertPassword(mydata);
          window.localStorage.setItem("pval", setlocal);
          this.cmn.currentRole(resp.data[0].role_id);
          window.localStorage.setItem("RoleID", resp.data[0].role_id);
          window.localStorage.setItem("Roletype", resp.data[0].Roletype);
          console.log(this.flag);
          this.cmn.currentSel_Lang(this.flag);
          var tokenuname = window.localStorage.getItem("username");
          var psw = window.localStorage.getItem("pval")
          var dpsw = this.decryptPassword(psw);
          console.log(dpsw);
          var commonToken = "https://api.oclinico.com/oclinicoapi/token"
          var params = `username=${tokenuname}&password=${dpsw}&grant_type=${"password"}`
          this.http.post(commonToken, params).map(res => res.json())
            .subscribe(tokenResult => {
              console.log(tokenResult);
              var accessToken = tokenResult.token_type + " " + tokenResult.access_token
              console.log(accessToken)
              window.localStorage.Tokenval = accessToken;
              // window.sessionStorage.Tokenval=accessToken
              console.log(window.localStorage.Tokenval)
              window.localStorage.Tokenval1 = accessToken;
              // if((window.localStorage.Tokenval! = "") || (window.localStorage.Tokenval! = undefined)){
              if (window.localStorage.getItem("oclinicologinStatus") == "Active") {
                this.cmn.changeMessagecat("uid_" + this.flag);
                this.router.navigate(['/dashboard']);
              } else {
                this.cmn.changeMessagecat("uid_" + this.flag);
                this.router.navigate(['/settings']);
              }
              // }
            },
          );
        } else {


          this.wrongCred = false;
          this.loginvalid = false;
        }
      },
        err => {
          alert("Please try again");
        }
      );


    }
  }
  decryptPassword(password) {

    return password.slice(0, -6).split('').reverse().join('')

  }

  ForgotPswSubmit() {
    // alert("ForgotPswSubmit");
    this.submitted = true;

    if (this.forgotPswFG.invalid) {
      return;
    } else {
      this.fpasswordvalid = true;
      var url = this.cmn.commonUrl + "Login/ForgotPassword?Mailid=" + this.forgotPswFG.value.recoveryemail
      this.http.get(url).map(res => res.json()).subscribe(resp => {
        if (resp.status_cd === "1") {
          alert("Check your Email and instructions will be sent to you!")
          this.loginform = true;
          this.recoverform = false;
          // this.wrongCred = true;
          this.forgotPswFG.value.recoveryemail = "";
        } else {


          // this.wrongCred = false;
          this.fpasswordvalid = false;
          //  this.login.get('Username').setValue('');
          //  this.login.get('password').setValue('');
          // alert("Invalid Details")
        }
      },
        err => {
        }
      );

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



