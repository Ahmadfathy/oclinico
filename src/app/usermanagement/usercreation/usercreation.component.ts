
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'
import { UserinfoService } from 'src/app/userinfo.service';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-usercreation',
  templateUrl: './usercreation.component.html',
  styleUrls: ['./usercreation.component.css']
})

export class UsercreationComponent implements OnInit {
  public TaxData: any;
  public userid: any;
  public usersdata: any = [];
  public dataTable: any = [];
  public isPageloaderVisible: boolean = true;
  public addfeehide: any = [];
  public addedhide: any = [];
  modalReference = null;
  public docname: any;
  public addroom: any = [];
  public assignedrm: any = [];
  public departmentname: any;
  public updatehide: boolean = true;
  public inserthide: boolean = true;
  public roomnoinput: any;
  public roomnumbers: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public notavailable: any = [];
  public available: any = [];

  @ViewChild('assignroomno') assignrm: TemplateRef<any>;
  roomname: any;
  empid: any;
  rolename: any;
  constructor(public http: Http,
    public router: Router,
    public commonService: UserinfoService,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef) {
    this.userid = window.localStorage.getItem("userId");
    console.log("this.userid" + this.userid);
  }

  ngOnInit() {

    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    //this.isPageloaderVisible=true;
    this.getdata();

  }
  getdata() {
    var tab = $('#dataTable').DataTable();
    tab.destroy();
    var accessToken = window.localStorage.Tokenval
    let url = this.commonService.commonUrl + "Account/GetUser"
    let body = {
      "text": "Staffinfo",
      "id": this.userid,
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.isPageloaderVisible = true;
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res)
        if (res.status_cd == 1) {
          this.isPageloaderVisible = false;
          this.usersdata = res.data.Table;
          for (let i = 0; i < this.usersdata.length; i++) {
            this.addfeehide.push(i);
            this.addedhide.push(i);
            if (this.usersdata[i].role_name == "Doctor") {

              if (this.usersdata[i].payment_fee == null) {
                // console.log("entered........"+this.usersdata[i].payment_fee)
                // console.log(this.usersdata[i])
                this.addfeehide[i] = true;
                console.log(this.addfeehide[i])
                this.addedhide[i] = false;
              }
              else {
                this.addfeehide[i] = false;
                this.addedhide[i] = true;

              }

              // if (this.usersdata[i].Assign_Rooms == null || this.usersdata[i].Assign_Rooms == "") {
              //   console.log(this.usersdata[i].hiredate + "entered into if....")
              //   this.addroom[i] = true;
              //   this.assignedrm[i] = false;
              // }
              // else {
              //   console.log(this.usersdata[i].hiredate + "entered into else....")
              //   this.addroom[i] = false;
              //   this.assignedrm[i] = true;

              // }

              if (this.usersdata[i].availiblestatus == null || this.usersdata[i].availiblestatus == "" || this.usersdata[i].availiblestatus == false || this.usersdata[i].availiblestatus == "false") {
                console.log(this.usersdata[i].availiblestatus + "entered into if....")
                this.notavailable[i] = true;
                this.available[i] = false;
              }
              else {
                this.notavailable[i] = false;
                this.available[i] = true
              }
              //   this.addfeehide=false;
              // this.checkfee(this.usersdata[i].Emp_Id);
            }
            else {
              // console.log("else entered")
              this.addfeehide[i] = false;
              this.addedhide[i] = false;
              this.notavailable[i] = false;
              this.available[i] = false;
            }
          }
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
          //console.log("usersdata..."+JSON.stringify(this.usersdata));
        }
        else {
          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable();
        }
      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    // console.log("Token Error:"+err);
    // } 
    // );

  }
  // submitclick(val) {
  //   console.log(this.roomname)
  //   if (this.roomname == "" || this.roomname == undefined) {
  //     alert("Please choose Room.");
  //     return false;
  //   }
  //   else {
  //     var accessToken = window.localStorage.Tokenval
  //     console.log(accessToken)
  //     let url = this.commonService.commonUrl + "Account/Roomsoperations"
  //     let body = {
  //       "Sno": '',
  //       "Roomid": '',
  //       "Roomname": this.roomname,
  //       "Clinic_Id": this.userid,
  //       "DoctorID": this.empid,
  //       "Dept": this.departmentname,
  //       "Status": '',
  //       "Trdate": '',
  //       "CreatedBy": '',
  //       "Updatedby": '',
  //       "updateddate": '',
  //       "Assign_Rooms": '',
  //       "Condition": "Insert"
  //     }
  //     let headers = new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken
  //     });

  //     let options = new RequestOptions({ headers: headers });
  //     this.isPageloaderVisible = true;
  //     console.log(url);
  //     console.log(body)
  //     this.http.post(url, body, options)
  //       .map(res => res.json()).subscribe(res => {
  //         console.log(res);
  //         this.isPageloaderVisible = false;
  //         if (res.status_cd == 1) {
  //           if (val == "insert") {
  //             alert("Room Allocated Successfully.")
  //           }
  //           else {
  //             alert("Room No Updated Successfully.")
  //           }
  //           this.modalReference.close();
  //           this.getdata();
  //         }
  //         else {

