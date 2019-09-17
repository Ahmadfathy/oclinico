import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinicinformation',
  templateUrl: './clinicinformation.component.html',
  styleUrls: ['./clinicinformation.component.css']
})
export class ClinicinformationComponent implements OnInit {
  branches:any=[];
  userid:any;
  public isPageloaderVisible = true;
  
  constructor(private formBuilder: FormBuilder,
              public http: Http,
              public router: Router,
              public commonService: UserinfoService) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId")
    this.getdata();
  }

  getdata(){
    var accessToken =  window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/GetUser";
      let serviceUrl = this.commonService.commonUrl + "Account/GetUser"
      let params = {
        "text":"getBranchDetails",
        "id":this.userid,
        "param1":this.userid,
        "param2":""
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        this.isPageloaderVisible = false;
        if (result.status_cd === "1") {
          this.branches = result.data.Table;
        } else {
          this.isPageloaderVisible = false;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          this.isPageloaderVisible = false;
          console.log(error);
        }
      );
    // },
    //   err => {
    //     this.isPageloaderVisible = false;
    //     console.log("Token Error:" + err);
    //   }
    // );
  }

  gotoedit(id,memtype){
    console.log("id..... "+id);
    console.log("memtype. "+memtype);
    window.sessionStorage.setItem("branchid",id);
    if(memtype == "Clinic"){
      this.router.navigate(['/generalsettings']);
    }else{
      this.router.navigate(['/editbranch']);
    }
  }
  gotoview(id,metype){
    console.log("id..... "+id);
    console.log("memtype. "+metype);
    window.sessionStorage.setItem("branchid",id);
    if(metype == "Clinic"){
      this.router.navigate(['/generalsettings']);
    }else{
      this.router.navigate(['/viewbranch']);
    }
  }
}
