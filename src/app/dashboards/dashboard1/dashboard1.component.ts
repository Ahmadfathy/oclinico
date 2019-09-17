import { Component, AfterViewInit ,OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 
import { Chart } from 'chart.js';
@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {
  closeResult: string;
  paichartDept = [];
  DeptName="sample";
  DeptCnt="20";
  registerForm:FormGroup;
  submitted=false;
  showform:boolean=false;
  
  //closed form errors
  ValidationMessages = {
    'Subject': {
      'required': 'Subject is required',
     },
    'Message': {
      'required': 'Message is required',
     },
    'ExpirityDate': {
      'required': 'Expirity Date is required',
     }    
  }
  formErrors = {
    'Subject': '',
    'Message': '',
    'ExpirityDate': ''  
  }
  userid: string;
  msgDetails: any = [];
  draftTreatDetails: any =[];
  todayWeek: string;
  today: Date;
  
  userimgpath = this.cmn.userimgpath;
  username = window.localStorage.getItem("name");
  appointmentscount: any;
  doctorcount: any;
  patientcount: any;
  prescriptioncount: any;
  treatedcount: any;
  freebedlistcount: any;
  dischargecount: any;
  occupiedcount: any;
  daysurgerycount: any;
  laboratorycount: any;
  radiologycount: any;
  departmentcount: any;

  
  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private formbuilder: FormBuilder,
    public cmn: UserinfoService,
    private router: Router,
    public http: Http,
    private modalService: NgbModal
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    
  }
  
ngAfterViewInit(){}
  ngOnInit() {
    let j = new Array( 'Monday','Tuesday' , 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' );
    let d = new Date();
    this.todayWeek = j[d.getDay() - 1];
    this.today = d;
    document.title ="Dashboard";    
    this.userid =  window.localStorage.getItem("userId");    
   this.registerForm=this.formbuilder.group({
     Subject :['',Validators.required],
     Message:['',Validators.required],
     ExpirityDate:['',Validators.required]
   });    

   this.registerForm.valueChanges.subscribe((data) => {
    this.checkValidationErrors(this.registerForm);
});
this.userid =  window.localStorage.getItem("userId");
console.log("this.userid"+this.userid);
this.GetMessageData();
this.bindbarchart();
this.getdata();
}
getdata(){
  var accessToken= window.localStorage.Tokenval
  let url= this.cmn.commonUrl+"Account/GetUser"
  let body={
    "text":"Dashboard", 
    "id":this.userid , 
    "param1":"", 
    "param2":""
    }
    console.log(url)
    console.log(body)
  let headers = new Headers({"Content-Type" : "application/json",
                                    Accept : "application/json",
                                    Authorization : accessToken
                                  });
                                
          let options = new RequestOptions({ headers : headers });
        
  this.http.post(url,body,options)
  .map(res => res.json()).subscribe(res => {
    console.log(res)
    if(res.status_cd == 1){
      this.appointmentscount=res.data.Table[0].TodayappointmentCnt
      this.doctorcount=res.data.Table[0].DoctorsCNt;
      this.patientcount=res.data.Table[0].PatientCnt;
      this.prescriptioncount=res.data.Table[0].PrescriptionCnt;
      this.treatedcount=res.data.Table[0].Treatementcompleted;
      this.freebedlistcount=res.data.Table[0].NoOfBeds;
      this.dischargecount=res.data.Table[0]. DISCHARGED;
      this.occupiedcount=res.data.Table[0]. Occupied;
      this.daysurgerycount=res.data.Table[0].DaySurgery;
      this.laboratorycount=res.data.Table[0].Laboratory_count;
      this.radiologycount=res.data.Table[0].Radiology_count;
      this.departmentcount=res.data.Table[0].Department_count;
    }
    else{
     
    }
  },
    err => {
    
      console.log("ERROR!: ", err);
    });

}
   


checkValidationErrors(group: FormGroup = this.registerForm): void {   
       Object.keys(group.controls).forEach((key:string) => {
         const abstractControl = group.get(key);
         this.formErrors[key] = '';
        console.log(abstractControl);
         if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
     
           const messages = this.ValidationMessages[key];
           for (const errorKey in abstractControl.errors) {
             console.log("errorKey :" + errorKey)
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + '';
             }
           }
         }
   
         if (abstractControl instanceof FormGroup) {
           console.log(abstractControl)
           this.checkValidationErrors(abstractControl)
         }
       });
   }

  //closed on init event
  
  //
  checkValidationErrorssubmit(group: FormGroup = this.registerForm): void {

    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
    
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty|| abstractControl.pristine)) {
      //  alert("test");
        const messages = this.ValidationMessages[key];
        for (const errorKey in abstractControl.errors) {
          console.log("errorKey :" + errorKey)
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
}
  onSubmit(){
if(this.registerForm.valid==false){
 this.checkValidationErrorssubmit(this.registerForm);
}else{
 alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value)) 
   }
 }
 show(){
  this.showform=true;
 }
 Cancel(){
   this.showform=false;
this.formErrors.ExpirityDate='';
this.formErrors.Subject='';
this.formErrors.Message='';
}