  //         }

  //       },
  //         err => {
  //           this.isPageloaderVisible = false;
  //           console.log("ERROR!: ", err);
  //         });
  //   }

  // }
  addclick() {
    console.log("entered into click")
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible = true;
    var accessToken = window.localStorage.Tokenval
    console.log(accessToken)
    let url = this.commonService.commonUrl + "Account/GetUser"
    let body = {
      "text": "checkexistence",
      "id": this.userid,
      "param1": "",
      "param2": ""
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.isPageloaderVisible = true;
    console.log(url);
    console.log(body)
    this.http.post(url, body, options)
      .map(res => res.json()).subscribe(res => {
        console.log(res);
        this.isPageloaderVisible = false;
        if (res.status_cd == 1) {
          alert("please add general settings.")
        }
        else {
          this.router.navigate(['/useradd']);
        }

      },
        err => {
          this.isPageloaderVisible = false;
          console.log("ERROR!: ", err);
        });
    // },
    // err=>{
    // console.log("Token Error:"+err);
    // } 
    // );

  }
  roomchange(val) {
    console.log(val);
    this.roomname = val;
  }
  assignclick(eachitem, name) {
    console.log(eachitem);
    console.log(name)
    if (name == "insert") {
      console.log("|entweraslkdjf")
      this.inserthide = false;
      this.updatehide = true;
    }
    else {
      console.log("................")
      this.inserthide = true;
      this.updatehide = false;
    }
    this.modalReference = this.modalService.open(this.assignrm, { centered: true });
    this.docname = eachitem.name;
    this.empid = eachitem.Emp_Id;
    this.rolename = eachitem.role_name;
    this.departmentname = eachitem.designation;
    console.log(this.docname + ".........." + this.departmentname)
    if (eachitem.Assign_Rooms == null || eachitem.Assign_Rooms == "") {

    }
    else {
      this.roomnoinput = eachitem.Assign_Rooms;
    }

  }

  radiochange(val) {

    console.log(val);
  }
  edituser(val) {
    let userdata = val;
    window.localStorage.setItem("eachuserdat", userdata);
    this.router.navigate(['/useredit']);
  }
  viewuser(val) {
    let data = val;
    window.localStorage.setItem("eachuserdat", data);
    this.router.navigate(['/userview']);
  }
  addfee(val) {
    console.log(val);
    window.localStorage.setItem("eachuserid", val);
    this.router.navigate(['/Add_doctorfee']);
  }

  open1(content1, val) {
    this.modalService.open(content1).result.then((result) => {
      console.log(result)
      if (result == "Ok click") {
        console.log("ok")
        console.log(val)
        this.isPageloaderVisible = true;
        var accessToken = window.localStorage.Tokenval
        console.log(accessToken)
        let url = this.commonService.commonUrl + "Account/GetUser"
        let body = {
          "text": "updateavailibletimings",
          "id": this.userid,
          "param1": val,
          "param2": "false"
        }
        console.log(body);
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });

        let options = new RequestOptions({ headers: headers });
        this.isPageloaderVisible = true;
        console.log(url);
        console.log(body)
        this.http.post(url, body, options)
          .map(res => res.json()).subscribe(res => {
            console.log(res);
            if (res.status_cd == 1) {
              this.isPageloaderVisible = false;
              alert("Doctor not available now");
              this.getdata();
            }
            else {
              // this.router.navigate(['/useradd']);
            }

          },
            err => {
              this.isPageloaderVisible = false;
              console.log("ERROR!: ", err);
            });
      }
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.modalService.open(cont1);

  }
  open(content, val) {
    this.modalService.open(content).result.then((result) => {
      console.log(result)
      if (result == "Ok click") {
        console.log("ok")
        console.log(val)
        this.isPageloaderVisible = true;
        var accessToken = window.localStorage.Tokenval
        console.log(accessToken)
        let url = this.commonService.commonUrl + "Account/GetUser"
        let body = {
          "text": "updateavailibletimings",
          "id": this.userid,
          "param1": val,
          "param2": "true"
        }
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });

        let options = new RequestOptions({ headers: headers });
        this.isPageloaderVisible = true;
        console.log(url);
        console.log(body)
        this.http.post(url, body, options)
          .map(res => res.json()).subscribe(res => {
            console.log(res);
            if (res.status_cd == 1) {
              this.isPageloaderVisible = false;
              alert("Doctor available now");
              this.getdata();
            }
            else {
              // this.router.navigate(['/useradd']);
            }

          },
            err => {
              this.isPageloaderVisible = false;
              console.log("ERROR!: ", err);
            });
      }
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}

