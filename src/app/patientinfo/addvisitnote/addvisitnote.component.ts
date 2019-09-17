import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DateTimeAdapter } from 'ng-pick-datetime';
@Component({
  selector: 'app-addvisitnote',
  templateUrl: './addvisitnote.component.html',
  styleUrls: ['./addvisitnote.component.css']
})
export class AddvisitnoteComponent implements OnInit {
  patient:any
  apoinemets=[]
  addvisitnote: FormGroup;
  userid:any=""
  submitted=false;
  doctors:any
  mainPatientId:any
  apoinment:boolean=false;
  patientId: string;
  patient_name: any;
  id: any;
  constructor( private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http,
    public dateTimeAdapter: DateTimeAdapter<any>) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1];
    this.patient= localStorage.getItem('patient')
    document.title="Add VisitNote"
    this.userid =  window.localStorage.getItem("userId")
    this.getdoctors() 
    this.patient_name = sessionStorage.patient_name;
    this. mainPatientId = sessionStorage.getItem('patientIdNew')
    this.addvisitnote = this.fb.group({
      doctor: ['', Validators.required],
      visitdate: ['', Validators.required],
      note: ['', Validators.required],
      appoinment:[""]
    })

    //alert(this.userid)

   
  }
  get f() { return this.addvisitnote.controls; }
  onSubmit() {
    this.submitted = true;
}
cancel(){
  var Refrral = this.patientId 
  //console.log(Refrral)
  this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
}

viewpatient(){
  var Refrral = this.patientId 
  //console.log(Refrral)
  this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
}
lab(){
  var Refrral = this.patientId 
  //console.log(Refrral)
  this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
}
createvisitenote(){
  let doctor = this.addvisitnote.value.doctor;
  let visitdate = this.addvisitnote.value.visitdate;
  let note = this.addvisitnote.value.note;
  let test=this.addvisitnote.status;
  let apoinment=this.addvisitnote.value.appoinment
  let apid= $('.apoint').val()

  if(apid==""||apid=="null"||apid=="Select"){
  this.apoinment=true
  return
  //apointment=="Select"||apointment=="None"
  }
  else{
    this.apoinment=false
  }
  if(test=="INVALID"){
    //this.apoinment=false
  return
  }
  else{
    //this.apoinment=true;
  }

  var accessToken = window.localStorage.Tokenval ;
    var url = this.cmn.commonUrl+"Account/VisitNote_Details";
    let body ={ 
      "Sno":"",
      "Clinicid":this.userid,
      "BranchID":this.userid,
      "VistID":apid,
      "PatientID":this.patientId ,
      "DoctorID":doctor,
      "Notes":note,
      "Status":"Active",
      "LoginID":this.userid,
      "Trans_Date":visitdate,
      "Last_update":"",
      "Arrival_Datetime":"",
      "Condition":"Insert"
      
      }
      //console.log(body)
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });
        this.http.post(url,body,options).map(res=>res.json()).subscribe(res=>{
         // console.log(res)
          if(res.status_cd == "1"){
        alert("Successfully Added")
        var Refrral =  this.patientId

        this.router.navigate(['/visitnote'],{ queryParams: { Refrral } });

       // this.router.navigate(['/visitnote']);
          }
          else{
            
           // console.log("error")
          }
        })
  
      err => {                       
        //console.log("ERROR!: ", err);  
      }
   // })
  }
  getdoctors() {
    var Role_id = window.localStorage.getItem("RoleID")
    if (Role_id == "3607") {
      this.id = window.localStorage.getItem("loginbaseId");
    }
    else {
      this.id = ""
    }
    var accessToken = window.localStorage.Tokenval ;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let body ={
        "FirstName":"",
        "par1":this.id,
        "par2":this.userid,
        "par3":"",
        "condition":"GetDoctor"  
        }
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl + "Account/GetPatients";
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == "1") {
          this.doctors = res.data.Table;
        }
      });
    //})
  }
  selectAppointment(event) {
    let doctors=(event.target.value)
   //alert(doctors)
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval ;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let body ={ 
         "FirstName":this.patientId , 
         "par1":doctors,
          "par2":this.userid,
         "par3":"", 
        "condition":"visitnote"
        
        }
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl +"Account/GetPatients";
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == "1") {
          this.apoinemets=res.data.Table;
         // this.apointVal = res.data.Table[0].
         // this.presription.controls.apointment.patchValue(res.data.Table[0].dt)
       
  
        }
      });
   // })
  
  
  
  
  }

  focusout(val){
    if(val == "select"||val==""){
      this.apoinment=true
      return false;
    }else{
      this.apoinment=false
    }
     }


    //  patientnamebind(){
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
