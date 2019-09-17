import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-anotherbranch',
  templateUrl: './anotherbranch.component.html',
  styleUrls: ['./anotherbranch.component.css']
})
export class AnotherbranchComponent implements OnInit {
  userid: any;
  assigntoanother: FormGroup;
  branchnames: any = [];
  fromsubmit: boolean;
  ValidationEnglishMessages: any = {};
  ValidationArabichMessages: any = {};
  languageoption: any;
  language: any;
  alertcount: any = [];
  fromvalue: any;
  public langulagetype: any = 'EN';
  myForm: FormGroup;
  mysessionForm: FormGroup;
  public daywiseif: boolean = false;
  public sessionwiseif: boolean = false;
  public formArrayLength: number = 0;
  public weekdays: any = [
    {
      "day": "Sunday",
      "id": 1,
    },
    {
      "day": "Monday",
      "id": 2,
    },
    {
      "day": "Tuesday",
      "id": 3,
    },
    {
      "day": "Wednesday",
      "id": 4,
    }
    ,
    {
      "day": "Thursday",
      "id": 5,
    },
    {
      "day": "Friday",
      "id": 6,
    },
    {
      "day": "Saturday",
      "id": 7,
    }
  ]

  public days: any = [{ "id": "day1", "day": "Sunday" }, { "id": "day2", "day": "Monday" }, { "id": "day3", "day": "Tuesday" }, { "id": "day4", "day": "Wednesday" }, { "id": "day5", "day": "Thursday" }, { "id": "day6", "day": "Friday" }, { "id": "day7", "day": "Saturday" }];
  public sessiondays: any = [{ "id": "sday1", "day": "Sunday" }, { "id": "sday2", "day": "Monday" }, { "id": "sday3", "day": "Tuesday" }, { "id": "sday4", "day": "Wednesday" }, { "id": "sday5", "day": "Thursday" }, { "id": "sday6", "day": "Friday" }, { "id": "sday7", "day": "Saturday" }]
  public title: any = ["AM", "PM"];
  public daysdata: any = [];
  public sessiondata: any = [];
  public totaldays: any = [];
  public sessiontotaldays: any = [];
  dayorsessionval: any;
  public isPageloaderVisible = true;

  formErrors = {
    'user':'',
    'branch':'',
    'fromtime': '',
    'scheduletypeinput': ''
  
  }

  ValidationarabicMessages = {
    'user': {
      'required': 'الرجاء إدخال اسم العيادة'
    },
    'branch': {
      'required': 'يرجى إدخال التخصص'
    },
  }

