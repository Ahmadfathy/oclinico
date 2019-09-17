import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewattachment',
  templateUrl: './viewattachment.component.html',
  styleUrls: ['./viewattachment.component.css']
})
export class ViewattachmentComponent implements OnInit {
  patient: any
  atachments: any;
  userid: any = ""
  patientId: any;
  patient_name: any;
  constructor(private fb: FormBuilder, 
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    this.patient = localStorage.getItem('patient')
    var url = document.URL
    var url1 = url.split('?')
    var data1 = url1[1].split('&')[0]
    console.log(data1);
    var sno = data1.split('=')[1];
    console.log(sno);
    var data2 = url1[1].split('&')[1];
    console.log(data2);
    this.patientId = data2.split('=')[1];
    // this.patientId =localStorage.getItem('patientId')
    document.title = "View Attachments"
    this.userid = window.localStorage.getItem("userId")
    // var url = document.URL
    // var url1 = url.split('?')
    // var sno = url1[1].split('=')[1]
    this.getdata(sno);
    
  }

  getdata(sno) {

    // this.cmn.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    //console.log(accessToken);

    // our service calling as usual
    var url = this.cmn.commonUrl + "Account/Fileattch_Transactions";
    let body = {
      "Sno": sno,
      "Clinicid": this.userid,
      "Branchid": "",
      "Patientid":this.patientId,
      "Attachment": "",
      "Description": "",
      "Trans_date": "",
      "Last_Updated": "",
      "condition": "Getattachments"
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "1") {
        //this.Attachments.controls.uploadfile.patchValue(result.data.Table[0].Attachment)
        // this.Attachments.controls.description.patchValue(result.data.Table[0].Description)
        // this.Attachments.controls.descriptiondetailes.patchValue(result.data.Table[0].desciption_details)
        this.atachments = (result.data.Table[0].Attachment)

        //$('#dataTable_wrapper').hide();
      }
      else {

        // this.table = result.data.Table;



      }


    })

    // },
    // err=>{
    // console.log("Token Error:"+err);
    // }

    // );
  }

  viewpatient() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  lab() {
    var Refrral = localStorage.getItem('patientId')
    //console.log(Refrral)
    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  // patientnamebind() {
  //   var accessToken = window.localStorage.Tokenval;
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: accessToken
  //   });
  //   let body = {
  //     "text": "patient_name",
  //     "id": this.patientId,
  //     "param1": "",
  //     "param2": ""
  //   }
  //   let options = new RequestOptions({ headers: headers });
  //   var url = this.cmn.commonUrl + "Account/GetUser";
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //     // console.log(res)
  //     if (res.status_cd == "1") {
  //       this.patient_name = res.data.Table[0].PatientName;
  //     }
  //   });
  // }

}
