import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-xray',
  templateUrl: './patient-xray.component.html',
  styleUrls: ['./patient-xray.component.css']
})
export class PatientXrayComponent implements OnInit {
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
  userid: any;
  constructor(public http: Http,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService: UserinfoService) {

     }
  
    ngOnInit() {
      this.userid = window.localStorage.getItem("userId");
    }
  
  
    checkboxchange(event,text) {
      console.log(event.target.value,text);
         if(this.cb1 == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('ct1')).setAttribute('checked', 'true');
         }else if(this.cb1 == false){
           this.cb1='';
           (<HTMLInputElement>document.getElementById('ct1')).removeAttribute('checked');
         }
         if(this.chestcheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Chest1')).setAttribute('checked', 'true');
         }else if(this.chestcheck == false){
          this.chestcheck='';
          (<HTMLInputElement>document.getElementById('Chest1')).removeAttribute('checked');
        }
         if(this.pacheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('P-A1')).setAttribute('checked', 'true');
         }else if(this.pacheck == false){
          this.pacheck='';
          (<HTMLInputElement>document.getElementById('P-A1')).removeAttribute('checked');
        }
         if(this.latcheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Lat1')).setAttribute('checked', 'true');
         }else if(this.latcheck == false){
          this.latcheck='';
          (<HTMLInputElement>document.getElementById('Lat1')).removeAttribute('checked');
        }
         if(this.UpperRibscheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('UpperRibs1')).setAttribute('checked', 'true');
         }else if(this.UpperRibscheck == false){
          this.UpperRibscheck='';
          (<HTMLInputElement>document.getElementById('UpperRibs1')).removeAttribute('checked');
        }
         if(this.Antcheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Ant1')).setAttribute('checked', 'true');
         }else if(this.Antcheck == false){
          this.Antcheck='';
          (<HTMLInputElement>document.getElementById('Ant1')).removeAttribute('checked');
        }
         if(this.Postcheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Post1')).setAttribute('checked', 'true');
         }else if(this.Postcheck == false){
          this.Postcheck='';
          (<HTMLInputElement>document.getElementById('Post1')).removeAttribute('checked');
        }
         if(this.LowerRibscheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('LowerRibs1')).setAttribute('checked', 'true');
         }else if(this.LowerRibscheck == false){
          this.LowerRibscheck='';
          (<HTMLInputElement>document.getElementById('LowerRibs1')).removeAttribute('checked');
        }
         if(this.Ant2check == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Ant21')).setAttribute('checked', 'true');
         }else if(this.Ant2check == false){
          this.Ant2check='';
          (<HTMLInputElement>document.getElementById('Ant21')).removeAttribute('checked');
        }
         if(this.Post2check == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Post21')).setAttribute('checked', 'true');
         }else if(this.Post2check == false){
          this.Post2check='';
          (<HTMLInputElement>document.getElementById('Post21')).removeAttribute('checked');
        }
         if(this.ivucheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('IVU1')).setAttribute('checked', 'true');
         }else if(this.ivucheck == false){
          this.ivucheck='';
          (<HTMLInputElement>document.getElementById('IVU1')).removeAttribute('checked');
        }
        
        
         if(this.kubcheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('K.U.B1')).setAttribute('checked', 'true');
         }else if(this.kubcheck == false){
            this.kubcheck = '';
            (<HTMLInputElement>document.getElementById('K.U.B1')).removeAttribute('checked');
         }
         if(this.Abdomencheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('Abdomen1')).setAttribute('checked', 'true');
         }else if(this.Abdomencheck == false){
          this.Abdomencheck = '';
          (<HTMLInputElement>document.getElementById('Abdomen1')).removeAttribute('checked');
          }
         if(this.PainGallBladdercheck == true){
           console.log("checked");
           (<HTMLInputElement>document.getElementById('PainGallBladder1')).setAttribute('checked', 'true');
         }else if(this.PainGallBladdercheck == false){
          this.PainGallBladdercheck = '';
          (<HTMLInputElement>document.getElementById('PainGallBladder1')).removeAttribute('checked');
        }
   
   
   
       if(this.Skullcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Skull1')).setAttribute('checked', 'true');
       }else if(this.Skullcheck == false){
        this.Skullcheck = '';
        (<HTMLInputElement>document.getElementById('Skull1')).removeAttribute('checked');
      }
       if(this.Skullpacheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Skull-P-A1')).setAttribute('checked', 'true');
       }else if(this.Skullpacheck == false){
        this.Skullpacheck = '';
        (<HTMLInputElement>document.getElementById('Skull-P-A1')).removeAttribute('checked');
      }
       if(this.Skulllatcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Skull-Lat1')).setAttribute('checked', 'true');
       }else if(this.Skulllatcheck == false){
        this.Skulllatcheck = '';
        (<HTMLInputElement>document.getElementById('Skull-Lat1')).removeAttribute('checked');
      }
       if(this.Sinusescheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Sinuses1')).setAttribute('checked', 'true');
       }else if(this.Sinusescheck == false){
        this.Sinusescheck = '';
        (<HTMLInputElement>document.getElementById('Sinuses1')).removeAttribute('checked');
      }
       if(this.Nasopharynxcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Nasopharynx1')).setAttribute('checked', 'true');
       }else if(this.Nasopharynxcheck == false){
        this.Nasopharynxcheck = '';
        (<HTMLInputElement>document.getElementById('Nasopharynx1')).removeAttribute('checked');
      }
       if(this.Paravertebradcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Paravertebrad1')).setAttribute('checked', 'true');
       }else if(this.Paravertebradcheck == false){
        this.Paravertebradcheck = '';
        (<HTMLInputElement>document.getElementById('Paravertebrad1')).removeAttribute('checked');
      }
       if(this.NasalBonescheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('NasalBones1')).setAttribute('checked', 'true');
       }else if(this.NasalBonescheck == false){
        this.NasalBonescheck = '';
        (<HTMLInputElement>document.getElementById('NasalBones1')).removeAttribute('checked');
      }
       if(this.BothMastoidscheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('BothMastoids1')).setAttribute('checked', 'true');
       }else if(this.BothMastoidscheck == false){
        this.BothMastoidscheck = '';
        (<HTMLInputElement>document.getElementById('BothMastoids1')).removeAttribute('checked');
      }
       if(this.Mandiblecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Mandible1')).setAttribute('checked', 'true');
       }else if(this.Mandiblecheck == false){
        this.Mandiblecheck = '';
        (<HTMLInputElement>document.getElementById('Mandible1')).removeAttribute('checked');
      }
       if(this.Mandibleltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Mandible-Lt1')).setAttribute('checked', 'true');
       }else if(this.Mandibleltcheck == false){
        this.Mandibleltcheck = '';
        (<HTMLInputElement>document.getElementById('Mandible-Lt1')).removeAttribute('checked');
      }
       if(this.MandibleRtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Mandible-Rt1')).setAttribute('checked', 'true');
       }else if(this.MandibleRtcheck == false){
        this.MandibleRtcheck = '';
        (<HTMLInputElement>document.getElementById('Mandible-Rt1')).removeAttribute('checked');
      }
       if(this.tmjcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('T.M.J1')).setAttribute('checked', 'true');
       }else if(this.tmjcheck == false){
        this.tmjcheck = '';
        (<HTMLInputElement>document.getElementById('T.M.J1')).removeAttribute('checked');
      }
       if(this.tmjrtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('T.M.J-Rt1')).setAttribute('checked', 'true');
       }else if(this.tmjrtcheck == false){
        this.tmjrtcheck = '';
        (<HTMLInputElement>document.getElementById('T.M.J-Rt1')).removeAttribute('checked');
      }
       if(this.tmjltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('T.M.J-Lt1')).setAttribute('checked', 'true');
       }else if(this.tmjltcheck == false){
        this.tmjltcheck = '';
        (<HTMLInputElement>document.getElementById('T.M.J-Lt1')).removeAttribute('checked');
      }
       
       
       if(this.ceevicalcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('CeevicalSpine1')).setAttribute('checked', 'true');
       }else if(this.ceevicalcheck == false){
        this.ceevicalcheck = '';
        (<HTMLInputElement>document.getElementById('CeevicalSpine1')).removeAttribute('checked');
      }
       if(this.lsspinecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('LSSpine1')).setAttribute('checked', 'true');
       }else if(this.lsspinecheck == false){
        this.lsspinecheck = '';
        (<HTMLInputElement>document.getElementById('LSSpine1')).removeAttribute('checked');
      }
       if(this.DorsalSpinecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('DorsalSpine1')).setAttribute('checked', 'true');
       }else if(this.DorsalSpinecheck == false){
        this.DorsalSpinecheck = '';
        (<HTMLInputElement>document.getElementById('DorsalSpine1')).removeAttribute('checked');
      }
       if(this.Sacrumcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Sacrum1')).setAttribute('checked', 'true');
       }else if(this.Sacrumcheck == false){
        this.Sacrumcheck = '';
        (<HTMLInputElement>document.getElementById('Sacrum1')).removeAttribute('checked');
      }
       if(this.DlSpinecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('DLSpine1')).setAttribute('checked', 'true');
       }else if(this.DlSpinecheck == false){
        this.DlSpinecheck = '';
        (<HTMLInputElement>document.getElementById('DLSpine1')).removeAttribute('checked');
      }
       if(this.Coccyxcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Coccyx1')).setAttribute('checked', 'true');
       }else if(this.Coccyxcheck == false){
        this.Coccyxcheck = '';
        (<HTMLInputElement>document.getElementById('Coccyx1')).removeAttribute('checked');
      }
       if(this.LumberSpinecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('LumberSpine1')).setAttribute('checked', 'true');
       }else if(this.LumberSpinecheck == false){
        this.LumberSpinecheck = '';
        (<HTMLInputElement>document.getElementById('LumberSpine1')).removeAttribute('checked');
      }
       if(this.sijointscheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Sijoints1')).setAttribute('checked', 'true');
       }else if(this.sijointscheck == false){
        this.sijointscheck = '';
        (<HTMLInputElement>document.getElementById('Sijoints1')).removeAttribute('checked');
      }
       if(this.otherscheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Others1')).setAttribute('checked', 'true');
       }else if(this.otherscheck == false){
        this.otherscheck = '';
        (<HTMLInputElement>document.getElementById('Others1')).removeAttribute('checked');
      }
  
       if(this.stetnumcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Stetnum1')).setAttribute('checked', 'true');
       }else if(this.stetnumcheck == false){
        this.stetnumcheck = '';
        (<HTMLInputElement>document.getElementById('Stetnum1')).removeAttribute('checked');
      }
       if(this.Claviclecheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Clavicle1')).setAttribute('checked', 'true');
       }else if(this.Claviclecheck == false){
        this.Claviclecheck = '';
        (<HTMLInputElement>document.getElementById('Clavicle1')).removeAttribute('checked');
      }
       if(this.ulpacheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ULPA1')).setAttribute('checked', 'true');
       }else if(this.ulpacheck == false){
        this.ulpacheck = '';
        (<HTMLInputElement>document.getElementById('ULPA1')).removeAttribute('checked');
      }
       if(this.ullatcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ULLat1')).setAttribute('checked', 'true');
       }else if(this.ullatcheck == false){
        this.ullatcheck = '';
        (<HTMLInputElement>document.getElementById('ULLat1')).removeAttribute('checked');
      }
       if(this.Scapulacheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Scapula1')).setAttribute('checked', 'true');
       }else if(this.Scapulacheck == false){
        this.Scapulacheck = '';
        (<HTMLInputElement>document.getElementById('Scapula1')).removeAttribute('checked');
      }
       if(this.ScapulaLtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ScapulaLt1')).setAttribute('checked', 'true');
       }else if(this.ScapulaLtcheck == false){
        this.ScapulaLtcheck = '';
        (<HTMLInputElement>document.getElementById('ScapulaLt1')).removeAttribute('checked');
      }
       if(this.ScapulaRtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ScapulaRt1')).setAttribute('checked', 'true');
       }else if(this.ScapulaRtcheck == false){
        this.ScapulaRtcheck = '';
        (<HTMLInputElement>document.getElementById('ScapulaRt1')).removeAttribute('checked');
      }
       if(this.Shouldercheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Shoulder1')).setAttribute('checked', 'true');
       }else if(this.Shouldercheck == false){
        this.Shouldercheck = '';
        (<HTMLInputElement>document.getElementById('Shoulder1')).removeAttribute('checked');
      }
       if(this.ShoulderLtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ShoulderLt1')).setAttribute('checked', 'true');
       }else if(this.ShoulderLtcheck == false){
        this.ShoulderLtcheck = '';
        (<HTMLInputElement>document.getElementById('ShoulderLt1')).removeAttribute('checked');
      }
       if(this.ShoulderRtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ShoulderRt1')).setAttribute('checked', 'true');
       }else if(this.ShoulderRtcheck == false){
        this.ShoulderRtcheck = '';
        (<HTMLInputElement>document.getElementById('ShoulderRt1')).removeAttribute('checked');
      }
       if(this.Humeruscheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Humerus1')).setAttribute('checked', 'true');
       }else if(this.Humeruscheck == false){
        this.Humeruscheck = '';
        (<HTMLInputElement>document.getElementById('Humerus1')).removeAttribute('checked');
      }
       if(this.Humerusltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HumerusLt1')).setAttribute('checked', 'true');
       }else if(this.Humeruscheck == false){
        this.Humeruscheck = '';
        (<HTMLInputElement>document.getElementById('Humerus1')).removeAttribute('checked');
      }
       if(this.Humerusrtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HumerusRt1')).setAttribute('checked', 'true');
       }else if(this.Humeruscheck == false){
        this.Humeruscheck = '';
        (<HTMLInputElement>document.getElementById('Humerus1')).removeAttribute('checked');
      }
       if(this.Elbowcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Elbow1')).setAttribute('checked', 'true');
       }else if(this.Elbowcheck == false){
        this.Elbowcheck = '';
        (<HTMLInputElement>document.getElementById('Elbow1')).removeAttribute('checked');
      }
       if(this.Elbowltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ElbowLt1')).setAttribute('checked', 'true');
       }else if(this.Elbowltcheck == false){
        this.Elbowltcheck = '';
        (<HTMLInputElement>document.getElementById('ElbowLt1')).removeAttribute('checked');
      }
       if(this.Elbowrtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ElbowRt1')).setAttribute('checked', 'true');
       }else if(this.Elbowrtcheck == false){
        this.Elbowrtcheck = '';
        (<HTMLInputElement>document.getElementById('ElbowRt1')).removeAttribute('checked');
      }
       if(this.Forearmcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Forearm1')).setAttribute('checked', 'true');
       }else if(this.Forearmcheck == false){
        this.Forearmcheck = '';
        (<HTMLInputElement>document.getElementById('Forearm1')).removeAttribute('checked');
      }
       if(this.Forearmltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ForearmLt1')).setAttribute('checked', 'true');
       }else if(this.Forearmltcheck == false){
        this.Forearmltcheck = '';
        (<HTMLInputElement>document.getElementById('ForearmLt1')).removeAttribute('checked');
      }
       if(this.ForearmRtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('ForearmRt1')).setAttribute('checked', 'true');
       }else if(this.ForearmRtcheck == false){
        this.ForearmRtcheck = '';
        (<HTMLInputElement>document.getElementById('ForearmRt1')).removeAttribute('checked');
      }
       if(this.Wirstcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Wirst1')).setAttribute('checked', 'true');
       }else if(this.Wirstcheck == false){
        this.Wirstcheck = '';
        (<HTMLInputElement>document.getElementById('Wirst1')).removeAttribute('checked');
      }
       if(this.Wirstltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('WirstLt1')).setAttribute('checked', 'true');
       }else if(this.Wirstltcheck == false){
        this.Wirstltcheck = '';
        (<HTMLInputElement>document.getElementById('WirstLt1')).removeAttribute('checked');
      }
       if(this.WirstRtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('WirstRt1')).setAttribute('checked', 'true');
       }else if(this.WirstRtcheck == false){
        this.WirstRtcheck = '';
        (<HTMLInputElement>document.getElementById('WirstRt1')).removeAttribute('checked');
      }
       if(this.Handcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hand1')).setAttribute('checked', 'true');
       }else if(this.Handcheck == false){
        this.Handcheck = '';
        (<HTMLInputElement>document.getElementById('Hand1')).removeAttribute('checked');
      }
       if(this.Handltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HandLt1')).setAttribute('checked', 'true');
       }else if(this.Handltcheck == false){
        this.Handltcheck = '';
        (<HTMLInputElement>document.getElementById('HandLt1')).removeAttribute('checked');
      }
       if(this.Handrtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HandRt1')).setAttribute('checked', 'true');
       }else if(this.Handrtcheck == false){
        this.Handrtcheck = '';
        (<HTMLInputElement>document.getElementById('HandRt1')).removeAttribute('checked');
      }
       if(this.Fingerscheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Fingers1')).setAttribute('checked', 'true');
       }else if(this.Fingerscheck == false){
        this.Fingerscheck = '';
        (<HTMLInputElement>document.getElementById('Fingers1')).removeAttribute('checked');
      }
       if(this.Fingersltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('FingersLt1')).setAttribute('checked', 'true');
       }else if(this.Fingersltcheck == false){
        this.Fingersltcheck = '';
        (<HTMLInputElement>document.getElementById('FingersLt1')).removeAttribute('checked');
      }
       if(this.Fingersrtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('FingersRt1')).setAttribute('checked', 'true');
       }else if(this.Fingersrtcheck == false){
        this.Fingersrtcheck = '';
        (<HTMLInputElement>document.getElementById('FingersRt1')).removeAttribute('checked');
      }
       if(this.Pelvischeck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Pelvis1')).setAttribute('checked', 'true');
       }else if(this.Pelvischeck == false){
        this.Pelvischeck = '';
        (<HTMLInputElement>document.getElementById('Pelvis1')).removeAttribute('checked');
      }
       if(this.HipJointcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HipJoint1')).setAttribute('checked', 'true');
       }else if(this.HipJointcheck == false){
        this.HipJointcheck = '';
        (<HTMLInputElement>document.getElementById('HipJoint1')).removeAttribute('checked');
      }
       if(this.HipJointpacheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HipJointPA1')).setAttribute('checked', 'true');
       }else if(this.HipJointpacheck == false){
        this.HipJointpacheck = '';
        (<HTMLInputElement>document.getElementById('HipJointPA1')).removeAttribute('checked');
      }
       if(this.HipJointlatcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('HipJointLat1')).setAttribute('checked', 'true');
       }else if(this.HipJointlatcheck == false){
        this.HipJointlatcheck = '';
        (<HTMLInputElement>document.getElementById('HipJointLat1')).removeAttribute('checked');
      }
       if(this.Ponaramacheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Ponarama1')).setAttribute('checked', 'true');
       }else if(this.Ponaramacheck == false){
        this.Ponaramacheck = '';
        (<HTMLInputElement>document.getElementById('Ponarama1')).removeAttribute('checked');
      }
  
       if(this.Hip1Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip11Lt')).setAttribute('checked', 'true');
       }else if(this.Hip1Ltcheck == false){
        this.Hip1Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip11Lt')).removeAttribute('checked');
      }
       if(this.Hip2Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip21Lt')).setAttribute('checked', 'true');
       }else if(this.Hip2Ltcheck == false){
        this.Hip2Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip21Lt')).removeAttribute('checked');
      }
       if(this.Hip3Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip31Lt')).setAttribute('checked', 'true');
       }else if(this.Hip3Ltcheck == false){
        this.Hip3Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip31Lt')).removeAttribute('checked');
      }
       if(this.Hip4Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip41Lt')).setAttribute('checked', 'true');
       }else if(this.Hip4Ltcheck == false){
        this.Hip4Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip41Lt')).removeAttribute('checked');
      }
       if(this.Hip5Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip51Lt')).setAttribute('checked', 'true');
       }else if(this.Hip5Ltcheck == false){
        this.Hip5Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip51Lt')).removeAttribute('checked');
      }
       if(this.Hip6Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip61Lt')).setAttribute('checked', 'true');
       }else if(this.Hip6Ltcheck == false){
        this.Hip6Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip61Lt')).removeAttribute('checked');
      }
       if(this.Hip7Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip71Lt')).setAttribute('checked', 'true');
       }else if(this.Hip7Ltcheck == false){
        this.Hip7Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip71Lt')).removeAttribute('checked');
      }
       if(this.Hip8Ltcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip81Lt')).setAttribute('checked', 'true');
       }else if(this.Hip8Ltcheck == false){
        this.Hip8Ltcheck = '';
        (<HTMLInputElement>document.getElementById('Hip81Lt')).removeAttribute('checked');
      }
       if(this.Hip1Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip11Rt')).setAttribute('checked', 'true');
       }else if(this.Hip1Rtcheck == false){
        this.Hip1Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip11Rt')).removeAttribute('checked');
      }
       if(this.Hip2Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip21Rt')).setAttribute('checked', 'true');
       }else if(this.Hip2Rtcheck == false){
        this.Hip2Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip21Rt')).removeAttribute('checked');
      }
       if(this.Hip3Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip31Rt')).setAttribute('checked', 'true');
       }else if(this.Hip3Rtcheck == false){
        this.Hip3Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip31Rt')).removeAttribute('checked');
      }
       if(this.Hip4Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip41Rt')).setAttribute('checked', 'true');
       }else if(this.Hip4Rtcheck == false){
        this.Hip4Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip41Rt')).removeAttribute('checked');
      }
       if(this.Hip5Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip51Rt')).setAttribute('checked', 'true');
       }else if(this.Hip5Rtcheck == false){
        this.Hip5Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip51Rt')).removeAttribute('checked');
      }
       if(this.Hip6Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip61Rt')).setAttribute('checked', 'true');
       }else if(this.Hip6Rtcheck == false){
        this.Hip6Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip61Rt')).removeAttribute('checked');
      }
       if(this.Hip7Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip71Rt')).setAttribute('checked', 'true');
       }else if(this.Hip7Rtcheck == false){
        this.Hip7Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip71Rt')).removeAttribute('checked');
      }
       if(this.Hip8Rtcheck == true){
         console.log("checked");
         (<HTMLInputElement>document.getElementById('Hip81Rt')).setAttribute('checked', 'true');
       }else if(this.Hip8Rtcheck == false){
        this.Hip8Rtcheck = '';
        (<HTMLInputElement>document.getElementById('Hip81Rt')).removeAttribute('checked');
      }
    }  

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

    submit() {
      var filedvalues = this.cb1+','+this.p4+','+this.p5+','+this.p6 +','+this.chestcheck+','+this.pacheck+','+this.latcheck+','+this.UpperRibscheck+','+this.Antcheck+','+this.Postcheck
      +','+this.LowerRibscheck+','+this.Ant2check+','+this.Post2check
      +','+""+','+this.stetnumcheck+','+this.Claviclecheck+','+this.ulpacheck+','+this.ullatcheck+','+this.Scapulacheck
      +','+this.ScapulaLtcheck+','+this.ScapulaRtcheck+','+this.Shouldercheck +','+this.ShoulderLtcheck+','+this.ShoulderRtcheck+','+this.Humeruscheck+','+this.Humerusltcheck
      +','+this.Humerusrtcheck+','+this.Elbowcheck+','+this.Elbowltcheck+','+this.Elbowrtcheck
      +','+this.Forearmcheck+','+this.Forearmltcheck+','+this.ForearmRtcheck+','+this.Wirstcheck+','+this.Wirstltcheck
      +','+this.WirstRtcheck+','+this.Handcheck+','+this.Handltcheck
      +','+this.Handrtcheck+','+this.Fingerscheck+','+this.Fingersltcheck+','+this.Fingersrtcheck+','+""+','+this.kubcheck+','+this.Abdomencheck+','+this.PainGallBladdercheck
      +','+this.ivucheck+','+""+','+this.Skullcheck+','+this.Skullpacheck+','+this.Skulllatcheck+','+this.Sinusescheck+','+this.Nasopharynxcheck+','+this.Paravertebradcheck+','+this.NasalBonescheck
      +','+this.BothMastoidscheck+','+this.Mandiblecheck+','+this.MandibleRtcheck+','+this.Mandibleltcheck+','+this.tmjcheck+','+this.tmjrtcheck+','+this.tmjltcheck+','+""+','+this.Pelvischeck+','+this.HipJointcheck
      +','+this.HipJointpacheck+','+this.HipJointlatcheck+','+this.Hip1Ltcheck+','+this.Hip2Ltcheck+','+this.Hip3Ltcheck+','+this.Hip4Ltcheck+','+this.Hip5Ltcheck+','+this.Hip6Ltcheck+','+this.Hip7Ltcheck+','+this.Hip8Ltcheck
      +','+this.Hip1Rtcheck+','+this.Hip2Rtcheck+','+this.Hip3Rtcheck+','+this.Hip4Rtcheck+','+this.Hip5Rtcheck+','+this.Hip6Rtcheck+','+this.Hip7Rtcheck+','+this.Hip8Rtcheck+','+""+','+this.ceevicalcheck+','+this.lsspinecheck
      +','+this.DorsalSpinecheck+','+this.Sacrumcheck+','+this.DlSpinecheck+','+this.Coccyxcheck+','+this.LumberSpinecheck+','+this.sijointscheck+','+this.otherscheck
      +','+""+','+this.Ponaramacheck+','+this.p1+','+this.p2+','+this.p3
  
      var accessToken = window.localStorage.Tokenval;
      let serviceUrl = this.commonService.commonUrl + "Account/DocTreatment_Transactions";
      let params =
      {
        "Sno": "108",
        "Practitioner_Id": window.localStorage.getItem("loginbaseId"),
        "Treatment_Id": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98",
        "status": filedvalues,
        "Login_ID": "",
        "Trans_Date": "",
        "Operation": "InsertTempletetransactionData",
        "clinicid": this.userid,
        "Branchid": "",
        "Last_Updated": ""
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
  
      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        if (result.status_cd === "1") {
          alert("Inserted Successfully");
          this.router.navigate(['/letters'], { queryParams: { referallid: 102367836 } });
      } else {

      }
    },
      error => {
        console.log(error);
      }
    );
  }

}
