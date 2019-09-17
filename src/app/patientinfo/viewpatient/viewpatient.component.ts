import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.css']
})
export class ViewpatientComponent implements OnInit {
  payment: any;
  pay: boolean;
  patientid: any;
  userid: any = ""
  table = []
  table1 = []
  table2 = []
  mainPatientId: string = '';
  billingAddress: any;
  title: any;
  First_name: any
  Middle_name: any
  Last_Name: any
  Ara_firstname: any
  Ara_fathername: any
  Ara_Lastname: any;
  Last_update: any
  DOB: any
  Gender: any
  Marital_status: any
  Mobileno: any
  Home_phone: any
  Work_phoneno: any
  Email: any
  Area: any;
  Block: any
  Buliding: any
  Street: any
  Floor: any
  Country: any
  City: any
  Identification_type: any
  Identification_no: any
  Expiry: any
  Identification_attachment: any
  Occupation_Name: any
  Emergency_contact: any
  Notes: any
  Nationality: any;
  Reminder_type: any
  common_address: any
  Area1: any;
  Block1: any
  Building: any;
  Street1: any
  Floor1: any
  city: any
  Country_Name: any
  paymentmode: any
  referal_type: any
  name: any;
  contact: any
  cronic: any
  patientname: any;
  currentUid: string;
  patientId: string;
  patient_name: any;
  constructor(private http: Http, private cmn: UserinfoService, public router: Router,
    private route: ActivatedRoute, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    var getids = url1[1].split('=')[1]
    this.patientId = getids.split(":")[0]
   

    this.payment = localStorage.getItem('patientPaymentStatus')

    if (this.payment == "pending") {
      this.pay = true
    }
    else {
      this.pay = false
    }
    document.title = "View Patient"
    this.userid = window.localStorage.getItem("userId")
    

    localStorage.setItem('patientId', this.patientid);
    sessionStorage.setItem('patientIdNew', this.patientid)
    this.patientid =   localStorage.getItem('patientId');
    sessionStorage.setItem("patientId",this.patientId);
    //console.log(sessionStorage.getItem('patientIdNew'));
    // this.mainPatientId = patientid;
    console.log(this.cronic);
    this.cronic = localStorage.getItem('cronic')
    //console.log(this.cronic)



    // let id = this.route.snapshot.paramMap.get('patientid');
    let patientid = localStorage.getItem('userId')

    //alert(patientid)
    this.getdata();
    this.patientnamebind()
  }