GetMessageData(){

  var accessToken=  window.localStorage.Tokenval;
    console.log(accessToken);
    // Api/Account/messagestopost
    var serviceUrl = this.cmn.commonUrl+"Account/messagestopost"
    var params  = { 
                "msg_subject":"",
                "Message":"",
                "Expiry_Date":"",
                "Trans_Date":"",
                "LoginId":this.userid,
                "Clinicid":this.userid,
                "condition":"Getpost",
                "Branch":""
                }
              
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
  
    console.log(params)
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
     
  
      if(result.status_cd === "1"){
  
      console.log(result.data);
      this.msgDetails = result.data.Table
      this.draftTreatDetails= result.data.Table1
    
      }else{
          alert("No Data Found");
          
          // this.nodata = false;
      }
    },
    );
    error =>{
      console.log(error);
      alert(error);
      
    }
  }
      

// ------------------------------------------------------------------------------------
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
// Pie
public pieChartLabels: string[] = [
  'X Rays',
  'Laboratory'
];
public pieChartData: number[] = [300, 500];
public pieChartType = 'pie';

// lineChart
 public lineChartData: Array<any> = [
  { data: [65, 39, 80, 15, 76, 35, 40], label: 'Patient' },
  { data: [18, 58, 20, 69, 16, 27, 90], label: 'Appointment' },
  { data: [22, 78, 40, 39, 36, 57, 70], label: 'Discharged' }
];
public lineChartLabels: Array<any> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July'
];
public lineChartOptions: any = {
  responsive: true
};
public lineChartColors: Array<any> = [
  {
    // grey
    backgroundColor: 'rgba(54,190,166,.1)',
    borderColor: '#36bea6',
    pointBackgroundColor: '#36bea6',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#36bea6',
    borderWidth:'1'
  },
  {
    // dark grey
    backgroundColor: 'rgb(41,98,255,.1)',
    borderColor: '#2962FF',
    pointBackgroundColor: '#2962FF',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#2962FF',
    borderWidth:'1'
  },
  {
    // dark grey
    backgroundColor: 'rgba(71, 152, 232, .1)',
    borderColor: '#ffc107',
    pointBackgroundColor: 'green',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#2962FF',
    borderWidth:'1'
  }
];
public lineChartLegend = true;
public lineChartType = 'line';


//DEPARTMENTS CHART
bindbarchart(){  
var densityCanvas = document.getElementById("densityChart");
Chart.defaults.global.defaultFontFamily = "Poppins";
Chart.defaults.global.defaultFontSize = 14;
var densityData = {
  label: 'Doctors Available',
  data: [12, 23, 7, 5, 9, 20],
  backgroundColor: [
    'rgb(71, 152, 232)',
    'rgb(34, 198, 171)',
    'rgb(255, 188, 52)',
    'rgb(239, 110, 110)',
    'rgb(1, 192, 200)',
    'rgb(116, 96, 238)',
  ],
  borderColor: [
    'rgba(71, 152, 232, 1)',
    'rgba(34, 198, 171, 1)',
    'rgba(255, 188, 52, 1)',
    'rgba(239, 110, 110, 1)',
    'rgba(1, 192, 200, 1)',
    'rgba(116, 96, 238, 1)',
  ]
};

var chartOptions = {
  scales: {
    yAxes: [{
      barPercentage: 0.5
    }]
  },
  elements: {
    rectangle: {
      borderSkipped: 'left',
    }
  }
};

var barChart = new Chart(densityCanvas, {
  type: 'horizontalBar',
  data: {
    labels: ["Dental", "ENT", "Cardiology", "Urology", "Surgery","Internal"],
    datasets: [densityData],
  },
  options: chartOptions
});
}
  //CHART ENDS
}
