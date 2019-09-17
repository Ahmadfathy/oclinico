import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserinfoService } from '../../userinfo.service'
@Component({
  selector: 'app-numbersettingsdetails',
  templateUrl: './numbersettingsdetails.component.html',
  styleUrls: ['./numbersettingsdetails.component.css']
})
export class NumbersettingsdetailsComponent implements OnInit {

 
  nembersettingsdetails = [];
 
  refcheckedval:any;
  message:string;
  dataTable : any =[];
  userid: any = "";
  public isPageloaderVisible = true;
  constructor(private http: HttpClient,public router : Router,public commonService:UserinfoService,public https: Http,
     private chRef : ChangeDetectorRef)
    // private dataserv: EvntserviceService
     { }

  ngOnInit() {
    document.title="NumberSettings"
    this.userid =  window.localStorage.getItem("userId");
  
this.getnumbersettings();

  }


 


 getnumbersettings(){
  var accessToken=window.localStorage.Tokenval;
   // console.log(accessToken);
    
    // our service calling as usual

    // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/NumberSetting_Transactions";
    let serviceUrl = this.commonService.commonUrl+"Account/NumberSetting_Transactions"
    let params = {
      "Sno":"",
      "Patient_No":"",       
      "Appointment_No":"",      
      "Invoice_No":"", 
      "Cash_Reciept":"", 
      "Expenses":"",
      "Trans_Date":"", 
      "Login_Id":"", 
      "Clinicid":this.userid,
      "operation":"GetNoSettings"
            }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
          
            this.https.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
              // console.log(result);
              // console.log(result.data.Table);
              this.isPageloaderVisible = false;
              if(result.status_cd === "1"){
                this.nembersettingsdetails = result.data.Table;
                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable();
              
              }else{
              // this.hideLoader=true;
                // console.log(result.error_msg);
                // console.log(accessToken);
                this.chRef.detectChanges();
                const table: any = $('table');
                this.dataTable = table.DataTable();
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

}
