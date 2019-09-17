import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  public isPageloaderVisible:boolean=true;
  viewuser: FormGroup;
  public eachuser:any;
  public userid:any;
  hdformat: string;
  sdformat: string;
  b2dobformat: string;
  issueddatedoc: string;
  expireddatedoc: string;
  educationenddatedoc: string;
  startdatedoc: string;
  enddatedoc: string;
  regdate: string;
  issued_date: string;
  expr_date: string;
  vehivleedate: string;
  insexdate: string;
  takingdate: string;
  returningdate: string;
  tinput: any;
  Englishinput: any;
  Englishinput1: any;
  Englishinput2: any;
  titleinput: any;
  tinput1: any;
  titleinput2: any;
  genderinput: any;
  docinput: any;
  docnoinput: any;
  departmentinput: any;
  professionofres: any;
  jobinput: any;
  sponserinput: any;
  hierachyinput: any;
  hireinput: string;
  Startdateinput: string;
  mobileinput: any;
  homephoneinput: any;
  salaryinput: any;
  Statusinput: any;
  scheduletypeinput: any;
  reportinginput: any;
  password: any;
  empid: any;
  public timingsarray:any=[];
  public timingsdaysif:boolean=false;
  public timingsif:boolean=false;
  laborofficeinput: any;
  dateofbirthinput: string;
  placeofbirthinput: any;
  religioninput: any;
  nationinput: any;
  maritalinput: any;
  emailidinput: any;
  jobtypeinput: any;
  positionlevelinput: any;
  salarypayableinput: any;
  banknameinput: any;
  branchnameinput: any;
  accountnoinput: any;
  areainput: any;
  blockinput: any;
  buildinginput: any;
  streetinput: any;
  floorinput: any;
  cityinput: any;
  countryinput: any;
  documentypeinput: any;
  numberinput: any;
  uploaddocinput: any;
  dateofissueinput: any;
  expiredateinput: any;
  degreeinput: any;
  universityinput: any;
  gpainput: any;
  dateofgraduationinput: any;
  degreecertificateinput: any;
  nameofcourseinput: any;
  placeofissueinput: any;
  startdate_input: any;
  enddateinput: any;
  coursecertificateinput: any;
  socialsecurityinput: any;
  dateofreginput: any;
  placeofreginput: any;
  healthinsuranceinput: any;
  healthincompanyinput: any;
  issueddateinput: any;
  expirydateinput: any;
  insurancetypeinput: any;
  insurancenoinput: any;
  insurancecopyinput: any;
  modelyearinput: any;
  makeinput: any;
  modelinput: any;
  vinnoinput: any;
  milesinput: any;
  platenoinput: any;
  licencenoinput: any;
  licenceexdateinput: any;
  licenceattachementinput: any;
  insurancecomptinput: any;
  plicynoinput: any;
  exdateinput: any;
  insuranceattachmentinput: any;
  assigndateinput: any;
  returndateinput: any;
  notesinput: any;
  sessionwisearray:any=[];
  daywisearray:any=[];
  

  constructor(public commonService:UserinfoService,
    private formBuilder: FormBuilder,
              public http:Http) { 
                this.eachuser=window.localStorage.getItem("eachuserdat")
                console.log(this.eachuser);
               this.userid =  window.localStorage.getItem("userId");
               console.log("empid"+this.userid);
              }

  ngOnInit() {
    this.getsaveddata();
    this.viewuser = this.formBuilder.group({
      scheduletypeinput:[]

    });
  }
  selectwise(val){
    if(val == "Day Wise"){
      this.timingsdaysif=true;
           this.timingsif=false;
    }
    else if(val == "Session Wise"){
      this.timingsdaysif=false;
      this.timingsif=true;
    }
   
  }
  getsaveddata(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval
      let url= this.commonService.commonUrl+"Account/GetUser"
      let body={ 
        "text":"staff_Information",
        "id":this.userid,
        "param1":this.eachuser,
        "param2":this.eachuser    
        
        }
        console.log(body);
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
              let options = new RequestOptions({ headers : headers });
      this.http.post(url,body, options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible=false;
        if(res.status_cd == 1){
      
          console.log(res);
     
           //...........................basic info1.........
           this.tinput= res.data.Table[0].Title;
           this.Englishinput=res.data.Table[0].First_name;
           this.Englishinput1=res.data.Table[0].Middle_name;
           this.Englishinput2=res.data.Table[0].Last_name;
           this.titleinput=res.data.Table[0].ARA_Fname;
           this.tinput1=res.data.Table[0].ARA_FatherName;
           this.titleinput2=res.data.Table[0].ARA_Lname;
           this.genderinput=res.data.Table[0].Gender;
           this.docinput=res.data.Table[0].Identification_type;
           this.docnoinput=res.data.Table[0].Identification_cardno;
           this.departmentinput=res.data.Table[0].Department;
           this.empid=res.data.Table[0].Emp_Id;
           this.password=res.data.Table[0].Pwd;
           this.professionofres=res.data.Table[0].Residence_card;
           this.jobinput=res.data.Table[0].jobtitle;
           this.sponserinput=res.data.Table[0].Sponsersname;
          this.reportinginput=res.data.Table[0].jobtitle;
         this.hierachyinput=res.data.Table[0].hierarchy;
         this.hireinput=res.data.Table[0].Hire_date;
         this.Startdateinput=res.data.Table[0].start_date;
         this.mobileinput=res.data.Table[0].Mobile;
         this.homephoneinput=res.data.Table[0].Homeno
         this.salaryinput=res.data.Table[0].Salary;
         this.Statusinput=res.data.Table[0].status;
         this.scheduletypeinput=res.data.Table[0].schedule_type;
        //  this.timingsarray=res.data.Table1;
        for(let j=0;j<res.data.Table1.length;j++){
          if(res.data.Table1[j].schduletype == "Day Wise"){
            this.daywisearray.push(res.data.Table1[j]);
          }
          else if(res.data.Table1[j].schduletype == "Session Wise"){
            this.sessionwisearray.push(res.data.Table1[j]);
          }
          else{ 
          }
        }

         if(this.scheduletypeinput == "Day Wise"){
           this.timingsdaysif=true;
           this.timingsif=false;
         }
         else if(this.scheduletypeinput == ""){
           this.timingsif=false;
          this.timingsdaysif=false;
         }
         else if(this.scheduletypeinput == "Session Wise"){
           this.timingsdaysif=false;
           this.timingsif=true
         }
         else{
          this.timingsdaysif=true;
          this.timingsif=false;
         }

      //..............basic 2 data..........................
      if(res.data.Table2.length != 0){
        
           this.laborofficeinput=res.data.Table2[0].Labour_offno;
            this.dateofbirthinput=res.data.Table2[0].DOB;
            this.placeofbirthinput=res.data.Table2[0].Place_OB;
            this.religioninput=res.data.Table2[0].Religion;
            this.nationinput=res.data.Table2[0].Nationality;
            this.maritalinput=res.data.Table2[0].Marital_status;
            this.emailidinput=res.data.Table2[0].Emailid;
            this.jobtypeinput=res.data.Table2[0].join_type;
            this.positionlevelinput=res.data.Table2[0].position;
            this.salarypayableinput=res.data.Table2[0].paymeny_by;
            this.banknameinput=res.data.Table2[0].bank;
            this.branchnameinput=res.data.Table2[0].Bank_Branch_Name;
            this.accountnoinput=res.data.Table2[0].Accountno;
            this.areainput=res.data.Table2[0].Address;
            this.blockinput=res.data.Table2[0].Block;
            this.buildinginput=res.data.Table2[0].Building;
            this.streetinput=res.data.Table2[0].streeet;
            this.floorinput=res.data.Table2[0].floor;
            this.cityinput=res.data.Table2[0].city;
            this.countryinput=res.data.Table2[0].country; 
          }
      
          //...............document...................
          if(res.data.Table3.length != 0){
          this.documentypeinput=res.data.Table3[0].Id_proof;
          this.numberinput=res.data.Table3[0].Idproof_number;
          this.uploaddocinput=res.data.Table3[0].Idproof_Attachemnt;
          this. dateofissueinput=res.data.Table3[0].Issued_date;
          this.expiredateinput=res.data.Table3[0].Expire_date;
          this.degreeinput=res.data.Table3[0].Education;
          this.universityinput=res.data.Table3[0].University;
          this.gpainput=res.data.Table3[0].GPA;
          this.dateofgraduationinput=res.data.Table3[0].Edu_enddate;
          this.degreecertificateinput=res.data.Table3[0].certificate;
          this.nameofcourseinput=res.data.Table3[0].course;
          this.placeofissueinput=res.data.Table3[0].couse_type;
          this.startdate_input=res.data.Table3[0].startdate_input;
          this.enddateinput=res.data.Table3[0].endsate;
          this.coursecertificateinput=res.data.Table3[0].course_certificate;
          }
      //..............health insurance.........
      if(res.data.Table4.length !=0){
      this.socialsecurityinput=res.data.Table4[0].security_no;
      this.dateofreginput=res.data.Table4[0].reg_date;
      this.placeofreginput=res.data.Table4[0].Place;
      this.healthinsuranceinput=res.data.Table4[0].Ins_category;
      this.healthincompanyinput=res.data.Table4[0].Company;
      this.issueddateinput=res.data.Table3[0].Issued_date;
      this.expirydateinput=res.data.Table3[0].Expiry_date;
      this.insurancetypeinput=res.data.Table4[0].Type;
      this.insurancenoinput=res.data.Table4[0].InsNumber;
      this.insurancecopyinput=res.data.Table4[0].Ins_copy;
      }
      //...........vehicle......................
      if(res.data.Table5.length !=0){
      this.modelyearinput=res.data.Table5[0].Model_Year;
      this.makeinput=res.data.Table5[0].Make;
      this.modelinput=res.data.Table5[0].Model_type;
      this.vinnoinput=res.data.Table5[0].VIN_number;
      this.milesinput=res.data.Table5[0].Miles;
      this.platenoinput=res.data.Table5[0].Plate_Number;
      this.licencenoinput=res.data.Table5[0].Licence_number;
      this.licenceexdateinput=res.data.Table5[0].Lic_Exp_date;
      this.licenceattachementinput=res.data.Table5[0].Licence_attachment;
      this.insurancecomptinput=res.data.Table5[0].Ins_company;
      this.plicynoinput=res.data.Table5[0].Policy_num;
      this.exdateinput=res.data.Table5[0].Ins_Exp_date;
      this.insuranceattachmentinput=res.data.Table5[0].ins_attachment;
      this.assigndateinput=res.data.Table5[0].Taking_date;
      this.returndateinput=res.data.Table5[0].Returning_date;
      this.notesinput=res.data.Table5[0].Notes;
      }
       
        
        }
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      // },
      // err=>{
      //   this.isPageloaderVisible=false;
      // console.log("Token Error:"+err);
      // } 
      // );
  
  }

}
