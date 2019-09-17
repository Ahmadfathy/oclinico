import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-x-ray-request',
  templateUrl: './x-ray-request.component.html',
  styleUrls: ['./x-ray-request.component.css']
})
export class XRayRequestComponent implements OnInit {
  userid: any;
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public nodata: boolean = false;
  public dataTable: any;
  public xraydetails = [];
  public showpagenation: boolean = false;

  p1:any;
  p2:any;
  p3:any;
  p4:any;
  p5:any;
  p6:any;
  
  cb1:any;
  chestcheck:any;
  pacheck:any;
  latcheck:any;
  UpperRibscheck:any;
  Antcheck:any;
  Postcheck:any;
  LowerRibscheck:any;
  Ant2check:any;
  Post2check:any;
  
  kubcheck:any;
  Abdomencheck:any;
  PainGallBladdercheck:any;
  ivucheck:any;
  
  
  Skullcheck:any;
  Skullpacheck:any;
  Skulllatcheck:any;
  Sinusescheck:any;
  Nasopharynxcheck:any;
  Paravertebradcheck:any;
  NasalBonescheck:any;
  BothMastoidscheck:any;
  Mandiblecheck:any;
  MandibleRtcheck:any;
  Mandibleltcheck:any;
  tmjcheck:any;      
  tmjrtcheck:any;      
  tmjltcheck:any; 
  
  
  
  ceevicalcheck:any;
  lsspinecheck:any;
  DorsalSpinecheck:any;
  Sacrumcheck:any;
  DlSpinecheck:any;
  Coccyxcheck:any;
  LumberSpinecheck:any;
  sijointscheck:any;
  otherscheck:any;



  stetnumcheck:any;
  Claviclecheck:any;
  ulpacheck:any;
  ullatcheck:any;
  Scapulacheck:any;
  ScapulaLtcheck:any;
  ScapulaRtcheck:any;
  Shouldercheck:any;
  ShoulderLtcheck:any;
  ShoulderRtcheck:any;
  Humeruscheck:any;
  Humerusltcheck:any;
  Humerusrtcheck:any;
  Elbowcheck:any;
  Elbowltcheck:any;
  Elbowrtcheck:any;
  Forearmcheck:any;
  Forearmltcheck:any;
  ForearmRtcheck:any;
  Wirstcheck:any;
  Wirstltcheck:any;
  WirstRtcheck:any;
  Handcheck:any;
  Handltcheck:any;
  Handrtcheck:any;
  Fingerscheck:any;
  Fingersltcheck:any;
  Fingersrtcheck:any;

  Hip1Ltcheck:any;
  Hip2Ltcheck:any;
  Hip3Ltcheck:any;
  Hip4Ltcheck:any;
  Hip5Ltcheck:any;
  Hip6Ltcheck:any;
  Hip7Ltcheck:any;
  Hip8Ltcheck:any;
  Hip1Rtcheck:any;
  Hip2Rtcheck:any;
  Hip3Rtcheck:any;
  Hip4Rtcheck:any;
  Hip5Rtcheck:any;
  Hip6Rtcheck:any;
  Hip7Rtcheck:any;
  Hip8Rtcheck:any;