  ValidationMessages = {
    'user': {
      'required': 'Please enter user'
    },
    'branch': {
      'required': 'Please select branch'
    },
  }

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public router: Router,
    public commonService: UserinfoService) {
    this.userid = window.localStorage.getItem("userId");
    this.commonService.currentMessagecat.subscribe(message => {
      console.log(message);
      this.languageoption = message.split("_")[1];
      console.log(this.languageoption);
      if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined") {
        this.langulagetype = "EN";
      }
      else {

        this.langulagetype = this.languageoption;
      }
      this.formErrors = {
        'user': '',
        'branch': '',
        'fromtime': '',
        'scheduletypeinput': ''
      }
    })

  }

  ngOnInit() {

     document.title="Add AnotherBranch";

    this.getbranchnames();
    this.dayssession();
    for (var i = 0; i < this.weekdays.length; i++) {
      this.alertcount.push(0);
    }
    this.assigntoanother = this.formBuilder.group({
      user: ['', Validators.required],
      branch: ['', Validators.required],
      fromtime: [],
      scheduletypeinput: [],
    })
  }

  ngAfterViewInit() {
    if (this.language == 'EN') {
      this.checkValidationErrors();
    }
  }

  getbranchnames() {

    var accessToken = window.localStorage.Tokenval ;
        console.log(accessToken);

      console.log(accessToken);
      // our service calling as usual
      // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Bank_Branch_Master_Details";
      let serviceUrl = this.commonService.commonUrl + "Account/Bank_Branch_Master_Details"
      let params = {
        "Sno":"",
        "Clinic_ID":this.userid,       
        "Branchid":"",      
        "Bank_ID":"", 
        "Bank_Branch_ID":"", 
        "Bank_Branch_Name":"",
        "Swift_Code":"", 
        "Country":"", 
        "City":"",
        "Status":"",
        "LoginID":"",
        "Trans_Date":"",
        "Last_Updated":"",
        "Condition":"GetData"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      console.log(params);
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        if (result.status_cd == "1") {
          this.branchnames = result.data.Table;
        } else {
          console.log(result.error_msg);
          console.log(accessToken);
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  checkValidationErrors(group: FormGroup = this.assigntoanother): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (this.fromsubmit == true) {
        console.log(this.langulagetype);
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.pristine)) {
          console.log("entered.....if");
          // const messages = this.ValidationMessages[key];
          //this.languagechangevalid(key);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ValidationarabicMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else { }
        } else {
          console.log('untouched')
        }
      }
      else {
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          console.log("entered.....if" + this.langulagetype);
          if (this.langulagetype == "EN") {
            const messages = this.ValidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
            }
          }
          else if (this.langulagetype == "AR") {
            const messages = this.ValidationarabicMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("errorKey :" + errorKey)
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + '';
              }
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

  dayssession() {
    //...........for days wise.........
    this.myForm = this.formBuilder.group({
      rows: this.formBuilder.array([]),
      // total_amount: [null, Validators.required]
    });
    this.patchValues();
  //  console.log($("input[type=checkbox]"));
   $("#slctdrp").prop('disabled',true);
    console.log(this.myForm);
    console.log(this.myForm.controls.value);

    var b = 1
    this.myForm.get('rows').valueChanges.subscribe(values => {
      console.log(values);
      this.totaldays = values;
      var currentIndex;
      console.log(this.totaldays);
      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true) {
          console.log(i);
          if ((this.totaldays[i].fromtime != null) && (this.totaldays[i].totime != null)) {
            if ((this.totaldays[i].fromtime + this.totaldays[i].titleinput) == (this.totaldays[i].totime + this.totaldays[i].titleinput1)) {
              alert("Start and End Time will not be Same");
              currentIndex = i;
              console.log(currentIndex);
              var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
              var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
              var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
              console.log(endTime);
              console.log(endtimeselect);
              endTime.value = '';
              endtimeselect.value = '';

            }
          }
          ////////// If Start Time and End Time are Empty Start//////
          if (i != 0) {
            console.log(i + this.alertcount[i - 1]);
            if (this.totaldays[i - 1].fromtime == null) {
              $(".dayName").eq(i).prop("checked", false);
              alert("Please Enter Timings for " + this.totaldays[i - 1].day);
              // this.mysessionForm.get('sessionrows').value[i].checkbox_value = null;
              // this.mysessionForm.controls['sessionrows'].value[i].checkbox_value = null
              const control = this.myForm.get(['rows', i, 'checkbox_value']);
              control.setValue(null);

            } else {
              //this.alertcount[i-1] = 1;
            }
          }

          ////////// If Start Time and End Time are Empty End//////
          console.log(this.sessiontotaldays);
        }
        else {
          if (this.totaldays[i].checkbox_value == false) {
            console.log("else entered entered...");
            currentIndex = i;
            var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
            var starttime = (<HTMLInputElement>currentDay.querySelector('.startTime'));
            var starttimeSelect = (<HTMLInputElement>currentDay.querySelector('.starttimeselect'));
            var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
            var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
            starttime.value = '';
            starttimeSelect.value = '';
            endTime.value = '';
            endtimeselect.value = '';
          }
        }
      }
      /////////////// Checking Day wise selected and Session wise //////////
      console.log(this.sessiontotaldays);
      for (let j = 0; j < this.sessiontotaldays.length; j++) {
        console.log("session entered....");
        if (this.sessiontotaldays[j].checkbox_value == true && this.totaldays[j].checkbox_value == true) {
          alert("Please Uncheck Selected day in another field.");
          console.log("after alert. .. " + j);
          // for(let i=0;i<this.totaldays.length;i++){
          //   if(this.totaldays[i].checkbox_value == true){
          currentIndex = j;
          var currentDay = <HTMLElement>document.querySelectorAll('.eachDay')[currentIndex];
          var day = (<HTMLInputElement>currentDay.querySelector('.dayName'));
          var startTime = (<HTMLInputElement>currentDay.querySelector('.startTime'));
          var starttimeselect = (<HTMLInputElement>currentDay.querySelector('.starttimeselect'));
          var endTime = (<HTMLInputElement>currentDay.querySelector('.endTime'));
          var endtimeselect = (<HTMLInputElement>currentDay.querySelector('.endtimeselect'));
          day.value = 'false';
          startTime.value = '';
          starttimeselect.value = '';
          endTime.value = '';
          endtimeselect.value = '';
          $(".dayName").eq(j).prop("checked", false);
          const control = this.mysessionForm.get(['rows', j, 'checkbox_value']);
          control.setValue(null);
          //   }
          // }
        }
      }
    })

    //...........for session wise............
    this.mysessionForm = this.formBuilder.group({
      sessionrows: this.formBuilder.array([]),
      //total_amount: [null, Validators.required]
    });
    this.sessionpatchValues();
    var a = 1;
    this.mysessionForm.get('sessionrows').valueChanges.subscribe(values => {
      console.log(values);
      this.sessiontotaldays = values;
      for (let i = 0; i < this.sessiontotaldays.length; i++) {
        if (this.sessiontotaldays[i].checkboxvalue == true) {

          //  console.log("session 1"+this.sessiontotaldays[i].session1start + ". ." + this.sessiontotaldays[i].session1end);
          // console.log("session 2"+this.sessiontotaldays[i].session2start + ". ." + this.sessiontotaldays[i].session2end);
          if ((this.sessiontotaldays[i].session1start != null) && (this.sessiontotaldays[i].session1end != null)) {
            if ((this.sessiontotaldays[i].session1start + this.sessiontotaldays[i].sessionstart1input) == (this.sessiontotaldays[i].session1end + this.sessiontotaldays[i].sessionend1input)) {
              alert("Start and End Time will not be Same");
              var index = i
              var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
              var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
              var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
              session1endtime.value = '';
              session1endselect.value = '';

            }
            // else {
            //   //alert("else. . ");
            // }
          }
          // else{}
          if ((this.sessiontotaldays[i].session2start != null) && (this.sessiontotaldays[i].session2end != null)) {

            if ((this.sessiontotaldays[i].session2start + this.sessiontotaldays[i].sessionstart2input) == (this.sessiontotaldays[i].session2end + this.sessiontotaldays[i].sessionend2input)) {
              alert("Start and End Time will not be Same");
              var index = i
              var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
              var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
              var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
              session2endtime.value = '';
              session2endselect.value = '';

            }
            //else{}
          }
          // else{}
        }
        else {
          if (this.sessiontotaldays[i].checkboxvalue == false) {
            console.log("ented session....");
            var index = i
            var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
            var session1starttime = (<HTMLInputElement>currentsession.querySelector('.session1starttime'));
            var session1startselect = (<HTMLInputElement>currentsession.querySelector('.session1startselect'));
            var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
            var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
            var session2starttime = (<HTMLInputElement>currentsession.querySelector('.session2starttime'));
            var session2startselect = (<HTMLInputElement>currentsession.querySelector('.session2startselect'));
            var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
            var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
            session1starttime.value = '';
            session1startselect.value = '';
            session1endtime.value = '';
            session1endselect.value = '';
            session2starttime.value = '';
            session2startselect.value = '';
            session2endtime.value = '';
            session2endselect.value = '';
          }
        }
      }

      for (let i = 0; i < this.totaldays.length; i++) {
        if (this.totaldays[i].checkbox_value == true && this.sessiontotaldays[i].checkbox_value == true) {
          alert("Please Uncheck Selected day in another field.");
          console.log("Please Uncheck Selected day in another field.");
          console.log("selected here. .");
          var index = i
          var currentsession = <HTMLElement>document.querySelectorAll('.eachsession')[index];
          var dayname = (<HTMLInputElement>currentsession.querySelector('.sessioninput'));
          var session1starttime = (<HTMLInputElement>currentsession.querySelector('.session1starttime'));
          var session1startselect = (<HTMLInputElement>currentsession.querySelector('.session1startselect'));
          var session1endtime = (<HTMLInputElement>currentsession.querySelector('.session1endtime'));
          var session1endselect = (<HTMLInputElement>currentsession.querySelector('.session1endselect'));
          var session2starttime = (<HTMLInputElement>currentsession.querySelector('.session2starttime'));
          var session2startselect = (<HTMLInputElement>currentsession.querySelector('.session2startselect'));
          var session2endtime = (<HTMLInputElement>currentsession.querySelector('.session2endtime'));
          var session2endselect = (<HTMLInputElement>currentsession.querySelector('.session2endselect'));
          dayname.value = 'false';
          session1starttime.value = '';
          session1startselect.value = '';
          session1endtime.value = '';
          session1endselect.value = '';
          session2starttime.value = '';
          session2startselect.value = '';
          session2endtime.value = '';
          session2endselect.value = '';
          $(".sessioninput").eq(i).prop("checked", false);
          const control = this.mysessionForm.get(['sessionrows', i, 'checkbox_value']);
          control.setValue(null);
          console.log(values);
          console.log(this.mysessionForm);
          // }
          // }
          return false;
        }
      }
    })
  }
  patchValues() {
    let rows = this.myForm.get('rows') as FormArray;
    this.weekdays.forEach(material => {
      rows.push(this.formBuilder.group({
        checkbox_value: [null],
        id: new FormControl({ value: material.id, disabled: true }, Validators.required),
        day: material.day,
        fromtime: [null],
        titleinput: [null],
        totime: [null],
        titleinput1: [null]
      }));
      this.formArrayLength++;
    });
  }

  sessionpatchValues() {
    let sessionrows = this.mysessionForm.get('sessionrows') as FormArray;
    this.weekdays.forEach(material => {
      sessionrows.push(this.formBuilder.group({
        checkbox_value: [null],
        id: new FormControl({ value: material.id, disabled: true }, Validators.required),
        day: material.day,
        session1start: [null],
        sessionstart1input: [null],
        session1end: [null],
        sessionend1input: [null],
        session2start: [null],
        sessionstart2input: [null],
        session2end: [null],
        sessionend2input: [null]
      }));
      this.formArrayLength++;
    });
  }

  getDataDays(val) {
    console.log("days data entered.....");
    this.fromvalue = val;
    var allDays = document.querySelectorAll('.eachDay');
    allDays = Array.prototype.slice.call(allDays);
    console.log(allDays)
    var self = this;
    var allCheckedDays = [];
    var allCheckedStartTimings = [];
    var allCheckedEndTimings = [];
    allDays.forEach((elem) => {
      // console.log(elem);
      var eachDayName = <HTMLInputElement>elem.querySelector('.dayName');
      if (eachDayName.checked === true) {
        console.log(eachDayName);
        console.log(eachDayName.id);
        allCheckedDays.push(eachDayName.id);
        var individualStartTime = <HTMLInputElement>elem.querySelector('.startTime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.starttimeselect');
        console.log(individualStartTime.value);
        console.log(individualStartMeridian.value)
        allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);

        var individualEndTime = <HTMLInputElement>elem.querySelector('.endTime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.endtimeselect');

        allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
      }

    })

    console.log(allCheckedDays.toString())
    console.log(allCheckedStartTimings.toString());
    console.log(allCheckedEndTimings.toString());
    this.finalsubmit(val, allCheckedDays.toString(), allCheckedStartTimings.toString(), allCheckedEndTimings.toString(), "", "");
  }


  getsessiondata(val) {
    console.log("session data entered.....");
    var allDays = document.querySelectorAll('.eachsession');
    allDays = Array.prototype.slice.call(allDays);
    console.log(allDays)
    var self = this;
    var allCheckedDays = [];
    var allCheckedStartTimings = [];
    var allCheckedEndTimings = [];
    var allCheckeds2StartTimings = [];
    var allCheckeds2EndTimings = [];
    allDays.forEach((elem) => {

      var eachDayName = <HTMLInputElement>elem.querySelector('.sessioninput');
      console.log(eachDayName.checked)
      if (eachDayName.checked === true) {
        console.log(eachDayName);
        allCheckedDays.push(eachDayName.id);
        //.......................session1 start and end..............
        var individualStartTime = <HTMLInputElement>elem.querySelector('.session1starttime');
        var individualStartMeridian = <HTMLSelectElement>elem.querySelector('.session1startselect');
        console.log(individualStartTime.value);
        console.log(individualStartMeridian.value)

        allCheckedStartTimings.push(individualStartTime.value + " " + individualStartMeridian.value);

        var individualEndTime = <HTMLInputElement>elem.querySelector('.session1endtime');
        var individualEndMeridian = <HTMLSelectElement>elem.querySelector('.session1endselect');

        allCheckedEndTimings.push(individualEndTime.value + " " + individualEndMeridian.value)
        //..............session 2 start and end.......

        var individuals2StartTime = <HTMLInputElement>elem.querySelector('.session2starttime');
        var individuals2StartMeridian = <HTMLSelectElement>elem.querySelector('.session2startselect');
        console.log(individuals2StartTime.value);
        console.log(individuals2StartMeridian.value)

        allCheckeds2StartTimings.push(individuals2StartTime.value + " " + individuals2StartMeridian.value);

        var individuals2EndTime = <HTMLInputElement>elem.querySelector('.session2endtime');
        var individuals2EndMeridian = <HTMLSelectElement>elem.querySelector('.session2endselect');

        allCheckeds2EndTimings.push(individuals2EndTime.value + " " + individuals2EndMeridian.value)
      }
      console.log(allCheckedDays.toString())
      console.log(allCheckedStartTimings.toString());
      console.log(allCheckedEndTimings.toString());
      console.log(allCheckeds2StartTimings.toString());
      console.log(allCheckeds2EndTimings.toString());

    })
    this.finalsubmit(val, allCheckedDays.toString(), allCheckedStartTimings.toString(), allCheckedEndTimings.toString(),
      allCheckeds2StartTimings.toString(), allCheckeds2EndTimings.toString())
  }

  selectwise(val) {
    this.dayorsessionval = val;
    console.log("value... " + this.dayorsessionval)
    if (val == "Day Wise") {
      this.daywiseif = true;
      this.sessionwiseif = false;
    }
    else if (val == "Session Wise") {
      this.daywiseif = false;
      this.sessionwiseif = true;
    }
  }

  submit() {
    console.log(this.assigntoanother.invalid);
    if (this.assigntoanother.invalid === true) {
      this.fromsubmit = true;
      this.checkValidationErrors(this.assigntoanother);
    }
    else {
      if (this.assigntoanother.value.scheduletypeinput == "Day Wise") {
        this.getDataDays('fromsubmit');
      }
      else {
        this.getsessiondata('fromsubmit');
      }

    }
    for (let i = 0; i < this.totaldays.length; i++) {
      if (this.totaldays[i].checkbox_value == true) {
        console.log("checked days..." + JSON.stringify(this.totaldays[i]));
      }
    }

    for (let i = 0; i < this.sessiontotaldays.length; i++) {
      if (this.sessiontotaldays[i].checkbox_value == true) {
        console.log("checked session days..." + JSON.stringify(this.sessiontotaldays[i]));
      }
    }
  }

  finalsubmit(val, days, startTime, EndTime, s2start, s2end) {
    console.log("service entered....." + this.assigntoanother.value.scheduletypeinput);
    console.log(days)
    console.log(startTime)
    console.log(EndTime)
    console.log(s2start)
    console.log(s2end)
    var accessToken = window.localStorage.Tokenval ;
    // this.commonService.tokenFun().subscribe(tokenResult => {
    //   var accessToken = tokenResult.token_type + " " + tokenResult.access_token
      let url = this.commonService.commonUrl + "Account/Registrations_Transactions"
      let body = {
        
      }
      console.log("info1 url..." + JSON.stringify(body));
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url,body, options)
      .map(res => res.json()).subscribe(res => {
        if(res.status_cd == 1){
          alert("Added Successfully");
      this.isPageloaderVisible = false;
          this.router.navigate(['/settings']);
        }else{
        this.isPageloaderVisible = false;
          console.log("Please try again later");
        }
      },
        err => {
        this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
  }
}
