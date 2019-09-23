import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ROUTES, SINGLEROUTES, DOCTORSROUTES, PharmasistROUTES, ReceptionistROUTES, LabtechistROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserinfoService } from 'src/app/userinfo.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Http, Headers, RequestOptions } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Output() closemenu = new EventEmitter();
  showMenu = '';
  showSubMenu = '';
  //  username = this._user.username;
  username: any;
  userimgpath = this._user.userimgpath;
  public sidebarnavItems: any[];
  loginType: string;
  CRid: any;
  userid: string;
  mainmenulist: any = [];
  submenu: any = [];
  public langulagetype: any = '';
  langVal: any = "1";

  languageoption: any = "EN";
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }


  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private _user: UserinfoService,
    public http: Http

    // private settings: FullComponent
  ) {
    this._user.myuname.subscribe(message => {
      this.username = message;
    });


    this._user.myloginType.subscribe(message1 => {
      this.loginType = message1;
    })

    this._user.myRoleId.subscribe(message2 => {
      this.CRid = message2;
      //alert(this.CRid)
    })

    this._user.myloginuid.subscribe(msg => {
      this.userid = msg;
    })

    // this._user.loginselected_lang.subscribe(message3 =>{
    //   console.log(message3);
    //   this.langulagetype= message3;
    //   this.languageoption = message3;
    //   console.log(this.langulagetype);

    //   if (this.languageoption == 'EN'){
    //     this.langulagetype = "EN";
    //      this.langVal = "1";

    //      console.log( this.langVal)

    //      this.sidebarnavItems= [];
    //     this.GetMenu(this.langVal);
    //   }
    //   else if(this.languageoption == "AR") {

    //     this.langulagetype = this.languageoption;
    //     this.langVal = "2";
    //     console.log( this.langVal) 
    //     this.sidebarnavItems= [];
    //     this.GetMenu(this.langVal);
    //   }
    // })

    // this._user.currentMessagecat.subscribe(message => {
    //   console.log(message);
    //   this.languageoption = message.split("_")[1];
    //   console.log(this.languageoption);

    //   // if (this.languageoption == '' || this.languageoption == undefined || this.languageoption == "undefined")
    //   if (this.languageoption == 'EN') {
    //     this.langulagetype = "EN";
    //     this.langVal = "1";
    //     this.sidebarnavItems = [];
    //     this.GetMenu(this.langVal);
    //   }
    //   else if (this.languageoption == "AR") {

    //     this.langulagetype = this.languageoption;
    //     this.langVal = "2";
    //     this.sidebarnavItems = [];
    //     this.GetMenu(this.langVal);
    //   }
    //   //   this.formErrors = {

    // });
    this._user.loginselected_lang.subscribe(message3 => {
      this.langulagetype = message3;
      this.languageoption = message3;

      if (this.languageoption == 'EN') {
        this.langulagetype = "EN";
        this.langVal = "1";

        this.sidebarnavItems = [];
        this.GetMenu(this.langVal);
      }
      else if (this.languageoption == "AR") {

        this.langulagetype = this.languageoption;
        this.langVal = "2";
        this.sidebarnavItems = [];
        this.GetMenu(this.langVal);
      }
    })


    this._user.currentMessagecat.subscribe(message => {
      this.languageoption = message.split("_")[1];



      if (this.languageoption == 'EN') {
        this.langulagetype = "EN";
        this.langVal = "1";

        this.sidebarnavItems = [];
        this.GetMenu(this.langVal);
      }
      else if (this.languageoption == "AR") {

        this.langulagetype = this.languageoption;
        this.langVal = "2";
        this.sidebarnavItems = [];
        this.GetMenu(this.langVal);
      }
      //   this.formErrors = {

    });




  }


  // End open close
  ngOnInit() {

    this.userid = window.localStorage.getItem("userId");
    this.username = window.localStorage.getItem("name")
    this.CRid = window.localStorage.getItem("RoleID")

    this.loginType = window.localStorage.getItem("oclinicologinStatus");
    //  alert(this.CRid); 
    // if (this.loginType === "Active") {
    //   this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    // } else {
    //   this.sidebarnavItems = SINGLEROUTES.filter(sidebarnavItem => sidebarnavItem);
    // }

    // Vijay CODE STARTS
    // if(this.CRid === '100') {
    //   if (this.loginType === "Active") {
    //     this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    //   } else {
    //     this.sidebarnavItems = SINGLEROUTES.filter(sidebarnavItem => sidebarnavItem);
    //   }
    // }

    // else if(this.CRid === '3607') this.sidebarnavItems = DOCTORSROUTES.filter(sidebarnavItem => sidebarnavItem);

    // else if(this.CRid === '3612') this.sidebarnavItems = PharmasistROUTES.filter(sidebarnavItem => sidebarnavItem);

    // else if(this.CRid === '3611') this.sidebarnavItems = ReceptionistROUTES.filter(sidebarnavItem => sidebarnavItem);

    // else if(this.CRid === '3613') this.sidebarnavItems = LabtechistROUTES.filter(sidebarnavItem => sidebarnavItem);

    // Vijay CODE ENDS




    // clearTimeout(timer);
    // var timer = setTimeout(this._user.tokenFun(), 150000); // Getting error


    this.GetMenu(this.langVal);

    setInterval(() => {
      // window.localStorage.Tokenval = "";
      this._user.tokenFun();
      //  alert("Your Session Expired, Please login again");
    }, 150000);


  }

  GetMenu(langVal) {
    console.log("getmenu entered........" + langVal)
    // var accessToken=window.sessionStorage.Tokenval;
    var accessToken = window.localStorage.Tokenval;
    console.log(accessToken);
    // let serviceUrl="http://23.92.209.46/OclinicoAPI/Api/Account/Get_MenuList_Role_New";

    let serviceUrl = this._user.commonUrl + "Account/Get_MenuList_sidemenu"
    let params =

    {

      "Roledid": this.CRid,
      "lang": langVal,
      "PageName": "",
      "clinicid": this.userid,
      "Branchid": "",
      "submenuid": ""

    }


    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {

      if (result.status_cd === "1") {
        console.log(window.localStorage.getItem("Roletype"));
        console.log(window.localStorage.getItem("RoleID"));
        this.sidebarnavItems = result.data;
        // let temp= {
        //   AddStatus: "True",
        //   Branchid: "",
        //   Clinicid: "",
        //   DownStatus: "True",
        //   EditStatus: "True",
        //   ExportSts: "True",
        //   Img_Url: "icon-dashboard",
        //   Img_Url1: "icon-Car-Wheel",
        //   ImportSts: "True",
        //   MenuOrder: "1",
        //   PrintStatus: "True",
        //   Sno: "1",
        //   ViewStatus: "True",
        //   class1: "",
        //   count: "0",
        //   extralink: false,
        //   link: "Welcome.aspx",
        //   link1: "/patientsummery",
        //   menu_datetime: "6/15/2016 9:11:46 AM",
        //   menu_name: "patient summary",
        //   menu_status: "1",
        //   menuid: "100",
        //   parent_id: "0",
        //   sidesubmenu: null,
        // }
        // this.sidebarnavItems.push(temp);

        // this.mainmenulist = result.data.Table;
        // this.submenu = result.data.Table1;
        for (var i = 0; i < this.sidebarnavItems.length; i++) {

          this.sidebarnavItems[i].extralink = false;

          if ((this.sidebarnavItems[i].menu_name == "Pharmacy") || (this.sidebarnavItems[i].menu_name == "User Management") ||
            (this.sidebarnavItems[i].menu_name == "Appointments") || (this.sidebarnavItems[i].menu_name == "مواعيد") || (this.sidebarnavItems[i].menu_name == "إدارة المستخدم")
            || (this.sidebarnavItems[i].menu_name == "صيدلية")) {
            this.sidebarnavItems[i].class1 = "has-arrow";
          } else {
            this.sidebarnavItems[i].class1 = "";
          }
          if (this.sidebarnavItems[i].sidesubmenu != null) {
            for (var j = 0; j < this.sidebarnavItems[i].sidesubmenu.length; j++) {
              this.sidebarnavItems[i].sidesubmenu[j].class1 = "";
              this.sidebarnavItems[i].sidesubmenu[j].extralink = false;
            }
          }
        }
      } else {

        console.log("No Menu items available");

      }
    },
      error => {
      }
    );
    //.......................................
    // let serviceUrl = this._user.commonUrl+"Account/Get_MenuList_Role_New"

    // let params = 
    //           {
    //             "Roledid":this.CRid,
    //             "lang":"2",
    //             "PageName":"", 
    //             "clinicid":  this.userid , 
    //             "Branchid":"", 
    //             "submenuid":""

    //             }


    //         let headers = new Headers({"Content-Type" : "application/json",
    //                                   Accept : "application/json",
    //                                   Authorization : accessToken});

    //         let options = new RequestOptions({ headers : headers });

    //         this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
    //          console.log(result);


    //           if(result.status_cd === "1"){
    //             console.log(window.localStorage.getItem("Roletype"));
    //             console.log(window.localStorage.getItem("RoleID"));
    //             console.log(result.data.Table);
    //             this.mainmenulist = result.data.Table;
    //             this.submenu = result.data.Table1;
    //           }else{

    //        console.log("No Menu items available");


    //           }
    //         },
    //         error=>{
    //         }
    //         );
  }

  ngOnDestroy() {
    this._user.currentMessagecat.subscribe(message3 => {
      console.log(message3 + "Destroyed");
    })
  }
}
