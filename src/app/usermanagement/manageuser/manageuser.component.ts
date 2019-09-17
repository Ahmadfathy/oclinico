import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { values } from 'd3';
import { UserinfoService } from 'src/app/userinfo.service';
import { Http,Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  @ViewChild('tabs')
  public isPageloaderVisible:boolean=true;
  public tabs:NgbTabset;
  myuserForm:FormGroup;
  settingform:FormGroup;
  public formArrayLength: number = 0;
  public eachdata:any=[];
  public mainmenuvalues:any=[];
  public settingsmenuvalues:any=[];
  public selectroles:any=[];
  public userdata:any=[];
  public submenuif:boolean=false;
  public rolename:any;
  public usersubdata:any=[];
  public submenuhide:boolean=false;
  public insertarray:any=[];
  body = {};
  length: number = 0;
  mainDataLength: number = 0;
  allTables: Array<any> = [];
  aceesToken: string = '';
  mainMenuSettings: Array<any> = [];
  settingsMenu: Array<any> = [];
  patientsettingMenu:any=[];
  allDataLoaded: boolean = false;
  public chkbxcheck:boolean;
  public settingsdata:any=[];
  viewdisable: number;
  userid: string;
  mainidx: any;
  onLoadData : Array<any> = [];
  rolesdata : any = [];

  public selected_main_menu = [];
  public selected_main_menu_options = [];
  public selected_final_menu = [];
  public sele_values = [];
  public mainmenu_selected_arr :  Array<any> = [];
  public menu_settings_arr: any=[];
  public patient_Selected : any = [];
  public settings_selected : any = [];
  curntdatetoday: string;
  selected_final_settingmenu:any = [];
  selected_final_pateintmenu : any = [];

  constructor(private formBuilder: FormBuilder,
              public http:Http,
              public router:Router,
              public commonService:UserinfoService,) { 
                this.userid = window.localStorage.getItem("userId");
    

  
  }
 
  mainmenusubmit(){
    console.log(this.mainmenuvalues);
    this.tabs.select('settingmenu');
  }
  settingsmenusubmit(){
    console.log(this.settingsmenuvalues);
  }
  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.curntdatetoday = dd + '/' + mm + '/' + yyyy;
    this.getrole();
   // this.oclinicoManageUsers(this.body);
    //this.getSettingsMenu();

  //  this.chkbxcheck=true
  
  }
 
  getrole(){
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval;
     
      let url= this.commonService.commonUrl+"Account/Role_Operations"
      let body={ 
        "clinicid":this.userid, 
        "branchid":"",
        "loginid":this.userid,
        "RoleId":"",
        "RoleName":"",
        "Status":"",
        "Organisation_ID":"",
        "OperationType":"Getformngmt"
        }
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
          this.rolesdata=res.data.Table;
          console.log(JSON.stringify(this.rolesdata))
        //  this.selectroles = res.data.Table.slice(0,1);
          for(var i=0;i<this.rolesdata.length;i++){
            if(this.rolesdata[i].role_name == "Branch"){

            }else{
              this.selectroles.push(this.rolesdata[i]);
            }
          }
          console.log(JSON.stringify(this.selectroles))
         // this.selectroles = res.data.Table;

          this.rolename = this.selectroles[0].role_name;
          console.log(this.rolename);
          console.log(this.userid);
      this.rolechange( this.selectroles[0].role_name);
          //console.log("banknames url..."+JSON.stringify(this.banknames));
        }
      
       
      
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }
      // err=>{
      // console.log("Token Error:"+err);
      // }
      
      // );
 // }
  rolechange(val){
    console.log("changed role id....."+val);
     this.rolename=val;
    this.getmainmenulist();
    this.getSettingsMenulist();
    this.getPatientlist();
    
      }
  getmainmenulist(){
    this.mainMenuSettings = [];
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval;
      console.log(accessToken);
      // our service calling as usual
      let url= this.commonService.commonUrl+"Account/Get_roleMenuList";
      console.log(url);
      let body={ 
        "Sno":"", 
        "Clinicid":this.userid, 
        "Branchid":"", 
        "menuid":"", 
        "role_id":this.rolename, 
        "menu_status":"", 
        "MainMenuId":"", 
        "Loginid":this.userid, 
        "menu_datetime":"", 
        "Add_Sts":"", 
        "Edit_Sts":"", 
        "View_Sts":"", 
        "Download_Sts":"", 
        "Print_Sts":"", 
        "Condition":"rolebasemenu", 
        "Import_Sts":"", 
        "Export_Sts":""
        
        }
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
              let options = new RequestOptions({ headers : headers });
              
      this.http.post(url,body, options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible=false;
        console.log(JSON.stringify(body));
        console.log(res);
        if(res.status_cd == 1){
         // this.userdata=res.data.Table;
        
         this.mainMenuSettings = res.data;
        // console.log(JSON.stringify(this.mainMenuSettings));

         this.mainMenuSettings.forEach( (el , index) => {
          el["activateIt"] = "false";
          if(el.subrolemenu == null ){

          }else{
            for(var i=0;i<this.mainMenuSettings[index].subrolemenu.length;i++){
              this.mainMenuSettings[index].subrolemenu[i]["activateIt"] = "false";
            }
          }
        })
        }      
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }

    /////////////// Getting Sub Menu List ///////

    getSettingsMenulist(){
    
      this.isPageloaderVisible=true;
      var accessToken= window.localStorage.Tokenval;
        console.log(accessToken);
        // our service calling as usual
        let url= this.commonService.commonUrl+"Account/Get_rolesettingMenuList"
        let body={ 
          "Sno":"", 
          "Clinicid":this.userid, 
          "Branchid":"", 
          "menuid":"", 
          "role_id":this.rolename, 
          "menu_status":"", 
          "MainMenuId":"", 
          "Loginid":this.userid, 
          "menu_datetime":"", 
          "Add_Sts":"", 
          "Edit_Sts":"", 
          "View_Sts":"", 
          "Download_Sts":"", 
          "Print_Sts":"", 
          "Condition":"rolebasesettingmenu", 
          "Import_Sts":"", 
          "Export_Sts":""
          
          }
        let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken
                                        });
                                      
                let options = new RequestOptions({ headers : headers });
        this.http.post(url,body, options)
        .map(res => res.json()).subscribe(res => {
          this.isPageloaderVisible=false;
          console.log(res);
          if(res.status_cd == 1){
           // this.userdata=res.data.Table;
           this.settingsMenu = res.data;
           this.settingsMenu.forEach( (el , index) => {
            el["activateIt"] = "true";
            if(el.subrolemenu == null ){
  
            }else{
              for(var i=0;i<this.settingsMenu[index].subrolemenu.length;i++){
                this.settingsMenu[index].subrolemenu[i]["activateIt"] = "true";
              }
            }
          })
          }      
        },
          err => {
            this.isPageloaderVisible=false;
            console.log("ERROR!: ", err);
          });
        }
  /////////////////// Getting Patient Menu List ////////////////////


  getPatientlist(){
    
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval
      console.log(accessToken);
      // our service calling as usual
      let url= this.commonService.commonUrl+"Account/User_Operations"
      let body={ 
        "Sno":"", 
        "Clinicid":this.userid, 
        "Branchid":"", 
        "menuid":"", 
        "role_id":this.rolename, 
        "menu_status":"", 
        "MainMenuId":"", 
        "Loginid":this.userid, 
        "menu_datetime":"", 
        "Add_Sts":"", 
        "Edit_Sts":"", 
        "View_Sts":"", 
        "Download_Sts":"", 
        "Print_Sts":"", 
        "Condition":"rolebasepatientmenu", 
        "Import_Sts":"", 
        "Export_Sts":""
        
        }
      let headers = new Headers({"Content-Type" : "application/json",
                                        Accept : "application/json",
                                        Authorization : accessToken
                                      });
                                    
              let options = new RequestOptions({ headers : headers });
      this.http.post(url,body, options)
      .map(res => res.json()).subscribe(res => {
        this.isPageloaderVisible=false;
        console.log(res);
        if(res.status_cd == 1){
          //this.userdata=res.data.Table;
          this.patientsettingMenu = res.data.Table;
          this.patientsettingMenu.forEach( (el , index) => {
            el["activateIt"] = "false";
           
          })
        }      
      },
        err => {
          this.isPageloaderVisible=false;
          console.log("ERROR!: ", err);
        });
      }

 
  maincheck(val){
    console.log("vallllll..."+JSON.stringify(val));
  }


  ///// Get Settings Menu Data ////

  getSettingsMenu(){
    var accessToken= window.localStorage.Tokenval;
var url =  this.commonService.commonUrl+'Account/Get_setMenuList';
    console.log(url);
    var params = {}
  
    // this.aceesToken = 'INx68gdENLWnmaFYrN5LHZQx2SxCFmgYG2hOI1KwhCmJa4h4emzyd0eWs2FfJ1Jhiljp5qgWdjIU4EJ04Hxk8ixAgmyWmh2KW31ZU_y95DC62y6Ezjw4AwN7ikz32Xx-oYG7dNjB5YDI737fQQomvYb9nVzleD0e9dSDAInag8BjP3UfWAHLpYMQhWq99B4OCawjGtsKsNEK_xUG9J6LLDY4v5L3N8iN5AOPMrzCu3ClCv8lHHrC-RI0buk9eioN';
   console.log(accessToken);
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, params, options)
      .map(res => res.json())
      .subscribe((data) => {
        this.isPageloaderVisible=false;
        console.log(data);
        var tableLength = 0

        this.settingsMenu = data.data;
        
        this.settingsMenu.forEach( (el , index) => {
          el["activateIt"] = "false";
          if(el.subrolemenu == null ){

          }else{
            for(var i=0;i<this.settingsMenu[index].subrolesetingmenu.length;i++){
              this.settingsMenu[index].subrolesetingmenu[i]["activateIt"] = "false";
            }
          }
        })

        
        //console.log(JSON.stringify(this.settingsMenu));
       
      },
        err => {
          this.isPageloaderVisible=false;
          console.log(err);
        })
  }


  oclinicoManageUsers(params) {
    console.log(params);
    // this.commonService.tokenFun().subscribe(tokenResult =>{
    //   this.isPageloaderVisible=true;
    //   var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
    this.isPageloaderVisible=true;
    var accessToken= window.localStorage.Tokenval;
    console.log( window.localStorage.Tokenval);
    if (params.Clinicid === undefined) {
      var url = this.commonService.commonUrl+'Account/Get_MenuList';
    } else {
      console.log("else url entered...");
      var url = this.commonService.commonUrl+'Account/User_Operations';
    }
    console.log(url);
  
    // this.aceesToken = 'INx68gdENLWnmaFYrN5LHZQx2SxCFmgYG2hOI1KwhCmJa4h4emzyd0eWs2FfJ1Jhiljp5qgWdjIU4EJ04Hxk8ixAgmyWmh2KW31ZU_y95DC62y6Ezjw4AwN7ikz32Xx-oYG7dNjB5YDI737fQQomvYb9nVzleD0e9dSDAInag8BjP3UfWAHLpYMQhWq99B4OCawjGtsKsNEK_xUG9J6LLDY4v5L3N8iN5AOPMrzCu3ClCv8lHHrC-RI0buk9eioN';
   console.log(accessToken);
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(url, params, options)
      .map(res => res.json())
      .subscribe((data) => {
        this.isPageloaderVisible=false;
        console.log(data);
        var tableLength = 0

        this.mainMenuSettings = data.data;
        this.patientsettingMenu = data.data2;
        
        this.mainMenuSettings.forEach( (el , index) => {
          el["activateIt"] = "false";
          if(el.subrolemenu == null ){

          }else{
            for(var i=0;i<this.mainMenuSettings[index].subrolemenu.length;i++){
              this.mainMenuSettings[index].subrolemenu[i]["activateIt"] = "false";
            }
          }
        })

        this.patientsettingMenu.forEach( (el , index) => {
          el["activateIt"] = "false";
         
        })

       // console.log(JSON.stringify(this.mainMenuSettings));
       
      },
        err => {
          this.isPageloaderVisible=false;
          console.log(err);
        })
      }
  
  
  checkIt(index, operation, tab,subindex,mainsettingmenuid , type) {
    console.log(index + " " + operation + " " + tab+". . ."+subindex+". ."+mainsettingmenuid);
    console.log(subindex.toString());
    console.log(typeof subindex);

    if(type == "settingsmenu"){  //////// For Settings Menu /////////////

      if(subindex.toString() == ""){
     
        console.log("submenu is empty. . .");
        //for(var i=0;i< this.mainMenuSettings.length;i++){
         // if(this.mainMenuSettings[index].menuid == mainsettingmenuid ){
           console.log(this.settingsMenu[index]);
           console.log(operation);
          console.log(  this.settingsMenu[index][operation] )
            if( (this.settingsMenu[index][operation]).toLowerCase() == "false"){
              this.settingsMenu[index][operation]  = "True";
            }else{
              console.log(  this.settingsMenu[index][operation] );
              this.settingsMenu[index][operation]  = "False";
            }
            console.log(  this.settingsMenu[index][operation] );
         // } 
       // }
      }else{
  
        let tempst = "";
        let tempindx = 0;
        console.log("submenu is not empty. .");
        //for(var i=0;i< this.mainMenuSettings.length;i++){
          console.log(this.settingsMenu[index].menuid +". . ." +mainsettingmenuid );
         // if(this.mainMenuSettings[index].menuid == mainsettingmenuid ){
            console.log("if menu ids equal. .. ");
            console.log(this.settingsMenu[index]);
            tempst = "true";
            console.log(this.settingsMenu[index].subrolesetingmenu[subindex][operation]);
            if( (this.settingsMenu[index].subrolesetingmenu[subindex][operation]).toLowerCase() == "false"){
              this.settingsMenu[index].subrolesetingmenu[subindex][operation] = "True";
            }else{
              this.settingsMenu[index].subrolesetingmenu[subindex][operation] = "False";
            }
                
          //}
        //}
        console.log(this.settingsMenu[index].subrolesetingmenu[subindex][operation]);
      }
  
       console.log( this.settingsMenu[index]);

    }else{ /////////////////////// For Main Menu Settings ////////////////////



    if(subindex.toString() == ""){
     
      console.log("submenu is empty. . .");
      //for(var i=0;i< this.mainMenuSettings.length;i++){
       // if(this.mainMenuSettings[index].menuid == mainsettingmenuid ){
         console.log(this.mainMenuSettings[index]);
         console.log(operation);
        console.log(  this.mainMenuSettings[index][operation] )
          if( (this.mainMenuSettings[index][operation]).toLowerCase() == "false"){
            this.mainMenuSettings[index][operation]  = "True";
          }else{
            console.log(  this.mainMenuSettings[index][operation] );
            this.mainMenuSettings[index][operation]  = "False";
          }
          console.log(  this.mainMenuSettings[index][operation] );
       // } 
     // }
    }else{

      let tempst = "";
      let tempindx = 0;
      console.log("submenu is not empty. .");
      //for(var i=0;i< this.mainMenuSettings.length;i++){
        console.log(this.mainMenuSettings[index].menuid +". . ." +mainsettingmenuid );
       // if(this.mainMenuSettings[index].menuid == mainsettingmenuid ){
          console.log("if menu ids equal. .. ");
          console.log(this.mainMenuSettings[index]);
          tempst = "true";
          console.log(this.mainMenuSettings[index].subrolemenu[subindex][operation]);
          if( (this.mainMenuSettings[index].subrolemenu[subindex][operation]).toLowerCase() == "false"){
            this.mainMenuSettings[index].subrolemenu[subindex][operation] = "True";
          }else{
            this.mainMenuSettings[index].subrolemenu[subindex][operation] = "False";
          }
              
        //}
      //}
      console.log(this.mainMenuSettings[index].subrolemenu[subindex][operation]);
    }

     //console.log( JSON.stringify(this.mainMenuSettings));
    }
    
  }

