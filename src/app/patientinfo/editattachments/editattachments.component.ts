import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editattachments',
  templateUrl: './editattachments.component.html',
  styleUrls: ['./editattachments.component.css']
})
export class EditattachmentsComponent implements OnInit {
  patient: any
  id: any
  result: any
  Attachments: FormGroup;
  submitted = false;
  userid: any = ""
  table = [];
  atachments: any;
  Sno: any;
  patientId: any;
  patient_name: any;
  constructor(private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
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
    this.patient_name = sessionStorage.patient_name;
    this.id = sessionStorage.getItem('patientIdNew')
    document.title = "Edit Attachments"
    this.userid = window.localStorage.getItem("userId")
    this.Attachments = this.fb.group({
      uploadfile: ['', Validators.required],
      description: ['', Validators.required],
      descriptiondetailes: ['', Validators.required],
    })
    this.getdata(sno)
  }

  get f() { return this.Attachments.controls; }

  onSubmit() {
    this.submitted = true;
  }

  getdata(sno) {
    // this.cmn.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    // console.log(accessToken);
    // our service calling as usual
    var url = this.cmn.commonUrl + "Account/Fileattch_Transactions";
    let body = {
      "Sno": sno,
      "Clinicid": this.userid,
      "Branchid": "",
      "Patientid": this.patientId,
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
      //console.log(result)
      if (result.status_cd == "1") {
        //this.Attachments.controls.uploadfile.patchValue(result.data.Table[0].Attachment)
        this.Attachments.controls.description.patchValue(result.data.Table[0].Description)
        this.Attachments.controls.descriptiondetailes.patchValue(result.data.Table[0].desciption_details)
        this.atachments = (result.data.Table[0].Attachment)
        this.Sno = (result.data.Table[0].Sno)

        //$('#dataTable_wrapper').hide();
      }
      else {

        // this.table = result.data.Table;



      }


    })

    //},
    err => {
      console.log("Token Error:" + err);
    }

    //);
  }

  createattachements() {
    // alert(this.Sno)
    let uploadfile = this.Attachments.value.uploadfile;
    let description = this.Attachments.value.description;
    let descriptiondetailes = this.Attachments.value.descriptiondetailes;
    let test = this.Attachments.status;
    if (test == "INVALID") {

      return
    }


    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token


    var accessToken = window.localStorage.Tokenval;
    var url = this.cmn.commonUrl + "Account/Fileattch_Transactions";
    let body = {
      "Sno": this.Sno,
      "Clinicid": this.userid,
      "Branchid": this.userid,
      "Patientid": this.id,
      "Attachment": this.result,
      "Description": description,
      "desciption_details": "",
      "Trans_date": this.userid,
      "Last_Updated": descriptiondetailes,
      "condition": "update"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      // console.log(res)
      if (res.status_cd == "1") {
        alert("successfully Updated")
        var Refrral = this.patientId

        this.router.navigate(['/attachements'], { queryParams: { Refrral } });
        // this.router.navigate(['/attachements'])
      }
      else {

        // console.log("error")
      }
    })

    err => {
      console.log("ERROR!: ", err);
    }
    //})
  }
  cancel() {
    var Refrral = localStorage.getItem('patientId')
    // console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
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
  fileup($event) {
    //  let uploatprof=this.patient.value.uploadidproof
    let fileSelected = $event.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    //console.log(body)
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    let headers = new Headers({
      //"Content-Type": "application/json",
      //Accept: "application/json",
      Authorization: accessToken
    });

    //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
    let options = new RequestOptions({ headers: headers });
    var url = this.cmn.commonUrl + "account/MultipleFileUpload";
    this.http.post(url, formData, options).subscribe((res) => {
      //  console.log(res)
      let body: string = JSON.parse(res['_body']);
      this.result = body[0]
      //console.log(this.result=body[0])
    });
    // })
  }

  // patientnamebind(){
  //   var accessToken = window.localStorage.Tokenval ;
  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken
  //     });
  //     let body={"text": "patient_name",
  //     "id": this.patientId,
  //     "param1": "",
  //     "param2": ""
  //     }
  //     let options = new RequestOptions({ headers: headers });
  //     var url = this.cmn.commonUrl + "Account/GetUser";
  //     this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
  //       console.log(res)
  //       if (res.status_cd == "1") {
  //         this.patient_name = res.data.Table[0].PatientName;
  //       }
  //     });
  // }

}
