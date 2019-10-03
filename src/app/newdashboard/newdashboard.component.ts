import { Component, OnInit, ViewChild } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Chart } from 'chart.js';
import { Options } from 'selenium-webdriver/firefox';
import { debug } from 'util';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashbrd',
  templateUrl: './newdashboard.component.html',
  styleUrls: ['./newdashboard.component.css']
})

export class newdashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;


  month = [{ monthNum: '1', monthName: 'January' }, {
    monthNum: '2', monthName: 'February'
  }, { monthNum: '3', monthName: 'March' }, { monthNum: '4', monthName: 'April' }, { monthNum: '5', monthName: 'May' }, {
    monthNum: '6', monthName: 'June'
  }, { monthNum: '7', monthName: 'july' }, { monthNum: '8', monthName: 'August' }, {
    monthNum: '9', monthName: 'September'
  }, { monthNum: '10', monthName: 'October' }, {
    monthNum: '11', monthName: 'November'
  }, { monthNum: '12', monthName: 'December' }
  ]
  userimgpath = this.cmn.userimgpath;
  username = window.localStorage.getItem("name");
  todayWeek: string;
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
  daycount = [];
  today: Date;
  userid: any;
  days = [];
  background = [];
  border = [];
  mothname = [];
  daysarr = [];
  years = [];
  months: any;
  thismonth: any;
  fullyear: number;
  constructor(
    public cmn: UserinfoService,
    public http: Http,
  ) {
    this.userid = window.localStorage.getItem("userId");
  }

  ngOnInit() {

    /////service for binding months dynamically  to dropdown   
    let accesstoken = window.localStorage.Tokenval;
    let commonUrl = this.cmn.commonUrl + 'Account/GetUser';
    let body = {
      "text": "monthwisemasterfilter",
      "id": "",
      "Param1": "",
      "param2": "",
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: accesstoken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(commonUrl, body, options).map(res => res.json()).subscribe(result => {
      if (result.status_cd = "1") {
        this.months = result.data.Table;
      }
    },
      error => {
        console.log(error);
      });
    ///closing month service 

    var today = new Date();
    let dlen = (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate());

    for (let d = 1; d <= dlen; d++) {
      this.daysarr.push(d);
    }
    this.thismonth = today.getMonth() + 1;
    this.fullyear = today.getFullYear();
    var year = new Date().getFullYear() - 1;

    for (var i = 1; i < 3; i++) {
      this.years.push(year + i);
    }

    let j = new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    let d = new Date();
    this.todayWeek = j[d.getDay() - 1];
    this.today = d;
    this.userid = window.localStorage.getItem("userId");
    this.getdata();
    this.bindbarchart();
    this.bindbarcharts(this.thismonth, this.fullyear);
    this.bindapptypecharts(this.thismonth, this.fullyear)
    this.precdetails(this.thismonth, this.fullyear);
    this.patientandfamilydetails(this.thismonth, this.fullyear);
    this.chartsforspecilization();
    this.bindDoctorwiseapp();
    // this.Mobilechart(this.thismonth, this.fullyear);
  }
  getdata() {
    var accessToken = window.localStorage.Tokenval
    let url = this.cmn.commonUrl + "Account/GetUser"
    let body = {
      "text": "Dashboard",
      "id": this.userid,
      "param1": "",
      "param2": ""
    }
    console.log(url)
    console.log(body)
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == 1) {
          this.appointmentscount = res.data.Table[0].TodayappointmentCnt
          this.doctorcount = res.data.Table[0].DoctorsCNt;
          this.patientcount = res.data.Table[0].PatientCnt;
          this.prescriptioncount = res.data.Table[0].PrescriptionCnt;
          this.treatedcount = res.data.Table[0].Treatementcompleted;
          this.freebedlistcount = res.data.Table[0].NoOfBeds;
          this.dischargecount = res.data.Table[0].DISCHARGED;
          this.occupiedcount = res.data.Table[0].Occupied;
          this.daysurgerycount = res.data.Table[0].DaySurgery;
          this.laboratorycount = res.data.Table[0].Laboratory_count;
          this.radiologycount = res.data.Table[0].Radiology_count;
          this.departmentcount = res.data.Table[0].Department_count;
        }
        else {
        }
      },
        err => {
          console.log("ERROR!: ", err);
        });
  }
  // PIE CHART
  public pieChartLabels: string[] = ['X Rays', 'Laboratory'];
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
      borderWidth: '1'
    },
    {
      // dark grey
      backgroundColor: 'rgb(41,98,255,.1)',
      borderColor: '#2962FF',
      pointBackgroundColor: '#2962FF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2962FF',
      borderWidth: '1'
    },
    {
      // dark grey
      backgroundColor: 'rgba(71, 152, 232, .1)',
      borderColor: '#ffc107',
      pointBackgroundColor: 'green',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2962FF',
      borderWidth: '1'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';



  ////--------------------------------------Appointments charts-------------------------------------------
  ////////onchange drop down charts binding----------------------------------
  getmonthrec(val, a) {
    if (val != "" && val != undefined) {
      this.bindbarcharts(val, this.fullyear == undefined ? "" : this.fullyear);
      this.bindapptypecharts(val, this.fullyear == undefined ? "" : this.fullyear);
      this.precdetails(val, this.fullyear == undefined ? "" : this.fullyear);
      this.patientandfamilydetails(val, this.fullyear == undefined ? "" : this.fullyear);
      // this.Mobilechart(val, this.fullyear == undefined ? "" : this.fullyear);
    }
  }
  getyearrec(val, a) {
    if (val != "" && val != undefined) {
      this.bindbarcharts(this.thismonth == undefined ? "" : this.thismonth, val);
      this.bindapptypecharts(this.thismonth == undefined ? "" : this.thismonth, val);
      this.precdetails(this.thismonth == undefined ? "" : this.thismonth, val);
      this.patientandfamilydetails(this.thismonth == undefined ? "" : this.thismonth, val);
      // this.Mobilechart(this.thismonth == undefined ? "" : this.thismonth, val);
    }
  }
  bindbarcharts(val, type) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/GetUser";
    let params =
    {
      "text": "chartsforappointments",
      "id": val,
      "param1": type,
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      var dayapp = []; var days = []; var appmonth = [];
      if (result.data.Table1.length > 0) {
        for (let j = 0; j < result.data.Table1.length; j++) {
          dayapp.push(result.data.Table1[j].noofappointments);
          days.push(result.data.Table1[j].Appointmentday);
          appmonth.push(result.data.Table1[j].appmonth)
        }
      } //else {
      //dayapp.push(0);
      // days.push(0);
      // appmonth.push(0)
      //}
      var final = []; var j = 0;
      this.daysarr.filter(function (val, i) {
        if (days.indexOf(val) != -1) {
          final.push({ "date": val, "appointment": dayapp[j] })
          j++;
        }
        else {
          final.push({ "date": val, "appointment": 0 })
        }
      });
      var appcount = []; var appdate = [];
      for (let i = 0; i < final.length; i++) {
        appcount.push(final[i].appointment)
        appdate.push(final[i].date)
      }
      //binding chart     
      // var myChart = new Chart(document.getElementById("adaywise"));
      // myChart.clear();
      // this.chart.chart.clear();
      // var myChart = new Chart(document.getElementById("adaywise"), {
      //   // type: 'horizontalBar',
      //   type: 'bar',
      //   data: {
      //     labels: appdate,
      //     datasets: [{
      //       label: "Appointments",
      //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd",
      //         "#FF00FF", "#8A2BE2", "#00BFFF", "#FF69B4", "#F08080", "#FF6347", "#FF00FF", "#00BFFF", "#48D1CC", "#F4A460",
      //         "#3498DB", "#003399", "#3cba9f", "#E9967A", "#c45850", "#F39C12", "#48C9B0", "#48C9B0", "#FF69B4", "#E9967A",
      //         "#FF6347", "#FF00FF", "#00BFFF", "#48D1CC", "#F4A460"
      //       ],
      //       data: appcount
      //     }]
      //   },
      //   options: {
      //     legend: { display: false }, title: { display: true, text: appmonth[0] == undefined ? "No data found" : appmonth[0] }
      //   }
      // });
      // myChart.update();
      // this.chart.chart.update();
      //closing day wise chart

      //opening month wise chart             
      var monthcounts = [];
      var monthname = [];
      if (result.data.Table.length > 0) {
        for (let k = 0; k < result.data.Table.length; k++) {
          monthname.push(result.data.Table[k].Appointmentmonth);
          monthcounts.push(result.data.Table[k].noofappointments);
        }
      } else {
        monthname.push("No data found");
        monthcounts.push(0);
      }
      // new Chart(document.getElementById("amwise"), {
      //   type: 'pie',
      //   data: {// labels:["january","Feburuary","March","April","May","june","July","August","September","October","November","December"],
      //     labels: monthname,
      //     datasets: [{
      //       label: "Appointments",
      //       backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: monthcounts
      //     }]
      //   },
      //   options: { legend: { display: true } }
      // });

      //yearwise data
      var yearcount = []; var yearname = [];
      if (result.data.Table2.length > 0) {
        for (let i = 0; i < result.data.Table2.length; i++) {
          yearcount.push(result.data.Table2[i].noofappointments);
          yearname.push(result.data.Table2[i].Appointmentyear);
        }
      } else {
        yearcount.push(0);
        yearname.push("No data Found");
      }
      // new Chart(document.getElementById("aywise"), {
      //   type: 'pie',
      //   data: {// labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      //     labels: yearname,
      //     datasets: [{
      //       label: "Year wise appointments",
      //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: [yearcount]
      //     }]
      //   },
      //   options: { legend: { display: true } }
      // });
    },
      error => {
        console.log(error);
      });
  }

  //closing appointment graph

  //--------------------------closing appiontments charts----------------
  /////////--------------------------opening appiontments type charts----------------

  bindapptypecharts(mon, year) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/GetUser";
    let params =
    {
      "text": "chartsforappointmentstype",
      "id": mon,
      "param1": year,
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      var months = []; var FirstAppointment = []; var StandardAppointment = []; var Treatments = []; var labels = [];
      if (result.data.Table.length > 0) {
        for (let i = 0; i < result.data.Table.length; i++) {
          months.push(result.data.Table[i].month);
          FirstAppointment.push(result.data.Table[i].FirstAppointment);
          StandardAppointment.push(result.data.Table[i].StandardAppointment);
          Treatments.push(result.data.Table[i].Treatments);
        }
      } else {
        labels.push("No data found");
        FirstAppointment.push(0);
        StandardAppointment.push(0);
        Treatments.push(0);
      }
      ///taking the month names from month numbers
      for (let j = 0; j < this.month.length; j++) {
        for (let k = 0; k < months.length; k++) {
          if (this.month[j].monthNum == months[k]) {
            labels.push(this.month[j].monthName);
          }
        }
      }
      // new Chart(document.getElementById("atmonthwise"), {
      //   type: 'bar',
      //   data: {
      //     labels: labels,
      //     datasets: [
      //       // {
      //       //   label: "month",
      //       //   backgroundColor: "#3e95cd",
      //       //   data: months
      //       // },
      //       {
      //         label: "First",
      //         backgroundColor: "#2962FF",
      //         data: FirstAppointment
      //       }, {
      //         label: "Standard",
      //         backgroundColor: "#8e5ea2",
      //         data: StandardAppointment
      //       }, {
      //         label: "Treatments",
      //         backgroundColor: "#ffc107",
      //         data: Treatments
      //       }]
      //   },
      //   options: {
      //     title: {
      //       display: true,//text: 'Appointments Types'
      //     }
      //   }
      // });
      var months = [];
      var FirstAppointment = [];
      var StandardAppointment = [];
      var Treatments = [];
      var labels = [];
      if (result.data.Table1.length > 0) {
        for (let i = 0; i < result.data.Table1.length; i++) {
          months.push(result.data.Table1[i].month);
          FirstAppointment.push(result.data.Table1[i].FirstAppointment);
          StandardAppointment.push(result.data.Table1[i].StandardAppointment);
          Treatments.push(result.data.Table1[i].Treatments);
        }
      } else {
        months.push("No data found");
        FirstAppointment.push(0);
        StandardAppointment.push(0);
        Treatments.push(0);
      }
      ///-------yearwise chart-------------------
      // new Chart(document.getElementById("atyearwise"), {
      //   type: 'bar',
      //   data: {
      //     labels: months,
      //     datasets: [
      //       {
      //         label: "First",
      //         backgroundColor: "#2962FF",
      //         data: FirstAppointment
      //       }, {
      //         label: "Standard",
      //         backgroundColor: "#8e5ea2",
      //         data: StandardAppointment
      //       }, {
      //         label: "Treatments",
      //         backgroundColor: "#ffc107",
      //         data: Treatments
      //       }]
      //   },
      //   options: {
      //     title: {
      //       display: true,
      //       //text: 'Appointments Types'
      //     }
      //   }
      // });
    },
      error => {
        console.log(error);
      });
  }
  ////------------------------------closing appointments type charts---------------------

  ////----------------chrts for precription details--------------------
  precdetails(mon, year) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/GetUser";
    let params = {
      "text": "chartsforprescriptiontype",
      "id": mon,
      "param1": year,
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      //console.log(result);
      var daysp = [];
      var papp = [];
      var Appointmentmonth = []; var noofprescriptions = [];
      if (result.data.Table.length > 0) {
        for (let i = 0; i < result.data.Table.length; i++) {
          Appointmentmonth.push(result.data.Table[i].Appointmentmonth)
          noofprescriptions.push(result.data.Table[i].noofprescriptions)
        }
      } else {
        Appointmentmonth.push("No data found")
        noofprescriptions.push(0)
      }

      var dayprescriptions = []; var Appointmentday = [];
      if (result.data.Table1.length > 0) {
        for (let j = 0; j < result.data.Table1.length; j++) {
          Appointmentday.push(result.data.Table1[j].Appointmentday)
          dayprescriptions.push(result.data.Table1[j].noofprescriptions)
        }
      } //else {
      //daysp.push("No data found");
      //dayprescriptions.push(0)
      //}

      var daywisearray = []; var h = 0;
      this.daysarr.filter(function (val) {
        if (Appointmentday.indexOf(val) != -1) {
          daywisearray.push({ "day": val, "app": dayprescriptions[h] });
          h++;
        } else {
          daywisearray.push({ "day": val, "app": 0 })
        }
      });

      for (let k = 0; k < daywisearray.length; k++) {
        daysp.push(daywisearray[k].day);
        papp.push(daywisearray[k].app);
      }
      var yearprescriptions = [];
      var Appointmentyear = [];
      for (let k = 0; k < result.data.Table2.length; k++) {
        Appointmentyear.push(result.data.Table2[k].Appointmentyear)
        yearprescriptions.push(result.data.Table2[k].noofprescriptions)
      }
      // new Chart(document.getElementById("pdaywise"), {
      //   type: 'bar',
      //   data: {
      //     labels: daysp,
      //     datasets: [{
      //       label: "prescription Day Wise",
      //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2",
      //         "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2",
      //         "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd"],
      //       data: papp
      //     }]
      //   },
      //   options: { legend: { display: false }, title: { display: true, text: Appointmentmonth[0] == undefined ? "No data found" : Appointmentmonth[0] } }
      // });

      // new Chart(document.getElementById("ptmonthwise"), {
      //   type: 'pie',
      //   data: {
      //     labels: Appointmentmonth,
      //     datasets: [{
      //       label: "prescription Month Wise",
      //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: noofprescriptions
      //     }]
      //   },
      //   options: { legend: { display: true } }
      // });
      // new Chart(document.getElementById("ptyearwise"), {
      //   type: 'pie',
      //   data: {
      //     labels: Appointmentyear,
      //     datasets: [{
      //       label: "prescription Year Wise",
      //       backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: yearprescriptions
      //     }]
      //   },
      //   options: { legend: { display: true } }
      // });
    },
      error => { console.log(error); });
  }
  ///-------------charts for precription details closed---------------------------------------
  chartsforspecilization() {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.cmn.commonUrl + "Account/GetUser";
    let params =
    {
      "text": "chartsforspecilizationdoctors",
      "id": "",
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result);
      var count = [];
      var designation = [];
      if (result.data.Table.length > 0) {
        for (let i = 0; i < result.data.Table.length; i++) {
          count.push(result.data.Table[i].COUNT);
          designation.push(result.data.Table[i].designation);
        }
      } else {
        count.push(0);
        designation.push("no data found");
      }
      // new Chart(document.getElementById("designation"), {
      //   type: 'pie',
      //   data: {
      //     labels: designation,
      //     datasets: [{
      //       label: "Count",
      //       backgroundColor: ["#3e95cd", "#487BC9", "#D329CD", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: count
      //     }]
      //   },
      //   options: {
      //     legend: { display: true },
      //   }
      // });
    }, error => { console.log(error); }
    );
  }
  //////////doctor wise appointments--------------------------------
  bindDoctorwiseapp() {
    var accessToken = window.localStorage.Tokenval;
    let serviceurl = this.cmn.commonUrl + "Account/GetUser";
    let params = {
      "text": "chartsfordoctorwiseappointments",
      "id": "",
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceurl, params, options).map(res => res.json()).subscribe(res => {
      var count = [];
      var name = [];
      if (res.data.Table.length > 0) {
        for (let i = 0; i < res.data.Table.length; i++) {
          count.push(res.data.Table[i].count);
          name.push(res.data.Table[i].Name);
        }
      } else {
        count.push(0);
        name.push("No data found");
      }
      // new Chart(document.getElementById("doctorwiseappointments"), {
      //   // type: 'horizontalBar',
      //   type: 'pie',
      //   data: {
      //     labels: name,
      //     datasets: [{
      //       label: "Appointments",
      //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      //       data: count
      //     }]
      //   },
      //   options: {
      //     legend: { display: true },
      //   }
      // });
    },
      error => {
        console.log(error);
      });
  }
  patientandfamilydetails(mon, year) {
    var accessToken = window.localStorage.Tokenval;
    let serviceurl = this.cmn.commonUrl + "Account/GetUser";
    let params = {
      "text": "chartsforpatientandfamilydetails",
      "id": mon,
      "param1": year,
      "param2": ""
    }

    let headres = new Headers({
      "Content-Type": "application/json",
      accept: "apllication/json",
      Authorization: accessToken
    });
    let Options = new RequestOptions({ headers: headres });
    this.http.post(serviceurl, params, Options).map(res => res.json()).subscribe(res => {


      var count = []; var Trans_date = []; var Trans_date1 = [];

      for (let i = 0; i < res.data.Table.length; i++) {
        count.push(res.data.Table[i].count);
        Trans_date.push(res.data.Table[i].Trans_month);
      }

      var count2 = [];
      for (let j = 0; j < res.data.Table1.length; j++) {
        count2.push(res.data.Table1[j].count);
        Trans_date1.push(res.data.Table1[j].Trans_month);
      }
      ///for first line
      var final1 = []; var j = 0;

      this.month.filter(function (val, i) {
        if (Trans_date.indexOf(i + 1) != -1) {
          final1.push({ "month": val.monthName, "app": count[j] });
          j++;
        } else {
          final1.push({ "month": val.monthName, "app": 0 });
        }
      });

      ///for second line
      var finaltwo = [];
      var z = 0;
      this.month.filter(function (val, i) {
        if (Trans_date1.indexOf(i + 1) != -1) {
          finaltwo.push({ "month": val.monthName, "app": count2[z] })
          z++;
        } else {
          finaltwo.push({ "month": val.monthName, "app": 0 })
        }
      });
      var appcount = [];
      var bindcount = [];
      var monthforfamily = [];
      for (let i = 0; i < final1.length; i++) {
        appcount.push(final1[i].app)
        monthforfamily.push(final1[i].month);
        bindcount.push(finaltwo[i].app);
      }

      // new Chart(document.getElementById("patientandfamilydetailsc"), {
      //   type: 'line',
      //   data: {
      //     labels: monthforfamily,
      //     datasets: [
      //       {
      //         data: appcount,
      //         label: "Patient",
      //         borderColor: "#8e5ea2",
      //         fill: false
      //       },
      //       {
      //         data: bindcount,
      //         label: "family",
      //         borderColor: "#3cba9f",
      //         fill: false
      //       },
      //     ]
      //   },
      //   options: {
      //     title: {
      //       display: true,
      //       //text: 'Appointments Types'
      //     }
      //   }
      // });

    }, error => { console.log(error); });

  }
  bindbarchart() {
    // var densityCanvas = document.getElementById("densityChart");
    // Chart.defaults.global.defaultFontFamily = "Poppins";
    // Chart.defaults.global.defaultFontSize = 14;
    // var densityData = {
    //   label: 'Doctors Available',
    //   data: [12, 23, 7, 5, 9, 20],
    //   backgroundColor: [
    //     'rgb(71, 152, 232)',
    //     'rgb(34, 198, 171)',
    //     'rgb(255, 188, 52)',
    //     'rgb(239, 110, 110)',
    //     'rgb(1, 192, 200)',
    //     'rgb(116, 96, 238)',
    //   ],
    //   borderColor: [
    //     'rgba(71, 152, 232, 1)',
    //     'rgba(34, 198, 171, 1)',
    //     'rgba(255, 188, 52, 1)',
    //     'rgba(239, 110, 110, 1)',
    //     'rgba(1, 192, 200, 1)',
    //     'rgba(116, 96, 238, 1)',
    //   ]
    // };

    // var chartOptions = {
    //   scales: {
    //     yAxes: [{
    //       barPercentage: 0.5
    //     }]
    //   },
    //   elements: {
    //     rectangle: {
    //       borderSkipped: 'left',
    //     }
    //   }
    // };

    // var barChart = new Chart(densityCanvas, {
    //   type: 'horizontalBar',
    //   data: {
    //     labels: ["Dental", "ENT", "Cardiology", "Urology", "Surgery", "Internal"],
    //     datasets: [densityData],
    //   },
    //   options: chartOptions
    // });
  }

  // Mobilechart(mon, year) {
  //   var accessToken = window.localStorage.Tokenval;
  //   let serviceurl = this.cmn.commonUrl + "Account/GetUser";
  //   let params = {
  //     "text": "chartsformobileandwebentries",
  //     "id": mon,
  //     "param1": year,
  //     "param2": ""
  //   }
  //   let headres = new Headers({
  //     "Content-Type": "application/json",
  //     accept: "apllication/json",
  //     Authorization: accessToken
  //   });

  //   let Options = new RequestOptions({ headers: headres });
  //   this.http.post(serviceurl, params, Options).map(res => res.json()).subscribe(res => {
  //     // debugger
  //     var monthname = [];
  //     var monthcount = [];
  //     if (res.data.Table.length > 0) {
  //       for (let i = 0; i < res.data.Table.length; i++) {
  //         monthname.push(res.data.Table[i].Appointmentmonth);
  //         monthcount.push(res.data.Table[i].noofprescriptions)
  //       }
  //     } else {
  //       monthname.push("No data found")
  //       monthcount.push(0)
  //     }//close month count

  //     var dayname = [];
  //     var daycount = [];
  //     if (res.data.Table1.length > 0) {
  //       for (let i = 0; i < res.data.Table1.length; i++) {
  //         dayname.push(res.data.Table1[i].Appointmentday);
  //         daycount.push(res.data.Table1[i].noofprescriptions);
  //       }
  //     }//close day count
  //     var final = [];
  //     var j = 0;
  //     this.daysarr.filter(function (val, i) {
  //       if (dayname.indexOf(val) != -1) {
  //         final.push({ "date": val, "appointment": daycount[j] })
  //         j++;
  //       }
  //       else {
  //         final.push({ "date": val, "appointment": 0 })
  //       }
  //     });


  //     var appcount = []; var appdate = [];
  //     for (let i = 0; i < final.length; i++) {
  //       appcount.push(final[i].appointment)
  //       appdate.push(final[i].date)
  //     }

  //     // var myChart = new Chart(document.getElementById("Mobiledaywise"), {
  //     //   // type: 'horizontalBar',
  //     //   type: 'bar',
  //     //   data: {
  //     //     labels: appdate,
  //     //     datasets: [{
  //     //       label: "Count",
  //     //       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd",
  //     //         "#FF00FF", "#8A2BE2", "#00BFFF", "#FF69B4", "#F08080", "#FF6347", "#FF00FF", "#00BFFF", "#48D1CC", "#F4A460",
  //     //         "#3498DB", "#003399", "#3cba9f", "#E9967A", "#c45850", "#F39C12", "#48C9B0", "#48C9B0", "#FF69B4", "#E9967A",
  //     //         "#FF6347", "#FF00FF", "#00BFFF", "#48D1CC", "#F4A460"
  //     //       ],
  //     //       data: appcount
  //     //     }]
  //     //   },
  //     //   options: {
  //     //     legend: { display: false }, title: { display: true, text: monthname[0] == undefined ? "No data found" : monthname[0] }
  //     //   }
  //     // });

  //     var yearname = [];
  //     var yearcount = [];
  //     if (res.data.Table2.length > 0) {
  //       for (let j = 0; j < res.data.Table2.length; j++) {
  //         yearname.push(res.data.Table2[j].Appointmentyear);
  //         yearcount.push(res.data.Table2[j].noofprescriptions);
  //       }
  //     } else {
  //       yearname.push("No data found")
  //       yearcount.push(0)
  //     }//close year count

  //     new Chart(document.getElementById("mobiletyearwise"), {
  //       type: 'pie',
  //       data: {// labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //         labels: yearname,
  //         datasets: [{
  //           label: "Year wise appointments",
  //           backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
  //           data: [yearcount]
  //         }]
  //       },
  //       options: { legend: { display: true } }
  //     });


  //     new Chart(document.getElementById("mobilemonthwise"), {
  //       type: 'pie',
  //       data: {// labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //         labels: monthname,
  //         datasets: [{
  //           label: "Month wise appointments",
  //           backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
  //           data: [monthcount]
  //         }]
  //       },
  //       options: { legend: { display: true } }
  //     });


  //   }, error => {
  //     console.log(error);
  //   });
  // }
}