////////////------- PAteint Add view Edit Checked ------------------////////
patientcheckIt(index,operation,tab,menuid,checkboxdata){
console.log("patient checked it. . .");
console.log(menuid);

console.log(this.patientsettingMenu[index]);
console.log(operation);
console.log(  this.patientsettingMenu[index][operation] )
 if( (this.patientsettingMenu[index][operation]).toLowerCase() == "false"){
   this.patientsettingMenu[index][operation]  = "True";
 }else{
   console.log(  this.patientsettingMenu[index][operation] );
   this.patientsettingMenu[index][operation]  = "False";
 }
 console.log(  this.patientsettingMenu[index][operation] );
 console.log(this.patientsettingMenu[index]);

}

  //....................main menu settings checkbox click..............

  activateRow(event, index, tab,chbxdata,type) {
    console.log(chbxdata);
      console.log(type);
    if (type === 'mainmenu') {
    

      if (event.target.checked === true) {

        console.log(chbxdata.FinalStatus);
      if(chbxdata.FinalStatus == "True"){
        console.log("if. .");
        chbxdata.FinalStatus = "False";
      }else{
        console.log("else. . ");
        chbxdata.FinalStatus = "True"
      }
      console.log(chbxdata.FinalStatus);
      console.log("main checkbox checked. . .");

        this.mainidx=index;
        console.log("if checked true. . .");
        console.log(index)
         //..............for submenu.................
        if(chbxdata.subrolemenu == null){
          // if(index >= 8){
          //   index = index-1;            
          // }else{
          //   index = index;
          // }

            // console.log(index);                      
            //  $(".addchkbx").eq(index).prop("disabled" , false);             
            //  $(".editchkbx").eq(index).prop("disabled" , false);            
            //  $(".viewchkbx").eq(index).prop("disabled" , false);            
            //  $(".downloadchkbx").eq(index).prop("disabled" , false);         
            //  $(".printchkbx").eq(index).prop("disabled" , false);         
            //  $(".importchkbx").eq(index).prop("disabled" , false);            
            //  $(".exportchkbx").eq(index).prop("disabled" , false);
           //  chbxdata.btnAdd = 'True';

        // if(chbxdata.Add_Sts == "True"){
        //   $(".addchkbx").eq(index).prop("checked" , true);  
             
        //   }
        // if(chbxdata.Edit_Sts == "True"){    
        //   $(".editchkbx").eq(index).prop("checked" , true); 
        // }        
        // if(chbxdata.View_Sts == "True"){
        //   $(".viewchkbx").eq(index).prop("checked" , true); 
        // }
        // if(chbxdata.Download_Sts == "True"){      
        //   $(".downloadchkbx").eq(index).prop("checked" , true);
        // }
        // if(chbxdata.Print_Sts == "True"){
        //                $(".printchkbx").eq(index).prop("checked" , true); 
        // }
        // if(chbxdata.Import_Sts == "True"){
        // $(".importchkbx").eq(index).prop("checked" , true);  
        // }
        //   if(chbxdata.Export_Sts == "True"){
        //     $(".exportchkbx").eq(index).prop("checked" , true);  
        //   }
        }else{  ///// If Submenu is there //////
          console.log("entered submenu.....");
        //  for(var i=0;i<chbxdata.subrolemenu.length;i++){
        
        //     chbxdata.subrolemenu[i].FinalStatus = "False"; 
        //     chbxdata.subrolemenu[i].Add_Sts = "False";                  
        //     chbxdata.subrolemenu[i].Edit_Sts = "False";   
        //     chbxdata.subrolemenu[i].View_Sts = "False";   
        //     chbxdata.subrolemenu[i].Download_Sts = "False";   
        //     chbxdata.subrolemenu[i].Print_Sts = "False";
        //     chbxdata.subrolemenu[i].Import_Sts = "False";     
        //     chbxdata.subrolemenu[i].Export_Sts = "False"; 
        //  }
        //   this.mainMenuSettings[index].activateIt = 'true';
        //   this.settingsMenu[index].activateIt = 'true';          
        //  $(".subformchkbk").prop("disabled" , false);
        //   $(".addsubchkbx").prop("disabled" , false);
        //   $(".editsubchkbx").prop("disabled" , false);
        //   $(".viewsubchkbx").prop("disabled" , false);
        //   $(".downloadsubchkbx").prop("disabled" , false);
        //   $(".printsubchkbx").prop("disabled" , false);
        //   $(".importsubchkbx").prop("disabled" , false);
        //   $(".exportsubchkbx").prop("disabled" , false);
          
        }

      } else {

        //...................if we uncheck main checkbox..............
        console.log("checkbox unchecked else etered");
       this.chkbxcheck=false;

       console.log(chbxdata.FinalStatus);
      if(chbxdata.FinalStatus == "True"){
        console.log("if. .");
        chbxdata.FinalStatus = "False";
      }else{
        console.log("else. . ");
        chbxdata.FinalStatus = "True"
      }
      console.log(chbxdata.FinalStatus);
      

      //  if(index >= 8){
      //   index = index-1;            
      // }else{
      //   index = index;
      // }
      console.log(index);
       this.mainMenuSettings[index].activateIt = 'false';
        
        if(chbxdata.subrolemenu == null){

          // $(".addchkbx").eq(index).prop("checked" , false); 
          // $(".addchkbx").eq(index).prop("disabled" , true);
          // $(".editchkbx").eq(index).prop("checked" , false);
          // $(".editchkbx").eq(index).prop("disabled" , true);
          // $(".viewchkbx").eq(index).prop("checked" , false);
          // $(".viewchkbx").eq(index).prop("disabled" , true);
          // $(".downloadchkbx").eq(index).prop("checked" , false);
          // $(".downloadchkbx").eq(index).prop("disabled" , true);
          // $(".printchkbx").eq(index).prop("checked" , false);
          // $(".printchkbx").eq(index).prop("disabled" , true);
          // $(".importchkbx").eq(index).prop("checked" , false);
          // $(".importchkbx").eq(index).prop("disabled" , true);
          // $(".exportchkbx").eq(index).prop("checked" , false);
          // $(".exportchkbx").eq(index).prop("disabled" , true);


        }else{
          console.log("checkbox submenu uncheked here. . .");
          // this.mainMenuSettings[index].activateIt = 'false';
          // this.settingsMenu[index].activateIt = 'false';     
          
          // $(".subformchkbk").prop("disabled" , true);
          // $(".addsubchkbx").prop("disabled" , true);
          // $(".editsubchkbx").prop("disabled" , true);
          // $(".viewsubchkbx").prop("disabled" , true);
          // $(".downloadsubchkbx").prop("disabled" , true);
          // $(".printsubchkbx").prop("disabled" , true);
          // $(".importsubchkbx").prop("disabled" , true);
          // $(".exportsubchkbx").prop("disabled" , true);
              
        }

        console.log(this.mainMenuSettings[index].activateIt);
      }

    }

if(type == "settingmenu"){  ////// For Settings Menu //////

  if (event.target.checked === true) {
    this.mainidx=index;
    console.log("if checked true. . .");
    console.log(index)

    if(chbxdata.FinalStatus == "True"){
      chbxdata.FinalStatus = "False";
    }else{
      chbxdata.FinalStatus = "True"
    }
     //..............for submenu.................
    if(chbxdata.subrolesetingmenu == null){
      // if(index >= 8){
      //   index = index-1;            
      // }else{
      //   index = index;
      // }

      console.log(index);                      
        //  $(".addchkbx").eq(index).prop("disabled" , false);             
        //  $(".editchkbx").eq(index).prop("disabled" , false);            
        //  $(".viewchkbx").eq(index).prop("disabled" , false);            
        //  $(".downloadchkbx").eq(index).prop("disabled" , false);         
        //  $(".printchkbx").eq(index).prop("disabled" , false);         
        //  $(".importchkbx").eq(index).prop("disabled" , false);            
        //  $(".exportchkbx").eq(index).prop("disabled" , false);
       //  chbxdata.btnAdd = 'True';

    // if(chbxdata.Add_Sts == "True"){
    //   $(".addchkbx").eq(index).prop("checked" , true);  
         
    //   }
    // if(chbxdata.Edit_Sts == "True"){    
    //   $(".editchkbx").eq(index).prop("checked" , true); 
    // }        
    // if(chbxdata.View_Sts == "True"){
    //   $(".viewchkbx").eq(index).prop("checked" , true); 
    // }
    // if(chbxdata.Download_Sts == "True"){      
    //   $(".downloadchkbx").eq(index).prop("checked" , true);
    // }
    // if(chbxdata.Print_Sts == "True"){
    //                $(".printchkbx").eq(index).prop("checked" , true); 
    // }
    // if(chbxdata.Import_Sts == "True"){
    // $(".importchkbx").eq(index).prop("checked" , true);  
    // }
    //   if(chbxdata.Export_Sts == "True"){
    //     $(".exportchkbx").eq(index).prop("checked" , true);  
    //   }
    }else{  ///// If Submenu is there //////
      console.log("entered submenu.....");

      this.settingsMenu[index].activateIt = 'true';        
     
      console.log( $(".settingsrow").eq(index).find(".subformchkbk"));
    //   $(".settingsrow").eq(index).find(".subformchkbk").prop("disabled" , false);      
    //  // $(".subformchkbk").eq(index).prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".addsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".editsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".viewsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".downloadsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".printsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".importsubchkbx").prop("disabled" , false);
    //  $(".settingsrow").eq(index).find(".exportsubchkbx").prop("disabled" , false);
      
    }

  } else {

    //...................if we uncheck main checkbox..............
    console.log("checkbox unchecked else etered");
   this.chkbxcheck=false;
  //  if(index >= 8){
  //   index = index-1;            
  // }else{
  //   index = index;
  // }
  console.log(chbxdata.FinalStatus);
  if(chbxdata.FinalStatus == "True"){
    console.log("if. .");
    chbxdata.FinalStatus = "False";
  }else{
    console.log("else. . ");
    chbxdata.FinalStatus = "True"
  }
  console.log(index);
   this.settingsMenu[index].activateIt = 'false';
    
    if(chbxdata.subrolesetingmenu == null){

      // $(".addchkbx").eq(index).prop("checked" , false); 
      // $(".addchkbx").eq(index).prop("disabled" , true);
      // $(".editchkbx").eq(index).prop("checked" , false);
      // $(".editchkbx").eq(index).prop("disabled" , true);
      // $(".viewchkbx").eq(index).prop("checked" , false);
      // $(".viewchkbx").eq(index).prop("disabled" , true);
      // $(".downloadchkbx").eq(index).prop("checked" , false);
      // $(".downloadchkbx").eq(index).prop("disabled" , true);
      // $(".printchkbx").eq(index).prop("checked" , false);
      // $(".printchkbx").eq(index).prop("disabled" , true);
      // $(".importchkbx").eq(index).prop("checked" , false);
      // $(".importchkbx").eq(index).prop("disabled" , true);
      // $(".exportchkbx").eq(index).prop("checked" , false);
      // $(".exportchkbx").eq(index).prop("disabled" , true);


    }else{
      console.log("checkbox submenu uncheked here. . .");
    
      this.settingsMenu[index].activateIt = 'false';     
      console.log( $(".settingsrow").eq(index).find(".subformchkbk"));

    //   $(".settingsrow").eq(index).find(".subformchkbk").prop("disabled" , true);
      
    //  // $(".subformchkbk").eq(index).prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".addsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".editsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".viewsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".downloadsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".printsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".importsubchkbx").prop("disabled" , true);
    //  $(".settingsrow").eq(index).find(".exportsubchkbx").prop("disabled" , true);
          
    }

    console.log(this.settingsMenu[index].activateIt);
  }

}
 

  }
  activatesubRow(event, index, tab,chbxdata, menuid,mainindx) {
    console.log("activationg sub row. . . .");
    console.log(menuid);
    console.log(index);
    console.log(chbxdata);


console.log(JSON.stringify(this.mainmenu_selected_arr));


    if (tab === 'eachMainMenuSetting') {

     

      if (event.target.checked === true) {
        console.log(chbxdata);
        if(chbxdata.FinalStatus == "True"){
          chbxdata.FinalStatus = "False";
        }else{
          chbxdata.FinalStatus = "True";
        }
           
        // $(".addsubchkbx").eq(index).prop("disabled" , false);             
        // $(".editsubchkbx").eq(index).prop("disabled" , false);            
        // $(".viewsubchkbx").eq(index).prop("disabled" , false);            
        // $(".downloadsubchkbx").eq(index).prop("disabled" , false);         
        // $(".printsubchkbx").eq(index).prop("disabled" , false);         
        // $(".importsubchkbx").eq(index).prop("disabled" , false);            
        // $(".exportsubchkbx").eq(index).prop("disabled" , false);

    //     if(chbxdata.Add_Sts == "True"){
    //     $(".addsubchkbx").eq(index).prop("checked" , true);
    //     }
    //   if(chbxdata.Edit_Sts == "True"){
    //     $(".editsubchkbx").eq(index).prop("checked" , true);
    //   }
      
    //   if(chbxdata.View_Sts == "True"){
    //     $(".viewsubchkbx").eq(index).prop("checked" , true);
    //   }
    //   if(chbxdata.Download_Sts == "True"){
    //  //   this.mainMenuSettings[index].activateIt = 'true';
    //     $(".downloadsubchkbx").eq(index).prop("checked" , true);
    //   }
    //   if(chbxdata.Print_Sts == "True"){
    //        $(".printsubchkbx").eq(index).prop("checked" , true);
    //      }
    //      if(chbxdata.Import_Sts == "True"){
    //       $(".importsubchkbx").eq(index).prop("checked" , true);
    //     }
    //     if(chbxdata.Export_Sts == "True"){
    //       $(".exportsubchkbx").eq(index).prop("checked" , true);
      //   }
      //    else{
      //   //$(".downloadchkbx").eq(index).prop("disabled" , true);
      // }
      
      } else {

        console.log(chbxdata);
        if(chbxdata.FinalStatus == "True"){
          chbxdata.FinalStatus = "False";
        }else{
          chbxdata.FinalStatus = "True";
        }

        console.log("final status. . ." + chbxdata.FinalStatus);
        console.log(chbxdata);

       // this.mainMenuSettings[index].activateIt = 'false'
        // ///...............if we uncheck submenu main checkbox ...
          this.mainMenuSettings[index].activateIt = 'false';
          this.settingsMenu[index].activateIt = 'false';
            // $(".addsubchkbx").eq(index).prop("disabled" , true);
            // $(".addsubchkbx").eq(index).prop("checked" , false);
            // $(".editsubchkbx").eq(index).prop("disabled" , true);
            // $(".editsubchkbx").eq(index).prop("checked" , false);
            // $(".viewsubchkbx").eq(index).prop("disabled" , true);
            // $(".viewsubchkbx").eq(index).prop("checked" , false);
            // $(".downloadsubchkbx").eq(index).prop("disabled" , true);
            // $(".downloadsubchkbx").eq(index).prop("checked" , false);
            // $(".printsubchkbx").eq(index).prop("disabled" , true);
            // $(".printsubchkbx").eq(index).prop("checked" , false);
            // $(".importsubchkbx").eq(index).prop("disabled" , true);
            // $(".importsubchkbx").eq(index).prop("checked" , false);
            // $(".exportsubchkbx").eq(index).prop("disabled" , true);
            // $(".exportsubchkbx").eq(index).prop("checked" , false);
        
      }

    }


   

  }
 
  activatesettingssubRow(evnt,index,tab,checkeddata,firstindx,menuid){
    console.log(this.mainidx);
    console.log(firstindx);
    console.log(index);
    console.log(checkeddata);
    console.log(evnt.target.checked);

    if(checkeddata.FinalStatus == "True"){
      checkeddata.FinalStatus = "False";
    }else{
      checkeddata.FinalStatus = "True";
    }

   if(evnt.target.checked == true){
     //this.settingsMenu[firstindx].subrolemenu[index].activateIt = 'False'
    // console.log(this.settingsMenu)
   
     console.log(evnt.target.checked);
     
      if(checkeddata.btnAdd == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.addsubchkbx').eq(index).prop("disabled" , false);
       }
       if(checkeddata.btnEdit == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.editsubchkbx').eq(index).prop("disabled" , false);
       } 
       if(checkeddata.btnEdit == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.viewsubchkbx').eq(index).prop("disabled" , false);
       } 
       if(checkeddata.btnDownload == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.downloadsubchkbx').eq(index).prop("disabled" , false);
       } 
       if(checkeddata.btnPrint == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.printsubchkbx').eq(index).prop("disabled" , false);
       } 
       if(checkeddata.btnImport == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.importsubchkbx').eq(index).prop("disabled" , false);
       } 
       if(checkeddata.btnExport == "True"){ 
        $(".subtdmenu").eq(firstindx).find('.exportsubchkbx').eq(index).prop("disabled" , false);
       } 
      
        else{
         console.log("else. . ");
       }   
   }
   else {
   // this.settingsMenu[firstindx].subrolemenu[index].activateIt = 'True'
   }

  //  this.settings_selected[firstindx].subrolemenu[index].btnAdd = "False";
  //  this.settings_selected[firstindx].subrolemenu[index].btnEdit = "False";
  //  this.settings_selected[firstindx].subrolemenu[index].btnDownaload = "False";
  //  this.settings_selected[firstindx].subrolemenu[index].btnPrint = "False";
  //  this.settings_selected[firstindx].subrolemenu[index].btnImport = "False";
  //  this.settings_selected[firstindx].subrolemenu[index].btnExport = "False";


  }
    activatepatientRow(event, index, tab,chbxdata) {
      console.log(chbxdata);

      if(chbxdata.FinalStatus == "True"){
        chbxdata.FinalStatus = "False";
      }else{
        chbxdata.FinalStatus = "True";
      }

     // console.log(chbxdata.subrolemenu.length)
     if (event.target.checked === true) {
      this.mainidx=index;
      console.log("if checked true. . .");
      console.log(index)
       //..............for submenu.................
      if(chbxdata.subrolemenu == null){
        // if(index >= 8){
        //   index = index-1;            
        // }else{
        //   index = index;
        // }

        console.log(index);                      
           $(".addchkbx").eq(index).prop("disabled" , false);             
           $(".editchkbx").eq(index).prop("disabled" , false);            
           $(".viewchkbx").eq(index).prop("disabled" , false);            
           $(".bookappointmentchkbx").eq(index).prop("disabled" , false);         
           $(".createinvoicechkbx").eq(index).prop("disabled" , false);         
           $(".addvisitnotechkbx").eq(index).prop("disabled" , false);            
           $(".reloadchkbx").eq(index).prop("disabled" , false);
           $(".createprescriptionchkbx").eq(index).prop("checked" , false);
         //  chbxdata.btnAdd = 'True';

      if(chbxdata.Add_Sts == "True"){
        $(".addchkbx").eq(index).prop("checked" , true);  
           
        }
      if(chbxdata.Edit_Sts == "True"){    
        $(".editchkbx").eq(index).prop("checked" , true); 
      }        
      if(chbxdata.View_Sts == "True"){
        $(".viewchkbx").eq(index).prop("checked" , true); 
      }
      if(chbxdata.BookApnt_Sts == "True"){      
        $(".bookappointmentchkbx").eq(index).prop("checked" , true);
      }
      if(chbxdata.CreateInvoice_Sts == "True"){
                     $(".createinvoicechkbx").eq(index).prop("checked" , true); 
      }
      if(chbxdata.Addvisitnote_sts == "True"){
      $(".addvisitnotechkbx").eq(index).prop("checked" , true);  
      }
        if(chbxdata.Reload_Sts == "True"){
          $(".reloadchkbx").eq(index).prop("checked" , true);  
        }
        if(chbxdata.createPrescription_Sts == "True"){
          $(".createprescriptionchkbx").eq(index).prop("checked" , true);  
        }
      }else{  ///// If Submenu is there //////
        console.log("entered submenu.....");
        this.patientsettingMenu[index].activateIt = 'true';
             
       $(".subformchkbk").prop("disabled" , false);
        $(".addsubchkbx").prop("disabled" , false);
        $(".editsubchkbx").prop("disabled" , false);
        $(".viewsubchkbx").prop("disabled" , false);
        $(".downloadsubchkbx").prop("disabled" , false);
        $(".printsubchkbx").prop("disabled" , false);
        $(".importsubchkbx").prop("disabled" , false);
        $(".exportsubchkbx").prop("disabled" , false);
        
      }

    } else{

      console.log("checkbox unchecked else etered");
      this.chkbxcheck=false;
    //   if(index >= 8){
    //    index = index-1;            
    //  }else{
    //    index = index;
    //  }
     console.log(index);
      this.patientsettingMenu[index].activateIt = 'false';
       
       if(chbxdata.subrolemenu == null){

        //  $(".addchkbx").eq(index).prop("checked" , false); 
        //  $(".addchkbx").eq(index).prop("disabled" , true);
        //  $(".editchkbx").eq(index).prop("checked" , false);
        //  $(".editchkbx").eq(index).prop("disabled" , true);
        //  $(".viewchkbx").eq(index).prop("checked" , false);
        //  $(".viewchkbx").eq(index).prop("disabled" , true);
        //  $(".bookappointmentchkbx").eq(index).prop("checked" , false);
        //  $(".bookappointmentchkbx").eq(index).prop("disabled" , true);
        //  $(".createinvoicechkbx").eq(index).prop("checked" , false);
        //  $(".createinvoicechkbx").eq(index).prop("disabled" , true);
        //  $(".addvisitnotechkbx").eq(index).prop("checked" , false);
        //  $(".addvisitnotechkbx").eq(index).prop("disabled" , true);
        //  $(".reloadchkbx").eq(index).prop("checked" , false);
        //  $(".reloadchkbx").eq(index).prop("disabled" , true);
        //  $(".createprescriptionchkbx").eq(index).prop("checked" , false);
        //  $(".createprescriptionchkbx").eq(index).prop("disabled" , true);

       }else{
         console.log("checkbox submenu uncheked here. . .");
         this.patientsettingMenu[index].activateIt = 'false';
         
         
        //  $(".subformchkbk").prop("disabled" , true);
        //  $(".addsubchkbx").prop("disabled" , true);
        //  $(".editsubchkbx").prop("disabled" , true);
        //  $(".viewsubchkbx").prop("disabled" , true);
        //  $(".downloadsubchkbx").prop("disabled" , true);
        //  $(".printsubchkbx").prop("disabled" , true);
        //  $(".importsubchkbx").prop("disabled" , true);
        //  $(".exportsubchkbx").prop("disabled" , true);
             
       }

       console.log(this.patientsettingMenu[index].activateIt);

    }
        

  }
  // addAsset() {
  //   this.router.navigate(['./mydashboard/addasset'])
  // }
  mainmenusettingsadd(){
    if(  this.rolename == undefined || this.rolename == "select" || this.rolename == ""){
      alert("Please Select Role");
      return false;
    }
    // if(this.insertarray == ""){
    //   alert("Please Select Menu to Add");
    //   return false;
    // }
    //else{
     // console.log("Add button clicked. .");

    //  console.log(JSON.stringify(this.mainMenuSettings)); 

      for(var i=0;i<this.mainMenuSettings.length;i++){
      //console.log(this.mainMenuSettings[i].activateIt);
      console.log(this.mainMenuSettings[i].menuid +". . " + this.mainMenuSettings[i].FinalStatus);
     
        if(this.mainMenuSettings[i].FinalStatus == "True"){
        //  console.log("Main if. . ");
         // console.log(this.mainMenuSettings[i]);
          if(this.mainMenuSettings[i].subrolemenu == null){
         //   console.log("first if here. . ");
            let tem =       { 
                        "Sno":"", 
                        "Clinicid":this.userid, 
                        "Branchid":"", 
                        "menuid":  this.mainMenuSettings[i].menuid, 
                        "role_id":this.rolename, 
                        "menu_status":this.mainMenuSettings[i].FinalStatus, 
                        "MainMenuId":  this.mainMenuSettings[i].menuid, 
                        "Loginid":this.userid, 
                        "menu_datetime":this.curntdatetoday, 
                        "Add_Sts":this.mainMenuSettings[i].Add_Sts, 
                        "Edit_Sts":this.mainMenuSettings[i].Edit_Sts, 
                        "View_Sts":this.mainMenuSettings[i].View_Sts, 
                        "Download_Sts":this.mainMenuSettings[i].Download_Sts, 
                        "Print_Sts":this.mainMenuSettings[i].Print_Sts, 
                        "Condition":"Insert", 
                        "Import_Sts":this.mainMenuSettings[i].Import_Sts, 
                        "Export_Sts":this.mainMenuSettings[i].Export_Sts        
                      }

                    this.selected_final_menu.push(tem);
          }else{
           // console.log("first else. .");
           // console.log(this.mainMenuSettings[i]);
            let tem =       { 
              "Sno":"", 
              "Clinicid":this.userid, 
              "Branchid":"", 
              "menuid":  this.mainMenuSettings[i].menuid, 
              "role_id":this.rolename, 
              "menu_status":this.mainMenuSettings[i].FinalStatus, 
              "MainMenuId":  this.mainMenuSettings[i].menuid, 
              "Loginid":this.userid, 
              "menu_datetime":this.curntdatetoday, 
              "Add_Sts":this.mainMenuSettings[i].Add_Sts, 
              "Edit_Sts":this.mainMenuSettings[i].Edit_Sts, 
              "View_Sts":this.mainMenuSettings[i].View_Sts, 
              "Download_Sts":this.mainMenuSettings[i].Download_Sts, 
              "Print_Sts":this.mainMenuSettings[i].Print_Sts, 
              "Condition":"Insert", 
              "Import_Sts":this.mainMenuSettings[i].Import_Sts, 
              "Export_Sts":this.mainMenuSettings[i].Export_Sts        
            }

            this.selected_final_menu.push(tem);
            for(var j=0;j<this.mainMenuSettings[i].subrolemenu.length;j++){

              let tem =       { 
                "Sno":"", 
                "Clinicid":this.userid, 
                "Branchid":"",    
                "menuid":  this.mainMenuSettings[i].subrolemenu[j].menuid, 
                "role_id":this.rolename, 
                "menu_status":this.mainMenuSettings[i].subrolemenu[j].FinalStatus, 
                "MainMenuId":  this.mainMenuSettings[i].menuid, 
                "Loginid":this.userid, 
                "menu_datetime":this.curntdatetoday, 
                "Add_Sts":this.mainMenuSettings[i].subrolemenu[j].Add_Sts, 
                "Edit_Sts":this.mainMenuSettings[i].subrolemenu[j].Edit_Sts, 
                "View_Sts":this.mainMenuSettings[i].subrolemenu[j].View_Sts, 
                "Download_Sts":this.mainMenuSettings[i].subrolemenu[j].Download_Sts, 
                "Print_Sts":this.mainMenuSettings[i].subrolemenu[j].Print_Sts, 
                "Condition":"Insert", 
                "Import_Sts":this.mainMenuSettings[i].subrolemenu[j].Import_Sts, 
                "Export_Sts":this.mainMenuSettings[i].subrolemenu[j].Export_Sts        
              }
             // console.log("lock. .");
              console.log(JSON.stringify(tem));

              this.selected_final_menu.push(tem);
            }           

          }
        }else{ 
        //  console.log("main else. . ");
        //  console.log(this.mainMenuSettings[i]);
          if(this.mainMenuSettings[i].subrolemenu == null){
            console.log("second if. .");
            console.log(this.mainMenuSettings[i]);
            let tem =       { 
                        "Sno":"", 
                        "Clinicid":this.userid, 
                        "Branchid":"", 
                        "menuid":  this.mainMenuSettings[i].menuid, 
                        "role_id":this.rolename, 
                        "menu_status":this.mainMenuSettings[i].FinalStatus, 
                        "MainMenuId":  this.mainMenuSettings[i].menuid, 
                        "Loginid":this.userid, 
                        "menu_datetime":this.curntdatetoday, 
                        "Add_Sts":"False", 
                        "Edit_Sts":"False", 
                        "View_Sts":"False", 
                        "Download_Sts":"False", 
                        "Print_Sts":"False", 
                        "Condition":"Insert", 
                        "Import_Sts":"False", 
                        "Export_Sts":"False"        
                      }

                    this.selected_final_menu.push(tem);
          }else{
            //console.log("second else. . .");
           // console.log(this.mainMenuSettings[i]);
            for(var j=0;j<this.mainMenuSettings[i].subrolemenu.length;j++){

              let tem =       { 
                "Sno":"", 
                "Clinicid":this.userid, 
                "Branchid":"", 
                "menuid":  this.mainMenuSettings[i].subrolemenu[j].menuid, 
                "role_id":this.rolename, 
                "menu_status":this.mainMenuSettings[i].subrolemenu[j].FinalStatus, 
                "MainMenuId":  this.mainMenuSettings[i].menuid, 
                "Loginid":this.userid, 
                "menu_datetime":this.curntdatetoday, 
                "Add_Sts":"False", 
                "Edit_Sts":"False", 
                "View_Sts":"False", 
                "Download_Sts":"False", 
                "Print_Sts":"False", 
                "Condition":"Insert", 
                "Import_Sts":"False", 
                "Export_Sts":"False"        
              }

              this.selected_final_menu.push(tem);
            }         

          }
        }

         
      }

     // console.log(JSON.stringify(this.selected_final_menu));
    let insertstatus = "";
    //  for(var i=0;i<this.selected_final_menu.length;i++){
      this.selected_final_menu.forEach( (data , i) => {
        this.isPageloaderVisible=true; 
      //  console.log(i +" . .. " + this.selected_final_menu.length);
      //  console.log(JSON.stringify(data));
        var accessToken= window.localStorage.Tokenval;
        let url= this.commonService.commonUrl+"Account/User_Operations";
    //    console.log("final here. . ");
    //    console.log(JSON.stringify(data));
        // if(data.menuid == "108"){
        //   console.log(JSON.stringify(data));
        // }
        let body= this.selected_final_menu[i]
        let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken
                                        });
                                      
        let options = new RequestOptions({ headers : headers });
        this.http.post(url,body,options)
        .map(res => res.json()).subscribe(res => {
          if(res.status_cd == 1){
            
            //alert("Added Successfully.");
            console.log(i +" . .. " + this.selected_final_menu.length);
            if(i == this.selected_final_menu.length-1 ){
              this.isPageloaderVisible=false; 
              
              alert("Submitted Successfully");
             // this.alertStatus(i,this.selected_final_menu.length)
             this.ngOnInit();
          //  insertstatus = "true";

            }
           
          }
          else{
          
          }
        },
          err => {
          
            console.log("ERROR!: ", err);
          });
      });
      console.log(insertstatus);
 
     

  }


