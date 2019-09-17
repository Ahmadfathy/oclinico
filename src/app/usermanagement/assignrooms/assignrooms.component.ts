import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignrooms',
  templateUrl: './assignrooms.component.html',
  styleUrls: ['./assignrooms.component.css']
})
export class AssignroomsComponent implements OnInit {
  @ViewChild('assignroomno') assignrm: TemplateRef<any>;
  public isPageloaderVisible: boolean = true;
  public roomdetails: any = [];
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public showpagenation: boolean = false;
  public addroom: any = [];
  public assignedrm: any = [];
  userid: any;
  gender: any;
  modalReference = null;
  public genders: any = [{ "name": "Male" }, { "name": "Female" }];
  public departmentname: any;
  public updatehide: boolean = true;
  public inserthide: boolean = true;
  public roomnoinput: any;
  public roomnumbers: any = [];
  roomname: any;
  docname: any;
  docid: any;
  rolename: any;
  docdiv: boolean = false;
  newroomno: any;
  newdocname: any;
  newdept: any;
  newdocid: any;
  showbuttons: boolean = false;
  listofspecialization: any = [];
  specialization: any;
  constructor(public commonService: UserinfoService,
    public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef) {
    this.userid = window.localStorage.getItem("userId");
  }

  ngOnInit() {
    this.isPageloaderVisible = false;
    this.getspecializations();
  }

  genderchange(gender) {
    console.log(gender);
    this.gender = gender;
  }

  specchange(spec) {
    console.log(spec);
    this.specialization = spec
  }

  mydata() {
    this.getdata(this.gender, this.specialization);
  }

