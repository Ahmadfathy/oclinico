import { Component, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-patient-transferreport',
  templateUrl: './patient-transferreport.component.html',
  styleUrls: ['./patient-transferreport.component.css']
})
export class PatientTransferreportComponent implements OnInit {

  firsthval: any;
  secondhval: any;
  thirdhval: any;
  seconddivone: any;
  seconddivtwo: any;
  seconddivthree: any;
  seconddivfour: any;
  seconddivfive: any;
  cof: any;
  history: any;
  clinicalexamination: any;
  investigation: any;
  diagnosis: any;
  lastdivone: any;
  lastdivtwo: any;
  lastdivthree: any;
  lastdivfour: any;
  userid: any;


  constructor(public http: Http,
    private router: Router,
    public commonService: UserinfoService, ) { }

  ngOnInit() {
    this.userid = window.localStorage.getItem("userId");
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
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }
  
  myFunction() {
    window.print();
  }

  submit() {
    var insertvalues = this.cof+','+this.history+','+this.clinicalexamination+','+this.investigation+','
    +this.diagnosis+','+this.firsthval +','+this.secondhval + ','+this.thirdhval+','+this.seconddivone+','
    +this.seconddivtwo+','+this.seconddivthree+','+this.seconddivfour+','+this.seconddivfive+','+this.lastdivone+','
    +this.lastdivtwo + ',' + this.lastdivthree + ',' + this.lastdivfour

    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    //let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Laboratory_Cashreceipts_Details";
    let params =
    {
      "Sno": "109",
      "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
      "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
      "status": insertvalues,
      "Login_ID": "",
      "Trans_Date": "",
      "Operation": "InsertTempletetransactionData",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //console.log(result);

      if (result.status_cd === "1") {
        alert("Inserted Successfully");
        this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      } else {
        console.log("else. .  .")
      }
    },
      error => {
        console.log(error);
      }
    );
    err => {
      console.log("Token Error:" + err);
    }
  }

}
