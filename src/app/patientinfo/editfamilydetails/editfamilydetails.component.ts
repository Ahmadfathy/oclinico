import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';
import { CustomValidators } from 'src/app/shared/Customevalidators/custome.validators';
@Component({
  selector: 'app-editfamilydetails',
  templateUrl: './editfamilydetails.component.html',
  styleUrls: ['./editfamilydetails.component.css']
})
export class EditfamilydetailsComponent implements OnInit {
  showLoader:boolean=false;
  imagefile:any;
  editfamily: FormGroup;
  selectedtype: any;
  select: string = 'Select';
  languageoption: any;
  profileimage: any;
  exppiredate: any;
  issudate: any;
  showimgupload: boolean=false;
  showimgbind: boolean = true;
  doctypeval: any;
  pidval: any;
  ValidationMessages = {

    'fname': {
      'required': 'Please select family member ',
      'Select': 'Please select family member'
    },
    'nameval': {
      'required': 'Please enter name',

    },
    'doc': {
      'required': 'Please select document',
      'Select': 'Please select document'
    },
    'docnum': {
      'required': 'Please enter document number',

    },

    'expdate': {
      'required': 'Please enter expire date'
    }

  }
  ValidationMessagesarabic = {

    'fname': {
      'required': 'الرجاء اختيار فرد من العائلة ',
      'Select': 'الرجاء اختيار فرد من العائلة'
    },
    'nameval': {
      'required': 'الرجاء ادخل الاسم',

    },
    'doc': {
      'required': 'الرجاء اختيار وثيقة',
      'Select': 'الرجاء اختيار وثيقة'
    },
    'docnum': {
      'required': 'الرجاء إدخال رقم المستند',

    },
    'expdate': {
      'required': 'الرجاء إدخال تاريخ انتهاء الصلاحية'
    }

  }
  formErrors = {

    'fname': '',
    'nameval': '',
    'doc': '',
    'docnum': '',
    'issuedate': '',
    'expdate': '',
    'imagefile': '',

  }
  userid: any = "";
  image: any;
  expirydate: any;
  isuedate: any;
  patient: any;
  patient_name: any;
  constructor(private router: Router, 
    public commonService: UserinfoService,
    public http: Http,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    document.title = "Edit Family member";
    this.userid = window.localStorage.getItem("userId");
    var url = document.URL
    var url1 = url.split('?')
    var data1 = url1[1].split('&')[0]
    console.log(data1);
    this.pidval = data1.split('=')[1];
    console.log(this.pidval);
    var data2 = url1[1].split('&')[1];
    console.log(data2);
    this.patient = data2.split('=')[1];
    console.log("patient id... " + this.patient)
    this.patient_name = sessionStorage.patient_name;
    this.getfamilydetails(this.pidval,this.patient)
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      this.formErrors = {
        'fname': '',
        'nameval': '',
        'doc': '',
        'docnum': '',
        'issuedate': '',
        'expdate': '',
        'imagefile': '',
      }
    })


    this.editfamily = this.fb.group({

      fname: ['select', [Validators.required, CustomValidators.Select('select')]],
      nameval: ['', [Validators.required]],
      doc: ['select', [Validators.required, CustomValidators.Select('select')]],
      docnum: ['', [Validators.required]],
      issuedate: [''],
      expdate: ['', [Validators.required]],
      imagefile: [''],


    });

    this.editfamily.valueChanges.subscribe((data) => {
      this.checkValidationErrors(this.editfamily);
    });

  }

  typechange(event) {
    console.log(event.target.value);
    this.showimgupload = true;
    this.showimgbind = false;
    var str = event.target.value;
    this.doctypeval = str.split(":")[1];
    console.log(this.doctypeval);
    // this.gettypenames(this.typevalid,"");
  }

  isKeyPressed(event) {
    if (event.altKey) {
      alert("The ALT key was pressed!");
    } else {
      alert("The ALT key was NOT pressed!");
    }
  }



  checkValidationErrors(group: FormGroup = this.editfamily): void {
    // console.log("sdf");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // console.log(abstractControl);
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        //  alert("test");
        //  console.log("test");
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }

      }

      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrors(abstractControl)
      }
    });
  }
  checkValidationErrorssubmit(group: FormGroup = this.editfamily): void {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
        //  alert("test");
        if (this.languageoption == "EN" || this.languageoption == undefined || this.languageoption == "undefined") {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        } else {
          const messages = this.ValidationMessagesarabic[key];
          for (const errorKey in abstractControl.errors) {
            console.log("errorKey :" + errorKey)
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        console.log(abstractControl)
        this.checkValidationErrorssubmit(abstractControl)
      }
    });
  }


  datechange() {
    // console.log(evnt.target.value);

    this.exppiredate = (this.editfamily.value.expdate.getMonth() + 1) + "/" + this.editfamily.value.expdate.getDate() + "/" + this.editfamily.value.expdate.getFullYear();
    console.log(this.exppiredate)
  }
  issuedatechange() {
    // console.log(evnt.target.value);

    this.issudate = (this.editfamily.value.issuedate.getMonth() + 1) + "/" + this.editfamily.value.issuedate.getDate() + "/" + this.editfamily.value.issuedate.getFullYear();
    console.log(this.issudate)
  }

  fileuploadfamily($event) {
   
    let fileSelected = $event.target.files[0]
    let formData: FormData = new FormData();
    formData.append('uploadFile', fileSelected, fileSelected.name);
    let body = {
      "image": fileSelected
    }
    console.log(body)
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
    var url = this.commonService.commonUrl + "account/MultipleFileUpload";
    this.showLoader=true   
    this.http.post(url, formData, options).subscribe((res) => {
      setTimeout(() => {
        let body: string = JSON.parse(res['_body']);
        this.profileimage = body[0];
        this.showLoader=false
      }, 1000);

  
      console.log(res)
     
     
     

      console.log(this.profileimage);
    });
    //})
  }



  getfamilydetails(pid,id) {
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);

    //http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations
    let serviceUrl = this.commonService.commonUrl + "Account/Patient_operations"
    let params = {
      "sno": id,
      "clinicid": this.userid,
      "loginid": "",
      "patient_id": "",
      "Title": pid,
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
      "Condition": "FamilydetailsBIND",
      "Par1": "",
      "Par2": "",
      "Par3": ""
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    // this.PArray=[];
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      // this.isPageloaderVisible=false;
      if (result.status_cd == "1") {
        this.image = result.data.Table[0].familyfileupload;
        let isudate = result.data.Table[0].Column1.split('/');
        let isueday = isudate[2] + '-' + isudate[1] + '-' + isudate[0]
        let experdate = result.data.Table[0].Column2.split('/');
        let exdate = experdate[2] + '-' + experdate[1] + '-' + experdate[0]
        this.editfamily.patchValue({
          fname: result.data.Table[0].familymembers,
          nameval: result.data.Table[0].familymembername,
          doc: result.data.Table[0].familymemdocumenttype,
          docnum: result.data.Table[0].familymemdocumentNo,
          issuedate: isueday,
          expdate: exdate,
          //imagefile: result.data.Table[0].familyfileupload,
        });
      } else {
        // this.hideLoader=true;
        console.log(result.error_msg);
        console.log(accessToken);

      }
    },
      error => {
        // this.isPageloaderVisible=false;
        //  this.hideLoader=true;
        console.log(error);
      }
    );
  }

  editfamilysubmit() {
    if (this.editfamily.value.issuedate.toString().includes('India Standard Time')) {
      let date = this.editfamily.value.issuedate;
      let d = date.getDate();
      let e = date.getMonth() + 1;
      let f = date.getFullYear();

      if (e.toString().length === 1) {
        e = '0' + e
      }
      if (f.toString().length === 1) {
        f = '0' + f
      }
      var isuedate = f + "/" + e + "/" + d;
      console.log(isuedate)

      // var isuedate=getday+"/"+getmonth+"/"+getyear;
    }
    else {

      var isuedate = this.editfamily.value.issuedate.split('-')[2] + '/' + this.editfamily.value.issuedate.split('-')[1] + '/' + this.editfamily.value.issuedate.split('-')[0]
      console.log(isuedate)
    }

    if (this.editfamily.value.expdate.toString().includes('India Standard Time')) {

      let exdate = this.editfamily.value.expdate;
      let dt = exdate.getDate();
      let et = exdate.getMonth() + 1;
      let ft = exdate.getFullYear();

      if (et.toString().length === 1) {
        et = '0' + et
      }
      if (ft.toString().length === 1) {
        ft = '0' + ft
      }
      var expirydate = ft + "/" + et + "/" + dt;
      console.log(isuedate)


      //var expirydate=exday+"/"+exmonth+"/"+exyear;

    } else {
      var expirydate = this.editfamily.value.expdate.split('-')[2] + '/' + this.editfamily.value.expdate.split('-')[1] + '/' + this.editfamily.value.expdate.split('-')[0]
    }


    console.log(this.editfamily.valid)
    if (this.editfamily.valid == false) {
      this.checkValidationErrorssubmit(this.editfamily);
    } else {

      console.log(this.editfamily.value.fname);
      console.log(this.editfamily.value.nameval);
      console.log(this.editfamily.value.doc);
      console.log(this.editfamily.value.docnum);
      console.log(this.editfamily.value.issuedate);
      console.log(this.editfamily.value.expdate);
      //  if(this.issudate==""||this.issudate=="undefined"||this.issudate==undefined||this.issudate=="null"||this.issudate==null){
      //   this.issudate="";
      //  }

if(this.profileimage==''||this.profileimage==undefined){
  this.profileimage=this.image
}

      var accessToken = window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual

      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Patient_operations";
      let serviceUrl = this.commonService.commonUrl + "Account/Patient_operations";
      let params = {
        "sno":this.patient,
        "clinicid": this.userid,
        "loginid": "",
        "patient_id": "",
        "Title": this.pidval,
        "Ara_firstname": "",
        "Ara_Lastname": "",
        "Ara_fathername": "",
        "First_name": this.editfamily.value.fname,
        "Last_Name": this.editfamily.value.nameval,
        "Middle_name": this.editfamily.value.doc,
        "DOB": isuedate,    //this.issudate,
        "DOB_Arabic": "",
        "Gender": "",
        "Marital_status": "",
        "Identification_type": this.editfamily.value.docnum,
        //"Identification_no":this.profileimage,
        "Identification_no":this.profileimage,
        "Identification_attachment": "",
        "Identification_Expiry": expirydate,    //this.exppiredate,
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
        "Condition": "FamilydetailsUpdate",
        "Par1": "",
        "Par2": "",
        "Par3": ""
      }
      console.log(params);
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });

      let options = new RequestOptions({ headers: headers });
      // this.PArray=[];
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);

        if (result.status_cd === "1") {
          alert("Updated Successfully");
        
          this.router.navigate(['/Addfamilydetails'],{ queryParams: { id: this.patient } });
        }

        else {
          // this.isPageloaderVisible=false;
          // this.hideLoader=true;
          console.log(result.error_msg);
          console.log(accessToken);
        }
      
      },
      
        error => {
          //  this.isPageloaderVisible=false;
          //  this.hideLoader=true;
          console.log(error);
          //  console.log(accessToken);
          //   alert(error)
        }
        
      );
    }
  }
 
  cancelfamilysubmit(){
    this.router.navigate(['/Addfamilydetails'], { queryParams: { id: this.patient } });
  }

  refresh(): void {
    window.location.reload();
  }
 
}
