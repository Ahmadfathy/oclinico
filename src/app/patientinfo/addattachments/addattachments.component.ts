import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';
@Component({
  selector: 'app-addattachments',
  templateUrl: './addattachments.component.html',
  styleUrls: ['./addattachments.component.css']
})
export class AddattachmentsComponent implements OnInit {
  patient:any
  id:any;
  Attachments: FormGroup;
  submitted = false;
  userid: any = ""
  result:any
  patientId: string;
  patient_name: any;
  constructor(private fb: FormBuilder, private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    //this.patientId =localStorage.getItem('patientId')
    this.patient_name = sessionStorage.patient_name;
   this.patient= localStorage.getItem('patient')
    document.title = "Add Attachments"
    this.userid = window.localStorage.getItem("userId")
    this.id = sessionStorage.getItem('patientIdNew')
    this.Attachments = this.fb.group({
      uploadfile: ['', Validators.required],

      description: ['', Validators.required],
      descriptiondetailes: ['', Validators.required],

    })
   
  }
  get f() { return this.Attachments.controls; }
  onSubmit() {
    this.submitted = true;
  }
  createattachements() {
    let uploadfile = this.Attachments.value.uploadfile;
    let description = this.Attachments.value.description;
    let descriptiondetailes = this.Attachments.value.descriptiondetailes;
    let test = this.Attachments.status;
    if (test == "INVALID") {

      return
    }


    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
    var accessToken = window.localStorage.Tokenval ;
      var url = this.cmn.commonUrl + "Account/Fileattch_Transactions";
      let body = {
        "Sno": "",
        "Clinicid": this.userid,
        "Branchid": "",
        "Patientid": this.patientId,
        "Attachment": this.result,
        "Description": description,
        "desciption_details": "",
        "Trans_date": "10008",
        "Last_Updated": descriptiondetailes,
        "condition": "Insert"
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
          alert("successfully Inserted")
          var Refrral =  this.patientId

          this.router.navigate(['/attachements'],{ queryParams: { Refrral } });
          //this.router.navigate(['/attachements'])
        }
        else {

          console.log("error")
        }
      })

    //   err => {
    //     console.log("ERROR!: ", err);
    //   }
    // })
  }
  cancel() {
    var Refrral = this.patientId
   // console.log(Refrral)
    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  viewpatient() {
    var Refrral = this.patientId

    this.router.navigate(['/viewpatient'], { queryParams: { Refrral } });
  }
  lab() {
    var Refrral = this.patientId

    this.router.navigate(['/laboratory'], { queryParams: { Refrral } });
  }

  fileup($event) {
  //  let uploatprof=this.patient.value.uploadidproof
   let fileSelected = $event.target.files[0]
   let formData:FormData = new FormData();
   formData.append('uploadFile', fileSelected, fileSelected.name);
 let body={
"image":fileSelected
 }
// console.log(body)
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;
      let headers = new Headers({
        //"Content-Type": "application/json",
        //Accept: "application/json",
        Authorization: accessToken
      });
      
      //http://graylogic.net/OclinicoAPI/Api/account/MultipleFileUpload
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl +"account/MultipleFileUpload";
      this.http.post(url, formData ,options).subscribe( (res) => { 
       // console.log(res)
        let body:string = JSON.parse(res['_body']);
this.result=body[0]
//console.log(this.result=body[0])
      });
    
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