  getdata(gender, spec) {
    var tab = $('#dataTable').DataTable();
    tab.destroy();
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
      "text": "getDoctorsGrid",
      "id": this.userid,
      "param1": gender,
      "param2": spec

    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd == "0") {
        this.isPageloaderVisible = false;
        this.showLoader = false;
        this.showdata = false;
        this.nodata = true;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.isPageloaderVisible = false;
        this.showLoader = false;
        this.roomdetails = result.data.Table;
        console.log(JSON.stringify(this.roomdetails));
        this.showdata = true;
        this.nodata = false;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
        for (let i = 0; i < this.roomdetails.length; i++) {
          if (this.roomdetails[i].Assign_Rooms == null || this.roomdetails[i].Assign_Rooms == "") {
            this.addroom[i] = true;
            this.assignedrm[i] = false;
          }
          else {
            this.addroom[i] = false;
            this.assignedrm[i] = true;
          }
        }
      }
    })
  }

  getspecializations() {
    var accessToken = window.localStorage.Tokenval
    let getdepartmentsurl = this.commonService.commonUrl + "Account/Departments_Details"
    let body = {
      "Sno": "",
      "clinicid": this.userid,
      "BranchID": "",
      "DeptID": "",
      "DeptName": "",
      "Status": "",
      "LoginID": "",
      "Trans_Date": "",
      "Last_update": "",
      "Condition": "GetspecializationData"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(getdepartmentsurl, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == 1) {
          console.log(res)
          this.listofspecialization = res.data.Table;
        }
      },
        err => {
          console.log("ERROR!: ", err);
        });
  }

  getroomnumbers(des){
    var accessToken = window.localStorage.Tokenval
    let getdepartmentsurl = this.commonService.commonUrl + "Account/getuser"
    let body = {
      "text":"getroom_bydesignation",
      "id":des,
      "param1":"",
      "param2":"" 
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    console.log(body);
    let options = new RequestOptions({ headers: headers });
    this.http.post(getdepartmentsurl, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == 1) {
          this.roomnumbers = res.data.Table;
        }
      },
        err => {
          console.log("ERROR!: ", err);
        });
  }

  roomchange(val) {
    console.log(val);
    this.roomname = val;
    this.checkroomstatus(val)
  }

  room(eachitem, name) {
    console.log(eachitem);
    console.log(name)
    if (name == "insert") {
      this.inserthide = false;
      this.updatehide = true;
    }
    else {
      console.log("................")
      this.inserthide = true;
      this.updatehide = false;
    }
    this.modalReference = this.modalService.open(this.assignrm, { centered: true });
    this.docname = eachitem.Name;
    this.docid = eachitem.Practitioner_Id;
    this.departmentname = eachitem.designation;
    this.getroomnumbers(this.departmentname);
    console.log(this.docname + ".........." + this.departmentname)
    if (eachitem.Assign_Rooms == null || eachitem.Assign_Rooms == "") {
    }
    else {
      this.roomnoinput = eachitem.Assign_Rooms;
    }
  }

  insertclick() {
    this.docdiv = false;
    console.log(this.roomname)
    if (this.roomname == "" || this.roomname == undefined) {
      alert("Please Choose Room.");
      return false;
    }
    else {
      var accessToken = window.localStorage.Tokenval
      console.log(accessToken)
      let url = this.commonService.commonUrl + "Account/Roomsoperations"
      let body = {
        "Sno": "",
        "Roomid": "",
        "Roomname": this.roomname,
        "Clinic_Id": this.userid,
        "DoctorID": this.docid,
        "Dept": this.departmentname,
        "Status": "",
        "Trdate": "",
        "CreatedBy": "",
        "Updatedby": "",
        "updateddate": "",
        "Assign_Rooms": "",
        "Condition": "Insert"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      console.log(body)
      let options = new RequestOptions({ headers: headers });
      this.isPageloaderVisible = true;
      console.log(body)
      this.http.post(url, body, options)
        .map(res => res.json()).subscribe(res => {
          console.log(res);
          this.isPageloaderVisible = false;
          if (res.status_cd == 1) {
            alert("Room Allocated Successfully.")
            this.modalReference.close();
            this.getdata(this.gender,this.specialization);
          }
          else {
          }
        },
          err => {
            this.isPageloaderVisible = false;
            console.log("ERROR!: ", err);
          });
    }
  }

  updateclick() {
    this.docdiv = false;
    if (this.newdocid == undefined) {
      this.newdocid = "";
    }
    var accessToken = window.localStorage.Tokenval
    console.log(accessToken)
    let url = this.commonService.commonUrl + "Account/Roomsoperations"
    let body = {
      "Sno": "",
      "Roomid": "",
      "Roomname": this.roomname,
      "Clinic_Id": this.userid,
      "DoctorID": this.docid,
      "Dept": this.newdocid,
      "Status": "",
      "Trdate": "",
      "CreatedBy": "",
      "Updatedby": "",
      "updateddate": "",
      "Assign_Rooms": "",
      "Condition": "Update"
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.isPageloaderVisible = true;
    console.log(body)
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res);
        this.isPageloaderVisible = false;
        if (res.status_cd == 1) {
          alert("Room Updated Successfully.")
          this.modalReference.close();
          this.getdata(this.gender,this.specialization);
        }
        else {
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
  }

  checkroomstatus(roomno) {
    var accessToken = window.localStorage.Tokenval
    console.log(accessToken)
    let url = this.commonService.commonUrl + "Account/GetUser"
    let body = {
      "text": "Checkroom",
      "id": this.userid,
      "param1": roomno,
      "param2": this.gender
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.isPageloaderVisible = true;
    console.log(body)
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res);
        this.isPageloaderVisible = false;
        if (res.data.Table[0].Result == "True") {
          this.docdiv = false;
          this.showbuttons = true;
          this.inserthide = false;
          this.updatehide = true;
          // this.insertclick();
        }
        else {
          this.docdiv = true;
          this.inserthide = true;
          this.updatehide = false;
          this.newroomno = res.data.Table[0].Assign_Rooms
          this.newdocname = res.data.Table[0].Name
          this.newdept = res.data.Table[0].designation
          this.newdocid = res.data.Table[0].Emp_Id
          this.showbuttons = true;
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
  }

  cancel() {
    this.modalReference.close();
    this.getdata(this.gender,this.specialization);
  }
}