////// Settings Menu Submit ////
settingsMenuAdd(){
  console.log("Submit Settings Menu Submit. .. .");
  console.log(JSON.stringify(this.settings_selected));
  if(  this.rolename == undefined || this.rolename == "select" || this.rolename == ""){
    alert("Please Select Role");
    return false;
  }

 // console.log(JSON.stringify(this.settingsMenu));

for(var i=0;i<this.settingsMenu.length;i++){
  if(this.settingsMenu[i].FinalStatus == "True"){
  if(this.settingsMenu[i].subrolesetingmenu == null){
    let tem =       { 
                "Sno":"", 
                "Clinicid":this.userid, 
                "Branchid":"", 
                "menuid":  this.settingsMenu[i].menuid, 
                "role_id":this.rolename, 
                "menu_status":this.settingsMenu[i].FinalStatus, 
                "MainMenuId":  this.settingsMenu[i].menuid, 
                "Loginid":this.userid, 
                "menu_datetime": this.curntdatetoday, 
                "Add_Sts":this.settingsMenu[i].Add_Sts, 
                "Edit_Sts":this.settingsMenu[i].Edit_Sts, 
                "View_Sts":this.settingsMenu[i].View_Sts, 
                "Download_Sts":this.settingsMenu[i].Download_Sts, 
                "Print_Sts":this.settingsMenu[i].Print_Sts, 
                "Condition":"SettingsInsert", 
                "Import_Sts":this.settingsMenu[i].Import_Sts, 
                "Export_Sts":this.settingsMenu[i].Export_Sts        
              }

            this.selected_final_settingmenu.push(tem);
  }else{

    let tem =       { 
      "Sno":"", 
      "Clinicid":this.userid, 
      "Branchid":"", 
      "menuid":  this.settingsMenu[i].menuid, 
      "role_id":this.rolename, 
      "menu_status":this.settingsMenu[i].FinalStatus, 
      "MainMenuId":  this.settingsMenu[i].menuid, 
      "Loginid":this.userid, 
      "menu_datetime": this.curntdatetoday, 
      "Add_Sts":"False", 
      "Edit_Sts":"False", 
      "View_Sts":"False", 
      "Download_Sts":"False", 
      "Print_Sts":"False", 
      "Condition":"SettingsInsert", 
      "Import_Sts":"False", 
      "Export_Sts":"False"       
    }

  this.selected_final_settingmenu.push(tem);

    for(var j=0;j<this.settingsMenu[i].subrolesetingmenu.length;j++){

      let tem =       { 
        "Sno":"", 
        "Clinicid":this.userid, 
        "Branchid":"", 
        "menuid": this.settingsMenu[i].subrolesetingmenu[j].menuid, 
        "role_id":this.rolename, 
        "menu_status":this.settingsMenu[i].subrolesetingmenu[j].FinalStatus, 
        "MainMenuId":  this.settingsMenu[i].menuid, 
        "Loginid":this.userid, 
        "menu_datetime": this.curntdatetoday, 
        "Add_Sts":this.settingsMenu[i].subrolesetingmenu[j].Add_Sts, 
        "Edit_Sts":this.settingsMenu[i].subrolesetingmenu[j].Edit_Sts, 
        "View_Sts":this.settingsMenu[i].subrolesetingmenu[j].View_Sts, 
        "Download_Sts":this.settingsMenu[i].subrolesetingmenu[j].Download_Sts, 
        "Print_Sts":this.settingsMenu[i].subrolesetingmenu[j].Print_Sts, 
        "Condition":"SettingsInsert", 
        "Import_Sts":this.settingsMenu[i].subrolesetingmenu[j].Import_Sts, 
        "Export_Sts":this.settingsMenu[i].subrolesetingmenu[j].Export_Sts        
      }

      this.selected_final_settingmenu.push(tem);
    }         
  }
  }else{
    if(this.settingsMenu[i].subrolesetingmenu == null){
      let tem =       { 
                  "Sno":"", 
                  "Clinicid":this.userid, 
                  "Branchid":"", 
                  "menuid":  this.settingsMenu[i].menuid, 
                  "role_id":this.rolename, 
                  "menu_status":this.settingsMenu[i].FinalStatus, 
                  "MainMenuId":  this.settingsMenu[i].menuid, 
                  "Loginid":this.userid, 
                  "menu_datetime": this.curntdatetoday, 
                  "Add_Sts":"False", 
                  "Edit_Sts":"False", 
                  "View_Sts":"False", 
                  "Download_Sts":"False", 
                  "Print_Sts":"False", 
                  "Condition":"SettingsInsert", 
                  "Import_Sts":"False", 
                  "Export_Sts":"False"       
                }
  
              this.selected_final_settingmenu.push(tem);
    }else{

      let tem =       { 
        "Sno":"", 
        "Clinicid":this.userid, 
        "Branchid":"", 
        "menuid":  this.settingsMenu[i].menuid, 
        "role_id":this.rolename, 
        "menu_status":this.settingsMenu[i].FinalStatus, 
        "MainMenuId":  this.settingsMenu[i].menuid, 
        "Loginid":this.userid, 
        "menu_datetime": this.curntdatetoday, 
        "Add_Sts":"False", 
        "Edit_Sts":"False", 
        "View_Sts":"False", 
        "Download_Sts":"False", 
        "Print_Sts":"False", 
        "Condition":"SettingsInsert", 
        "Import_Sts":"False", 
        "Export_Sts":"False"       
      }

    this.selected_final_settingmenu.push(tem);
  
      for(var j=0;j<this.settingsMenu[i].subrolesetingmenu.length;j++){
  
        let tem =       { 
          "Sno":"", 
          "Clinicid":this.userid, 
          "Branchid":"", 
          "menuid": this.settingsMenu[i].subrolesetingmenu[j].menuid, 
          "role_id":this.rolename, 
          "menu_status":this.settingsMenu[i].subrolesetingmenu[j].FinalStatus, 
          "MainMenuId":  this.settingsMenu[i].menuid, 
          "Loginid":this.userid, 
          "menu_datetime": this.curntdatetoday, 
          "Add_Sts":"False", 
          "Edit_Sts":"False", 
          "View_Sts":"False", 
          "Download_Sts":"False", 
          "Print_Sts":"False", 
          "Condition":"SettingsInsert", 
          "Import_Sts":"False", 
          "Export_Sts":"False"        
        }
  
        this.selected_final_settingmenu.push(tem);
      }         
    }
  }
}

console.log(JSON.stringify(this.selected_final_settingmenu));


this.selected_final_settingmenu.forEach( (data , i) => {
  this.isPageloaderVisible=true;
      var accessToken= window.localStorage.Tokenval;
        let url= this.commonService.commonUrl+"Account/User_Operations"
        let body= this.selected_final_settingmenu[i];
        console.log(JSON.stringify(body));
        let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken
                                        });
                                      
        let options = new RequestOptions({ headers : headers });
        this.http.post(url,body,options)
        .map(res => res.json()).subscribe(res => {
          if(res.status_cd == 1){
            if(i == this.selected_final_settingmenu.length-1 ){ 
              this.isPageloaderVisible=false;             
              alert("Submitted Successfully");
             // this.alertStatus(i,this.selected_final_menu.length)
             this.ngOnInit();           

            }
           
          }
          else{
          
          }
        },
          err => {
          
            console.log("ERROR!: ", err);
          });
       
        });
         

}



  ///// Patient Menu Settings Submit //////

  patientsettingsadd(){
    console.log("Submit Pateint Menu. . .");
    console.log(JSON.stringify(this.patientsettingMenu));

    if(  this.rolename == undefined || this.rolename == "select" || this.rolename == ""){
      alert("Please Select Role");
      return false;
    }
for(var i=0;i<this.patientsettingMenu.length;i++){

  if(this.patientsettingMenu[i].FinalStatus == "True"){

    let tem =       { 
                "Sno":"", 
                "Clinicid":this.userid, 
                "Branchid":"", 
                "menuid":  this.patientsettingMenu[i].menuid, 
                "role_id":this.rolename, 
                "menu_status":this.patientsettingMenu[i].FinalStatus, 
                "MainMenuId":  this.patientsettingMenu[i].menuid, 
                "Loginid":this.userid, 
                "menu_datetime": this.curntdatetoday, 
                "Add_Sts":this.patientsettingMenu[i].Add_Sts, 
                "Edit_Sts":this.patientsettingMenu[i].Edit_Sts, 
                "View_Sts":this.patientsettingMenu[i].View_Sts, 
                "Download_Sts":this.patientsettingMenu[i].BookApnt_Sts, 
                "Print_Sts":this.patientsettingMenu[i].CreateInvoice_Sts, 
                "Condition":"patientInsert", 
                "Import_Sts":this.patientsettingMenu[i].createPrescription_Sts, 
                "Export_Sts":this.patientsettingMenu[i].Addvisitnote_sts        
              }

            this.selected_final_pateintmenu.push(tem);
            }else{
              let tem =       { 
                "Sno":"", 
                "Clinicid":this.userid, 
                "Branchid":"", 
                "menuid":  this.patientsettingMenu[i].menuid, 
                "role_id":this.rolename, 
                "menu_status":this.patientsettingMenu[i].FinalStatus, 
                "MainMenuId":  this.patientsettingMenu[i].menuid, 
                "Loginid":this.userid, 
                "menu_datetime": this.curntdatetoday, 
                "Add_Sts":"False", 
                "Edit_Sts":"False", 
                "View_Sts":"False", 
                "Download_Sts":"False", 
                "Print_Sts":"False", 
                "Condition":"patientInsert", 
                "Import_Sts":"False", 
                "Export_Sts":"False"       
              }

            this.selected_final_pateintmenu.push(tem);
            }
  }

  this.selected_final_pateintmenu.forEach( (data , i) => {
    this.isPageloaderVisible=true;
      var accessToken= window.localStorage.Tokenval;
        let url= this.commonService.commonUrl+"Account/User_Operations"
        let body= this.selected_final_pateintmenu[i]
        let headers = new Headers({"Content-Type" : "application/json",
                                          Accept : "application/json",
                                          Authorization : accessToken
                                        });
                                      
        let options = new RequestOptions({ headers : headers });
        this.http.post(url,body,options)
        .map(res => res.json()).subscribe(res => {
          if(res.status_cd == 1){
            if(i == this.selected_final_pateintmenu.length-1 ){  
              this.isPageloaderVisible=false;            
              alert("Submitted Successfully");
             // this.alertStatus(i,this.selected_final_menu.length)
             this.ngOnInit();           

            }
           
          }
          else{
          
          }
        },
          err => {
          
            console.log("ERROR!: ", err);
          });
        });
}

alertStatus(indx , arrlength){

  if(indx == arrlength){
    alert("Submitted Successfully")
    this.ngOnInit();
  }

}

     
  
}
 
