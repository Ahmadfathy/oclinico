import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jobtitle',
  templateUrl: './jobtitle.component.html',
  styleUrls: ['./jobtitle.component.css']
})
export class JobtitleComponent implements OnInit {
  public isPageloaderVisible:boolean=true;
  userid: string;
  public usersdata:any=[];
  dataTable: any =[];

  constructor(public http : Http, 
              private chRef: ChangeDetectorRef,
              public router:Router,
              public commonService:UserinfoService) {
      this.userid =  window.localStorage.getItem("userId");
      console.log("this.userid"+this.userid);
    }

  ngOnInit() {
        
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval
      let url= this.commonService.commonUrl+"Account/Role_Operations"
      let body={ 
        "clinicid":this.userid, 
        "branchid":this.userid,
        "loginid":this.userid,
        "RoleId":"",
        "RoleName":"",
        "Status":"",
        "Organisation_ID":"",
        "OperationType":"Getroles"
        }
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
              let options = new RequestOptions({ headers : headers });
      this.http.post(url,body,options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible=false;
        if(res.status_cd == 1){
          console.log(res);
          this.usersdata=res.data.Table;
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
         //console.log("usersdata..."+JSON.stringify(this.usersdata));
        }
        else{
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }
      // err=>{
      // console.log("Token Error:"+err);
      // } 
      // );
 // }
  editjobtitle(val){
    console.log(val);
    window.localStorage.setItem("eachroleid",val);
    this.router.navigate(['/editjobtitle']);
  }

}
