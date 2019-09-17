import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { RequestOptions, Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-followup',
  templateUrl: './patient-followup.component.html',
  styleUrls: ['./patient-followup.component.css']
})
export class PatientFollowupComponent implements OnInit {

  field1:any;
  field2:any;
  field3:any;
  field4:any;
  field5:any;
  field6:any;
  field7:any;
  field8:any;
  field9:any;
  field10:any;
  field11:any;
  field12:any;
  field13:any;
  field14:any;
  field15:any;
  field16:any;
  field17:any;
  field18:any;
  field19:any;
  field20:any;
  field21:any;
  field22:any;
  field23:any;
  field24:any;
  field25:any;
  field26:any;
  field27:any;
  field28:any;
  field29:any;
  field30:any;
  field31:any;
  field32:any;
  userid: any;
  id:any;
  constructor(private http: Http,
    public commonService: UserinfoService,
    private router: Router) {
      this.userid = window.localStorage.getItem("userId")
     }

  ngOnInit() {
    this.id = window.localStorage.getItem("loginbaseId");
  }

  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close();divToPrint.style.display = 'none' }, 1000);
  }
  myFunction() {
    window.print();
  }

  submit(){
    console.log(this.field1,
      this.field2,
      this.field3,
      this.field4,
      this.field5,
      this.field6,
      this.field7,
      this.field8,
      this.field9,
      this.field10,
      this.field11,
      this.field12,
      this.field13,
      this.field14,
      this.field15,
      this.field16,
      this.field17,
      this.field18,
      this.field19,
      this.field20,
      this.field21,
      this.field22,
      this.field23,
      this.field24,
      this.field25,
      this.field26,
      this.field27,
      this.field28,
      this.field29,
      this.field30,
      this.field31,
      this.field32,
      )
    var texfields;
    var d1 = this.field2+'/'+this.field3+'/'+this.field4;
    var d2 = this.field9+'/'+this.field10+'/'+this.field11;
    var d3 = this.field13+'/'+this.field14+'/'+this.field15;
    var d4 = this.field17+'/'+this.field18+'/'+this.field19;
    var d5 = this.field23+'/'+this.field24+'/'+this.field25;
    texfields = this.field1+','+d1+','+this.field5+','+this.field6+','+this.field7+','+this.field8+','+
                d2+','+this.field12+','+d3+','+this.field16+','+d4+','+this.field20+','+this.field21+','+
                this.field22+','+d5+','+this.field26+','+this.field27+','+this.field28+','+this.field29+','+
                this.field30+','+this.field31;
                console.log(texfields)
    var accessToken = window.localStorage.Tokenval1;
    let url = this.commonService.commonUrl+'Account/DocTreatment_Transactions';
    let body = {
      "Sno":"112", 
      "Practitioner_Id":window.localStorage.getItem("loginbaseId"),
      "Treatment_Id":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21", 
      "status":texfields, 
      "Login_ID":"", 
      "Trans_Date":"", 
      "Operation":"InsertTempletetransactionData", 
      "clinicid":this.userid, 
      "Branchid":"", 
      "Last_Updated":""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      if (res.status_cd == "1") {
        alert('Inserted Successfully');
        this.router.navigate(['/letters'],{ queryParams:{referallid : this.id}}); 
      } else {
      }
    },
    err => {
      console.log("Token Error:" + err);
    });
  }
}