  Pelvischeck:any;
  HipJointcheck:any;
  HipJointpacheck:any;
  HipJointlatcheck:any;
  Ponaramacheck:any;

  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService) {
      this.userid = window.localStorage.getItem("userId")
    }
  ngOnInit() {
    this.getdata()
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
  }

  getdata() {
    var accessToken = window.localStorage.Tokenval;
    var url = this.commonService.commonUrl + "Login/Getuser"
    let body = {
      "text":"Get_printgrid_data",
      "id":"108",
      "param1":"",
      "param2":""
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
        this.showLoader = false;
        this.showdata = false;
        this.nodata = true;
        this.showpagenation = false;
        $('#dataTable_wrapper').hide();
      }
      else {
        this.showLoader = false;
        this.xraydetails = result.data.Table;
        console.log(JSON.stringify(this.xraydetails));
        this.showdata = true;
        this.nodata = false;
        this.showpagenation = true;
        this.chRef.detectChanges();
        $('#dataTable_wrapper').show();
        const table1: any = $('#dataTable');
        this.dataTable = table1.DataTable();
      }
    })
  }

  view(type,date,id){
    console.log(type);
    console.log(date);
    console.log(id);
    window.sessionStorage.setItem("xtype",type);
    window.sessionStorage.setItem("xdate",date);
    window.sessionStorage.setItem("xid",id)
    this.router.navigate(['/viewxray']);
  }

  // --------------------------------print -----------------------------------------------
  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }
  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------

  getprintdata(id,tdate) {
    var accessToken = window.localStorage.Tokenval;
    let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
    let params =
    {
      "Sno":"108", 
      "Practitioner_Id":id, 
      "Treatment_Id":"", 
      "status":"", 
      "Login_ID":"", 
      "Trans_Date": tdate, 
      "Operation":"getprintsindividualdata", 
      "clinicid":this.userid, 
      "Branchid":"", 
      "Last_Updated":"" 
    }

    console.log(params);


    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
      console.log(result)
      if (result.status_cd === "1") {
        this.cb1 = result.data.Table[0].LABELLABEL1
        this.p4 = result.data.Table[0].LABELLABEL2
        this.p5= result.data.Table[0].LABELLABEL3
        this.p6 = result.data.Table[0].LABELLABEL4
        this.chestcheck= result.data.Table[0].LABELLABEL5
        this.pacheck= result.data.Table[0].LABELLABEL6
        this.latcheck= result.data.Table[0].LABELLABEL7
        this.UpperRibscheck= result.data.Table[0].LABELLABEL8
        this.Antcheck= result.data.Table[0].LABELLABEL9
        this.Postcheck= result.data.Table[0].LABELLABEL10
        this.LowerRibscheck= result.data.Table[0].LABELLABEL11
        this.Ant2check= result.data.Table[0].LABELLABEL12
        this.Post2check= result.data.Table[0].LABELLABEL13
        this.stetnumcheck= result.data.Table[0].LABELLABEL15
        this.Claviclecheck= result.data.Table[0].LABELLABEL16
        this.ulpacheck= result.data.Table[0].LABELLABEL17
        this.ullatcheck= result.data.Table[0].LABELLABEL18
        this.Scapulacheck= result.data.Table[0].LABELLABEL19
        this.ScapulaLtcheck= result.data.Table[0].LABELLABEL20
        this.ScapulaRtcheck= result.data.Table[0].LABELLABEL21
        this.Shouldercheck = result.data.Table[0].LABELLABEL22
        this.ShoulderLtcheck= result.data.Table[0].LABELLABEL23
        this.ShoulderRtcheck= result.data.Table[0].LABELLABEL24
        this.Humeruscheck= result.data.Table[0].LABELLABEL25
        this.Humerusltcheck= result.data.Table[0].LABELLABEL26
        this.Humerusrtcheck= result.data.Table[0].LABELLABEL27
        this.Elbowcheck= result.data.Table[0].LABELLABEL28
        this.Elbowltcheck= result.data.Table[0].LABELLABEL29
        this.Elbowrtcheck= result.data.Table[0].LABELLABEL30
        this.Forearmcheck= result.data.Table[0].LABELLABEL31
        this.Forearmltcheck= result.data.Table[0].LABELLABEL32
        this.ForearmRtcheck= result.data.Table[0].LABELLABEL33
        this.Wirstcheck= result.data.Table[0].LABELLABEL34
        this.Wirstltcheck= result.data.Table[0].LABELLABEL35
        this.WirstRtcheck= result.data.Table[0].LABELLABEL36
        this.Handcheck= result.data.Table[0].LABELLABEL37
        this.Handltcheck= result.data.Table[0].LABELLABEL38
        this.Handrtcheck= result.data.Table[0].LABELLABEL39
        this.Fingerscheck= result.data.Table[0].LABELLABEL40
        this.Fingersltcheck= result.data.Table[0].LABELLABEL41
        this.Fingersrtcheck= result.data.Table[0].LABELLABEL42
        this.kubcheck= result.data.Table[0].LABELLABEL44
        this.Abdomencheck= result.data.Table[0].LABELLABEL45
        this.PainGallBladdercheck= result.data.Table[0].LABELLABEL46
        this.ivucheck= result.data.Table[0].LABELLABEL47
        this.Skullcheck= result.data.Table[0].LABELLABEL49
        this.Skullpacheck= result.data.Table[0].LABELLABEL50
        this.Skulllatcheck= result.data.Table[0].LABELLABEL51
        this.Sinusescheck= result.data.Table[0].LABELLABEL52
        this.Nasopharynxcheck= result.data.Table[0].LABELLABEL53
        this.Paravertebradcheck= result.data.Table[0].LABELLABEL54
        this.NasalBonescheck= result.data.Table[0].LABELLABEL55
        this.BothMastoidscheck= result.data.Table[0].LABELLABEL56
        this.Mandiblecheck= result.data.Table[0].LABELLABEL57
        this.MandibleRtcheck= result.data.Table[0].LABELLABEL58
        this.Mandibleltcheck= result.data.Table[0].LABELLABEL59
        this.tmjcheck= result.data.Table[0].LABELLABEL60
        this.tmjrtcheck= result.data.Table[0].LABELLABEL61
        this.tmjltcheck= result.data.Table[0].LABELLABEL62
        this.Pelvischeck= result.data.Table[0].LABELLABEL64
        this.HipJointcheck= result.data.Table[0].LABELLABEL65
        this.HipJointpacheck= result.data.Table[0].LABELLABEL66
        this.HipJointlatcheck= result.data.Table[0].LABELLABEL67
        this.Hip1Ltcheck= result.data.Table[0].LABELLABEL68
        this.Hip2Ltcheck= result.data.Table[0].LABELLABEL69
        this.Hip3Ltcheck= result.data.Table[0].LABELLABEL70
        this.Hip4Ltcheck= result.data.Table[0].LABELLABEL71
        this.Hip5Ltcheck= result.data.Table[0].LABELLABEL72
        this.Hip6Ltcheck= result.data.Table[0].LABELLABEL73
        this.Hip7Ltcheck= result.data.Table[0].LABELLABEL74
        this.Hip8Ltcheck= result.data.Table[0].LABELLABEL75
        this.Hip1Rtcheck= result.data.Table[0].LABELLABEL76
        this.Hip2Rtcheck= result.data.Table[0].LABELLABEL77
        this.Hip3Rtcheck= result.data.Table[0].LABELLABEL78
        this.Hip4Rtcheck= result.data.Table[0].LABELLABEL79
        this.Hip5Rtcheck= result.data.Table[0].LABELLABEL80
        this.Hip6Rtcheck= result.data.Table[0].LABELLABEL81
        this.Hip7Rtcheck= result.data.Table[0].LABELLABEL82
        this.Hip8Rtcheck= result.data.Table[0].LABELLABEL83
        this.ceevicalcheck= result.data.Table[0].LABELLABEL85
        this.lsspinecheck= result.data.Table[0].LABELLABEL86
        this.DorsalSpinecheck= result.data.Table[0].LABELLABEL87
        this.Sacrumcheck= result.data.Table[0].LABELLABEL88
        this.DlSpinecheck= result.data.Table[0].LABELLABEL89
        this.Coccyxcheck= result.data.Table[0].LABELLABEL90
        this.LumberSpinecheck= result.data.Table[0].LABELLABEL91
        this.sijointscheck= result.data.Table[0].LABELLABEL92
        this.otherscheck= result.data.Table[0].LABELLABEL93
        this.Ponaramacheck= result.data.Table[0].LABELLABEL95
        this.p1 = result.data.Table[0].LABELLABEL96
        this.p2 = result.data.Table[0].LABELLABEL97
        this.p3 = result.data.Table[0].LABELLABEL98

       if(this.cb1 == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ct1')).setAttribute('checked', 'true');
       }else{
        this.cb1 = '';
       }
       if(this.chestcheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Chest1')).setAttribute('checked', 'true');
       }else{
         this.chestcheck = '';
       }
       if(this.pacheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('P-A1')).setAttribute('checked', 'true');
       }else{
         this.pacheck = '';
       }
       if(this.latcheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Lat1')).setAttribute('checked', 'true');
       }else{
         this.latcheck = '';
       }
       if(this.UpperRibscheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('UpperRibs1')).setAttribute('checked', 'true');
       }else{
         this.UpperRibscheck = '';
       }
       if(this.Antcheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Ant1')).setAttribute('checked', 'true');
       }else{
        this.Antcheck = '';
       }
       if(this.Postcheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Post1')).setAttribute('checked', 'true');
       }else{
          this.Postcheck = '';
       }
       if(this.LowerRibscheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('LowerRibs1')).setAttribute('checked', 'true');
       }else{
         this.LowerRibscheck = '';
       }
       if(this.Ant2check == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Ant21')).setAttribute('checked', 'true');
       }else{
        this.Ant2check ='';
       }
       if(this.Post2check == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Post21')).setAttribute('checked', 'true');
       }else{
        this.Post2check = '';
       }
       if(this.ivucheck == 'true'){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('IVU1')).setAttribute('checked', 'true');
       }else{
         this.ivucheck = '';
       }
      if(this.kubcheck == 'true'){
        console.log("checked");
        (<HTMLInputElement>document.getElementById('K.U.B1')).setAttribute('checked', 'true');
      }else{
        this.kubcheck = '';
      }
      if(this.Abdomencheck == 'true'){
        console.log("checked");
        (<HTMLInputElement>document.getElementById('Abdomen1')).setAttribute('checked', 'true');
      }else{
        this.Abdomencheck = '';
      }
      if(this.PainGallBladdercheck == 'true'){
        console.log("checked");
        (<HTMLInputElement>document.getElementById('PainGallBladder1')).setAttribute('checked', 'true');
      }else{
        this.PainGallBladdercheck = ''
      }
     if(this.Skullcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Skull1')).setAttribute('checked', 'true');
     }else{
       this.Skullcheck = ''
     }
     if(this.Skullpacheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Skull-P-A1')).setAttribute('checked', 'true');
     }else{
       this.Skullpacheck = ''
     }
     if(this.Skulllatcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Skull-Lat1')).setAttribute('checked', 'true');
     }else{
       this.Skulllatcheck = ''
     }
     if(this.Sinusescheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Sinuses1')).setAttribute('checked', 'true');
     }else{
       this.Sinusescheck = ''
     }
     if(this.Nasopharynxcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Nasopharynx1')).setAttribute('checked', 'true');
     }else{
       this.Nasopharynxcheck = ''
     }
     if(this.Paravertebradcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Paravertebrad1')).setAttribute('checked', 'true');
     }else{
       this.Paravertebradcheck = ''
     }
     if(this.NasalBonescheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('NasalBones1')).setAttribute('checked', 'true');
     }else{
       this.NasalBonescheck = ''
     }
     if(this.BothMastoidscheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('BothMastoids1')).setAttribute('checked', 'true');
     }else{
       this.BothMastoidscheck = ''
     }
     if(this.Mandiblecheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Mandible1')).setAttribute('checked', 'true');
     }else{
       this.Mandiblecheck = ''
     }
     if(this.Mandibleltcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Mandible-Lt1')).setAttribute('checked', 'true');
     }else{
      this.Mandibleltcheck = ''
    }
     if(this.MandibleRtcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Mandible-Rt1')).setAttribute('checked', 'true');
     }else{
      this.MandibleRtcheck = ''
    }
     if(this.tmjcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('T.M.J1')).setAttribute('checked', 'true');
     }else{
      this.tmjcheck = ''
    }
     if(this.tmjrtcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('T.M.J-Rt1')).setAttribute('checked', 'true');
     }else{
      this.tmjrtcheck = ''
    }
     if(this.tmjltcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('T.M.J-Lt1')).setAttribute('checked', 'true');
     }else{
      this.tmjltcheck = ''
    }
     if(this.ceevicalcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('CeevicalSpine1')).setAttribute('checked', 'true');
     }else{
      this.ceevicalcheck = ''
    }
     if(this.lsspinecheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('LSSpine1')).setAttribute('checked', 'true');
     }else{
      this.lsspinecheck = ''
    }
     if(this.DorsalSpinecheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('DorsalSpine1')).setAttribute('checked', 'true');
     }else{
      this.DorsalSpinecheck = ''
    }
     if(this.Sacrumcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Sacrum1')).setAttribute('checked', 'true');
     }else{
      this.Sacrumcheck = ''
    }
     if(this.DlSpinecheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('DLSpine1')).setAttribute('checked', 'true');
     }else{
      this.DlSpinecheck = ''
    }
     if(this.Coccyxcheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Coccyx1')).setAttribute('checked', 'true');
     }else{
      this.Coccyxcheck = ''
    }
     if(this.LumberSpinecheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('LumberSpine1')).setAttribute('checked', 'true');
     }else{
      this.LumberSpinecheck = ''
    }
     if(this.sijointscheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Sijoints1')).setAttribute('checked', 'true');
     }else{
      this.sijointscheck = ''
    }
     if(this.otherscheck == 'true'){
       console.log("checked");
       (<HTMLInputElement>document.getElementById('Others1')).setAttribute('checked', 'true');
     }else{
      this.otherscheck = ''
    }
     if(this.stetnumcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Stetnum1')).setAttribute('checked', 'true');
    }else{
      this.stetnumcheck = ''
    }
    if(this.Claviclecheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Clavicle1')).setAttribute('checked', 'true');
    }else{
      this.Claviclecheck = ''
    }
    if(this.ulpacheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ULPA1')).setAttribute('checked', 'true');
    }else{
      this.ulpacheck = ''
    }
    if(this.ullatcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ULLat1')).setAttribute('checked', 'true');
    }else{
      this.ullatcheck = ''
    }
    if(this.Scapulacheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Scapula1')).setAttribute('checked', 'true');
    }else{
      this.Scapulacheck = ''
    }
    if(this.ScapulaLtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ScapulaLt1')).setAttribute('checked', 'true');
    }else{
      this.ScapulaLtcheck = ''
    }
    if(this.ScapulaRtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ScapulaRt1')).setAttribute('checked', 'true');
    }else{
      this.ScapulaRtcheck = ''
    }
    if(this.Shouldercheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Shoulder1')).setAttribute('checked', 'true');
    }else{
      this.Shouldercheck = ''
    }
    if(this.ShoulderLtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ShoulderLt1')).setAttribute('checked', 'true');
    }else{
      this.ShoulderLtcheck = ''
    }
    if(this.ShoulderRtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ShoulderRt1')).setAttribute('checked', 'true');
    }else{
      this.ShoulderRtcheck = ''
    }
    if(this.Humeruscheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Humerus1')).setAttribute('checked', 'true');
    }else{
      this.Humeruscheck = ''
    }
    if(this.Humerusltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HumerusLt1')).setAttribute('checked', 'true');
    }else{
      this.Humerusltcheck = ''
    }
    if(this.Humerusrtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HumerusRt1')).setAttribute('checked', 'true');
    }else{
      this.Humerusrtcheck = ''
    }
    if(this.Elbowcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Elbow1')).setAttribute('checked', 'true');
    }else{
      this.Elbowcheck = ''
    }
    if(this.Elbowltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ElbowLt1')).setAttribute('checked', 'true');
    }else{
      this.Elbowltcheck = ''
    }
    if(this.Elbowrtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ElbowRt1')).setAttribute('checked', 'true');
    }else{
      this.Elbowrtcheck = ''
    }
    if(this.Forearmcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Forearm1')).setAttribute('checked', 'true');
    }else{
      this.Forearmcheck = ''
    }
    if(this.Forearmltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ForearmLt1')).setAttribute('checked', 'true');
    }else{
      this.Forearmltcheck = ''
    }
    if(this.ForearmRtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('ForearmRt1')).setAttribute('checked', 'true');
    }else{
      this.ForearmRtcheck = ''
    }
    if(this.Wirstcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Wirst1')).setAttribute('checked', 'true');
    }else{
      this.Wirstcheck = ''
    }
    if(this.Wirstltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('WirstLt1')).setAttribute('checked', 'true');
    }else{
      this.Wirstltcheck = ''
    }
    if(this.WirstRtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('WirstRt1')).setAttribute('checked', 'true');
    }else{
      this.WirstRtcheck = ''
    }
    if(this.Handcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hand1')).setAttribute('checked', 'true');
    }else{
      this.Handcheck = ''
    }
    if(this.Handltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HandLt1')).setAttribute('checked', 'true');
    }else{
      this.Handltcheck = ''
    }
    if(this.Handrtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HandRt1')).setAttribute('checked', 'true');
    }else{
      this.Handrtcheck = ''
    }
    if(this.Fingerscheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Fingers1')).setAttribute('checked', 'true');
    }else{
      this.Fingerscheck = ''
    }
    if(this.Fingersltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('FingersLt1')).setAttribute('checked', 'true');
    }else{
      this.Fingersltcheck = ''
    }
    if(this.Fingersrtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('FingersRt1')).setAttribute('checked', 'true');
    }else{
      this.Fingersrtcheck = ''
    }
    if(this.Pelvischeck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Pelvis1')).setAttribute('checked', 'true');
    }else{
      this.Pelvischeck = ''
    }
    if(this.HipJointcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HipJoint1')).setAttribute('checked', 'true');
    }else{
      this.HipJointcheck = ''
    }
    if(this.HipJointpacheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HipJointPA1')).setAttribute('checked', 'true');
    }else{
      this.HipJointpacheck = ''
    }
    if(this.HipJointlatcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('HipJointLat1')).setAttribute('checked', 'true');
    }else{
      this.HipJointlatcheck = ''
    }
    if(this.Ponaramacheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Ponarama1')).setAttribute('checked', 'true');
    }else{
      this.Ponaramacheck = ''
    }
    if(this.Hip1Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip11Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip1Ltcheck = ''
    }
    if(this.Hip2Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip21Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip2Ltcheck = ''
    }
    if(this.Hip3Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip31Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip3Ltcheck = ''
    }
    if(this.Hip4Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip41Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip4Ltcheck = ''
    }
    if(this.Hip5Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip51Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip5Ltcheck = ''
    }
    if(this.Hip6Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip61Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip6Ltcheck = ''
    }
    if(this.Hip7Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip71Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip7Ltcheck = ''
    }
    if(this.Hip8Ltcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip81Lt')).setAttribute('checked', 'true');
    }else{
      this.Hip8Ltcheck = ''
    }
    if(this.Hip1Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip11Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip1Rtcheck = ''
    }
    if(this.Hip2Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip21Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip2Rtcheck = ''
    }
    if(this.Hip3Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip31Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip3Rtcheck = ''
    }
    if(this.Hip4Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip41Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip4Rtcheck = ''
    }
    if(this.Hip5Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip51Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip5Rtcheck = ''
    }
    if(this.Hip6Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip61Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip6Rtcheck = ''
    }
    if(this.Hip7Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip71Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip7Rtcheck = ''
    }
    if(this.Hip8Rtcheck == 'true'){
      console.log("checked");
      (<HTMLInputElement>document.getElementById('Hip81Rt')).setAttribute('checked', 'true');
    }else{
      this.Hip8Rtcheck = ''
    }
    setTimeout(() => {
      this.print();
    },1000)
      } else {
          console.log("else entered")
      }
   },
      error => {
        console.log(error);
      }
   );
  }

}
