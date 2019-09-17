import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from '../../userinfo.service';

@Component({
  selector: 'app-requestcheckup',
  templateUrl: './requestcheckup.component.html',
  styleUrls: ['./requestcheckup.component.css']
})
export class RequestcheckupComponent implements OnInit {

  p1: any;
  p2: any;
  p3: any;
  p4: any;
  // p5: any;
  p6: any;
  p7: any;
  p8: any;
  p9: any;
  p10: any;
  p11: any;
  p12: any = "14";
  p13: any;
  p14: any;
  checkval;
  checkval2;
  checkval3;
  checkval4;
  checkval5;
  dateval: any;
  genderstatus1: any;
  checkedval: any = "false";
  lablenames: any;
  values: any;
  paramid: any;
  paramtext: any;
  paramdate: any;
  buttonshow: boolean = false;
  trandate:any;
  userid:any;
  public isPageloaderVisible = false;

  constructor(
    private router: Router,
    public commonService: UserinfoService,
    public http: Http,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.userid = window.localStorage.getItem("userId")
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      console.log(params.get('id'))
      console.log(params.get('text'))
      this.paramid = params.get('id');
      this.paramtext = params.get('text');
      this.paramdate = params.get('tdate');
      if (this.paramtext == 'view') {
        $("input").attr('disabled', 'disabled');
        this.buttonshow = false;
      } else {
        this.buttonshow = true;
      }
    })
    this.getdata()
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "113",
      "Practitioner_Id": this.paramid,
      "Treatment_Id": "",
      "status": "",
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "getprintsindividualdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(params)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });

    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == '1') {

        this.p1 = result.data.Table[0].LABELLABEL1;
        this.p2 = result.data.Table[0].LABELLABEL2;
        this.p3 = result.data.Table[0].LABELLABEL3;
        this.p4 = result.data.Table[0].LABELLABEL4;
        // this.p5 = result.data.Table[0].LABELLABEL5;
        this.p6 = result.data.Table[0].LABELLABEL6;
        this.p7 = result.data.Table[0].LABELLABEL7;
        if (result.data.Table[0].LABELLABEL7 != '' || result.data.Table[0].LABELLABEL7 != null) {
          $("#checkup1").prop("checked", true);
          (<HTMLInputElement>document.getElementById('checkup11')).setAttribute('checked', 'true');
        } else {
          (<HTMLInputElement>document.getElementById('checkup11')).removeAttribute('checked');
        }
        this.p8 = result.data.Table[0].LABELLABEL8;
        if (result.data.Table[0].LABELLABEL8 != '' || result.data.Table[0].LABELLABEL8 != null) {
          $("#checkup2").prop("checked", true);
          (<HTMLInputElement>document.getElementById('checkup12')).setAttribute('checked', 'true');
        } else {
          (<HTMLInputElement>document.getElementById('checkup12')).removeAttribute('checked');
        }
        this.p9 = result.data.Table[0].LABELLABEL9;
        if (result.data.Table[0].LABELLABEL9 != '' || result.data.Table[0].LABELLABEL9 != null) {
          $("#checkup3").prop("checked", true);
          (<HTMLInputElement>document.getElementById('checkup13')).setAttribute('checked', 'true');
        } else {
          (<HTMLInputElement>document.getElementById('checkup13')).removeAttribute('checked');
        }
        console.log(result.data.Table[0].LABELLABEL10.split('/'))
        if (result.data.Table[0].LABELLABEL10 != '' || result.data.Table[0].LABELLABEL10 != null) {
          $("#checkup4").prop("checked", true);
          (<HTMLInputElement>document.getElementById('checkup14')).setAttribute('checked', 'true');
        } else {
          (<HTMLInputElement>document.getElementById('checkup14')).removeAttribute('checked');
        }
        this.p10 = result.data.Table[0].LABELLABEL10.split('/')[1];
        this.p11 = result.data.Table[0].LABELLABEL10.split('/')[2];
        this.p13 = result.data.Table[0].LABELLABEL12;
        this.p14 = result.data.Table[0].LABELLABEL10.split('/')[0];


      } else {

      }
    }, err => {
      console.log(err)
    })
  }
  checkboxchange(event, text) {

    (<HTMLInputElement>document.getElementById('checkup11')).removeAttribute('checked');
    // (<HTMLInputElement>document.getElementById('Famale1')).removeAttribute('checked');

    console.log(event.target.value);

    console.log(event.target.value, text, this.checkval);
    if (this.checkval == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('checkup11')).setAttribute('checked', 'true');
    } else if (this.checkval == false){
      console.log("false");
      (<HTMLInputElement>document.getElementById('checkup11')).removeAttribute('checked');
    }

    console.log(event.target.value, text, this.checkval2);
    if (this.checkval2 == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('checkup12')).setAttribute('checked', 'true');
    } else if (this.checkval2 == false){
      console.log("false");
      (<HTMLInputElement>document.getElementById('checkup12')).removeAttribute('checked');
    }

    console.log(event.target.value, text, this.checkval3);
    if (this.checkval3 == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('checkup13')).setAttribute('checked', 'true');
    } else if (this.checkval3 == false){
      console.log("false");
      (<HTMLInputElement>document.getElementById('checkup13')).removeAttribute('checked');
    }

    console.log(event.target.value, text, this.checkval4);
    if (this.checkval4 == true) {
      console.log("checked");
      (<HTMLInputElement>document.getElementById('checkup14')).setAttribute('checked', 'true');
    } else if (this.checkval4 == false){
      console.log("false");
      (<HTMLInputElement>document.getElementById('checkup14')).removeAttribute('checked');
    }

    console.log(event.target.value, text, this.checkval5);
    if (this.checkval5 == true) {
      console.log("checked");
      this.checkedval = true;
      (<HTMLInputElement>document.getElementById('checkup15')).setAttribute('checked', 'true');
    } else {
      this.checkedval = false;
      console.log("false");
      (<HTMLInputElement>document.getElementById('checkup15')).removeAttribute('checked');
    }


  }


  submit() {


    if (this.p1 === undefined || this.p1 === null || this.p1 == "") {
      this.p1 = ""
    }
    if (this.p2 === undefined || this.p2 === null || this.p2 == "") {
      this.p2 = ""
    }
    if (this.p3 === undefined || this.p3 === null || this.p3 == "") {
      this.p3 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    // if (this.p5 === undefined || this.p5 === null || this.p5 == "") {
    //   this.p5 = ""
    // }
    if (this.p6 === undefined || this.p6 === null || this.p6 == "") {
      this.p6 = ""
    }
    if (this.p7 === undefined || this.p7 === null || this.p7 == "") {
      this.p7 = ""
    }
    if (this.p4 === undefined || this.p4 === null || this.p4 == "") {
      this.p4 = ""
    }
    if (this.p8 === undefined || this.p8 === null || this.p8 == "") {
      this.p8 = ""
    }
    if (this.p9 === undefined || this.p9 === null || this.p9 == "") {
      this.p9 = ""
    }
    if (this.p10 === undefined || this.p10 === null || this.p10 == "") {
      this.p10 = ""
    }
    if (this.p11 === undefined || this.p11 === null || this.p11 == "") {
      this.p11 = ""
    }
    if (this.p13 === undefined || this.p13 === null || this.p13 == "") {
      this.p13 = ""
    }
    if (this.p14 === undefined || this.p14 === null || this.p14 == "") {
      this.p14 = ""
    }

    this.dateval = this.p12 + "" + this.p14 + "/" + this.p11 + "/" + this.p10
    console.log(this.dateval);
    this.lablenames = "1" + "," + "2" + "," + "3" + "," + "4" + "," + "5" + "," + "6" + "," + "7" + "," + "8" + "," + "9" + "," + "10" + "," + "11" + "," + "12"

    this.values = this.p1 + "," + this.p2 + "," + this.p3 + "," + this.p4 + "," + ' ' + "," + this.p6 + "," + this.p7 + "," + this.p8 + "," + this.p9 + "," + this.dateval + "," + this.checkedval + "," + this.p13

    console.log(this.lablenames);
    console.log(this.values);



    this.isPageloaderVisible = true;
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    var accessToken = window.localStorage.Tokenval;
    // console.log(accessToken);


    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params = {
      "Sno": "113",
      "Practitioner_Id":  this.paramid,
      "Treatment_Id": this.lablenames,
      "status": this.values,
      "Login_ID": "",
      "Trans_Date": this.paramdate,
      "Operation": "UpdatePrintdata",
      "clinicid": this.userid,
      "Branchid": "",
      "Last_Updated": ""
    }
    console.log(params)
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
        this.isPageloaderVisible = false;
        alert("Updated Successfully");
        this.router.navigate(['/Reportsforcheckup']);

      } else {
        this.isPageloaderVisible = false;

      }
    },
      error => {
        this.isPageloaderVisible = false;

        console.log(error);

      }
    );


  }



  // --------------------------------print -----------------------------------------------

  print() {

    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    // divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 1000);
  }

  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------

}