  getdata() {
    //service call
    // this.cmn.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token

    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    // our service calling as usual
    let url = this.cmn.commonUrl + "Account/Patient_operations";

    let body = {
      "sno": this.patientId,
      "clinicid": this.userid,
      "loginid": this.userid,
      "patient_id": this.patientId,
      "Title": "",
      "Ara_firstname": "",
      "Ara_Lastname": "",
      "Ara_fathername": "",
      "First_name": "",
      "Last_Name": "",
      "Middle_name": "",
      "DOB": "",
      "DOB_Arabic": "",
      "Gender": "",
      "Marital_status": "",
      "Identification_type": "",
      "Identification_no": "",
      "Identification_attachment": "",
      "Identification_Expiry": "",
      "Nationality": "",
      "Occupation": "",
      "Area": "",
      "Block": "",
      "Building": "",
      "Street": "",
      "Floor": "",
      "City": "",
      "Country": "",
      "Email": "",
      "Mobileno": "",
      "Home_phone": "",
      "Work_phoneno": "",
      "Emergency_contact": "",
      "Notes": "",
      "Reminder_type": "",
      "status": "",
      "Trans_date": "",
      "Last_update": "",
      "Condition": "GetDate",
      "Par1": "",
      "Par2": "",
      "Par3": ""

    }
    console.log(body)
    //alert(localStorage.getItem('patientId'))
    //alert(localStorage.getItem('userId'))
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res);
      if (res.status_cd == "1") {

        console.log(res.data);

        let patientname = res.data.Table[0].Title + " " + res.data.Table[0].First_name + " " + res.data.Table[0].Middle_name + " " + res.data.Table[0].Last_Name;
        localStorage.setItem("patient", patientname)
        sessionStorage.setItem("patient", patientname)
        
        this.table = res.data.Table;
        this.table1 = res.data.Table1
        this.table2 = res.data.Table2

        // this.billingAddress = res.data.Table[0].comm_address;
        this.title = res.data.Table[0].Title;
        this.First_name = res.data.Table[0].First_name
        this.Middle_name = res.data.Table[0].Middle_name;
        this.Last_Name = res.data.Table[0].Last_Name
        this.Last_Name = res.data.Table[0].Last_Name


        this.Ara_firstname = res.data.Table[0].Ara_firstname
        this.Ara_fathername = res.data.Table[0].Ara_fathername
        this.Ara_Lastname = res.data.Table[0].Ara_Lastname
        this.DOB = res.data.Table[0].DOB
        this.Gender = res.data.Table[0].Gender
        this.Marital_status = res.data.Table[0].Marital_status

        this.Mobileno = res.data.Table[0].Mobileno
        this.Home_phone = res.data.Table[0].Home_phone
        this.Work_phoneno = res.data.Table[0].Work_phoneno
        this.Email = res.data.Table[0].Email

        this.Area = res.data.Table[0].Area
        this.Block = res.data.Table[0].Block
        this.Buliding = res.data.Table[0].Building
        this.Street = res.data.Table[0].Street
        this.Floor = res.data.Table[0].Floor
        this.Country = res.data.Table[0].Country
        this.City = res.data.Table[0].City


        this.Identification_type = res.data.Table[0].Identification_type
        this.Identification_no = res.data.Table[0].Identification_no
        this.Expiry = res.data.Table[0].Expiry
        this.Last_update = res.data.Table[0].filepath;
        this.Last_update = res.data.Table[0].filepath;
        this.Occupation_Name = res.data.Table[0].Occupation_Name
        this.Emergency_contact = res.data.Table[0].Emergency_contact
        this.Notes = res.data.Table[0].Notes
        this.Nationality = res.data.Table[0].Country_Name
        this.Identification_attachment = res.data.Table[0].Identification_attachment;

        this.common_address = res.data.Table[0].comm_address
        this.Area1 = res.data.Table[0].Area
        this.Block1 = res.data.Table[0].Block
        this.Building = res.data.Table[0].Building
        this.Street1 = res.data.Table[0].Street

        this.Floor1 = res.data.Table[0].Floor
        this.city = res.data.Table[0].city
        this.Country_Name = res.data.Table[0].Country_Name

        this.paymentmode = res.data.Table[0].paymentmode
        this.referal_type = res.data.Table[0].referal_type
        this.name = res.data.Table[0].name
        this.contact = res.data.Table[0].contact
        this.Reminder_type = res.data.Table[0].Reminder_type
        //this.patientname=(this.title + '' + '' + this.First_name + '' + this.Middle_name + ''+ this.Last_Name)
        //alert(this.patientname)
      } else {

        this.table = res.data.Table;

      }
    }, error => {
      alert("There is an error occured, Please try again.")
    }
  )





    // }),
    //   err => {
    //     console.log("Token Error:" + err);
    //   }

  }

  edit() {
  var patientid=  this.patientId;
   
    //alert(patientid)
    this.router.navigate(['/editpatient'], { queryParams: { patientid } });
  }

  patientnamebind(){
    var accessToken = window.localStorage.Tokenval ;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let body={"text": "patient_name",
      "id": this.patientId,
      "param1": "",
      "param2": ""
      }
      let options = new RequestOptions({ headers: headers });
      var url = this.cmn.commonUrl + "Account/GetUser";
      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == "1") {
          this.patient_name = res.data.Table[0].PatientName;
          sessionStorage.patient_name = res.data.Table[0].PatientName;
        }
      });
  }
}
